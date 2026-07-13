import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'wouter';

export function Footer() {
  const scrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8 border-t border-secondary-foreground/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-primary p-2 rounded-full text-white">
                <span className="font-serif font-bold text-xl">A</span>
              </div>
              <span className="font-serif text-2xl font-bold text-white">
                Aroma Kitchen
              </span>
            </Link>
            <p className="text-secondary-foreground/70 mb-6 max-w-sm">
              Experience the rich taste of traditional Indian cuisine in a warm and welcoming atmosphere. Authentic flavors served fresh every day.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Follow Aroma Kitchen on Facebook" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Follow Aroma Kitchen on Instagram" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Follow Aroma Kitchen on Twitter" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#about" onClick={(e) => scrollTo('#about', e)} className="text-secondary-foreground/70 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#menu" onClick={(e) => scrollTo('#menu', e)} className="text-secondary-foreground/70 hover:text-primary transition-colors">Our Menu</a></li>
              <li><a href="#gallery" onClick={(e) => scrollTo('#gallery', e)} className="text-secondary-foreground/70 hover:text-primary transition-colors">Gallery</a></li>
              <li><a href="#reservation" onClick={(e) => scrollTo('#reservation', e)} className="text-secondary-foreground/70 hover:text-primary transition-colors">Book a Table</a></li>
              <li><a href="#contact" onClick={(e) => scrollTo('#contact', e)} className="text-secondary-foreground/70 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold text-white mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-secondary-foreground/70">Jal Vayu Towers, Temple Rd<br />Muneswara Layout, Sadanandanagar<br />Bengaluru, Karnataka 560038</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-secondary-foreground/70">082776 63021</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-secondary-foreground/70">hello@aromakitchen.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold text-white mb-6">Opening Hours</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Monday - Sunday</p>
                  <p className="text-secondary-foreground/70">7:30 AM - 10:00 PM</p>
                </div>
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-xl bg-secondary-foreground/5 border border-secondary-foreground/10">
              <p className="text-sm text-secondary-foreground/80 mb-3">Order online for delivery or pickup</p>
              <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg font-medium transition-colors">
                Order Now
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-secondary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-secondary-foreground/50">
          <p>&copy; {new Date().getFullYear()} Aroma Kitchen. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="mailto:hello@aromakitchen.com?subject=Privacy%20Policy%20Request" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="mailto:hello@aromakitchen.com?subject=Terms%20of%20Service%20Request" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
