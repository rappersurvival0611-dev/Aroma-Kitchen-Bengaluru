import { motion } from 'framer-motion';
import { Clock, Leaf, Heart } from 'lucide-react';

const HOURS = [
  { day: 'Monday', time: '07:30 – 09:00' },
  { day: 'Tuesday', time: 'Closed' },
  { day: 'Wednesday', time: '07:30 – 09:30' },
  { day: 'Thursday', time: '07:30 – 09:30' },
  { day: 'Friday', time: '07:30 – 09:30' },
  { day: 'Saturday', time: '07:30 – 09:30' },
  { day: 'Sunday', time: '07:30 – 09:30' },
];

export function About() {
  return (
    <section id="about" className="pt-24 pb-32 md:pb-40 bg-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-48 -mt-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/about.jpg" 
                alt="Cozy interior of Aroma Kitchen" 
                className="w-full h-auto aspect-[4/5] object-cover"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute -inset-4 border-2 border-primary/20 rounded-2xl -z-10 translate-x-6 translate-y-6" />
            
            {/* Floating badge - centered horizontally, floating slightly below the image */}
            <div className="absolute left-1/2 bottom-0 z-20 hidden w-[calc(100%-2rem)] max-w-xs -translate-x-1/2 translate-y-5 rounded-xl bg-white p-5 shadow-xl md:block">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-primary/10 text-primary rounded-full shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-foreground">Restaurant Hours</h4>
              </div>
              <ul className="space-y-1.5">
                {HOURS.map(({ day, time }) => (
                  <li key={day} className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-muted-foreground">{day}</span>
                    <span className={time === 'Closed' ? 'font-medium text-destructive' : 'font-medium text-foreground'}>
                      {time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-[2px] bg-primary"></div>
              <span className="text-primary font-medium tracking-wider uppercase text-sm">Our Story</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
              A Taste of Tradition <br />in Every Bite
            </h2>
            
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              At Aroma Kitchen, we believe that great food brings people together. Our journey started with a simple passion for the authentic, vibrant flavors of North Indian and Indo-Chinese cuisines.
            </p>
            
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Step into our warm, family-friendly dining room adorned with cozy dark-wood tables, inviting blue linens, and ambient lighting. We pride ourselves on creating a comfortable atmosphere where every guest feels like family.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-accent/10 text-accent rounded-lg">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Fresh Ingredients</h4>
                  <p className="text-sm text-muted-foreground">Sourced locally and prepared fresh daily for the best flavor.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Family Friendly</h4>
                  <p className="text-sm text-muted-foreground">A welcoming environment perfect for family dinners and gatherings.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
