
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, TestTube2, Leaf, Users } from 'lucide-react'; // Updated icons
import { Card, CardContent } from '@/components/ui/card';

const featuresData = [
  {
    icon: Leaf,
    title: "100% Vegan & Cruelty-Free",
    description: "Ethically sourced plant-based ingredients. Never tested on animals."
  },
  {
    icon: ShieldCheck,
    title: "Dermatologically Approved",
    description: "Scientifically validated for safety and efficacy by skin experts."
  },
  {
    icon: TestTube2,
    title: "Backed by Science, Powered by Nature",
    description: "Innovative formulas blending botanical wisdom with research."
  },
  {
    icon: Users,
    title: "Created by Experts, Loved by Customers",
    description: "Expertly crafted products that deliver real, visible results."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-5">
            Why Choose Meenora?
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            At Meenora, every ingredient has a purpose. Every product has a story. And every purchase is a step toward a healthier you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {featuresData.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="text-center"
            >
              <Card className="p-8 h-full card-hover bg-background border-border/70 shadow-lg hover:shadow-primary/15">
                <CardContent className="space-y-5">
                  <div className="w-20 h-20 bg-primary/15 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-primary/20">
                    <feature.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-base">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
