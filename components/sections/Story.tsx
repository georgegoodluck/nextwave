export default function Story() {
  return (
    <section id="about" className="py-24 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6">Our Origins</h2>
          <p className="text-gray-600 mb-4">
            NextWave Global started as a small WhatsApp channel sharing personal
            development insights to help students navigate life and grow
            holistically.
          </p>
          <p className="text-gray-600">
            Seeing the impact of initiatives like NextWave OAU inspired us to
            expand our reach and bridge the gap between education and real-world
            opportunities.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-(--nw-gold)">
          <h4 className="font-bold text-lg mb-4 italic">
            Inspiring a generation of students who are ready to lead.
          </h4>
        </div>
      </div>
    </section>
  );
}
