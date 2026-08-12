import { MessageCircle, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

export function FloatingWhatsApp() {
  const { totalItems, openModal } = useCart();
  const hasItems = totalItems > 0;

  return (
    <motion.button
      onClick={openModal}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200, damping: 20 }}
      className="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform flex items-center justify-center group"
      aria-label="Order on WhatsApp"
    >
      {/* Swap icon: cart when items present, chat otherwise */}
      <AnimatePresence mode="wait" initial={false}>
        {hasItems ? (
          <motion.span
            key="cart"
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 15 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex"
          >
            <ShoppingCart className="w-7 h-7" />
          </motion.span>
        ) : (
          <motion.span
            key="chat"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex"
          >
            <MessageCircle className="w-7 h-7" />
          </motion.span>
        )}
      </AnimatePresence>

      {/* Item count badge */}
      <AnimatePresence>
        {hasItems && (
          <motion.span
            key="badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center px-1 shadow"
          >
            {totalItems}
          </motion.span>
        )}
      </AnimatePresence>

      <span className="absolute left-full ml-3 bg-white text-[#25D366] px-3 py-1.5 rounded-lg font-medium text-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden md:block">
        {hasItems ? `${totalItems} item${totalItems !== 1 ? 's' : ''} in cart` : 'Order via WhatsApp'}
      </span>
    </motion.button>
  );
}
