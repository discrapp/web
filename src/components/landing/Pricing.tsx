import Link from 'next/link';

const pricingTiers = [
  {
    name: 'Starter',
    quantity: 5,
    price: 10,
    perSticker: '2.00',
    description: 'Perfect for trying it out',
  },
  {
    name: 'Popular',
    quantity: 10,
    price: 15,
    perSticker: '1.50',
    description: 'Most popular choice',
    featured: true,
  },
  {
    name: 'Best Value',
    quantity: 25,
    price: 25,
    perSticker: '1.00',
    description: 'Cover your whole bag',
  },
];

const features = [
  'Durable weatherproof stickers',
  'Unique QR code per sticker',
  'Free shipping included',
  'Easy in-app registration',
  'Lifetime disc tracking',
  'Optional reward system',
];

export default function Pricing() {
  return (
    <section
      id="order"
      aria-labelledby="order-heading"
      className="py-20 bg-white dark:bg-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            id="order-heading"
            className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white"
          >
            Protect Your Discs Today
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Simple, affordable protection for your entire collection
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-8 text-center shadow-lg ${
                tier.featured
                  ? 'bg-gradient-to-br from-violet-600 to-violet-700 text-white ring-4 ring-violet-300 dark:ring-violet-500'
                  : 'bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20'
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-sm font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <div
                className={`text-lg font-semibold ${tier.featured ? 'text-violet-200' : 'text-violet-600 dark:text-violet-400'}`}
              >
                {tier.name}
              </div>

              <div
                className={`mt-4 text-5xl font-bold ${tier.featured ? 'text-white' : 'text-violet-900 dark:text-violet-100'}`}
              >
                ${tier.price}
              </div>

              <div
                className={`mt-2 ${tier.featured ? 'text-violet-200' : 'text-violet-700 dark:text-violet-300'}`}
              >
                {tier.quantity} QR codes
              </div>

              <div
                className={`mt-1 text-sm ${tier.featured ? 'text-violet-300' : 'text-zinc-500 dark:text-zinc-400'}`}
              >
                ${tier.perSticker} per sticker
              </div>

              <p
                className={`mt-4 text-sm ${tier.featured ? 'text-violet-200' : 'text-zinc-600 dark:text-zinc-400'}`}
              >
                {tier.description}
              </p>

              <Link
                href="#hero"
                className={`mt-6 inline-block w-full px-6 py-3 font-semibold rounded-xl transition-colors ${
                  tier.featured
                    ? 'bg-white text-violet-700 hover:bg-violet-50'
                    : 'bg-violet-700 text-white hover:bg-violet-800'
                }`}
              >
                Order Now
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-center text-zinc-900 dark:text-white mb-6">
            Every order includes
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-violet-600 dark:text-violet-400 flex-shrink-0"
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
                <span className="text-zinc-700 dark:text-zinc-300">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
