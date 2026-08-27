import { Hero } from "@/components/layout/hero";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { CoreStack } from "@/components/sections/core-stack";
import { Projects } from "@/components/sections/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <CoreStack />
      <Projects />
      <Contact />
    </>
  );
}
