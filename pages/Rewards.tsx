
import React from 'react';
import { Card } from '../components/UI';
import { useAuth } from '../contexts/AuthContext';
import { Reward } from '../types';

const MOCK_REWARDS: Reward[] = [
  { id: '1', title: 'Free Coffee', pointsRequired: 50, description: 'One medium hot coffee at Starbucks.', category: 'Food' },
  { id: '2', title: '50% Bus Ticket', pointsRequired: 30, description: 'Discount for Astana City Bus.', category: 'Transport' },
  { id: '3', title: 'Eco Tote Bag', pointsRequired: 100, description: 'Limited edition cotton bag.', category: 'Goods' },
  { id: '4', title: 'Movie Ticket', pointsRequired: 150, description: 'Any 2D screening at Kinopark.', category: 'Entertainment' },
  { id: '5', title: 'Park Tree Planting', pointsRequired: 500, description: 'A tree will be planted in your name.', category: 'Impact' },
];

const Rewards: React.FC = () => {
  const { user, redeemReward } = useAuth();

  const handleRedeem = (reward: Reward) => {
    if (redeemReward(reward.pointsRequired)) {
      alert(`Success! You have redeemed: ${reward.title}. Your voucher code is: ECO-${Math.random().toString(36).substr(2, 6).toUpperCase()}`);
    } else {
      alert("Insufficient points!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <header className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Eco Rewards Store</h1>
          <p className="text-gray-500 mt-2">Spend your recycling points on amazing local perks.</p>
        </div>
        <div className="bg-blue-50 px-6 py-3 rounded-2xl border border-blue-100">
          <span className="text-xs font-bold uppercase text-blue-400 block mb-1">Your Balance</span>
          <span className="text-2xl font-black text-blue-600">{user?.points || 0} Points</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_REWARDS.map(reward => (
          <Card key={reward.id} className="hover:scale-[1.02] transition-all cursor-default">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">
                {reward.category}
              </span>
              <span className="text-blue-600 font-black text-lg">{reward.pointsRequired} pts</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{reward.title}</h3>
            <p className="text-sm text-gray-500 mb-8 min-h-[40px]">{reward.description}</p>
            <button
              onClick={() => handleRedeem(reward)}
              disabled={!user || user.points < reward.pointsRequired}
              className={`w-full py-4 rounded-2xl font-bold text-sm transition-all ${
                user && user.points >= reward.pointsRequired
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {user && user.points >= reward.pointsRequired ? 'Redeem Voucher' : 'Not Enough Points'}
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Rewards;
