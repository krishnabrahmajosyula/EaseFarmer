import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Droplets, Thermometer, Leaf, Wifi, WifiOff, AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';
import { createPageUrl } from '@/utils';
import BottomNav from '@/components/common/BottomNav';
import SoilMoistureGauge from '@/components/soil/SoilMoistureGauge';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const trendData = [
  { day: 'Mon', moisture: 60 },
  { day: 'Tue', moisture: 55 },
  { day: 'Wed', moisture: 48 },
  { day: 'Thu', moisture: 45 },
  { day: 'Fri', moisture: 42 },
  { day: 'Sat', moisture: 38 },
  { day: 'Today', moisture: 45 },
];

const recommendations = [
  {
    id: 1,
    type: 'irrigation',
    title: 'Irrigate in 2 hours',
    description: 'Soil moisture is below optimal. Water your crops soon for best results.',
    icon: Droplets,
    color: 'blue',
    priority: 'high'
  },
  {
    id: 2,
    type: 'fertilizer',
    title: 'Apply Nitrogen fertilizer',
    description: 'Based on soil analysis, your crops need Nitrogen boost. Apply 50kg/acre.',
    icon: Leaf,
    color: 'green',
    priority: 'medium'
  },
];

export default function Soil() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [iotConnected] = useState(true);

  const soilData = {
    moisture: 45,
    temperature: 28,
    ph: 6.8,
    nitrogen: 'Medium',
    phosphorus: 'High',
    potassium: 'Low'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-stone-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-stone-100">
        <div className="px-5 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-stone-800">{t('soilIrrigation')}</h1>
            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm ${
              iotConnected ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500'
            }`}>
              {iotConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              {iotConnected ? t('connected') : t('notConnected')}
            </div>
          </div>
        </div>
      </header>

      <main className="px-5 py-6 space-y-6">
        {/* Moisture Gauge */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <SoilMoistureGauge moisture={soilData.moisture} />
        </motion.section>

        {/* Quick Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3"
        >
          <div className="bg-white rounded-2xl border border-stone-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="w-5 h-5 text-orange-500" />
              <span className="text-sm text-stone-500">Soil Temperature</span>
            </div>
            <p className="text-2xl font-bold text-stone-800">{soilData.temperature}°C</p>
          </div>
          <div className="bg-white rounded-2xl border border-stone-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="w-5 h-5 text-green-500" />
              <span className="text-sm text-stone-500">pH Level</span>
            </div>
            <p className="text-2xl font-bold text-stone-800">{soilData.ph}</p>
            <p className="text-xs text-green-600">Optimal</p>
          </div>
        </motion.section>

        {/* NPK Status */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-semibold text-stone-800 mb-3">Nutrient Levels (NPK)</h2>
          <div className="bg-white rounded-2xl border border-stone-100 p-4 space-y-4">
            {[
              { name: 'Nitrogen (N)', value: 40, status: 'Medium', color: 'blue' },
              { name: 'Phosphorus (P)', value: 75, status: 'High', color: 'green' },
              { name: 'Potassium (K)', value: 25, status: 'Low', color: 'red' },
            ].map((nutrient, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-stone-600">{nutrient.name}</span>
                  <span className={`text-sm font-medium ${
                    nutrient.color === 'green' ? 'text-green-600' :
                    nutrient.color === 'red' ? 'text-red-600' : 'text-blue-600'
                  }`}>{nutrient.status}</span>
                </div>
                <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      nutrient.color === 'green' ? 'bg-green-500' :
                      nutrient.color === 'red' ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${nutrient.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Moisture Trend */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-semibold text-stone-800 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-stone-400" />
            {t('trends')} (7 days)
          </h2>
          <div className="bg-white rounded-2xl border border-stone-100 p-4">
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={trendData}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#78716c' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#78716c' }}
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="moisture" 
                  stroke="#22c55e" 
                  strokeWidth={3}
                  dot={{ fill: '#22c55e', strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: '#16a34a' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        {/* Recommendations */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-semibold text-stone-800 mb-3">{t('fertilizerTip')}</h2>
          <div className="space-y-3">
            {recommendations.map((rec) => (
              <div 
                key={rec.id}
                className={`p-4 rounded-2xl border ${
                  rec.priority === 'high' 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'bg-green-50 border-green-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    rec.priority === 'high' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    <rec.icon className={`w-5 h-5 ${
                      rec.priority === 'high' ? 'text-blue-600' : 'text-green-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      rec.priority === 'high' ? 'text-blue-800' : 'text-green-800'
                    }`}>
                      {rec.title}
                    </h3>
                    <p className={`text-sm mt-1 ${
                      rec.priority === 'high' ? 'text-blue-600' : 'text-green-600'
                    }`}>
                      {rec.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Action Buttons */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-3"
        >
          <Button className="h-14 bg-blue-600 hover:bg-blue-700 rounded-2xl flex items-center justify-center gap-2">
            <Droplets className="w-5 h-5" />
            {t('irrigateNow')}
          </Button>
          <Button variant="outline" className="h-14 rounded-2xl flex items-center justify-center gap-2">
            <Clock className="w-5 h-5" />
            Schedule
          </Button>
        </motion.section>
      </main>

      <BottomNav />
    </div>
  );
}