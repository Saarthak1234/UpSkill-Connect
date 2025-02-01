import React, { useState } from 'react';
import { Sparkles, Target, BookOpen, Briefcase } from 'lucide-react';

const Counselling = () => {
  const [selectedTopic, setSelectedTopic] = useState('');

  const topics = [
    {
      id: 'career',
      icon: <Briefcase className="h-6 w-6" />,
      title: 'Career Guidance',
      description: 'Get personalized career path recommendations',
    },
    {
      id: 'skills',
      icon: <Target className="h-6 w-6" />,
      title: 'Skill Development',
      description: 'Learn which skills to focus on',
    },
    {
      id: 'education',
      icon: <BookOpen className="h-6 w-6" />,
      title: 'Education Planning',
      description: 'Plan your academic journey',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-indigo-400">AI Career Counselor</h1>
          </div>
          <p className="text-xl text-purple-100">
            Get personalized guidance for your career and educational journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              className={`p-6 rounded-xl shadow-sm transition-all duration-200 ${
                selectedTopic === topic.id
                  ? 'bg-customPurple text-black transform scale-105'
                  : 'bg-customPurple hover:shadow-md hover:scale-105'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`mb-4 ${
                    selectedTopic === topic.id ? 'text-black' : 'text-indigo-600'
                  }`}
                >
                  {topic.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
                <p className={`text-sm ${
                  selectedTopic === topic.id ? 'text-indigo-100' : 'text-gray-600'
                }`}>
                  {topic.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {selectedTopic && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Tell us more about your goals
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What are your current interests?
                  </label>
                  <textarea
                    className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    rows={4}
                    placeholder="Describe your interests, hobbies, and activities you enjoy..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What are your strengths?
                  </label>
                  <textarea
                    className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    rows={4}
                    placeholder="What skills or abilities do you think you're good at?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Where do you see yourself in 5 years?
                  </label>
                  <textarea
                    className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    rows={4}
                    placeholder="Describe your future goals and aspirations..."
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Get Personalized Guidance
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Counselling;