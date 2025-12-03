import React from 'react';
import { Link } from 'react-router-dom';
import doctorImg from '../assets/doctor.jpg';


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
              <span className="text-lg">⭐</span>
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
                <span className="text-2xl">✅</span>
                <div>
                  <p className="text-2xl font-bold text-gray-900">5,000+</p>
                  <p className="text-sm text-gray-600">Verified Doctors</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="text-2xl font-bold text-gray-900">50+</p>
                  <p className="text-sm text-gray-600">Specialties</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="text-2xl font-bold text-gray-900">24/7</p>
                  <p className="text-sm text-gray-600">Support</p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-xl">
              <div className="flex items-center bg-white rounded-2xl shadow-xl p-2 border border-gray-200">
                <span className="text-lg ml-3">🔍</span>
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
                  <span>→</span>
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
                <span>→</span>
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
              
              {/* Overlay Text */}
              <div className="absolute bottom-4 left-4 right-4 lg:bottom-8 lg:left-8 lg:right-8 text-center bg-white/90 backdrop-blur-sm rounded-2xl p-3 lg:p-4 shadow-xl">
                <p className="text-lg lg:text-xl font-bold text-gray-900">Professional Healthcare</p>
                <p className="text-sm lg:text-base text-gray-600">Trusted by thousands of patients</p>
              </div>
              
              {/* Floating Cards - Hidden on mobile */}
              <div className="hidden lg:block absolute top-4 -left-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 border border-gray-100 hover:shadow-3xl transition-all hover:-translate-y-2 hover:scale-105">
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">⭐</span>
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
                    <span className="text-2xl">✅</span>
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
                    <span className="text-2xl">🩺</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Expert Care</p>
                    <p className="text-sm text-gray-600">Qualified Doctors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
