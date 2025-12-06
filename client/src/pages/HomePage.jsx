import React from 'react';
import { Link } from 'react-router-dom';
import doctorImg from '../assets/doctor.jpg';
import { 
  FaStar, FaSearch, FaArrowRight, FaUserMd, FaHeart, FaBolt,
  FaHeartbeat, FaBaby, FaBone, FaBrain, FaVenusMars, FaCheckCircle,
  FaHospital, FaUsers, FaThumbsUp, FaQuoteLeft, FaStethoscope
} from 'react-icons/fa';
import { MdSpa } from 'react-icons/md';
import { BiHappyHeartEyes } from 'react-icons/bi';


const HomePage = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-100 py-20 lg:py-28">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-sky-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-blue-300/30 to-cyan-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-cyan-200/20 to-sky-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full">
              <FaStar className="text-lg text-yellow-500" />
              <span className="text-sm font-medium text-blue-800">Trusted by 50,000+ patients</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Find & Book
              <span className="text-blue-600 block mt-2">Top Doctors</span>
              Near You
            </h1>
            
            <p className="text-lg text-gray-600 max-w-xl">
              Connect with verified healthcare professionals instantly. Book appointments, consult online, and get the care you deserve.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center space-x-2">
                <FaUserMd className="text-2xl text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">5,000+</p>
                  <p className="text-sm text-gray-600">Verified Doctors</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FaStethoscope className="text-2xl text-blue-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">50+</p>
                  <p className="text-sm text-gray-600">Specialties</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FaThumbsUp className="text-2xl text-purple-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">24/7</p>
                  <p className="text-sm text-gray-600">Support</p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-xl">
              <div className="flex items-center bg-white rounded-2xl shadow-xl p-2 border border-gray-200">
                <FaSearch className="text-lg ml-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for doctors, specialties, or conditions..."
                  className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-gray-900 placeholder:text-gray-400"
                />
                <Link
                  to="/all-doctors"
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all hover:-translate-y-0.5 font-medium whitespace-nowrap"
                >
                  <span>Search</span>
                  <FaArrowRight />
                </Link>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/all-doctors"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all hover:-translate-y-1 font-medium shadow-lg"
              >
                <span>Browse Doctors</span>
                <FaArrowRight />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 rounded-xl hover:border-blue-600 hover:shadow-md transition-all hover:-translate-y-1 font-medium"
              >
                <span>Learn More</span>
              </Link>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative lg:h-[600px] order-first lg:order-last">
            <div className="relative w-full h-[400px] lg:h-full rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-50/80 via-white/60 to-indigo-50/80 backdrop-blur-sm">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-transparent to-indigo-100/30"></div>
              
              {/* Main Doctor Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-blue-200/50 to-indigo-200/50 rounded-full blur-xl"></div>
                  <img 
                    src={doctorImg} 
                    alt="Professional Doctor" 
                    className="relative w-48 h-48 lg:w-72 lg:h-72 object-cover rounded-full shadow-2xl border-4 border-white/80 backdrop-blur-sm"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-transparent to-white/5 rounded-full"></div>
                </div>
              </div>
              
              {/* Floating Cards - Hidden on mobile */}
              <div className="hidden lg:block absolute top-4 -left-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 border border-gray-100 hover:shadow-3xl transition-all hover:-translate-y-2 hover:scale-105">
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                    <FaStar className="text-2xl text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">4.9 Rating</p>
                    <p className="text-sm text-gray-600">2,500+ Reviews</p>
                  </div>
                </div>
              </div>
              
              <div className="hidden lg:block absolute top-32 -right-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 border border-gray-100 hover:shadow-3xl transition-all hover:-translate-y-2 hover:scale-105">
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                    <FaCheckCircle className="text-2xl text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Easy Booking</p>
                    <p className="text-sm text-gray-600">Instant Confirm</p>
                  </div>
                </div>
              </div>
              
              <div className="hidden lg:block absolute bottom-32 -left-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 border border-gray-100 hover:shadow-3xl transition-all hover:-translate-y-2 hover:scale-105">
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg">
                    <FaStethoscope className="text-2xl text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Expert Care</p>
                    <p className="text-sm text-gray-600">Qualified Doctors</p>
                  </div>
                </div>
              </div>
              
              {/* Overlay Text */}
              <div className="absolute bottom-4 left-4 right-4 lg:bottom-8 lg:left-8 lg:right-8 text-center bg-white/90 backdrop-blur-sm rounded-2xl p-3 lg:p-4 shadow-xl">
                <p className="text-lg lg:text-xl font-bold text-gray-900">Professional Healthcare</p>
                <p className="text-sm lg:text-base text-gray-600">Trusted by thousands of patients</p>
              </div>
              

            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Patients Trust Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We connect you with the best healthcare professionals who are dedicated to your well-being and recovery
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <FaUserMd className="text-3xl text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Doctors</h3>
            <p className="text-gray-600 leading-relaxed">
              Our platform features only verified and experienced doctors with proven track records in their specialties. Each doctor is carefully vetted for their qualifications and patient care excellence.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
              <FaHeart className="text-3xl text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Compassionate Care</h3>
            <p className="text-gray-600 leading-relaxed">
              Every doctor on our platform is committed to providing compassionate, patient-centered care. They listen to your concerns and work with you to create the best treatment plan.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <FaBolt className="text-3xl text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick & Easy</h3>
            <p className="text-gray-600 leading-relaxed">
              Book appointments in just a few clicks. No long waiting times or complicated processes. Get the healthcare you need when you need it most.
            </p>
          </div>
        </div>
      </div>

      {/* Specialties Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Medical Specialties Available
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From general medicine to specialized treatments, find the right doctor for your specific health needs
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[
            { name: 'Cardiology', icon: FaHeartbeat, desc: 'Heart Care', color: 'text-red-500' },
            { name: 'Dermatology', icon: MdSpa, desc: 'Skin Care', color: 'text-pink-500' },
            { name: 'Pediatrics', icon: FaBaby, desc: 'Child Care', color: 'text-blue-500' },
            { name: 'Orthopedics', icon: FaBone, desc: 'Bone Care', color: 'text-gray-600' },
            { name: 'Neurology', icon: FaBrain, desc: 'Brain Care', color: 'text-purple-500' },
            { name: 'Gynecology', icon: FaVenusMars, desc: 'Women Care', color: 'text-pink-600' }
          ].map((specialty, index) => {
            const IconComponent = specialty.icon;
            return (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
                <IconComponent className={`text-4xl mb-3 mx-auto ${specialty.color}`} />
                <h4 className="font-bold text-gray-900 mb-1">{specialty.name}</h4>
                <p className="text-sm text-gray-600">{specialty.desc}</p>
              </div>
            );
          })}
        </div>
      </div>



      {/* Testimonial Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Patients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from real patients who found hope, healing, and exceptional care through our platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 text-xl space-x-1">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
            </div>
            <div className="mb-4">
              <FaQuoteLeft className="text-blue-300 text-2xl" />
            </div>
            <p className="text-gray-600 mb-6 italic">
              "The doctors here are not just skilled professionals, but truly caring individuals. They took time to understand my concerns and provided excellent treatment with a smile."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                S
              </div>
              <div className="ml-4">
                <p className="font-bold text-gray-900">Sarah Johnson</p>
                <p className="text-sm text-gray-600">Patient</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 text-xl space-x-1">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
            </div>
            <div className="mb-4">
              <FaQuoteLeft className="text-blue-300 text-2xl" />
            </div>
            <p className="text-gray-600 mb-6 italic">
              "Booking was so easy and the doctor was incredibly knowledgeable and compassionate. I felt heard and cared for throughout my entire treatment journey."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                M
              </div>
              <div className="ml-4">
                <p className="font-bold text-gray-900">Michael Chen</p>
                <p className="text-sm text-gray-600">Patient</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 text-xl space-x-1">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
            </div>
            <div className="mb-4">
              <FaQuoteLeft className="text-blue-300 text-2xl" />
            </div>
            <p className="text-gray-600 mb-6 italic">
              "The positive energy and expertise of the doctors here is amazing. They made me feel comfortable and confident about my treatment from day one."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="ml-4">
                <p className="font-bold text-gray-900">Aisha Patel</p>
                <p className="text-sm text-gray-600">Patient</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get answers to common questions about booking appointments and using our platform
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {[
            {
              question: "How do I book an appointment with a doctor?",
              answer: "Simply browse our list of verified doctors, select your preferred doctor, choose an available time slot, and confirm your booking. You'll receive instant confirmation."
            },
            {
              question: "Are all doctors on the platform verified?",
              answer: "Yes, all doctors on our platform are thoroughly verified. We check their qualifications, licenses, and experience to ensure you receive quality healthcare."
            },
            {
              question: "Can I cancel or reschedule my appointment?",
              answer: "Yes, you can cancel or reschedule your appointment through your patient dashboard. Please do so at least 2 hours before your scheduled appointment time."
            },
            {
              question: "What payment methods do you accept?",
              answer: "We accept all major credit cards, debit cards, and digital payment methods. Payment is processed securely after your appointment is confirmed."
            },
            {
              question: "Do you offer online consultations?",
              answer: "Yes, many of our doctors offer online video consultations. You can choose between in-person visits or online consultations when booking your appointment."
            },
            {
              question: "How do I become a doctor on this platform?",
              answer: "Doctors can apply by registering with their medical credentials. Our team will verify your qualifications and approve your profile within 2-3 business days."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-20">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-16 shadow-2xl border border-gray-100">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Your Healing Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who have found hope, healing, and exceptional care. Your health and well-being are our top priority.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/all-doctors"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all hover:-translate-y-1 font-medium shadow-lg text-lg"
            >
              <FaStethoscope />
              <span>Find Your Doctor</span>
              <FaArrowRight />
            </Link>
            <button
              onClick={() => {
                if (localStorage.getItem('token')) {
                  alert('You are already registered and logged in!');
                } else {
                  window.location.href = '/register';
                }
              }}
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-all hover:-translate-y-1 font-medium text-lg"
            >
              <FaUsers />
              <span>Join Today</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;