
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card, StatsItem } from '../components/UI';

const Admin: React.FC = () => {
  const trendData = [
    { date: 'Oct 01', uploads: 450 },
    { date: 'Oct 02', uploads: 520 },
    { date: 'Oct 03', uploads: 610 },
    { date: 'Oct 04', uploads: 580 },
    { date: 'Oct 05', uploads: 720 },
    { date: 'Oct 06', uploads: 840 },
    { date: 'Oct 07', uploads: 790 },
  ];

  const recentActivities = [
    { user: 'Sarah Jenkins', action: 'Classified Plastic', time: '2 mins ago', status: 'Success' },
    { user: 'Mike Ross', action: 'New Registration', time: '15 mins ago', status: 'Info' },
    { user: 'Robert Paul', action: 'System Backup', time: '1 hour ago', status: 'System' },
    { user: 'Elena Fisher', action: 'Classified Organic', time: '3 hours ago', status: 'Success' },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Administrator</h1>
          <p className="text-gray-500">Global performance and system health monitoring.</p>
        </div>
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-bold animate-pulse flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          SYSTEM LIVE
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsItem 
          label="Total Active Users" 
          value="12,450" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
          trend="+1.2%"
        />
        <StatsItem 
          label="Total Classifications" 
          value="1.2M" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}
          trend="+5.4%"
        />
        <StatsItem 
          label="Server Load" 
          value="14.2%" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>}
          trend="-2.1%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="System-wide Upload Trends">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip />
                <Line type="monotone" dataKey="uploads" stroke="#2C6EED" strokeWidth={3} dot={{r: 4, fill: '#2C6EED', strokeWidth: 2, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Recent Activity Logs">
          <div className="space-y-4">
            {recentActivities.map((act, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-white border border-transparent hover:border-gray-200 transition-all cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    {act.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{act.user}</p>
                    <p className="text-xs text-gray-500">{act.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">{act.time}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    act.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {act.status}
                  </span>
                </div>
              </div>
            ))}
            <button className="w-full text-center py-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
              View All Logs
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
