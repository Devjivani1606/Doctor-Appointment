import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaHeart,
  FaHospital,
  FaClock,
  FaLock,
  FaUserMd,
  FaEye,
  FaStar,
  FaArrowRight,
  FaHandshake,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaBuilding,
  FaBullseye
} from 'react-icons/fa';
import Footer from '../components/Footer';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      
      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-24 md:py-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full" />
          
          {/* Floating Particles */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-300 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
          <div className="absolute top-40 right-32 w-3 h-3 bg-white/30 rounded-full animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-cyan-300/50 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8">
              <FaHeart className="w-4 h-4 text-cyan-300" />
              <span className="text-sm font-medium">Trusted Healthcare Partner Since 2024</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-yellow-300">HealthCare Pro</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto">
              Your Journey to Better Health Starts Here
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="text-center group cursor-pointer">
                <div className="text-4xl md:text-5xl font-bold text-cyan-300 group-hover:scale-110 transition-transform duration-300">50K+</div>
                <div className="text-white/70 mt-1">Happy Patients</div>
              </div>
              <div className="hidden md:block w-px h-16 bg-white/20" />
              <div className="text-center group cursor-pointer">
                <div className="text-4xl md:text-5xl font-bold text-cyan-300 group-hover:scale-110 transition-transform duration-300">1K+</div>
                <div className="text-white/70 mt-1">Expert Doctors</div>
              </div>
              <div className="hidden md:block w-px h-16 bg-white/20" />
              <div className="text-center group cursor-pointer">
                <div className="text-4xl md:text-5xl font-bold text-cyan-300 group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-white/70 mt-1">Support Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" fillOpacity="0.1"/>
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-600 rounded-full px-4 py-2 mb-6">
                <FaHandshake className="w-4 h-4" />
                <span className="text-sm font-semibold">Our Commitment to Care</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Connecting You With{' '}
                <span className="text-blue-600">Unrivaled Quality</span> Care
              </h2>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                "We bridge the gap between patients and healthcare professionals through our innovative platform, making medical appointments accessible, convenient, and reliable for everyone."
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/all-doctors')}
                  className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1"
                >
                  Book an Appointment
                  <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="inline-flex items-center justify-center gap-3 border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Content - Image Grid */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative">
                {/* Main Image */}
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=700&fit=crop"
                    alt="Professional Healthcare"
                    className="w-full h-[400px] md:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/50 to-transparent" />
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-4 -right-4 md:top-8 md:-right-8 bg-white rounded-2xl shadow-xl p-4 z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <FaStar className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">4.9 Rating</div>
                      <div className="text-sm text-gray-500">2,500+ Reviews</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 md:bottom-8 md:-left-8 bg-white rounded-2xl shadow-xl p-4 z-20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <FaCheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Easy Booking</div>
                      <div className="text-sm text-gray-500">Instant Confirm</div>
                    </div>
                  </div>
                </div>

                {/* Background Decoration */}
                <div className="absolute -z-10 top-10 -right-10 w-full h-full bg-gradient-to-br from-cyan-300/20 to-blue-600/20 rounded-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Beliefs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The foundation of HealthCare Pro's service</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mission Card */}
            <div className="group relative bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/10 to-transparent rounded-bl-full" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FaBullseye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  We connect patients with healthcare professionals through our seamless platform, making medical appointments simple and <span className="font-semibold text-blue-600">accessible for everyone</span>.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-300/20 to-transparent rounded-bl-full" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-300 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaEye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To revolutionize healthcare access through technology, making <span className="font-semibold text-cyan-600">quality medical care</span> just a click away for patients worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-blue-600">HealthCare Pro?</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Experience healthcare like never before</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2 cursor-pointer">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaBuilding className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Booking</h3>
              <p className="text-gray-600">Quick, seamless, and hassle-free appointments</p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2 cursor-pointer">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaUserMd className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Doctors</h3>
              <p className="text-gray-600">Access to highly qualified professionals</p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2 cursor-pointer">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaClock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Availability</h3>
              <p className="text-gray-600">Round the clock support at your fingertips</p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2 cursor-pointer">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaLock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Data Security</h3>
              <p className="text-gray-600">Your privacy is our highest priority</p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">A Snapshot of Our Platform</h2>
              <p className="text-white/70">Discover what makes us different</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h4 className="font-bold text-lg mb-2">📅 Founded in 2024</h4>
                  <p className="text-white/80">Established with a vision to streamline healthcare accessibility and eliminate long waiting times.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h4 className="font-bold text-lg mb-2">✨ Our Values</h4>
                  <p className="text-white/80">Driven by Integrity, Innovation, and Patient-Centricity. Committed to transparency and ethics.</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h4 className="font-bold text-lg mb-4">What We Offer:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">Intuitive Doctor Search by specialization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">Real-time availability & Instant Booking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">Secure Patient Record Management</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">Verified Doctor Feedback & Ratings</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
     <section className="py-20">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mb-6">
            <FaHandshake className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get in Touch <span className="text-gray-500 text-xl font-normal">(Ready to Connect?)</span>
          </h2>

          <p className="text-gray-600 max-w-xl mx-auto">
            Our dedicated team is always available to answer your questions and assist with any partnerships or support you may need.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          
          <a
            href="mailto:support@healthcare.com"
            className="group flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
              <FaEnvelope className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
            <p className="text-gray-600 text-sm">support@healthcare.com</p>
          </a>

          <a
            href="tel:+919876543210"
            className="group flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-500 transition-colors duration-300">
              <FaPhone className="w-6 h-6 text-green-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
            <p className="text-gray-600 text-sm">+91 9876 543 210</p>
          </a>

          <div className="group flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-500 transition-colors duration-300">
              <FaMapMarkerAlt className="w-6 h-6 text-red-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Location</h4>
            <p className="text-gray-600 text-sm">Healthcare Avenue, Medical City</p>
          </div>
        </div>

        <p className="text-center text-gray-500 mt-8">
          Our goal is to deliver the best possible healthcare experience for you.
        </p>

      </div>
    </div>
  </div>
</section>


      {/* <Footer /> */}
    </div>
  );
};

export default AboutUs;