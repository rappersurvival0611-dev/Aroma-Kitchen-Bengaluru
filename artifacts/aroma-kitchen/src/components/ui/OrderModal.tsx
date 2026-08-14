import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, User, Phone, MapPin } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

const ORDER_WHATSAPP = '918277663021';

export function OrderModal() {
  const { items, addItem, removeItem, clearCart, isModalOpen, closeModal } = useCart();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({});

  const PACKING_RATE = 10; // ₹10 per container

  const subtotal = items.reduce((sum, item) => {
    const num = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
    return sum + (isNaN(num) ? 0 : num * item.qty);
  }, 0);

  const totalContainers = items.reduce((sum, item) => sum + item.qty, 0);
  const packingCharges = totalContainers * PACKING_RATE;
  const totalPrice = subtotal + packingCharges;

  const validate = () => {
    const errs: typeof errors = {};
    if (name.trim().length < 2) errs.name = 'Please enter your name.';
    if (phone.trim().length < 10) errs.phone = 'Please enter a valid phone number.';
    if (address.trim().length < 5) errs.address = 'Please enter your delivery address.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (items.length === 0) {
      toast({ title: 'Cart is empty', description: 'Add some items before ordering.', variant: 'destructive' });
      return;
    }
    if (!validate()) return;

    const orderLines = items.map(i => `  • ${i.name} x${i.qty}`).join('\n');
    const message = [
      '🛍️ New Food Order:',
      '',
      orderLines,
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Address: ${address}`,
    ].join('\n');

    window.open(`https://wa.me/${ORDER_WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    clearCart();
    setName('');
    setPhone('');
    setAddress('');
    setErrors({});
    closeModal();
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Slide-in panel */}
          <motion.div
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border shrink-0">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-serif font-bold text-foreground">Your Order</h2>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              {/* Cart items */}
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Items</h3>
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-14 text-muted-foreground text-center">
                    <ShoppingBag className="w-14 h-14 mb-4 opacity-20" />
                    <p className="font-medium">Your cart is empty</p>
                    <p className="text-sm mt-1">Browse the menu and tap <strong>Add</strong> on any item.</p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {items.map(item => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between gap-3 bg-muted rounded-xl px-4 py-3"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm truncate">{item.name}</p>
                          <p className="text-primary text-sm font-bold">{item.price}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => removeItem(item.name)}
                            className="w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center hover:bg-destructive hover:text-white hover:border-destructive transition-colors"
                            aria-label="Remove one"
                          >
                            {item.qty === 1 ? <Trash2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                          </button>
                          <span className="w-5 text-center font-bold text-sm">{item.qty}</span>
                          <button
                            onClick={() => addItem(item.name, item.price)}
                            className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"
                            aria-label="Add one more"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Breakdown */}
                    <div className="border-t border-border mt-2 pt-3 space-y-2 px-1">
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>Subtotal</span>
                        <span>₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>Packing charges ({totalContainers} container{totalContainers !== 1 ? 's' : ''} × ₹{PACKING_RATE})</span>
                        <span>₹{packingCharges}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-border">
                        <span className="font-semibold text-foreground">Total</span>
                        <span className="text-xl font-bold text-primary">₹{totalPrice}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-border" />

              {/* Delivery details */}
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Delivery Details</h3>
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1.5">Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        value={name}
                        onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })); }}
                        className="w-full pl-9 pr-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                        placeholder="Your full name"
                      />
                    </div>
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1.5">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        value={phone}
                        onChange={e => { setPhone(e.target.value); setErrors(p => ({ ...p, phone: undefined })); }}
                        className="w-full pl-9 pr-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                        placeholder="Your mobile number"
                        inputMode="tel"
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1.5">Delivery Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                      <textarea
                        value={address}
                        onChange={e => { setAddress(e.target.value); setErrors(p => ({ ...p, address: undefined })); }}
                        rows={3}
                        className="w-full pl-9 pr-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm resize-none"
                        placeholder="House no., Street, Area, City"
                      />
                    </div>
                    {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="px-6 py-5 border-t border-border shrink-0">
              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-[#25D366] text-white rounded-xl font-bold text-base hover:bg-[#1ebe5d] transition-colors flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/25"
              >
                {/* WhatsApp icon */}
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Place Order via WhatsApp
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
