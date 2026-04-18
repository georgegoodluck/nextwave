export default function Programs() {
  return (
    <section id="programs" className="py-24 bg-(--nw-charcoal) text-white px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center">
          Impact Initiatives
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-gray-800 p-10 rounded-xl hover:bg-gray-900 transition">
            <h4 className="text-(--nw-gold) font-bold text-xl mb-4">
              Scholar Reboot
            </h4>
            <p className="text-gray-400">
              Designed to give students academic clarity, study strategies, and
              the confidence to excel in their university journey.
            </p>
          </div>
          <div className="border border-gray-800 p-10 rounded-xl hover:bg-gray-900 transition">
            <h4 className="text-(--nw-gold) font-bold text-xl mb-4">
              Campus2LinkedIn
            </h4>
            <p className="text-gray-400">
              Exposing students to the power of professional networking and
              personal branding for career growth and internships.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
