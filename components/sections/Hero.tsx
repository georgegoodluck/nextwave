import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-24 pb-16 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter">
          Learn. Lead. <span className="text-(--nw-gold)">Earn.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          We empower students to navigate life, learn effectively, and grow
          holistically beyond the classroom walls.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-(--nw-gold) text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:opacity-90 transition">
            Join the Movement <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
