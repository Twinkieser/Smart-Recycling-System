
import React from 'react';
// Import Link from react-router-dom to fix errors on lines 103 and 166
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Card, StatsItem, ProgressBar, ImpactCard } from '../components/UI';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  const weeklyData = [
    { day: 'Mon', count: 12 }, { day: 'Tue', count: 18 }, { day: 'Wed', count: 15 },
    { day: 'Thu', count: 25 }, { day: 'Fri', count: 20 }, { day: 'Sat', count: 32 }, { day: 'Sun', count: 28 },
  ];

  const globalImpact = [
    { name: 'Plastic', count: 4500 },
    { name: 'Paper', count: 2300 },
    { name: 'Metal', count: 1200 },
    { name: 'Glass', count: 3100 },
  ];

  const levelProgress = user ? (user.points % 100) / 100 : 0;

  const itemsRecycled = user ? Math.floor(user.points / 10) : 0;
  const co2Saved = (itemsRecycled * 0.5).toFixed(1);
  const waterSaved = (itemsRecycled * 2.1).toFixed(1);
  const treesSaved = (itemsRecycled * 0.05).toFixed(2);

  const challenges = [
    { id: 1, title: 'Plastic Pioneer', progress: 0.8, goal: 'Sort 10 plastic items', points: 50 },
    { id: 2, title: 'Glass Guardian', progress: 0.3, goal: 'Sort 5 glass items', points: 30 },
    { id: 3, title: 'Paper Professional', progress: 1.0, goal: 'Recycle 50 papers', points: 100, completed: true },
  ];

  const feed = [
    { user: 'Alman Gali', action: 'levelled up to Level 5!', time: '2m ago' },
    { user: 'Sasha P.', action: 'saved 1.5kg of CO2 today', time: '15m ago' },
    { user: 'EcoWarrior_99', action: 'found a full container #102', time: '1h ago' },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Eco Dashboard</h1>
          <p className="text-gray-500 font-medium">Monitoring your environmental footprint.</p>
        </div>
        
        {user && (
          <div className="bg-white p-2 pr-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-100">
              {user.level}
            </div>
            <div className="flex-grow min-w-[180px]">
              <div className="flex justify-between text-[10px] font-black uppercase text-gray-400 mb-1.5">
                <span>Citizen Level {user.level}</span>
                <span>{user.points} XP</span>
              </div>
              <ProgressBar value={levelProgress} label="" color="bg-blue-600" size="sm" />
            </div>
          </div>
        )}
      </header>

      {/* Impact Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <ImpactCard label="CO2 Saved" value={`${co2Saved} kg`} icon="☁️" color="bg-gray-50" />
        <ImpactCard label="Water Saved" value={`${waterSaved} L`} icon="💧" color="bg-blue-50" />
        <ImpactCard label="Trees Saved" value={`${treesSaved}`} icon="🌳" color="bg-green-50" />
        <ImpactCard label="Energy Saved" value={`${(itemsRecycled * 0.8).toFixed(1)} kWh`} icon="⚡" color="bg-amber-50" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsItem label="Total Items" value={itemsRecycled} icon="📦" trend="+14%" />
        <StatsItem label="Daily Streak" value="5 days" icon="🔥" trend="+2" />
        <StatsItem label="Community Rank" value="#42" icon="🏆" trend="-3" />
        <StatsItem label="Global Percentile" value="Top 5%" icon="🌍" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card title="Active Challenges" subtitle="Complete tasks to earn extra bonus points">
          <div className="space-y-5 mt-4">
            {challenges.map(ch => (
              <div key={ch.id} className={`p-4 rounded-2xl border ${ch.completed ? 'bg-green-50 border-green-100' : 'bg-white border-gray-100'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-black text-gray-900">{ch.title}</span>
                  <span className="text-[10px] font-black text-blue-600">+{ch.points} XP</span>
                </div>
                <ProgressBar value={ch.progress} label={ch.goal} color={ch.completed ? 'bg-green-500' : 'bg-blue-600'} size="sm" />
              </div>
            ))}
          </div>
        </Card>

        <Card title="Personal Activity" subtitle="Your recycling volume over the last 7 days">
          <div className="h-72 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2C6EED" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2C6EED" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#2C6EED', strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="count" stroke="#2C6EED" strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Eco Community Feed" subtitle="What's happening around campus">
          <div className="space-y-4 mt-4">
            {feed.map((item, i) => (
              <div key={i} className="flex gap-3 text-xs">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center font-bold text-gray-400">
                  {item.user[0]}
                </div>
                <div>
                  <p className="text-gray-900 font-bold">{item.user} <span className="font-medium text-gray-500">{item.action}</span></p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Global Impact" subtitle="Combined efforts of the EcoSort AI community">
          <div className="h-72 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={globalImpact}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none' }} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={40}>
                  {globalImpact.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#2C6EED', '#F39C12', '#7F8C8D', '#1ABC9C'][index % 4]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-2xl shadow-blue-100">
           <div className="space-y-4">
             <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest">Next Reward</div>
             <h4 className="text-3xl font-black leading-tight">Planet Saver II Badge</h4>
             <p className="text-blue-100 text-sm font-medium leading-relaxed">
               You are only <span className="text-white font-bold">45 points</span> away from unlocking the "Planet Saver" badge and getting a 20% discount on public transport vouchers!
             </p>
           </div>
           <div className="mt-8 flex items-center justify-between">
              <div className="w-24">
                <ProgressBar value={0.7} label="" color="bg-white" size="sm" />
              </div>
              <Link to="/rewards" className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-black text-sm hover:bg-blue-50 transition-all shadow-xl">
                Go to Rewards
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
