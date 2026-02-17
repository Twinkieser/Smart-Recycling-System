
import React from 'react';
import { CATEGORY_STYLES } from '../constants';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, title, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
    {title && (
      <div className="px-6 py-4 border-b border-gray-50">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
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
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${style.bg} ${style.text}`}>
      {category}
    </span>
  );
};

export const ProgressBar: React.FC<{ value: number; label: string; color?: string }> = ({ value, label, color = "bg-blue-600" }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-sm font-medium text-gray-600">
      <span>{label}</span>
      <span>{Math.round(value * 100)}%</span>
    </div>
    <div className="w-full bg-gray-100 rounded-full h-2.5">
      <div 
        className={`${color} h-2.5 rounded-full transition-all duration-1000`} 
        style={{ width: `${value * 100}%` }}
      ></div>
    </div>
  </div>
);

export const StatsItem: React.FC<{ label: string; value: string | number; icon: React.ReactNode; trend?: string }> = ({ label, value, icon, trend }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <h4 className="text-2xl font-bold text-gray-900 mt-1">{value}</h4>
        {trend && (
          <p className={`text-xs mt-2 ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {trend} <span className="text-gray-400">vs last month</span>
          </p>
        )}
      </div>
      <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
        {icon}
      </div>
    </div>
  </div>
);
