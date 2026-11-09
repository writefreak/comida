type PageDividerProps = {
  /** Fill color of the torn edge shape, as a CSS color value */
  fill?: string;
  flip?: boolean;
};

/**
 * A torn paper edge used between sections in place of a hard rule.
 * Echoes the deckled edge of a printed page rather than a decorative flourish.
 */
export default function PageDivider({
  fill = "#fbf6ee",
  flip = false,
}: PageDividerProps) {
  return (
    <div
      className={`deckle-edge ${flip ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1200 28" preserveAspectRatio="none">
        <path
          d="M0,10 C 20,22 40,0 60,9 C 80,18 100,2 120,11 C 140,20 160,3 180,10
             C 200,17 220,1 240,9 C 260,17 280,3 300,11 C 320,19 340,2 360,10
             C 380,18 400,1 420,9 C 440,17 460,3 480,11 C 500,19 520,2 540,10
             C 560,18 580,1 600,9 C 620,17 640,3 660,11 C 680,19 700,2 720,10
             C 740,18 760,1 780,9 C 800,17 820,3 840,11 C 860,19 880,2 900,10
             C 920,18 940,1 960,9 C 980,17 1000,3 1020,11 C 1040,19 1060,2 1080,10
             C 1100,18 1120,1 1140,9 C 1160,17 1180,3 1200,10 L1200,28 L0,28 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
