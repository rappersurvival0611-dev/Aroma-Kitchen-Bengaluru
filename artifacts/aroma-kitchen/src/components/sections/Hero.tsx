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
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden py-28">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero.jpg"
          alt="Cozy Indian Restaurant Interior"
          className="h-full w-full object-cover object-center"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-secondary/75"></div>
      </div>

      {/* Content - single flex column, centered both axes */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center px-4 text-center text-white sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex w-full max-w-3xl flex-col items-center justify-center"
        >
          <span className="mb-6 inline-block rounded-full border border-primary/30 bg-primary/20 px-3 py-1 text-sm font-medium uppercase tracking-wider text-primary-foreground backdrop-blur-sm">
            Welcome to Aroma Kitchen
          </span>

          <h1 className="font-serif font-bold leading-[1.15] text-white drop-shadow-md text-[clamp(2.25rem,4vw+1.25rem,5.5rem)]">
            Authentic Indian Flavors,{' '}
            <span className="whitespace-nowrap font-light italic text-primary">Served Fresh</span>{' '}
            Every&nbsp;Day
          </h1>

          <p className="mt-6 max-w-[700px] font-light leading-relaxed text-white/90 text-[clamp(1rem,0.5vw+0.9rem,1.25rem)] md:mt-8">
            Experience the rich taste of traditional Indian cuisine in a warm and welcoming atmosphere. Discover a world of spices, crafted with passion.
          </p>

          <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
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
