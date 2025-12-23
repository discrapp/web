const steps = [
  {
    number: '1',
    title: 'Order Stickers',
    description: 'Get QR code stickers delivered to your door',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    number: '2',
    title: 'Attach & Register',
    description: 'Apply to discs, register in the app',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
        />
      </svg>
    ),
  },
  {
    number: '3',
    title: 'Get Them Back',
    description: 'Finders scan the code and contact you',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="py-20 bg-white dark:bg-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="how-it-works-heading"
          className="text-3xl sm:text-4xl font-bold text-center text-zinc-900 dark:text-white"
        >
          How It Works
        </h2>
        <p className="mt-4 text-lg text-center text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Protecting your discs is simple with Discr™
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center">
              {/* Connector line (hidden on mobile, first item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-violet-200 dark:bg-violet-800" />
              )}

              {/* Step circle */}
              <div className="relative inline-flex items-center justify-center w-24 h-24 bg-violet-100 dark:bg-violet-900/50 rounded-full mb-6">
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {step.number}
                </span>
                <div className="text-violet-600 dark:text-violet-400">
                  {step.icon}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
