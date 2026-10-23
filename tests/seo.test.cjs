const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

/* ------------------------------------------------------------------ */
/*  Load the real TS modules (same trick as the lead/FMCSA tests), with */
/*  the `@/` path alias from tsconfig resolved on the fly.             */
/* ------------------------------------------------------------------ */
require.extensions[".ts"] = require.extensions[".tsx"] = (mod, filename) => {
  const source = fs.readFileSync(filename, "utf8");
  const { outputText } = ts.transpileModule(source, {
    fileName: filename,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  });
  mod._compile(outputText, filename);
};

const resolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, ...rest) {
  if (request.startsWith("@/")) request = path.resolve("src", request.slice(2));
  return resolveFilename.call(this, request, ...rest);
};

const { buildMetadata, composeTitle, SERP_TITLE_MIN, SERP_TITLE_MAX, SERP_DESCRIPTION_MIN, SERP_DESCRIPTION_MAX } = require("../src/lib/seo");
const { organizationSchema, websiteSchema, articleSchema, blogSchema, breadcrumbSchema } = require("../src/lib/schema");
const { services, servicePath } = require("../src/content/services");
const { insights, insightWordCount } = require("../src/content/insights");
const { ambassadorProgram, circleNetworkProgram, fuelCardProgram, equipmentFinanceProgram } = require("../src/content/programs");
const { SITE_URL } = require("../src/content/site");

const brand = require("../src/content/site").org;

/* ------------------------------------------------------------------ */
/*  Assemble the same { route → title/description } the site renders.  */
/* ------------------------------------------------------------------ */
const render = (input) => buildMetadata(input);

const listPages = (dir = "src/app") =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listPages(full);
    return entry.name === "page.tsx" ? [full] : [];
  });

const routeFromPageFile = (file) => {
  const rel = path.relative("src/app", file).replace(/\\/g, "/");
  if (rel === "page.tsx") return "/";
  return `/${rel.replace(/\/page\.tsx$/, "").replace(/\/\[([^\]]+)\]/g, "/:$1")}`;
};

/** Pull the literal `title` / `description` out of a page's buildMetadata call. */
const metadataLiterals = (file) => {
  const source = fs.readFileSync(file, "utf8");
  const start = source.indexOf("buildMetadata({");
  if (start === -1) return null;
  const block = source.slice(start, start + 2400);
  const title = /title:\s*"([^"]+)"/.exec(block);
  const description = /description:\s*\n?\s*"([^"]+)"/.exec(block);
  if (!title || !description) return null; // page builds its title from content at runtime
  return { title: title[1], description: description[1] };
};

const entries = [];

for (const file of listPages()) {
  const literals = metadataLiterals(file);
  if (literals) entries.push({ route: routeFromPageFile(file), source: file, ...literals });
}

for (const service of services) {
  const route = servicePath(service);
  if (entries.some((e) => e.route === route)) continue; // /insurance owns its own title
  entries.push({ route, source: "src/content/services.ts", title: service.metaTitle, description: service.metaDescription });
}

for (const program of [ambassadorProgram, circleNetworkProgram, fuelCardProgram, equipmentFinanceProgram]) {
  entries.push({ route: program.path, source: "src/content/programs.ts", title: program.metaTitle, description: program.metaDescription });
}

for (const post of insights) {
  entries.push({
    route: `/insights/${post.slug}`,
    source: "src/content/insights.ts",
    title: post.seoTitle ?? post.title,
    description: post.description,
  });
}

const renderedTitle = (entry) => render({ title: entry.title, description: entry.description, path: entry.route }).title.absolute;

// Home leads with the brand; the two company pages put the city in the tail and
// name the entity mid-title. Everything else ends with the standard tail that
// `buildMetadata` appends — a mixed set of tails is what invites a rewrite.
const BRAND_LED_ROUTES = new Set(["/", "/about", "/contact"]);

test("every rendered title fits Google's SERP budget and names the brand once", () => {
  const failures = [];
  for (const entry of entries) {
    const title = renderedTitle(entry);
    const mentions = title.match(/QP Trucking/g) ?? [];
    if (!title) failures.push(`${entry.route}: no title rendered from "${entry.title}"`);
    if (title.length > SERP_TITLE_MAX) failures.push(`${entry.route}: ${title.length} chars — "${title}"`);
    if (title.length < SERP_TITLE_MIN) failures.push(`${entry.route}: only ${title.length} chars — "${title}"`);
    if (mentions.length !== 1) failures.push(`${entry.route}: brand appears ${mentions.length}× — "${title}"`);
    if (/[,…]$/.test(title)) failures.push(`${entry.route}: title is truncated — "${title}"`);
    const tailIsStandard = title.endsWith(" | QP Trucking") || title.startsWith("QP Trucking Solutions |");
    if (!tailIsStandard && !BRAND_LED_ROUTES.has(entry.route)) failures.push(`${entry.route}: brand tail is inconsistent — "${title}"`);
  }
  assert.deepEqual(failures, []);
});

test("no title reads as a keyword list (the stuffing pattern Google rewrites)", () => {
  const stuffed = entries.map(renderedTitle).filter((title) => (title.match(/,/g) ?? []).length > 1);
  assert.deepEqual(stuffed, []);
});

test("no title collapses to a bare brand label or a one-word stub", () => {
  // A title Google rewrites is often a title that says nothing: the brand alone,
  // or a single noun. Strip the brand and require a real subject to be left.
  for (const entry of entries) {
    const subject = renderedTitle(entry)
      .replace(/QP Trucking Solutions/g, " ")
      .replace(/\|\s*QP Trucking$/, " ")
      .replace(/[|,—–]/g, " ");
    const words = subject.split(/\s+/).filter((w) => w.replace(/[^\w]/g, "").length > 2);
    assert.ok(words.length >= 2, `${entry.route}: ${renderedTitle(entry)} describes nothing (${subject.trim()})`);
  }
});

test("titles are unique across every indexed route", () => {
  const byTitle = new Map();
  for (const entry of entries) {
    const title = renderedTitle(entry);
    byTitle.set(title, [...(byTitle.get(title) ?? []), entry.route]);
  }
  const duplicates = [...byTitle].filter(([, routes]) => routes.length > 1);
  assert.deepEqual(duplicates, []);
});

test("meta descriptions fit the snippet budget and stay unique per route", () => {
  const problems = [];
  const seen = new Map();
  for (const entry of entries) {
    const { description } = render({ title: entry.title, description: entry.description, path: entry.route });
    if (description.length > SERP_DESCRIPTION_MAX) problems.push(`${entry.route}: ${description.length} chars`);
    if (description.length < SERP_DESCRIPTION_MIN) problems.push(`${entry.route}: only ${description.length} chars`);
    seen.set(description, [...(seen.get(description) ?? []), entry.route]);
  }
  assert.deepEqual(problems, []);
  const duplicates = [...seen].filter(([, routes]) => routes.length > 1);
  assert.deepEqual(duplicates, []);
});

test("composeTitle adds the brand tail once and never truncates a title that fits", () => {
  assert.equal(composeTitle("BOC-3 Filing Service — $60"), "BOC-3 Filing Service — $60 | QP Trucking");
  assert.equal(composeTitle("Brand-first | QP Trucking Solutions"), "Brand-first | QP Trucking Solutions");
  // The tail is dropped before any word is, so a long subject still renders whole.
  assert.equal(
    composeTitle("Freight Broker Credit Checks for Carriers & Owner-Operators"),
    "Freight Broker Credit Checks for Carriers & Owner-Operators",
  );
  // Nothing a page can actually render is clipped; a runaway title keeps its
  // word boundary and the dev warning reports it instead.
  assert.match(composeTitle("word ".repeat(30).trim()), /[^ ]…$/);
  assert.ok(composeTitle("word ".repeat(30).trim()).length <= SERP_TITLE_MAX);
});

/* ------------------------------------------------------------------ */
/*  Article structured data                                            */
/* ------------------------------------------------------------------ */
const articleItems = () =>
  insights.map((post) => ({
    post,
    item: articleSchema({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      updated: post.updated,
      image: post.image,
      author: post.author,
      category: post.category,
      keywords: post.keywords,
      wordCount: insightWordCount(post),
    }),
  }));

test("every insight page emits Article, NewsArticle or BlogPosting markup", () => {
  const allowed = new Set(["Article", "NewsArticle", "BlogPosting"]);
  const missing = articleItems().filter(({ item }) => !allowed.has(item["@type"]));
  assert.deepEqual(missing.map((m) => `${m.post.slug}: ${m.item["@type"]}`), []);
});

test("article markup declares headline, byline and both dates in machine-readable form", () => {
  const isoDate = /^\d{4}-\d{2}-\d{2}$/;
  for (const { post, item } of articleItems()) {
    assert.equal(item["@context"], "https://schema.org", post.slug);
    assert.equal(item.headline, post.title, post.slug);
    assert.equal(item.description, post.description, post.slug);
    assert.match(item.datePublished, isoDate, post.slug);
    assert.match(item.dateModified, isoDate, post.slug);
    assert.ok(new Date(item.dateModified) >= new Date(item.datePublished), `${post.slug}: modified before published`);
    // `author` as a bare @id pointer is what made validators report no usable markup.
    assert.ok(item.author.name && item.author["@type"], `${post.slug}: author needs @type + name`);
    assert.equal(item.author.name, post.author, post.slug);
    assert.ok(item.publisher["@type"] === "Organization" && item.publisher.name && item.publisher.logo, `${post.slug}: publisher needs name + logo`);
    assert.ok(item.image["@type"] === "ImageObject" && item.image.url.startsWith("https://"), `${post.slug}: absolute image required`);
    assert.equal(item.mainEntityOfPage["@id"], `${SITE_URL}/insights/${post.slug}`, post.slug);
    assert.equal(item.url, `${SITE_URL}/insights/${post.slug}`, post.slug);
    assert.ok(item.wordCount > 40, `${post.slug}: wordCount should reflect the body`);
    assert.ok(item.keywords.length > 0, `${post.slug}: keywords carry the topical signals`);
    assert.equal(item.isPartOf["@id"], `${SITE_URL}/insights#blog`, post.slug);
    assert.equal(item.inLanguage, "en-US", post.slug);
  }
});

test("article items link back into the organization entity graph", () => {
  const orgId = organizationSchema()["@id"];
  assert.ok(orgId.endsWith("#organization"));
  for (const { item } of articleItems()) {
    assert.equal(item.author["@id"], orgId, item.headline);
    assert.equal(item.publisher["@id"], orgId, item.headline);
    assert.equal(item.publisher.name, brand.name, item.headline);
  }
});

test("the insights index exposes each posting with byline and dates", () => {
  const blog = blogSchema(insights);
  assert.equal(blog["@id"], `${SITE_URL}/insights#blog`);
  assert.equal(blog["@type"], "Blog");
  assert.equal(blog.blogPost.length, insights.length);
  assert.equal(websiteSchema()["@type"], "WebSite");
  for (const posting of blog.blogPost) {
    assert.ok(["Article", "NewsArticle", "BlogPosting"].includes(posting["@type"]));
    assert.ok(posting.author.name, "byline");
    assert.match(posting.datePublished, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(posting.dateModified, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(posting.headline.length <= 110, "headline cap");
  }
  // Nested postings must not re-declare a context (the outer graph owns it).
  assert.equal(blog.blogPost[0]["@context"], undefined);
});

test("article pages keep a breadcrumb trail that ends on the article itself", () => {
  for (const post of insights) {
    const trail = breadcrumbSchema([
      { label: "Home", href: "/" },
      { label: "Insights", href: "/insights" },
      { label: post.title, href: `/insights/${post.slug}` },
    ]);
    const items = trail.itemListElement.map((i) => i.item);
    assert.deepEqual(items, [SITE_URL, `${SITE_URL}/insights`, `${SITE_URL}/insights/${post.slug}`]);
  }
});

test("editorial headlines stay readable even where the SERP title is shortened", () => {
  for (const post of insights) {
    assert.ok(post.title.length <= 110, `${post.slug}: H1 headline too long`);
    if (post.seoTitle) {
      assert.notEqual(post.seoTitle, post.title, `${post.slug}: seoTitle must differ from the H1`);
      assert.ok(post.seoTitle.length < post.title.length, `${post.slug}: seoTitle should be the shorter label`);
    }
  }
});
