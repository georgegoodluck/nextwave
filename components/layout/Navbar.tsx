export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-(--nw-cream)/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Identity */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-(--nw-gold)] rounded-sm transform rotate-12 shadow-md" />
          <span className="text-xl font-bold tracking-tighter text-(--nw-charcoal)">
            Nextwave{" "}
            <span className="text-(--nw-gold) font-medium">Global</span>
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-widest text-gray-600">
          <a href="#about" className="hover:text-(--nw-gold) transition">
            About
          </a>
          <a href="#pillars" className="hover:text-(--nw-gold) transition">
            Mission
          </a>
          <a href="#programs" className="hover:text-(--nw-gold) transition">
            Programs
          </a>
        </div>

        {/* Action Button */}
        <button className="bg-(--nw-charcoal) text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-black transition shadow-lg">
          Get Started
        </button>
      </div>
    </nav>
  );
}
