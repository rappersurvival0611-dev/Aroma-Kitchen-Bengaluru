import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Clock, Users, User, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { useCreateReservation } from '@workspace/api-client-react';
import { useToast } from '@/hooks/use-toast';

const RESTAURANT_WHATSAPP_NUMBER = '919986224506';

const reservationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  date: z.string().min(1, { message: "Please select a date." }),
  time: z.string().min(1, { message: "Please select a time." }),
  guests: z.string().min(1, { message: "Please enter number of guests." }),
  occasion: z.string().min(1, { message: "Please select an occasion." }),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

function timeLabel(time: string): string {
  const [hourStr, minute] = time.split(':');
  const hour = Number(hourStr);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${minute} ${period}`;
}

function guestsLabel(guests: string): string {
  return `${guests} ${guests === '1' ? 'Person' : 'People'}`;
}

const GUEST_OPTIONS = Array.from({ length: 20 }, (_, i) => String(i + 1));

export function Reservation() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
  });

  const { mutateAsync } = useCreateReservation({
    mutation: {
      onError: (error) => {
        const message =
          (error as { status?: number })?.status === 429
            ? 'Please wait a moment before submitting another reservation.'
            : 'Something went wrong while booking your table. Please try again.';
        toast({ title: 'Reservation failed', description: message, variant: 'destructive' });
      },
    },
  });

  const onSubmit = async (data: ReservationFormValues) => {
    try {
      await mutateAsync({
        data: {
          name: data.name,
          phone: data.phone,
          email: data.email,
          date: data.date,
          time: data.time,
          guests: data.guests,
        },
      });
    } catch {
      // Error toast is already shown by the mutation's onError handler.
      return;
    }

    const message = [
      'New table reservation request:',
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email}`,
      `Date: ${data.date}`,
      `Time: ${timeLabel(data.time)}`,
      `Guests: ${guestsLabel(data.guests)}`,
      `Occasion: ${data.occasion}`,
    ].join('\n');

    const waUrl = `https://wa.me/${RESTAURANT_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setIsSubmitted(true);
    reset();
  };

  return (
    <section id="reservation" className="py-24 bg-secondary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-[url('/about.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay hidden lg:block" />
      <div className="absolute -right-64 -top-64 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-background rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side: Info */}
          <div className="bg-primary p-10 text-primary-foreground md:w-2/5 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-white/10 rounded-full" />
            <div className="absolute top-8 left-8 w-16 h-16 bg-white/10 rounded-full" />
            
            <div className="relative z-10">
              <h3 className="font-serif text-3xl font-bold mb-4">Book a Table</h3>
              <p className="text-primary-foreground/80 mb-8">
                Reserve your spot to enjoy an unforgettable dining experience with authentic Indian flavors.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold mb-1 opacity-90">Opening Hours</h4>
                  <p className="opacity-80">Mon - Sun: 7:30 AM - 9:30 PM</p>
                </div>
                <div>
                  <h4 className="font-bold mb-1 opacity-90">Location</h4>
                  <p className="opacity-80">Jal Vayu Towers, Temple Rd, Muneswara Layout, Sadanandanagar, Bengaluru, Karnataka 560038</p>
                </div>
                <div>
                  <h4 className="font-bold mb-1 opacity-90">Contact</h4>
                  <p className="opacity-80">082776 63021</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="p-10 md:w-3/5 relative">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-foreground mb-4">Reservation Confirmed!</h3>
                  <p className="text-muted-foreground mb-8 max-w-xs mx-auto">
                    Thank you for booking with Aroma Kitchen. We've opened WhatsApp with your booking details &mdash; just hit send so our team can confirm it.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="px-8 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
                  >
                    Make Another Booking
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          {...register('name')}
                          className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          {...register('phone')}
                          className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                          placeholder="(555) 000-0000"
                        />
                      </div>
                      {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          {...register('email')}
                          type="email"
                          className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Date</label>
                      <div className="relative">
                        <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          {...register('date')}
                          type="date"
                          className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        />
                      </div>
                      {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Time</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <select
                          {...register('time')}
                          className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none"
                        >
                          <option value="">Select time</option>
                          <option value="07:30">7:30 AM</option>
                          <option value="08:00">8:00 AM</option>
                          <option value="09:00">9:00 AM</option>
                          <option value="12:00">12:00 PM</option>
                          <option value="12:30">12:30 PM</option>
                          <option value="13:00">1:00 PM</option>
                          <option value="18:00">6:00 PM</option>
                          <option value="18:30">6:30 PM</option>
                          <option value="19:00">7:00 PM</option>
                          <option value="19:30">7:30 PM</option>
                          <option value="20:00">8:00 PM</option>
                          <option value="21:30">9:30 PM</option>
                        </select>
                      </div>
                      {errors.time && <p className="text-sm text-destructive">{errors.time.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Guests</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <select
                          {...register('guests')}
                          className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none"
                        >
                          <option value="">Number of guests</option>
                          {GUEST_OPTIONS.map((g) => (
                            <option key={g} value={g}>
                              {guestsLabel(g)}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.guests && <p className="text-sm text-destructive">{errors.guests.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Occasion</label>
                      <div className="relative">
                        <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <select
                          {...register('occasion')}
                          className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none"
                        >
                          <option value="">Select occasion</option>
                          <option value="Regular Dining">Regular Dining</option>
                          <option value="Birthday Celebration">Birthday Celebration</option>
                          <option value="Anniversary">Anniversary</option>
                          <option value="Date Night">Date Night</option>
                          <option value="Family Gathering">Family Gathering</option>
                          <option value="Business Meal">Business Meal</option>
                          <option value="Farewell / Get-together">Farewell / Get-together</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      {errors.occasion && <p className="text-sm text-destructive">{errors.occasion.message}</p>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20 disabled:opacity-70 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      'Confirm Reservation'
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
