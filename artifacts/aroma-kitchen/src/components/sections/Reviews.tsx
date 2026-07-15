import { motion } from 'framer-motion';
import { Star, Quote, Loader2 } from 'lucide-react';
import { useListReviews } from '@workspace/api-client-react';
import { ReviewForm } from './ReviewForm';

export function Reviews() {
  const { data: reviews, isLoading, isError } = useListReviews();

  return (
    <section id="reviews" className="py-24 bg-card relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-primary"></div>
            <span className="text-primary font-medium tracking-wider uppercase text-sm">Testimonials</span>
            <div className="w-8 h-[2px] bg-primary"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">What Our Guests Say</h2>
        </div>

        {isLoading && (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        )}

        {isError && (
          <p className="text-center text-muted-foreground mb-16">
            We couldn't load reviews right now. Please try again later.
          </p>
        )}

        {!isLoading && !isError && reviews && reviews.length === 0 && (
          <p className="text-center text-muted-foreground mb-16">
            No reviews yet. Be the first to share your experience!
          </p>
        )}

        {!isLoading && !isError && reviews && reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                className="bg-background p-8 rounded-2xl shadow-sm border border-border relative"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground text-lg mb-8 italic">"{review.message}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-serif font-bold text-xl">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{review.name}</h4>
                    <span className="text-sm text-muted-foreground">Verified Guest</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <ReviewForm />
      </div>
    </section>
  );
}
