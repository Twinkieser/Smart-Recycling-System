
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, ImpactCard } from '../components/UI';
import { classifyWaste, getDailyEcoTip } from '../services/geminiService';
import { ClassificationResult } from '../types';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [ecoTip, setEcoTip] = useState<string>("Small steps lead to big changes...");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { user, addPoints } = useAuth();

  useEffect(() => {
    getDailyEcoTip().then(setEcoTip);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleClassify = async () => {
    if (!preview) return;
    setIsUploading(true);
    try {
      const result = await classifyWaste(preview);
      const fullResult = { ...result, imageUrl: preview } as ClassificationResult;
      
      let pointsAwarded = 10;
      if (fullResult.confidence >= 0.9) pointsAwarded += 5;
      addPoints(pointsAwarded);

      const history = JSON.parse(localStorage.getItem('waste_history') || '[]');
      localStorage.setItem('waste_history', JSON.stringify([fullResult, ...history]));
      
      navigate(`/result/${fullResult.id}`, { state: { result: fullResult, pointsAwarded } });
    } catch (err) {
      alert("Classification failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Mock impact data based on points
  const itemsRecycled = user ? Math.floor(user.points / 10) : 0;
  const co2Saved = (itemsRecycled * 0.5).toFixed(1);
  const waterSaved = (itemsRecycled * 2.1).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Platform Header / Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl shadow-blue-100 relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Smart Recycling <br/><span className="text-blue-200">System Platform</span>
            </h1>
            <p className="text-blue-100 text-lg font-medium mb-8">
              Welcome to EcoSort AI. Use computer vision to classify waste, track your carbon footprint, and find smart disposal points across the city.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-sm hover:bg-blue-50 transition-all shadow-xl active:scale-95"
              >
                Start AI Classification
              </button>
              <Link 
                to="/map"
                className="bg-blue-500/30 backdrop-blur-md border border-blue-400 text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-blue-500/50 transition-all"
              >
                View Smart Map
              </Link>
            </div>
          </div>
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
            <ImpactCard label="CO2 Saved" value={`${co2Saved} kg`} icon="☁️" color="bg-white/10 text-white" />
            <ImpactCard label="Water Saved" value={`${waterSaved} L`} icon="💧" color="bg-white/10 text-white" />
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex items-center gap-4 sm:col-span-2">
               <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-2xl shadow-inner">🏆</div>
               <div>
                  <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Total XP Gained</p>
                  <p className="text-xl font-black text-white">{user?.points} XP</p>
               </div>
            </div>
          </div>
        </div>
        
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          <Card title="Daily Eco Insights" subtitle="AI-powered sustainability tips">
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
               <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">✨</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Eco Assistant</span>
              </div>
              <p className="text-sm font-medium text-blue-800 italic leading-relaxed">
                "{ecoTip}"
              </p>
            </div>
          </Card>

          <Card title="Recycling Leaderboard" subtitle="Top environmental contributors">
             <div className="space-y-4">
                {[
                  { name: 'Damir S.', points: 1240, level: 12 },
                  { name: 'Aruzhan K.', points: 980, level: 9 },
                  { name: 'Maksat T.', points: 850, level: 8 },
                ].map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-black text-blue-600 shadow-sm text-xs">#{i+1}</div>
                      <span className="text-sm font-bold text-gray-700">{p.name}</span>
                    </div>
                    <span className="text-xs font-black text-gray-400">{p.points} XP</span>
                  </div>
                ))}
                <Link to="/leaderboard" className="block text-center py-2 text-xs font-black text-blue-600 hover:underline">Full Leaderboard →</Link>
             </div>
          </Card>
        </div>

        {/* Main Interaction Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">AI Classification Portal</h2>
            <Link to="/history" className="text-sm font-bold text-blue-600 hover:underline">View History</Link>
          </div>

          <div 
            className={`border-4 border-dashed rounded-[2.5rem] p-12 text-center transition-all cursor-pointer bg-white group relative ${
              isUploading ? 'border-blue-200 cursor-not-allowed' : 'border-gray-100 hover:border-blue-400 hover:shadow-xl'
            }`}
            onClick={() => !isUploading && fileInputRef.current?.click()}
          >
            {preview ? (
              <div className="relative inline-block w-full max-w-md mx-auto">
                <img src={preview} alt="Preview" className="rounded-3xl shadow-2xl w-full h-80 object-cover border-8 border-white" />
                {!isUploading && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); setPreview(null); }}
                    className="absolute -top-4 -right-4 bg-white text-red-500 rounded-full p-2 shadow-xl hover:scale-110 transition-transform border border-gray-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ) : (
              <div className="py-12 space-y-6">
                <div className="mx-auto h-24 w-24 text-blue-500 bg-blue-50 rounded-[2rem] flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-inner border border-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-black text-gray-900">Upload Photo of Waste</p>
                  <p className="text-sm text-gray-400 font-medium max-w-xs mx-auto mt-2">Our Gemini-powered AI will identify the material and show you how to recycle it properly.</p>
                </div>
                <div className="inline-block px-8 py-3 bg-blue-600 text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-lg shadow-blue-100 group-hover:bg-blue-700 transition-colors">
                  Select Image
                </div>
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
          </div>

          <button
            onClick={handleClassify}
            disabled={!preview || isUploading}
            className={`w-full py-6 rounded-[2rem] font-black text-white shadow-2xl transition-all flex items-center justify-center gap-4 text-lg ${
              !preview || isUploading 
                ? 'bg-gray-200 cursor-not-allowed shadow-none' 
                : 'bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-blue-200'
            }`}
          >
            {isUploading ? (
              <>
                <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                AI ANALYSIS IN PROGRESS...
              </>
            ) : (
              <>ANALYZE & DISPOSE CORRECTLY</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
