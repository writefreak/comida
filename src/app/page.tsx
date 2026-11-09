import About from "@/components/home/about";
import Hero from "@/components/home/hero";
import Menu from "@/components/home/menu";
import PageDivider from "@/components/ui/page-divider";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero />
      {/* <PageDivider /> */}
      <About />
      <Menu />
    </div>
  );
};

export default page;
