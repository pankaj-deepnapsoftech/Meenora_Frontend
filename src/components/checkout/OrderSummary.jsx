import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Truck, CheckCircle } from 'lucide-react';

const OrderSummary = ({ items, getCartTotal }) => {
  return (
    <div>
      <Card className="sticky top-24">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <img  
                  className="w-12 h-12 object-cover rounded-lg"
                  alt={item.name}
                 src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <span className="font-medium text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${(getCartTotal() * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Lock className="h-4 w-4 mr-2 text-green-600" />
              <span>SSL encrypted checkout</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Truck className="h-4 w-4 mr-2 text-green-600" />
              <span>Free shipping included</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
              <span>30-day return policy</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSummary;