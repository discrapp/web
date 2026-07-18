import AIFeature from '@/components/landing/AIFeature';
import AppScreenshots from '@/components/landing/AppScreenshots';
import Features from '@/components/landing/Features';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/landing/Footer';
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import Navigation from '@/components/landing/Navigation';
import Pricing from '@/components/landing/Pricing';
import Testimonials from '@/components/landing/Testimonials';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <AIFeature />
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
