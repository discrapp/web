import Navigation from '@/components/landing/Navigation';
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import Features from '@/components/landing/Features';
import AppScreenshots from '@/components/landing/AppScreenshots';
import Pricing from '@/components/landing/Pricing';
import Testimonials from '@/components/landing/Testimonials';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <AppScreenshots />
        <Pricing />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
