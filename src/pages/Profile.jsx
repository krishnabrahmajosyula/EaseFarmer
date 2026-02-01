import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Globe, Bell, Wifi, HelpCircle, LogOut, ChevronRight, Moon, Sprout, Phone, MapPin, Check } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';
import { createPageUrl } from '@/utils';
import BottomNav from '@/components/common/BottomNav';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
];

export default function Profile() {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const [notifications, setNotifications] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  
  const phone = localStorage.getItem('easefarmer_phone') || '9876543210';
  const role = localStorage.getItem('easefarmer_role') || 'farmer';

  const handleLogout = () => {
    localStorage.removeItem('easefarmer_logged_in');
    localStorage.removeItem('easefarmer_role');
    localStorage.removeItem('easefarmer_phone');
    navigate(createPageUrl('Onboarding'));
  };

  const settingsItems = [
    {
      icon: Globe,
      title: t('changeLanguage'),
      subtitle: languages.find(l => l.code === language)?.nativeName,
      onClick: () => setShowLanguageModal(true),
      color: 'blue'
    },
    {
      icon: Bell,
      title: t('notifications'),
      subtitle: notifications ? 'Enabled' : 'Disabled',
      toggle: true,
      value: notifications,
      onChange: setNotifications,
      color: 'amber'
    },
    {
      icon: Wifi,
      title: t('iotStatus'),
      subtitle: t('connected'),
      color: 'green'
    },
    {
      icon: HelpCircle,
      title: t('helpSupport'),
      subtitle: 'FAQs, Contact us',
      color: 'purple'
    },
  ];

  const colorClasses = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    amber: { bg: 'bg-amber-100', text: 'text-amber-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-stone-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-stone-100">
        <div className="px-5 py-4">
          <h1 className="text-2xl font-bold text-stone-800">{t('profile')}</h1>
        </div>
      </header>

      <main className="px-5 py-6 space-y-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-500 to-green-700 rounded-3xl p-6 text-white"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Anirudh Kumar</h2>
              <p className="text-green-100 capitalize">{role}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-green-100">
              <Phone className="w-4 h-4" />
              <span>+91 {phone}</span>
            </div>
            <div className="flex items-center gap-2 text-green-100">
              <MapPin className="w-4 h-4" />
              <span>Warangal, Telangana</span>
            </div>
          </div>
        </motion.div>

        {/* Settings */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="font-semibold text-stone-800 mb-3">{t('settings')}</h2>
          <div className="bg-white rounded-2xl border border-stone-100 divide-y divide-stone-100">
            {settingsItems.map((item, index) => (
              <div 
                key={index}
                onClick={item.toggle ? undefined : item.onClick}
                className={`flex items-center gap-4 p-4 ${item.onClick ? 'cursor-pointer active:bg-stone-50' : ''}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClasses[item.color].bg}`}>
                  <item.icon className={`w-5 h-5 ${colorClasses[item.color].text}`} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-stone-800">{item.title}</p>
                  <p className="text-sm text-stone-500">{item.subtitle}</p>
                </div>
                {item.toggle ? (
                  <Switch 
                    checked={item.value} 
                    onCheckedChange={item.onChange}
                  />
                ) : (
                  <ChevronRight className="w-5 h-5 text-stone-400" />
                )}
              </div>
            ))}
          </div>
        </motion.section>

        {/* App Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Sprout className="w-4 h-4 text-green-600" />
            </div>
            <span className="font-semibold text-stone-800">EaseFarmer</span>
          </div>
          <p className="text-sm text-stone-500">Version 1.0.0</p>
          <p className="text-xs text-stone-400 mt-1">NSS Socially Relevant Project</p>
        </motion.section>

        {/* Logout */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="w-full h-14 rounded-2xl border-red-200 text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5 mr-2" />
            {t('logout')}
          </Button>
        </motion.section>
      </main>

      {/* Language Modal */}
      <AnimatePresence>
        {showLanguageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center"
            onClick={() => setShowLanguageModal(false)}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl w-full max-w-lg p-6 pb-8"
            >
              <div className="w-12 h-1 bg-stone-300 rounded-full mx-auto mb-6" />
              <h2 className="text-xl font-bold text-stone-800 mb-4">{t('changeLanguage')}</h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLanguageModal(false);
                    }}
                    className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
                      language === lang.code
                        ? 'border-green-500 bg-green-50'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="text-left">
                      <p className="font-semibold text-stone-800">{lang.nativeName}</p>
                      <p className="text-sm text-stone-500">{lang.name}</p>
                    </div>
                    {language === lang.code && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}