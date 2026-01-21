import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PartnersMarquee from "@/components/PartnersMarquee";
import JourneyTimeline from "@/components/JourneyTimeline";
import FeaturesGrid from "@/components/FeaturesGrid";
import IntelligenceHub from "@/components/IntelligenceHub";
import Testimonials from "@/components/Testimonials";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import CookieConsent from "@/components/CookieConsent";
import FAQSection from "@/components/FAQSection";
import MapSection from "@/components/MapSection";

const Index = () => {
  return (
    <div className='min-h-screen bg-background text-foreground overflow-x-hidden'>
      <Navbar />
      <HeroSection />
      <FeaturesGrid />
      <JourneyTimeline />
      <IntelligenceHub />
      <Testimonials />
      <PricingSection />
      <MapSection />
      <FAQSection />
      <PartnersMarquee />
      <ContactSection />
      <Footer />
      <ChatWidget />
      <CookieConsent />
    </div>
  );
};

export default Index;
