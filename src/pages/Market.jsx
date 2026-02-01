import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, TrendingUp, ChevronRight, Search, Filter, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';
import { createPageUrl } from '@/utils';
import BottomNav from '@/components/common/BottomNav';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';

const marketRooms = [
  { id: 1, name: 'Rice', nameLocal: { te: 'బియ్యం', hi: 'चावल', ta: 'அரிசி' }, icon: '🌾', activeTraders: 24, highestBid: 2450, unit: 'quintal', status: 'active' },
  { id: 2, name: 'Wheat', nameLocal: { te: 'గోధుమ', hi: 'गेहूं', ta: 'கோதுமை' }, icon: '🌿', activeTraders: 18, highestBid: 2180, unit: 'quintal', status: 'active' },
  { id: 3, name: 'Cotton', nameLocal: { te: 'పత్తి', hi: 'कपास', ta: 'பருத்தி' }, icon: '☁️', activeTraders: 31, highestBid: 6800, unit: 'quintal', status: 'active' },
  { id: 4, name: 'Vegetables', nameLocal: { te: 'కూరగాయలు', hi: 'सब्जियाँ', ta: 'காய்கறிகள்' }, icon: '🥬', activeTraders: 42, highestBid: 3500, unit: 'quintal', status: 'active' },
  { id: 5, name: 'Sugarcane', nameLocal: { te: 'చెరకు', hi: 'गन्ना', ta: 'கரும்பு' }, icon: '🎋', activeTraders: 15, highestBid: 3200, unit: 'quintal', status: 'active' },
  { id: 6, name: 'Pulses', nameLocal: { te: 'పప్పులు', hi: 'दाल', ta: 'பருப்பு' }, icon: '🫘', activeTraders: 22, highestBid: 8500, unit: 'quintal', status: 'active' },
];

export default function Market() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRooms = marketRooms.filter(room => 
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (room.nameLocal[language] && room.nameLocal[language].includes(searchQuery))
  );

  const getRoomName = (room) => {
    if (language !== 'en' && room.nameLocal[language]) {
      return room.nameLocal[language];
    }
    return room.name;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-stone-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-stone-100">
        <div className="px-5 py-4">
          <h1 className="text-2xl font-bold text-stone-800 mb-4">{t('market')}</h1>
          
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

      {/* Trust Banner */}
      <div className="mx-5 mt-4 p-3 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3">
        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-green-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-green-800">{t('transparency')}</p>
          <p className="text-xs text-green-600">All transactions are verified</p>
        </div>
      </div>

      {/* Market Rooms */}
      <main className="px-5 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-stone-800">{t('joinMarket')}</h2>
          <span className="text-sm text-stone-500">{filteredRooms.length} rooms</span>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {filteredRooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link 
                  to={`${createPageUrl('MarketRoom')}?id=${room.id}`}
                  className="block bg-white rounded-2xl border border-stone-100 p-4 shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
                >
                  <div className="flex items-center gap-4">
                    {/* Crop Icon */}
                    <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center text-3xl">
                      {room.icon}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-stone-800">{getRoomName(room)}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1 text-sm text-stone-500">
                          <Users className="w-4 h-4" />
                          <span>{room.activeTraders} {t('activeTraders')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price & Arrow */}
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-green-600 mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs font-medium">{t('highestBid')}</span>
                      </div>
                      <p className="font-bold text-lg text-stone-800">₹{room.highestBid.toLocaleString()}</p>
                      <p className="text-xs text-stone-500">{t('perQuintal')}</p>
                    </div>

                    <ChevronRight className="w-5 h-5 text-stone-400" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}