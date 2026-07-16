import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { SignatureDishes } from '@/components/sections/SignatureDishes';
import { FullMenu } from '@/components/sections/FullMenu';
import { Gallery } from '@/components/sections/Gallery';
import { Features } from '@/components/sections/Features';
import { Reviews } from '@/components/sections/Reviews';
import { Reservation } from '@/components/sections/Reservation';
import { Timings } from '@/components/sections/Timings';
import { Contact } from '@/components/sections/Contact';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import { OrderModal } from '@/components/ui/OrderModal';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { CartProvider } from '@/context/CartContext';

export default function Home() {
  return (
    <CartProvider>
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
          <Timings />
        </main>
        <Footer />
        <FloatingWhatsApp />
        <OrderModal />
        <ScrollToTop />
      </div>
    </CartProvider>
  );
}
