
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useFormik } from 'formik';
import { useContactContext } from '../contexts/ContactContext';


const Contact = () => {
 
  const { PostContactData, loading } = useContactContext()

  const formik = useFormik({
    initialValues: {
      name:"",
      email:"",
      subject:"",
      message:"",
      
    },
    onSubmit: (values) => {
      PostContactData(values);
      formik.resetForm()
    }
  })

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Our Team",
      details: "support@meenora.com",
      description: "For general inquiries & support."
    },
    {
      icon: Phone,
      title: "Call Customer Care",
      details: "+1 (800) 555-MEEN",
      description: "Mon-Fri, 9 AM - 5 PM (EST)"
    },
    {
      icon: MapPin,
      title: "Our Headquarters",
      details: "123 Nature's Path, Serenity, CA 90210",
      description: "Visits by appointment only."
    },
    {
      icon: Clock,
      title: "Support Hours",
      details: "Mon-Fri: 9 AM - 5 PM (EST)",
      description: "Sat: 10 AM - 2 PM (EST)"
    }
  ];

  const faqs = [
    {
      question: "What is Meenora's philosophy on ingredients?",
      answer: "We prioritize natural, ethically-sourced, and scientifically-backed ingredients. Transparency and efficacy are key to our formulations."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can also check your order status in your Meenora account dashboard."
    },
    {
      question: "Do you offer samples or trial sizes?",
      answer: "We occasionally offer deluxe samples with purchases or as part of special promotions. Sign up for our newsletter for updates!"
    },
    {
      question: "Are your products suitable for sensitive skin?",
      answer: "Many of our products are formulated with sensitive skin in mind. We recommend patch testing and checking ingredient lists. Contact us for specific advice!"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - Get in Touch | Meenora</title>
        <meta name="description" content="Contact Meenora for questions about our premium beauty products. Get support, ask questions, or share feedback with our friendly team." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="hero-gradient py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl lg:text-6xl font-display font-bold text-foreground mb-5">
                Connect With <span className="gradient-text">Meenora</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We're delighted to hear from you! Whether you have a question, feedback, or just want to say hello, our team is ready to assist.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-3"
            >
              <Card className="shadow-xl border-border/70 bg-card p-2 sm:p-4">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-3xl font-display">
                    <MessageSquare className="h-8 w-8 mr-3 text-primary" />
                    Send Us a Message
                  </CardTitle>
                  <CardDescription className="text-base">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-1.5">
                          Full Name <span className="text-destructive">*</span>
                        </label>
                        <Input
                          id="name"
                          type="text"
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="e.g., Anya Sharma"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-1.5">
                          Email Address <span className="text-destructive">*</span>
                        </label>
                        <Input
                          id="email"
                          type="email"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="e.g., anya@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-1.5">
                        Subject <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="subject"
                        type="text"
                        name="subject"
                        value={formik.values.subject}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="e.g., Question about Nourishing Shampoo"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-1.5">
                        Your Message <span className="text-destructive">*</span>
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        rows={5}
                        placeholder="Tell us more about your inquiry..."
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full btn-primary text-base py-3"                     
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2.5"></div>
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Send className="h-5 w-5 mr-2.5" />
                          Send Message
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information & FAQs */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-2 space-y-10"
            >
              {/* Contact Details */}
              <Card className="shadow-xl border-border/70 bg-card">
                <CardHeader>
                   <CardTitle className="text-2xl font-display">Direct Contact</CardTitle>
                   <CardDescription>Reach out to us through these channels.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {contactInfo.map((info) => (
                    <div key={info.title} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/15 rounded-lg flex items-center justify-center mt-1">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{info.title}</h4>
                        <p className="text-primary text-sm font-medium">{info.details}</p>
                        <p className="text-muted-foreground text-xs">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              {/* FAQ Section */}
              <Card className="shadow-xl border-border/70 bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl font-display">
                     <HelpCircle className="h-7 w-7 mr-2.5 text-primary" />
                    Quick Answers
                  </CardTitle>
                  <CardDescription>Find answers to common questions.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {faqs.slice(0,2).map((faq, index) => ( // Show only 2 FAQs here for brevity
                    <div key={index} className="border-b border-border/50 pb-3 last:border-b-0 last:pb-0">
                      <h4 className="font-semibold text-foreground mb-1">{faq.question}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                   <Button variant="link" className="text-primary p-0 h-auto text-sm">View all FAQs</Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
