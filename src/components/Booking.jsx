import React, { useState } from 'react';
import { Car, Clock, Plus, Calendar, ShoppingCart, ChevronLeft, ChevronRight, Check, User, Mail, Phone, MessageSquare } from 'lucide-react';

const BookingForm = () => {
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookingData, setBookingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    vehicleMake: '',
    message: ''
  });

  const vehicleTypes = [
    { id: 'coupe', name: 'Coupe (2 doors) size car', icon: Car, selected: false },
    { id: 'sedan', name: 'Sedan (4 doors)', icon: Car, selected: false },
    { id: 'compact-suv', name: 'Compact Small SUV', icon: Car, selected: false },
    { id: 'large-suv', name: 'Large SUV/Van/Truck', icon: Car, selected: false }
  ];

  const washPackages = [
    {
      id: 'silver',
      name: 'Silver Package',
      duration: '5-6 Hours',
      price: 180,
      features: [
        'Interior Vacuum, Carpet and Seats Shampoo',
        'Interior panels Steam Clean & Polish',
        'Exterior Hand Wash',
        'Door jambs Wipe Down',
        'Windows Clean',
        'Trunk Vacuum',
        'Extra Charge for Pet Hairs Removal and Heavily soiled vehicles'
      ]
    },
    {
      id: 'gold',
      name: 'Gold Package',
      duration: '6-7 Hours',
      price: 250,
      features: [
        'Silver package plus Engine Shampoo',
        'Headliner Shampoo',
        'Hand Carnauba Wax',
        'Trunk Shampoo',
        'Complete interior and exterior detailing package',
        'Extra Charge for Pet Hairs Removal and Heavily soiled vehicles'
      ]
    },
    {
      id: 'diamond',
      name: 'Diamond Package',
      duration: '7-8 Hours',
      price: 390,
      features: [
        'Gold package plus Paint Decontamination wash',
        'Paint Clay bar treatment',
        'Tar removal',
        'Paint correction polish (One stage)',
        'Extra Charge for Pet Hairs Removal',
        'excessive tar removal and Heavily soiled vehicles'
      ]
    }
  ];

  const addOnOptions = [
    { id: 'pet-removal', name: 'Pet hairs removal', price: 0, duration: '30min' },
    { id: 'headlight', name: 'Headlights Restoration (30 min)', price: 80, duration: '30min' },
    { id: 'odor', name: 'Odor Elimination and sanitization (180 min)', price: 80, duration: '180min' },
    { id: 'fabric', name: 'Fabric protector (carpet and seats) (40 min)', price: 80, duration: '40min' },
    { id: 'decontamination', name: 'Decontamination Wash (30 min)', price: 30, duration: '30min' }
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const isToday = (day) => {
    if (!day) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isPastDate = (day) => {
    if (!day) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return checkDate < today;
  };

  const getTotalPrice = () => {
    const packagePrice = selectedPackage ? selectedPackage.price : 0;
    const addOnPrice = selectedAddOns.reduce((total, addon) => total + addon.price, 0);
    return packagePrice + addOnPrice;
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
  };

  const handleAddOnToggle = (addon) => {
    setSelectedAddOns(prev => {
      const exists = prev.find(item => item.id === addon.id);
      if (exists) {
        return prev.filter(item => item.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  const handleDateSelect = (day) => {
    if (day && !isPastDate(day)) {
      const selected = `${months[currentMonth.getMonth()]} ${day}, ${currentMonth.getFullYear()}`;
      setSelectedDate(selected);
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isFormValid = () => {
    return selectedVehicle && selectedPackage && selectedDate && selectedTime && 
           bookingData.firstName && bookingData.lastName && bookingData.email && 
           bookingData.phone && bookingData.vehicleMake;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      alert('Please fill in all required fields.');
      return;
    }

    const formElement = document.createElement('form');
    formElement.action = 'https://formsubmit.co/actioncardetailing@gmail.com';
    formElement.method = 'POST';
    formElement.style.display = 'none';

    const bookingSummary = {
      'Vehicle Type': selectedVehicle.name,
      'Package': selectedPackage.name,
      'Add-ons': selectedAddOns.map(addon => addon.name).join(', ') || 'None',
      'Appointment Date': selectedDate,
      'Appointment Time': selectedTime,
      'Total Price': `${getTotalPrice()}.00 CAD`,
      'First Name': bookingData.firstName,
      'Last Name': bookingData.lastName,
      'Email': bookingData.email,
      'Phone': bookingData.phone,
      'Vehicle Make/Model': bookingData.vehicleMake,
      'Message': bookingData.message,
      '_subject': 'New Car Wash Booking Request',
      '_replyto': bookingData.email,
      '_captcha': 'false'
    };

    Object.keys(bookingSummary).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = bookingSummary[key];
      formElement.appendChild(input);
    });

    document.body.appendChild(formElement);

    alert('Booking submitted successfully! We will confirm your appointment within 24 hours.');

    formElement.submit();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1393c4] mb-4">A La Carte Package Form</h1>
          <p className="text-gray-600">Complete your booking details below</p>
        </div>

        {/* Summary Card - Fixed at top */}
        {(selectedVehicle || selectedPackage || selectedDate || selectedTime) && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-[#1393c4]">
            <h3 className="text-xl font-bold text-[#1393c4] mb-4 text-center">Booking Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Vehicle</div>
                <div className="font-semibold text-[#1393c4]">
                  {selectedVehicle ? selectedVehicle.name : 'Not selected'}
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Package</div>
                <div className="font-semibold text-[#1393c4]">
                  {selectedPackage ? selectedPackage.name : 'Not selected'}
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Date & Time</div>
                <div className="font-semibold text-[#1393c4]">
                  {selectedDate && selectedTime ? `${selectedDate} at ${selectedTime}` : 'Not selected'}
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Total Price</div>
                <div className="font-bold text-xl text-[#1393c4]">{getTotalPrice()}.00 CAD</div>
              </div>
            </div>
          </div>
        )}

        {/* All sections in one scrollable form */}
        <div className="space-y-12">
          
          {/* Section 1: Vehicle Type */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1393c4] mb-4">1. VEHICLE TYPE</h2>
              <p className="text-gray-600">Select your vehicle type below.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {vehicleTypes.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => handleVehicleSelect(vehicle)}
                  className={`p-6 md:p-8 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${
                    selectedVehicle.id === vehicle.id
                      ? 'border-[#1393c4] bg-blue-50 text-[#1393c4]'
                      : 'border-[#1393c4] hover:border-[#0d7aa1] text-[#1393c4] hover:bg-blue-50'
                  }`}
                >
                  <div className="text-center">
                    <vehicle.icon className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-[#1393c4]" />
                    <h3 className="font-semibold text-sm sm:text-base md:text-lg">{vehicle.name}</h3>
                    {selectedVehicle.id === vehicle.id && (
                      <div className="mt-2">
                        <Check className="w-6 h-6 text-[#1393c4] mx-auto" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Packages */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1393c4] mb-4">2. WASH PACKAGES</h2>
              <p className="text-gray-600">Which wash is best for your vehicle?</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {washPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => handlePackageSelect(pkg)}
                  className={`bg-white rounded-xl border-2 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    selectedPackage?.id === pkg.id 
                      ? 'border-[#1393c4] bg-blue-50' 
                      : 'border-gray-200 hover:border-[#1393c4]'
                  }`}
                >
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-[#1393c4] mb-2">{pkg.name} ({pkg.duration})</h3>
                    <div className="text-3xl font-bold text-[#1393c4] mb-2">
                      {pkg.price}<span className="text-lg">.00 CAD</span>
                    </div>
                    {selectedPackage?.id === pkg.id && (
                      <Check className="w-6 h-6 text-[#1393c4] mx-auto" />
                    )}
                  </div>
                  <div className="space-y-2">
                    {pkg.features.map((feature, index) => (
                      <p key={index} className="text-sm text-gray-600 leading-relaxed">
                        {feature}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Add-ons */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1393c4] mb-4">3. ADD-ON OPTIONS</h2>
              <p className="text-gray-600">Add services to your package (optional).</p>
            </div>
            <div className="space-y-4">
              {addOnOptions.map((addon) => (
                <div
                  key={addon.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-[#1393c4] transition-colors duration-300"
                >
                  <div className="flex-1 mb-3 sm:mb-0">
                    <h3 className="font-semibold text-[#1393c4] text-lg mb-1">{addon.name}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {addon.duration}
                      </span>
                      <span className="font-semibold text-[#1393c4]">
                        {addon.price === 0 ? '0.00 CAD' : `${addon.price}.00 CAD`}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddOnToggle(addon)}
                    className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
                      selectedAddOns.find(item => item.id === addon.id)
                        ? 'bg-[#1393c4] text-white'
                        : 'border-2 border-[#1393c4] text-[#1393c4] hover:bg-[#1393c4] hover:text-white'
                    }`}
                  >
                    {selectedAddOns.find(item => item.id === addon.id) ? 'Selected' : 'Select'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Date & Time */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1393c4] mb-4">4. SELECT DATE AND TIME</h2>
              <p className="text-gray-600">Choose your preferred date and time.</p>
            </div>

            <div className="bg-gray-50 rounded-xl border-2 border-gray-200 p-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="text-2xl font-semibold text-[#1393c4]">
                  {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                    className="p-3 hover:bg-gray-100 rounded-lg text-[#1393c4] transition-colors duration-200"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                    className="p-3 hover:bg-gray-100 rounded-lg text-[#1393c4] transition-colors duration-200"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-4">
                {daysOfWeek.map(day => (
                  <div key={day} className="text-center text-sm font-medium text-[#1393c4] py-2 bg-gray-100 rounded">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2 mb-8">
                {getDaysInMonth(currentMonth).map((day, index) => {
                  const isSelected = selectedDate === `${months[currentMonth.getMonth()]} ${day}, ${currentMonth.getFullYear()}`;

                  return (
                    <button
                      key={index}
                      onClick={() => day && handleDateSelect(day)}
                      disabled={!day || isPastDate(day)}
                      className={`h-12 w-full rounded-lg text-sm font-medium transition-colors duration-200 ${
                        !day
                          ? 'cursor-default'
                          : isPastDate(day)
                          ? 'text-gray-300 cursor-not-allowed bg-gray-50'
                          : isSelected
                          ? 'bg-[#1393c4] text-white font-bold'
                          : isToday(day)
                          ? 'bg-blue-100 text-[#1393c4] border border-[#1393c4]'
                          : 'hover:bg-blue-50 text-[#1393c4] border border-gray-200 hover:border-[#1393c4]'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {selectedDate && (
                <div className="border-t border-gray-200 pt-6">
                  <div className="text-center mb-4">
                    <p className="text-[#1393c4] font-semibold text-lg">Selected: {selectedDate}</p>
                  </div>
                  <h3 className="text-xl font-semibold text-[#1393c4] mb-4 text-center">Available Times</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={`py-3 px-4 text-sm font-medium rounded-lg border-2 transition-colors duration-200 ${
                          selectedTime === time
                            ? 'bg-[#1393c4] text-white border-[#1393c4]'
                            : 'bg-white text-[#1393c4] border-[#1393c4] hover:bg-blue-50'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 5: Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1393c4] mb-4">5. CONTACT INFORMATION</h2>
              <p className="text-gray-600">Please provide your contact details.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#1393c4] mb-2">First name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={bookingData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1393c4] mb-2">Last name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={bookingData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1393c4] mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={bookingData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1393c4] mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#1393c4] mb-2">Vehicle Make and Model *</label>
                <input
                  type="text"
                  name="vehicleMake"
                  value={bookingData.vehicleMake}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#1393c4] mb-2">Message</label>
                <textarea
                  name="message"
                  value={bookingData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            We will confirm your appointment within 24 hours.
          </p>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className={`px-12 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
              isFormValid()
                ? 'bg-[#1393c4] hover:bg-[#0d7aa1] text-white'
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

export default BookingForm;