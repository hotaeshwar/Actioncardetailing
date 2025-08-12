import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Calendar, Clock, Car, Truck, User, Mail, Phone, MessageSquare, MapPin, CreditCard } from 'lucide-react';

const PaintPolishingForm = () => {
  const [formData, setFormData] = useState({
    vehicleType: '',
    washPackage: '',
    addOns: [],
    selectedDate: '',
    selectedTime: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    vehicleMake: '',
    message: ''
  });

  const handleFormSubmit = async () => {
    if (!isFormValid()) {
      alert('Please fill in all required fields.');
      return;
    }

    const formElement = document.createElement('form');
    formElement.action = 'https://formsubmit.co/actioncardetailing@gmail.com';
    formElement.method = 'POST';
    formElement.style.display = 'none';

    const selectedPackage = washPackages.find(pkg => pkg.id === formData.washPackage);
    const selectedAddOns = formData.addOns.map(id => addOnOptions.find(opt => opt.id === id)?.name).filter(Boolean);
    const selectedVehicle = vehicleTypes.find(v => v.id === formData.vehicleType);

    const bookingSummary = {
      'Service Type': 'Paint Polishing',
      'Vehicle Type': selectedVehicle?.name || '',
      'Package': selectedPackage?.name || '',
      'Add-ons': selectedAddOns.join(', ') || 'None',
      'Appointment Date': formData.selectedDate,
      'Appointment Time': formData.selectedTime,
      'Total Price': `${calculateTotal()}.00 CAD`,
      'First Name': formData.firstName,
      'Last Name': formData.lastName,
      'Email': formData.email,
      'Phone': formData.phone,
      'Vehicle Make/Model': formData.vehicleMake,
      'Message': formData.message,
      '_subject': 'New Paint Polishing Booking Request',
      '_replyto': formData.email,
      '_captcha': 'false',
      '_next': window.location.origin
    };

    Object.keys(bookingSummary).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = bookingSummary[key];
      formElement.appendChild(input);
    });

    document.body.appendChild(formElement);
    
    alert('Booking submitted successfully! We will confirm your appointment within 24 hours. Redirecting to homepage...');
    
    formElement.submit();
  };

  const washPackages = [
    {
      id: 'one-stage',
      name: 'One Stage Paint Correction Polish',
      duration: '3 Hours',
      price: 200,
      description: 'Paint correction (One stage) (2 Hours)'
    },
    {
      id: 'two-stage',
      name: 'Two Stage Paint Correction Polish',
      duration: '5 Hours',
      price: 380,
      description: 'Paint correction (Two stage) (180 min)'
    },
    {
      id: 'three-stage',
      name: 'Three Stage Paint Correction Polish',
      duration: '7 Hours',
      price: 560,
      description: 'Paint correction (Three stage) (240 min)'
    },
    {
      id: 'four-stage',
      name: 'Four Stage Paint Correction Polish',
      duration: '8-12 Hours',
      price: 740,
      description: 'Paint correction (Four stage) (300 min)'
    }
  ];

  const vehicleTypes = [
    { id: 'coupe', name: 'Coupe (2 doors) size car', icon: <Car className="w-8 h-8" /> },
    { id: 'sedan', name: 'Sedan (4 doors)', icon: <Car className="w-8 h-8" /> },
    { id: 'compact-suv', name: 'Compact Small SUV', icon: <Truck className="w-8 h-8" /> },
    { id: 'large-suv', name: 'Large SUV/Van/Truck', icon: <Truck className="w-8 h-8" /> }
  ];

  const addOnOptions = [
    { id: 'wax', name: 'WAX', duration: '0min', price: 40 },
    { id: 'paint-sealant', name: 'Paint Sealant Wax', duration: '0min', price: 50 }
  ];

  const timeSlots = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'];

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dateObj = {
        date: date,
        dateStr: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        monthName: date.toLocaleDateString('en-US', { month: 'short' }),
        displayText: `${date.toLocaleDateString('en-US', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`
      };
      
      dates.push(dateObj);
    }
    return dates;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddOnToggle = (addOnId) => {
    setFormData(prev => ({
      ...prev,
      addOns: prev.addOns.includes(addOnId)
        ? prev.addOns.filter(id => id !== addOnId)
        : [...prev.addOns, addOnId]
    }));
  };

  const calculateTotal = () => {
    const packagePrice = washPackages.find(pkg => pkg.id === formData.washPackage)?.price || 0;
    const addOnPrice = formData.addOns.reduce((total, addOnId) => {
      const addOn = addOnOptions.find(opt => opt.id === addOnId);
      return total + (addOn?.price || 0);
    }, 0);
    return packagePrice + addOnPrice;
  };

  const isFormValid = () => {
    return formData.vehicleType && formData.washPackage && formData.selectedDate && 
           formData.selectedTime && formData.firstName && formData.lastName && 
           formData.email && formData.phone && formData.vehicleMake;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1393c4] mb-4">Paint Polishing Service Booking</h1>
          <p className="text-gray-600">Complete your paint polishing service booking below</p>
        </div>

        {/* Summary Card - Fixed at top */}
        {(formData.vehicleType || formData.washPackage || formData.selectedDate || formData.selectedTime) && (
          <div className="bg-[#1393c4] rounded-xl shadow-lg p-6 mb-8 text-white">
            <h3 className="text-xl font-bold mb-4 text-center">Booking Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-sm text-white/80 mb-1">Vehicle</div>
                <div className="font-semibold">
                  {formData.vehicleType ? vehicleTypes.find(v => v.id === formData.vehicleType)?.name : 'Not selected'}
                </div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-sm text-white/80 mb-1">Package</div>
                <div className="font-semibold">
                  {formData.washPackage ? washPackages.find(p => p.id === formData.washPackage)?.name : 'Not selected'}
                </div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-sm text-white/80 mb-1">Date & Time</div>
                <div className="font-semibold">
                  {formData.selectedDate && formData.selectedTime ? `${formData.selectedDate} at ${formData.selectedTime}` : 'Not selected'}
                </div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-sm text-white/80 mb-1">Total Price</div>
                <div className="font-bold text-xl">{calculateTotal()}.00 CAD</div>
              </div>
            </div>
          </div>
        )}

        {/* All sections in one scrollable form */}
        <div className="space-y-12">
          
          {/* Section 1: Vehicle Type */}
          <div className="bg-[#1393c4] rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Car className="w-8 h-8 text-white" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">1. VEHICLE TYPE</h2>
              </div>
              <p className="text-white">Select vehicle type below.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vehicleTypes.map((vehicle) => (
                <button
                  key={vehicle.id}
                  onClick={() => handleInputChange('vehicleType', vehicle.id)}
                  className={`p-6 rounded-lg border-2 transition-all duration-200 text-left ${
                    formData.vehicleType === vehicle.id
                      ? 'border-white bg-white/20 text-white'
                      : 'border-white/30 hover:border-white/70 text-white/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-white">{vehicle.icon}</div>
                      <span className="font-medium">{vehicle.name}</span>
                    </div>
                    {formData.vehicleType === vehicle.id && (
                      <Check className="w-6 h-6 text-white" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Packages */}
          <div className="bg-[#1393c4] rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <CreditCard className="w-8 h-8 text-white" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">2. WASH PACKAGES</h2>
              </div>
              <p className="text-white">Which wash is best for your vehicle?</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {washPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`border-2 rounded-lg p-6 bg-white transition-all duration-200 ${
                    formData.washPackage === pkg.id
                      ? 'border-white shadow-lg'
                      : 'border-white/30 hover:border-white/70'
                  }`}
                >
                  <div className="text-center mb-4">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{pkg.name}</h3>
                    <div className="text-4xl font-bold text-[#1393c4] mb-2">
                      {pkg.price}<span className="text-sm">CAD</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
                  </div>
                  <button
                    onClick={() => handleInputChange('washPackage', pkg.id)}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                      formData.washPackage === pkg.id
                        ? 'bg-[#1393c4] text-white'
                        : 'border-2 border-[#1393c4] text-[#1393c4] hover:bg-[#1393c4] hover:text-white'
                    }`}
                  >
                    {formData.washPackage === pkg.id ? 'Selected' : 'Book Now'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Add-ons */}
          <div className="bg-[#1393c4] rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <MapPin className="w-8 h-8 text-white" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">3. ADD-ON OPTIONS</h2>
              </div>
              <p className="text-white">Add services to your package (optional).</p>
            </div>
            <div className="space-y-4">
              {addOnOptions.map((addOn) => (
                <div key={addOn.id} className="flex items-center justify-between p-4 border-2 border-white/30 rounded-lg bg-white">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{addOn.name}</h3>
                    <p className="text-sm text-gray-600">{addOn.duration}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-bold text-[#1393c4]">{addOn.price}.00 CAD</span>
                    <button
                      onClick={() => handleAddOnToggle(addOn.id)}
                      className={`py-2 px-6 rounded-lg font-medium transition-all duration-200 ${
                        formData.addOns.includes(addOn.id)
                          ? 'bg-[#1393c4] text-white'
                          : 'border-2 border-[#1393c4] text-[#1393c4] hover:bg-[#1393c4] hover:text-white'
                      }`}
                    >
                      {formData.addOns.includes(addOn.id) ? 'Selected' : 'Select'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Date & Time */}
          <div className="bg-[#1393c4] rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Calendar className="w-8 h-8 text-white" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">4. SELECT DATE AND TIME</h2>
              </div>
              <p className="text-white">Click on any date and time to make a booking.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg text-white mb-4">Select Date</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                  {generateDates().slice(0, 21).map((dateObj) => {
                    if (!dateObj || !dateObj.dayNumber || !dateObj.displayText) {
                      return null;
                    }
                    
                    return (
                      <button
                        key={dateObj.dateStr}
                        onClick={() => handleInputChange('selectedDate', dateObj.displayText)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          formData.selectedDate === dateObj.displayText
                            ? 'border-white bg-white/20 text-white'
                            : 'border-white/30 hover:border-white/70 text-white/80 hover:text-white'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-xs font-medium">{dateObj.monthName}</div>
                          <div className="text-lg font-bold">{dateObj.dayNumber}</div>
                          <div className="text-xs">{dateObj.dayName}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg text-white mb-4">Select Time</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleInputChange('selectedTime', time)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        formData.selectedTime === time
                          ? 'border-white bg-white/20 text-white'
                          : 'border-white/30 hover:border-white/70 text-white/80 hover:text-white'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Contact Information */}
          <div className="bg-[#1393c4] rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <User className="w-8 h-8 text-white" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">5. CONTACT INFORMATION</h2>
              </div>
              <p className="text-white">Please provide us with your contact information.</p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="First name *"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full p-3 border-2 border-white/30 rounded-lg focus:border-white focus:outline-none bg-white/10 text-white placeholder-white/60"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name *"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full p-3 border-2 border-white/30 rounded-lg focus:border-white focus:outline-none bg-white/10 text-white placeholder-white/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                    <input
                      type="email"
                      placeholder="Your E-mail *"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-10 p-3 border-2 border-white/30 rounded-lg focus:border-white focus:outline-none bg-white/10 text-white placeholder-white/60"
                    />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full pl-10 p-3 border-2 border-white/30 rounded-lg focus:border-white focus:outline-none bg-white/10 text-white placeholder-white/60"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="relative">
                  <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <input
                    type="text"
                    placeholder="Vehicle Make and Model *"
                    value={formData.vehicleMake}
                    onChange={(e) => handleInputChange('vehicleMake', e.target.value)}
                    className="w-full pl-10 p-3 border-2 border-white/30 rounded-lg focus:border-white focus:outline-none bg-white/10 text-white placeholder-white/60"
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-white/60" />
                  <textarea
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows="4"
                    className="w-full pl-10 p-3 border-2 border-white/30 rounded-lg focus:border-white focus:outline-none resize-none bg-white/10 text-white placeholder-white/60"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            We will confirm your appointment with you by phone or e-mail within 24 hours of receiving your request. 
            Vehicle pick up will be the next day for services scheduled later in the day.
          </p>
          <button
            onClick={handleFormSubmit}
            disabled={!isFormValid()}
            className={`px-12 py-4 rounded-lg font-medium text-lg transition-all duration-200 ${
              isFormValid()
                ? 'bg-[#1393c4] text-white hover:bg-[#1393c4]/90'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaintPolishingForm;