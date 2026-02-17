
import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Card, Badge, ProgressBar } from '../components/UI';
import { ClassificationResult } from '../types';

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result as ClassificationResult;

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-gray-500">No result found.</p>
        <button onClick={() => navigate('/')} className="mt-4 text-blue-600 underline">Back to home</button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Image Preview */}
        <div className="lg:w-1/2">
          <div className="sticky top-24">
            <img src={result.imageUrl} alt="Result" className="w-full h-96 object-cover rounded-3xl shadow-xl border-8 border-white" />
            <div className="mt-6 flex gap-4">
              <button 
                onClick={() => navigate('/')}
                className="flex-1 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                New Scan
              </button>
              <Link 
                to="/history"
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold text-center hover:bg-blue-700 transition-colors"
              >
                View History
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Detailed Classification */}
        <div className="lg:w-1/2 space-y-6">
          <Card title="Classification Details">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Predicted Category</p>
                  <div className="mt-1 flex items-center space-x-3">
                    <h2 className="text-3xl font-bold text-gray-900">{result.category}</h2>
                    <Badge category={result.category} />
                  </div>
                </div>
              </div>

              <ProgressBar 
                value={result.confidence} 
                label="AI Confidence" 
                color={result.confidence > 0.8 ? 'bg-green-500' : 'bg-amber-500'} 
              />

              <div className={`p-4 rounded-xl flex items-center gap-4 ${result.recyclable ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <div className={`p-2 rounded-full ${result.recyclable ? 'bg-green-100' : 'bg-red-100'}`}>
                  {result.recyclable ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-bold">{result.recyclable ? 'Recyclable' : 'Non-Recyclable'}</p>
                  <p className="text-sm opacity-80">This item should be placed in the {result.binColor} bin.</p>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Disposal Guidelines">
            <ul className="space-y-3">
              {result.guidelines.map((step, idx) => (
                <li key={idx} className="flex gap-3 text-gray-700">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-sm leading-6">{step}</span>
                </li>
              ))}
            </ul>
          </Card>

          <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
            <h4 className="text-lg font-bold mb-2">Did you know?</h4>
            <p className="text-sm text-blue-100">
              Recycling just one glass bottle saves enough energy to power a 100-watt light bulb for 4 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
