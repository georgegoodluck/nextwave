"use client";

export default function Programs() {
  const initiatives = [
    { title: "Scholar Reboot", desc: "Academic clarity and strategy." },
    { title: "Campus2LinkedIn", desc: "Professional networking and branding." },
    { title: "Tech Mentorship", desc: "Building, shipping, and learning." },
    { title: "Global Fellowship", desc: "Cross-border academic collaboration." },
  ];

  return (
    <section id="programs" className="py-24 bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-16 text-center">Our Initiatives</h2>
        
        {/* Container with fade mask and snap behavior */}
        <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory mask-fade no-scrollbar py-4">
          {initiatives.map((item, index) => (
            <div 
              key={item.title} 
              className="min-w-[320px] md:min-w-100 snap-center p-10 rounded-3xl border border-gray-800 bg-gray-900/50 hover:bg-gray-800 transition-all duration-300 hover:border-[#B08D21] hover:-translate-y-2 cursor-pointer"
            >
              <div className="text-sm font-bold text-[#B08D21] mb-4 uppercase tracking-widest">
                0{index + 1}
              </div>
              <h4 className="text-white font-bold text-2xl mb-4">{item.title}</h4>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}