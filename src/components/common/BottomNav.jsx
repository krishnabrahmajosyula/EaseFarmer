import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Store, Cloud, Wallet, User } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';
import { createPageUrl } from '@/utils';

export default function BottomNav() {
  const location = useLocation();
  const { t } = useLanguage();
  
  const navItems = [
    { icon: Home, label: t('home'), page: 'Home' },
    { icon: Store, label: t('market'), page: 'Market' },
    { icon: Cloud, label: t('weather'), page: 'Weather' },
    { icon: Wallet, label: t('finance'), page: 'Finance' },
    { icon: User, label: t('profile'), page: 'Profile' },
  ];

  const currentPath = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-2 pb-safe z-50">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const pagePath = createPageUrl(item.page);
          const isActive = currentPath === pagePath || 
                          (item.page === 'Home' && currentPath === '/');
          
          return (
            <Link
              key={item.page}
              to={pagePath}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all min-w-[64px] ${
                isActive 
                  ? 'text-green-700 bg-green-50' 
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <item.icon 
                className={`w-6 h-6 mb-1 ${isActive ? 'stroke-[2.5px]' : ''}`} 
              />
              <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}