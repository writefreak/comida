"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  "Order your meal",
  "Choose favorite dishes",
  "Fresh to your door",
  "Hot and ready fast",
];

// Repeated so one group is always wider than the screen, even on ultrawide monitors
const group = [...items, ...items];

// One wave period, used as a mask so the colour comes from bg-primary
const waveMask = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 40' preserveAspectRatio='none'><path d='M0 20Q30 0 60 20T120 20V40H0Z'/></svg>",
)}")`;

function Wave({ flip = false }: { flip?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "block h-4 w-full bg-primary sm:h-5 md:h-7 2xl:h-10",
        flip && "rotate-180",
      )}
      style={{
        WebkitMaskImage: waveMask,
        maskImage: waveMask,
        WebkitMaskRepeat: "repeat-x",
        maskRepeat: "repeat-x",
        WebkitMaskSize: "auto 100%",
        maskSize: "auto 100%",
      }}
    />
  );
}

export default function PageDivider() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-label="Highlights" className="relative bg-[#F9F8F6]">
      <Wave />

      <div className="relative -my-px overflow-hidden bg-primary py-3 md:py-5 2xl:py-8">
        <motion.div
          className="flex w-max"
          animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center"
            >
              {group.map((text, i) => (
                <div
                  key={`${copy}-${i}`}
                  className="flex items-center gap-6 px-4 sm:gap-8 sm:px-6 md:gap-12 md:px-10 2xl:gap-16 2xl:px-14"
                >
                  <span className="whitespace-nowrap font-display text-3xl font-black uppercase leading-none text-white sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl">
                    {text}
                  </span>
                  <TrendingUp
                    className="h-6 w-6 shrink-0 text-white sm:h-9 sm:w-9 md:h-12 md:w-12 2xl:h-16 2xl:w-16"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <Wave flip />
    </section>
  );
}
