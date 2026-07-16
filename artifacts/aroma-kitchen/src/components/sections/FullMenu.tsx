import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const menuCategories = [
  { id: 'breakfast', label: 'Breakfast (Mon–Fri)' },
  { id: 'weekendBreakfast', label: 'Weekend Breakfast (Fri–Sun)' },
  { id: 'appetisers', label: 'Appetisers (5–6:30 PM)' },
  { id: 'vegCurry', label: 'Veg Curry' },
  { id: 'nonVegCurry', label: 'Non-Veg Curry' },
  { id: 'vegStarter', label: 'Veg Starters' },
  { id: 'chineseVegStarter', label: 'Chinese Veg Starters' },
  { id: 'nonVegStarter', label: 'Non-Veg Starters' },
  { id: 'tandoorWeekend', label: 'Tandoori Starters (Fri–Sun)' },
  { id: 'breads', label: 'Breads' },
  { id: 'chineseRiceNoodles', label: 'Chinese Rice & Noodles' },
  { id: 'rice', label: 'Rice' },
];

const menuData: Record<string, { name: string; desc?: string; price: string; isVeg?: boolean }[]> = {
  breakfast: [
    { name: 'Idly (2 pcs)', price: '₹40', isVeg: true },
    { name: 'Vada (1 pc)', price: '₹30', isVeg: true },
    { name: 'Mashallah Dosa', price: '₹85', isVeg: true },
    { name: 'Plain Dosa', price: '₹70', isVeg: true },
    { name: 'Set Dosa (2 pcs)', price: '₹70', isVeg: true },
    { name: 'Onion Uttapam', price: '₹90', isVeg: true },
    { name: 'Ghee Roast', price: '₹100', isVeg: true },
    { name: 'Ghee Roast', price: '₹110', isVeg: true },
    { name: 'Upma', price: '₹110', isVeg: true },
    { name: 'Idli Vada', price: '₹70', isVeg: true },
    { name: 'Keshri Bath', price: '₹130', isVeg: true },
  ],
  weekendBreakfast: [
    { name: 'Aloo Paratha', price: '₹120', isVeg: true },
    { name: 'Gobi Paratha', price: '₹140', isVeg: true },
    { name: 'Paneer Paratha', price: '₹180', isVeg: true },
    { name: 'Poori', price: '₹100', isVeg: true },
    { name: 'Bread Omelette', price: '₹110' },
  ],
  appetisers: [
    { name: 'Aloo Bond', price: '₹80', isVeg: true },
    { name: 'Paneer Pakoda', price: '₹180', isVeg: true },
    { name: 'Onion Pakoda', price: '₹70', isVeg: true },
    { name: 'French Fries', price: '₹90', isVeg: true },
    { name: 'Chicken Momos', price: '₹160' },
    { name: 'Veg Momos', price: '₹100', isVeg: true },
    { name: 'Tea', price: '₹25', isVeg: true },
    { name: 'Coffee', price: '₹30', isVeg: true },
  ],
  vegCurry: [
    { name: 'Punjabi Rajma', price: '₹180', isVeg: true },
    { name: 'Meethi Malai Mutter', price: '₹210', isVeg: true },
    { name: 'Mushroom Masala', price: '₹190', isVeg: true },
    { name: 'Kadai Chole', price: '₹190', isVeg: true },
    { name: 'Baby Corn Masala', price: '₹170', isVeg: true },
    { name: 'Dal Makhani', price: '₹200', isVeg: true },
    { name: 'Mixed Veg Dry', price: '₹260', isVeg: true },
    { name: 'Mix Veg Gravy', price: '₹200', isVeg: true },
    { name: 'Kadhai Veg', price: '₹190', isVeg: true },
    { name: 'Dal Palak', price: '₹190', isVeg: true },
    { name: 'Dal Tadka', price: '₹170', isVeg: true },
    { name: 'Aloo Jeera', price: '₹140', isVeg: true },
    { name: 'Aloo Matar', price: '₹170', isVeg: true },
    { name: 'Malai Koffta', price: '₹210', isVeg: true },
    { name: 'Palak Corn Masala', price: '₹200', isVeg: true },
    { name: 'Mushroom Palak', price: '₹210', isVeg: true },
    { name: 'Paneer Butter Masala', price: '₹240', isVeg: true },
    { name: 'Matar Paneer', price: '₹220', isVeg: true },
    { name: 'Paneer Lababdar', price: '₹240', isVeg: true },
    { name: 'Paneer Methi Malai', price: '₹250', isVeg: true },
    { name: 'Kadai Paneer', price: '₹230', isVeg: true },
  ],
  nonVegCurry: [
    { name: 'Chicken Kali Mirch', price: '₹280' },
    { name: 'Punjabi Chicken Curry', price: '₹250' },
    { name: 'Murgh Methi Malai', price: '₹310' },
    { name: 'Chicken Lababdar', price: '₹290' },
    { name: 'Chicken Do Pyaza', price: '₹270' },
    { name: 'Palak Chicken', price: '₹280' },
    { name: 'Butter Chicken', price: '₹320' },
    { name: 'Chicken Ghee Roast', price: '₹400' },
    { name: 'Chicken Lazeez', price: '₹270' },
    { name: 'Kadai Chicken', price: '₹280' },
  ],
  vegStarter: [
    { name: 'Afghani Paneer Tikka', price: '₹240', isVeg: true },
    { name: 'Mushroom Tikka', price: '₹210', isVeg: true },
    { name: 'Tandoori Baby Corn', price: '₹190', isVeg: true },
    { name: 'Malai Paneer Tikka', price: '₹250', isVeg: true },
    { name: 'Tandoori Aloo', price: '₹170', isVeg: true },
    { name: 'Achari Paneer', price: '₹220', isVeg: true },
  ],
  chineseVegStarter: [
    { name: 'Honey Garlic Chilli Mushroom', price: '₹220', isVeg: true },
    { name: 'Baby Corn Salt & Pepper', price: '₹190', isVeg: true },
    { name: 'Paneer Chilli', price: '₹250', isVeg: true },
    { name: 'Baby Corn 65', price: '₹190', isVeg: true },
    { name: 'Gobi Manchurian', price: '₹160', isVeg: true },
    { name: 'Mushroom Chilli', price: '₹200', isVeg: true },
    { name: 'Honey Garlic Chilli Potato', price: '₹170', isVeg: true },
    { name: 'Paneer Manchurian', price: '₹230', isVeg: true },
    { name: 'Mushroom Manchurian', price: '₹180', isVeg: true },
  ],
  nonVegStarter: [
    { name: 'Schezwan Chicken', price: '₹270' },
    { name: 'Pepper Chicken', price: '₹300' },
    { name: 'Honey Garlic Chicken', price: '₹300' },
    { name: 'Chicken 65', price: '₹230' },
    { name: 'Garlic Chicken', price: '₹260' },
    { name: 'Chilli Chicken', price: '₹270' },
    { name: 'Lemon Chicken', price: '₹250' },
    { name: 'Chicken Lollipop', price: '₹260' },
  ],
  tandoorWeekend: [
    { name: 'Punjabi Murgh Kabab', price: '₹310' },
    { name: 'Chicken Sheek Kabab', price: '₹290' },
    { name: 'Kalmi Kabab', price: '₹350' },
    { name: 'Tandoori Leg', price: '₹330' },
    { name: 'Malai Kabab', price: '₹290' },
    { name: 'Achari Kabab', price: '₹270' },
    { name: 'Lahsooni Kabab', price: '₹310' },
    { name: 'Tandoori Chicken', price: '₹520' },
  ],
  breads: [
    { name: 'Phulka', price: '₹20', isVeg: true },
    { name: 'Tawa Paratha', price: '₹30', isVeg: true },
    { name: 'Chapati', price: '₹25', isVeg: true },
    { name: 'Tandoori Roti', price: '₹35', isVeg: true },
    { name: 'Lachha Paratha', price: '₹40', isVeg: true },
    { name: 'Kulcha', price: '₹40', isVeg: true },
    { name: 'Garlic Naan', price: '₹45', isVeg: true },
    { name: 'Butter Naan', price: '₹40', isVeg: true },
  ],
  chineseRiceNoodles: [
    { name: 'Chicken Fried Rice', price: '₹180' },
    { name: 'Chicken Schezwan Rice', price: '₹200' },
    { name: 'Egg Fried Rice', price: '₹150' },
    { name: 'Schezwan Egg Rice', price: '₹160' },
    { name: 'Chicken Noodles', price: '₹190' },
    { name: 'Schezwan Chicken Noodles', price: '₹210' },
    { name: 'Veg Fried Rice', price: '₹140', isVeg: true },
    { name: 'Veg Schezwan Rice', price: '₹150', isVeg: true },
    { name: 'Veg Noodles', price: '₹150', isVeg: true },
    { name: 'Veg Schezwan Noodles', price: '₹160', isVeg: true },
  ],
  rice: [
    { name: 'Paneer Pulav', price: '₹170', isVeg: true },
    { name: 'Jeera Rice', price: '₹120', isVeg: true },
    { name: 'Veg Pulav', price: '₹150', isVeg: true },
    { name: 'Peas Pulav', price: '₹130', isVeg: true },
    { name: 'Ghee Rice', price: '₹180', isVeg: true },
  ],
};

function AddButton({ name, price }: { name: string; price: string }) {
  const { addItem, items } = useCart();
  const qty = items.find(i => i.name === name)?.qty ?? 0;
  const [flash, setFlash] = useState(false);

  const handleAdd = () => {
    addItem(name, price);
    setFlash(true);
    setTimeout(() => setFlash(false), 800);
  };

  return (
    <button
      onClick={handleAdd}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 shrink-0 ${
        qty > 0
          ? 'bg-primary text-white'
          : 'border border-primary text-primary hover:bg-primary hover:text-white'
      }`}
    >
      {flash ? (
        <Check className="w-3.5 h-3.5" />
      ) : (
        <Plus className="w-3.5 h-3.5" />
      )}
      {qty > 0 ? `${qty} Added` : 'Add'}
    </button>
  );
}

export function FullMenu() {
  const [activeCategory, setActiveCategory] = useState('breakfast');

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
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm md:text-base transition-all duration-300 ${
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
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4"
            >
              {menuData[activeCategory].map((item, index) => (
                <div key={index} className="flex flex-col border-b border-border/50 pb-4">
                  <div className="flex justify-between items-center gap-3">
                    <h3 className="font-serif text-lg font-bold text-foreground flex items-center gap-2 min-w-0">
                      <span className="truncate">{item.name}</span>
                      {item.isVeg && (
                        <span className="inline-flex shrink-0 w-4 h-4 border border-accent rounded-sm items-center justify-center" title="Vegetarian">
                          <span className="w-2 h-2 rounded-full bg-accent"></span>
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-primary font-bold">{item.price}</span>
                      <AddButton name={item.name} price={item.price} />
                    </div>
                  </div>
                  {item.desc && (
                    <p className="text-muted-foreground text-sm leading-relaxed mt-1">{item.desc}</p>
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
