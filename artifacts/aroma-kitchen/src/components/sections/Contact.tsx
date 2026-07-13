import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Find Us</h2>
          <p className="text-muted-foreground text-lg">
            Whether it's a quick lunch or a family dinner, we're here to serve you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          <div className="space-y-8">
            <div className="bg-card p-8 rounded-2xl border border-border shadow-sm flex items-start gap-6">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-2">Location</h3>
                <p className="text-muted-foreground text-lg">
                  Jal Vayu Towers, Temple Rd<br />
                  Muneswara Layout, Sadanandanagar<br />
                  Bengaluru, Karnataka 560038
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-card p-8 rounded-2xl border border-border shadow-sm flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">Phone</h3>
                <p className="text-muted-foreground">082776 63021</p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border shadow-sm flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">Email</h3>
                <p className="text-muted-foreground">hello@aromakitchen.com</p>
              </div>
            </div>

            <div className="bg-secondary text-secondary-foreground p-8 rounded-2xl flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold mb-2">Opening Hours</h3>
                <p className="text-secondary-foreground/80 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Monday - Sunday: 7:30 AM - 10:00 PM
                </p>
              </div>
            </div>
          </div>

          <div className="h-full min-h-[400px] rounded-2xl overflow-hidden shadow-lg border border-border">
            {/* Simple placeholder for Google Map iframe */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '400px' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Aroma Kitchen Location"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}
