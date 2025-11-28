
import React, { useState, useEffect } from 'react';
import { Logo } from './components/Logo';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { ThemeToggle } from './components/ThemeToggle';
import { ChatBot } from './components/ChatBot';
import { Projects } from './components/Projects';
import { SocialIcon } from './components/SocialIcons';
import { GalaxyBackground } from './components/GalaxyBackground';
import { CommandPalette } from './components/CommandPalette';
import { EncryptionTool } from './components/EncryptionTool';
import { SystemMonitor } from './components/SystemMonitor';
import { MatrixRain } from './components/MatrixRain';
import { ServiceWorkflow } from './components/ServiceWorkflow';
import { VulnerabilityTicker } from './components/VulnerabilityTicker';
import { Language, PageView } from './types';
import { CONTENT, CREATOR_NAME, SOCIAL_LINKS, TECH_STACK } from './constants';
import { ArrowRight, Terminal as TerminalIcon, Command, Search } from 'lucide-react';

function App() {
  const [lang, setLang] = useState<Language>(Language.EN);
  const [view, setView] = useState<PageView>('home');
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  // Default to Galaxy (Matrix disabled initially)
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const t = CONTENT[lang];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCmdOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const navigateTo = (page: PageView) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView(page);
  };

  return (
    <div className="min-h-screen font-sans relative overflow-x-hidden text-gray-900 dark:text-white selection:bg-green-500/30 selection:text-green-800 dark:selection:text-green-200 transition-colors duration-300 pb-10">
      
      {/* Backgrounds */}
      <div className="fixed inset-0 z-0 bg-gray-50 dark:bg-black transition-colors duration-500">
        {/* Render either Matrix or Galaxy based on toggle */}
        {!isMatrixActive ? <GalaxyBackground /> : <MatrixRain />}
        
        {/* Overlay for Light/Dark Mode */}
        {/* Light Mode: Solid White/Gray (bg-gray-50/95) to ensure text is perfectly readable. Dark Mode: Transparent black. */}
        <div className="absolute inset-0 transition-colors duration-500 pointer-events-none bg-gray-50/95 dark:bg-black/40 backdrop-blur-none dark:backdrop-blur-none"></div>
      </div>

      {/* Overlays */}
      <CommandPalette 
        isOpen={isCmdOpen} 
        onClose={() => setIsCmdOpen(false)} 
        onNavigate={navigateTo}
        onToggleMatrix={() => setIsMatrixActive(!isMatrixActive)}
        lang={lang}
      />
      
      {/* System Monitor hidden on mobile, visible xl+ */}
      <div className="hidden xl:block">
        <SystemMonitor />
      </div>

      <VulnerabilityTicker />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 border-b border-gray-200 dark:border-white/10 glass backdrop-blur-md bg-white/80 dark:bg-black/20 shadow-lg transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
          <button onClick={() => navigateTo('home')} className="hover:opacity-80 transition-opacity drop-shadow-md text-black dark:text-white shrink-0">
             <Logo className="w-10 h-10 md:w-12 md:h-12" />
          </button>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium font-mono">
            <button onClick={() => navigateTo('home')} className={`text-gray-600 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors drop-shadow-sm ${view === 'home' ? 'font-bold text-black dark:text-white text-shadow-glow' : ''}`}>{t.nav.home}</button>
            <button onClick={() => navigateTo('projects')} className={`text-gray-600 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors drop-shadow-sm ${view === 'projects' ? 'font-bold text-black dark:text-white text-shadow-glow' : ''}`}>{t.nav.projects}</button>
            <button onClick={() => navigateTo('tools')} className={`text-gray-600 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors drop-shadow-sm ${view === 'tools' ? 'font-bold text-black dark:text-white text-shadow-glow' : ''}`}>{t.nav.tools}</button>
          </div>

          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            {/* Desktop CMD Button */}
            <button 
              onClick={() => setIsCmdOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-300 dark:border-white/20 bg-white dark:bg-white/10 text-xs text-gray-700 dark:text-white/80 font-mono hover:bg-gray-50 dark:hover:bg-white/20 hover:text-black dark:hover:text-white transition-all shadow-sm"
            >
              <Command size={12} />
              <span>Ctrl K</span>
            </button>
            
            {/* Mobile CMD Button (Search Icon) - Made more prominent */}
            <button 
              onClick={() => setIsCmdOpen(true)}
              className="flex md:hidden p-2.5 rounded-full border border-gray-300 dark:border-white/20 bg-white dark:bg-white/10 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/20 transition-all shadow-md active:scale-95"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <ThemeToggle />
            <LanguageSwitcher currentLang={lang} onToggle={setLang} />
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        
        {view === 'projects' && (
          <Projects t={t.projects} onBack={() => navigateTo('home')} />
        )}

        {view === 'tools' && (
          <EncryptionTool t={t.tools} onBack={() => navigateTo('home')} />
        )}

        {view === 'home' && (
          <>
            {/* Hero Section */}
            <section id="home" className="min-h-[90vh] flex flex-col justify-center px-6 relative pt-24 md:pt-20">
              <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="space-y-8 md:space-y-10 animate-in slide-in-from-left-10 duration-700 fade-in order-2 lg:order-1 text-center lg:text-left">
                  
                  <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-gray-900 dark:text-white leading-[1.1] drop-shadow-lg">
                    {lang === 'en' ? 'Securing the' : 'የዲጂታል ድንበርን'} <br />
                    {/* Beautiful Static Gradient Text */}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-green-600 to-teal-500 dark:from-green-400 dark:via-emerald-300 dark:to-cyan-500 filter drop-shadow-sm pb-2 inline-block">
                       {lang === 'en' ? 'Digital Frontier' : 'መጠበቅ'}
                    </span>
                  </h1>
                  
                  <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 max-w-xl leading-relaxed mx-auto lg:mx-0 border-l-2 border-green-500/50 pl-6 backdrop-blur-[2px] font-medium drop-shadow-md text-left">
                    {t.hero.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    <button 
                      onClick={() => navigateTo('projects')}
                      className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-xl"
                    >
                      {t.hero.ctaSecondary}
                      <ArrowRight size={18} />
                    </button>
                    <button
                      onClick={() => navigateTo('tools')}
                      className="px-8 py-4 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-black dark:text-white font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-white/20 transition-all duration-300 backdrop-blur-md flex items-center gap-2 shadow-lg"
                    >
                      <TerminalIcon size={18} />
                      {t.nav.tools}
                    </button>
                  </div>
                </div>

                <div className="order-1 lg:order-2 flex justify-center items-center relative group">
                  <div className="absolute inset-0 bg-green-500/10 blur-[100px] rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-1000"></div>
                  <Logo className="w-48 h-48 md:w-80 md:h-80 lg:w-96 lg:h-96 animate-pulse-slow text-black dark:text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]" />
                </div>
              </div>
            </section>

            {/* Tech Stack Ticker */}
            <section className="py-10 border-y border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/20 backdrop-blur-sm overflow-hidden">
              <div className="max-w-7xl mx-auto px-6 mb-4 text-center">
                <span className="text-xs font-mono text-gray-500 dark:text-white/50 uppercase tracking-[0.2em] drop-shadow-sm">Technologies Deployed</span>
              </div>
              <div className="relative flex overflow-x-hidden group">
                <div className="animate-spin-slow whitespace-nowrap flex gap-16 py-2">
                  {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                    <span key={i} className="text-xl font-bold text-gray-400 dark:text-white/70 font-mono uppercase flex items-center gap-4 drop-shadow-md hover:text-black dark:hover:text-white transition-colors">
                      {tech} <span className="text-green-500/50 text-xs">●</span>
                    </span>
                  ))}
                </div>
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gray-50 dark:from-black/50 to-transparent z-10"></div>
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-50 dark:from-black/50 to-transparent z-10"></div>
              </div>
            </section>

            {/* Services Section (Now Interactive Workflow) */}
            <section id="services" className="py-32 relative">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white drop-shadow-md">{t.services.title}</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-transparent rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 max-w-md text-right hidden md:block font-medium drop-shadow-md">
                    {t.services.subtitle}
                  </p>
                </div>
                
                {/* The New Interactive Workflow Component */}
                <ServiceWorkflow lang={lang} />
                
              </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-gray-200 dark:border-white/10 bg-white dark:bg-black/40 backdrop-blur-lg mb-10">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Logo className="w-8 h-8 text-gray-400 dark:text-white/50" showText={false} />
                    <span className="text-gray-500 dark:text-white/30 text-sm font-mono tracking-widest">{t.footer.rights}</span>
                  </div>
                  
                  <div className="flex gap-6">
                    {SOCIAL_LINKS.map((link) => (
                      <a 
                        key={link.platform} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 dark:text-white/40 hover:text-black dark:hover:text-white hover:scale-110 transition-all duration-300"
                        title={link.platform}
                      >
                        <SocialIcon name={link.platform} className="w-5 h-5" />
                      </a>
                    ))}
                  </div>

                  <div className="text-gray-500 dark:text-white/30 text-sm font-mono flex items-center gap-2">
                    {t.footer.builtBy} <span className="text-gray-700 dark:text-white/60 font-bold">{CREATOR_NAME}</span>
                  </div>
                </div>
              </div>
            </footer>
          </>
        )}
      </main>

      {/* ChatBot sits above the ticker */}
      <div className="fixed bottom-16 right-6 z-50">
         <ChatBot lang={lang} />
      </div>
    </div>
  );
}

export default App;
