import React, { useState, useEffect } from 'react';
import { Video, MessageSquare, Brain, Users, ChevronUp } from 'lucide-react';

const Home = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      // Show button when user is near bottom of page
      const nearBottom = 
        window.innerHeight + window.scrollY >= 
        document.documentElement.scrollHeight - 100;
      setShowScrollTop(nearBottom);
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-900">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/6325984/pexels-photo-6325984.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '600px'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-200 mb-6 mt-10">
            Transform Your Learning Journey
          </h1>
          <p className="text-xl text-gray-200 mb-8 mt-10">
            Connect with expert mentors, leverage AI-powered learning, and achieve your goals faster.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => window.location.href = '/connect'}
              className="mt-24 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-indigo-600 bg-gray-200 hover:bg-gray-300"
            >
              Find a Mentor
            </button>
            <button
              onClick={() => window.location.href = '/signup'}
              className=" mt-24 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-500 transition-all duration-300 animate-bounce"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6 text-white" />
        </button>
      )}

      {/* Features Section */}
      <div id="features" className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">
              Everything you need to succeed
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Video className="h-8 w-8 text-indigo-600" />}
              title="Video Mentoring"
              description="Connect face-to-face with mentors through high-quality video calls"
            />
            <FeatureCard
              icon={<MessageSquare className="h-8 w-8 text-indigo-600" />}
              title="AI Chat Assistant"
              description="Get instant answers and guidance from our AI chatbot"
            />
            <FeatureCard
              icon={<Brain className="h-8 w-8 text-indigo-600" />}
              title="Doubt Solver"
              description="Clear your doubts with AI-powered explanations and solutions"
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-indigo-600" />}
              title="AI Counselor"
              description="Receive personalized career and learning guidance"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-slate-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to start your learning journey?
            </h2>
            <p className="mt-4 text-lg leading-6 text-indigo-200">
              Join thousands of students and mentors already on the platform.
            </p>
            <button
              onClick={() => window.location.href = '/signup'}
              className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              Sign up now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home;