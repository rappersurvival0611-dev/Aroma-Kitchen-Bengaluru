import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const HOURS = [
  { day: 'Monday', time: '07:30 – 09:00' },
  { day: 'Tuesday', time: 'Closed' },
  { day: 'Wednesday', time: '07:30 – 09:30' },
  { day: 'Thursday', time: '07:30 – 09:30' },
  { day: 'Friday', time: '07:30 – 09:30' },
  { day: 'Saturday', time: '07:30 – 09:30' },
  { day: 'Sunday', time: '07:30 – 09:30' },
];

export function Timings() {
  return (
    <section id="timings" className="py-24 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-[2px] bg-primary"></div>
            <span className="text-primary font-medium tracking-wider uppercase text-sm">Timings</span>
            <div className="w-12 h-[2px] bg-primary"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Restaurant Hours</h2>
          <p className="text-secondary-foreground/70 text-lg">
            Here's when you can find us serving fresh, authentic flavors.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-lg rounded-2xl bg-secondary-foreground/5 border border-secondary-foreground/10 p-6 sm:p-8 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold">Weekly Schedule</h3>
          </div>

          <ul className="divide-y divide-secondary-foreground/10">
            {HOURS.map(({ day, time }) => (
              <li key={day} className="flex items-center justify-between gap-4 py-3">
                <span className="text-secondary-foreground/80">{day}</span>
                <span className={time === 'Closed' ? 'font-semibold text-destructive' : 'font-semibold'}>
                  {time}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
