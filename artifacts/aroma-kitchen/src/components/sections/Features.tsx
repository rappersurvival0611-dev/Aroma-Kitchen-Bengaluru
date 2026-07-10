import { motion } from 'framer-motion';
import { Utensils, Leaf, Users, Zap, DollarSign, Armchair } from 'lucide-react';

const features = [
  {
    icon: Utensils,
    title: 'Authentic Indian Taste',
    desc: 'Traditional recipes brought to life with genuine spices.',
  },
  {
    icon: Leaf,
    title: 'Fresh Ingredients',
    desc: 'Sourced daily for the highest quality and flavor.',
  },
  {
    icon: Users,
    title: 'Family Friendly',
    desc: 'A welcoming space for guests of all ages to gather.',
  },
  {
    icon: Zap,
    title: 'Fast Service',
    desc: 'Hot, delicious meals served promptly without the wait.',
  },
  {
    icon: DollarSign,
    title: 'Affordable Pricing',
    desc: 'Premium quality dining that fits your everyday budget.',
  },
  {
    icon: Armchair,
    title: 'Comfortable Ambience',
    desc: 'Cozy dark wood, warm lighting, and a relaxing vibe.',
  },
];

export function Features() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Why Choose Us</h2>
          <p className="text-muted-foreground text-lg">
            We go above and beyond to ensure every visit to Aroma Kitchen is memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all group text-center"
              >
                <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
