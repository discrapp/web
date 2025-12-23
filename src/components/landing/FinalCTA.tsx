import AppStoreBadges from './AppStoreBadges';

export default function FinalCTA() {
  return (
    <section
      id="final-cta"
      aria-label="Final call to action"
      className="py-20 bg-gradient-to-br from-violet-700 to-violet-900"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Ready to Protect Your Discs?
        </h2>
        <p className="mt-4 text-lg text-violet-200 max-w-2xl mx-auto">
          Join thousands of disc golfers who never lose their favorite discs.
          Download the app and order your stickers today.
        </p>

        <div className="mt-10 flex justify-center">
          <AppStoreBadges />
        </div>
      </div>
    </section>
  );
}
