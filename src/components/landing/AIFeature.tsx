export default function AIFeature() {
  return (
    <section
      id="ai-feature"
      aria-labelledby="ai-feature-heading"
      className="py-20 bg-gradient-to-b from-violet-50 to-white dark:from-violet-950/30 dark:to-zinc-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 text-sm font-medium mb-6">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Powered by AI
          </div>
          <h2
            id="ai-feature-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white"
          >
            AI-Powered Features
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Two intelligent features to help you play your best round
          </p>
        </div>

        {/* Feature 1: Disc Identification */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Text content */}
          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white">
              Identify Any Disc
              <br />
              <span className="text-violet-600 dark:text-violet-400">
                With a Photo
              </span>
            </h3>
            <p className="mt-6 text-lg text-zinc-700 dark:text-zinc-300">
              Not sure what disc you found or just picked up? Snap a photo and
              let our AI instantly identify the manufacturer, mold name, and
              flight numbers. No more guessing or searching through catalogs.
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-violet-600 dark:text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-zinc-700 dark:text-zinc-300">
                  Recognizes stamps, logos, and text from major manufacturers
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-violet-600 dark:text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-zinc-700 dark:text-zinc-300">
                  Auto-fills flight numbers from our disc catalog
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-violet-600 dark:text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-zinc-700 dark:text-zinc-300">
                  Works even with worn or faded stamps
                </span>
              </li>
            </ul>
          </div>

          {/* Visual/illustration */}
          <div className="relative">
            <div className="relative mx-auto w-72 h-72 sm:w-80 sm:h-80">
              {/* Phone mockup frame */}
              <div className="absolute inset-0 bg-zinc-900 dark:bg-zinc-800 rounded-[3rem] shadow-2xl" />
              <div className="absolute inset-2 bg-zinc-800 dark:bg-zinc-700 rounded-[2.5rem]" />
              <div className="absolute inset-4 bg-gradient-to-br from-violet-500 to-violet-700 rounded-[2rem] flex items-center justify-center">
                {/* Camera viewfinder illustration */}
                <div className="relative">
                  <div className="w-32 h-32 border-4 border-white/50 rounded-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-white/80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* AI result badge */}
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-4 w-48">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">
                    Identified
                  </span>
                </div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Innova Destroyer
                </div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                  12 | 5 | -1 | 3
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: Shot Advisor */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual/illustration - on left for this feature */}
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto w-72 h-72 sm:w-80 sm:h-80">
              {/* Phone mockup frame */}
              <div className="absolute inset-0 bg-zinc-900 dark:bg-zinc-800 rounded-[3rem] shadow-2xl" />
              <div className="absolute inset-2 bg-zinc-800 dark:bg-zinc-700 rounded-[2.5rem]" />
              <div className="absolute inset-4 bg-gradient-to-br from-green-500 to-emerald-700 rounded-[2rem] flex items-center justify-center">
                {/* Fairway illustration */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <svg
                    className="w-20 h-20 text-white/80"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Shot recommendation badge */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-4 w-52">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                  <span className="text-xs font-medium text-violet-600 dark:text-violet-400">
                    Recommended
                  </span>
                </div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Star Destroyer
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 px-2 py-0.5 rounded font-medium">
                    HYZER
                  </span>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">
                    85% power
                  </span>
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                  ~285 ft
                </div>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="order-1 lg:order-2">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white">
              Shot Advisor
              <br />
              <span className="text-violet-600 dark:text-violet-400">
                Your AI Caddy
              </span>
            </h3>
            <p className="mt-6 text-lg text-zinc-700 dark:text-zinc-300">
              Standing on the tee pad wondering which disc to throw? Photograph
              any hole and let AI recommend the perfect disc from your bag,
              complete with throw type and power suggestions.
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-violet-600 dark:text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-zinc-700 dark:text-zinc-300">
                  Estimates distance from your photo
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-violet-600 dark:text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-zinc-700 dark:text-zinc-300">
                  Recommends the best disc from your bag
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-violet-600 dark:text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-zinc-700 dark:text-zinc-300">
                  Suggests throw type and power for optimal results
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
