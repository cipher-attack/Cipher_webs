import React from 'react';
import { Language } from '../types';
import { Globe } from 'lucide-react';

interface Props {
  currentLang: Language;
  onToggle: (lang: Language) => void;
}

export const LanguageSwitcher: React.FC<Props> = ({ currentLang, onToggle }) => {
  return (
    <button
      onClick={() => onToggle(currentLang === Language.EN ? Language.AM : Language.EN)}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-sm font-mono text-secondary hover:text-white"
    >
      <Globe size={14} />
      <span>{currentLang === Language.EN ? 'EN' : 'አማ'}</span>
    </button>
  );
};