
import React, { useEffect, useState } from 'react';
import { Card } from '../components/UI';
import { User } from '../types';

const Leaderboard: React.FC = () => {
  const [topUsers, setTopUsers] = useState<User[]>([]);

  useEffect(() => {
    const users: User[] = JSON.parse(localStorage.getItem('eco_users_db') || '[]');
    const sorted = [...users].sort((a, b) => b.points - a.points).slice(0, 10);
    setTopUsers(sorted);
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">Eco Champions</h1>
        <p className="text-gray-500 mt-2">The top 10 recycling leaders this month.</p>
      </header>

      <div className="space-y-4">
        {topUsers.map((user, idx) => (
          <div 
            key={user.id} 
            className={`flex items-center justify-between p-6 rounded-3xl border transition-all ${
              idx === 0 ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 border-transparent scale-[1.02]' : 'bg-white border-gray-100'
            }`}
          >
            <div className="flex items-center gap-6">
              <span className={`text-2xl font-black w-8 ${idx === 0 ? 'text-white' : 'text-gray-300'}`}>
                {idx + 1}
              </span>
              <img src={user.avatar} alt="" className="w-12 h-12 rounded-2xl object-cover shadow-sm" />
              <div>
                <h3 className="font-bold">{user.name}</h3>
                <p className={`text-xs ${idx === 0 ? 'text-blue-100' : 'text-gray-400'}`}>Level {user.level} Citizen</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl font-black">{user.points}</span>
              <p className={`text-[10px] font-bold uppercase tracking-widest ${idx === 0 ? 'text-blue-200' : 'text-gray-400'}`}>Points</p>
            </div>
          </div>
        ))}

        {topUsers.length === 0 && (
          <p className="text-center text-gray-400 italic py-20">Start classifying to appear on the leaderboard!</p>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
