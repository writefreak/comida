"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PageDivider from "../ui/page-divider";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex pt-32 md:pt-0 items-end overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src="/food5.jpg"
          alt=""
          style={{ y }}
          className="h-[130%] w-full object-cover brightness-75 will-change-transform"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black via-black/80 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-8 sm:px-10 md:pb-24 md:pt-40 2xl:max-w-7xl">
        <div className="md:max-w-2xl 2xl:max-w-3xl">
          <h1 className="font-display text-[43px] text-[#F1F1F1] font-bold leading-[1.05] sm:text-6xl lg:text-7xl 2xl:text-8xl">
            <span className="text-primary-light"> Explore</span> our sublime
            delicacies at your fingertips
          </h1>

          <p className="mt-5 max-w-md font-body text-xs md:text-sm text-paper/85 sm:mt-6 sm:text-base lg:text-lg 2xl:max-w-lg"></p>
          <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9 sm:gap-4">
            <a
              href="#books"
              className="rounded-full bg-orange px-6 py-3 font-body text-sm font-semibold text-paper transition-colors hover:bg-orange-deep"
            >
              Browse the books
            </a>

            <a
              href="#poems"
              className="rounded-full border border-paper/40 px-6 py-3 font-body text-sm font-semibold text-paper transition-colors hover:border-paper hover:bg-paper/10"
            >
              Read the poems
            </a>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <PageDivider fill="#fbf6ee" />
      </div>
    </section>
  );
}
