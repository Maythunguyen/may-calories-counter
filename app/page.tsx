
import { HeroSectionOne } from "@/components/Hero";
import {  NavbarSection } from "@/components/Navbar";

export default function Home() {
  return (
    <main className="py-20 mx-auto">
      <NavbarSection />
      <HeroSectionOne />
    </main>
  );
}
