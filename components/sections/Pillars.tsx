const pillars = [
  {
    title: "Learn",
    desc: "Equip students with the knowledge, skills, and mindset to thrive academically and professionally.",
  },
  {
    title: "Lead",
    desc: "Inspire leadership, initiative, and community impact among young people.",
  },
  {
    title: "Earn",
    desc: "Help students explore ways to monetize their skills and create financial independence.",
  },
];

export default function Pillars() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
      {pillars.map((p) => (
        <div
          key={p.title}
          className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm"
        >
          <h3 className="text-2xl font-bold mb-4 text-(--nw-gold)">
            {p.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">{p.desc}</p>
        </div>
      ))}
    </section>
  );
}
