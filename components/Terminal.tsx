import React, { useEffect, useState } from 'react';

const COMMANDS = [
  'initializing secure connection...',
  'loading modules: [crypto, net, fs]...',
  'accessing mainframe...',
  'bypassing firewall...',
  'access granted.',
  'welcome to CIPHER.'
];

export const Terminal: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentCmdIndex, setCurrentCmdIndex] = useState(0);

  useEffect(() => {
    if (currentCmdIndex >= COMMANDS.length) return;

    const timeout = setTimeout(() => {
      setLines(prev => [...prev, COMMANDS[currentCmdIndex]]);
      setCurrentCmdIndex(prev => prev + 1);
    }, 800);

    return () => clearTimeout(timeout);
  }, [currentCmdIndex]);

  return (
    <div className="w-full max-w-md mx-auto glass rounded-lg overflow-hidden border border-white/10 shadow-2xl font-mono text-xs sm:text-sm">
      <div className="bg-white/5 p-2 flex items-center gap-2 border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        <span className="ml-2 text-white/30">root@cipher-server:~</span>
      </div>
      <div className="p-4 h-64 text-green-400 overflow-y-auto">
        {lines.map((line, i) => (
          <div key={i} className="mb-1">
            <span className="text-white/50 mr-2">$</span>
            {line}
          </div>
        ))}
        <div className="animate-pulse inline-block w-2 h-4 bg-green-500 align-middle ml-1"></div>
      </div>
    </div>
  );
};
