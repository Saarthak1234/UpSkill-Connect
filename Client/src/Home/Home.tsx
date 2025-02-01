import React from 'react';
import { Link } from 'react-router-dom';
import { Video, MessageSquare, Brain, Users } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Transform Your Learning Journey
          </h1>
          <p className="text-xl text-indigo-100 mb-8">
            Connect with expert mentors, leverage AI-powered learning, and achieve your goals faster.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/connect"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              Find a Mentor
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
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
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to start your learning journey?
            </h2>
            <p className="mt-4 text-lg leading-6 text-indigo-200">
              Join thousands of students and mentors already on the platform.
            </p>
            <Link
              to="/signup"
              className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              Sign up now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home;