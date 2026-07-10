import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';

export function Hero() {
  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero.jpg"
          alt="Cozy Indian Restaurant Interior"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-secondary/70"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 text-center text-white mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-sm font-medium tracking-wider uppercase mb-6 backdrop-blur-sm">
            Welcome to Aroma Kitchen
          </span>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight mb-6 text-white drop-shadow-lg">
            Authentic Indian Flavors, <br />
            <span className="text-primary italic font-light">Served Fresh</span> Every Day
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Experience the rich taste of traditional Indian cuisine in a warm and welcoming atmosphere. Discover a world of spices, crafted with passion.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo('#reservation')}
              className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-medium text-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-5 h-5" />
              Reserve a Table
            </button>
            <button
              onClick={() => scrollTo('#menu')}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-medium text-lg flex items-center justify-center gap-2 hover:bg-white/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              View Menu
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/60 text-xs font-medium uppercase tracking-widest">Scroll to explore</span>
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}
