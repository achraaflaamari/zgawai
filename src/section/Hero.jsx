import { Router, useRouter } from 'next/router'
import React, { useReducer } from 'react'

function Hero() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/#Live Check'); // or an external link like 'https://example.com'
  };
  return (
    <div id="Hero" className="relative py-24 overflow-hidden  grid justify-center items-end-safe h-screen">
        <div className="absolute inset-0 top-0 z-0">
          <img 
            src="https://readdy.ai/api/search-image?query=Industrial%20workers%20in%20a%20modern%20factory%20wearing%20safety%20gear%20including%20helmets%20and%20gloves%2C%20with%20machinery%20in%20the%20background.%20The%20image%20has%20a%20professional%2C%20clean%20aesthetic%20with%20blue%20tones%20and%20soft%20lighting%2C%20showing%20a%20safe%20working%20environment%20with%20high-tech%20equipment&width=1440&height=600&seq=1&orientation=landscape" 
            alt="Industrial workers with safety gear" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-[#1A365D] opacity-70"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Real-Time Safety Compliance with AI
            </h1>
            <p className="mt-6 text-xl text-gray-200 max-w-3xl">
              Enhance workplace safety with our AI-powered system that monitors safety gear compliance in real-time, protecting your team and preventing accidents before they happen.
            </p>
            <div className="mt-10">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("Live Check")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-[#FF7F27] rounded-2xl hover:bg-[#e06c1c] text-white text-lg font-medium py-3 px-8 hover:cursor-none shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 whitespace-nowrap "
              >
                Start Live Check
              </button>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <i className="fas fa-chevron-down text-white text-2xl"></i>
          </div>
        </div>
      </div>
  )
}

export default Hero