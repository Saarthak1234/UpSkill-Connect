// types.ts
interface GenerativeContent {
    parts: {
      text?: string;
      inlineData?: {
        mimeType: string;
        data: string;
      };
    }[];
  }
  
  interface GenerateContentRequest {
    contents: GenerativeContent[];
    generationConfig?: {
      temperature?: number;
      topK?: number;
      topP?: number;
      maxOutputTokens?: number;
    };
  }
  
  interface GenerateContentResponse {
    candidates: {
      content: {
        parts: {
          text: string;
        }[];
      };
    }[];
  }
  
  // Review.tsx
  import { useState } from "react";
  import axios from "axios";
  import { useDropzone } from "react-dropzone";
  import ReactMarkdown from "react-markdown";
  import { useNavigate } from "react-router-dom";
  import { Loader2 } from "lucide-react";
  import { motion } from "framer-motion";
  
  function Review() {
    const [file, setFile] = useState<File | null>(null);
    const [caption, setCaption] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const onDrop = (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0]);
      setCaption("");
      setError("");
    };
  
    const handleUpload = async () => {
      if (!file) {
        setError("Please select a file first.");
        return;
      }
  
      setLoading(true);
      setError("");
  
      try {
        const API_KEY ="AIzaSyDSnyL8nrq_GiZWJgqfam90rvxh0M7GG0U";
        console.log(API_KEY);
        // Convert image to base64
        const base64Image = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = reader.result as string;
            resolve(base64.split(",")[1]);
          };
          reader.readAsDataURL(file);
        });
  
        const requestBody: GenerateContentRequest = {
          contents: [
            {
              parts: [
                {
                  inlineData: {
                    mimeType: file.type,
                    data: base64Image,
                  },
                },
                {
                  text: "Medically analyze this image. If unrelated to the medical field or if no medicines are prescribed, respond with Invalid image.Also provide the response in a format which separates all the elements in the report. Suggest precautions in form of pointers based on the diagnosis if applicable.",
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.4,
            topK: 32,
            topP: 1,
            maxOutputTokens: 2048,
          },
        };
  
        const response = await axios.post<GenerateContentResponse>(
          `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`,
          requestBody,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.data.candidates && response.data.candidates[0]) {
          const generatedText = response.data.candidates[0].content.parts[0].text;
          setCaption(generatedText);
        } else {
          throw new Error("No response generated");
        }
      } catch (err: any) {
        setError(
          err.response?.data?.error?.message ||
            "Error generating review. Please try again."
        );
        console.error("API Error:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };
  
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: {
        "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
      },
      maxSize: 5 * 1024 * 1024, // 5MB
    });
  
    const switchToUserHome = () => {
      navigate("/userhome");
    };
  
    return (
      <div className="min-h-screen relative bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#000000,transparent)]" />
        <div className="relative z-10">
          <div className="container mx-auto ">
            <nav className="p-4 sm:p-6">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={switchToUserHome}
                className="cursor-pointer flex items-center text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent gap-2 sm:gap-3"
              >
                <img
                  src="/icons.webp"
                  alt="Logo"
                  className="w-10 h-10 sm:w-14 sm:h-14"
                />
                <span>medify.me</span>
              </motion.button>
            </nav>
            <div className="max-w-2xl mx-auto">
              <header className="text-center mb-12 flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold text-white inline-block">
                  Prescription Analayzer
                </h1>
              </header>
              
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-neutral-800 rounded-xl p-12 text-center cursor-pointer transition-all duration-300 hover:border-neutral-700 hover:bg-white/5 bg-black/20 backdrop-blur-sm shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 active:translate-y-2"
              >
                <input {...getInputProps()} />
                <p className="text-neutral-400">
                  {file
                    ? file.name
                    : "Drag & drop an image, or click to select one"}
                </p>
              </div>
  
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleUpload}
                  disabled={loading || !file}
                  className="px-12 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 disabled:opacity-50 disabled:hover:bg-neutral-900 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-all duration-300 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-lg">✨</span>
                      <span>Analyze</span>
                    </>
                  )}
                </button>
              </div>
  
              {caption && (
                <div className="mt-8 p-6 bg-neutral-900/50 rounded-xl border border-neutral-800 backdrop-blur-sm result-container">
                  <h3 className="text-xl font-medium mb-4 text-white text-center">
                    Result:
                  </h3>
                  <div className="prose prose-invert max-w-none text-white">
                    <ReactMarkdown>{caption}</ReactMarkdown>
                  </div>
                </div>
              )}
  
              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-center">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Review;