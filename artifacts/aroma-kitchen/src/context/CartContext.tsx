import { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  name: string;
  price: string; // e.g. "₹320"
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (name: string, price: string) => void;
  removeItem: (name: string) => void;
  clearCart: () => void;
  totalItems: number;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addItem = (name: string, price: string) => {
    setItems(prev => {
      const existing = prev.find(i => i.name === name);
      if (existing) return prev.map(i => i.name === name ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { name, price, qty: 1 }];
    });
  };

  const removeItem = (name: string) => {
    setItems(prev => {
      const existing = prev.find(i => i.name === name);
      if (!existing) return prev;
      if (existing.qty === 1) return prev.filter(i => i.name !== name);
      return prev.map(i => i.name === name ? { ...i, qty: i.qty - 1 } : i);
    });
  };

  const clearCart = () => setItems([]);
  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, clearCart, totalItems,
      isModalOpen,
      openModal: () => setIsModalOpen(true),
      closeModal: () => setIsModalOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
