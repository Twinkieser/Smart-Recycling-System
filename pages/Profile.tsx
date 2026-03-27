
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, Badge, ProgressBar } from '../components/UI';
import { ClassificationResult } from '../types';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<ClassificationResult[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('waste_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  if (!user) return null;

  const levelProgress = (user.points % 100) / 100;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
        {/* User Stats Card */}
        <div className="w-full md:w-1/3">
          <Card className="text-center py-10">
            <div className="relative inline-block mb-6">
              <img 
                src={user.avatar} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl mx-auto"
              />
              <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white w-10 h-10 rounded-full border-4 border-white flex items-center justify-center font-bold shadow-lg">
                {user.level}
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
            <p className="text-gray-500 text-sm mb-6">{user.email}</p>
            
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 mb-6">
              <span className="text-[10px] font-bold uppercase text-blue-400 block mb-1 tracking-widest">Total Points</span>
              <span className="text-4xl font-black text-blue-600">{user.points}</span>
            </div>

            <div className="px-4">
              <ProgressBar value={levelProgress} label={`Level ${user.level} Progress`} color="bg-blue-600" />
              <p className="text-[10px] text-gray-400 mt-2 font-medium uppercase">
                {100 - (user.points % 100)} points to level {user.level + 1}
              </p>
            </div>
          </Card>
        </div>

        {/* History Section */}
        <div className="w-full md:w-2/3 space-y-6">
          <header className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-800">Recycling History</h3>
            <span className="text-sm text-gray-500 font-medium">{history.length} items scanned</span>
          </header>

          <Card className="p-0 overflow-hidden">
            {history.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {history.map((item) => (
                  <div key={item.id} className="p-4 hover:bg-gray-50 transition-all flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={item.imageUrl} 
                        alt="Scanned item" 
                        className="w-14 h-14 rounded-xl object-cover border border-gray-100"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-gray-900">{item.category}</span>
                          <Badge category={item.category} />
                        </div>
                        <p className="text-xs text-gray-400 font-medium">
                          {new Date(item.timestamp).toLocaleDateString(undefined, {
                            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-600 font-bold text-sm">+{item.confidence >= 0.9 ? '15' : '10'} pts</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Confidence: {Math.round(item.confidence * 100)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium italic">You haven't scanned any waste yet.</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
