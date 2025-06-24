
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonialsData = [
  {
    name: "Ananya M.",
    rating: 5,
    comment: "I’ve never felt more confident about my hair. Meenora actually delivers what it promises.",
    image: "Joyful woman with healthy, flowing dark hair, smiling broadly",
    title: "Confidence Restored!"
  },
  {
    name: "Ravi S.",
    rating: 5,
    comment: "The clean ingredients give me peace of mind, and the results are real.",
    image: "Man looking pleased, inspecting his healthy hair or skin",
    title: "Peace of Mind & Real Results"
  },
  { // Adding a third generic one if needed, or could use one from previous set
    name: "Priya K.",
    rating: 5,
    comment: "Finally, products that understand my needs! My skin feels amazing and hair is healthier than ever.",
    image: "Woman with glowing skin, happily touching her face",
    title: "Understands My Needs!"
  }
];


const TestimonialsSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-background"> {/* Changed to bg-background for contrast */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <Quote className="h-12 w-12 text-primary/50 mx-auto mb-4" />
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-5">
            Loved by You
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground">
            Hear what our cherished customers are saying about their Meenora experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <Card className="testimonial-card p-8 h-full bg-card border-border/70 shadow-xl hover:shadow-secondary/20 flex flex-col">
                <CardContent className="space-y-5 flex flex-col flex-grow">
                  <div className="flex items-center space-x-1 text-primary">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <h4 className="text-xl font-semibold text-foreground pt-1">{testimonial.title}</h4>
                  <p className="text-foreground/85 italic text-base leading-relaxed flex-grow">"{testimonial.comment}"</p>
                  <div className="flex items-center space-x-4 pt-5 border-t border-border/50 mt-auto">
                    <img  
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/50"
                      alt={testimonial.image}
                     src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                    <div>
                      <p className="font-semibold text-foreground text-lg">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">Verified Buyer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
