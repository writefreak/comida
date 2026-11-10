"use client";

import React, { useState, useRef, Fragment } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import CustomBtn from "../ui/custom-btn";

interface TabItem {
  id: string;
  title: string;
  image: string;
  description: string;
}

const menuItems: TabItem[] = [
  {
    id: "starters",
    title: "Artisanal Starters",
    image: "food1.jpg",
    description:
      "Delicate creations designed to awaken the palate. Each starter balances crisp textures with vibrant, locally sourced seasonal ingredients.",
  },
  {
    id: "pastas",
    title: "Handcrafted Pastas",
    image: "food2.jpg",
    description:
      "Rolled and cut daily by our master chefs, our artisanal pastas are paired with rich, slow-simmered sauces that honor traditional techniques.",
  },
  {
    id: "mains",
    title: "Signature Mains",
    image: "food3.jpg",
    description:
      "Masterfully cooked proteins and fresh coastal catches, elevated by bold culinary execution and harmonious flavor pairings.",
  },
  {
    id: "specials",
    title: "Chef's Specials",
    image: "food4.jpg",
    description:
      "An evolving showcase of modern gastronomy, highlighting inventive combinations and peak seasonal harvest elements.",
  },
  {
    id: "desserts",
    title: "Decadent Desserts",
    image: "food5.jpg",
    description:
      "A sweet finale of handcrafted confections, velvety textures, and exquisite presentation to close your dining journey.",
  },
];

const headingWords = [
  { text: "An", accent: true },
  { text: "Exquisite", accent: true },
  { text: "Blend", accent: true },
  { text: "of" },
  { text: "Taste" },
  { text: "and" },
  { text: "Pure" },
  { text: "Culinary" },
  { text: "Expertise" },
];

const leftContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const word: Variants = {
  hidden: {
    y: "120%",
    rotate: 6,
    scale: 0.92,
    opacity: 0,
    filter: "blur(12px)",
  },
  visible: {
    y: "0%",
    rotate: 0,
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

const listItem: Variants = {
  hidden: { x: -70, opacity: 0, filter: "blur(10px)" },
  visible: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const rightContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.16, delayChildren: 0.25 },
  },
};

const imageReveal: Variants = {
  hidden: {
    clipPath: "inset(100% 0% 0% 0% round 16px)",
    scale: 1.15,
    opacity: 0,
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0% round 16px)",
    scale: 1,
    opacity: 1,
    transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { y: 50, opacity: 0, filter: "blur(10px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function AboutSection() {
  const [activeItem, setActiveItem] = useState<TabItem>(menuItems[0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // INCREASED PARALLAX: Changed from [-30, 30] to [-90, 90] for a much heavier shift
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-90, 90]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 0.9]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#f9f8f6] text-[#1c1917] px-6 py-24 md:py-48 md:px-14 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-12 items-start">
          {/* Left Column: Heading & Navigation List */}
          <motion.div
            className="flex flex-col justify-between"
            variants={leftContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
          >
            <div>
              <h2 className="text-[26.5px] md:text-5xl font-bold text-[#1c1917] md:pb-12 pb-6 max-w-md leading-[36px] md:leading-15">
                {headingWords.map(({ text, accent }, i) => (
                  <Fragment key={text}>
                    <span className="inline-block overflow-hidden pb-[0.15em] -mb-[0.15em] align-top">
                      <motion.span
                        variants={word}
                        className={`inline-block origin-bottom-left will-change-transform ${
                          accent ? "text-primary" : ""
                        }`}
                      >
                        {text}
                      </motion.span>
                    </span>
                    {i < headingWords.length - 1 && " "}
                  </Fragment>
                ))}
              </h2>

              {/* Interactive List */}
              <div className="flex flex-col w-full">
                {menuItems.map((item) => {
                  const isActive = activeItem.id === item.id;
                  return (
                    <motion.div
                      key={item.id}
                      variants={listItem}
                      onMouseEnter={() => setActiveItem(item)}
                      onClick={() => setActiveItem(item)}
                      className="group cursor-pointer py-4 border-b border-[#e5e5e0] transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-base md:text-2xl font-medium transition-colors duration-300 ${
                            isActive
                              ? "text-primary"
                              : "text-[#a1a1aa] group-hover:text-[#4b5563]"
                          }`}
                        >
                          {item.title}
                        </span>
                      </div>

                      {/* Active Indicator Underline */}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="h-[0.4px] bg-primary -mb-[19px] mt-4"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 35,
                          }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Preview Card with Amplified Parallax */}
          <motion.div style={{ y: parallaxY }}>
            <motion.div
              className="flex flex-col gap-6"
              variants={rightContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
            >
              {/* Image Container with Curtain Reveal Motion */}
              <motion.div
                variants={imageReveal}
                className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden"
              >
                <AnimatePresence initial={false}>
                  <motion.div
                    key={activeItem.id}
                    className="absolute inset-0 w-full h-full"
                    initial={{
                      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
                      scale: 1.1,
                    }}
                    animate={{
                      clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
                      scale: 1,
                    }}
                    exit={{
                      clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
                      scale: 0.95,
                    }}
                    transition={{
                      duration: 0.55,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    <motion.img
                      src={activeItem.image}
                      alt={activeItem.title}
                      style={{ scale: imageScale }}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Description Text with Rolling Entrance */}
              <motion.div
                variants={fadeUp}
                className="h-20 sm:h-24 relative overflow-hidden"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.p
                    key={activeItem.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    className="text-sm md:text-lg text-[#52525b] leading-relaxed absolute top-0 left-0 w-full"
                  >
                    {activeItem.description}
                  </motion.p>
                </AnimatePresence>
              </motion.div>

              {/* CTA Button */}
              <motion.div variants={fadeUp} className="pb-20 md:pb-10">
                <CustomBtn rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Explore our menu
                </CustomBtn>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
