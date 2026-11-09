"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          >
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#1c1917] md:pb-12 pb-6 max-w-md leading-tight md:leading-15">
                <span className="text-primary"> An Exquisite Blend </span> of
                Taste and Pure Culinary Expertise{" "}
              </h2>

              {/* Interactive List */}
              <div className="flex flex-col w-full">
                {menuItems.map((item) => {
                  const isActive = activeItem.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setActiveItem(item)}
                      onClick={() => setActiveItem(item)}
                      className="group cursor-pointer py-4 border-b border-[#e5e5e0] transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xl md:text-2xl font-medium transition-colors duration-300 ${
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
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Preview Card with Amplified Parallax */}
          <motion.div
            className="flex flex-col gap-6"
            style={{ y: parallaxY }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
          >
            {/* Image Container with Curtain Reveal Motion */}
            <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden">
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
            </div>

            {/* Description Text with Rolling Entrance */}
            <div className="h-28 sm:h-24 relative overflow-hidden">
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
                  className="text-base sm:text-lg text-[#52525b] leading-relaxed absolute top-0 left-0 w-full"
                >
                  {activeItem.description}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <div>
              <CustomBtn rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore our menu
              </CustomBtn>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
