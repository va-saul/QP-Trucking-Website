import Image from "next/image";

/**
 * Full-bleed hero banner image.
 *
 * Desktop (`lg` and up): the photograph is a background layer covering the
 * entire hero band edge to edge — full width, full height — with the copy
 * layered over its left half. A left-to-right navy wash keeps the headline
 * legible while the right half of the picture stays clear.
 *
 * Mobile / tablet: the photograph is a full-width band at the top of the hero
 * that keeps the picture's own aspect ratio, so the *whole* image shows — no
 * cropping, no letterboxing, and no "picture trapped in a block on the right of
 * the screen". Its bottom edge fades into the hero navy, so the band and the
 * copy below still read as one continuous banner.
 */
export function HeroBanner({
  image,
  alt,
  priority = false,
}: {
  image: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="relative aspect-[1376/860] w-full lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          fetchPriority={priority ? "high" : "auto"}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* mobile: light wash for header contrast, then a short fade so the
            picture melts into the hero navy directly beneath it */}
        <span aria-hidden="true" className="absolute inset-0 bg-navy-950/30 lg:hidden" />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent lg:hidden"
        />
        {/* desktop: left-to-right wash — copy left, photograph clear on the right */}
        <span
          aria-hidden="true"
          className="absolute inset-0 hidden bg-gradient-to-r from-navy-950/95 via-navy-950/70 to-navy-950/20 lg:block"
        />
      </div>
      {/* desktop: extra depth at the foot of the band, under the stat rail */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 hidden h-28 bg-gradient-to-t from-navy-950/90 to-transparent lg:block"
      />
    </div>
  );
}
