import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Store, Cloud, Droplets, TrendingUp, Wallet, Bell, WifiOff, Wifi } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';
import { createPageUrl } from '@/utils';
import BottomNav from '@/components/common/BottomNav';
import QuickActionCard from '@/components/common/QuickActionCard';
import WeatherCard from '@/components/weather/WeatherCard';
import SoilMoistureGauge from '@/components/soil/SoilMoistureGauge';
import MarketPriceCard from '@/components/market/MarketPriceCard';
import { motion } from 'framer-motion';

export default function Home() {
  const { t } = useLanguage();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [userName] = useState('Anirudh');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sample data
  const weatherData = {
    temperature: 32,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    rainChance: 40
  };

  const soilMoisture = 45;

  const marketPrices = [
    { crop: { name: 'Rice', icon: '🌾' }, price: 2450, change: 2.5 },
    { crop: { name: 'Wheat', icon: '🌿' }, price: 2180, change: -1.2 },
    { crop: { name: 'Cotton', icon: '☁️' }, price: 6800, change: 4.1 },
  ];

  const quickActions = [
    { icon: Store, title: t('joinMarket'), subtitle: '5 active rooms', to: createPageUrl('Market'), color: 'green' },
    { icon: Cloud, title: t('checkWeather'), subtitle: '7-day forecast', to: createPageUrl('Weather'), color: 'blue' },
    { icon: Droplets, title: t('soilIrrigation'), subtitle: 'IoT connected', to: createPageUrl('Soil'), color: 'amber' },
    { icon: Wallet, title: t('financeManager'), subtitle: '2 active loans', to: createPageUrl('Finance'), color: 'orange' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-stone-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-stone-100">
        <div className="px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-stone-500 text-sm">{t('namaste')},</p>
              <h1 className="text-xl font-bold text-stone-800">{userName} 👋</h1>
            </div>
            <div className="flex items-center gap-3">
              {/* Online Status */}
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                isOnline ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500'
              }`}>
                {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                <span>{isOnline ? 'Online' : 'Offline'}</span>
              </div>
              {/* Notifications */}
              <Link 
                to={createPageUrl('Notifications')}
                className="relative w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center"
              >
                <Bell className="w-5 h-5 text-stone-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                  3
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 py-6 space-y-6">
        {/* Weather Card */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-stone-800">{t('todayWeather')}</h2>
            <Link to={createPageUrl('Weather')} className="text-sm text-green-600 font-medium">
              View all →
            </Link>
          </div>
          <WeatherCard {...weatherData} compact />
        </motion.section>

        {/* Soil Status */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-stone-800">{t('soilStatus')}</h2>
            <Link to={createPageUrl('Soil')} className="text-sm text-green-600 font-medium">
              Details →
            </Link>
          </div>
          <SoilMoistureGauge moisture={soilMoisture} compact />
        </motion.section>

        {/* Market Prices */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-stone-800">{t('marketSnapshot')}</h2>
            <Link to={createPageUrl('MarketPrices')} className="text-sm text-green-600 font-medium">
              All prices →
            </Link>
          </div>
          <div className="space-y-2">
            {marketPrices.map((item, index) => (
              <MarketPriceCard 
                key={index}
                crop={item.crop}
                price={item.price}
                change={item.change}
                compact
              />
            ))}
          </div>
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-semibold text-stone-800 mb-3">{t('quickActions')}</h2>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <QuickActionCard key={index} {...action} />
            ))}
          </div>
        </motion.section>
      </main>

      <BottomNav />
    </div>
  );
}