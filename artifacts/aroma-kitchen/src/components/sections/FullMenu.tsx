import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const menuCategories = [
  { id: 'starters', label: 'Starters' },
  { id: 'main', label: 'Main Course' },
  { id: 'biryani', label: 'Biryani' },
  { id: 'breads', label: 'Breads' },
  { id: 'beverages', label: 'Beverages' },
];

const menuData: Record<string, { name: string; desc?: string; price: string; isVeg?: boolean }[]> = {
  starters: [
    { name: 'Chicken 65', desc: 'Spicy, deep-fried chicken bites tossed in curry leaves and spices.', price: '₹220' },
    { name: 'Chilli Chicken', desc: 'Crispy chicken chunks in a spicy, tangy soy-based sauce.', price: '₹230' },
    { name: 'Paneer 65', desc: 'Crispy fried cottage cheese cubes tossed in spicy tempering.', price: '₹200', isVeg: true },
    { name: 'Gobi Manchurian', desc: 'Cauliflower florets tossed in a sweet, tangy, and slightly spicy sauce.', price: '₹190', isVeg: true },
  ],
  main: [
    { name: 'Butter Chicken', desc: 'Tender chicken in a rich, creamy tomato gravy.', price: '₹340' },
    { name: 'Chicken Curry', desc: 'Traditional homestyle chicken cooked with onion, tomato, and spices.', price: '₹320' },
    { name: 'Kadai Chicken', desc: 'Spicy chicken tossed with bell peppers, onions, and freshly ground spices.', price: '₹340' },
    { name: 'Chicken Tikka Masala', desc: 'Grilled chicken chunks in a spiced onion-tomato gravy.', price: '₹360' },
    { name: 'Paneer Butter Masala', desc: 'Cottage cheese in a velvety tomato and onion sauce.', price: '₹300', isVeg: true },
    { name: 'Dal Tadka', desc: 'Yellow lentils tempered with cumin, garlic, and ghee.', price: '₹230', isVeg: true },
  ],
  biryani: [
    { name: 'Chicken Biryani', desc: 'Fragrant basmati rice slow-cooked with marinated chicken.', price: '₹380' },
    { name: 'Mutton Biryani', desc: 'Tender goat meat cooked with aromatic spices and basmati rice.', price: '₹420' },
    { name: 'Veg Biryani', desc: 'Mixed vegetables layered with spiced basmati rice.', price: '₹300', isVeg: true },
  ],
  breads: [
    { name: 'Butter Naan', price: '₹70', isVeg: true },
    { name: 'Garlic Naan', price: '₹80', isVeg: true },
    { name: 'Roti', price: '₹50', isVeg: true },
    { name: 'Kulcha', price: '₹75', isVeg: true },
  ],
  beverages: [
    { name: 'Mango Lassi', desc: 'Refreshing yogurt drink blended with sweet mango pulp.', price: '₹110', isVeg: true },
    { name: 'Sweet Lassi', desc: 'Traditional sweet yogurt drink.', price: '₹90', isVeg: true },
    { name: 'Soft Drinks', price: '₹60', isVeg: true },
  ],
};

export function FullMenu() {
  const [activeCategory, setActiveCategory] = useState('starters');

  return (
    <section id="menu" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-primary"></div>
            <span className="text-primary font-medium tracking-wider uppercase text-sm">Discover</span>
            <div className="w-8 h-[2px] bg-primary"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Our Full Menu</h2>
        </div>

        {/* Categories Tab */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-card text-foreground hover:bg-muted border border-border'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="max-w-4xl mx-auto min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8"
            >
              {menuData[activeCategory].map((item, index) => (
                <div key={index} className="flex flex-col border-b border-border/50 pb-4">
                  <div className="flex justify-between items-baseline mb-2 gap-4">
                    <h3 className="font-serif text-xl font-bold text-foreground flex items-center gap-2">
                      {item.name}
                      {item.isVeg && (
                        <span className="inline-block w-4 h-4 border border-accent rounded-sm flex items-center justify-center" title="Vegetarian">
                          <span className="w-2 h-2 rounded-full bg-accent"></span>
                        </span>
                      )}
                    </h3>
                    <div className="flex-1 border-b border-dashed border-border/50 mx-2 hidden sm:block"></div>
                    <span className="text-primary font-bold text-lg shrink-0">{item.price}</span>
                  </div>
                  {item.desc && (
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
