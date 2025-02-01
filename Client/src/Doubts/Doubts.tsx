import React, { useState } from 'react';
import { Send, HelpCircle, CheckCircle2 } from 'lucide-react';

const DoubtSolver = () => {
  const [question, setQuestion] = useState('');
  const [subject, setSubject] = useState('programming');

  const subjects = [
    { id: 'programming', name: 'Programming' },
    { id: 'mathematics', name: 'Mathematics' },
    { id: 'science', name: 'Science' },
    { id: 'language', name: 'Language' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle question submission
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600">
            <div className="flex items-center space-x-3">
              <HelpCircle className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white">Doubt Solver</h1>
            </div>
            <p className="mt-2 text-purple-100">
              Get detailed explanations for any academic question
            </p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Subject
                </label>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {subjects.map((subj) => (
                    <button
                      key={subj.id}
                      type="button"
                      className={`p-4 rounded-lg border ${
                        subject === subj.id
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-purple-500 hover:bg-purple-50'
                      } transition-colors duration-200`}
                      onClick={() => setSubject(subj.id)}
                    >
                      {subj.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-700">
                  Your Question
                </label>
                <div className="mt-2">
                  <textarea
                    id="question"
                    rows={4}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Type your question here..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Get Solution
                </button>
              </div>
            </form>

            {/* Sample solved doubt */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 text-green-600 mb-4">
                <CheckCircle2 className="h-6 w-6" />
                <h3 className="text-lg font-semibold">Sample Solution</h3>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-600">
                  Solution here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoubtSolver;