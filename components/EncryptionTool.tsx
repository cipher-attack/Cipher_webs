
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, RefreshCw, Copy, Check, Lock, FileCode, ShieldCheck, Zap, Globe, Network, Image, Search, Key, Download, Eraser, Wifi, EyeOff, AlertTriangle, Flag, X, Binary, Command, Server, Smartphone, Link, Hash, Layout, Type, Palette, QrCode } from 'lucide-react';
import { CHEATSHEET_DATA, MAGIC_BYTES, HASH_PATTERNS, SHELL_TEMPLATES, GOOGLE_DORKS, PORTS_DATA, LINUX_COMMANDS, GIT_COMMANDS, HTTP_STATUS } from '../constants';

interface Props {
  t: any;
  onBack: () => void;
}

const CompactCodeRow: React.FC<{ content: string; desc?: string }> = ({ content, desc }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="group flex items-center justify-between gap-4 p-3 rounded-md bg-gray-50 dark:bg-white/5 border border-transparent hover:border-gray-200 dark:hover:border-white/20 transition-all">
      <div className="flex flex-col truncate">
         <code className="text-xs font-mono text-gray-700 dark:text-gray-300 font-medium truncate">
           {content}
         </code>
         {desc && <span className="text-[10px] text-gray-400 dark:text-gray-500">{desc}</span>}
      </div>
      <button 
        onClick={handleCopy}
        className={`p-1.5 rounded transition-colors ${copied ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-white/50 hover:text-black dark:hover:text-white'}`}
        title="Copy"
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
      </button>
    </div>
  );
};

const CodeBlock: React.FC<{ label: string; content: string; className?: string }> = ({ label, content, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`bg-gray-100 dark:bg-[#050505] border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden flex flex-col h-full group ${className}`}>
      <div className="bg-gray-200 dark:bg-white/5 px-3 py-2 flex justify-between items-center border-b border-gray-300 dark:border-white/10">
        <span className="text-xs font-mono text-gray-600 dark:text-green-500 uppercase tracking-wider">{label}</span>
        <button onClick={handleCopy} className="text-gray-500 dark:text-white/30 hover:text-black dark:hover:text-white transition-colors">
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      <div className="p-3 font-mono text-xs text-gray-800 dark:text-white/70 break-all overflow-y-auto max-h-48 whitespace-pre-wrap">
        {content || <span className="text-gray-400 dark:text-white/20">// ...</span>}
      </div>
    </div>
  );
};

export const EncryptionTool: React.FC<Props> = ({ t, onBack }) => {
  const [tab, setTab] = useState<'transform' | 'hash' | 'security' | 'web' | 'network' | 'forensics' | 'vault' | 'ctf' | 'utils'>('ctf');
  const [subTool, setSubTool] = useState<string>('default');

  // Input states
  const [inputFormat, setInputFormat] = useState<'text' | 'base64' | 'hex' | 'binary'>('text');
  const [input, setInput] = useState('');
  
  // Transform State
  const [output, setOutput] = useState({ binary: '', hex: '', base64: '', text: '' });
  
  // Hash State
  const [hashes, setHashes] = useState({ md5: '...', sha1: '...', sha256: '...', sha512: '...' });

  // Security State
  const [strength, setStrength] = useState(0);
  const [crackTime, setCrackTime] = useState('0s');
  const [pwdLength, setPwdLength] = useState(16);
  const [generatedPwd, setGeneratedPwd] = useState('');

  // Network Tools
  const [subnetInput, setSubnetInput] = useState('192.168.1.0/24');
  const [subnetResult, setSubnetResult] = useState({ network: '', broadcast: '', first: '', last: '', hosts: 0 });
  const [dnsDomain, setDnsDomain] = useState('');
  const [dnsResults, setDnsResults] = useState<string>('');
  const [wifiSSID, setWifiSSID] = useState('');
  const [wifiPass, setWifiPass] = useState('');
  const [ipv6Input, setIpv6Input] = useState('');
  const [ipv6Result, setIpv6Result] = useState('');
  const wifiQrRef = useRef<HTMLDivElement>(null);
  const [macInput, setMacInput] = useState('');
  const [macVendor, setMacVendor] = useState('');

  // Forensics Tools
  const [metaImage, setMetaImage] = useState<File | null>(null);
  const [metaData, setMetaData] = useState<any>(null);
  const [scrubbedImage, setScrubbedImage] = useState<string | null>(null);
  const [stegoImage, setStegoImage] = useState<File | null>(null);
  const [stegoMessage, setStegoMessage] = useState('');
  const [stegoResult, setStegoResult] = useState<string | null>(null);

  // Web Tools
  const [phishUrl, setPhishUrl] = useState('');
  const [phishResult, setPhishResult] = useState<{safe: boolean, reason: string} | null>(null);
  const [dorkDomain, setDorkDomain] = useState('');
  const [dorkType, setDorkType] = useState('Public Files');
  const [sqlMapUrl, setSqlMapUrl] = useState('');
  const [sqlMapOptions, setSqlMapOptions] = useState({ dbs: true, tables: false, dump: false, batch: true });
  const [httpHeaderInput, setHttpHeaderInput] = useState('');
  const [headerAnalysis, setHeaderAnalysis] = useState<string[]>([]);
  const [uaInput, setUaInput] = useState(navigator.userAgent);
  const [uaResult, setUaResult] = useState('');
  const [curlUrl, setCurlUrl] = useState('');
  const [curlMethod, setCurlMethod] = useState('GET');
  const [curlData, setCurlData] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [urlResult, setUrlResult] = useState('');
  const [htmlInput, setHtmlInput] = useState('');
  const [htmlResult, setHtmlResult] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [jsonResult, setJsonResult] = useState('');
  const [jwtInput, setJwtInput] = useState('');
  const [jwtDecoded, setJwtDecoded] = useState('');

  // Vault
  const [vaultFile, setVaultFile] = useState<File | null>(null);
  const [vaultKey, setVaultKey] = useState('');
  const [vaultResult, setVaultResult] = useState<string | null>(null);

  // CTF Tools
  const [magicBytesResult, setMagicBytesResult] = useState('');
  const [xorInputA, setXorInputA] = useState('');
  const [xorInputB, setXorInputB] = useState('');
  const [xorResult, setXorResult] = useState('');
  const [rsaInputs, setRsaInputs] = useState({ p: '', q: '', e: '65537' });
  const [rsaResult, setRsaResult] = useState('');
  const [freqInput, setFreqInput] = useState('');
  const freqCanvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);
  const [baseInput, setBaseInput] = useState('');
  const [baseResult, setBaseResult] = useState('');
  const [baseType, setBaseType] = useState('58');
  const [tsInput, setTsInput] = useState('');
  const [tsResult, setTsResult] = useState('');
  const [hashIdInput, setHashIdInput] = useState('');
  const [hashIdResult, setHashIdResult] = useState('');
  const [regexPattern, setRegexPattern] = useState('');
  const [regexText, setRegexText] = useState('');
  const [regexMatches, setRegexMatches] = useState<string[]>([]);
  const [qrDecodeResult, setQrDecodeResult] = useState('');
  const [shellIp, setShellIp] = useState('10.10.10.10');
  const [shellPort, setShellPort] = useState('4444');
  const [crontabMin, setCrontabMin] = useState('*');
  const [crontabHour, setCrontabHour] = useState('*');
  const [crontabDay, setCrontabDay] = useState('*');
  const [crontabMonth, setCrontabMonth] = useState('*');
  const [crontabWeek, setCrontabWeek] = useState('*');

  // Utils State
  const [uuidCount, setUuidCount] = useState(1);
  const [uuids, setUuids] = useState('');
  const [slugInput, setSlugInput] = useState('');
  const [slugResult, setSlugResult] = useState('');
  const [textStatsInput, setTextStatsInput] = useState('');
  const [textStats, setTextStats] = useState({ chars: 0, words: 0, lines: 0 });
  const [caseInput, setCaseInput] = useState('');
  const [caseResult, setCaseResult] = useState('');
  const [colorInput, setColorInput] = useState('#00ff9d');
  const [colorResult, setColorResult] = useState({ rgb: '', hsl: '' });
  const [aspectW, setAspectW] = useState(1920);
  const [aspectH, setAspectH] = useState(1080);
  const [aspectRes, setAspectRes] = useState('');
  const [chmodOctal, setChmodOctal] = useState('755');
  const [chmodStr, setChmodStr] = useState('-rwxr-xr-x');
  const [genericQrInput, setGenericQrInput] = useState('');
  const genericQrRef = useRef<HTMLDivElement>(null);
  
  // Binary Calc
  const [binCalcInput, setBinCalcInput] = useState('0');
  const [binCalcRes, setBinCalcRes] = useState({ bin: '', hex: '', dec: '' });

  // --- Logic Implementations ---

  useEffect(() => {
    if (!input) return;
    try {
      let raw = input;
      if (inputFormat === 'base64') raw = atob(input);
      if (inputFormat === 'hex') raw = input.match(/.{1,2}/g)?.map(byte => String.fromCharCode(parseInt(byte, 16))).join('') || '';
      if (inputFormat === 'binary') raw = input.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');

      const text = raw;
      const b64 = btoa(raw);
      const hex = raw.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
      const bin = raw.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');

      setOutput({ text, base64: b64, hex, binary: bin });

      // Password Strength
      let score = 0;
      if (text.length > 8) score += 1;
      if (text.length > 12) score += 1;
      if (/[A-Z]/.test(text)) score += 1;
      if (/[0-9]/.test(text)) score += 1;
      if (/[^A-Za-z0-9]/.test(text)) score += 1;
      setStrength(score);
      const entropy = text.length * Math.log2(94);
      const seconds = Math.pow(2, entropy) / 1e9;
      if (seconds < 60) setCrackTime('< 1 minute');
      else if (seconds < 3600) setCrackTime(`${Math.round(seconds/60)} minutes`);
      else if (seconds < 86400) setCrackTime(`${Math.round(seconds/3600)} hours`);
      else setCrackTime(`${Math.round(seconds/86400)} days`);

      if (window.crypto && window.crypto.subtle) {
        window.crypto.subtle.digest('SHA-1', new TextEncoder().encode(text)).then(buf => setHashes(prev => ({ ...prev, sha1: bufToHex(buf) })));
        window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)).then(buf => setHashes(prev => ({ ...prev, sha256: bufToHex(buf) })));
        window.crypto.subtle.digest('SHA-512', new TextEncoder().encode(text)).then(buf => setHashes(prev => ({ ...prev, sha512: bufToHex(buf) })));
      }

    } catch (e) {}
  }, [input, inputFormat]);

  const bufToHex = (buf: ArrayBuffer) => Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');

  const generateSecurePassword = () => {
    const chars = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789@#$%';
    let pass = '';
    const randomValues = new Uint32Array(pwdLength);
    window.crypto.getRandomValues(randomValues);
    for(let i=0; i<pwdLength; i++) {
        pass += chars[randomValues[i] % chars.length];
    }
    setGeneratedPwd(pass);
  };

  const processIpv6 = () => {
    try {
        if(ipv6Input.includes('::')) {
           let [prefix, suffix] = ipv6Input.split('::');
           const preParts = prefix ? prefix.split(':') : [];
           const sufParts = suffix ? suffix.split(':') : [];
           const missing = 8 - (preParts.length + sufParts.length);
           const expansion = new Array(missing).fill('0000');
           const all = [...preParts, ...expansion, ...sufParts];
           setIpv6Result(all.map(p => p.padStart(4, '0')).join(':'));
        } else {
           setIpv6Result("Already Expanded or Invalid :: syntax");
        }
    } catch(e) { setIpv6Result("Invalid IPv6"); }
  };

  const checkPhish = () => {
      const suspicious = [
          { check: (u: string) => u.split('.').length > 4, reason: 'Too many subdomains' },
          { check: (u: string) => /@/.test(u), reason: 'Contains @ symbol' },
          { check: (u: string) => !/^https/.test(u), reason: 'Not using HTTPS' },
          { check: (u: string) => /[0-9]{1,3}\.[0-9]{1,3}/.test(u), reason: 'Raw IP address' }
      ];
      const failed = suspicious.find(c => c.check(phishUrl));
      if (failed) setPhishResult({ safe: false, reason: failed.reason });
      else setPhishResult({ safe: true, reason: 'No obvious heuristics detected.' });
  };

  const analyzeHeaders = () => {
      const missing = [];
      const lines = httpHeaderInput.toLowerCase();
      if(!lines.includes('strict-transport-security')) missing.push('HSTS (Strict-Transport-Security)');
      if(!lines.includes('x-frame-options')) missing.push('X-Frame-Options');
      if(!lines.includes('content-security-policy')) missing.push('CSP (Content-Security-Policy)');
      if(!lines.includes('x-content-type-options')) missing.push('X-Content-Type-Options');
      setHeaderAnalysis(missing.length ? missing : ['All critical headers present!']);
  };

  const parseUa = () => {
     let res = "Unknown Device";
     if(uaInput.includes('Android')) res = "Android Device";
     if(uaInput.includes('iPhone')) res = "Apple iPhone";
     if(uaInput.includes('Windows')) res = "Windows PC";
     if(uaInput.includes('Macintosh')) res = "Mac OS";
     if(uaInput.includes('Linux')) res = "Linux System";
     setUaResult(res + ` [Browser: ${uaInput.includes('Chrome') ? 'Chrome' : uaInput.includes('Firefox') ? 'Firefox' : 'Other'}]`);
  };

  const getCurlCmd = () => {
     let cmd = `curl -X ${curlMethod} "${curlUrl}"`;
     if(curlData && curlMethod !== 'GET') cmd += ` -d '${curlData}'`;
     return cmd;
  };

  // New Web Tools Logic
  const processUrl = (mode: 'enc' | 'dec') => {
      try {
          setUrlResult(mode === 'enc' ? encodeURIComponent(urlInput) : decodeURIComponent(urlInput));
      } catch(e) { setUrlResult('Error'); }
  };
  const processHtml = (mode: 'enc' | 'dec') => {
      if(mode === 'enc') {
          setHtmlResult(htmlInput.replace(/[\u00A0-\u9999<>&]/g, (i) => '&#'+i.charCodeAt(0)+';'));
      } else {
          const txt = document.createElement('textarea');
          txt.innerHTML = htmlInput;
          setHtmlResult(txt.value);
      }
  };
  const processJson = (mode: 'min' | 'fmt') => {
      try {
          const obj = JSON.parse(jsonInput);
          setJsonResult(JSON.stringify(obj, null, mode === 'fmt' ? 2 : 0));
      } catch(e) { setJsonResult('Invalid JSON'); }
  };
  const decodeJwt = () => {
      try {
          const parts = jwtInput.split('.');
          if(parts.length !== 3) throw new Error('Invalid JWT format');
          const header = JSON.parse(atob(parts[0]));
          const payload = JSON.parse(atob(parts[1]));
          setJwtDecoded(JSON.stringify({ header, payload }, null, 2));
      } catch(e) { setJwtDecoded('Invalid JWT or Parse Error'); }
  };

  // New Network Tools Logic
  const lookupMac = () => {
      const oui = macInput.replace(/[:.\-]/g, '').substring(0, 6).toUpperCase();
      const vendors: any = { '005056': 'VMware', '000C29': 'VMware', '001C14': 'VMware', '00000C': 'Cisco', 'F09E63': 'Apple', 'B827EB': 'Raspberry Pi' };
      setMacVendor(vendors[oui] || 'Unknown Vendor (Demo Database)');
  };

  // Bin Calc
  useEffect(() => {
      try {
          const dec = parseInt(binCalcInput);
          if(!isNaN(dec)) {
              setBinCalcRes({
                  bin: dec.toString(2),
                  hex: dec.toString(16).toUpperCase(),
                  dec: dec.toString(10)
              });
          }
      } catch(e) {}
  }, [binCalcInput]);


  useEffect(() => {
    if (subTool === 'wifi' && wifiQrRef.current && (window as any).QRCode) {
        wifiQrRef.current.innerHTML = '';
        const esc = (v: string) => v.replace(/([\\;,:"])/g, '\\$1');
        const qrString = `WIFI:S:${esc(wifiSSID)};T:WPA;P:${esc(wifiPass)};;`;
        if (wifiSSID) {
            new (window as any).QRCode(wifiQrRef.current, { text: qrString, width: 128, height: 128, colorDark : "#00ff9d", colorLight : "#000000", correctLevel : (window as any).QRCode.CorrectLevel.H });
        }
    }
  }, [wifiSSID, wifiPass, subTool]);

  const handleMagicBytes = (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
          const arr = (new Uint8Array(e.target?.result as ArrayBuffer)).subarray(0, 8);
          const hex = Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
          let found = 'Unknown';
          for (const [sig, type] of Object.entries(MAGIC_BYTES)) { if (hex.startsWith(sig)) found = type; }
          setMagicBytesResult(`${hex.toUpperCase()} - ${found}`);
      };
      reader.readAsArrayBuffer(file);
  };
  const solveXor = () => {
      try {
          const hexA = xorInputA.replace(/\s/g, '');
          const hexB = xorInputB.replace(/\s/g, '');
          let res = '';
          for(let i=0; i<Math.min(hexA.length, hexB.length); i+=2) {
              const a = parseInt(hexA.substr(i, 2), 16);
              const b = parseInt(hexB.substr(i, 2), 16);
              res += (a ^ b).toString(16).padStart(2, '0');
          }
          setXorResult(res);
      } catch (e) { setXorResult('Invalid Hex'); }
  };
  const solveClassical = (text: string, shift: number) => {
      return text.replace(/[a-zA-Z]/g, (c) => {
          const base = c >= 'a' ? 97 : 65;
          return String.fromCharCode(((c.charCodeAt(0) - base + shift) % 26) + base);
      });
  };
  const calcRSA = () => {
     try {
         if(!/^\d+$/.test(rsaInputs.p)) return;
         const p = BigInt(rsaInputs.p);
         const q = BigInt(rsaInputs.q);
         setRsaResult(`N = ${(p*q).toString()}\nPhi = ${((p-1n)*(q-1n)).toString()}`);
     } catch(e) {}
  };
  const updateFrequency = () => {
      if (!freqInput || !(window as any).Chart || !freqCanvasRef.current) return;
      if (chartInstance.current) chartInstance.current.destroy();
      const map: Record<string, number> = {};
      for (const char of freqInput.toUpperCase()) { if (/[A-Z]/.test(char)) map[char] = (map[char] || 0) + 1; }
      const labels = Object.keys(map).sort();
      chartInstance.current = new (window as any).Chart(freqCanvasRef.current, {
          type: 'bar',
          data: { labels, datasets: [{ label: 'Freq', data: labels.map(l => map[l]), backgroundColor: '#00ff9d' }] },
          options: { scales: { y: { beginAtZero: true } } }
      });
  };
  const solveDecoders = () => {
      try {
          if (baseType === '58' && baseInput) {
              const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
              let num = 0n;
              for (const char of baseInput) { const idx = ALPHABET.indexOf(char); if(idx === -1) throw new Error(); num = num * 58n + BigInt(idx); }
              let hex = num.toString(16); if (hex.length % 2) hex = '0' + hex;
              setBaseResult(hex.match(/.{1,2}/g)?.map(b => String.fromCharCode(parseInt(b, 16))).join('') || '');
          }
      } catch (e) { setBaseResult('Decode Error'); }
  };
  const convertTs = () => { const ts = parseInt(tsInput); if(!isNaN(ts)) setTsResult(new Date(ts * 1000).toUTCString()); };
  const identifyHash = () => {
      const type = HASH_PATTERNS.find(h => h.length === hashIdInput.length)?.type || 'Unknown';
      setHashIdResult(type);
  };
  const handleQrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (evt) => {
              const img = new window.Image();
              img.onload = () => {
                  const canvas = document.createElement('canvas'); canvas.width = img.width; canvas.height = img.height;
                  const ctx = canvas.getContext('2d');
                  if (ctx && (window as any).jsQR) {
                      ctx.drawImage(img, 0, 0);
                      const code = (window as any).jsQR(ctx.getImageData(0, 0, canvas.width, canvas.height).data, canvas.width, canvas.height);
                      setQrDecodeResult(code ? code.data : 'No QR');
                  }
              };
              img.src = evt.target?.result as string;
          };
          reader.readAsDataURL(file);
      }
  };

  const calcSubnet = () => {
    try {
        const [ip, cidr] = subnetInput.split('/');
        const mask = ~(2**(32-parseInt(cidr)) - 1);
        const parts = ip.split('.').map(Number);
        const ipNum = (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
        const net = ipNum & mask;
        const broad = net | (~mask);
        const format = (n: number) => [(n>>>24)&255, (n>>>16)&255, (n>>>8)&255, n&255].join('.');
        setSubnetResult({ network: format(net), broadcast: format(broad), first: format(net+1), last: format(broad-1), hosts: Math.pow(2, 32-parseInt(cidr)) - 2 });
    } catch(e) {}
  };
  const lookupDns = async () => {
      setDnsResults('Querying...');
      try {
          const res = await fetch(`https://dns.google/resolve?name=${dnsDomain}&type=A`);
          const data = await res.json();
          setDnsResults(JSON.stringify(data.Answer || data, null, 2));
      } catch(e) { setDnsResults('Failed'); }
  };
  const handleImageMeta = (e: any) => {
      const file = e.target.files?.[0];
      if (file && (window as any).EXIF) {
          (window as any).EXIF.getData(file, function(this: any) { setMetaData((window as any).EXIF.getAllTags(this)); });
          const reader = new FileReader();
          reader.onload = (evt) => {
              const img = new window.Image();
              img.onload = () => {
                  const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
                  c.getContext('2d')?.drawImage(img, 0, 0);
                  setScrubbedImage(c.toDataURL('image/jpeg', 0.9));
              }
              img.src = evt.target?.result as string;
          };
          reader.readAsDataURL(file);
      }
  };
  const processStego = () => {
     if(stegoImage) {
         const reader = new FileReader();
         reader.onload = (e) => {
             const img = new window.Image();
             img.onload = () => {
                 const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
                 const ctx = c.getContext('2d');
                 if(ctx) {
                     ctx.drawImage(img, 0, 0);
                     // Mock Logic for demo visual
                     setStegoResult(c.toDataURL());
                 }
             };
             img.src = e.target?.result as string;
         };
         reader.readAsDataURL(stegoImage);
     }
  };
  const processVault = async (mode: 'encrypt' | 'decrypt') => {
      if(!vaultFile || !vaultKey || !window.crypto.subtle) return;
      // Demo Mock Logic
      setVaultResult(URL.createObjectURL(vaultFile));
  };

  // --- Utils Handlers ---
  const genUuids = () => {
    let res = '';
    for(let i=0; i<uuidCount; i++) {
        res += 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }) + '\n';
    }
    setUuids(res);
  };

  useEffect(() => {
    // Text Stats
    const chars = textStatsInput.length;
    const words = textStatsInput.trim() === '' ? 0 : textStatsInput.trim().split(/\s+/).length;
    const lines = textStatsInput.split('\n').length;
    setTextStats({ chars, words, lines });
  }, [textStatsInput]);

  const convertCase = (type: string) => {
    if(type === 'upper') setCaseResult(caseInput.toUpperCase());
    if(type === 'lower') setCaseResult(caseInput.toLowerCase());
    if(type === 'camel') setCaseResult(caseInput.replace(/(?:^\w|[A-Z]|\b\w)/g, (w, i) => i === 0 ? w.toLowerCase() : w.toUpperCase()).replace(/\s+/g, ''));
    if(type === 'snake') setCaseResult(caseInput.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('_') || '');
  };

  const convertColor = (val: string) => {
      setColorInput(val);
      const r = parseInt(val.substr(1,2), 16);
      const g = parseInt(val.substr(3,2), 16);
      const b = parseInt(val.substr(5,2), 16);
      setColorResult({ rgb: `rgb(${r}, ${g}, ${b})`, hsl: 'Calculated...' });
  };
  
  useEffect(() => {
     setSlugResult(slugInput.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-'));
  }, [slugInput]);

  useEffect(() => {
      if(aspectW && aspectH) {
         const gcd = (a: number, b: number): number => b ? gcd(b, a%b) : a;
         const div = gcd(aspectW, aspectH);
         setAspectRes(`${aspectW/div}:${aspectH/div}`);
      }
  }, [aspectW, aspectH]);

  useEffect(() => {
      if (genericQrRef.current && (window as any).QRCode) {
          genericQrRef.current.innerHTML = '';
          if (genericQrInput) {
             new (window as any).QRCode(genericQrRef.current, { text: genericQrInput, width: 128, height: 128, colorDark : "#00ff9d", colorLight : "#000000" });
          }
      }
  }, [genericQrInput, subTool]);


  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <button onClick={onBack} className="group flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-end gap-4 mb-8">
           <div>
              <h1 className="text-4xl font-bold font-mono text-white mb-2">{t.title}</h1>
              <p className="text-secondary">{t.subtitle}</p>
           </div>
        </div>

        {/* Tab Nav */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4 overflow-x-auto no-scrollbar">
          {Object.entries(t.tabs).map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setTab(key as any); setSubTool('default'); }}
              className={`px-4 py-2 rounded font-mono text-sm whitespace-nowrap transition-all ${
                tab === key 
                ? 'bg-green-500 text-black font-bold shadow-[0_0_15px_rgba(34,197,94,0.4)]' 
                : 'text-gray-400 dark:text-white/50 hover:bg-white/10'
              }`}
            >
              {(label as string)}
            </button>
          ))}
        </div>

        {/* --- MAIN TOOL CONTENT --- */}
        <div className="bg-white/5 dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-xl p-6 min-h-[500px] shadow-2xl backdrop-blur-sm relative overflow-hidden">
          
          {(tab === 'transform' || tab === 'hash' || tab === 'security') && (
             <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-xs font-mono text-gray-500 dark:text-green-500 uppercase tracking-wider block">Input Stream</label>
                  <textarea 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className="w-full h-48 bg-gray-50 dark:bg-black border border-gray-300 dark:border-white/10 rounded-lg p-4 font-mono text-sm text-gray-900 dark:text-white focus:border-green-500 focus:outline-none resize-none"
                    placeholder={t.inputPlaceholder}
                  />
                  <div className="flex gap-2">
                    {['text', 'base64', 'hex', 'binary'].map(fmt => (
                       <button key={fmt} onClick={() => setInputFormat(fmt as any)} className={`px-3 py-1 text-xs font-mono border rounded uppercase ${inputFormat === fmt ? 'border-green-500 text-green-600 dark:text-green-400' : 'border-gray-300 dark:border-white/20 text-gray-500 dark:text-white/40'}`}>
                         {fmt}
                       </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                   {tab === 'transform' && (
                     <>
                        <CodeBlock label="Base64" content={output.base64} />
                        <CodeBlock label="Hexadecimal" content={output.hex} />
                        <CodeBlock label="Binary" content={output.binary} />
                     </>
                   )}
                   {tab === 'hash' && (
                     <>
                        <CodeBlock label="SHA-1" content={hashes.sha1} />
                        <CodeBlock label="SHA-256" content={hashes.sha256} />
                     </>
                   )}
                   {tab === 'security' && (
                     <div className="space-y-6">
                         <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-6">
                            <h3 className="text-sm font-mono text-gray-500 dark:text-white/60 mb-2">Entropy Strength</h3>
                            <div className="flex gap-1 mb-4">
                                {[1,2,3,4,5].map(i => <div key={i} className={`w-8 h-2 rounded-full ${i <= strength ? 'bg-green-500' : 'bg-gray-300 dark:bg-white/10'}`}></div>)}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{crackTime}</h3>
                            <p className="text-xs text-gray-500 dark:text-white/40 uppercase tracking-widest mt-1">Time to Crack</p>
                         </div>
                         <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-6">
                            <h3 className="text-sm font-mono text-gray-500 dark:text-white/60 mb-4">Secure Generator</h3>
                            <div className="flex gap-2 mb-4">
                                <input type="range" min="8" max="64" value={pwdLength} onChange={e => setPwdLength(Number(e.target.value))} className="w-full accent-green-500" />
                                <span className="text-white font-mono">{pwdLength}</span>
                            </div>
                            <div className="flex gap-2">
                                <input type="text" readOnly value={generatedPwd} className="flex-1 bg-black border border-white/20 rounded p-2 text-green-500 font-mono" />
                                <button onClick={generateSecurePassword} className="bg-white text-black px-3 rounded font-bold"><RefreshCw size={16} /></button>
                            </div>
                         </div>
                     </div>
                   )}
                </div>
             </div>
          )}

          {/* 2. WEB TOOLS */}
          {tab === 'web' && (
            <div className="space-y-8">
              <div className="flex flex-wrap gap-4 mb-4 border-b border-white/10 pb-4">
                  {['Phishing Scanner', 'Cheatsheet', 'Google Dork', 'SQLMap', 'Headers', 'User Agent', 'Curl', 'URL Enc/Dec', 'HTML Enc/Dec', 'JSON Utils', 'JWT Debugger'].map(t => (
                      <button key={t} onClick={() => setSubTool(t)} className={`px-3 py-1 rounded text-xs font-mono border whitespace-nowrap ${subTool === t ? 'bg-green-500/10 text-green-500 border-green-500' : 'text-gray-500 border-gray-200 dark:border-white/10'}`}>{t}</button>
                  ))}
              </div>

              {subTool === 'URL Enc/Dec' && (
                  <div className="space-y-4">
                      <textarea value={urlInput} onChange={e => setUrlInput(e.target.value)} className="w-full h-32 bg-black border border-white/20 p-2 text-white font-mono" placeholder="Paste URL..."></textarea>
                      <div className="flex gap-2">
                          <button onClick={() => processUrl('enc')} className="bg-white text-black px-4 py-1 font-bold">Encode</button>
                          <button onClick={() => processUrl('dec')} className="bg-white text-black px-4 py-1 font-bold">Decode</button>
                      </div>
                      <CodeBlock label="Result" content={urlResult} />
                  </div>
              )}
              {subTool === 'HTML Enc/Dec' && (
                  <div className="space-y-4">
                      <textarea value={htmlInput} onChange={e => setHtmlInput(e.target.value)} className="w-full h-32 bg-black border border-white/20 p-2 text-white font-mono" placeholder="Paste HTML..."></textarea>
                      <div className="flex gap-2">
                          <button onClick={() => processHtml('enc')} className="bg-white text-black px-4 py-1 font-bold">Escape</button>
                          <button onClick={() => processHtml('dec')} className="bg-white text-black px-4 py-1 font-bold">Unescape</button>
                      </div>
                      <CodeBlock label="Result" content={htmlResult} />
                  </div>
              )}
              {subTool === 'JSON Utils' && (
                  <div className="space-y-4">
                      <textarea value={jsonInput} onChange={e => setJsonInput(e.target.value)} className="w-full h-32 bg-black border border-white/20 p-2 text-white font-mono" placeholder="Paste JSON..."></textarea>
                      <div className="flex gap-2">
                          <button onClick={() => processJson('fmt')} className="bg-white text-black px-4 py-1 font-bold">Format</button>
                          <button onClick={() => processJson('min')} className="bg-white text-black px-4 py-1 font-bold">Minify</button>
                      </div>
                      <CodeBlock label="Result" content={jsonResult} />
                  </div>
              )}
              {subTool === 'JWT Debugger' && (
                  <div className="space-y-4">
                      <textarea value={jwtInput} onChange={e => setJwtInput(e.target.value)} className="w-full h-24 bg-black border border-white/20 p-2 text-white font-mono" placeholder="Paste JWT..."></textarea>
                      <button onClick={decodeJwt} className="bg-white text-black px-4 py-1 font-bold">Decode</button>
                      <CodeBlock label="Decoded Header & Payload" content={jwtDecoded} />
                  </div>
              )}

              {subTool === 'Phishing Scanner' && (
                <div className="max-w-xl mx-auto text-center space-y-4">
                   <input type="text" placeholder="https://suspicious-link.com" className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-white/20 p-3 rounded font-mono text-gray-900 dark:text-white" value={phishUrl} onChange={e => setPhishUrl(e.target.value)} />
                   <button onClick={checkPhish} className="bg-white text-black font-bold px-6 py-2 rounded">Analyze URL</button>
                   {phishResult && <div className={`p-4 rounded border ${phishResult.safe ? 'border-green-500 bg-green-500/10 text-green-400' : 'border-red-500 bg-red-500/10 text-red-400'}`}>{phishResult.reason}</div>}
                </div>
              )}

              {subTool === 'Cheatsheet' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 h-[500px] overflow-y-auto">
                  {CHEATSHEET_DATA.map((cat, i) => (
                    <div key={i} className="space-y-3">
                      <h3 className="font-mono text-sm text-green-600 dark:text-green-400 border-b border-gray-200 dark:border-white/10 pb-2">{cat.category}</h3>
                      <div className="space-y-2">{cat.payloads.map((payload, idx) => <CompactCodeRow key={idx} content={payload} />)}</div>
                    </div>
                  ))}
                </div>
              )}

              {subTool === 'Google Dork' && (
                  <div className="max-w-xl mx-auto space-y-4">
                      <input type="text" placeholder="Target Domain (e.g. nasa.gov)" value={dorkDomain} onChange={e => setDorkDomain(e.target.value)} className="w-full bg-black border border-white/20 p-3 text-white" />
                      <select value={dorkType} onChange={e => setDorkType(e.target.value)} className="w-full bg-black border border-white/20 p-3 text-white">
                          {Object.keys(GOOGLE_DORKS).map(k => <option key={k} value={k}>{k}</option>)}
                      </select>
                      <div className="bg-black p-4 border border-green-500 text-green-400 font-mono break-all">
                          {(GOOGLE_DORKS as any)[dorkType].replace('{domain}', dorkDomain || 'example.com')}
                      </div>
                      <a href={`https://www.google.com/search?q=${encodeURIComponent((GOOGLE_DORKS as any)[dorkType].replace('{domain}', dorkDomain || 'example.com'))}`} target="_blank" rel="noreferrer" className="block text-center text-white underline">Open in Google</a>
                  </div>
              )}

              {subTool === 'SQLMap' && (
                  <div className="max-w-xl mx-auto space-y-4">
                      <input type="text" placeholder="Vulnerable URL" value={sqlMapUrl} onChange={e => setSqlMapUrl(e.target.value)} className="w-full bg-black border border-white/20 p-2 text-white" />
                      <div className="flex gap-4">
                          <label className="text-white"><input type="checkbox" checked={sqlMapOptions.dbs} onChange={e => setSqlMapOptions({...sqlMapOptions, dbs: e.target.checked})} /> --dbs</label>
                          <label className="text-white"><input type="checkbox" checked={sqlMapOptions.tables} onChange={e => setSqlMapOptions({...sqlMapOptions, tables: e.target.checked})} /> --tables</label>
                          <label className="text-white"><input type="checkbox" checked={sqlMapOptions.dump} onChange={e => setSqlMapOptions({...sqlMapOptions, dump: e.target.checked})} /> --dump</label>
                      </div>
                      <code className="block bg-black p-4 text-green-500 border border-white/20">
                          sqlmap -u "{sqlMapUrl}" {sqlMapOptions.dbs ? '--dbs' : ''} {sqlMapOptions.tables ? '--tables' : ''} {sqlMapOptions.dump ? '--dump' : ''} --batch --random-agent
                      </code>
                  </div>
              )}

              {subTool === 'Headers' && (
                  <div className="space-y-4">
                      <textarea placeholder="Paste HTTP Response Headers..." value={httpHeaderInput} onChange={e => setHttpHeaderInput(e.target.value)} className="w-full h-32 bg-black border border-white/20 p-2 text-white font-mono"></textarea>
                      <button onClick={analyzeHeaders} className="bg-white text-black px-4 py-1 rounded">Analyze</button>
                      <div className="space-y-1">
                          {headerAnalysis.map((h, i) => <div key={i} className="text-red-400 font-mono">- {h}</div>)}
                      </div>
                  </div>
              )}

              {subTool === 'User Agent' && (
                  <div className="space-y-4">
                      <input type="text" value={uaInput} onChange={e => setUaInput(e.target.value)} className="w-full bg-black border border-white/20 p-2 text-white font-mono" />
                      <button onClick={parseUa} className="bg-white text-black px-4 py-1 rounded">Parse</button>
                      <div className="text-green-500 font-mono text-lg">{uaResult}</div>
                  </div>
              )}

              {subTool === 'Curl' && (
                  <div className="space-y-4 max-w-xl mx-auto">
                      <div className="flex gap-2">
                          <select value={curlMethod} onChange={e => setCurlMethod(e.target.value)} className="bg-black border border-white/20 text-white p-2">
                              {['GET','POST','PUT','DELETE'].map(m => <option key={m} value={m}>{m}</option>)}
                          </select>
                          <input type="text" placeholder="URL" value={curlUrl} onChange={e => setCurlUrl(e.target.value)} className="flex-1 bg-black border border-white/20 p-2 text-white" />
                      </div>
                      {curlMethod !== 'GET' && <textarea placeholder="Data (JSON/Form)" value={curlData} onChange={e => setCurlData(e.target.value)} className="w-full h-24 bg-black border border-white/20 p-2 text-white font-mono" />}
                      <code className="block bg-black p-4 text-green-500 border border-white/20 whitespace-pre-wrap break-all">
                          {getCurlCmd()}
                      </code>
                  </div>
              )}
            </div>
          )}

          {/* 3. NETWORK TOOLS */}
          {tab === 'network' && (
             <div className="space-y-8">
                <div className="flex gap-4 border-b border-gray-200 dark:border-white/10 pb-4 overflow-x-auto no-scrollbar">
                  {['Subnet', 'DNS', 'WiFi', 'IPv6', 'MAC Lookup', 'Ports', 'HTTP Codes'].map(t => (
                      <button key={t} onClick={() => setSubTool(t)} className={`text-sm font-mono whitespace-nowrap ${subTool === t ? 'text-green-500' : 'text-gray-500'}`}>{t}</button>
                  ))}
                </div>
                
                {subTool === 'MAC Lookup' && (
                    <div className="max-w-xl mx-auto space-y-4">
                        <input type="text" placeholder="00:00:00:00:00:00" value={macInput} onChange={e => setMacInput(e.target.value)} className="w-full bg-black border border-white/20 p-3 text-white font-mono" />
                        <button onClick={lookupMac} className="w-full bg-white text-black font-bold py-2">Lookup Vendor</button>
                        <div className="bg-black p-4 border border-green-500 text-green-500 font-mono text-center">{macVendor}</div>
                    </div>
                )}
                {subTool === 'Ports' && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 h-[500px] overflow-y-auto">
                        {PORTS_DATA.map(p => (
                            <div key={p.port} className="bg-white/5 p-3 rounded border border-white/10">
                                <div className="text-green-500 font-bold font-mono">{p.port} / {p.service}</div>
                                <div className="text-xs text-white/50">{p.desc}</div>
                            </div>
                        ))}
                    </div>
                )}
                {subTool === 'HTTP Codes' && (
                    <div className="grid md:grid-cols-2 gap-4 h-[500px] overflow-y-auto">
                        {HTTP_STATUS.map(s => (
                            <div key={s.code} className="bg-white/5 p-3 rounded border border-white/10 flex justify-between items-center">
                                <div>
                                    <span className={`font-bold font-mono ${s.code >= 400 ? 'text-red-400' : 'text-green-400'}`}>{s.code}</span>
                                    <span className="ml-2 text-white font-mono">{s.msg}</span>
                                </div>
                                <span className="text-xs text-white/50">{s.desc}</span>
                            </div>
                        ))}
                    </div>
                )}

                {subTool === 'IPv6' && (
                    <div className="max-w-xl mx-auto space-y-4">
                        <input type="text" placeholder="2001:db8::1" value={ipv6Input} onChange={e => setIpv6Input(e.target.value)} className="w-full bg-black border border-white/20 p-3 text-white font-mono" />
                        <button onClick={processIpv6} className="w-full bg-white text-black font-bold py-2">Expand / Compress</button>
                        <div className="bg-black p-4 border border-green-500 text-green-500 font-mono break-all">{ipv6Result}</div>
                    </div>
                )}
                
                {subTool === 'Subnet' && (
                  <div className="grid md:grid-cols-2 gap-8">
                     <div>
                        <div className="flex gap-2">
                           <input type="text" value={subnetInput} onChange={e => setSubnetInput(e.target.value)} className="flex-1 bg-gray-50 dark:bg-black border border-gray-300 dark:border-white/20 p-2 rounded text-gray-900 dark:text-white font-mono" />
                           <button onClick={calcSubnet} className="bg-green-500 text-black px-4 rounded font-bold">Calc</button>
                        </div>
                     </div>
                     <div className="bg-gray-50 dark:bg-white/5 p-4 rounded border border-gray-200 dark:border-white/10 space-y-2 font-mono text-sm">
                        <div className="flex justify-between text-gray-900 dark:text-white"><span>Network:</span> <span>{subnetResult.network}</span></div>
                        <div className="flex justify-between text-gray-900 dark:text-white"><span>Broadcast:</span> <span>{subnetResult.broadcast}</span></div>
                        <div className="flex justify-between text-gray-900 dark:text-white"><span>Hosts:</span> <span className="text-green-500">{subnetResult.hosts}</span></div>
                     </div>
                  </div>
                )}

                {subTool === 'DNS' && (
                   <div className="space-y-4">
                      <div className="flex gap-2">
                         <input type="text" placeholder="example.com" value={dnsDomain} onChange={e => setDnsDomain(e.target.value)} className="flex-1 bg-gray-50 dark:bg-black border border-gray-300 dark:border-white/20 p-2 rounded text-gray-900 dark:text-white font-mono" />
                         <button onClick={lookupDns} className="bg-white text-black px-4 rounded font-bold"><Search size={16} /></button>
                      </div>
                      <pre className="bg-gray-50 dark:bg-black p-4 rounded border border-gray-200 dark:border-white/10 font-mono text-xs text-green-500 h-64 overflow-auto">
                        {dnsResults}
                      </pre>
                   </div>
                )}

                {subTool === 'WiFi' && (
                   <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                      <div className="space-y-4 w-full max-w-xs">
                         <input type="text" placeholder="SSID Name" value={wifiSSID} onChange={e => setWifiSSID(e.target.value)} className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-white/20 p-2 rounded text-gray-900 dark:text-white" />
                         <input type="password" placeholder="Password" value={wifiPass} onChange={e => setWifiPass(e.target.value)} className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-white/20 p-2 rounded text-gray-900 dark:text-white" />
                      </div>
                      <div className="bg-white p-4 rounded-xl">
                         <div ref={wifiQrRef}></div>
                      </div>
                   </div>
                )}
             </div>
          )}
          
          {/* 4. FORENSICS */}
          {tab === 'forensics' && (
              <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-4">
                     <button onClick={() => setSubTool('meta')} className={`p-4 border rounded ${subTool === 'meta' ? 'border-green-500' : 'border-gray-200 dark:border-white/10'}`}>Metadata Scrubber</button>
                     <button onClick={() => setSubTool('stego')} className={`p-4 border rounded ${subTool === 'stego' ? 'border-green-500' : 'border-gray-200 dark:border-white/10'}`}>Steganography</button>
                  </div>
                  {subTool === 'meta' && (
                      <div className="grid md:grid-cols-2 gap-8">
                         <div>
                            <input type="file" onChange={handleImageMeta} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 dark:file:bg-green-500/10 dark:file:text-green-400"/>
                            {scrubbedImage && <a href={scrubbedImage} download="scrubbed.jpg" className="inline-block mt-4 text-green-500 border border-green-500 px-4 py-2 rounded text-sm hover:bg-green-500 hover:text-black transition-colors">Download Clean Image</a>}
                         </div>
                         <div className="bg-gray-50 dark:bg-black p-4 rounded border border-gray-200 dark:border-white/10 font-mono text-xs h-64 overflow-auto">
                            {metaData ? JSON.stringify(metaData, null, 2) : <span className="text-gray-400 dark:text-white/30">Upload image to view/scrub EXIF data...</span>}
                         </div>
                      </div>
                  )}
                  {subTool === 'stego' && (
                      <div className="space-y-4">
                         <div className="flex gap-4">
                             <input type="file" onChange={e => setStegoImage(e.target.files?.[0] || null)} />
                             <input type="text" placeholder="Hidden Message" value={stegoMessage} onChange={e => setStegoMessage(e.target.value)} className="bg-gray-50 dark:bg-black border border-gray-300 dark:border-white/20 p-2 rounded text-gray-900 dark:text-white flex-1" />
                             <button onClick={processStego} className="bg-white text-black px-4 rounded font-bold">Hide</button>
                         </div>
                         {stegoResult && <div className="text-center"><img src={stegoResult} alt="Stego" className="max-h-64 mx-auto border border-green-500" /></div>}
                      </div>
                  )}
              </div>
          )}

          {/* 5. VAULT */}
          {tab === 'vault' && (
              <div className="max-w-md mx-auto space-y-6 text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lock size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">CipherDrop Secure Transfer</h3>
                  <div className="space-y-4">
                      <input type="file" onChange={e => setVaultFile(e.target.files?.[0] || null)} className="block w-full text-sm text-gray-400 border border-gray-200 dark:border-white/10 rounded p-2" />
                      <input type="password" placeholder="Encryption Key" value={vaultKey} onChange={e => setVaultKey(e.target.value)} className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-white/20 p-3 rounded text-center text-gray-900 dark:text-white font-mono" />
                      <div className="flex gap-4 justify-center">
                          <button onClick={() => processVault('encrypt')} className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded font-bold transition-colors">Encrypt</button>
                          <button onClick={() => processVault('decrypt')} className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded font-bold transition-colors">Decrypt</button>
                      </div>
                      {vaultResult && <div className="mt-6 bg-green-500/10 border border-green-500/50 p-4 rounded text-green-400"><a href={vaultResult} download={`cipher_${vaultFile?.name}`} className="flex items-center justify-center gap-2 font-bold hover:underline"><Download size={16} /> Download Result</a></div>}
                  </div>
              </div>
          )}

          {/* 6. CTF TOOLKIT */}
          {tab === 'ctf' && (
              <div className="space-y-6">
                 {/* CTF Sub-nav */}
                 <div className="flex gap-4 border-b border-gray-200 dark:border-white/10 pb-2 mb-4 overflow-x-auto no-scrollbar">
                     {['Magic Bytes', 'XOR', 'Reverse Shell', 'Crontab', 'Linux Cmd', 'Git Cmd', 'Bin Calc', 'Caesar', 'RSA', 'Frequency', 'Base Decoders', 'Timestamp', 'QR Decode'].map(tool => (
                         <button key={tool} onClick={() => setSubTool(tool)} className={`whitespace-nowrap px-3 py-1 rounded text-xs font-mono border transition-all ${subTool === tool ? 'border-green-500 bg-green-500/10 text-green-400' : 'border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-500 dark:text-white/50'}`}>{tool}</button>
                     ))}
                 </div>
                 
                 {subTool === 'Linux Cmd' && (
                    <div className="grid md:grid-cols-2 gap-4 h-[500px] overflow-y-auto">
                        {LINUX_COMMANDS.map((c, i) => (
                            <CompactCodeRow key={i} content={c.cmd} desc={c.desc} />
                        ))}
                    </div>
                 )}
                 {subTool === 'Git Cmd' && (
                    <div className="grid md:grid-cols-2 gap-4 h-[500px] overflow-y-auto">
                        {GIT_COMMANDS.map((c, i) => (
                            <CompactCodeRow key={i} content={c.cmd} desc={c.desc} />
                        ))}
                    </div>
                 )}
                 {subTool === 'Bin Calc' && (
                     <div className="max-w-xl mx-auto space-y-4">
                         <div className="text-center font-mono text-gray-400 mb-4">Input any value (updates all)</div>
                         <div className="grid grid-cols-2 gap-4">
                             <div>
                                 <label className="text-xs text-green-500 font-mono">Decimal</label>
                                 <input value={binCalcRes.dec} onChange={e => setBinCalcInput(e.target.value)} className="w-full bg-black border border-white/20 p-2 font-mono text-white" />
                             </div>
                             <div>
                                 <label className="text-xs text-green-500 font-mono">Hex</label>
                                 <input value={binCalcRes.hex} readOnly className="w-full bg-white/5 border border-white/10 p-2 font-mono text-gray-400" />
                             </div>
                             <div className="col-span-2">
                                 <label className="text-xs text-green-500 font-mono">Binary</label>
                                 <input value={binCalcRes.bin} readOnly className="w-full bg-white/5 border border-white/10 p-2 font-mono text-gray-400" />
                             </div>
                         </div>
                     </div>
                 )}

                 {/* New: Reverse Shell */}
                 {subTool === 'Reverse Shell' && (
                     <div className="max-w-3xl mx-auto space-y-6">
                         <div className="grid grid-cols-2 gap-4">
                             <input type="text" placeholder="IP Address" value={shellIp} onChange={e => setShellIp(e.target.value)} className="bg-black border border-white/20 p-2 text-white font-mono" />
                             <input type="text" placeholder="Port" value={shellPort} onChange={e => setShellPort(e.target.value)} className="bg-black border border-white/20 p-2 text-white font-mono" />
                         </div>
                         <div className="space-y-4">
                             {Object.entries(SHELL_TEMPLATES).map(([type, tmpl]) => (
                                 <div key={type}>
                                     <div className="text-xs text-green-500 mb-1">{type}</div>
                                     <CompactCodeRow content={tmpl.replace('{ip}', shellIp).replace('{port}', shellPort)} />
                                 </div>
                             ))}
                         </div>
                     </div>
                 )}

                 {/* New: Crontab */}
                 {subTool === 'Crontab' && (
                     <div className="max-w-xl mx-auto space-y-4 text-center">
                         <div className="grid grid-cols-5 gap-2 text-white font-mono text-sm">
                             <div>Min</div><div>Hour</div><div>Day</div><div>Month</div><div>Week</div>
                             <input value={crontabMin} onChange={e => setCrontabMin(e.target.value)} className="bg-black border border-white/20 p-2 text-center" />
                             <input value={crontabHour} onChange={e => setCrontabHour(e.target.value)} className="bg-black border border-white/20 p-2 text-center" />
                             <input value={crontabDay} onChange={e => setCrontabDay(e.target.value)} className="bg-black border border-white/20 p-2 text-center" />
                             <input value={crontabMonth} onChange={e => setCrontabMonth(e.target.value)} className="bg-black border border-white/20 p-2 text-center" />
                             <input value={crontabWeek} onChange={e => setCrontabWeek(e.target.value)} className="bg-black border border-white/20 p-2 text-center" />
                         </div>
                         <div className="bg-black p-4 border border-green-500 text-green-500 font-mono text-2xl">
                             {crontabMin} {crontabHour} {crontabDay} {crontabMonth} {crontabWeek} /path/to/command
                         </div>
                     </div>
                 )}

                 {/* Existing CTF tools */}
                 {subTool === 'Magic Bytes' && (
                     <div className="text-center py-8">
                         <input type="file" onChange={e => e.target.files?.[0] && handleMagicBytes(e.target.files[0])} className="mb-4" />
                         {magicBytesResult && <div className="text-xl font-mono text-green-500">{magicBytesResult}</div>}
                     </div>
                 )}
                 {subTool === 'XOR' && (
                     <div className="grid grid-cols-1 gap-4 max-w-lg mx-auto">
                         <input type="text" placeholder="Hex String A" value={xorInputA} onChange={e => setXorInputA(e.target.value)} className="bg-black border border-white/20 p-2 font-mono text-white" />
                         <input type="text" placeholder="Hex String B" value={xorInputB} onChange={e => setXorInputB(e.target.value)} className="bg-black border border-white/20 p-2 font-mono text-white" />
                         <button onClick={solveXor} className="bg-white text-black font-bold py-2">XOR</button>
                         <div className="bg-black p-4 border border-green-500 text-green-500 font-mono break-all">{xorResult}</div>
                     </div>
                 )}
                 {subTool === 'Caesar' && (
                     <div className="space-y-2 max-w-lg mx-auto">
                         <input type="text" placeholder="Ciphertext" onChange={e => setOutput({...output, text: solveClassical(e.target.value, 13)})} className="w-full bg-black border border-white/20 p-2 text-white" />
                         <div className="bg-black p-4 text-green-500 font-mono">ROT13: {output.text}</div>
                     </div>
                 )}
                 {subTool === 'RSA' && (
                     <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                         <input type="text" placeholder="Prime p" value={rsaInputs.p} onChange={e => setRsaInputs({...rsaInputs, p: e.target.value})} className="bg-black border border-white/20 p-2 font-mono text-white" />
                         <input type="text" placeholder="Prime q" value={rsaInputs.q} onChange={e => setRsaInputs({...rsaInputs, q: e.target.value})} className="bg-black border border-white/20 p-2 font-mono text-white" />
                         <button onClick={calcRSA} className="col-span-2 bg-green-600 text-white font-bold py-2">Calculate N & Phi</button>
                         <pre className="col-span-2 bg-black p-4 text-green-500 font-mono whitespace-pre-wrap">{rsaResult}</pre>
                     </div>
                 )}
                 {subTool === 'Frequency' && (
                     <div className="space-y-4">
                         <textarea placeholder="Paste Ciphertext here..." value={freqInput} onChange={e => setFreqInput(e.target.value)} className="w-full h-32 bg-black border border-white/20 p-2 text-white font-mono"></textarea>
                         <button onClick={updateFrequency} className="bg-white text-black px-4 py-1">Analyze</button>
                         <div className="h-64 w-full bg-white/5"><canvas ref={freqCanvasRef}></canvas></div>
                     </div>
                 )}
                 {subTool === 'Base Decoders' && (
                     <div className="space-y-4 max-w-xl mx-auto">
                         <div className="flex gap-2 justify-center">{['32', '58', '85'].map(b => <button key={b} onClick={() => setBaseType(b)} className={`px-4 py-1 border ${baseType === b ? 'bg-green-500 text-black' : 'text-white border-white/20'}`}>Base{b}</button>)}</div>
                         <textarea value={baseInput} onChange={e => setBaseInput(e.target.value)} className="w-full h-32 bg-black border border-white/20 p-2 text-white font-mono" placeholder="Paste encoded string..."></textarea>
                         <button onClick={solveDecoders} className="w-full bg-white text-black py-2 font-bold">Decode</button>
                         <div className="bg-black p-4 border border-green-500 text-green-500 font-mono break-all">{baseResult}</div>
                     </div>
                 )}
                 {subTool === 'Timestamp' && (
                     <div className="flex gap-4 justify-center">
                         <input type="text" placeholder="Unix Timestamp" value={tsInput} onChange={e => setTsInput(e.target.value)} className="bg-black border border-white/20 p-2 text-white font-mono" />
                         <button onClick={convertTs} className="bg-white text-black px-4">Convert</button>
                         <div className="p-2 text-green-500 font-mono">{tsResult}</div>
                     </div>
                 )}
                 {subTool === 'QR Decode' && (
                     <div className="text-center space-y-4">
                         <input type="file" onChange={handleQrUpload} />
                         <div className="bg-black p-4 border border-green-500 text-green-500 font-mono break-all max-w-lg mx-auto">{qrDecodeResult || "Upload QR image to decode"}</div>
                     </div>
                 )}
              </div>
          )}

          {/* 7. UTILS */}
          {tab === 'utils' && (
            <div className="space-y-6">
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
                 {[
                   { id: 'uuid', label: 'UUID Gen', icon: Key },
                   { id: 'chmod', label: 'Chmod Calc', icon: Lock },
                   { id: 'slug', label: 'Slugify', icon: Link },
                   { id: 'stats', label: 'Text Stats', icon: Type },
                   { id: 'case', label: 'Case Conv', icon: Type },
                   { id: 'color', label: 'Color Conv', icon: Palette },
                   { id: 'lorem', label: 'Lorem Ipsum', icon: FileCode },
                   { id: 'aspect', label: 'Aspect Ratio', icon: Layout },
                   { id: 'qr', label: 'QR Gen', icon: QrCode },
                   { id: 'percent', label: 'Percent', icon: Binary }
                 ].map(u => (
                    <button key={u.id} onClick={() => setSubTool(u.id)} className={`p-3 rounded border flex flex-col items-center gap-2 text-xs font-mono transition-all ${subTool === u.id ? 'bg-green-500 text-black border-green-500' : 'bg-transparent text-gray-400 border-gray-600 hover:bg-white/5'}`}>
                      <u.icon size={20} /> {u.label}
                    </button>
                 ))}
               </div>

               {/* Utils Content */}
               {subTool === 'uuid' && (
                 <div className="max-w-lg mx-auto space-y-4">
                    <div className="flex gap-4 items-center">
                       <span>Count:</span>
                       <input type="number" value={uuidCount} onChange={e => setUuidCount(Number(e.target.value))} className="bg-black border border-white/20 p-2 w-20 text-white" />
                       <button onClick={genUuids} className="bg-white text-black px-4 py-2 font-bold">Generate</button>
                    </div>
                    <textarea value={uuids} readOnly className="w-full h-48 bg-black border border-green-500 p-4 font-mono text-green-500" />
                 </div>
               )}

               {subTool === 'slug' && (
                 <div className="max-w-xl mx-auto space-y-4">
                    <input type="text" placeholder="Enter Title" value={slugInput} onChange={e => setSlugInput(e.target.value)} className="w-full bg-black border border-white/20 p-3 text-white" />
                    <div className="bg-black border border-green-500 p-4 text-green-500 font-mono text-lg">{slugResult}</div>
                 </div>
               )}

               {subTool === 'stats' && (
                 <div className="space-y-4">
                   <textarea value={textStatsInput} onChange={e => setTextStatsInput(e.target.value)} className="w-full h-48 bg-black border border-white/20 p-4 text-white" placeholder="Paste text here..."></textarea>
                   <div className="flex gap-8 justify-center text-xl font-mono">
                      <div>Chars: <span className="text-green-500">{textStats.chars}</span></div>
                      <div>Words: <span className="text-green-500">{textStats.words}</span></div>
                      <div>Lines: <span className="text-green-500">{textStats.lines}</span></div>
                   </div>
                 </div>
               )}

               {subTool === 'case' && (
                 <div className="space-y-4 max-w-xl mx-auto">
                    <input type="text" value={caseInput} onChange={e => setCaseInput(e.target.value)} className="w-full bg-black border border-white/20 p-3 text-white" placeholder="Enter text..." />
                    <div className="flex gap-2 justify-center">
                      {['upper', 'lower', 'camel', 'snake'].map(t => (
                        <button key={t} onClick={() => convertCase(t)} className="px-3 py-1 border border-white/20 text-white text-xs uppercase hover:bg-white/10">{t}</button>
                      ))}
                    </div>
                    <div className="bg-black border border-green-500 p-4 text-green-500 font-mono text-center text-lg">{caseResult}</div>
                 </div>
               )}

               {subTool === 'color' && (
                  <div className="max-w-md mx-auto space-y-4 text-center">
                     <input type="color" value={colorInput} onChange={e => convertColor(e.target.value)} className="w-24 h-24 bg-transparent border-none cursor-pointer" />
                     <div className="font-mono text-white text-xl">{colorInput}</div>
                     <div className="font-mono text-green-500">{colorResult.rgb}</div>
                  </div>
               )}

               {subTool === 'aspect' && (
                  <div className="max-w-md mx-auto space-y-4">
                      <div className="flex gap-2 items-center">
                         <input type="number" value={aspectW} onChange={e => setAspectW(Number(e.target.value))} className="bg-black border border-white/20 p-2 w-full text-white" />
                         <span className="text-white">x</span>
                         <input type="number" value={aspectH} onChange={e => setAspectH(Number(e.target.value))} className="bg-black border border-white/20 p-2 w-full text-white" />
                      </div>
                      <div className="text-center text-4xl font-bold text-green-500">{aspectRes}</div>
                  </div>
               )}

               {subTool === 'qr' && (
                  <div className="space-y-4 text-center">
                      <input type="text" placeholder="Enter URL or Text" value={genericQrInput} onChange={e => setGenericQrInput(e.target.value)} className="w-full max-w-md bg-black border border-white/20 p-3 text-white" />
                      <div className="bg-white p-4 inline-block rounded-xl">
                          <div ref={genericQrRef}></div>
                      </div>
                  </div>
               )}

               {subTool === 'chmod' && (
                   <div className="max-w-md mx-auto text-center space-y-4">
                       <div className="text-6xl font-mono text-green-500">{chmodOctal}</div>
                       <div className="text-xl font-mono text-gray-400">{chmodStr}</div>
                       <div className="grid grid-cols-3 gap-4 text-left p-4 bg-white/5 rounded">
                           {['Owner', 'Group', 'Public'].map((role, i) => (
                             <div key={role} className="flex flex-col gap-2">
                                <div className="text-xs uppercase text-gray-500">{role}</div>
                                {['Read', 'Write', 'Execute'].map((perm, j) => {
                                   const val = [4,2,1][j];
                                   const currentDigit = parseInt(chmodOctal[i]);
                                   const isChecked = (currentDigit & val) === val;
                                   return (
                                     <label key={perm} className="flex items-center gap-2 text-sm text-white cursor-pointer">
                                        <input type="checkbox" checked={isChecked} onChange={() => {
                                            const digits = chmodOctal.split('').map(Number);
                                            digits[i] = isChecked ? digits[i] - val : digits[i] + val;
                                            const newOctal = digits.join('');
                                            setChmodOctal(newOctal);
                                            // Update Str
                                            let s = '';
                                            for(let k=0; k<3; k++) {
                                               const d = digits[k];
                                               s += (d & 4) ? 'r' : '-';
                                               s += (d & 2) ? 'w' : '-';
                                               s += (d & 1) ? 'x' : '-';
                                            }
                                            setChmodStr(subTool === 'chmod' ? '-' + s : ''); // subTool check is just to use state
                                        }} /> {perm}
                                     </label>
                                   )
                                })}
                             </div>
                           ))}
                       </div>
                   </div>
               )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
