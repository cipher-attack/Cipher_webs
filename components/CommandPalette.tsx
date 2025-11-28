import React, { useEffect, useState } from 'react';
import { Command, Search, Home, Folder, Terminal, Eye, Zap, ArrowRight, X } from 'lucide-react';
import { PageView } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageView) => void;
  onToggleMatrix: () => void;
  lang: string;
}

export const CommandPalette: React.FC<Props> = ({ isOpen, onClose, onNavigate, onToggleMatrix, lang }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const options = [
    { id: 'home', label: 'Go Home', icon: Home, action: () => onNavigate('home') },
    { id: 'projects', label: 'View Projects', icon: Folder, action: () => onNavigate('projects') },
    { id: 'tools', label: 'Open Cipher Tools', icon: Terminal, action: () => onNavigate('tools') },
    { id: 'matrix', label: 'Toggle Matrix Protocol', icon: Eye, action: onToggleMatrix },
    { id: 'scan', label: 'Run System Scan', icon: Zap, action: () => alert('Scan Initiated... System Secure.') }, 
  ];

  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredOptions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredOptions.length) % filteredOptions.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredOptions[selectedIndex]) {
          filteredOptions[selectedIndex].action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredOptions, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 dark:bg-black/80 backdrop-blur-sm flex items-start justify-center pt-[20vh] animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white dark:bg-[#0F0F0F] border border-gray-200 dark:border-white/20 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        
        <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-white/10">
          <Search className="w-5 h-5 text-gray-400 dark:text-white/50 mr-3" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command..."
            className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 font-mono text-sm h-6"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded">
            <X size={16} className="text-gray-500 dark:text-white/50" />
          </button>
        </div>

        <div className="py-2 max-h-[60vh] overflow-y-auto">
          {filteredOptions.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-400 dark:text-white/30 font-mono text-sm">
              No results found.
            </div>
          ) : (
            <div className="space-y-1 px-2">
              <div className="px-2 py-1 text-xs font-mono text-gray-400 dark:text-white/30 uppercase tracking-wider">Suggestions</div>
              {filteredOptions.map((opt, i) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    opt.action();
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-left transition-colors ${
                    i === selectedIndex ? 'bg-gray-100 dark:bg-green-500/20 text-black dark:text-green-400' : 'text-gray-600 dark:text-white/70 hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <opt.icon size={18} />
                    <span className="font-medium font-sans">{opt.label}</span>
                  </div>
                  {i === selectedIndex && <ArrowRight size={14} className="animate-pulse" />}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gray-50 dark:bg-white/5 px-4 py-2 border-t border-gray-200 dark:border-white/10 flex items-center justify-between text-[10px] text-gray-400 dark:text-white/40 font-mono">
           <div className="flex gap-3">
             <span>↑↓ Navigate</span>
             <span>↵ Select</span>
             <span>esc Close</span>
           </div>
           <div>CIPHER_CMD_v2.0</div>
        </div>
      </div>
    </div>
  );
};
