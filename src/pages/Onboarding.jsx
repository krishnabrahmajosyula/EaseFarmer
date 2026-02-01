import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, ChevronRight, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/components/ui/LanguageContext';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [selectedLang, setSelectedLang] = useState(language);

  const handleContinue = () => {
    setLanguage(selectedLang);
    localStorage.setItem('easefarmer_onboarded', 'true');
    navigate(createPageUrl('Auth'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-amber-50 flex flex-col">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col items-center justify-center p-6 text-center"
      >
        {/* Logo */}
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-700 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-green-200"
        >
          <Sprout className="w-12 h-12 text-white" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-green-800 mb-2"
        >
          EaseFarmer
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-stone-600 text-lg"
        >
          {t('tagline')}
        </motion.p>
      </motion.div>

      {/* Language Selection */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-t-[2rem] shadow-[0_-4px_30px_rgba(0,0,0,0.08)] p-6 pb-8"
      >
        <div className="flex items-center gap-2 mb-6">
          <Globe className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-semibold text-stone-800">{t('selectLanguage')}</h2>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {languages.map((lang) => (
            <motion.button
              key={lang.code}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedLang(lang.code)}
              className={`p-4 rounded-2xl border-2 transition-all text-left ${
                selectedLang === lang.code
                  ? 'border-green-500 bg-green-50'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <span className="text-2xl mb-2 block">{lang.flag}</span>
              <p className="font-semibold text-stone-800">{lang.nativeName}</p>
              <p className="text-sm text-stone-500">{lang.name}</p>
            </motion.button>
          ))}
        </div>

        <p className="text-sm text-stone-500 text-center mb-6">
          {t('changeAnytime')}
        </p>

        <Button
          onClick={handleContinue}
          className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-2xl text-lg font-semibold shadow-lg shadow-green-200"
        >
          {t('continue')}
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}