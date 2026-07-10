import { useState, useEffect } from 'react';
import { Menu, X, Utensils } from 'lucide-react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 z-50">
            <div className={`p-2 rounded-full ${isScrolled ? 'bg-primary text-white' : 'bg-white text-primary'}`}>
              <Utensils className="w-6 h-6" />
            </div>
            <span className={`font-serif text-2xl font-bold ${isScrolled ? 'text-foreground' : 'text-white'}`}>
              Aroma Kitchen
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isScrolled ? 'text-foreground' : 'text-white/90'
                    }`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => scrollTo('#reservation')}
              className={`px-5 py-2.5 rounded-full font-medium transition-transform hover:scale-105 active:scale-95 ${
                isScrolled
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'bg-white text-primary'
              }`}
            >
              Book a Table
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden z-50 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className={isScrolled || mobileMenuOpen ? 'text-foreground' : 'text-white'} />
            ) : (
              <Menu className={isScrolled ? 'text-foreground' : 'text-white'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 h-screen bg-background pt-24 px-6 flex flex-col md:hidden z-40"
          >
            <ul className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-2xl font-serif font-medium text-foreground hover:text-primary"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => scrollTo('#reservation')}
              className="mt-8 bg-primary text-white py-4 rounded-full font-medium text-lg w-full max-w-xs mx-auto"
            >
              Book a Table
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
