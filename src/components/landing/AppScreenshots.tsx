const screenshots = [
  {
    title: 'Home Screen',
    description: 'Quick access to all features',
    placeholder: 'Home',
  },
  {
    title: 'Add Disc',
    description: 'Easy disc registration',
    placeholder: 'Add',
  },
  {
    title: 'QR Scanner',
    description: 'Scan to find disc owners',
    placeholder: 'Scan',
  },
  {
    title: 'My Bag',
    description: 'Your disc collection',
    placeholder: 'Bag',
  },
];

export default function AppScreenshots() {
  return (
    <section
      id="screenshots"
      aria-labelledby="screenshots-heading"
      className="py-20 bg-white dark:bg-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="screenshots-heading"
          className="text-3xl sm:text-4xl font-bold text-center text-zinc-900 dark:text-white"
        >
          See Discr™ in Action
        </h2>
        <p className="mt-4 text-lg text-center text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          A beautiful, intuitive app designed for disc golfers
        </p>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {screenshots.map((screenshot) => (
            <div key={screenshot.title} className="text-center">
              {/* Phone mockup placeholder */}
              <div className="relative mx-auto w-full max-w-[180px] aspect-[9/19] bg-gradient-to-b from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 rounded-[2rem] p-2 shadow-xl">
                <div className="h-full w-full bg-zinc-100 dark:bg-zinc-900 rounded-[1.5rem] flex items-center justify-center">
                  <span className="text-4xl font-bold text-violet-300 dark:text-violet-700">
                    {screenshot.placeholder}
                  </span>
                </div>
                {/* Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-4 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
              </div>
              <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">
                {screenshot.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {screenshot.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-zinc-500 dark:text-zinc-500">
          Screenshots coming soon. Download the app to see it in action!
        </p>
      </div>
    </section>
  );
}
