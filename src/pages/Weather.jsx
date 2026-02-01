import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sun, Cloud, CloudRain, Wind, Droplets, AlertTriangle, CloudOff, ThermometerSun } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';
import { createPageUrl } from '@/utils';
import BottomNav from '@/components/common/BottomNav';
import WeatherCard from '@/components/weather/WeatherCard';
import { motion } from 'framer-motion';

const hourlyForecast = [
  { time: '9 AM', temp: 28, icon: Sun, condition: 'sunny' },
  { time: '12 PM', temp: 32, icon: Sun, condition: 'sunny' },
  { time: '3 PM', temp: 34, icon: Cloud, condition: 'cloudy' },
  { time: '6 PM', temp: 30, icon: CloudRain, condition: 'rain' },
  { time: '9 PM', temp: 26, icon: Cloud, condition: 'cloudy' },
];

const weeklyForecast = [
  { day: 'Today', high: 34, low: 24, icon: Sun, rain: 10 },
  { day: 'Tomorrow', high: 32, low: 23, icon: CloudRain, rain: 80 },
  { day: 'Wed', high: 30, low: 22, icon: CloudRain, rain: 60 },
  { day: 'Thu', high: 31, low: 23, icon: Cloud, rain: 30 },
  { day: 'Fri', high: 33, low: 24, icon: Sun, rain: 10 },
  { day: 'Sat', high: 34, low: 25, icon: Sun, rain: 5 },
  { day: 'Sun', high: 33, low: 24, icon: Cloud, rain: 20 },
];

const alerts = [
  { 
    id: 1, 
    type: 'rain', 
    title: 'Rain expected tomorrow', 
    message: 'Heavy rainfall expected. Delay irrigation and harvesting.',
    severity: 'high',
    icon: CloudRain
  },
  { 
    id: 2, 
    type: 'heat', 
    title: 'High temperature alert', 
    message: 'Temperature above 35°C expected. Protect crops with shade nets.',
    severity: 'medium',
    icon: ThermometerSun
  },
];

export default function Weather() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const currentWeather = {
    temperature: 32,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    rainChance: 40
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-stone-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-stone-100">
        <div className="px-5 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-stone-800">{t('weather')}</h1>
            <div className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              {t('offlineCached')}
            </div>
          </div>
        </div>
      </header>

      <main className="px-5 py-6 space-y-6">
        {/* Current Weather */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <WeatherCard {...currentWeather} />
        </motion.section>

        {/* Alerts */}
        {alerts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="font-semibold text-stone-800 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              {t('alerts')}
            </h2>
            <div className="space-y-2">
              {alerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={`p-4 rounded-2xl border ${
                    alert.severity === 'high' 
                      ? 'bg-red-50 border-red-200' 
                      : 'bg-amber-50 border-amber-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      alert.severity === 'high' ? 'bg-red-100' : 'bg-amber-100'
                    }`}>
                      <alert.icon className={`w-5 h-5 ${
                        alert.severity === 'high' ? 'text-red-600' : 'text-amber-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${
                        alert.severity === 'high' ? 'text-red-800' : 'text-amber-800'
                      }`}>
                        {alert.title}
                      </h3>
                      <p className={`text-sm mt-1 ${
                        alert.severity === 'high' ? 'text-red-600' : 'text-amber-600'
                      }`}>
                        💡 {alert.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Hourly Forecast */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-semibold text-stone-800 mb-3">{t('hourlyForecast')}</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
            {hourlyForecast.map((hour, index) => (
              <div 
                key={index}
                className="flex-shrink-0 bg-white rounded-2xl border border-stone-100 p-4 min-w-[80px] text-center"
              >
                <p className="text-sm text-stone-500 mb-2">{hour.time}</p>
                <hour.icon className={`w-8 h-8 mx-auto mb-2 ${
                  hour.condition === 'sunny' ? 'text-amber-500' : 
                  hour.condition === 'rain' ? 'text-blue-500' : 'text-stone-400'
                }`} />
                <p className="font-bold text-stone-800">{hour.temp}°</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 7-Day Forecast */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-semibold text-stone-800 mb-3">{t('weekForecast')}</h2>
          <div className="bg-white rounded-2xl border border-stone-100 divide-y divide-stone-100">
            {weeklyForecast.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-4">
                <p className="font-medium text-stone-800 w-20">{day.day}</p>
                <day.icon className={`w-6 h-6 ${
                  day.rain > 50 ? 'text-blue-500' : 
                  day.rain < 20 ? 'text-amber-500' : 'text-stone-400'
                }`} />
                <div className="flex items-center gap-1 text-sm">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  <span className="text-stone-500">{day.rain}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-800">{day.high}°</span>
                  <span className="text-stone-400">{day.low}°</span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </main>

      <BottomNav />
    </div>
  );
}