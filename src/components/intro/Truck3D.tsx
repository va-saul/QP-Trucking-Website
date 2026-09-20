import type { CSSProperties, ReactNode } from "react";
import { QPMark } from "@/components/brand";

/* ------------------------------------------------------------------ */
/*  A real CSS-3D semi truck: every body panel is a face of a box      */
/*  floating in a preserve-3d stage, so perspective, lighting and      */
/*  parallax are computed by the browser — not faked. GSAP drives      */
/*  `.qp3d-wrap` (position), `.qp3d-rim` (wheel spin) and the road.    */
/* ------------------------------------------------------------------ */

type Style = CSSProperties;
type Faces = Partial<Record<"near" | "far" | "right" | "left" | "top" | "bottom", { className?: string; style?: Style; children?: ReactNode }>>;

/** A 3D box centred at (cx, cy) on the stage plane, `d` px deep, offset by z. */
function Box({
  cx,
  cy,
  z = 0,
  w,
  h,
  d,
  faces,
  style,
}: {
  cx: number;
  cy: number;
  z?: number;
  w: number;
  h: number;
  d: number;
  faces: Faces;
  style?: Style;
}) {
  const face = (key: keyof Faces, fw: number, fh: number, transform: string) => {
    const f = faces[key];
    if (!f) return null;
    return (
      <div
        key={key}
        className={`absolute overflow-hidden ${f.className ?? ""}`}
        style={{
          width: fw,
          height: fh,
          left: "50%",
          top: "50%",
          marginLeft: -fw / 2,
          marginTop: -fh / 2,
          transform,
          ...f.style,
        }}
      >
        {f.children}
      </div>
    );
  };

  return (
    <div
      className="absolute"
      style={{
        left: cx - w / 2,
        top: cy - h / 2,
        width: w,
        height: h,
        transform: `translateZ(${z}px)`,
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      {face("near", w, h, `translateZ(${d / 2}px)`)}
      {face("far", w, h, `rotateY(180deg) translateZ(${d / 2}px)`)}
      {face("right", d, h, `rotateY(90deg) translateZ(${w / 2}px)`)}
      {face("left", d, h, `rotateY(-90deg) translateZ(${w / 2}px)`)}
      {face("top", w, d, `rotateX(90deg) translateZ(${h / 2}px)`)}
      {face("bottom", w, d, `rotateX(-90deg) translateZ(${h / 2}px)`)}
    </div>
  );
}

/** One wheel. `.qp3d-rim` is what GSAP spins. */
function Wheel({ cx, cy, z, size = 46, dim = false }: { cx: number; cy: number; z: number; size?: number; dim?: boolean }) {
  const rim = size * 0.58;
  return (
    <div
      className="qp3d-wheel absolute rounded-full"
      style={{
        left: cx - size / 2,
        top: cy - size / 2,
        width: size,
        height: size,
        transform: `translateZ(${z}px)`,
        filter: dim ? "brightness(.45)" : undefined,
      }}
    >
      <div className="qp3d-rim absolute rounded-full" style={{ inset: (size - rim) / 2 }}>
        <span className="qp3d-spokes absolute rounded-full" style={{ inset: "16%" }} />
        <span
          className="absolute rounded-full"
          style={{ inset: "36%", background: "radial-gradient(circle at 40% 35%, #d7e0ec, #55617a 80%)" }}
        />
      </div>
    </div>
  );
}

/* Trailer paint: bright aluminium with corrugation on the side that
   carries the QP decal, cooler tones on the hidden faces. */
const TRAILER_SIDE: Style = {
  background:
    "repeating-linear-gradient(90deg, rgba(10,36,80,.05) 0 2px, rgba(0,0,0,0) 2px 15px), linear-gradient(180deg,#f7fafd 0%,#dbe4f0 78%,#b9c6d8 100%)",
  boxShadow: "inset 0 0 0 1px rgba(10,36,80,.18)",
};
const TRAILER_TOP: Style = {
  background: "linear-gradient(90deg,#e9eef6,#c4d0e0)",
  boxShadow: "inset 0 0 0 1px rgba(10,36,80,.12)",
};
const TRAILER_END: Style = {
  background: "linear-gradient(180deg,#c6d0df,#8a98ac)",
  boxShadow: "inset 0 0 0 1px rgba(10,36,80,.2)",
};

const CAB_SIDE: Style = {
  background: "linear-gradient(180deg,#3d7cf0 0%,#2f6fe0 42%,#1b4fa0 78%,#123a72 100%)",
  boxShadow: "inset 0 0 0 1px rgba(4,18,42,.35)",
};
const CAB_TOP: Style = { background: "linear-gradient(90deg,#2f6fe0,#154193)" };
const CHROME: Style = {
  background: "linear-gradient(180deg,#f8fafc 0%,#b9c6d8 45%,#66738a 52%,#d7e0ec 100%)",
};
const DARK_METAL: Style = { background: "linear-gradient(180deg,#3a4459,#141c2c)" };

export function Truck3D() {
  return (
    /* `.qp3d` gets the idle bob; `.qp3d-rotor` is the fixed 3/4 camera angle */
    <div className="qp3d absolute left-0 top-0" style={{ width: 640, height: 230, transformStyle: "preserve-3d" }}>
      <div
        className="qp3d-rotor absolute inset-0"
        style={{ transform: "rotateX(-7deg) rotateY(16deg)", transformStyle: "preserve-3d" }}
      >
        {/* ---------------- trailer ---------------- */}
        <Box
          cx={205}
          cy={93}
          w={350}
          h={118}
          d={104}
          faces={{
            near: {
              style: TRAILER_SIDE,
              children: (
                <>
                  {/* gold highway stripe along the skirt */}
                  <div className="absolute inset-x-0" style={{ bottom: 9, height: 5, background: "linear-gradient(90deg,#e8a33d,#f2b441)" }} />
                  {/* main decal — the official logo on the box side */}
                  <div className="absolute flex flex-col items-center" style={{ left: 0, right: 0, top: 14 }}>
                    <QPMark tone="navy" className="h-[44px] w-[44px]" />
                    <span
                      className="mt-1 font-display font-extrabold tracking-[0.14em] text-[#123a72]"
                      style={{ fontSize: 15 }}
                    >
                      QP TRUCKING SOLUTIONS
                    </span>
                    <span className="font-mono uppercase tracking-[0.3em] text-[#55617a]" style={{ fontSize: 6.5 }}>
                      Pure Non-Recourse™ factoring · qpfactoring.com
                    </span>
                  </div>
                  {/* unit number, like a real fleet */}
                  <span className="absolute font-mono font-medium text-[#3a4459]" style={{ right: 10, top: 8, fontSize: 8 }}>
                    QP-101
                  </span>
                </>
              ),
            },
            far: { style: TRAILER_SIDE },
            top: { style: TRAILER_TOP },
            right: { style: TRAILER_END },
            left: {
              style: TRAILER_END,
              children: (
                <>
                  {/* rear doors: seams, hinges and tail lights */}
                  <div className="absolute inset-y-2 left-1/2 w-[2px] -translate-x-1/2" style={{ background: "rgba(10,36,80,.35)" }} />
                  {[6, 30].map((y) => (
                    <div key={y} className="absolute flex w-full justify-between px-2" style={{ top: y }}>
                      <span className="h-[7px] w-[16px] rounded-[2px]" style={{ background: "#d8322c", boxShadow: "0 0 7px #d8322c" }} />
                      <span className="h-[7px] w-[16px] rounded-[2px]" style={{ background: "#d8322c", boxShadow: "0 0 7px #d8322c" }} />
                    </div>
                  ))}
                </>
              ),
            },
          }}
        />

        {/* chassis rails + landing gear (legs reach the road) */}
        <Box cx={208} cy={158} w={336} h={9} d={78} faces={{ near: { style: DARK_METAL }, far: { style: DARK_METAL }, top: { style: DARK_METAL } }} />
        <Box cx={330} cy={178} z={34} w={9} h={44} d={9} faces={{ near: { style: DARK_METAL }, top: { style: DARK_METAL }, right: { style: DARK_METAL } }} />
        <Box cx={330} cy={178} z={-34} w={9} h={44} d={9} faces={{ near: { style: DARK_METAL }, top: { style: DARK_METAL }, right: { style: DARK_METAL } }} />

        {/* ---------------- tractor cab ---------------- */}
        <Box
          cx={458}
          cy={94}
          w={152}
          h={120}
          d={108}
          faces={{
            near: {
              style: CAB_SIDE,
              children: (
                <>
                  {/* side glass */}
                  <div
                    className="absolute"
                    style={{
                      left: 66,
                      top: 10,
                      width: 68,
                      height: 34,
                      borderRadius: "5px 10px 4px 4px",
                      background: "linear-gradient(160deg,#0a1425 20%,#274878 55%,#0a1425 100%)",
                      boxShadow: "inset 0 0 0 2px rgba(4,18,42,.6)",
                    }}
                  />
                  {/* door seam + handle + white door logo */}
                  <div className="absolute" style={{ left: 58, top: 6, bottom: 14, width: 2, background: "rgba(4,18,42,.35)" }} />
                  <div className="absolute rounded-full" style={{ left: 78, top: 56, width: 16, height: 4, background: "rgba(4,18,42,.7)" }} />
                  <span className="absolute" style={{ left: 18, top: 58 }}>
                    <QPMark tone="white" className="h-[26px] w-[26px]" />
                  </span>
                  {/* waist chrome strip */}
                  <div className="absolute inset-x-0" style={{ top: 96, height: 3, background: "rgba(248,250,252,.55)" }} />
                </>
              ),
            },
            far: {
              style: CAB_SIDE,
              children: (
                <div
                  className="absolute"
                  style={{
                    left: 18,
                    top: 10,
                    width: 68,
                    height: 34,
                    borderRadius: "10px 5px 4px 4px",
                    background: "linear-gradient(200deg,#0a1425 20%,#274878 55%,#0a1425 100%)",
                    boxShadow: "inset 0 0 0 2px rgba(4,18,42,.6)",
                  }}
                />
              ),
            },
            top: {
              style: CAB_TOP,
              children: (
                /* amber marker lights along the roof edge */
                <div className="absolute flex gap-3" style={{ right: 6, top: 6 }}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-[4px] w-[7px] rounded-full" style={{ background: "#f2b441", boxShadow: "0 0 6px #f2b441" }} />
                  ))}
                </div>
              ),
            },
            right: {
              /* the truck's face: wraparound windshield + chrome grille */
              style: { ...CAB_SIDE, background: "linear-gradient(180deg,#2f6fe0,#154193)" },
              children: (
                <>
                  <div
                    className="absolute"
                    style={{
                      left: 8,
                      right: 8,
                      top: 8,
                      height: 40,
                      borderRadius: "6px 6px 4px 4px",
                      background: "linear-gradient(180deg,#0a1425 15%,#274878 60%,#0a1425)",
                      boxShadow: "inset 0 0 0 2px rgba(4,18,42,.65)",
                    }}
                  />
                  <div
                    className="absolute"
                    style={{
                      left: 14,
                      right: 14,
                      top: 62,
                      height: 44,
                      borderRadius: 5,
                      background: "repeating-linear-gradient(90deg,#e9eef6 0 5px,#66738a 5px 9px)",
                      boxShadow: "inset 0 0 0 2px rgba(4,18,42,.45)",
                    }}
                  />
                  <span className="absolute" style={{ left: 44, top: 50 }}>
                    <QPMark tone="white" className="h-[20px] w-[20px]" />
                  </span>
                  {[14, 82].map((x) => (
                    <span
                      key={x}
                      className="absolute rounded-full"
                      style={{ left: x, top: 100, width: 12, height: 9, background: "radial-gradient(circle at 40% 40%,#fff7e0,#f2b441 70%)", boxShadow: "0 0 14px 3px rgba(242,180,65,.85)" }}
                    />
                  ))}
                </>
              ),
            },
            bottom: { style: DARK_METAL },
          }}
        />

        {/* chrome bumper, sun visor, exhaust stack, fuel tank, mud flaps */}
        <Box cx={542} cy={147} w={16} h={18} d={112} faces={{ near: { style: CHROME }, top: { style: CHROME }, right: { style: CHROME }, far: { style: CHROME } }} />
        <Box cx={524} cy={48} z={0} w={30} h={5} d={110} faces={{ near: { style: CAB_TOP }, top: { style: { background: "#2f6fe0" } }, far: { style: CAB_TOP } }} />
        <Box
          cx={380}
          cy={100}
          z={58}
          w={9}
          h={110}
          d={9}
          faces={{
            near: { style: { ...CHROME, background: "repeating-linear-gradient(180deg,#e9eef6 0 14px,#8a98ac 14px 17px)" } },
            right: { style: CHROME },
            top: { style: { background: "#3a4459" } },
          }}
        />
        <Box cx={380} cy={100} z={-58} w={9} h={110} d={9} faces={{ near: { style: CHROME }, right: { style: CHROME }, top: { style: { background: "#3a4459" } } }} />

        {/* mirrors poking out past the cab sides */}
        <Box cx={530} cy={60} z={62} w={4} h={4} d={20} faces={{ near: { style: DARK_METAL }, top: { style: DARK_METAL } }} />
        <Box cx={530} cy={70} z={70} w={4} h={16} d={12} faces={{ near: { style: { background: "#101828" } }, bottom: { style: DARK_METAL } }} />
        <Box cx={530} cy={60} z={-62} w={4} h={4} d={20} faces={{ near: { style: DARK_METAL }, top: { style: DARK_METAL } }} />
        <Box cx={530} cy={70} z={-70} w={4} h={16} d={12} faces={{ near: { style: { background: "#101828" } }, bottom: { style: DARK_METAL } }} />
        <Box
          cx={473}
          cy={167}
          z={16}
          w={66}
          h={26}
          d={70}
          faces={{
            near: { style: { ...CHROME, borderRadius: 12 } },
            right: { style: { ...CHROME, borderRadius: 12 } },
            far: { style: CHROME },
          }}
        />
        {[
          { x: 133 },
          { x: 479 },
        ].map(({ x }) => (
          <Box
            key={x}
            cx={x}
            cy={188}
            z={34}
            w={5}
            h={24}
            d={30}
            faces={{ near: { style: { background: "#0d1524" } }, far: { style: { background: "#0d1524" } } }}
          />
        ))}

        {/* ---------------- wheels (5 near + 5 far) ---------------- */}
        {[64, 108, 408, 452, 524].map((x) => (
          <Wheel key={`n${x}`} cx={x} cy={177} z={53} />
        ))}
        {[64, 108, 408, 452, 524].map((x) => (
          <Wheel key={`f${x}`} cx={x} cy={177} z={-53} dim />
        ))}

        {/* headlight halo at the nose */}
        <div
          className="absolute rounded-full"
          style={{
            left: 538,
            top: 128,
            width: 26,
            height: 26,
            transform: "translateZ(40px)",
            background: "radial-gradient(circle,rgba(242,180,65,.85),rgba(242,180,65,0) 70%)",
          }}
        />
      </div>

      {/* soft ground shadow travelling with the truck */}
      <div
        className="absolute"
        style={{
          left: 30,
          right: 30,
          bottom: 2,
          height: 40,
          background: "radial-gradient(ellipse at center,rgba(2,8,20,.6),rgba(2,8,20,0) 68%)",
        }}
      />
    </div>
  );
}
