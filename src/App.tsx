import AboutSection from "./components/AboutSection";
import BackToTop from "./components/BackToTop";
import BusinessHighlights from "./components/BusinessHighlights";
import ContactSection from "./components/ContactSection";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import GlobalTradeSection from "./components/GlobalTradeSection";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import OriginSection from "./components/OriginSection";
import ProductGrid from "./components/ProductGrid";
import QualitySection from "./components/QualitySection";
import QuoteSection from "./components/QuoteSection";
import WhyWorkWithUs from "./components/WhyWorkWithUs";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <Navbar />

      <main id="main">
        <HeroSection />
        <BusinessHighlights />
        <AboutSection />
        <OriginSection />
        <ProductGrid />
        <WhyWorkWithUs />
        <QualitySection />
        <GlobalTradeSection />
        <QuoteSection />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}