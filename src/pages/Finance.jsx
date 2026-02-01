import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, CreditCard, Calendar, AlertTriangle, ChevronRight, Building2, Landmark, FileText, Bell, Shield, Percent } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';
import { createPageUrl } from '@/utils';
import BottomNav from '@/components/common/BottomNav';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const loans = [
  {
    id: 1,
    name: 'Kisan Credit Card',
    provider: 'State Bank of India',
    amountBorrowed: 150000,
    amountRemaining: 85000,
    interestRate: 4,
    emiAmount: 12500,
    nextEmiDate: '2024-02-15',
    status: 'active'
  },
  {
    id: 2,
    name: 'Crop Loan',
    provider: 'District Cooperative Bank',
    amountBorrowed: 75000,
    amountRemaining: 32000,
    interestRate: 3,
    emiAmount: 8500,
    nextEmiDate: '2024-02-20',
    status: 'active'
  },
];

const govtSchemes = [
  {
    id: 1,
    name: 'PM-KISAN',
    description: 'Direct income support of ₹6,000/year',
    icon: Landmark,
    color: 'green'
  },
  {
    id: 2,
    name: 'PM Fasal Bima Yojana',
    description: 'Crop insurance at low premium',
    icon: Shield,
    color: 'blue'
  },
  {
    id: 3,
    name: 'Interest Subvention',
    description: 'Reduced interest on crop loans',
    icon: Percent,
    color: 'amber'
  },
];

const bankLoans = [
  {
    id: 1,
    name: 'Kisan Credit Card',
    provider: 'Multiple Banks',
    interestRate: '4% p.a.',
    maxAmount: '₹3 Lakhs',
    icon: CreditCard
  },
  {
    id: 2,
    name: 'Agri Gold Loan',
    provider: 'SBI / HDFC',
    interestRate: '7% p.a.',
    maxAmount: '₹10 Lakhs',
    icon: Building2
  },
];

export default function Finance() {
  const { t } = useLanguage();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getDaysUntil = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const diff = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-stone-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-stone-100">
        <div className="px-5 py-4">
          <h1 className="text-2xl font-bold text-stone-800">{t('financeManager')}</h1>
        </div>
      </header>

      <main className="px-5 py-6 space-y-6">
        {/* Your Loans */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-semibold text-stone-800 mb-3">{t('loans')}</h2>
          <div className="space-y-3">
            {loans.map((loan) => {
              const daysUntil = getDaysUntil(loan.nextEmiDate);
              const isUrgent = daysUntil <= 7;
              
              return (
                <div 
                  key={loan.id}
                  className="bg-white rounded-2xl border border-stone-100 p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-stone-800">{loan.name}</h3>
                        <p className="text-sm text-stone-500">{loan.provider}</p>
                      </div>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full capitalize">
                      {loan.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-stone-500">{t('amountBorrowed')}</p>
                      <p className="font-semibold text-stone-800">₹{loan.amountBorrowed.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-stone-500">Remaining</p>
                      <p className="font-semibold text-stone-800">₹{loan.amountRemaining.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-stone-500">{t('interestRate')}</p>
                      <p className="font-semibold text-stone-800">{loan.interestRate}% p.a.</p>
                    </div>
                    <div>
                      <p className="text-xs text-stone-500">EMI Amount</p>
                      <p className="font-semibold text-stone-800">₹{loan.emiAmount.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-stone-500">Paid</span>
                      <span className="text-stone-500">
                        {Math.round(((loan.amountBorrowed - loan.amountRemaining) / loan.amountBorrowed) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${((loan.amountBorrowed - loan.amountRemaining) / loan.amountBorrowed) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Next EMI */}
                  <div className={`p-3 rounded-xl flex items-center gap-3 ${
                    isUrgent ? 'bg-red-50 border border-red-200' : 'bg-amber-50 border border-amber-200'
                  }`}>
                    {isUrgent ? (
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    ) : (
                      <Calendar className="w-5 h-5 text-amber-600" />
                    )}
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${isUrgent ? 'text-red-800' : 'text-amber-800'}`}>
                        {t('nextEMI')}: {formatDate(loan.nextEmiDate)}
                      </p>
                      <p className={`text-xs ${isUrgent ? 'text-red-600' : 'text-amber-600'}`}>
                        {daysUntil} days remaining
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      className={`rounded-lg ${isUrgent ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-600 hover:bg-amber-700'}`}
                    >
                      Pay Now
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Government Schemes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="font-semibold text-stone-800 mb-3">{t('govtSchemes')}</h2>
          <div className="space-y-2">
            {govtSchemes.map((scheme) => (
              <div 
                key={scheme.id}
                className="bg-white rounded-2xl border border-stone-100 p-4 flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  scheme.color === 'green' ? 'bg-green-100' :
                  scheme.color === 'blue' ? 'bg-blue-100' : 'bg-amber-100'
                }`}>
                  <scheme.icon className={`w-6 h-6 ${
                    scheme.color === 'green' ? 'text-green-600' :
                    scheme.color === 'blue' ? 'text-blue-600' : 'text-amber-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-stone-800">{scheme.name}</h3>
                  <p className="text-sm text-stone-500">{scheme.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-stone-400" />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Bank Loan Options */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-semibold text-stone-800 mb-3">{t('bankLoans')}</h2>
          <div className="space-y-2">
            {bankLoans.map((loan) => (
              <div 
                key={loan.id}
                className="bg-white rounded-2xl border border-stone-100 p-4"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <loan.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-stone-800">{loan.name}</h3>
                    <p className="text-sm text-stone-500">{loan.provider}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-stone-50 rounded-xl p-3">
                  <div>
                    <p className="text-xs text-stone-500">Interest Rate</p>
                    <p className="font-semibold text-stone-800">{loan.interestRate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-stone-500">Max Amount</p>
                    <p className="font-semibold text-stone-800">{loan.maxAmount}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-3 rounded-xl">
                  Apply Now
                </Button>
              </div>
            ))}
          </div>
        </motion.section>
      </main>

      <BottomNav />
    </div>
  );
}