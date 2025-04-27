
import { HeroSectionOne } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <main className="py-20 mx-auto">
      <Navbar />
      <HeroSectionOne />
    </main>
  );
}
