import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
      
      const order = {
        id: Date.now(),
        items: items,
        total: getCartTotal() * 1.08,
        date: new Date().toISOString(),
        status: 'processing',
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        }
      };

      const existingOrders = JSON.parse(localStorage.getItem('meenora_orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('meenora_orders', JSON.stringify(existingOrders));

      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase. You'll receive a confirmation email shortly."
      });
    }, 3000);
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some products to your cart before checkout.</p>
          <Button onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <>
        <Helmet>
          <title>Order Confirmation - Meenora</title>
          <meta name="description" content="Your order has been placed successfully. Thank you for shopping with Meenora." />
        </Helmet>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 max-w-md mx-auto px-4"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                Order Confirmed!
              </h1>
              <p className="text-gray-600 mb-8">
                Thank you for your purchase. Your order has been placed successfully and you'll receive a confirmation email shortly.
              </p>
              <div className="space-y-3">
                <Button 
                  size="lg" 
                  className="w-full btn-primary text-white"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  View Order Status
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  onClick={() => window.location.href = '/shop'}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout - Secure Payment | Meenora</title>
        <meta name="description" content="Complete your purchase securely. Fast checkout process for premium beauty and skincare products." />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-8 text-center">
              Secure Checkout
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CheckoutForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isProcessing={isProcessing}
              />
              <OrderSummary items={items} getCartTotal={getCartTotal} />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Checkout;