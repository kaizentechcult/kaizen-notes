import { Component } from "solid-js";
import Navbar from "../../components/Navbar/Navbar";
import Card from "../../components/Home/Card";
import { isDark, handleTheme } from "../../hooks/common";

const yearLinks = {
  1: "year1",
  2: "year2",
  3: "year3",
  4: "year4",
};
handleTheme();

const Home: Component = () => {
  return (
    <div
      class={`${
        isDark() ? "bg-black text-white" : "bg-[#E7F0FF]"
      } h-fit md:h-screen`}
    >
      <Navbar />
      <div class="flex justify-center items-center gap-8 flex-wrap py-20">
        {Object.entries(yearLinks).map(([year, link]) => (
          <Card year={year} link={link} />
        ))}
      </div>
    </div>
  );
};

export default Home;
