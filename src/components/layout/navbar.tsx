"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
const ACCENT = "#ff3300";

const links = [
  { label: "Home", href: "#top" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Espanol" },
] as const;

type LangCode = (typeof languages)[number]["code"];

function Flag({ code }: { code: LangCode }) {
  return (
    <span className="block h-6 w-6 shrink-0 overflow-hidden rounded-full 2xl:h-7 2xl:w-7">
      <svg
        viewBox="0 0 60 30"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden
      >
        {code === "en" ? (
          <>
            <rect width="60" height="30" fill="#012169" />
            <path d="M0 0L60 30M60 0L0 30" stroke="#fff" strokeWidth="6" />
            <path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" strokeWidth="2" />
            <path d="M30 0V30M0 15H60" stroke="#fff" strokeWidth="10" />
            <path d="M30 0V30M0 15H60" stroke="#C8102E" strokeWidth="6" />
          </>
        ) : (
          <>
            <rect width="60" height="30" fill="#AA151B" />
            <rect y="7.5" width="60" height="15" fill="#F1BF00" />
          </>
        )}
      </svg>
    </span>
  );
}

function RollingText({ text }: { text: string }) {
  return (
    <span className="inline-flex" aria-label={text}>
      {text.split("").map((char, i) => {
        const transition = { duration: 0.45, ease: EASE, delay: i * 0.025 };
        return (
          <span
            key={i}
            aria-hidden
            className="inline-block overflow-hidden leading-[1.2]"
          >
            <motion.span
              variants={{
                rest: { y: "0%", transition },
                hover: { y: "-100%", transition },
              }}
              className="relative block"
            >
              {char}
              <span
                className="absolute left-0 top-full"
                style={{ color: ACCENT }}
              >
                {char}
              </span>
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

const listVariants: Variants = {
  closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  open: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
};

const itemVariants: Variants = {
  closed: { y: "110%", transition: { duration: 0.35, ease: EASE } },
  open: { y: "0%", transition: { duration: 0.75, ease: EASE } },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState<LangCode>("en");
  const [hovered, setHovered] = useState<number | null>(null);
  const langRef = useRef<HTMLDivElement>(null);

  // Lock page scroll while the sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) setHovered(null);
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes everything
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setLangOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Click outside closes the language dropdown
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-20 w-full max-w-[2200px] items-center justify-between px-5 sm:px-8 md:h-24 md:px-12 2xl:h-28 2xl:px-20">
          <a
            href="#top"
            aria-label="Comida home"
            onClick={() => setOpen(false)}
            className="flex items-center"
          >
            <img
              src="/comida.png"
              alt="Comida"
              className="h-16 w-auto object-contain md:h-24 2xl:h-32"
            />
          </a>

          <div className="flex items-center gap-3 md:gap-4">
            {/* <div ref={langRef} className="relative">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                aria-label="Change language"
                onClick={() => {
                  setLangOpen((v) => !v);
                  setOpen(false);
                }}
                className="flex h-11 w-14 items-center justify-center gap-1.5 rounded-full border border-white/10 transition-colors hover:border-white/30 md:h-12 md:w-16 2xl:h-14 2xl:w-[4.5rem]"
              >
                <Flag code={lang} />
                <motion.span
                  animate={{ rotate: langOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="flex"
                  aria-hidden
                >
                  <ChevronDown className="h-4 w-4 text-white" strokeWidth={2} />
                </motion.span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.ul
                    role="listbox"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.22, ease: EASE }}
                    className="absolute right-0 top-full mt-3 w-44 origin-top-right rounded-2xl border border-white/10 bg-[#242424] p-1.5 shadow-2xl"
                  >
                    {languages.map((l) => (
                      <li
                        key={l.code}
                        role="option"
                        aria-selected={lang === l.code}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setLang(l.code);
                            setLangOpen(false);
                          }}
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 font-body text-sm text-white transition-colors hover:bg-white/10 ${
                            lang === l.code ? "bg-white/5" : ""
                          }`}
                        >
                          <Flag code={l.code} />
                          {l.label}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div> */}

            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => {
                setOpen((v) => !v);
                setLangOpen(false);
              }}
              className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-b from-[#ff4a1f] to-[#ff2d00] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] md:h-12 md:w-12 2xl:h-14 2xl:w-14 2xl:rounded-2xl"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="flex"
                >
                  {open ? (
                    <X
                      className="h-6 w-6 text-white 2xl:h-7 2xl:w-7"
                      strokeWidth={2.5}
                    />
                  ) : (
                    <Menu
                      className="h-6 w-6 text-white 2xl:h-7 2xl:w-7"
                      strokeWidth={2.5}
                    />
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{
              clipPath: "inset(0% 0% 0% 0%)",
              transition: { duration: 0.8, ease: EASE },
            }}
            exit={{
              clipPath: "inset(0% 0% 100% 0%)",
              transition: { duration: 0.6, ease: EASE, delay: 0.15 },
            }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-[#1a1a1a] px-6"
          >
            <motion.ul
              variants={listVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col items-center gap-2 sm:gap-3 2xl:gap-5"
            >
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  variants={itemVariants}
                  className="overflow-hidden px-16 py-1"
                >
                  <motion.a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial="rest"
                    animate="rest"
                    whileHover="hover"
                    onHoverStart={() => setHovered(i)}
                    onHoverEnd={() => setHovered(null)}
                    onFocus={() => setHovered(i)}
                    onBlur={() => setHovered(null)}
                    style={{
                      opacity: hovered === null || hovered === i ? 1 : 0.3,
                    }}
                    className="relative inline-flex font-display text-3xl font-black uppercase tracking-tight text-white transition-opacity duration-300 md:text-5xl 2xl:text-6xl"
                  >
                    <RollingText text={link.label} />

                    <motion.span
                      variants={{
                        rest: { x: -20, opacity: 0 },
                        hover: { x: 0, opacity: 1 },
                      }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="absolute bottom-0 left-full top-0 ml-3 flex items-center md:ml-5"
                      aria-hidden
                    >
                      <ArrowRight
                        className="h-6 w-6 md:h-9 md:w-9 2xl:h-12 2xl:w-12"
                        strokeWidth={2.5}
                        style={{ color: ACCENT }}
                      />
                    </motion.span>

                    <motion.span
                      variants={{
                        rest: { scaleX: 0 },
                        hover: { scaleX: 1 },
                      }}
                      transition={{ duration: 0.5, ease: EASE }}
                      style={{ backgroundColor: ACCENT, originX: 0 }}
                      className="absolute bottom-0 left-0 h-[3px] w-full md:h-1"
                    />
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
