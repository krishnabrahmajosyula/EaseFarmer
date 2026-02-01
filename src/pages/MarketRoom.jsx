import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, TrendingUp, Clock, User, ShieldCheck, PieChart, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from 'framer-motion';

const roomData = {
  1: { name: 'Rice', icon: '🌾', activeTraders: 24 },
  2: { name: 'Wheat', icon: '🌿', activeTraders: 18 },
  3: { name: 'Cotton', icon: '☁️', activeTraders: 31 },
  4: { name: 'Vegetables', icon: '🥬', activeTraders: 42 },
  5: { name: 'Sugarcane', icon: '🎋', activeTraders: 15 },
  6: { name: 'Pulses', icon: '🫘', activeTraders: 22 },
};

const initialBids = [
  { id: 1, trader: 'Ramesh Traders', amount: 2450, quantity: 50, time: '2 min ago' },
  { id: 2, trader: 'Krishna Exports', amount: 2420, quantity: 100, time: '5 min ago' },
  { id: 3, trader: 'Lakshmi Agro', amount: 2400, quantity: 75, time: '8 min ago' },
  { id: 4, trader: 'Venkat Mills', amount: 2380, quantity: 200, time: '12 min ago' },
];

export default function MarketRoom() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('id') || '1';
  const room = roomData[roomId] || roomData['1'];

  const [bids, setBids] = useState(initialBids);
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [bidQuantity, setBidQuantity] = useState('');

  // Simulate live bids
  useEffect(() => {
    const interval = setInterval(() => {
      const newBid = {
        id: Date.now(),
        trader: ['Suresh Trading', 'Gopal Exports', 'Anand Agri', 'Mahesh Mills'][Math.floor(Math.random() * 4)],
        amount: 2350 + Math.floor(Math.random() * 150),
        quantity: 25 + Math.floor(Math.random() * 175),
        time: 'Just now'
      };
      setBids(prev => {
        const updated = [newBid, ...prev.slice(0, 9)];
        // Sort by amount descending so highest bid is always first
        return updated.sort((a, b) => b.amount - a.amount);
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handlePlaceBid = () => {
    if (bidAmount && bidQuantity) {
      const newBid = {
        id: Date.now(),
        trader: 'You (Farmer)',
        amount: parseInt(bidAmount),
        quantity: parseInt(bidQuantity),
        time: 'Just now',
        isOwn: true
      };
      setBids(prev => {
        const updated = [newBid, ...prev];
        // Sort by amount descending so highest bid is always first
        return updated.sort((a, b) => b.amount - a.amount);
      });
      setBidAmount('');
      setBidQuantity('');
      setShowBidForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-stone-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-stone-100">
        <div className="px-5 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(createPageUrl('Market'))}
              className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-stone-600" />
            </button>
            <div className="flex items-center gap-3 flex-1">
              <span className="text-3xl">{room.icon}</span>
              <div>
                <h1 className="text-xl font-bold text-stone-800">{room.name}</h1>
                <div className="flex items-center gap-1 text-sm text-stone-500">
                  <Users className="w-4 h-4" />
                  <span>{room.activeTraders} {t('activeTraders')}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Live
            </div>
          </div>
        </div>
      </header>

      <main className="px-5 py-6 space-y-6">
        {/* Highest Bid Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-500 to-green-700 rounded-3xl p-6 text-white"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-green-100">{t('highestBid')}</span>
          </div>
          <p className="text-4xl font-bold mb-1">₹{bids[0]?.amount.toLocaleString()}</p>
          <p className="text-green-200">{t('perQuintal')} • by {bids[0]?.trader}</p>
        </motion.div>

        {/* Transparency Card */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-amber-800">{t('profitDistribution')}</p>
            <p className="text-sm text-amber-600">{t('transparency')}</p>
          </div>
          <PieChart className="w-8 h-8 text-amber-400" />
        </div>

        {/* Live Bids */}
        <section>
          <h2 className="font-semibold text-stone-800 mb-3">{t('liveBids')}</h2>
          <div className="space-y-2">
            <AnimatePresence>
              {bids.map((bid, index) => (
                <motion.div
                  key={bid.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`bg-white rounded-2xl p-4 border ${
                    bid.isOwn ? 'border-green-300 bg-green-50' : 'border-stone-100'
                  } ${index === 0 ? 'ring-2 ring-green-200' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        bid.isOwn ? 'bg-green-100' : 'bg-stone-100'
                      }`}>
                        <User className={`w-5 h-5 ${bid.isOwn ? 'text-green-600' : 'text-stone-500'}`} />
                      </div>
                      <div>
                        <p className="font-medium text-stone-800">{bid.trader}</p>
                        <div className="flex items-center gap-2 text-xs text-stone-500">
                          <Clock className="w-3 h-3" />
                          <span>{bid.time}</span>
                          <span>•</span>
                          <span>{bid.quantity} quintals</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-stone-800">₹{bid.amount.toLocaleString()}</p>
                      {index === 0 && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          Highest
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* Bid Button */}
      <div className="fixed bottom-20 left-0 right-0 p-5 bg-gradient-to-t from-white via-white to-transparent">
        <AnimatePresence>
          {showBidForm ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-2xl border border-stone-200 p-4 shadow-lg space-y-3"
            >
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-sm text-stone-500 mb-1 block">Price (₹/quintal)</label>
                  <Input
                    type="number"
                    placeholder="2500"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm text-stone-500 mb-1 block">Quantity (quintals)</label>
                  <Input
                    type="number"
                    placeholder="50"
                    value={bidQuantity}
                    onChange={(e) => setBidQuantity(e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowBidForm(false)}
                  className="flex-1 h-12 rounded-xl"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handlePlaceBid}
                  className="flex-1 h-12 bg-green-600 hover:bg-green-700 rounded-xl"
                >
                  {t('placeBid')}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button
                onClick={() => setShowBidForm(true)}
                className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-2xl text-lg font-semibold shadow-lg shadow-green-200"
              >
                <ChevronUp className="w-5 h-5 mr-2" />
                {t('placeBid')}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}