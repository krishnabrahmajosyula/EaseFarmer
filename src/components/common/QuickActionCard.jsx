import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function QuickActionCard({ icon: Icon, title, subtitle, to, color = "green" }) {
  const colorClasses = {
    green: "bg-green-50 text-green-700 border-green-100",
    orange: "bg-orange-50 text-orange-700 border-orange-100",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    stone: "bg-stone-50 text-stone-700 border-stone-100",
  };

  const iconBgClasses = {
    green: "bg-green-100",
    orange: "bg-orange-100",
    blue: "bg-blue-100",
    amber: "bg-amber-100",
    stone: "bg-stone-100",
  };

  return (
    <Link
      to={to}
      className={`flex items-center p-4 rounded-2xl border-2 ${colorClasses[color]} transition-all active:scale-[0.98] hover:shadow-md`}
    >
      <div className={`w-12 h-12 rounded-xl ${iconBgClasses[color]} flex items-center justify-center mr-4 flex-shrink-0`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-base truncate">{title}</h3>
        {subtitle && (
          <p className="text-sm opacity-75 truncate">{subtitle}</p>
        )}
      </div>
      <ChevronRight className="w-5 h-5 opacity-50 flex-shrink-0" />
    </Link>
  );
}