
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/UI';
import { classifyWaste } from '../services/geminiService';
import { ClassificationResult } from '../types';

const Home: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClassify = async () => {
    if (!preview) return;
    
    setIsUploading(true);
    try {
      const result = await classifyWaste(preview);
      const fullResult = { ...result, imageUrl: preview } as ClassificationResult;
      
      // Save to local storage for "History" persistence in this demo
      const history = JSON.parse(localStorage.getItem('waste_history') || '[]');
      localStorage.setItem('waste_history', JSON.stringify([fullResult, ...history]));
      
      navigate(`/result/${fullResult.id}`, { state: { result: fullResult } });
    } catch (err) {
      alert("Classification failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Identify, Sort, <span className="text-blue-600">Sustain.</span>
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Upload a photo of your waste and let our AI determine how to recycle it correctly.
        </p>
      </div>

      <Card className="p-0 border-none">
        <div 
          className="border-4 border-dashed border-gray-200 rounded-3xl p-12 text-center hover:border-blue-400 transition-colors cursor-pointer bg-white"
          onClick={() => !isUploading && fileInputRef.current?.click()}
        >
          {preview ? (
            <div className="relative inline-block w-full max-w-sm">
              <img src={preview} alt="Preview" className="rounded-xl shadow-lg w-full h-64 object-cover" />
              <button 
                onClick={(e) => { e.stopPropagation(); setPreview(null); }}
                className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mx-auto h-16 w-16 text-blue-500 bg-blue-50 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">Click to upload image</p>
                <p className="text-sm text-gray-500">or drag and drop here</p>
                <p className="text-xs text-gray-400 mt-2">PNG, JPG up to 10MB</p>
              </div>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*" 
          />
        </div>

        <div className="mt-8 flex flex-col items-center space-y-4">
          <button
            onClick={handleClassify}
            disabled={!preview || isUploading}
            className={`w-full max-w-md py-4 rounded-xl font-bold text-white shadow-xl transition-all ${
              !preview || isUploading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
            }`}
          >
            {isUploading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Classifying Waste...
              </span>
            ) : "Classify Waste"}
          </button>
        </div>
      </Card>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold">98% Accuracy</h3>
          <p className="text-gray-500 text-sm mt-2">State-of-the-art vision models ensure your items are identified correctly.</p>
        </div>
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold">Real-time Analysis</h3>
          <p className="text-gray-500 text-sm mt-2">Get results in seconds, allowing you to sort quickly and efficiently.</p>
        </div>
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold">Detailed Analytics</h3>
          <p className="text-gray-500 text-sm mt-2">Track your impact over time and see common waste patterns in your home.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
