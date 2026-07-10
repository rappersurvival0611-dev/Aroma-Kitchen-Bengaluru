import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { SignatureDishes } from '@/components/sections/SignatureDishes';
import { FullMenu } from '@/components/sections/FullMenu';
import { Gallery } from '@/components/sections/Gallery';
import { Features } from '@/components/sections/Features';
import { Reviews } from '@/components/sections/Reviews';
import { Reservation } from '@/components/sections/Reservation';
import { Contact } from '@/components/sections/Contact';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <SignatureDishes />
        <Features />
        <FullMenu />
        <Gallery />
        <Reviews />
        <Reservation />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </div>
  );
}
