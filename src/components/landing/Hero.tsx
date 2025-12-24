import Link from 'next/link';
import Image from 'next/image';
import AppStoreBadges from './AppStoreBadges';

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Image
          src="/images/logo-white-plain.svg"
          alt="Discr"
          width={300}
          height={135}
          className="h-24 sm:h-32 lg:h-40 w-auto mx-auto"
          priority
        />
        <p className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          Get Yours Back
        </p>
        <p className="mt-6 text-lg sm:text-xl text-zinc-200 max-w-2xl mx-auto">
          QR code stickers for disc golf disc recovery. Protect your discs and
          help other players return lost discs.
        </p>

        <div className="mt-10 flex flex-col items-center gap-6">
          <AppStoreBadges />
          <Link
            href="#how-it-works"
            className="inline-flex items-center gap-2 text-white hover:text-violet-200 font-medium transition-colors"
          >
            Learn More
            <svg
              className="w-5 h-5 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
