import React, { useRef } from 'react';
import { ExternalLink, Layers, ArrowLeft } from 'lucide-react';
import { PROJECTS } from '../constants';

interface Props {
  t: any;
  onBack: () => void;
}

const SpotlightCard: React.FC<{ children: React.ReactNode; className?: string; href: string }> = ({ children, className = "", href }) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block h-full overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F0F0F] hover:border-gray-300 dark:hover:border-white/20 transition-all shadow-xl dark:shadow-none ${className}`}
      onMouseMove={handleMouseMove}
    >
      <div 
        ref={divRef}
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden dark:block"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(0, 255, 157, 0.1), transparent 40%)`,
        }}
      />
      <div className="relative h-full p-6 z-10">
        {children}
      </div>
    </a>
  );
};

export const Projects: React.FC<Props> = ({ t, onBack }) => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-gray-500 dark:text-white/50 hover:text-black dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div className="mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:via-white dark:to-white/50">
            {t.title}
          </h1>
          <p className="text-gray-600 dark:text-secondary max-w-2xl text-lg">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <SpotlightCard key={idx} href={project.link}>
              <div className="flex flex-col h-full">
                {/* Decorative Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center border border-gray-200 dark:border-white/5 group-hover:border-green-500/50 transition-colors">
                    <Layers className="text-gray-500 dark:text-white/70 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" size={24} />
                  </div>
                  <ExternalLink className="text-gray-400 dark:text-white/30 group-hover:text-black dark:group-hover:text-white transition-colors" size={20} />
                </div>

                {/* Content */}
                <div className="space-y-4 mb-8 flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-base text-gray-600 dark:text-secondary leading-relaxed">
                    {project.desc}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-gray-500 dark:text-white/60 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </div>
  );
};
