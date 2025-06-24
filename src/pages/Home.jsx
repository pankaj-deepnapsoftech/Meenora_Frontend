
import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '@/components/home/HeroSection.jsx';
import FeaturesSection from '@/components/home/FeaturesSection.jsx';
import FeaturedProductsSection from '@/components/home/FeaturedProductsSection.jsx';
import ComingSoonSection from '@/components/home/ComingSoonSection.jsx';
import TestimonialsSection from '@/components/home/TestimonialsSection.jsx';
import CtaSection from '@/components/home/CtaSection.jsx';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Meenora - Pure & Potent Natural Beauty</title>
        <meta name="description" content="Discover Meenora's collection of luxurious, natural beauty and skincare products. Ethically sourced, cruelty-free, for radiant skin and healthy hair." />
      </Helmet>
      <HeroSection />
      <FeaturesSection />
      <FeaturedProductsSection />
      <ComingSoonSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
};

export default Home;
