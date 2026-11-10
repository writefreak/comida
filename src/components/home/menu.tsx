"use client";

import React, { useRef } from "react";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import CustomBtn from "../ui/custom-btn";
import { cn } from "@/lib/utils";

interface MenuCard {
  id: string;
  title: string;
  price: string;
  image: string;
  description: string;
}

const menuCards: MenuCard[] = [
  {
    id: "plated",
    title: "PLATED DINING",
    price: "From $58 pp",
    image: "/food1.jpg",
    description: "Two dishes served alternately, for a proper sit-down dinner.",
  },
  {
    id: "feasting",
    title: "FEASTING MENU",
    price: "From $46 pp",
    image: "/food2.jpg",
    description: "Platters down the middle of the table. Pass, share, repeat.",
  },
  {
    id: "canapes",
    title: "CANAPÉS",
    price: "From $18 pp",
    image: "/food3.jpg",
    description: "One-bite wonders for drinks receptions and launches.",
  },
];

const waveMask = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 40' preserveAspectRatio='none'><path d='M0 20Q30 0 60 20T120 20V40H0Z'/></svg>",
)}")`;

function Wave({ flip = false }: { flip?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "block h-5 w-full bg-charcoal sm:h-7 md:h-20 2xl:h-14",
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

function ScrubWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = (index / total) * 0.6;
  const end = start + 0.4;
  const y = useTransform(progress, [start, end], ["125%", "0%"]);
  const rotate = useTransform(progress, [start, end], [8, 0]);

  return (
    <span className="mr-[0.25em] -mb-[0.2em] inline-block overflow-hidden pb-[0.2em] align-bottom">
      <motion.span
        className="inline-block origin-bottom-left"
        style={{ y, rotate }}
      >
        {word}
      </motion.span>
    </span>
  );
}

function ScrubHeading({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 45%"],
  });
  const words = text.split(" ");

  return (
    <h2
      ref={ref}
      className="text-3xl text-center font-bold leading-[1.05] text-[#f4f4f5] md:text-5xl 2xl:text-8xl"
    >
      {words.map((w, i) => (
        <ScrubWord
          key={i}
          word={w}
          index={i}
          total={words.length}
          progress={scrollYProgress}
        />
      ))}
    </h2>
  );
}

function Panel({
  card,
  index,
  total,
  progress,
}: {
  card: MenuCard;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const first = index === 0;
  const last = index === total - 1;

  // Entrance window: panel i wipes in while panel i-1 is leaving
  const inRange = first ? [0, 0.001] : [(index - 1) / total, index / total];
  const inOut = first ? [1, 1] : [0, 1];
  // Exit window: this panel shrinks while the next one wipes in
  const outRange = last ? [0.998, 1] : [index / total, (index + 1) / total];
  const outOut = last ? [1, 1] : [1, 0];

  const enter = useTransform(progress, inRange, inOut);
  const exit = useTransform(progress, outRange, outOut);

  const clip = useTransform(enter, (v) => `inset(${(1 - v) * 100}% 0% 0% 0%)`);
  const imgScale = useTransform(enter, [0, 1], [1.5, 1]);
  const textY = useTransform(enter, [0, 1], [140, 0]);
  const textOpacity = useTransform(enter, [0.35, 1], [0, 1]);
  const panelScale = useTransform(exit, [0, 1], [0.84, 1]);
  const dim = useTransform(exit, [0, 1], [0.8, 0]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-4 md:px-10"
      style={{ zIndex: index + 1, scale: panelScale }}
    >
      <motion.article
        className="group relative h-[82svh] w-full max-w-[1800px] overflow-hidden rounded-3xl shadow-2xl 2xl:h-[78svh]"
        style={{ clipPath: clip }}
      >
        <motion.img
          src={card.image}
          alt={card.title}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ scale: imgScale }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent"
        />

        {/* Price badge */}
        <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-black/50 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md md:left-8 md:top-8 md:text-sm 2xl:left-12 2xl:top-12 2xl:px-6 2xl:py-3 2xl:text-lg">
          {card.price}
        </div>

        <motion.div
          className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14 2xl:p-20"
          style={{ y: textY, opacity: textOpacity }}
        >
          <h3 className="mb-3 text-3xl font-bold text-white drop-shadow-lg sm:text-5xl lg:text-6xl 2xl:mb-6 2xl:text-8xl">
            {card.title}
          </h3>
          <p className="mb-6 max-w-xl text-base leading-relaxed text-white/85 drop-shadow-md sm:text-lg 2xl:max-w-3xl 2xl:text-3xl">
            {card.description}
          </p>
          <div className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-primary transition-colors duration-200 group-hover:text-[#fb923c] 2xl:text-xl">
            <span>READ MORE</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 2xl:h-6 2xl:w-6" />
          </div>
        </motion.div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-charcoal"
          style={{ opacity: dim }}
        />
      </motion.article>
    </motion.div>
  );
}

export default function MenuSection() {
  const reduceMotion = useReducedMotion();
  const total = menuCards.length;

  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.4,
  });

  useMotionValueEvent(progress, "change", (v) => {
    setActive(Math.min(total - 1, Math.round(v * total * 0.999)));
  });

  // Button: scrubbed in and out
  const btnRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: btnProg } = useScroll({
    target: btnRef,
    offset: ["start end", "end start"],
  });

  if (reduceMotion) {
    return (
      <section
        aria-label="Menu Offerings"
        className="w-full bg-charcoal px-6 py-20 text-[#f4f4f5] lg:px-16"
      >
        <div className="mx-auto max-w-7xl 2xl:max-w-[1600px]">
          <h2 className="text-4xl font-bold md:text-5xl">
            Our Dining Offerings
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {menuCards.map((c) => (
              <div
                key={c.id}
                className="relative h-[420px] overflow-hidden rounded-2xl"
              >
                <img
                  src={c.image}
                  alt={c.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-xl font-bold text-white">{c.title}</h3>
                  <p className="text-white/85">{c.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      aria-label="Menu Offerings"
      className="relative w-full bg-[#f9f8f6]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <Wave />

      <div className="relative z-10 -my-px bg-charcoal text-[#f4f4f5]">
        {/* Header */}
        <div className="mx-auto flex flex-col items-center gap-4 max-w-7xl px-6 md:pb-8 pt-24 md:pt-32 lg:px-16 2xl:max-w-[1800px] 2xl:pb-28 2xl:pt-32">
          <ScrubHeading text="Our Dining Offerings" />
          <p className="text-sm text-center md:max-w-md md:text-lg text-neutral-400">
            Crafted to showcase flavor and variety, our menu offers something
            exceptional for every palate.
          </p>
        </div>

        {/* Pinned stacking track */}
        <div ref={trackRef} style={{ height: `${(total + 1) * 100}svh` }}>
          <div className="sticky top-0 min-h-svh overflow-hidden">
            {menuCards.map((card, i) => (
              <Panel
                key={card.id}
                card={card}
                index={i}
                total={total}
                progress={progress}
              />
            ))}
          </div>
        </div>

        <div ref={btnRef} className="flex justify-center pb-10 md:pb-16">
          <div>
            <CustomBtn rightIcon={<ArrowRight className="h-4 w-4" />}>
              Explore full menu
            </CustomBtn>
          </div>
        </div>
      </div>

      <Wave flip />
    </motion.section>
  );
}
