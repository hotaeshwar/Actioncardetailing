import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, Droplets, Flame, Shield, Bug, Car, X, ChevronLeft, ChevronRight, ChevronDown, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { pdf, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import References from '../components/Reference1';
import VideoCarousel from '../components/VideoCarousel';
import insuranceLogo from '../assets/images/insurance.png';
import heroBackground from '../assets/images/car6.png';
import actionCarLogo from '../assets/images/action car logo.png';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 20,
    borderRadius: 5,
    borderBottom: '2px solid #1393c4'
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 15
  },
  headerTextContainer: {
    flex: 1
  },
  headerText: {
    color: '#1393c4',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4
  },
  subHeader: {
    color: '#1393c4',
    fontSize: 10,
    opacity: 0.8
  },
  claimId: {
    backgroundColor: '#1393c4',
    color: '#FFFFFF',
    padding: 10,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 20,
    borderRadius: 3
  },
  section: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
    borderLeft: '3px solid #1393c4'
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1393c4',
    marginBottom: 8,
    borderBottom: '1px solid #1393c4',
    paddingBottom: 3
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  gridItem: {
    width: '50%',
    marginBottom: 6
  },
  label: {
    fontSize: 8,
    color: '#1393c4',
    fontWeight: 'bold',
    marginBottom: 2
  },
  value: {
    fontSize: 8,
    color: '#333333'
  },
  notes: {
    backgroundColor: '#fff3cd',
    borderLeft: '3px solid #ffc107',
    padding: 8,
    marginTop: 12,
    borderRadius: 3
  },
  notesText: {
    fontSize: 7,
    color: '#856404'
  },
  footer: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
    borderRadius: 5,
    borderTop: '2px solid #1393c4'
  },
  footerText: {
    fontSize: 7,
    color: '#666666',
    marginBottom: 2
  },
  contactInfo: {
    color: '#1393c4',
    fontWeight: 'bold'
  },
  list: {
    marginLeft: 10,
    marginTop: 3
  },
  listItem: {
    fontSize: 7,
    marginBottom: 2
  }
});

// PDF Document Component for Remediation Claims
const RemediationPDF = ({ 
  claimId, 
  formData, 
  selectedDate, 
  selectedTime 
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header with Logo */}
      <View style={styles.header}>
        <Image
          src={actionCarLogo}
          style={styles.logo}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>ACTION CAR DETAILING</Text>
          <Text style={styles.subHeader}>MPI Remediation Services</Text>
        </View>
      </View>

      {/* Claim ID */}
      <View style={styles.claimId}>
        <Text>MPI REMEDIATION CLAIM - {claimId}</Text>
      </View>

      {/* Claim Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Claim Summary</Text>
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Claim Reference:</Text>
            <Text style={styles.value}>{claimId}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Service Type:</Text>
            <Text style={styles.value}>MPI Remediation Claim</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Appointment Date:</Text>
            <Text style={styles.value}>{selectedDate || 'N/A'}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Appointment Time:</Text>
            <Text style={styles.value}>{selectedTime || 'N/A'}</Text>
          </View>
        </View>
      </View>

      {/* Customer Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer Information</Text>
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Full Name:</Text>
            <Text style={styles.value}>{formData.name || 'N/A'}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{formData.email || 'N/A'}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{formData.phone || 'N/A'}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>MPI Claim Number:</Text>
            <Text style={styles.value}>{formData.mpiClaimNo || 'N/A'}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>MPI Service Centre:</Text>
            <Text style={styles.value}>{formData.mpiServiceCentre || 'N/A'}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Vehicle Make/Model:</Text>
            <Text style={styles.value}>{formData.vehicleMakeModel || 'N/A'}</Text>
          </View>
        </View>
      </View>

      {/* Service Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service Details</Text>
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Preferred Appointment:</Text>
            <Text style={styles.value}>{formData.preferredAppointment || 'N/A'}</Text>
          </View>
        </View>
        {formData.message && formData.message !== 'Tell us if your vehicle is driveable, if any other damage you have noticed' && (
          <View style={{ marginTop: 8 }}>
            <Text style={styles.label}>Additional Information:</Text>
            <Text style={styles.value}>{formData.message}</Text>
          </View>
        )}
      </View>

      {/* Important Notes */}
      <View style={styles.notes}>
        <Text style={[styles.label, { color: '#856404' }]}>Important Notes:</Text>
        <View style={styles.list}>
          <Text style={styles.notesText}>• We will contact you within 24 hours to confirm your MPI remediation claim</Text>
          <Text style={styles.notesText}>• Please have your MPI claim number and vehicle available for inspection</Text>
          <Text style={styles.notesText}>• Bring all MPI documentation to your appointment</Text>
          <Text style={styles.notesText}>• Contact us if you need to reschedule or have any questions</Text>
          <Text style={styles.notesText}>• Please bring this confirmation to your appointment</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Thank you for choosing <Text style={styles.contactInfo}>Action Car Detailing</Text> for your MPI remediation needs</Text>
        <Text style={styles.footerText}>Email: <Text style={styles.contactInfo}>actioncardetailing@gmail.com</Text></Text>
        <Text style={styles.footerText}>Claim Reference: <Text style={styles.contactInfo}>{claimId}</Text></Text>
        <Text style={styles.footerText}>Generated on: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</Text>
      </View>
    </Page>
  </Document>
);

const RemediationClaim = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blockedDates, setBlockedDates] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    mpiClaimNo: '',
    mpiServiceCentre: '',
    vehicleMakeModel: '',
    preferredAppointment: '',
    message: 'Tell us if your vehicle is driveable, if any other damage you have noticed'
  });

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
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
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

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
      elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100 && rect.bottom > 0;
        
        if (isVisible) {
          setVisibleElements(prev => new Set([...prev, element.dataset.index]));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial visibility
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const timeSlots = [
    '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', 
    '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', 
    '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7;

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
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isPastDate = (day) => {
    if (!day) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return checkDate < today;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handlePrevYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
  };

  const handleNextYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
  };

  const handleDateSelect = (day) => {
    if (day && !isPastDate(day) && !isDateBlocked(day)) {
      const selected = `${months[currentDate.getMonth()]} ${day}, ${currentDate.getFullYear()}`;
      setSelectedDate(selected);
      if (selectedTime) {
        setFormData(prev => ({
          ...prev,
          preferredAppointment: `${selected} at ${selectedTime}`
        }));
        setShowDatePicker(false);
      }
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        preferredAppointment: `${selectedDate} at ${time}`
      }));
      setShowDatePicker(false);
    }
  };

  const services = [
    { 
      name: 'Rodent Remediation', 
      icon: Bug, 
      description: 'Professional removal and cleanup of rodent infestations',
      color: 'text-[#1393c4]'
    },
    { 
      name: 'Mold Remediation', 
      icon: AlertTriangle, 
      description: 'Safe mold removal and prevention solutions',
      color: 'text-[#1393c4]'
    },
    { 
      name: 'Vandalism Cleanup', 
      icon: Droplets, 
      description: 'Professional vandalism damage cleanup and restoration',
      color: 'text-[#1393c4]'
    },
    { 
      name: 'Water Damage Restoration', 
      icon: Droplets, 
      description: 'Complete water damage assessment and restoration',
      color: 'text-[#1393c4]'
    },
    { 
      name: 'Fire/Smoke Damage', 
      icon: Flame, 
      description: 'Fire and smoke damage cleanup and restoration',
      color: 'text-[#1393c4]'
    },
    { 
      name: 'Biohazard/Trauma Cleanup', 
      icon: Shield, 
      description: 'Specialized biohazard and trauma scene cleanup',
      color: 'text-[#1393c4]'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // FIXED: Generate shorter claim ID like "REMCLA1B2C3"
  const generateClaimId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'REMCL';
    // Add 6 characters (mix of letters and numbers)
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // FIXED: PDF generation with image handling
  const generateAndDownloadPDF = async (claimId) => {
    setIsGeneratingPDF(true);
    try {
      // Create the PDF document
      const pdfDoc = (
        <RemediationPDF
          claimId={claimId}
          formData={formData}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
        />
      );

      // Generate PDF as blob with error handling
      const blob = await pdf(pdfDoc).toBlob();
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `MPI-Remediation-Claim-${claimId}.pdf`;
      a.style.display = 'none';

      // Append to body and trigger download
      document.body.appendChild(a);
      a.click();

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);

      return true;

    } catch (error) {
      console.error('Error generating PDF:', error);
      
      // Fallback: Create a simple text file with image reference
      try {
        const fallbackContent = `
ACTION CAR DETAILING - MPI REMEDIATION CLAIM
============================================

Claim ID: ${claimId}
Service Type: MPI Remediation Claim
Appointment Date: ${selectedDate || 'N/A'}
Appointment Time: ${selectedTime || 'N/A'}

CUSTOMER INFORMATION
-------------------
Name: ${formData.name || 'N/A'}
Email: ${formData.email || 'N/A'}
Phone: ${formData.phone || 'N/A'}
MPI Claim Number: ${formData.mpiClaimNo || 'N/A'}
MPI Service Centre: ${formData.mpiServiceCentre || 'N/A'}
Vehicle Make/Model: ${formData.vehicleMakeModel || 'N/A'}
Preferred Appointment: ${formData.preferredAppointment || 'N/A'}
${formData.message ? `Additional Info: ${formData.message}` : ''}

IMPORTANT NOTES
---------------
• We will contact you within 24 hours to confirm your MPI remediation claim
• Please have your MPI claim number and vehicle available for inspection
• Bring all MPI documentation to your appointment
• Contact us if you need to reschedule or have any questions

Contact: actioncardetailing@gmail.com
Claim Reference: ${claimId}
Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
        `.trim();

        const blob = new Blob([fallbackContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `MPI-Remediation-Claim-${claimId}.txt`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 100);

        return false;
      } catch (fallbackError) {
        console.error('Error with fallback download:', fallbackError);
        return false;
      }
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // FIXED: Send only ONE email to the customer with the new format
  const sendEmail = async (claimId) => {
    const emailFormData = new FormData();
    
    emailFormData.append('access_key', 'ba99ae3b-60cc-404c-b207-2a42e86aafb6');
    emailFormData.append('autoresponse', 'false'); // Prevent auto-replies
    emailFormData.append('subject', `MPI Remediation Claim Received – Confirmation Pending`);
    emailFormData.append('from_name', 'Action Car Detailing');
    emailFormData.append('email', formData.email); // Send to customer only
    emailFormData.append('reply_to', 'actioncardetailing@gmail.com');

    // Single email with the desired format
    emailFormData.append('message', `
✅ ACTION CAR DETAILING – AUTOMATED MPI REMEDIATION CLAIM CONFIRMATION

Subject: MPI Remediation Claim Received – Confirmation Pending

Dear ${formData.name},

Thank you for submitting your MPI remediation claim with Action Car Detailing!

We have successfully received your MPI remediation claim request. Our team will review your information and contact you within 24 hours to confirm your appointment.

CLAIM SUMMARY

Claim ID: ${claimId}
Status: Pending Confirmation

CUSTOMER INFORMATION

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

MPI CLAIM DETAILS

MPI Claim Number: ${formData.mpiClaimNo || 'N/A'}
MPI Service Centre: ${formData.mpiServiceCentre || 'N/A'}
Vehicle Make/Model: ${formData.vehicleMakeModel || 'N/A'}

PREFERRED APPOINTMENT

${selectedDate && selectedTime ? `${selectedDate} at ${selectedTime}` : 'No preferred time selected'}

ADDITIONAL INFORMATION

${formData.message || 'No additional information provided'}

IMPORTANT INFORMATION

• We will contact you within 24 hours to confirm your MPI remediation claim
• Please have your MPI claim number and vehicle available for inspection
• Bring all MPI documentation to your appointment
• Contact us if you need to reschedule or have any questions
• Save this email for future reference

CONTACT DETAILS

Email: actioncardetailing@gmail.com
Phone: (204) 775-0005
Claim Reference: ${claimId}

Thank you for choosing Action Car Detailing for your MPI remediation needs!
We look forward to assisting you.

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.mpiClaimNo) {
      alert('Please fill in all required fields: Name, Email, Phone, and MPI Claim Number.');
      return;
    }

    setIsSubmitting(true);
    const claimId = generateClaimId();

    try {
      // Generate and download PDF first
      const pdfSuccess = await generateAndDownloadPDF(claimId);

      // FIXED: Send only ONE email to the customer
      const emailResult = await sendEmail(claimId);

      if (emailResult.success) {
        alert(`MPI claim submitted successfully!\n\nYour claim ID is: ${claimId}\n\nConfirmation email has been sent to: ${formData.email}\n\nWe will contact you within 24 hours to confirm your claim.`);
        
        // Reset form
        setIsFormOpen(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          mpiClaimNo: '',
          mpiServiceCentre: '',
          vehicleMakeModel: '',
          preferredAppointment: '',
          message: 'Tell us if your vehicle is driveable, if any other damage you have noticed'
        });
        setSelectedDate('');
        setSelectedTime('');
        setShowDatePicker(false);

      } else {
        throw new Error('Email sending failed');
      }
    } catch (error) {
      console.error('Error submitting MPI claim:', error);
      alert('There was an error submitting your MPI claim. Please try again or contact us directly at actioncardetailing@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .scroll-animate {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .scroll-animate-delay-1 {
          animation-delay: 0.1s;
        }
        
        .scroll-animate-delay-2 {
          animation-delay: 0.2s;
        }
        
        .scroll-animate-delay-3 {
          animation-delay: 0.3s;
        }
        
        .scroll-animate-delay-4 {
          animation-delay: 0.4s;
        }
        
        .scroll-animate-delay-5 {
          animation-delay: 0.5s;
        }
        
        .scroll-animate-delay-6 {
          animation-delay: 0.6s;
        }
        
        .scroll-animate-left {
          opacity: 0;
          animation: fadeInLeft 0.8s ease-out forwards;
        }
        
        .scroll-animate-right {
          opacity: 0;
          animation: fadeInRight 0.8s ease-out forwards;
        }
        
        .scroll-animate-scale {
          opacity: 0;
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        /* Scroll reveal animations */
        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.4s ease-out;
        }
        
        .scroll-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .scroll-reveal-left {
          opacity: 0;
          transform: translateX(-30px);
          transition: all 0.4s ease-out;
        }
        
        .scroll-reveal-left.visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .scroll-reveal-right {
          opacity: 0;
          transform: translateX(30px);
          transition: all 0.4s ease-out;
        }
        
        .scroll-reveal-right.visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .scroll-reveal-scale {
          opacity: 0;
          transform: scale(0.95);
          transition: all 0.4s ease-out;
        }
        
        .scroll-reveal-scale.visible {
          opacity: 1;
          transform: scale(1);
        }
        
        /* Staggered delays for service cards - reduced delays */
        .scroll-reveal[data-index="service-1"].visible { transition-delay: 0.05s; }
        .scroll-reveal[data-index="service-2"].visible { transition-delay: 0.1s; }
        .scroll-reveal[data-index="service-3"].visible { transition-delay: 0.15s; }
        .scroll-reveal[data-index="service-4"].visible { transition-delay: 0.2s; }
        .scroll-reveal[data-index="service-5"].visible { transition-delay: 0.25s; }
        .scroll-reveal[data-index="service-6"].visible { transition-delay: 0.3s; }
      `}</style>

      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#1393c4] rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
              <img 
                src={insuranceLogo} 
                alt="Insurance Logo" 
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
              />
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg">
            MANITOBA PUBLIC INSURANCE
          </h1>
          <div className="h-1 sm:h-2 w-20 sm:w-24 md:w-32 bg-[#1393c4] mx-auto rounded-full shadow-lg mb-6 sm:mb-8"></div>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="bg-[#1393c4] hover:bg-[#0f7ba3] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Open Enquiry Form
          </button>
        </div>
      </section>

      <div className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 sm:mb-16 scroll-reveal ${visibleElements.has('services-header') ? 'visible' : ''}`} data-index="services-header">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1393c4] mb-4">
              Our Services
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#1393c4] mx-auto mb-4 sm:mb-6"></div>
            <p className="text-lg sm:text-xl text-[#1393c4] max-w-3xl mx-auto px-4">
              Professional remediation services backed by MPI accreditation and ICAR training
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const dataIndex = `service-${index + 1}`;
              return (
                <div 
                  key={index}
                  className={`group bg-gradient-to-br from-blue-50 to-[#1393c4]/10 rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-gradient-to-br hover:from-[#1393c4]/10 hover:to-[#1393c4]/20 hover:-translate-y-2 border border-[#1393c4]/20 scroll-reveal ${visibleElements.has(dataIndex) ? 'visible' : ''}`}
                  data-index={dataIndex}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#1393c4] mb-4 sm:mb-6 transition-all duration-300 group-hover:bg-[#0f7ba3] shadow-lg`}>
                    <IconComponent className={`w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[#1393c4] group-hover:text-[#0f7ba3] transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <VideoCarousel />

      <div className="bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 scroll-reveal ${visibleElements.has('mpi-header') ? 'visible' : ''}`} data-index="mpi-header">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1393c4] mb-4">
              MPI Remediation Claims
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#1393c4] mx-auto mb-6"></div>
            <p className="text-lg sm:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              We specialize in handling Manitoba Public Insurance remediation claims with expertise and professionalism. 
              Our certified technicians provide comprehensive solutions for all types of vehicle contamination and damage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 scroll-reveal-left ${visibleElements.has('mpi-content-left') ? 'visible' : ''}`} data-index="mpi-content-left">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-[#1393c4] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-[#1393c4] mb-2">MPI Accredited Services</h3>
                  <p className="text-gray-600">Fully certified and approved by Manitoba Public Insurance for all remediation work.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-[#1393c4] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-[#1393c4] mb-2">ICAR Trained Technicians</h3>
                  <p className="text-gray-600">Our team is trained to industry standards with the latest remediation techniques.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-[#1393c4] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-[#1393c4] mb-2">Comprehensive Solutions</h3>
                  <p className="text-gray-600">From rodent damage to biohazard cleanup, we handle all types of remediation claims.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-[#1393c4] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-[#1393c4] mb-2">Fast Processing</h3>
                  <p className="text-gray-600">Quick turnaround times to get your vehicle back on the road as soon as possible.</p>
                </div>
              </div>
            </div>

            <div className={`bg-white rounded-2xl p-8 shadow-xl border border-[#1393c4]/20 scroll-reveal-right ${visibleElements.has('mpi-form') ? 'visible' : ''}`} data-index="mpi-form">
              <div className="text-center mb-6">
                <Car className="w-16 h-16 text-[#1393c4] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#1393c4] mb-4">MPI Remediation Enquiry Form</h3>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-[#1393c4] font-semibold mb-2 text-sm sm:text-base">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent text-sm sm:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#1393c4] font-semibold mb-2 text-sm sm:text-base">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent text-sm sm:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#1393c4] font-semibold mb-2 text-sm sm:text-base">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent text-sm sm:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#1393c4] font-semibold mb-2 text-sm sm:text-base">MPI Claim no: *</label>
                  <input
                    type="text"
                    name="mpiClaimNo"
                    value={formData.mpiClaimNo}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent text-sm sm:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#1393c4] font-semibold mb-2 text-sm sm:text-base">MPI Service Centre:</label>
                  <input
                    type="text"
                    name="mpiServiceCentre"
                    value={formData.mpiServiceCentre}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-[#1393c4] font-semibold mb-2 text-sm sm:text-base">Vehicle Make/Model</label>
                  <input
                    type="text"
                    name="vehicleMakeModel"
                    value={formData.vehicleMakeModel}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-[#1393c4] font-semibold mb-2 text-sm sm:text-base">Preferred Appointment date/time</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="preferredAppointment"
                      value={formData.preferredAppointment}
                      onClick={() => setShowDatePicker(!showDatePicker)}
                      readOnly
                      placeholder="Click to select date and time"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent text-sm sm:text-base cursor-pointer"
                    />
                    
                    {showDatePicker && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-2xl z-50 w-full sm:w-96">
                        <div className="p-4 border-b border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <button onClick={handlePrevYear} className="p-1 hover:bg-gray-100 rounded transition-colors">
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-gray-700">{currentDate.getFullYear()}</span>
                            </div>
                            <button onClick={handleNextYear} className="p-1 hover:bg-gray-100 rounded transition-colors">
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded transition-colors">
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="font-semibold text-gray-700">
                              {months[currentDate.getMonth()]}
                            </span>
                            <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded transition-colors">
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex">
                          <div className="p-4 flex-1">
                            <div className="grid grid-cols-7 gap-1 mb-2">
                              {daysOfWeek.map(day => (
                                <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                                  {day}
                                </div>
                              ))}
                            </div>
                            
                            <div className="grid grid-cols-7 gap-1">
                              {getDaysInMonth(currentDate).map((day, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleDateSelect(day)}
                                  disabled={!day || isPastDate(day) || isDateBlocked(day)}
                                  className={`
                                    w-8 h-8 text-sm rounded-full flex items-center justify-center transition-colors
                                    ${!day ? 'invisible' : ''}
                                    ${isPastDate(day) || isDateBlocked(day) ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-[#1393c4]/20 hover:text-[#1393c4]'}
                                    ${isToday(day) ? 'bg-[#1393c4] text-white font-bold' : 'text-gray-700'}
                                    ${selectedDate.includes(`${day}`) && selectedDate.includes(months[currentDate.getMonth()]) ? 'bg-[#1393c4]/80 text-white font-bold' : ''}
                                    ${isDateBlocked(day) ? 'line-through' : ''}
                                  `}
                                  title={isDateBlocked(day) ? 'This date is blocked' : ''}
                                >
                                  {day}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="border-l border-gray-200 w-24">
                            <div className="p-2 border-b border-gray-200">
                              <div className="text-xs font-medium text-gray-500 text-center">Time</div>
                            </div>
                            <div className="max-h-48 overflow-y-auto">
                              {timeSlots.map(time => {
                                const isBlocked = isTimeSlotBlocked(time);
                                return (
                                  <button
                                    key={time}
                                    onClick={() => handleTimeSelect(time)}
                                    disabled={isBlocked}
                                    className={`w-full px-2 py-1 text-xs text-left hover:bg-[#1393c4]/20 hover:text-[#1393c4] border-b border-gray-100 transition-colors ${
                                      selectedTime === time ? 'bg-[#1393c4]/20 text-[#1393c4] font-medium' : ''
                                    } ${isBlocked ? 'text-gray-400 cursor-not-allowed line-through' : ''}`}
                                    title={isBlocked ? 'This time slot is blocked' : ''}
                                  >
                                    {time}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[#1393c4] font-semibold mb-2 text-sm sm:text-base">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent resize-none text-sm sm:text-base"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || isGeneratingPDF}
                  className="w-full bg-[#1393c4] hover:bg-[#0f7ba3] text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-base"
                >
                  {isSubmitting ? 'Submitting...' : isGeneratingPDF ? 'Generating PDF...' : 'Submit MPI Claim'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`scroll-reveal ${visibleElements.has('contact-section') ? 'visible' : ''}`} data-index="contact-section">
        <ContactForm />
      </div>

      <div className={`scroll-reveal ${visibleElements.has('references-section') ? 'visible' : ''}`} data-index="references-section">
        <References />
      </div>

      <Footer />

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1393c4]">Enquiry Form</h2>
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors p-2"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-[#1393c4] font-semibold mb-2 text-sm sm:text-base">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent text-sm sm:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#1393c4] font-semibold mb-2 text-sm sm:text-base">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent text-sm sm:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#1393c4] font-semibold mb-2 text-sm sm:text-base">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent text-sm sm:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#1393c4] font-semibold mb-2 text-sm sm:text-base">MPI Claim no: *</label>
                  <input
                    type="text"
                    name="mpiClaimNo"
                    value={formData.mpiClaimNo}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent text-sm sm:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#1393c4] font-semibold mb-2 text-sm sm:text-base">MPI Service Centre:</label>
                  <input
                    type="text"
                    name="mpiServiceCentre"
                    value={formData.mpiServiceCentre}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-[#1393c4] font-semibold mb-2 text-sm sm:text-base">Vehicle Make/Model</label>
                  <input
                    type="text"
                    name="vehicleMakeModel"
                    value={formData.vehicleMakeModel}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-[#1393c4] font-semibold mb-2 text-sm sm:text-base">Preferred Appointment date/time</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="preferredAppointment"
                      value={formData.preferredAppointment}
                      onClick={() => setShowDatePicker(!showDatePicker)}
                      readOnly
                      placeholder="Click to select date and time"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent text-sm sm:text-base cursor-pointer"
                    />
                    
                    {showDatePicker && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-2xl z-50 w-full sm:w-96">
                        <div className="p-4 border-b border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <button onClick={handlePrevYear} className="p-1 hover:bg-gray-100 rounded transition-colors">
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-gray-700">{currentDate.getFullYear()}</span>
                            </div>
                            <button onClick={handleNextYear} className="p-1 hover:bg-gray-100 rounded transition-colors">
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded transition-colors">
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="font-semibold text-gray-700">
                              {months[currentDate.getMonth()]}
                            </span>
                            <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded transition-colors">
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex">
                          <div className="p-4 flex-1">
                            <div className="grid grid-cols-7 gap-1 mb-2">
                              {daysOfWeek.map(day => (
                                <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                                  {day}
                                </div>
                              ))}
                            </div>
                            
                            <div className="grid grid-cols-7 gap-1">
                              {getDaysInMonth(currentDate).map((day, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleDateSelect(day)}
                                  disabled={!day || isPastDate(day) || isDateBlocked(day)}
                                  className={`
                                    w-8 h-8 text-sm rounded-full flex items-center justify-center transition-colors
                                    ${!day ? 'invisible' : ''}
                                    ${isPastDate(day) || isDateBlocked(day) ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-[#1393c4]/20 hover:text-[#1393c4]'}
                                    ${isToday(day) ? 'bg-[#1393c4] text-white font-bold' : 'text-gray-700'}
                                    ${selectedDate.includes(`${day}`) && selectedDate.includes(months[currentDate.getMonth()]) ? 'bg-[#1393c4]/80 text-white font-bold' : ''}
                                    ${isDateBlocked(day) ? 'line-through' : ''}
                                  `}
                                  title={isDateBlocked(day) ? 'This date is blocked' : ''}
                                >
                                  {day}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="border-l border-gray-200 w-24">
                            <div className="p-2 border-b border-gray-200">
                              <div className="text-xs font-medium text-gray-500 text-center">Time</div>
                            </div>
                            <div className="max-h-48 overflow-y-auto">
                              {timeSlots.map(time => {
                                const isBlocked = isTimeSlotBlocked(time);
                                return (
                                  <button
                                    key={time}
                                    onClick={() => handleTimeSelect(time)}
                                    disabled={isBlocked}
                                    className={`w-full px-2 py-1 text-xs text-left hover:bg-[#1393c4]/20 hover:text-[#1393c4] border-b border-gray-100 transition-colors ${
                                      selectedTime === time ? 'bg-[#1393c4]/20 text-[#1393c4] font-medium' : ''
                                    } ${isBlocked ? 'text-gray-400 cursor-not-allowed line-through' : ''}`}
                                    title={isBlocked ? 'This time slot is blocked' : ''}
                                  >
                                    {time}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[#1393c4] font-semibold mb-2 text-sm sm:text-base">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent resize-none text-sm sm:text-base"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || isGeneratingPDF}
                  className="w-full bg-[#1393c4] hover:bg-[#0f7ba3] text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
                >
                  {isSubmitting ? 'Submitting...' : isGeneratingPDF ? 'Generating PDF...' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RemediationClaim;
