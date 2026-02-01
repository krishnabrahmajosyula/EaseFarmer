import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, Phone, Lock, ShieldCheck, User, ChevronRight, Tractor, Building2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from '@/components/ui/LanguageContext';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Auth() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [step, setStep] = useState('phone'); // phone, otp, role
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [role, setRole] = useState('farmer');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = () => {
    if (phone.length === 10) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep('otp');
      }, 1000);
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep('role');
      }, 1000);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('easefarmer_logged_in', 'true');
    localStorage.setItem('easefarmer_role', role);
    localStorage.setItem('easefarmer_phone', phone);
    navigate(createPageUrl('Home'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-amber-50 flex flex-col">
      {/* Header */}
      <div className="p-6 flex items-center justify-center pt-12">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center shadow-lg shadow-green-200">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-green-800">EaseFarmer</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center p-6">
        <AnimatePresence mode="wait">
          {step === 'phone' && (
            <motion.div
              key="phone"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-stone-800 mb-2">{t('login')}</h1>
                <p className="text-stone-600">{t('enterPhone')}</p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-stone-500">
                    <span className="text-lg">🇮🇳</span>
                    <span className="font-medium">+91</span>
                    <div className="w-px h-6 bg-stone-300" />
                  </div>
                  <Input
                    type="tel"
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="h-14 pl-24 text-lg rounded-2xl border-2 border-stone-200 focus:border-green-500 bg-white"
                  />
                </div>

                <Button
                  onClick={handleSendOTP}
                  disabled={phone.length !== 10 || loading}
                  className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-2xl text-lg font-semibold shadow-lg shadow-green-200 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      {t('sendOTP')}
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'otp' && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-amber-600" />
                </div>
                <h1 className="text-2xl font-bold text-stone-800 mb-2">{t('enterOTP')}</h1>
                <p className="text-stone-600">{t('otpSent')}</p>
                <p className="text-green-600 font-medium mt-1">+91 {phone}</p>
              </div>

              <div className="space-y-4">
                <Input
                  type="tel"
                  placeholder="• • • • • •"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="h-14 text-center text-2xl tracking-[0.5em] rounded-2xl border-2 border-stone-200 focus:border-green-500 bg-white"
                />

                <Button
                  onClick={handleVerifyOTP}
                  disabled={otp.length !== 6 || loading}
                  className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-2xl text-lg font-semibold shadow-lg shadow-green-200 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      {t('verify')}
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                <button 
                  onClick={() => setStep('phone')}
                  className="w-full text-center text-green-600 font-medium py-2"
                >
                  Change number
                </button>
              </div>
            </motion.div>
          )}

          {step === 'role' && (
            <motion.div
              key="role"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-stone-800 mb-2">{t('selectRole')}</h1>
              </div>

              <div className="space-y-3">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setRole('farmer')}
                  className={`w-full p-5 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                    role === 'farmer'
                      ? 'border-green-500 bg-green-50'
                      : 'border-stone-200 bg-white'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    role === 'farmer' ? 'bg-green-100' : 'bg-stone-100'
                  }`}>
                    <Tractor className={`w-7 h-7 ${role === 'farmer' ? 'text-green-600' : 'text-stone-500'}`} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-lg text-stone-800">{t('farmer')}</p>
                    <p className="text-sm text-stone-500">Sell crops, check prices, manage farm</p>
                  </div>
                  {role === 'farmer' && (
                    <div className="ml-auto w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                  )}
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setRole('trader')}
                  className={`w-full p-5 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                    role === 'trader'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-stone-200 bg-white'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    role === 'trader' ? 'bg-blue-100' : 'bg-stone-100'
                  }`}>
                    <Building2 className={`w-7 h-7 ${role === 'trader' ? 'text-blue-600' : 'text-stone-500'}`} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-lg text-stone-800">{t('trader')}</p>
                    <p className="text-sm text-stone-500">Buy crops, place bids, connect with farmers</p>
                  </div>
                  {role === 'trader' && (
                    <div className="ml-auto w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                  )}
                </motion.button>
              </div>

              <Button
                onClick={handleComplete}
                className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-2xl text-lg font-semibold shadow-lg shadow-green-200 mt-6"
              >
                {t('continue')}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Trust Badge */}
      <div className="p-6 pb-8">
        <div className="flex items-center justify-center gap-2 text-stone-500">
          <ShieldCheck className="w-5 h-5 text-green-600" />
          <span className="text-sm">{t('dataSecure')}</span>
        </div>
      </div>
    </div>
  );
}