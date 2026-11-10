"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import DishCard from "../ui/dish-card";

const CURRENCY = "USD";
const LOCALE = "en-US";

const WHATSAPP_NUMBER = "10000000000";

export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  time: string;
  image?: string;
};

type OrderLine = Dish & { qty: number };

const DISHES: Dish[] = [
  {
    id: "tacos",
    name: "Beef tacos",
    description:
      "Three soft corn tortillas, seasoned beef, onion and fresh coriander.",
    price: 8.5,
    time: "10 min",
    image: "/food1.jpg",
  },
  {
    id: "quesadilla",
    name: "Chicken quesadilla",
    description: "Grilled chicken and melted cheese in a crisp flour tortilla.",
    price: 9,
    time: "12 min",
    image: "/food2.jpg",
  },
  {
    id: "empanadas",
    name: "Beef empanadas",
    description:
      "Two golden pastries filled with spiced beef, served with salsa.",
    price: 7,
    time: "8 min",
    image: "/food3.jpg",
  },
  {
    id: "arepa",
    name: "Cheese arepa",
    description: "Warm corn cake stuffed with soft cheese and a little butter.",
    price: 6.5,
    time: "10 min",
    image: "/food4.jpg",
  },
  {
    id: "fried-rice",
    name: "Egg fried rice",
    description: "Wok fried rice with egg, peas, carrot and spring onion.",
    price: 7.5,
    time: "12 min",
    image: "/food5.jpg",
  },
  {
    id: "wrap",
    name: "Chicken wrap",
    description:
      "Crispy chicken, crunchy lettuce and garlic sauce in a toasted wrap.",
    price: 8,
    time: "10 min",
    image: "/food4.jpg",
  },
];

const money = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: CURRENCY,
});

function defaultOrder(lines: OrderLine[], total: number) {
  const body = lines
    .map((l) => `${l.qty} x ${l.name} (${money.format(l.qty * l.price)})`)
    .join("\n");
  const text = `Hi Comida, I would like to order:\n${body}\n\nTotal: ${money.format(total)}`;
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
    "_blank",
    "noopener",
  );
}

const glossy =
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_0_rgba(0,0,0,0.08),0_8px_16px_-6px_rgba(231,66,44,0.6)]";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

type OrderBarProps = {
  count: number;
  total: number;
  onOrder: () => void;
};

function OrderBar({ count, total, onOrder }: OrderBarProps) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={reduce ? { opacity: 0 } : { y: 96, opacity: 0 }}
          animate={reduce ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: 96, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6"
        >
          <div
            className={`mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-2xl bg-primary p-3 pl-5 text-(--text-light) 2xl:max-w-4xl 2xl:p-4 2xl:pl-7 ${glossy}`}
          >
            <div className="min-w-0">
              <p className="text-sm text-(--text-light)/85 2xl:text-base">
                {count} {count === 1 ? "item" : "items"}
              </p>
              <p className="text-lg font-extrabold 2xl:text-2xl">
                {money.format(total)}
              </p>
            </div>

            <button
              type="button"
              onClick={onOrder}
              className="h-12 shrink-0 rounded-xl bg-white px-6 text-base font-bold text-primary transition-transform active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white 2xl:h-14 2xl:px-8 2xl:text-lg"
            >
              Place order
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type QuickDishesProps = {
  dishes?: Dish[];
  onOrder?: (lines: OrderLine[], total: number) => void;
};

export default function QuickDishes({
  dishes = DISHES,
  onOrder = defaultOrder,
}: QuickDishesProps) {
  const [cart, setCart] = useState<Record<string, number>>({});

  const add = (id: string) =>
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));

  const remove = (id: string) =>
    setCart((c) => {
      const next = { ...c, [id]: (c[id] || 0) - 1 };
      if (next[id] <= 0) delete next[id];
      return next;
    });

  const { lines, count, total } = useMemo(() => {
    const lines: OrderLine[] = dishes
      .filter((d) => cart[d.id])
      .map((d) => ({ ...d, qty: cart[d.id] }));
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: lines.reduce((sum, l) => sum + l.qty * l.price, 0),
    };
  }, [cart, dishes]);

  return (
    <section
      id="quick-dishes"
      aria-labelledby="quick-dishes-title"
      className="bg-[#f9f8f6]  py-16 px-6 md:py-20 md:px-16 2xl:py-28"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="max-w-2xl">
          <h2
            id="quick-dishes-title"
            className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl 2xl:text-6xl"
          >
            Quick dishes
          </h2>
          <p className="mt-3 text-base text-charcoal/65 sm:text-lg 2xl:text-2xl">
            Hot, fresh and ready in 15 minutes or less. Tap add, then place your
            order.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-8">
          {dishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              qty={cart[dish.id] || 0}
              onAdd={() => add(dish.id)}
              onRemove={() => remove(dish.id)}
            />
          ))}
        </div>

        {/* Keeps the last row clear of the order bar */}
        <div
          className={count > 0 ? "h-24 2xl:h-32" : "h-0"}
          aria-hidden="true"
        />
      </div>

      <OrderBar
        count={count}
        total={total}
        onOrder={() => onOrder(lines, total)}
      />
    </section>
  );
}
