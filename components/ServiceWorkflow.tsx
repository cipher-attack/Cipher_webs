import React, { useState } from 'react';
import { ArrowLeft, Send, ShieldAlert, Check } from 'lucide-react';

interface Props {
  onBack: () => void;
  lang: string;
}

export const AuditRequest: React.FC<Props> = ({ onBack, lang }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    target: '',
    type: 'web',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    // In a real app, send data to backend here
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 flex flex-col items-center">
       <div className="w-full max-w-2xl">
        <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Abort Operation</span>
          </button>

        <div className="bg-black border border-white/10 rounded-lg overflow-hidden shadow-2xl">
          <div className="bg-white/5 p-3 flex items-center gap-2 border-b border-white/10">
            <ShieldAlert size={16} className="text-red-500" />
            <span className="font-mono text-xs text-white/70">CIPHER_AUDIT_PROTOCOL // REQUEST_FORM</span>
          </div>

          <div className="p-8">
            {step < 3 ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold font-mono text-green-500">&gt; INITIATE_SECURITY_AUDIT</h2>
                  <p className="text-secondary text-sm">Please provide target details for preliminary reconnaissance.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2 group">
                    <label className="text-xs font-mono text-white/50 group-focus-within:text-green-500 transition-colors">TARGET_URL_OR_IP</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded p-3 font-mono text-white focus:border-green-500 focus:outline-none focus:bg-white/10 transition-all"
                      placeholder="https://example.com"
                      value={formData.target}
                      onChange={e => setFormData({...formData, target: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                     <label className="text-xs font-mono text-white/50">AUDIT_TYPE</label>
                     <div className="grid grid-cols-3 gap-2">
                        {['Web', 'Network', 'Mobile'].map(t => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setFormData({...formData, type: t.toLowerCase()})}
                            className={`p-2 border rounded font-mono text-sm transition-all ${
                              formData.type === t.toLowerCase() 
                              ? 'border-green-500 bg-green-500/10 text-green-400' 
                              : 'border-white/10 bg-white/5 text-white/50 hover:bg-white/10'
                            }`}
                          >
                            {t.toUpperCase()}
                          </button>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-xs font-mono text-white/50 group-focus-within:text-green-500 transition-colors">CONTACT_EMAIL</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded p-3 font-mono text-white focus:border-green-500 focus:outline-none focus:bg-white/10 transition-all"
                      placeholder="admin@secure.net"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-white text-black font-bold font-mono py-4 rounded hover:bg-green-400 transition-colors flex items-center justify-center gap-2"
                >
                  <span className="animate-pulse">&gt;</span> EXECUTE_REQUEST
                </button>
              </form>
            ) : (
              <div className="py-12 flex flex-col items-center text-center space-y-6 animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/50">
                  <Check size={40} className="text-green-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-mono text-white">REQUEST_QUEUED</h3>
                  <p className="text-secondary mt-2">Our secure channel has received your dossier.<br/>An encrypted response will be sent to your email shortly.</p>
                </div>
                <button onClick={onBack} className="text-sm font-mono text-white/50 hover:text-white underline">
                  Return to Command Center
                </button>
              </div>
            )}
          </div>
        </div>
       </div>
    </div>
  );
};
