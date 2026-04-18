import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Pillars from "@/components/sections/Pillars";
import Story from "@/components/sections/Story";
import Programs from "@/components/sections/Programs";
import RegistrationForm from "@/components/sections/Registration";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Story />
      <Pillars />
      <Programs />
      <RegistrationForm />
      <Footer />
    </main>
  );
}
