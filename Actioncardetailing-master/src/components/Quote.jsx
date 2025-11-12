import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, Car, Calendar, MessageSquare, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';

const Quote = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    makeModel: '',
    message: ''
  });

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blockedDates, setBlockedDates] = useState({});

  // Load blocked dates from Firebase
  useEffect(() => {
    loadBlockedDates();
  }, []);

  const loadBlockedDates = async () => {
    try {
      const q = query(collection(db, 'blockedDates'));
      const querySnapshot = await getDocs(q);
      const dates = {};
      querySnapshot.forEach((doc) => {
        dates[doc.id] = doc.data();
      });
      setBlockedDates(dates);
    } catch (error) {
      console.error('Error loading blocked dates:', error);
    }
  };

  // Check if a specific date is blocked
  const isDateBlocked = (day) => {
    if (!day) return false;
    const dateString = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const blockInfo = blockedDates[dateString];
    
    if (!blockInfo) return false;
    
    // If it's a full block, the date is blocked
    if (blockInfo.type === 'full') return true;
    
    // If it's a partial block, check if all time slots are blocked
    if (blockInfo.type === 'partial' && blockInfo.blockedSlots) {
      return blockInfo.blockedSlots.length === timeSlots.length;
    }
    
    return false;
  };

  // Check if a specific time slot is blocked
  const isTimeSlotBlocked = (time) => {
    if (!selectedDate) return false;
    
    // Convert selectedDate to YYYY-MM-DD format
    const dateParts = selectedDate.split(' ');
    const monthIndex = months.indexOf(dateParts[0]);
    const day = parseInt(dateParts[1].replace(',', ''));
    const year = parseInt(dateParts[2]);
    const dateString = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    const blockInfo = blockedDates[dateString];
    
    if (!blockInfo) return false;
    
    // If it's a full block, all time slots are blocked
    if (blockInfo.type === 'full') {
      return true;
    }
    
    // If it's a partial block, check if this specific time slot is blocked
    if (blockInfo.type === 'partial' && blockInfo.blockedSlots) {
      const isBlocked = blockInfo.blockedSlots.includes(time);
      return isBlocked;
    }
    
    return false;
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateSelect = (day) => {
    if (day && !isPastDate(day) && !isDateBlocked(day)) {
      const selected = `${months[currentMonth.getMonth()]} ${day}, ${currentMonth.getFullYear()}`;
      setSelectedDate(selected);
      setSelectedTime('');
    }
  };

  const handleTimeSelect = (time) => {
    if (!isTimeSlotBlocked(time)) {
      setSelectedTime(time);
    }
  };

  // Generate quote ID like "QUOTEA1B2C3"
  const generateQuoteId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'QUOTE';
    // Add 6 characters (mix of letters and numbers)
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // FIXED: Send only ONE email to the customer with the new format
  const sendEmail = async (quoteId) => {
    const emailFormData = new FormData(); // Changed variable name to avoid conflict
    
    emailFormData.append('access_key', 'ba99ae3b-60cc-404c-b207-2a42e86aafb6');
    emailFormData.append('autoresponse', 'false'); // Prevent auto-replies
    emailFormData.append('subject', `Quote Request Received – Confirmation Pending`);
    emailFormData.append('from_name', 'Action Car Detailing');
    emailFormData.append('email', formData.email); // Send to customer only
    emailFormData.append('reply_to', 'actioncardetailing@gmail.com');

    // Single email with the desired format
    emailFormData.append('message', `
✅ ACTION CAR DETAILING – AUTOMATED QUOTE REQUEST CONFIRMATION

Subject: Quote Request Received – Confirmation Pending

Dear ${formData.name},

Thank you for requesting a quote from Action Car Detailing!

We have successfully received your quote request. Our team will review your vehicle details and get back to you within 24 hours with a customized quote.

QUOTE SUMMARY

Quote ID: ${quoteId}
Status: Pending Review

CUSTOMER INFORMATION

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

VEHICLE INFORMATION

Make/Model: ${formData.makeModel}

PREFERRED APPOINTMENT

${selectedDate && selectedTime ? `${selectedDate} at ${selectedTime}` : 'No preferred time selected'}

ADDITIONAL MESSAGE

${formData.message || 'No additional message provided'}

IMPORTANT INFORMATION

• We will review your quote request within 24 hours
• You'll receive a customized quote based on your vehicle details
• We'll include available appointment times that work for your schedule
• Contact us if you need to modify your request

CONTACT DETAILS

Email: actioncardetailing@gmail.com
Phone: (204) 775-0005
Quote Reference: ${quoteId}

Thank you for considering Action Car Detailing!
We look forward to serving you.

Best regards,
Action Car Detailing Team
Passion for Detail
    `);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: emailFormData
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('Web3Forms API error:', data);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid) {
      alert('❌ Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const quoteId = generateQuoteId();

      // Send only ONE email to the customer
      const emailResult = await sendEmail(quoteId);

      if (emailResult.success) {
        alert(`✅ Quote Request Submitted Successfully!\n\nYour Quote ID: ${quoteId}\n\nThank you for your interest! We'll review your information and get back to you within 24 hours with a customized quote.\n\nConfirmation email has been sent to: ${formData.email}`);
        
        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          makeModel: '',
          message: ''
        });
        setSelectedDate('');
        setSelectedTime('');

      } else {
        throw new Error('Email sending failed');
      }
    } catch (error) {
      console.error('Error submitting quote request:', error);
      alert('❌ Submission Error\n\nThere was an error submitting your request. Please try again or contact us directly at actioncardetailing@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.phone && formData.email && formData.makeModel;

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
            <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#1393c4]" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1393c4]">GET YOUR QUOTE</h1>
          </div>
          <p className="text-[#1393c4] text-sm sm:text-base md:text-lg">Fill out the form below to receive a customized quote.</p>
        </div>

        {/* Contact Information Section */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200 mb-6 sm:mb-8">
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1393c4] mb-2 sm:mb-4">1. CONTACT INFORMATION</h2>
            <p className="text-[#1393c4] text-sm sm:text-base">Please provide your contact details.</p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6">
            {/* Name Field */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-[#1393c4] mb-1 sm:mb-2">Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full pl-9 sm:pl-10 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-[#1393c4] mb-1 sm:mb-2">Phone *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your phone number"
                  className="w-full pl-9 sm:pl-10 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-[#1393c4] mb-1 sm:mb-2">Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email address"
                  className="w-full pl-9 sm:pl-10 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent"
                />
              </div>
            </div>

            {/* Make and Model Field */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-[#1393c4] mb-1 sm:mb-2">Vehicle Make and Model *</label>
              <div className="relative">
                <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type="text"
                  name="makeModel"
                  value={formData.makeModel}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Toyota Camry 2020"
                  className="w-full pl-9 sm:pl-10 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent"
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-[#1393c4] mb-1 sm:mb-2">Additional Message</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Tell us about the services you're interested in or any specific requirements..."
                  className="w-full pl-9 sm:pl-10 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Date and Time Section */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200 mb-6 sm:mb-8">
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1393c4] mb-2 sm:mb-4">2. PREFERRED DATE AND TIME</h2>
            <p className="text-[#1393c4] text-sm sm:text-base">Choose your preferred appointment time (optional).</p>
          </div>

          <div className="bg-gray-50 rounded-lg sm:rounded-xl border-2 border-gray-200 p-3 sm:p-4 md:p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
              <div className="text-base sm:text-lg md:text-xl font-semibold text-[#1393c4]">
                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </div>
              <div className="flex space-x-1 sm:space-x-2">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                  className="p-1 sm:p-2 md:p-3 hover:bg-gray-100 rounded-lg text-[#1393c4] transition-colors duration-200"
                >
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                  className="p-1 sm:p-2 md:p-3 hover:bg-gray-100 rounded-lg text-[#1393c4] transition-colors duration-200"
                >
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-3 sm:mb-4">
              {daysOfWeek.map(day => (
                <div key={day} className="text-center text-xs font-medium text-[#1393c4] py-1 sm:py-2 bg-gray-100 rounded">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 mb-4 sm:mb-6 md:mb-8">
              {getDaysInMonth(currentMonth).map((day, index) => {
                const isSelected = selectedDate === `${months[currentMonth.getMonth()]} ${day}, ${currentMonth.getFullYear()}`;
                const isBlocked = isDateBlocked(day);
                const isPast = isPastDate(day);
                
                return (
                  <button
                    key={index}
                    onClick={() => day && handleDateSelect(day)}
                    disabled={!day || isPast || isBlocked}
                    className={`h-6 sm:h-7 md:h-8 lg:h-10 w-full rounded text-xs font-medium transition-colors duration-200 ${
                      !day
                        ? 'cursor-default'
                        : isPast || isBlocked
                        ? 'text-gray-300 cursor-not-allowed bg-gray-50'
                        : isSelected
                        ? 'bg-[#1393c4] text-white font-bold'
                        : isToday(day)
                        ? 'bg-blue-100 text-[#1393c4] border border-[#1393c4]'
                        : 'hover:bg-blue-50 text-[#1393c4] border border-gray-200 hover:border-[#1393c4]'
                    } ${isBlocked && day ? 'line-through' : ''}`}
                    title={isBlocked ? 'This date is blocked' : ''}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {selectedDate && (
              <div className="border-t border-gray-200 pt-3 sm:pt-4 md:pt-6">
                <div className="text-center mb-3 sm:mb-4">
                  <p className="text-[#1393c4] font-semibold text-sm sm:text-base md:text-lg">Selected: {selectedDate}</p>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#1393c4] mb-3 sm:mb-4 text-center">Available Times</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1 sm:gap-2">
                  {timeSlots.map(time => {
                    const isBlocked = isTimeSlotBlocked(time);
                    return (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        disabled={isBlocked}
                        className={`py-1 sm:py-2 px-1 sm:px-2 text-xs font-medium rounded border transition-colors duration-200 ${
                          isBlocked
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                            : selectedTime === time
                            ? 'bg-[#1393c4] text-white border-[#1393c4]'
                            : 'bg-white text-[#1393c4] border-[#1393c4] hover:bg-blue-50'
                        }`}
                        title={isBlocked ? 'This time slot is blocked' : ''}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-6 sm:mt-8 md:mt-12">
          <p className="text-xs sm:text-sm text-[#1393c4] mb-3 sm:mb-4 leading-relaxed">
            We will review your quote request and get back to you within 24 hours with a customized quote.
          </p>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className={`px-6 sm:px-8 md:px-12 py-2 sm:py-3 md:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
              isFormValid && !isSubmitting
                ? 'bg-[#1393c4] hover:bg-[#0d7aa1] text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Get My Quote'}
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2">
            📞 Need immediate assistance? Call us at (204) 775-0005
          </p>
          <p className="text-gray-500 text-xs">
            * Required fields
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quote;
