import React, { useState } from 'react';
import { Search, Filter, Star, Clock, Video } from 'lucide-react';

const Connect = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'programming', name: 'Programming' },
    { id: 'design', name: 'Design' },
    { id: 'business', name: 'Business' },
    { id: 'language', name: 'Language' },
  ];

  const mentors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      expertise: 'Full Stack Development',
      rating: 4.9,
      reviews: 128,
      hourlyRate: 75,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      expertise: 'Machine Learning',
      rating: 4.8,
      reviews: 93,
      hourlyRate: 90,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    },
    {
      id: 3,
      name: 'Emma Williams',
      expertise: 'UI/UX Design',
      rating: 4.7,
      reviews: 156,
      hourlyRate: 65,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Mentor</h1>
            <p className="mt-2 text-gray-600">
              Connect with expert mentors who can guide you on your journey
            </p>
          </div>
          
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search mentors..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
                    <p className="text-indigo-600">{mentor.expertise}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-yellow-400">
                      <Star className="h-5 w-5 fill-current" />
                      <span className="ml-2 text-gray-900">{mentor.rating}</span>
                      <span className="ml-1 text-gray-500">({mentor.reviews} reviews)</span>
                    </div>
                    <div className="text-gray-900 font-semibold">${mentor.hourlyRate}/hr</div>
                  </div>

                  <div className="flex items-center space-x-2 text-gray-500">
                    <Clock className="h-5 w-5" />
                    <span>Available next week</span>
                  </div>

                  <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-white bg-in digo-600 hover:bg-indigo-700">
                    <Video className="h-5 w-5 mr-2" />
                    Schedule Session
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Connect;