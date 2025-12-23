const testimonials = [
  {
    quote:
      'Got my favorite Destroyer back after 3 months! Someone found it in a pond and scanned the QR code. Worth every penny.',
    name: 'Mike T.',
    location: 'Colorado',
  },
  {
    quote:
      "I've returned 4 discs to other players this season. It feels great knowing someone will do the same for me.",
    name: 'Sarah K.',
    location: 'Texas',
  },
  {
    quote:
      'The stickers are durable and the app is super easy. I put them on all my discs now.',
    name: 'Jake R.',
    location: 'California',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-zinc-900 dark:text-white">
          What Players Are Saying
        </h2>
        <p className="mt-4 text-lg text-center text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Join the disc golf community protecting their discs with Discr™
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <blockquote
              key={testimonial.name}
              className="relative p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm"
            >
              {/* Quote mark */}
              <svg
                className="absolute top-4 left-4 w-8 h-8 text-violet-200 dark:text-violet-800"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <p className="mt-4 text-zinc-600 dark:text-zinc-400 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <footer className="mt-4">
                <div className="font-semibold text-zinc-900 dark:text-white">
                  {testimonial.name}
                </div>
                <div className="text-sm text-zinc-500 dark:text-zinc-500">
                  {testimonial.location}
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
