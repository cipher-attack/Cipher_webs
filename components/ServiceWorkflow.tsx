import React, { useState } from 'react';
import { WorkflowStep, Language } from '../types';
import { WORKFLOW_STEPS } from '../constants';
import { Search, Code, Terminal, FileText, ChevronRight, Lock, Target } from 'lucide-react';

interface Props {
  lang: Language;
}

export const ServiceWorkflow: React.FC<Props> = ({ lang }) => {
  const [activeStepId, setActiveStepId] = useState<string>('recon');
  const steps = WORKFLOW_STEPS[lang];

  const activeStep = steps.find(s => s.id === activeStepId) || steps[0];

  const getIcon = (iconName: string, isActive: boolean) => {
    const className = `w-6 h-6 ${isActive ? 'text-black dark:text-black' : 'text-gray-500 dark:text-white/50'}`;
    switch(iconName) {
      case 'search': return <Search className={className} />;
      case 'code': return <Code className={className} />;
      case 'terminal': return <Terminal className={className} />;
      case 'file-text': return <FileText className={className} />;
      default: return <Lock className={className} />;
    }
  };

  return (
    <div className="w-full">
      {/* Desktop Pipeline Visualization */}
      <div className="hidden lg:flex justify-between items-center mb-16 relative px-10">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-white/10 -z-10 transform -translate-y-1/2"></div>
        <div 
           className="absolute top-1/2 left-0 h-1 bg-green-500 -z-10 transform -translate-y-1/2 transition-all duration-700 ease-in-out"
           style={{ 
             width: `${(steps.findIndex(s => s.id === activeStepId) / (steps.length - 1)) * 100}%` 
           }}
        ></div>

        {steps.map((step, index) => {
          const isActive = step.id === activeStepId;
          const isPassed = steps.findIndex(s => s.id === activeStepId) >= index;

          return (
            <button
              key={step.id}
              onClick={() => setActiveStepId(step.id)}
              className={`relative group flex flex-col items-center focus:outline-none`}
            >
              <div 
                className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-300 z-10 ${
                  isActive 
                    ? 'bg-green-500 border-green-400 scale-110 shadow-[0_0_20px_rgba(34,197,94,0.6)]' 
                    : isPassed 
                      ? 'bg-green-900 border-green-700 scale-100'
                      : 'bg-white dark:bg-black border-gray-200 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/40'
                }`}
              >
                {getIcon(step.icon, isActive)}
              </div>
              <div className={`mt-4 font-mono text-sm font-bold transition-colors duration-300 ${isActive ? 'text-green-500' : 'text-gray-400 dark:text-white/40'}`}>
                0{index + 1}
              </div>
              <div className={`text-sm font-bold transition-colors duration-300 ${isActive ? 'text-black dark:text-white' : 'text-gray-400 dark:text-white/40'}`}>
                {step.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile Selector */}
      <div className="flex lg:hidden overflow-x-auto gap-4 mb-8 pb-4 no-scrollbar">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => setActiveStepId(step.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-all ${
              step.id === activeStepId 
                ? 'bg-green-500 border-green-500 text-black' 
                : 'bg-transparent border-gray-200 dark:border-white/20 text-gray-500 dark:text-white/60'
            }`}
          >
             {index + 1}. {step.title}
          </button>
        ))}
      </div>

      {/* Detail Panel */}
      <div className="grid lg:grid-cols-2 gap-12 items-center animate-in slide-in-from-bottom-5 duration-500" key={activeStepId}>
         {/* Text Info */}
         <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs font-mono uppercase tracking-wider">
               <Target size={12} /> Phase 0{steps.findIndex(s => s.id === activeStepId) + 1}
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {activeStep.title}
            </h3>
            
            <h4 className="text-xl text-green-600 dark:text-green-400 font-medium">
              {activeStep.shortDesc}
            </h4>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed border-l-4 border-gray-200 dark:border-white/10 pl-6">
              {activeStep.fullDesc}
            </p>

            <div className="pt-4">
              <button className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white hover:text-green-500 dark:hover:text-green-400 transition-colors group">
                Learn technical details <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
         </div>

         {/* Visual/Graphic Representation */}
         <div className="relative h-80 rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 overflow-hidden flex items-center justify-center group">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-grid opacity-20"></div>
            
            {/* Animated Circles based on step */}
            <div className="relative z-10">
               {activeStepId === 'recon' && (
                  <div className="relative">
                     <Search size={64} className="text-gray-400 dark:text-white/20" />
                     <div className="absolute inset-0 animate-ping opacity-30 border-2 border-green-500 rounded-full h-full w-full scale-150"></div>
                     <div className="absolute top-[-20px] right-[-20px] w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
               )}
               {activeStepId === 'weaponization' && (
                  <div className="flex gap-4 items-center">
                     <div className="w-16 h-20 bg-gray-300 dark:bg-white/10 rounded border border-gray-400 dark:border-white/20 flex items-center justify-center">
                        <Code className="text-gray-500 dark:text-white/30" />
                     </div>
                     <ChevronRight className="animate-pulse text-green-500" />
                     <div className="w-16 h-20 bg-red-500/20 rounded border border-red-500/50 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-red-500/10 animate-[pulse_2s_infinite]"></div>
                        <Target className="text-red-500" />
                     </div>
                  </div>
               )}
               {activeStepId === 'delivery' && (
                  <div className="w-64 h-40 bg-black rounded-lg border border-green-500/50 p-4 font-mono text-xs text-green-500 shadow-[0_0_30px_rgba(0,255,0,0.1)]">
                     <div className="mb-2 border-b border-green-900 pb-1 flex justify-between">
                        <span>root@target:~#</span>
                     </div>
                     <div className="space-y-1">
                        <p>> initiating exploit...</p>
                        <p>> bypassing firewall [OK]</p>
                        <p>> injecting payload...</p>
                        <p className="animate-pulse">> access granted_</p>
                     </div>
                  </div>
               )}
               {activeStepId === 'reporting' && (
                  <div className="relative w-48 h-56 bg-white dark:bg-gray-800 rounded shadow-2xl transform rotate-[-5deg] transition-transform group-hover:rotate-0">
                     <div className="h-4 bg-green-500 w-full"></div>
                     <div className="p-4 space-y-3">
                        <div className="h-2 w-3/4 bg-gray-200 dark:bg-white/10 rounded"></div>
                        <div className="h-2 w-1/2 bg-gray-200 dark:bg-white/10 rounded"></div>
                        <div className="h-24 w-full bg-gray-100 dark:bg-white/5 rounded border border-dashed border-gray-300 dark:border-white/10 flex items-center justify-center">
                           <div className="w-16 h-16 rounded-full border-4 border-green-500 border-t-transparent animate-spin"></div>
                        </div>
                     </div>
                     <div className="absolute -right-4 -bottom-4 bg-green-500 text-black font-bold px-3 py-1 rounded text-xs shadow-lg">
                        A+ GRADE
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};