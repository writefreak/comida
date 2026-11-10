import { useState } from "react";
import type { Dish } from "../home/quick-dishes";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import CustomBtn from "./custom-btn";

type DishCardProps = {
  dish: Dish;
  qty: number;
  onAdd: () => void;
  onRemove: () => void;
};

const CURRENCY = "USD";
const LOCALE = "en-US";

const money = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: CURRENCY,
});

const glossy =
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_0_rgba(0,0,0,0.08),0_8px_16px_-6px_rgba(231,66,44,0.6)]";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

function DishImage({ dish }: { dish: Dish }) {
  const [failed, setFailed] = useState(false);

  if (dish.image && !failed) {
    return (
      <img
        src={dish.image}
        alt={dish.name}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-start justify-end bg-primary p-6 text-7xl font-extrabold text-white/20 2xl:text-9xl"
    >
      {dish.name.charAt(0)}
    </div>
  );
}

type StepperProps = {
  qty: number;
  name: string;
  onAdd: () => void;
  onRemove: () => void;
};

function Stepper({ qty, name, onAdd, onRemove }: StepperProps) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-white/25 bg-white/15 p-1 backdrop-blur-md">
      <motion.button
        type="button"
        onClick={onRemove}
        whileTap={{ scale: 0.85 }}
        aria-label={`Remove one ${name}`}
        className={`flex size-9 items-center justify-center rounded-full text-(--text-light) transition-colors hover:bg-white/20 2xl:size-11 ${focusRing}`}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M5 12h14" />
        </svg>
      </motion.button>

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={qty}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.15 }}
          aria-live="polite"
          className="min-w-6 text-center text-sm font-bold text-(--text-light) 2xl:min-w-8 2xl:text-lg"
        >
          {qty}
        </motion.span>
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={onAdd}
        whileTap={{ scale: 0.85 }}
        aria-label={`Add one more ${name}`}
        className={`flex size-9 items-center justify-center rounded-full bg-primary text-(--text-light) 2xl:size-11 ${glossy} ${focusRing}`}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </motion.button>
    </div>
  );
}

export default function DishCard({
  dish,
  qty,
  onAdd,
  onRemove,
}: DishCardProps) {
  const reduce = useReducedMotion();
  const selected = qty > 0;

  const cardVariants = reduce
    ? { rest: {}, hover: {} }
    : { rest: { y: 0 }, hover: { y: -6 } };

  const imageVariants = reduce
    ? { rest: {}, hover: {} }
    : { rest: { scale: 1 }, hover: { scale: 1.08 } };

  const textVariants = reduce
    ? { rest: {}, hover: {} }
    : { rest: { y: 0 }, hover: { y: -4 } };

  const scrimVariants = reduce
    ? { rest: {}, hover: {} }
    : { rest: { opacity: 0.9 }, hover: { opacity: 1 } };

  return (
    <motion.article
      initial="rest"
      whileHover="hover"
      variants={cardVariants}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`relative aspect-4/3 overflow-hidden rounded-2xl bg-primary transition-shadow duration-300 md:aspect-16/10 2xl:rounded-3xl ${
        selected
          ? "shadow-[0_0_0_2px_var(--color-primary),0_18px_36px_-14px_rgba(231,66,44,0.55)]"
          : "shadow-[0_0_0_1px_rgba(231,66,44,0.15)]"
      }`}
    >
      <motion.div
        variants={imageVariants}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <DishImage dish={dish} />
      </motion.div>

      <motion.div
        aria-hidden="true"
        variants={scrimVariants}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-black/5"
      />

      <AnimatePresence>
        {selected && (
          <motion.span
            key="badge"
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 12 }}
            transition={{ type: "spring", stiffness: 500, damping: 18 }}
            className={`absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-(--text-light) md:right-4 md:top-4 2xl:right-6 2xl:top-6 2xl:px-4 2xl:py-1.5 2xl:text-base ${glossy}`}
          >
            {qty} in order
          </motion.span>
        )}
      </AnimatePresence>

      <motion.div
        variants={textVariants}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 md:p-5 2xl:gap-8 2xl:p-8"
      >
        <div className="min-w-0">
          <h3 className="text-xl font-extrabold uppercase leading-none tracking-tight text-(--text-light) md:text-2xl 2xl:text-4xl">
            {dish.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-snug text-(--text-light)/85 2xl:mt-3 2xl:text-lg">
            {dish.description}
          </p>
          <p className="mt-2 text-xl font-extrabold leading-none text-primary md:text-2xl 2xl:mt-3 2xl:text-4xl">
            {money.format(dish.price)}
          </p>
        </div>

        <div className="flex shrink-0 items-center">
          <AnimatePresence mode="wait" initial={false}>
            {selected ? (
              <motion.div
                key="stepper"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.14 }}
              >
                <Stepper
                  qty={qty}
                  name={dish.name}
                  onAdd={onAdd}
                  onRemove={onRemove}
                />
              </motion.div>
            ) : (
              <motion.div
                key="add"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.14 }}
                whileTap={{ scale: 0.94 }}
              >
                <CustomBtn onClick={onAdd}>Place order</CustomBtn>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.article>
  );
}
