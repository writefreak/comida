import About from "@/components/home/about";
import Hero from "@/components/home/hero";
import Menu from "@/components/home/menu";
import QuickDishes from "@/components/home/quick-dishes";
import PageDivider from "@/components/ui/page-divider";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero />
      <About />
      <Menu />
      <QuickDishes />
      {/* <PageDivider /> */}
    </div>
  );
};

export default page;
