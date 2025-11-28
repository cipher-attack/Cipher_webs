import React, { useEffect, useState } from 'react';
import { Activity, Wifi, Cpu, HardDrive, Globe, Smartphone, MapPin } from 'lucide-react';

interface NetworkInfo {
  ip: string;
  city: string;
  country: string;
  isp: string;
}

export const SystemMonitor: React.FC = () => {
  const [stats, setStats] = useState({
    cpu: 12,
    mem: 45,
    net: 120
  });
  
  const [netInfo, setNetInfo] = useState<NetworkInfo | null>(null);
  const [history, setHistory] = useState<number[]>(new Array(20).fill(10));
  const [deviceInfo, setDeviceInfo] = useState('');

  useEffect(() => {
    // Device Fingerprinting
    const ua = navigator.userAgent;
    let browser = "Unknown";
    if (ua.indexOf("Chrome") > -1) browser = "Chrome";
    else if (ua.indexOf("Safari") > -1) browser = "Safari";
    else if (ua.indexOf("Firefox") > -1) browser = "Firefox";
    
    const os = navigator.platform;
    setDeviceInfo(`${browser} / ${os}`);

    // IP Fetch
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setNetInfo({
          ip: data.ip,
          city: data.city,
          country: data.country_code,
          isp: data.org
        });
      })
      .catch(() => {
        setNetInfo({
          ip: '127.0.0.1',
          city: 'Localhost',
          country: 'XX',
          isp: 'Private Network'
        });
      });

    // Stats Animation
    const interval = setInterval(() => {
      setStats(prev => ({
        cpu: Math.min(100, Math.max(5, prev.cpu + (Math.random() - 0.5) * 20)),
        mem: Math.min(100, Math.max(20, prev.mem + (Math.random() - 0.5) * 5)),
        net: Math.max(0, prev.net + (Math.random() - 0.5) * 50)
      }));

      setHistory(prev => {
        const next = [...prev.slice(1), Math.random() * 50];
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-30 hidden xl:flex flex-col gap-2 p-4 bg-white/80 dark:bg-black/80 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-xl w-72 shadow-2xl font-mono text-[10px] text-gray-900 dark:text-gray-200">
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-black/10 dark:border-white/10">
         <span className="text-gray-500 dark:text-white/50 font-bold">SYSTEM_MONITOR</span>
         <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
         </div>
      </div>

      <div className="space-y-3">
        {/* Network Info */}
        <div className="bg-black/5 dark:bg-white/5 p-2 rounded mb-2 space-y-1">
           <div className="flex items-center gap-2 text-gray-500 dark:text-white/50">
             <Globe size={10} /> 
             <span className="text-gray-900 dark:text-white">{netInfo ? netInfo.ip : 'Scanning...'}</span>
           </div>
           {netInfo && (
             <>
               <div className="flex items-center gap-2 text-gray-500 dark:text-white/50 truncate">
                 <MapPin size={10} /> 
                 <span>{netInfo.city}, {netInfo.country}</span>
               </div>
               <div className="flex items-center gap-2 text-gray-500 dark:text-white/50 truncate">
                 <Wifi size={10} /> 
                 <span>{netInfo.isp}</span>
               </div>
             </>
           )}
           <div className="flex items-center gap-2 text-gray-500 dark:text-white/50 truncate border-t border-black/5 dark:border-white/5 pt-1 mt-1">
             <Smartphone size={10} />
             <span>{deviceInfo}</span>
           </div>
        </div>

        {/* CPU */}
        <div>
          <div className="flex justify-between text-gray-500 dark:text-white/70 mb-1">
            <span className="flex items-center gap-2"><Cpu size={10} /> CPU_LOAD</span>
            <span className={stats.cpu > 80 ? 'text-red-500' : 'text-green-600 dark:text-green-400'}>{stats.cpu.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-black/10 dark:bg-white/10 h-1 rounded-full overflow-hidden">
            <div className="h-full bg-current text-green-500 transition-all duration-500" style={{ width: `${stats.cpu}%` }}></div>
          </div>
        </div>

        {/* MEMORY */}
        <div>
           <div className="flex justify-between text-gray-500 dark:text-white/70 mb-1">
            <span className="flex items-center gap-2"><HardDrive size={10} /> MEM_ALLOC</span>
            <span className="text-blue-500 dark:text-blue-400">{stats.mem.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-black/10 dark:bg-white/10 h-1 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${stats.mem}%` }}></div>
          </div>
        </div>

        {/* NETWORK GRAPH */}
        <div className="pt-1">
           <div className="flex justify-between text-gray-500 dark:text-white/70 mb-1">
             <span className="flex items-center gap-2"><Activity size={10} /> LATENCY</span>
             <span>{stats.net.toFixed(0)} ms</span>
           </div>
           <div className="flex items-end h-8 gap-[2px] opacity-50">
             {history.map((h, i) => (
                <div key={i} className="flex-1 bg-green-500" style={{ height: `${h}%` }}></div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};
