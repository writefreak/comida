"use client";

import { Fragment, useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import PageDivider from "../ui/page-divider";
import CustomBtn from "../ui/custom-btn";
import { ArrowRight } from "lucide-react";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const word: Variants = {
  hidden: {
    y: "120%",
    rotate: 7,
    rotateX: -80,
    scale: 0.9,
    opacity: 0,
    filter: "blur(14px)",
  },
  visible: {
    y: "0%",
    rotate: 0,
    rotateX: 0,
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { y: 40, opacity: 0, filter: "blur(10px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const headingWords = [
  { text: "Explore", accent: true },
  { text: "our" },
  { text: "sublime" },
  { text: "delicacies" },
  { text: "at" },
  { text: "your" },
  { text: "fingertips" },
];

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
      className="relative min-h-[80vh] md:min-h-dvh flex md:pt-0 pt-40 overflow-hidden"
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

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-8 md:px-14 md:pb-24 md:pt-36 2xl:max-w-7xl">
        <motion.div
          className="md:max-w-2xl 2xl:max-w-3xl"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.35 }}
        >
          <h1
            className="font-display text-[47px] text-[#F1F1F1] font-bold leading-[1.05] md:text-[90px] 2xl:text-8xl"
            style={{ perspective: 800 }}
          >
            {headingWords.map(({ text, accent }, i) => (
              <Fragment key={text}>
                <span className="inline-block overflow-hidden pb-[0.15em] -mb-[0.15em] align-top">
                  <motion.span
                    variants={word}
                    className={`inline-block origin-bottom-left will-change-transform ${
                      accent ? "text-primary-light" : ""
                    }`}
                  >
                    {text}
                  </motion.span>
                </span>
                {i < headingWords.length - 1 && " "}
              </Fragment>
            ))}
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-md font-body text-xs md:text-sm text-paper/85 sm:mt-6 sm:text-base lg:text-lg 2xl:max-w-lg"
          ></motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9 sm:gap-4"
          >
            <CustomBtn
              href="#order"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Order now
            </CustomBtn>

            <CustomBtn href="#menu" variants="secondary">
              View menu
            </CustomBtn>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
