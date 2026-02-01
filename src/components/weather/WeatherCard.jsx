import React from 'react';
import { Sun, Cloud, CloudRain, Wind, Droplets } from 'lucide-react';

export default function WeatherCard({ temperature, condition, humidity, windSpeed, rainChance, compact = false }) {
//   const getWeatherIcon = () => {
//     if (rainChance > 60) return CloudRain;
//     if (rainChance > 30) return Cloud;
//     return Sun;
//   };

//   const WeatherIcon = getWeatherIcon();
    const WeatherIcon = React.useMemo(() => {
    if (rainChance > 60) return CloudRain;
    if (rainChance > 30) return Cloud;
    return Sun;
    }, [rainChance]);

  
  const getWeatherColor = () => {
    if (rainChance > 60) return "text-blue-600";
    if (rainChance > 30) return "text-stone-500";
    return "text-amber-500";
  };

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100">
        <div className={`w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center ${getWeatherColor()}`}>
          <WeatherIcon className="w-7 h-7" />
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-stone-800">{temperature}°</span>
            <span className="text-sm text-stone-500">{condition}</span>
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-stone-600">
            <span className="flex items-center gap-1">
              <Droplets className="w-3 h-3" /> {rainChance}%
            </span>
            <span className="flex items-center gap-1">
              <Wind className="w-3 h-3" /> {windSpeed} km/h
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-3xl p-6 border border-amber-100">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-stone-800">{temperature}°</span>
            <span className="text-lg text-stone-500">C</span>
          </div>
          <p className="text-stone-600 mt-1 text-lg">{condition}</p>
        </div>
        <div className={`w-20 h-20 rounded-2xl bg-white/60 flex items-center justify-center ${getWeatherColor()}`}>
          <WeatherIcon className="w-12 h-12" />
        </div>
      </div>
      
      <div className="flex items-center gap-6 mt-6 pt-4 border-t border-amber-200/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <Droplets className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-stone-500">Rain</p>
            <p className="font-semibold text-stone-800">{rainChance}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center">
            <Wind className="w-4 h-4 text-stone-600" />
          </div>
          <div>
            <p className="text-xs text-stone-500">Wind</p>
            <p className="font-semibold text-stone-800">{windSpeed} km/h</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
            <Droplets className="w-4 h-4 text-cyan-600" />
          </div>
          <div>
            <p className="text-xs text-stone-500">Humidity</p>
            <p className="font-semibold text-stone-800">{humidity}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}