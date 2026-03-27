
import React from 'react';
import { CATEGORY_STYLES } from '../constants';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  subtitle?: string;
}

export const Card: React.FC<CardProps> = ({ children, title, className = "", subtitle }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
    {(title || subtitle) && (
      <div className="px-6 py-5 border-b border-gray-50 bg-white">
        {title && <h3 className="text-lg font-bold text-gray-900 leading-tight">{title}</h3>}
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
    )}
    <div className="p-6">
      {children}
    </div>
  </div>
);

export const Badge: React.FC<{ category: string }> = ({ category }) => {
  const style = CATEGORY_STYLES[category] || { bg: 'bg-gray-100', text: 'text-gray-700' };
  return (
    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${style.bg} ${style.text}`}>
      {category}
    </span>
  );
};

export const ProgressBar: React.FC<{ value: number; label: string; color?: string; size?: 'sm' | 'md' }> = ({ value, label, color = "bg-blue-600", size = 'md' }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-tight">
      <span>{label}</span>
      <span>{Math.round(value * 100)}%</span>
    </div>
    <div className={`w-full bg-gray-100 rounded-full ${size === 'sm' ? 'h-1.5' : 'h-2.5'} overflow-hidden`}>
      <div 
        className={`${color} h-full rounded-full transition-all duration-1000 ease-out`} 
        style={{ width: `${Math.min(100, Math.max(0, value * 100))}%` }}
      ></div>
    </div>
  </div>
);

export const ImpactCard: React.FC<{ label: string; value: string; icon: string; color: string; textColor?: string }> = ({ label, value, icon, color, textColor = "text-gray-900" }) => (
  <div className={`${color.includes('bg-white/10') ? color : 'bg-white border border-gray-100'} p-5 rounded-2xl shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.02]`}>
    <div className={`w-12 h-12 ${color.includes('bg-white/10') ? 'bg-white/10' : 'bg-blue-50'} rounded-xl flex items-center justify-center text-2xl shadow-inner`}>
      {icon}
    </div>
    <div>
      <p className={`text-[10px] font-bold ${color.includes('bg-white/10') ? 'text-blue-100' : 'text-gray-400'} uppercase tracking-widest`}>{label}</p>
      <p className={`text-xl font-black ${color.includes('bg-white/10') ? 'text-white' : textColor}`}>{value}</p>
    </div>
  </div>
);

export const StatsItem: React.FC<{ label: string; value: string | number; icon: React.ReactNode; trend?: string }> = ({ label, value, icon, trend }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
        {icon}
      </div>
      {trend && (
        <span className={`text-[10px] font-black px-2 py-1 rounded-md ${trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {trend}
        </span>
      )}
    </div>
    <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">{label}</p>
    <h4 className="text-2xl font-black text-gray-900 mt-0.5">{value}</h4>
  </div>
);
