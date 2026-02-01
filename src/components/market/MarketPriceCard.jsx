import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function MarketPriceCard({ crop, price, change, unit = "quintal", compact = false }) {
  const { t } = useLanguage();
  
  const getTrend = () => {
    if (change > 0) return { icon: TrendingUp, color: 'green', sign: '+' };
    if (change < 0) return { icon: TrendingDown, color: 'red', sign: '' };
    return { icon: Minus, color: 'stone', sign: '' };
  };

  const trend = getTrend();
  const TrendIcon = trend.icon;

  const trendColorClasses = {
    green: 'text-green-600 bg-green-50',
    red: 'text-red-600 bg-red-50',
    stone: 'text-stone-500 bg-stone-50'
  };

  if (compact) {
    return (
      <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-stone-100">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{crop.icon || '🌾'}</span>
          <span className="font-medium text-stone-800">{crop.name}</span>
        </div>
        <div className="text-right">
          <p className="font-bold text-stone-800">₹{price.toLocaleString()}</p>
          <div className={`flex items-center gap-1 text-xs ${trendColorClasses[trend.color]} px-2 py-0.5 rounded-full`}>
            <TrendIcon className="w-3 h-3" />
            <span>{trend.sign}{Math.abs(change)}%</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 border border-stone-100 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{crop.icon || '🌾'}</span>
          <div>
            <h3 className="font-semibold text-stone-800">{crop.name}</h3>
            <p className="text-xs text-stone-500">{t('perQuintal')}</p>
          </div>
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${trendColorClasses[trend.color]} px-3 py-1 rounded-full`}>
          <TrendIcon className="w-4 h-4" />
          <span>{trend.sign}{Math.abs(change)}%</span>
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-stone-800">₹{price.toLocaleString()}</span>
        <span className="text-sm text-stone-500">/{unit}</span>
      </div>
    </div>
  );
}