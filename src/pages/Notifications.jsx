import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CloudRain, TrendingUp, Droplets, Calendar, Bell, Clock } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';

const notifications = [
  {
    id: 1,
    type: 'weather',
    title: 'Rain Alert',
    message: 'Heavy rainfall expected tomorrow. Protect your crops and delay harvesting.',
    time: '30 min ago',
    icon: CloudRain,
    color: 'blue',
    unread: true
  },
  {
    id: 2,
    type: 'market',
    title: 'Rice Price Up!',
    message: 'Rice price increased by ₹60/quintal. Good time to sell.',
    time: '2 hours ago',
    icon: TrendingUp,
    color: 'green',
    unread: true
  },
  {
    id: 3,
    type: 'soil',
    title: 'Irrigation Reminder',
    message: 'Soil moisture is low. Water your crops soon for optimal growth.',
    time: '5 hours ago',
    icon: Droplets,
    color: 'amber',
    unread: true
  },
  {
    id: 4,
    type: 'finance',
    title: 'EMI Due in 5 Days',
    message: 'Your loan EMI of ₹12,500 is due on Feb 15. Pay on time to avoid penalties.',
    time: '1 day ago',
    icon: Calendar,
    color: 'red',
    unread: false
  },
  {
    id: 5,
    type: 'market',
    title: 'New Bid on Cotton',
    message: 'Ramesh Traders placed a bid of ₹6,900/quintal for Cotton.',
    time: '2 days ago',
    icon: TrendingUp,
    color: 'green',
    unread: false
  },
];

export default function Notifications() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const colorClasses = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
    green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
    amber: { bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-200' },
    red: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-stone-100">
        <div className="px-5 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(createPageUrl('Home'))}
              className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-stone-600" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-stone-800">{t('alerts')}</h1>
              <p className="text-sm text-stone-500">{notifications.filter(n => n.unread).length} unread</p>
            </div>
            <button className="text-sm text-green-600 font-medium">
              Mark all read
            </button>
          </div>
        </div>
      </header>

      <main className="px-5 py-4">
        <div className="space-y-3">
          {notifications.map((notif, index) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-2xl border p-4 ${
                notif.unread ? `${colorClasses[notif.color].border} border-l-4` : 'border-stone-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClasses[notif.color].bg}`}>
                  <notif.icon className={`w-5 h-5 ${colorClasses[notif.color].text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`font-semibold ${notif.unread ? 'text-stone-800' : 'text-stone-600'}`}>
                      {notif.title}
                    </h3>
                    {notif.unread && (
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                    )}
                  </div>
                  <p className={`text-sm mt-1 ${notif.unread ? 'text-stone-600' : 'text-stone-500'}`}>
                    {notif.message}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-stone-400">
                    <Clock className="w-3 h-3" />
                    <span>{notif.time}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}