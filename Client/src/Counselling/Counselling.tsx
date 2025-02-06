import React, { useState } from "react";
import axios from "axios";
import { Sparkles, Target, BookOpen, Briefcase, Loader2 } from "lucide-react";

const API_KEY = import.meta.env.VITE_API_KEY;

const Counselling = () => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [answers, setAnswers] = useState({ interests: "", strengths: "", goals: "" });
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const topics = [
    {
      id: "career",
      icon: <Briefcase className="h-6 w-6" />,
      title: "Career Guidance",
      description: "Get personalized career path recommendations",
    },
    {
      id: "skills",
      icon: <Target className="h-6 w-6" />,
      title: "Skill Development",
      description: "Learn which skills to focus on",
    },
    {
      id: "education",
      icon: <BookOpen className="h-6 w-6" />,
      title: "Education Planning",
      description: "Plan your academic journey",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!selectedTopic) {
      setError("Please select a topic first.");
      return;
    }
    setLoading(true);
    setError("");
    setResponse("");

    try {
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `Topic: ${selectedTopic}\n\nInterests: ${answers.interests}\nStrengths: ${answers.strengths}\nGoals: ${answers.goals}\n\nBased on this, provide personalized guidance.`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.9,
          maxOutputTokens: 1024,
        },
      };

      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`,
        requestBody,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.candidates && res.data.candidates[0]) {
        setResponse(res.data.candidates[0].content.parts[0].text);
      } else {
        throw new Error("No response generated");
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || "Error generating guidance. Please try again.");
      console.error("API Error:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-indigo-400">AI Career Counselor</h1>
          </div>
          <p className="text-xl text-purple-100">Get personalized guidance for your career and educational journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              className={`p-6 rounded-xl shadow-sm transition-all duration-200 ${
                selectedTopic === topic.id ? "bg-indigo-600 transform scale-105" : "bg-indigo-800 hover:shadow-md hover:scale-105"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`mb-4 ${selectedTopic === topic.id ? "text-black" : "text-indigo-300"}`}>{topic.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
                <p className="text-sm text-gray-300">{topic.description}</p>
              </div>
            </button>
          ))}
        </div>

        {selectedTopic && (
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-6">Tell us more about your goals</h2>
            <div className="space-y-6">
              {["interests", "strengths", "goals"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {field === "interests" ? "What are your current interests?" : field === "strengths" ? "What are your strengths?" : "Where do you see yourself in 5 years?"}
                  </label>
                  <textarea
                    name={field}
                    value={(answers as any)[field]}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-gray-600 bg-gray-900 focus:ring-indigo-500 focus:border-indigo-500 p-3 text-white"
                    rows={3}
                    placeholder="Type your response here..."
                  />
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={20} /> Generating...
                    </>
                  ) : (
                    "Get Personalized Guidance"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {response && (
          <div className="mt-8 p-6 bg-gray-700 rounded-xl">
            <h3 className="text-xl font-medium mb-4 text-white">AI Response:</h3>
            <p className="text-gray-300">{response}</p>
          </div>
        )}

        {error && <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200">{error}</div>}
      </div>
    </div>
  );
};

export default Counselling;
