const data = [
  {
    title: "Learn",
    desc: "Equip students with the knowledge, skills, and mindset to thrive academically and professionally.",
  },
  {
    title: "Earn",
    desc: "Help students explore ways to monetize their skills, access opportunities, and create financial independence.",
  },
  {
    title: "Lead",
    desc: "Inspire leadership, initiative, and community impact among young people.",
  },
];

export default function Pillars() {
  return (
    <section id="pillars" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 gap-12">
        {data.map((item) => (
          <div key={item.title} className="group">
            <div className="w-12 h-1 bg-(--nw-gold) mb-6 transition-all group-hover:w-full" />
            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
            <p className="text-gray-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
