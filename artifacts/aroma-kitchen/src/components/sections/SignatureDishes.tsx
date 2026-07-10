import { motion } from 'framer-motion';

const signatureDishes = [
  {
    id: 1,
    name: 'Butter Chicken',
    description: 'Tender chicken cooked in a rich, creamy tomato gravy with aromatic spices.',
    price: '₹450',
    image: '/dish1.jpg',
  },
  {
    id: 2,
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice slow-cooked with marinated chicken and saffron.',
    price: '₹380',
    image: '/dish2.jpg',
  },
  {
    id: 3,
    name: 'Paneer Butter Masala',
    description: 'Cottage cheese cubes simmered in a velvety tomato and onion sauce.',
    price: '₹320',
    image: '/gallery1.jpg',
  },
  {
    id: 4,
    name: 'Tandoori Chicken',
    description: 'Chicken marinated in yogurt and spices, roasted in a clay oven.',
    price: '₹420',
    image: '/gallery2.jpg',
  },
  {
    id: 5,
    name: 'Garlic Naan',
    description: 'Soft, fluffy Indian bread baked in tandoor, topped with garlic and butter.',
    price: '₹60',
    image: '/gallery3.jpg',
  },
  {
    id: 6,
    name: 'Chicken Tikka',
    description: 'Boneless chicken chunks marinated in spices and grilled to perfection.',
    price: '₹390',
    image: '/gallery4.jpg',
  },
];

export function SignatureDishes() {
  return (
    <section className="py-24 bg-card relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-primary"></div>
            <span className="text-primary font-medium tracking-wider uppercase text-sm">Chef's Selection</span>
            <div className="w-8 h-[2px] bg-primary"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Signature Dishes</h2>
          <p className="text-muted-foreground text-lg">
            Discover our most beloved recipes, crafted with authentic spices and time-honored cooking methods.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {signatureDishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-background rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={dish.image} 
                  alt={dish.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif text-xl font-bold text-foreground">{dish.name}</h3>
                  <span className="text-primary font-bold">{dish.price}</span>
                </div>
                <p className="text-muted-foreground mb-6 flex-1">{dish.description}</p>
                <button className="w-full py-3 rounded-xl border border-primary text-primary font-medium hover:bg-primary hover:text-white transition-colors duration-300">
                  Order Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
