export default function Programs() {
  return (
    <section className="py-20 bg-(--nw-charcoal) text-white px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 border-l-4 border-(--nw-gold) pl-4">
          Impact Initiatives
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-(--nw-gold)">
              Scholar Reboot
            </h4>
            <p className="text-gray-400">
              Launched at NextWave Global to give students academic clarity,
              study strategies, and the confidence to excel.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-(--nw-gold)">
              Campus2LinkedIn
            </h4>
            <p className="text-gray-400">
              Exposing students to professional networking and mentorship to
              leverage digital platforms for career growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
