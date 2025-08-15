import React, { useState, useEffect } from 'react';
import { ShoppingCart, Gift, Sparkles, Star, CreditCard, Loader } from 'lucide-react';
import actionCarLogo from '../assets/images/action car logo.png';
import Footer from '../components/Footer';

const GiftCard = () => {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const amounts = [25, 50, 100, 200, 500];

  // Added: PayPal SDK loading
  useEffect(() => {
    if (window.paypal) {
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=AThUUsAIJHKFSjurstprLlTSA1NgCva6rMWLiFd4HloJaTR21GapewVyF7rs1_zwlHx0muhSZ2R8yyg_&currency=USD`;
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleQuantityChange = (action) => {
    if (action === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentStatus(null);

    try {
      // Check if PayPal SDK is loaded
      if (!window.paypal) {
        alert('PayPal is still loading. Please wait a moment and try again.');
        setIsProcessing(false);
        return;
      }

      // Create PayPal payment directly
      const totalPrice = selectedAmount * quantity;
      
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: totalPrice.toString()
              },
              description: `Gift Card - ${selectedAmount} x ${quantity}`
            }]
          });
        },
        onApprove: async (data, actions) => {
          try {
            const details = await actions.order.capture();
            console.log('Payment completed:', details);
            setPaymentStatus('success');
            setQuantity(1);
          } catch (error) {
            console.error('Payment capture error:', error);
            setPaymentStatus('error');
          } finally {
            setIsProcessing(false);
          }
        },
        onError: (err) => {
          console.error('PayPal Error:', err);
          setPaymentStatus('error');
          setIsProcessing(false);
        },
        onCancel: (data) => {
          console.log('Payment cancelled:', data);
          setIsProcessing(false);
        }
      }).render('#paypal-button-container');

      // Hide the main button and show PayPal container
      document.querySelector('.payment-button').style.display = 'none';
      document.getElementById('paypal-button-container').style.display = 'block';

    } catch (error) {
      setPaymentStatus('error');
      console.error('PayPal integration error:', error);
      setIsProcessing(false);
    }
  };

  const totalPrice = selectedAmount * quantity;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 p-4">
      <div className="max-w-2xl mx-auto pt-32">
        <div 
          className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 ${
            isHovered ? 'scale-102 shadow-xl' : ''
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 opacity-5"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-sky-200 to-transparent rounded-full -translate-y-16 translate-x-16 opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-sky-100 to-transparent rounded-full translate-y-12 -translate-x-12 opacity-30"></div>

          <div className="relative z-10 p-8">
            {/* Gift Card Visual - Centered at top */}
            <div className="flex flex-col items-center justify-center space-y-4 mb-6">
              {/* Floating Sparkles */}
              <div className="relative">
                <Sparkles className="absolute -top-3 -left-3 text-sky-400 w-4 h-4 animate-pulse" />
                <Sparkles className="absolute -bottom-1 -right-1 text-sky-300 w-3 h-3 animate-pulse delay-300" />
                
                {/* Gift Card Design - Made smaller */}
                <div className="relative w-48 h-32 bg-white rounded-xl shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300 border border-sky-200">
                  <div className="absolute inset-1 bg-white rounded-lg border border-gray-100">
                    <div className="p-3 h-full flex flex-col justify-between">
                      {/* Logo */}
                      <div className="flex justify-center">
                        <img 
                          src={actionCarLogo} 
                          alt="Action Car Logo" 
                          className="h-5 w-auto max-w-24"
                        />
                      </div>
                      
                      {/* Gift Card Text */}
                      <div className="text-center">
                        <h3 className="text-sky-400 text-sm font-bold mb-1">GIFT CARD</h3>
                        <div className="text-sky-500 text-base font-semibold">
                          ${selectedAmount}.00
                        </div>
                      </div>
                      
                      {/* Decorative Pattern */}
                      <div className="flex justify-center space-x-1">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="w-1.5 h-1.5 text-sky-500 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gift Icon */}
              <div className="bg-gradient-to-r from-sky-100 to-sky-50 p-2 rounded-full">
                <Gift className="w-5 h-5 text-sky-600" />
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent mb-2">
                  Perfect Gift Card
                </h1>
                <p className="text-sky-500 text-sm leading-relaxed">
                  Give the gift of choice with our premium gift cards. Perfect for any occasion and redeemable across all our services.
                </p>
              </div>

              {/* Amount Selection */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-sky-500 text-center">Select Amount</h3>
                <div className="grid grid-cols-5 gap-2">
                  {amounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setSelectedAmount(amount)}
                      className={`relative p-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                        selectedAmount === amount
                          ? 'bg-gradient-to-r from-sky-400 to-sky-500 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-sky-500 hover:bg-sky-50 hover:scale-105'
                      }`}
                    >
                      ${amount}
                      {selectedAmount === amount && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                          <Star className="w-1.5 h-1.5 text-sky-600 fill-current" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-sky-500 text-center">Quantity</h3>
                <div className="flex items-center justify-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange('decrement')}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-sky-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold text-lg transition-colors duration-200"
                  >
                    -
                  </button>
                  <div className="bg-sky-50 px-6 py-3 rounded-lg">
                    <span className="text-xl font-semibold text-sky-600">
                      {quantity}
                    </span>
                  </div>
                  <button
                    onClick={() => handleQuantityChange('increment')}
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-sky-100 flex items-center justify-center font-bold text-lg transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Price */}
              <div className="bg-gradient-to-r from-sky-50 to-white p-4 rounded-xl border border-sky-100">
                <div className="flex justify-between items-center">
                  <span className="text-lg text-sky-500">Total Price:</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">
                    ${totalPrice}.00
                  </span>
                </div>
              </div>

              {/* Payment Status */}
              {paymentStatus && (
                <div className={`p-4 rounded-xl ${
                  paymentStatus === 'success' 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  {paymentStatus === 'success' ? '✅ Payment successful!' : '❌ Payment failed. Please try again.'}
                </div>
              )}

              {/* PayPal Payment Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="payment-button w-full bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:scale-100 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                {isProcessing ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span className="text-lg">Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span className="text-lg">Pay with PayPal</span>
                  </>
                )}
              </button>

              {/* PayPal Buttons Container */}
              <div id="paypal-button-container" style={{display: 'none'}} className="mt-4"></div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 pt-3">
                <div className="flex items-center space-x-2 text-sky-500 text-sm">
                  <div className="w-2 h-2 bg-sky-500 rounded-full flex-shrink-0"></div>
                  <span>No Expiration Date</span>
                </div>
                <div className="flex items-center space-x-2 text-sky-500 text-sm">
                  <div className="w-2 h-2 bg-sky-400 rounded-full flex-shrink-0"></div>
                  <span>Instant Delivery</span>
                </div>
                <div className="flex items-center space-x-2 text-sky-500 text-sm">
                  <div className="w-2 h-2 bg-sky-600 rounded-full flex-shrink-0"></div>
                  <span>Easy to Redeem</span>
                </div>
                <div className="flex items-center space-x-2 text-sky-500 text-sm">
                  <div className="w-2 h-2 bg-sky-300 rounded-full flex-shrink-0"></div>
                  <span>Perfect for Gifting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCard;
