import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useCreateReview, getListReviewsQueryKey } from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

const reviewFormSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().trim().email('Enter a valid email address').max(255).optional().or(z.literal('')),
  rating: z.number().int().min(1, 'Please select a rating').max(5),
  message: z
    .string()
    .trim()
    .min(10, 'Review must be at least 10 characters')
    .max(1000, 'Review must be under 1000 characters'),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

export function ReviewForm() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [hoveredStar, setHoveredStar] = useState(0);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: { name: '', email: '', rating: 0, message: '' },
  });

  const { mutate, isPending } = useCreateReview({
    mutation: {
      onSuccess: () => {
        toast({
          title: 'Thank you for your review!',
          description: 'Your feedback has been posted.',
        });
        reset({ name: '', email: '', rating: 0, message: '' });
        queryClient.invalidateQueries({ queryKey: getListReviewsQueryKey() });
      },
      onError: (error) => {
        const message =
          (error as { status?: number })?.status === 429
            ? 'Please wait a moment before submitting another review.'
            : 'Something went wrong. Please try again.';
        toast({ title: 'Could not submit review', description: message, variant: 'destructive' });
      },
    },
  });

  const onSubmit = (data: ReviewFormValues) => {
    mutate({
      data: {
        name: data.name,
        email: data.email ? data.email : undefined,
        rating: data.rating,
        message: data.message,
      },
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-background p-8 rounded-2xl shadow-sm border border-border max-w-2xl mx-auto"
    >
      <h3 className="text-2xl font-serif font-bold text-foreground mb-6 text-center">Write a Review</h3>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Your Name</label>
            <input
              {...register('name')}
              className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              placeholder="e.g. Priya Sharma"
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email (optional)</label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Your Rating</label>
          <Controller
            control={control}
            name="rating"
            render={({ field }) => (
              <div className="flex gap-1" onMouseLeave={() => setHoveredStar(0)}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoveredStar(star)}
                    onClick={() => field.onChange(star)}
                    className="p-1"
                    aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                  >
                    <Star
                      className={`w-7 h-7 transition-colors ${
                        star <= (hoveredStar || field.value)
                          ? 'fill-primary text-primary'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
          />
          {errors.rating && <p className="text-sm text-destructive">{errors.rating.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Your Review</label>
          <Textarea
            {...register('message')}
            rows={4}
            placeholder="Tell us about your experience..."
            className="bg-muted"
          />
          {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3.5 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all disabled:opacity-70 flex items-center justify-center"
        >
          {isPending ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            'Submit Review'
          )}
        </button>
      </div>
    </motion.form>
  );
}
