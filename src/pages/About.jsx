import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, Users, Zap, GitBranch, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  const coreBeliefs = [
    { icon: Leaf, title: "Sulfate-Free", description: "Gentle cleansing without harsh chemicals." },
    { icon: ShieldCheck, title: "Paraben-Free", description: "Committed to safer preservative choices." },
    { icon: Users, title: "Vegan", description: "100% plant-derived ingredients." },
    { icon: Zap, title: "Cruelty-Free", description: "No animal testing, ever. PETA certified." },
    { icon: GitBranch, title: "Dermatologically Tested", description: "Validated for safety and efficacy." }
  ];

  const redefiningBeauty = [
    { title: "Vitality, Not Vanity", description: "We see beauty as an expression of overall health and well-being." },
    { title: "Necessity, Not Luxury", description: "Self-care is fundamental, not an occasional treat." },
    { title: "Conscious Ritual, Not Quick Fix", description: "We encourage mindful, sustainable beauty practices." }
  ];

  const upcomingProducts = [
    { name: "Sunscreen Cream", description: "Broad-spectrum protection, lightweight feel." },
    { name: "Moisturiser", description: "Deep, lasting hydration for supple skin." },
    { name: "Face Wash", description: "Gentle yet effective cleansing for a fresh start." }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - The Meenora Professional Story | Meenora</title>
        <meta name="description" content="Discover Meenora Professional's journey, philosophy, and commitment to clean, effective, and empowering self-care solutions." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="hero-gradient py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <Sparkles className="h-16 w-16 text-primary mx-auto" />
              <h1 className="text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
                The Journey Toward Self-Care,
                <span className="gradient-text block mt-2">Reinvented.</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Welcome to Meenora Professional — your trusted partner in daily wellness and self-love. We offer not just beauty products, but a lifestyle transformation that starts from within.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Core Story Section */}
        <section className="py-20 lg:py-28 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h2 className="text-4xl font-display font-bold text-foreground">Our Foundation: Science Meets Nature</h2>
                <p className="text-lg text-muted-foreground">
                  In a world that constantly demands more, we often forget to give ourselves the care we truly deserve. Meenora Professional was founded on the belief that true self-care is a balance between science and nature. We empower individuals to take control of their health, confidence, and routine.
                </p>
                <p className="text-lg text-muted-foreground">
                  Whether you're fighting daily pollution, stress-induced skin issues, or dull, damaged hair, Meenora is here with gentle yet effective solutions designed for modern lives.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
              >
                <img   
                  className="w-full h-auto rounded-xl shadow-xl object-cover aspect-square"
                  alt="Meenora product bottles displayed with natural botanicals"
                 src="https://images.unsplash.com/photo-1695765047872-373c848bfaf0" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16 lg:mb-20"
            >
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-5">
                Our Philosophy: Clean Beauty, Pure Intentions
              </h2>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
                We believe that what goes on your body should be as pure and safe as what goes into it. Our formulations are driven by research and backed by natural, performance-enhancing ingredients.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreBeliefs.map((belief, index) => (
                <motion.div
                  key={belief.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="h-full card-hover bg-card border-border/70 shadow-lg hover:shadow-primary/15 text-center p-8">
                    <CardContent className="space-y-4">
                      <div className="w-16 h-16 bg-primary/15 rounded-full flex items-center justify-center mx-auto mb-5 ring-4 ring-primary/20">
                        <belief.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-display text-foreground">{belief.title}</h3>
                      <p className="text-muted-foreground text-base">{belief.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
             <p className="text-center text-lg text-muted-foreground mt-12 max-w-2xl mx-auto">
                Key ingredients like Biotin, Vitamin E, Pea Protein, Soy Protein, L-Arginine, and plant-based oils are at the heart of our high-performing care products that nourish, restore, and protect.
              </p>
          </div>
        </section>

        {/* A Movement Section */}
        <section className="py-20 lg:py-28 bg-primary/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
                More Than Products — A Movement
              </h2>
              <p className="text-lg lg:text-xl text-muted-foreground mb-10">
                Meenora isn't just a brand; it's a mindset. A quiet rebellion against superficial beauty standards, unrealistic expectations, and temporary fixes. We believe that real beauty is sustainable, confidence is rooted in health, and glow begins from the inside out.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {redefiningBeauty.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: index * 0.15 }}
                  >
                    <Card className="h-full bg-card shadow-lg p-6 transform hover:scale-105 transition-transform">
                      <CardHeader>
                        <CardTitle className="text-2xl font-display text-primary">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Our Promise Section */}
        <section className="py-20 lg:py-28 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
               <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
              >
                <img   
                  className="w-full h-auto rounded-xl shadow-xl object-cover aspect-[4/3]"
                  alt="Meenora skincare product range displayed on a clean surface"
                 src="https://images.unsplash.com/photo-1580680639308-36ecfd3608b8" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h2 className="text-4xl font-display font-bold text-foreground">Our Promise to You</h2>
                <ul className="space-y-3 text-lg text-muted-foreground">
                  {[
                    "Professional-grade quality accessible to all",
                    "Clean formulations suitable for everyday use",
                    "Transparent practices — we show what goes in every bottle",
                    "Empowerment through education — we help you understand your skin and hair needs",
                    "Consistency, not complexity — because you don’t need 20 products to feel beautiful"
                  ].map((promise, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                      <span>{promise}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What's Next Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground">What’s Next</h2>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
                From shampoos and conditioners to advanced skin protection and nourishment — our journey has just begun. We're working on launching exciting new products to solidify our mission of making complete personal care a seamless and enjoyable experience.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 max-w-4xl mx-auto">
                {upcomingProducts.map((product, index) => (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                  >
                    <Card className="bg-card shadow-md p-6 h-full">
                      <CardHeader>
                        <CardTitle className="text-xl font-display text-primary">{product.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Community Call Section */}
        <section className="py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <Users className="h-16 w-16 text-background/80 mx-auto" />
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-background mb-6">
                Join Our Community
              </h2>
              <p className="text-xl lg:text-2xl text-background/90 max-w-3xl mx-auto leading-relaxed">
                At Meenora, you’re not just a customer — you’re part of a growing community that celebrates self-worth, inner strength, and mindful living. So here’s to glowing skin, healthy hair, and a happier you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/shop">
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="bg-background text-primary hover:bg-background/90 text-lg py-4 px-10 shadow-2xl transform hover:scale-105 transition-transform duration-300 group w-full sm:w-auto"
                  >
                    Explore Products
                  </Button>
                </Link>
                <Link to="/contact">
                   <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-background/50 text-background bg-background/10 hover:bg-background hover:text-primary text-lg py-4 px-10 w-full sm:w-auto"
                  >
                    Connect With Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
};

export default About;