import React from 'react';
import { Droplets } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function SoilMoistureGauge({ moisture = 50, compact = false }) {
  const { t } = useLanguage();
  
  const getStatus = () => {
    if (moisture < 30) return { label: t('low'), color: 'red', action: t('irrigateNow') };
    if (moisture < 70) return { label: t('optimal'), color: 'green', action: t('waitHours') };
    return { label: t('high'), color: 'blue', action: t('waitHours') };
  };

  const status = getStatus();
  
  const colorClasses = {
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      fill: 'bg-gradient-to-r from-red-400 to-red-500',
      text: 'text-red-700',
      icon: 'bg-red-100 text-red-600'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      fill: 'bg-gradient-to-r from-green-400 to-green-500',
      text: 'text-green-700',
      icon: 'bg-green-100 text-green-600'
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      fill: 'bg-gradient-to-r from-blue-400 to-blue-500',
      text: 'text-blue-700',
      icon: 'bg-blue-100 text-blue-600'
    }
  };

  const colors = colorClasses[status.color];

  if (compact) {
    return (
      <div className={`flex items-center gap-3 p-4 ${colors.bg} rounded-2xl border ${colors.border}`}>
        <div className={`w-10 h-10 rounded-xl ${colors.icon} flex items-center justify-center`}>
          <Droplets className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-stone-600">{t('soilMoisture')}</span>
            <span className={`text-sm font-bold ${colors.text}`}>{moisture}%</span>
          </div>
          <div className="h-2 bg-white/80 rounded-full overflow-hidden">
            <div 
              className={`h-full ${colors.fill} rounded-full transition-all duration-500`}
              style={{ width: `${moisture}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${colors.bg} rounded-3xl p-6 border ${colors.border}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl ${colors.icon} flex items-center justify-center`}>
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-stone-800">{t('soilMoisture')}</h3>
            <p className={`text-sm font-medium ${colors.text}`}>{status.label}</p>
          </div>
        </div>
        <div className="text-right">
          <span className={`text-3xl font-bold ${colors.text}`}>{moisture}%</span>
        </div>
      </div>
      
      <div className="h-4 bg-white/80 rounded-full overflow-hidden mb-4">
        <div 
          className={`h-full ${colors.fill} rounded-full transition-all duration-500`}
          style={{ width: `${moisture}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-stone-500">0%</span>
        <span className="text-xs text-stone-500">100%</span>
      </div>

      <div className={`mt-4 p-3 bg-white/60 rounded-xl ${colors.text}`}>
        <p className="text-sm font-medium">💡 {status.action}</p>
      </div>
    </div>
  );
}