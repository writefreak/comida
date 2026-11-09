import About from "@/components/home/about";
import Hero from "@/components/home/hero";
import PageDivider from "@/components/ui/page-divider";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero />
      {/* <PageDivider /> */}
      <About />
    </div>
  );
};

export default page;
