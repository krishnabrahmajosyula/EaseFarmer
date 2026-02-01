import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Search, ArrowUpRight, ArrowDownRight, Minus, Info } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';
import { createPageUrl } from '@/utils';
import BottomNav from '@/components/common/BottomNav';
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from 'framer-motion';

const priceData = [
  { 
    crop: 'Rice', 
    icon: '🌾', 
    currentPrice: 2450, 
    change: 2.5, 
    prediction: 'up',
    confidence: 'high',
    yesterdayPrice: 2390,
    weekAgoPrice: 2320
  },
  { 
    crop: 'Wheat', 
    icon: '🌿', 
    currentPrice: 2180, 
    change: -1.2, 
    prediction: 'stable',
    confidence: 'medium',
    yesterdayPrice: 2206,
    weekAgoPrice: 2150
  },
  { 
    crop: 'Cotton', 
    icon: '☁️', 
    currentPrice: 6800, 
    change: 4.1, 
    prediction: 'up',
    confidence: 'high',
    yesterdayPrice: 6532,
    weekAgoPrice: 6200
  },
  { 
    crop: 'Vegetables', 
    icon: '🥬', 
    currentPrice: 3500, 
    change: -2.3, 
    prediction: 'down',
    confidence: 'medium',
    yesterdayPrice: 3582,
    weekAgoPrice: 3800
  },
  { 
    crop: 'Sugarcane', 
    icon: '🎋', 
    currentPrice: 3200, 
    change: 1.5, 
    prediction: 'up',
    confidence: 'low',
    yesterdayPrice: 3153,
    weekAgoPrice: 3100
  },
  { 
    crop: 'Pulses', 
    icon: '🫘', 
    currentPrice: 8500, 
    change: 3.2, 
    prediction: 'up',
    confidence: 'high',
    yesterdayPrice: 8236,
    weekAgoPrice: 8000
  },
  { 
    crop: 'Groundnut', 
    icon: '🥜', 
    currentPrice: 5600, 
    change: -0.5, 
    prediction: 'stable',
    confidence: 'medium',
    yesterdayPrice: 5628,
    weekAgoPrice: 5500
  },
  { 
    crop: 'Chilli', 
    icon: '🌶️', 
    currentPrice: 12000, 
    change: 5.8, 
    prediction: 'up',
    confidence: 'high',
    yesterdayPrice: 11341,
    weekAgoPrice: 10500
  },
];

export default function MarketPrices() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState(null);

  const filteredPrices = priceData.filter(item =>
    item.crop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPredictionIcon = (prediction) => {
    if (prediction === 'up') return <ArrowUpRight className="w-4 h-4" />;
    if (prediction === 'down') return <ArrowDownRight className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getPredictionColor = (prediction) => {
    if (prediction === 'up') return 'text-green-600 bg-green-50';
    if (prediction === 'down') return 'text-red-600 bg-red-50';
    return 'text-stone-600 bg-stone-50';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence === 'high') return 'bg-green-100 text-green-700';
    if (confidence === 'medium') return 'bg-amber-100 text-amber-700';
    return 'bg-stone-100 text-stone-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-stone-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-stone-100">
        <div className="px-5 py-4">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate(createPageUrl('Home'))}
              className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-stone-600" />
            </button>
            <h1 className="text-2xl font-bold text-stone-800">{t('mandiPrices')}</h1>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <Input
              type="text"
              placeholder="Search crops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl border-stone-200 bg-stone-50"
            />
          </div>
        </div>
      </header>

      <main className="px-5 py-6">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-800 font-medium">{t('pricePredict')}</p>
            <p className="text-xs text-blue-600 mt-1">
              AI predictions based on market trends. Tap any crop for details.
            </p>
          </div>
        </div>

        {/* Price List */}
        <div className="space-y-3">
          <AnimatePresence>
            {filteredPrices.map((item, index) => (
              <motion.div
                key={item.crop}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCrop(selectedCrop === item.crop ? null : item.crop)}
                className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    {/* Crop Info */}
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{item.icon}</span>
                      <div>
                        <h3 className="font-semibold text-stone-800">{item.crop}</h3>
                        <p className="text-sm text-stone-500">{t('perQuintal')}</p>
                      </div>
                    </div>

                    {/* Price & Change */}
                    <div className="text-right">
                      <p className="text-xl font-bold text-stone-800">
                        ₹{item.currentPrice.toLocaleString()}
                      </p>
                      <div className={`inline-flex items-center gap-1 text-sm px-2 py-0.5 rounded-full ${
                        item.change >= 0 
                          ? 'bg-green-50 text-green-600' 
                          : 'bg-red-50 text-red-600'
                      }`}>
                        {item.change >= 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {item.change >= 0 ? '+' : ''}{item.change}%
                      </div>
                    </div>
                  </div>

                  {/* Prediction */}
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-stone-100">
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm ${getPredictionColor(item.prediction)}`}>
                      {getPredictionIcon(item.prediction)}
                      <span className="font-medium capitalize">{item.prediction}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-lg ${getConfidenceColor(item.confidence)}`}>
                      {t('confidence')}: {item.confidence}
                    </span>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {selectedCrop === item.crop && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-stone-100 bg-stone-50"
                    >
                      <div className="p-4 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-stone-500">Yesterday</p>
                          <p className="font-semibold text-stone-700">₹{item.yesterdayPrice.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-stone-500">Week Ago</p>
                          <p className="font-semibold text-stone-700">₹{item.weekAgoPrice.toLocaleString()}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-xs text-stone-500">Price Change (7 days)</p>
                          <p className={`font-semibold ${
                            item.currentPrice > item.weekAgoPrice ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {item.currentPrice > item.weekAgoPrice ? '+' : ''}
                            ₹{(item.currentPrice - item.weekAgoPrice).toLocaleString()} 
                            ({(((item.currentPrice - item.weekAgoPrice) / item.weekAgoPrice) * 100).toFixed(1)}%)
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}