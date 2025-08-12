import { useState } from 'react';
import formImage from '../assets/images/form1.png';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        photo: null
    });

    const [isHovered, setIsHovered] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'photo' && files.length > 0) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Create a hidden form element for FormSubmit
        const formElement = document.createElement('form');
        formElement.action = 'https://formsubmit.co/actioncardetailing@gmail.com';
        formElement.method = 'POST';
        formElement.style.display = 'none';

        // Prepare form data for submission
        const submissionData = {
            'Name': formData.name,
            'Email': formData.email,
            'Phone': formData.phone,
            'Message': formData.message,
            '_subject': 'New Contact Form Submission - Action Car Detailing',
            '_replyto': formData.email,
            '_captcha': 'false',
            '_template': 'table'
        };

        // Add all form fields as hidden inputs
        Object.keys(submissionData).forEach(key => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = submissionData[key];
            formElement.appendChild(input);
        });

        // Handle file upload if photo is selected
        if (formData.photo) {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.name = 'attachment';
            fileInput.style.display = 'none';
            
            // Create a new FileList with the selected file
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(formData.photo);
            fileInput.files = dataTransfer.files;
            
            formElement.appendChild(fileInput);
        }

        // Append form to body and submit
        document.body.appendChild(formElement);
        formElement.submit();

        // Show success message
        alert('Thank you for your message! We will get back to you within 24 hours.');
        
        // Reset form data
        setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
            photo: null
        });
    };

    return (
        <div className="relative w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 overflow-hidden bg-white">
            <div className="container mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8 lg:gap-16">
                    {/* Left side content */}
                    <div className="w-full lg:w-1/2 text-left">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6" style={{color: '#1393c4'}}>
                            We are Certified and Authorized
                        </h2>
                        <p className="text-sm sm:text-base mb-4 sm:mb-6" style={{color: '#1393c4', opacity: 0.8}}>
                            Action Car Detailing Inc., one of Winnipeg's most reputable detailing companies with over 14 years in the
                            business. When it comes to trusting your vehicles in the right hands, look no further than guys with the most experience.
                        </p>

                        <div className="mb-4 sm:mb-6">
                            <p className="text-sm sm:text-base font-medium" style={{color: '#1393c4'}}>1380 Sargent avenue,</p>
                            <p className="text-sm sm:text-base font-medium" style={{color: '#1393c4'}}>Winnipeg,</p>
                            <p className="text-sm sm:text-base font-medium" style={{color: '#1393c4'}}>MB, R3E 0G5</p>
                            <p className="text-sm sm:text-base font-medium" style={{color: '#1393c4'}}>(Appointment Only)</p>
                        </div>

                        <div className="mb-4 sm:mb-6">
                            <p className="text-base sm:text-lg font-semibold" style={{color: '#1393c4'}}>(204) 775-0005</p>
                            <a
                                href="mailto:info@actioncardetailing.ca"
                                className="text-sm sm:text-base transition duration-300"
                                style={{color: '#1393c4'}}
                                onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                                onMouseLeave={(e) => e.target.style.opacity = '1'}
                            >
                                info@actioncardetailing.ca
                            </a>
                        </div>
                        <div className="mt-6 sm:mt-8 hidden lg:block">
                            <img
                                src={formImage}
                                alt="Car detailing service"
                                className="max-w-full rounded-lg shadow-lg"
                            />
                        </div>
                    </div>

                    {/* Right side form */}
                    <div className="w-full lg:w-1/2 bg-gray-50 bg-opacity-90 backdrop-blur-sm rounded-xl shadow-xl p-4 sm:p-6 md:p-8 mt-6 lg:mt-0">
                        <div onSubmit={handleSubmit}>
                            <div className="mb-3 sm:mb-4">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                    required
                                    className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition duration-300"
                                    style={{focusRingColor: '#1393c4'}}
                                    onFocus={(e) => e.target.style.borderColor = '#1393c4'}
                                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                />
                            </div>

                            <div className="mb-3 sm:mb-4">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    required
                                    className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition duration-300"
                                    onFocus={(e) => e.target.style.borderColor = '#1393c4'}
                                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                />
                            </div>

                            <div className="mb-3 sm:mb-4">
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone"
                                    required
                                    className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition duration-300"
                                    onFocus={(e) => e.target.style.borderColor = '#1393c4'}
                                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                />
                            </div>

                            <div className="mb-3 sm:mb-4">
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Message"
                                    rows="4"
                                    required
                                    className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition duration-300"
                                    onFocus={(e) => e.target.style.borderColor = '#1393c4'}
                                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                ></textarea>
                            </div>

                            <div className="mb-4 sm:mb-6">
                                <p className="mb-1 sm:mb-2 text-sm sm:text-base" style={{color: '#1393c4'}}>Attach a Photo</p>
                                <input
                                    type="file"
                                    name="photo"
                                    onChange={handleChange}
                                    accept="image/*"
                                    className="w-full p-1 sm:p-2 text-sm sm:text-base border border-gray-300 rounded-lg file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-md file:border-0 file:text-white file:text-sm sm:file:text-base transition duration-300"
                                    style={{
                                        '--file-bg': '#1393c4',
                                        '--file-hover-bg': '#0f7ba8'
                                    }}
                                    onMouseEnter={(e) => e.target.querySelector('::file-selector-button')?.style.setProperty('background-color', '#0f7ba8')}
                                />
                                <style jsx>{`
                                    input[type="file"]::file-selector-button {
                                        background-color: #1393c4;
                                    }
                                    input[type="file"]::file-selector-button:hover {
                                        background-color: #0f7ba8;
                                    }
                                `}</style>
                            </div>

                            <button
                                type="button"
                                onClick={handleSubmit}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                className="w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base text-white text-center cursor-pointer transition-all duration-500 ease-in-out transform"
                                style={{
                                    backgroundColor: isHovered ? '#0f7ba8' : '#1393c4',
                                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                                    boxShadow: isHovered ? '0 10px 25px rgba(19, 147, 196, 0.3)' : 'none'
                                }}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>

                {/* Image for mobile view */}
                <div className="mt-8 sm:mt-10 md:mt-12 lg:hidden">
                    <img
                        src={formImage}
                        alt="Car detailing service"
                        className="max-w-full h-auto rounded-lg shadow-lg mx-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default ContactForm;