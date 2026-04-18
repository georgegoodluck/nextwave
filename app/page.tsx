import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Pillars from "@/components/sections/Pillars";
import Programs from "@/components/sections/Programs";

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Pillars />
      <Programs />
    </main>
  );
}
