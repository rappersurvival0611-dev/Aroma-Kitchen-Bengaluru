import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const galleryImages = [
  { id: 1, src: '/gallery1.jpg', alt: 'Guests enjoying a meal together at Aroma Kitchen', span: 'col-span-1 row-span-1 md:col-span-2 md:row-span-2' },
  { id: 2, src: '/gallery2.jpg', alt: 'Dining area with warm lighting at Aroma Kitchen', span: 'col-span-1 row-span-1' },
  { id: 3, src: '/gallery4.jpg', alt: 'Brick wall dining corner at Aroma Kitchen', span: 'col-span-1 row-span-1' },
  { id: 4, src: '/gallery3.jpg', alt: 'Cozy table setting at Aroma Kitchen', span: 'col-span-1 row-span-1' },
  { id: 5, src: '/hero.jpg', alt: 'Aroma Kitchen dining room', span: 'col-span-1 row-span-1 md:col-span-2 md:row-span-1' },
  { id: 6, src: '/about.jpg', alt: 'Aroma Kitchen reception and seating area', span: 'col-span-1 row-span-1' },
  { id: 7, src: '/dish1.jpg', alt: 'Guests enjoying a family meal at Aroma Kitchen', span: 'col-span-1 row-span-1' },
  { id: 8, src: '/dish2.jpg', alt: 'Table setting at Aroma Kitchen', span: 'col-span-1 row-span-1' },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-primary"></div>
            <span className="text-primary font-medium tracking-wider uppercase text-sm">Atmosphere & Food</span>
            <div className="w-8 h-[2px] bg-primary"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Our Gallery</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[250px] gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              role="button"
              tabIndex={0}
              aria-label={`View larger image: ${image.alt}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative group overflow-hidden rounded-2xl cursor-pointer bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${image.span}`}
              onClick={() => setSelectedImage(image.src)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedImage(image.src);
                }
              }}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <ZoomIn className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 p-2 rounded-full backdrop-blur-sm transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
