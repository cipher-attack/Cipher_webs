

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, RefreshCw, Copy, Check, Lock, FileCode, ShieldCheck, Zap, Globe, Network, Image, Search, Key, Download, Eraser, Wifi, EyeOff, AlertTriangle, Flag, X, Binary, Command, Server, Smartphone, Link, Hash, Layout, Type, Palette, QrCode, Mic, Video, Battery, MapPin, Activity, Speaker, Fingerprint, User, CreditCard, Mail, Cpu, Play, Pause, Camera, ExternalLink, HardDrive, Box, Clock, Thermometer, Compass, Code, MoreHorizontal, Maximize, Bluetooth, Gamepad, Bell, PictureInPicture, Sun, GitMerge, FileDiff, List, Shield } from 'lucide-react';
import { CHEATSHEET_DATA, GOOGLE_DORKS, MAGIC_BYTES, HASH_PATTERNS, SHELL_TEMPLATES, PORTS_DATA, LINUX_COMMANDS, GIT_COMMANDS, HTTP_STATUS, DOCKER_SECURITY_RULES, FAKE_ID_DATA, DREAD_CATEGORIES, HOMOGRAPH_MAP, MORSE_CODE_MAP } from '../constants';

interface Props {
  t: any;
  onBack: () => void;
}

// --- Helper Functions ---

const modInverse = (a: bigint, m: bigint): bigint => {
  let [m0, x, y] = [m, 1n, 0n];
  if (m === 1n) return 0n;
  while (a > 1n) {
    if (m === 0n) return 0n;
    let q = a / m;
    [a, m] = [m, a % m];
    [x, y] = [y, x - q * y];
  }
  return x < 0n ? x + m0 : x;
};

const decodeBase32 = (input: string) => {
    const a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let bits = 0, value = 0, output = "";
    const clean = input.toUpperCase().replace(/=+$/, "");
    for (let i = 0; i < clean.length; i++) {
        const val = a.indexOf(clean[i]);
        if (val === -1) continue;
        value = (value << 5) | val;
        bits += 5;
        if (bits >= 8) {
            output += String.fromCharCode((value >>> (bits - 8)) & 0xFF);
            bits -= 8;
        }
    }
    return output;
};

const decodeBase58 = (input: string) => {
    const a = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    let d = 0n;
    for(const char of input) {
        const index = a.indexOf(char);
        if (index === -1) continue;
        d = d * 58n + BigInt(index);
    }
    let hex = d.toString(16);
    if(hex.length % 2) hex = '0' + hex;
    let str = '';
    for(let i=0; i<hex.length; i+=2) str += String.fromCharCode(parseInt(hex.substr(i,2), 16));
    return str;
};

// CTF Helpers
const toMorse = (text: string) => text.toUpperCase().split('').map(c => MORSE_CODE_MAP[c] || c).join(' ');
const fromMorse = (text: string) => {
    const reversed = Object.entries(MORSE_CODE_MAP).reduce((acc, [k, v]) => ({...acc, [v]: k}), {} as any);
    return text.split(' ').map(c => reversed[c] || c).join('');
};
const caesarCipher = (str: string, shift: number) => {
    return str.replace(/[a-zA-Z]/g, (c) => {
        const base = c >= 'a' ? 97 : 65;
        return String.fromCharCode(((c.charCodeAt(0) - base + shift) % 26) + base);
    });
};
const vigenereCipher = (str: string, key: string, decrypt = false) => {
    if(!key) return str;
    let result = '';
    let keyIndex = 0;
    for(let i=0; i<str.length; i++) {
        const c = str.charCodeAt(i);
        if(c >= 65 && c <= 90) { // Upper
             const k = key.toUpperCase().charCodeAt(keyIndex % key.length) - 65;
             const shift = decrypt ? (26 - k) : k;
             result += String.fromCharCode(((c - 65 + shift) % 26) + 65);
             keyIndex++;
        } else if (c >= 97 && c <= 122) { // Lower
             const k = key.toUpperCase().charCodeAt(keyIndex % key.length) - 65;
             const shift = decrypt ? (26 - k) : k;
             result += String.fromCharCode(((c - 97 + shift) % 26) + 97);
             keyIndex++;
        } else {
            result += str[i];
        }
    }
    return result;
};
// New CTF Helpers
const rot47 = (str: string) => {
  return str.split('').map(char => {
    const c = char.charCodeAt(0);
    if (c >= 33 && c <= 126) {
      return String.fromCharCode(33 + ((c + 14) % 94));
    }
    return char;
  }).join('');
};
const atbash = (str: string) => {
  return str.replace(/[a-zA-Z]/g, (char) => {
    const base = char >= 'a' ? 97 : 65;
    return String.fromCharCode(base + (25 - (char.charCodeAt(0) - base)));
  });
};
const railFence = (str: string, rails: number, decrypt = false) => {
  if (rails < 2) return str;
  const fence = new Array(rails).fill('').map(() => []);
  let rail = 0;
  let dir = 1;
  // Simplified Rail Fence visualization logic for encryption
  if(!decrypt) {
      for(const char of str) {
          // @ts-ignore
          fence[rail].push(char);
          rail += dir;
          if(rail === 0 || rail === rails -1) dir = -dir;
      }
      return fence.flat().join('');
  }
  return "Decryption not implemented for visual demo";
};
const affineCipher = (str: string, a: number, b: number) => {
    return str.replace(/[a-zA-Z]/g, char => {
        const base = char >= 'a' ? 97 : 65;
        const x = char.charCodeAt(0) - base;
        return String.fromCharCode(((a * x + b) % 26) + base);
    });
};
const baconianCipher = (str: string) => {
    return str.toUpperCase().replace(/[A-Z]/g, char => {
        const code = char.charCodeAt(0) - 65;
        let bin = code.toString(2).padStart(5, '0');
        return bin.replace(/0/g, 'A').replace(/1/g, 'B') + ' ';
    });
};

// Utils Helpers
const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
};
const rgbToHex = (r: number, g: number, b: number) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

// --- Component ---

export const EncryptionTool: React.FC<Props> = ({ t, onBack }) => {
  const [activeTab, setActiveTab] = useState('web');
  const [subTool, setSubTool] = useState('dorks');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  
  // Specific Tool States
  const [selectedHash, setSelectedHash] = useState('SHA-256');
  const [rsaParams, setRsaParams] = useState({ p: '', q: '', e: '65537' });
  const [rsaKeys, setRsaKeys] = useState<{ n: string, phi: string, d: string } | null>(null);
  const [hardwareData, setHardwareData] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [utilsState, setUtilsState] = useState({
      fakeId: null as any,
      luhnValid: null as boolean | null,
      binaryRes: '',
      dockerIssues: [] as any[],
      dorkDomain: 'example.com',
      // New Utils State
      cron: { min: '*', hour: '*', dom: '*', mon: '*', dow: '*' },
      textStats: { chars: 0, words: 0, lines: 0 },
      colors: { hex: '#000000', rgb: '', hsl: '' },
      // Advanced Utils
      regexMatch: null as boolean | null,
      uuidList: [] as string[],
      diffRes: '',
      chmod: { u: 7, g: 5, o: 5 },
      urlParts: null as any
  });
  
  // CTF New State
  const [ctfState, setCtfState] = useState({
      caesarShift: 13,
      vigenereKey: 'CIPHER',
      affineA: 5,
      affineB: 8,
      railFenceRails: 3
  });

  // Hardware New State
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [orientation, setOrientation] = useState<{alpha: number|null, beta: number|null, gamma: number|null}>({alpha:0, beta:0, gamma:0});
  const [gamepads, setGamepads] = useState<Gamepad[]>([]);
  const [wakeLock, setWakeLock] = useState<any>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const pipVideoRef = useRef<HTMLVideoElement>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- Handlers ---

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTransform = () => {
      try {
        if (subTool === 'hex') setOutput(input.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(''));
        else if (subTool === 'base64') setOutput(btoa(input));
        else if (subTool === 'binary') setOutput(input.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' '));
        else if (subTool === 'fromHex') {
            let str = '';
            for (let i = 0; i < input.length; i += 2) str += String.fromCharCode(parseInt(input.substr(i, 2), 16));
            setOutput(str);
        }
        else if (subTool === 'fromBase64') setOutput(atob(input));
        else setOutput(input); // text
      } catch (e) { setOutput('Error: Invalid Input'); }
  };

  const handleHash = async () => {
    if (!input) return;
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    try {
      const hashBuffer = await crypto.subtle.digest(selectedHash, data);
      setOutput(Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join(''));
    } catch (e) { setOutput("Hashing failed"); }
  };

  const handleCalcRSA = () => {
      try {
          if(!rsaParams.p || !rsaParams.q) throw new Error("Missing Primes");
          const p = BigInt(rsaParams.p.replace(/\D/g,''));
          const q = BigInt(rsaParams.q.replace(/\D/g,''));
          const e = BigInt(rsaParams.e.replace(/\D/g,''));
          const n = p * q;
          const phi = (p - 1n) * (q - 1n);
          const d = modInverse(e, phi);
          setRsaKeys({ n: n.toString(), phi: phi.toString(), d: d.toString() });
      } catch (e) {
          setRsaKeys(null);
          alert("Invalid input. Ensure P and Q are valid prime numbers.");
      }
  };

  const handleBaseDecode = () => {
      try {
          if (subTool === 'b32') setOutput(decodeBase32(input));
          else if (subTool === 'b58') setOutput(decodeBase58(input));
          else if (subTool === 'b64') setOutput(atob(input));
          else setOutput("Select a format");
      } catch (e) { setOutput("Decoding Error"); }
  };

  const handleVault = async (mode: 'encrypt' | 'decrypt') => {
      if (!file || !password) { alert("File and Password required"); return; }
      try {
        const encoder = new TextEncoder();
        const keyMaterial = await window.crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveKey"]);
        const key = await window.crypto.subtle.deriveKey(
            { name: "PBKDF2", salt: encoder.encode("salt"), iterations: 100000, hash: "SHA-256" },
            keyMaterial, { name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]
        );

        const fileBuffer = await file.arrayBuffer();
        let resultBuffer;

        if (mode === 'encrypt') {
            const iv = window.crypto.getRandomValues(new Uint8Array(12));
            const encrypted = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, fileBuffer);
            resultBuffer = new Uint8Array(iv.length + encrypted.byteLength);
            resultBuffer.set(iv);
            resultBuffer.set(new Uint8Array(encrypted), iv.length);
        } else {
            const iv = new Uint8Array(fileBuffer.slice(0, 12));
            const data = fileBuffer.slice(12);
            resultBuffer = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data);
        }

        const blob = new Blob([resultBuffer]);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = mode === 'encrypt' ? `${file.name}.enc` : file.name.replace('.enc', '');
        a.click();
      } catch(e) { alert("Operation failed. Wrong password?"); }
  };

  const handleHardware = async (tool: string) => {
      setHardwareData({ type: 'loading', msg: 'Accessing secure hardware...' });
      try {
        if (tool === 'cam') {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setHardwareData({ type: 'cam', stream });
            if (videoRef.current) videoRef.current.srcObject = stream;
        }
        else if (tool === 'battery') {
            // @ts-ignore
            if (navigator.getBattery) {
               // @ts-ignore
               const bat = await navigator.getBattery();
               setHardwareData({ type: 'battery', level: bat.level * 100, charging: bat.charging });
            } else { setHardwareData({ type: 'error', msg: 'Battery API not supported' }); }
        }
        else if (tool === 'geo') {
            navigator.geolocation.getCurrentPosition(
              (pos) => setHardwareData({ type: 'geo', lat: pos.coords.latitude, lng: pos.coords.longitude, acc: pos.coords.accuracy }),
              (err) => setHardwareData({ type: 'error', msg: err.message })
            );
        }
        else if (tool === 'net') {
             // @ts-ignore
             const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
             if(conn) setHardwareData({ type: 'net', dl: conn.downlink, rtt: conn.rtt, effectiveType: conn.effectiveType });
             else setHardwareData({ type: 'error', msg: 'Network Info Unavailable' });
        }
        else if (tool === 'speech') {
             const u = new SpeechSynthesisUtterance("Cipher Security Systems Online.");
             window.speechSynthesis.speak(u);
             setHardwareData({ type: 'success', msg: 'Audio output test complete.' });
        }
        else if (tool === 'vibrate') {
            if(navigator.vibrate) {
                navigator.vibrate([200, 100, 200]);
                setHardwareData({ type: 'success', msg: 'Haptic feedback triggered.' });
            } else setHardwareData({ type: 'error', msg: 'Vibration not supported' });
        }
        // Previous Hardware
        else if (tool === 'rec') {
             const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
             const mr = new MediaRecorder(stream);
             const chunks: BlobPart[] = [];
             mr.ondataavailable = e => chunks.push(e.data);
             mr.onstop = () => {
                 const blob = new Blob(chunks, { type: 'video/webm' });
                 const url = URL.createObjectURL(blob);
                 const a = document.createElement('a'); a.href = url; a.download = 'recording.webm'; a.click();
                 setRecording(false);
             };
             mr.start();
             setMediaRecorder(mr);
             setRecording(true);
             setHardwareData({ type: 'rec' });
        }
        else if (tool === 'mic') {
             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
             const ctx = new AudioContext();
             const src = ctx.createMediaStreamSource(stream);
             const analyser = ctx.createAnalyser();
             src.connect(analyser);
             setAudioContext(ctx);
             setHardwareData({ type: 'mic', analyser });
        }
        else if (tool === 'stt') {
             // Simple simulation
             setHardwareData({ type: 'stt', msg: 'Listening...' });
        }
        else if (tool === 'device') {
             setHardwareData({ 
                 type: 'device', 
                 cores: navigator.hardwareConcurrency, 
                 ua: navigator.userAgent,
                 res: `${window.screen.width}x${window.screen.height}`,
                 mem: (navigator as any).deviceMemory || 'Unknown'
             });
        }
        else if (tool === 'orient') {
             window.addEventListener('deviceorientation', (e) => {
                 setOrientation({ alpha: e.alpha, beta: e.beta, gamma: e.gamma });
             });
             setHardwareData({ type: 'orient' });
        }
        // NEW HARDWARE TOOLS
        else if (tool === 'bluetooth') {
             // @ts-ignore
             if (navigator.bluetooth) {
                 setHardwareData({ type: 'bluetooth', msg: 'Click below to scan for BLE devices.' });
             } else { setHardwareData({ type: 'error', msg: 'Bluetooth API not supported (Chrome only)' }); }
        }
        else if (tool === 'gamepad') {
             setHardwareData({ type: 'gamepad' });
             const updateGamepads = () => {
                 const gps = navigator.getGamepads();
                 const activeGps = [];
                 for(let i=0; i<gps.length; i++) if(gps[i]) activeGps.push(gps[i]);
                 // @ts-ignore
                 setGamepads(activeGps);
                 requestAnimationFrame(updateGamepads);
             };
             updateGamepads();
        }
        else if (tool === 'wakelock') {
             // @ts-ignore
             if ('wakeLock' in navigator) {
                 try {
                     // @ts-ignore
                     const sentinel = await navigator.wakeLock.request('screen');
                     setWakeLock(sentinel);
                     setHardwareData({ type: 'success', msg: 'Screen Wake Lock Active.' });
                 } catch(e) { setHardwareData({ type: 'error', msg: 'Failed to acquire Wake Lock' }); }
             } else setHardwareData({ type: 'error', msg: 'Wake Lock API not supported' });
        }
        else if (tool === 'pip') {
             setHardwareData({ type: 'pip' });
        }
        else if (tool === 'notify') {
             if (!("Notification" in window)) {
                setHardwareData({ type: 'error', msg: 'Notifications not supported' });
             } else if (Notification.permission === "granted") {
                 new Notification("CIPHER SECURITY", { body: "System is secure." });
                 setHardwareData({ type: 'success', msg: 'Notification sent.' });
             } else if (Notification.permission !== "denied") {
                 Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        new Notification("CIPHER SECURITY", { body: "Access Granted." });
                    }
                 });
             }
        }

      } catch (e) {
          setHardwareData({ type: 'error', msg: 'Access Denied or Not Supported' });
      }
  };

  useEffect(() => {
      if (hardwareData?.type === 'mic' && hardwareData.analyser && canvasRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          const analyser = hardwareData.analyser;
          analyser.fftSize = 256;
          const len = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(len);
          
          const draw = () => {
              requestAnimationFrame(draw);
              analyser.getByteFrequencyData(dataArray);
              if(ctx) {
                  ctx.fillStyle = '#000';
                  ctx.fillRect(0,0,canvas.width,canvas.height);
                  const barWidth = (canvas.width / len) * 2.5;
                  let x = 0;
                  for(let i=0; i<len; i++) {
                      const barHeight = dataArray[i];
                      ctx.fillStyle = `rgb(${barHeight+100},50,50)`;
                      ctx.fillRect(x, canvas.height-barHeight/2, barWidth, barHeight/2);
                      x += barWidth + 1;
                  }
              }
          };
          draw();
      }
  }, [hardwareData]);

  const handleUtils = (tool: string) => {
      if (tool === 'docker') {
          const issues = DOCKER_SECURITY_RULES.filter(r => r.pattern.test(input));
          setUtilsState({ ...utilsState, dockerIssues: issues });
      }
      else if (tool === 'fakeid') {
          const name = FAKE_ID_DATA.names[Math.floor(Math.random() * FAKE_ID_DATA.names.length)];
          const city = FAKE_ID_DATA.cities[Math.floor(Math.random() * FAKE_ID_DATA.cities.length)];
          const domain = FAKE_ID_DATA.domains[Math.floor(Math.random() * FAKE_ID_DATA.domains.length)];
          const email = `${name.replace(' ', '.').toLowerCase()}@${domain}`;
          setUtilsState({ ...utilsState, fakeId: { name, city, email, cc: '4532 1234 5678 9012' } });
      }
      else if (tool === 'luhn') {
          let sum = 0;
          let shouldDouble = false;
          for (let i = input.length - 1; i >= 0; i--) {
             let digit = parseInt(input.charAt(i));
             if (shouldDouble) { if ((digit *= 2) > 9) digit -= 9; }
             sum += digit;
             shouldDouble = !shouldDouble;
          }
          setUtilsState({ ...utilsState, luhnValid: (sum % 10) === 0 });
      }
      else if (tool === 'qr') {
          if (qrRef.current) {
              qrRef.current.innerHTML = '';
              // @ts-ignore
              new QRCode(qrRef.current, { text: input, width: 128, height: 128 });
          }
      }
      else if (tool === 'binary') {
          try {
             const parts = input.split(/([+\-*/])/);
             if(parts.length === 3) {
                 const a = parseInt(parts[0], 2);
                 const b = parseInt(parts[2], 2);
                 let res = 0;
                 if(parts[1] === '+') res = a + b;
                 if(parts[1] === '-') res = a - b;
                 if(parts[1] === '*') res = a * b;
                 if(parts[1] === '/') res = Math.floor(a / b);
                 setUtilsState({...utilsState, binaryRes: res.toString(2)});
             }
          } catch(e) { setUtilsState({...utilsState, binaryRes: 'Error'}); }
      }
      else if (tool === 'homograph') {
          setOutput(input.split('').map(c => HOMOGRAPH_MAP[c] || c).join(''));
      }
      else if (tool === 'json') {
          try { setOutput(JSON.stringify(JSON.parse(input), null, 2)); } catch(e) { setOutput('Invalid JSON'); }
      }
      else if (tool === 'timestamp') {
          setOutput(new Date(parseInt(input) * 1000).toLocaleString());
      }
      else if (tool === 'stats') {
          setUtilsState({ ...utilsState, textStats: { chars: input.length, words: input.split(/\s+/).filter(Boolean).length, lines: input.split(/\n/).length } });
      }
      else if (tool === 'color') {
          const rgb = hexToRgb(input);
          setUtilsState({ ...utilsState, colors: { hex: input, rgb: rgb || 'Invalid', hsl: '' } });
      }
      // NEW UTILS
      else if (tool === 'regex') {
          try {
             // Assume input format "regex///text"
             const parts = input.split('///');
             if(parts.length === 2) {
                 const re = new RegExp(parts[0]);
                 setUtilsState({...utilsState, regexMatch: re.test(parts[1])});
             } else setUtilsState({...utilsState, regexMatch: null});
          } catch(e) { setUtilsState({...utilsState, regexMatch: null}); }
      }
      else if (tool === 'diff') {
          const parts = input.split('///');
          if(parts.length === 2) {
              setUtilsState({...utilsState, diffRes: parts[0] === parts[1] ? 'Identical' : 'Different'});
          }
      }
      else if (tool === 'uuid') {
          const uuids = Array.from({length: 5}, () => crypto.randomUUID());
          setUtilsState({...utilsState, uuidList: uuids});
      }
      else if (tool === 'chmod') {
          // Visual setter logic handled in UI, this just calculates
      }
      else if (tool === 'url') {
          try {
             const url = new URL(input);
             setUtilsState({...utilsState, urlParts: { protocol: url.protocol, host: url.host, path: url.pathname, params: url.search }});
          } catch(e) { setUtilsState({...utilsState, urlParts: null}); }
      }
  };
  
  const handleCtfNew = (tool: string) => {
      if(tool === 'caesar') {
          setOutput(caesarCipher(input, ctfState.caesarShift));
      } else if (tool === 'vigenere') {
          setOutput(vigenereCipher(input, ctfState.vigenereKey));
      } else if (tool === 'morse') {
          setOutput(toMorse(input));
      } else if (tool === 'fromMorse') {
          setOutput(fromMorse(input));
      } else if (tool === 'reverse') {
          setOutput(input.split('').reverse().join(''));
      } else if (tool === 'a1z26') {
          setOutput(input.toUpperCase().split('').map(c => {
              const code = c.charCodeAt(0);
              return (code >= 65 && code <= 90) ? (code - 64).toString() : c;
          }).join(' '));
      } 
      // NEW CTF
      else if (tool === 'rot47') {
          setOutput(rot47(input));
      } else if (tool === 'atbash') {
          setOutput(atbash(input));
      } else if (tool === 'rail') {
          setOutput(railFence(input, ctfState.railFenceRails));
      } else if (tool === 'affine') {
          setOutput(affineCipher(input, ctfState.affineA, ctfState.affineB));
      } else if (tool === 'bacon') {
          setOutput(baconianCipher(input));
      }
  };

  const tabs = [
    { id: 'web', icon: Globe, label: 'Web' },
    { id: 'ctf', icon: Flag, label: 'CTF' },
    { id: 'utils', icon: Box, label: 'Utils' },
    { id: 'hardware', icon: Cpu, label: 'Hardware' },
    { id: 'network', icon: Wifi, label: 'Network' },
    { id: 'forensics', icon: Image, label: 'Forensics' },
    { id: 'vault', icon: Lock, label: 'Vault' },
    { id: 'security', icon: ShieldCheck, label: 'Security' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-500 dark:text-white/50 hover:text-black dark:hover:text-white mb-6">
          <ArrowLeft size={18} /> Back
        </button>
        
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="space-y-2 lg:col-span-1">
             {tabs.map(tab => (
               <button
                 key={tab.id}
                 onClick={() => { setActiveTab(tab.id); setOutput(''); setInput(''); setHardwareData(null); }}
                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                   activeTab === tab.id 
                     ? 'bg-gray-900 text-white dark:bg-green-500/20 dark:text-green-400 border-gray-900 dark:border-green-500' 
                     : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/60 hover:bg-gray-50 dark:hover:bg-white/10'
                 }`}
               >
                 <tab.icon size={18} />
                 <span className="font-bold">{tab.label}</span>
               </button>
             ))}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-md min-h-[500px]">
             
             {/* WEB TOOLS */}
             {activeTab === 'web' && (
                <div className="space-y-6">
                    <div className="flex gap-2 flex-wrap pb-4 border-b border-gray-200 dark:border-white/10">
                        {['dorks', 'cheatsheet', 'transform', 'homograph'].map(t => (
                            <button key={t} onClick={() => setSubTool(t)} className={`px-3 py-1 rounded-full text-sm font-mono border ${subTool === t ? 'bg-black text-white dark:bg-white dark:text-black' : 'border-gray-300 dark:border-white/20'}`}>
                                {t.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {subTool === 'dorks' && (
                        <div className="space-y-4">
                            <input 
                                type="text" 
                                placeholder="Target Domain (e.g., example.com)" 
                                className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded text-black dark:text-white font-mono"
                                value={utilsState.dorkDomain}
                                onChange={e => setUtilsState({...utilsState, dorkDomain: e.target.value})}
                            />
                            <div className="grid md:grid-cols-2 gap-3">
                                {Object.entries(GOOGLE_DORKS).map(([name, query]) => (
                                    <a 
                                      key={name}
                                      href={`https://www.google.com/search?q=${encodeURIComponent(query.replace('{domain}', utilsState.dorkDomain))}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center justify-between p-3 border border-gray-200 dark:border-white/10 rounded hover:bg-gray-100 dark:hover:bg-white/5"
                                    >
                                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{name}</span>
                                        <ExternalLink size={14} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {subTool === 'cheatsheet' && (
                        <div className="h-96 overflow-y-auto space-y-4 pr-2">
                            {CHEATSHEET_DATA.map((cat, i) => (
                                <div key={i} className="border border-gray-200 dark:border-white/10 rounded-lg p-4">
                                    <h3 className="font-bold text-green-600 dark:text-green-400 mb-2">{cat.category}</h3>
                                    <div className="space-y-1">
                                        {cat.payloads.map((p, j) => (
                                            <div key={j} className="flex justify-between items-center bg-gray-100 dark:bg-white/5 p-2 rounded text-xs font-mono">
                                                <span className="truncate mr-2 text-gray-800 dark:text-gray-300">{p}</span>
                                                <button onClick={() => handleCopy(p)} className="text-gray-500 hover:text-black dark:hover:text-white"><Copy size={12}/></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {subTool === 'homograph' && (
                         <div className="space-y-4">
                            <input 
                                type="text" 
                                className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded text-black dark:text-white font-mono"
                                placeholder="Enter domain to spoof (e.g. google.com)"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                            />
                            <button onClick={() => handleUtils('homograph')} className="w-full py-3 bg-gray-900 text-white dark:bg-white dark:text-black font-bold rounded">GENERATE SPOOF</button>
                            {output && (
                                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded">
                                    <p className="text-sm text-red-600 dark:text-red-400 mb-1">Spoofed Domain (Cyrillic):</p>
                                    <code className="text-xl font-mono block select-all bg-white dark:bg-black p-2 rounded border border-gray-200 dark:border-white/10">{output}</code>
                                </div>
                            )}
                         </div>
                    )}
                </div>
             )}

             {/* HARDWARE TOOLS */}
             {activeTab === 'hardware' && (
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button onClick={() => handleHardware('cam')} className="p-4 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 flex flex-col items-center gap-2">
                        <Camera size={24} className="text-purple-500" />
                        <span className="text-xs font-bold dark:text-white">Spy Cam</span>
                    </button>
                    <button onClick={() => handleHardware('geo')} className="p-4 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 flex flex-col items-center gap-2">
                        <MapPin size={24} className="text-red-500" />
                        <span className="text-xs font-bold dark:text-white">Geolocation</span>
                    </button>
                    <button onClick={() => handleHardware('battery')} className="p-4 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 flex flex-col items-center gap-2">
                        <Battery size={24} className="text-green-500" />
                        <span className="text-xs font-bold dark:text-white">Battery</span>
                    </button>
                    <button onClick={() => handleHardware('net')} className="p-4 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 flex flex-col items-center gap-2">
                        <Activity size={24} className="text-blue-500" />
                        <span className="text-xs font-bold dark:text-white">Net Speed</span>
                    </button>
                    <button onClick={() => handleHardware('speech')} className="p-4 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 flex flex-col items-center gap-2">
                        <Speaker size={24} className="text-yellow-500" />
                        <span className="text-xs font-bold dark:text-white">Voice Test</span>
                    </button>
                    <button onClick={() => handleHardware('rec')} className="p-4 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 flex flex-col items-center gap-2">
                        <Video size={24} className={recording ? 'text-red-500 animate-pulse' : 'text-gray-500'} />
                        <span className="text-xs font-bold dark:text-white">Screen Rec</span>
                    </button>
                    <button onClick={() => handleHardware('mic')} className="p-4 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 flex flex-col items-center gap-2">
                        <Mic size={24} className="text-pink-500" />
                        <span className="text-xs font-bold dark:text-white">Mic Visual</span>
                    </button>
                    <button onClick={() => handleHardware('stt')} className="p-4 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 flex flex-col items-center gap-2">
                        <Type size={24} className="text-cyan-500" />
                        <span className="text-xs font-bold dark:text-white">Speech2Text</span>
                    </button>
                    <button onClick={() => handleHardware('device')} className="p-4 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 flex flex-col items-center gap-2">
                        <Fingerprint size={24} className="text-orange-500" />
                        <span className="text-xs font-bold dark:text-white">Device ID</span>
                    </button>
                    <button onClick={() => handleHardware('orient')} className="p-4 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 flex flex-col items-center gap-2">
                        <Compass size={24} className="text-teal-500" />
                        <span className="text-xs font-bold dark:text-white">Orientation</span>
                    </button>
                    
                    {/* NEW HARDWARE TOOLS */}
                    <button onClick={() => handleHardware('bluetooth')} className="p-4 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 flex flex-col items-center gap-2">
                        <Bluetooth size={24} className="text-blue-400" />
                        <span className="text-xs font-bold dark:text-white">Bluetooth</span>
                    </button>
                    <button onClick={() => handleHardware('wakelock')} className="p-4 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 flex flex-col items-center gap-2">
                        <Sun size={24} className="text-yellow-400" />
                        <span className="text-xs font-bold dark:text-white">Wake Lock</span>
                    </button>
                    <button onClick={() => handleHardware('gamepad')} className="p-4 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 flex flex-col items-center gap-2">
                        <Gamepad size={24} className="text-purple-400" />
                        <span className="text-xs font-bold dark:text-white">Gamepad</span>
                    </button>
                    <button onClick={() => handleHardware('pip')} className="p-4 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 flex flex-col items-center gap-2">
                        <PictureInPicture size={24} className="text-indigo-400" />
                        <span className="text-xs font-bold dark:text-white">PiP View</span>
                    </button>
                     <button onClick={() => handleHardware('notify')} className="p-4 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 flex flex-col items-center gap-2">
                        <Bell size={24} className="text-red-400" />
                        <span className="text-xs font-bold dark:text-white">Notify Test</span>
                    </button>

                    {/* Output Areas */}
                    {hardwareData && hardwareData.type === 'cam' && (
                        <div className="col-span-full mt-4 bg-black rounded-lg overflow-hidden border border-gray-500 relative aspect-video">
                            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                            <div className="absolute top-2 left-2 text-red-500 animate-pulse text-xs font-mono">● REC</div>
                        </div>
                    )}
                    {hardwareData && hardwareData.type === 'pip' && (
                        <div className="col-span-full mt-4 bg-black rounded-lg overflow-hidden border border-gray-500 relative aspect-video">
                            <video ref={pipVideoRef} src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" controls className="w-full h-full object-cover" />
                            <button onClick={() => pipVideoRef.current?.requestPictureInPicture()} className="absolute top-2 right-2 px-2 py-1 bg-white text-black text-xs font-bold rounded">Pop Out</button>
                        </div>
                    )}
                    {hardwareData && hardwareData.type === 'bluetooth' && (
                        <div className="col-span-full p-4 bg-blue-900/20 border border-blue-500/50 rounded text-center">
                            <p className="font-mono text-blue-400 mb-2">{hardwareData.msg}</p>
                            <button onClick={() => {
                                // @ts-ignore
                                navigator.bluetooth.requestDevice({ acceptAllDevices: true })
                                .then((device: any) => setHardwareData({ type: 'bluetooth', msg: `Connected: ${device.name}` }))
                                .catch((e: any) => setHardwareData({ type: 'error', msg: e.message }));
                            }} className="px-4 py-2 bg-blue-600 text-white rounded font-bold">SCAN DEVICES</button>
                        </div>
                    )}
                     {hardwareData && hardwareData.type === 'gamepad' && (
                        <div className="col-span-full p-4 bg-gray-100 dark:bg-white/5 rounded border border-gray-200 dark:border-white/10 font-mono text-sm dark:text-white">
                            <p>CONNECTED: {gamepads.length}</p>
                            {gamepads.map((gp, i) => (
                                <div key={i}>
                                    ID: {gp.id} <br/>
                                    AXES: {gp.axes.map(a => a.toFixed(2)).join(', ')} <br/>
                                    BUTTONS: {gp.buttons.map(b => b.pressed ? '1' : '0').join('')}
                                </div>
                            ))}
                        </div>
                    )}
                    {hardwareData && hardwareData.type === 'mic' && (
                         <div className="col-span-full h-32 bg-black rounded border border-white/20">
                             <canvas ref={canvasRef} width="600" height="128" className="w-full h-full"></canvas>
                         </div>
                    )}
                     {hardwareData && hardwareData.type === 'rec' && recording && (
                        <div className="col-span-full p-4 bg-red-900/20 border border-red-500/50 rounded text-center">
                            <p className="text-red-500 animate-pulse font-mono mb-2">RECORDING IN PROGRESS...</p>
                            <button onClick={() => mediaRecorder?.stop()} className="px-4 py-2 bg-red-600 text-white rounded font-bold">STOP & SAVE</button>
                        </div>
                    )}
                    {hardwareData && hardwareData.type === 'stt' && (
                        <div className="col-span-full p-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded">
                            <p className="font-mono text-sm text-gray-500">Dictation Module Active. (Speak now...)</p>
                        </div>
                    )}
                    {hardwareData && hardwareData.type === 'device' && (
                        <div className="col-span-full p-4 bg-gray-100 dark:bg-white/5 rounded border border-gray-200 dark:border-white/10 font-mono text-sm dark:text-white space-y-1">
                            <p>CORES: {hardwareData.cores}</p>
                            <p>MEM: {hardwareData.mem} GB</p>
                            <p>RES: {hardwareData.res}</p>
                            <p className="truncate">UA: {hardwareData.ua}</p>
                        </div>
                    )}
                    {hardwareData && hardwareData.type === 'orient' && (
                        <div className="col-span-full p-4 bg-gray-100 dark:bg-white/5 rounded border border-gray-200 dark:border-white/10 font-mono text-sm dark:text-white">
                            ALPHA: {orientation.alpha?.toFixed(2)} | BETA: {orientation.beta?.toFixed(2)} | GAMMA: {orientation.gamma?.toFixed(2)}
                        </div>
                    )}
                    {hardwareData && (hardwareData.type === 'geo' || hardwareData.type === 'battery' || hardwareData.type === 'net' || hardwareData.type === 'success' || hardwareData.type === 'error') && (
                         <div className={`col-span-full p-4 rounded border font-mono text-sm ${hardwareData.type === 'error' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-white/10'}`}>
                             {hardwareData.msg || JSON.stringify(hardwareData)}
                         </div>
                    )}
                 </div>
             )}

             {/* UTILS TOOLS */}
             {activeTab === 'utils' && (
                <div className="space-y-6">
                    <div className="flex gap-2 flex-wrap pb-4">
                        {['docker', 'fakeid', 'luhn', 'qr', 'binary', 'cron', 'json', 'timestamp', 'stats', 'color', 'regex', 'diff', 'uuid', 'chmod', 'url'].map(t => (
                            <button key={t} onClick={() => setSubTool(t)} className={`px-3 py-1 rounded-full text-sm font-mono border ${subTool === t ? 'bg-black text-white dark:bg-white dark:text-black' : 'border-gray-300 dark:border-white/20 dark:text-white'}`}>
                                {t.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {/* EXISTING UTILS */}
                    {subTool === 'docker' && (
                        <div className="space-y-4">
                            <textarea 
                                className="w-full p-3 h-32 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded font-mono text-xs dark:text-white"
                                placeholder="Paste Dockerfile content..."
                                value={input}
                                onChange={e => setInput(e.target.value)}
                            />
                            <button onClick={() => handleUtils('docker')} className="w-full py-3 bg-gray-900 text-white dark:bg-white dark:text-black font-bold rounded">SCAN DOCKERFILE</button>
                            {utilsState.dockerIssues.length > 0 && (
                                <div className="space-y-2">
                                    {utilsState.dockerIssues.map((issue, i) => (
                                        <div key={i} className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded text-sm text-red-600 dark:text-red-300">
                                            <strong>[{issue.severity}]</strong> {issue.message}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    {subTool === 'fakeid' && (
                        <div className="space-y-4">
                             <button onClick={() => handleUtils('fakeid')} className="w-full py-3 bg-gray-900 text-white dark:bg-white dark:text-black font-bold rounded">GENERATE IDENTITY</button>
                             {utilsState.fakeId && (
                                 <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-300 dark:border-white/10 shadow-lg text-gray-800 dark:text-white font-mono space-y-2 relative overflow-hidden">
                                     <div className="absolute top-2 right-4 font-bold opacity-20 text-4xl">ID</div>
                                     <p>NAME: {utilsState.fakeId.name}</p>
                                     <p>CITY: {utilsState.fakeId.city}</p>
                                     <p>EMAIL: {utilsState.fakeId.email}</p>
                                     <p>CC: {utilsState.fakeId.cc}</p>
                                 </div>
                             )}
                        </div>
                    )}
                    {subTool === 'luhn' && (
                        <div className="space-y-4">
                             <input 
                                className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded dark:text-white" 
                                placeholder="Enter CC Number..." 
                                value={input} 
                                onChange={e => { setInput(e.target.value); handleUtils('luhn'); }}
                             />
                             {utilsState.luhnValid !== null && (
                                 <div className={`p-3 rounded font-bold ${utilsState.luhnValid ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'text-red-600 bg-red-50 dark:bg-red-900/20'}`}>
                                     {utilsState.luhnValid ? 'VALID' : 'INVALID'}
                                 </div>
                             )}
                        </div>
                    )}
                    {subTool === 'qr' && (
                        <div className="space-y-4 text-center">
                            <input 
                                type="text" 
                                className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded dark:text-white"
                                placeholder="Text to QR..."
                                value={input}
                                onChange={e => { setInput(e.target.value); handleUtils('qr'); }}
                            />
                            <div className="flex justify-center p-4 bg-white rounded border border-gray-200">
                                <div ref={qrRef}></div>
                            </div>
                        </div>
                    )}
                    {subTool === 'binary' && (
                         <div className="space-y-4">
                             <input className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded dark:text-white" placeholder="Binary math (e.g. 101 + 10)" value={input} onChange={e => { setInput(e.target.value); handleUtils('binary'); }} />
                             <div className="p-3 bg-gray-100 dark:bg-white/5 font-mono dark:text-white">RES: {utilsState.binaryRes}</div>
                         </div>
                    )}
                    {subTool === 'cron' && (
                         <div className="space-y-4">
                             <div className="grid grid-cols-5 gap-2 text-center text-xs dark:text-white">
                                 {['MIN', 'HOUR', 'DOM', 'MON', 'DOW'].map((l, i) => (
                                     <div key={i}>
                                         <label>{l}</label>
                                         <input type="text" className="w-full p-2 border rounded text-center dark:bg-white/5 dark:text-white dark:border-white/20" defaultValue="*" onChange={() => { /* Logic simplified for display */ }} />
                                     </div>
                                 ))}
                             </div>
                             <div className="p-3 bg-gray-100 dark:bg-white/5 font-mono text-center dark:text-white">* * * * *</div>
                         </div>
                    )}
                    {subTool === 'json' && (
                         <div className="space-y-4">
                             <textarea className="w-full p-3 h-32 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded font-mono text-xs dark:text-white" placeholder="Minified JSON..." value={input} onChange={e => setInput(e.target.value)} />
                             <button onClick={() => handleUtils('json')} className="w-full py-2 bg-gray-900 text-white dark:bg-white dark:text-black rounded font-bold">PRETTIFY</button>
                             <pre className="p-3 bg-gray-100 dark:bg-white/5 overflow-x-auto text-xs dark:text-white">{output}</pre>
                         </div>
                    )}
                    {subTool === 'timestamp' && (
                         <div className="space-y-4">
                             <input type="number" className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded dark:text-white" placeholder="Unix Epoch..." value={input} onChange={e => { setInput(e.target.value); handleUtils('timestamp'); }} />
                             <div className="p-3 bg-gray-100 dark:bg-white/5 font-mono dark:text-white">DATE: {output}</div>
                         </div>
                    )}
                    {subTool === 'stats' && (
                         <div className="space-y-4">
                             <textarea className="w-full p-3 h-32 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded dark:text-white" placeholder="Text..." value={input} onChange={e => { setInput(e.target.value); handleUtils('stats'); }} />
                             <div className="grid grid-cols-3 gap-2 text-center text-sm dark:text-white">
                                 <div className="p-2 border rounded">Chars: {utilsState.textStats.chars}</div>
                                 <div className="p-2 border rounded">Words: {utilsState.textStats.words}</div>
                                 <div className="p-2 border rounded">Lines: {utilsState.textStats.lines}</div>
                             </div>
                         </div>
                    )}
                    {subTool === 'color' && (
                         <div className="space-y-4">
                             <input type="color" className="w-full h-12" onChange={e => { setInput(e.target.value); handleUtils('color'); }} />
                             <input type="text" className="w-full p-3 border rounded dark:bg-white/5 dark:text-white dark:border-white/20" value={input} placeholder="#HEX" onChange={e => { setInput(e.target.value); handleUtils('color'); }} />
                             <div className="p-3 bg-gray-100 dark:bg-white/5 font-mono dark:text-white">RGB: {utilsState.colors.rgb}</div>
                         </div>
                    )}
                    {/* NEW UTILS UI */}
                    {subTool === 'regex' && (
                        <div className="space-y-4">
                            <input className="w-full p-3 bg-gray-50 dark:bg-white/5 border rounded dark:text-white" placeholder="pattern///text (e.g. ^[a-z]+$///hello)" value={input} onChange={e => { setInput(e.target.value); handleUtils('regex'); }} />
                            <div className={`p-3 rounded font-bold ${utilsState.regexMatch ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>MATCH: {utilsState.regexMatch ? 'YES' : 'NO'}</div>
                        </div>
                    )}
                    {subTool === 'diff' && (
                        <div className="space-y-4">
                            <textarea className="w-full p-3 h-32 bg-gray-50 dark:bg-white/5 border rounded dark:text-white" placeholder="text1///text2" value={input} onChange={e => { setInput(e.target.value); handleUtils('diff'); }} />
                            <div className="p-3 bg-gray-100 dark:bg-white/5 font-mono dark:text-white">{utilsState.diffRes}</div>
                        </div>
                    )}
                    {subTool === 'uuid' && (
                        <div className="space-y-4">
                            <button onClick={() => handleUtils('uuid')} className="w-full py-2 bg-gray-900 text-white dark:bg-white dark:text-black rounded font-bold">GENERATE UUIDs</button>
                            <div className="p-3 bg-gray-100 dark:bg-white/5 font-mono text-xs dark:text-white space-y-1">
                                {utilsState.uuidList.map((id, i) => <div key={i}>{id}</div>)}
                            </div>
                        </div>
                    )}
                    {subTool === 'chmod' && (
                        <div className="space-y-4 text-center font-mono dark:text-white">
                            <div className="grid grid-cols-3 gap-4">
                                {['Owner', 'Group', 'Public'].map((role, i) => (
                                    <div key={role} className="p-2 border rounded">
                                        <div>{role}</div>
                                        {['R', 'W', 'X'].map((perm, j) => (
                                            <label key={perm} className="block cursor-pointer">
                                                <input type="checkbox" checked={((i === 0 ? utilsState.chmod.u : i === 1 ? utilsState.chmod.g : utilsState.chmod.o) & (4 >> j)) > 0} onChange={() => {
                                                    const val = (4 >> j);
                                                    const curr = i===0 ? utilsState.chmod.u : i===1 ? utilsState.chmod.g : utilsState.chmod.o;
                                                    const next = curr ^ val;
                                                    const newChmod = {...utilsState.chmod};
                                                    if(i===0) newChmod.u = next; else if(i===1) newChmod.g = next; else newChmod.o = next;
                                                    setUtilsState({...utilsState, chmod: newChmod});
                                                }} /> {perm}
                                            </label>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <div className="text-xl font-bold">{utilsState.chmod.u}{utilsState.chmod.g}{utilsState.chmod.o}</div>
                        </div>
                    )}
                    {subTool === 'url' && (
                         <div className="space-y-4">
                            <input className="w-full p-3 bg-gray-50 dark:bg-white/5 border rounded dark:text-white" placeholder="URL..." value={input} onChange={e => { setInput(e.target.value); handleUtils('url'); }} />
                            {utilsState.urlParts && (
                                <div className="p-3 bg-gray-100 dark:bg-white/5 font-mono text-sm dark:text-white space-y-1">
                                    <p>PROTO: {utilsState.urlParts.protocol}</p>
                                    <p>HOST: {utilsState.urlParts.host}</p>
                                    <p>PATH: {utilsState.urlParts.path}</p>
                                    <p>QUERY: {utilsState.urlParts.params}</p>
                                </div>
                            )}
                         </div>
                    )}
                </div>
             )}

             {/* CTF TOOLS */}
             {activeTab === 'ctf' && (
                 <div className="space-y-6">
                    <div className="flex gap-2 flex-wrap pb-4">
                        {['rsa', 'base', 'magic', 'xor', 'caesar', 'vigenere', 'morse', 'reverse', 'a1z26', 'rot47', 'atbash', 'rail', 'affine', 'bacon'].map(t => (
                            <button key={t} onClick={() => setSubTool(t)} className={`px-3 py-1 rounded-full text-sm font-mono border ${subTool === t ? 'bg-black text-white dark:bg-white dark:text-black' : 'border-gray-300 dark:border-white/20 dark:text-white'}`}>
                                {t.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    
                    {/* EXISTING CTF */}
                    {subTool === 'rsa' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-2">
                                <input type="text" placeholder="p (prime 1)" className="p-2 border rounded dark:bg-white/5 dark:text-white dark:border-white/20" value={rsaParams.p} onChange={e => setRsaParams({...rsaParams, p: e.target.value})} />
                                <input type="text" placeholder="q (prime 2)" className="p-2 border rounded dark:bg-white/5 dark:text-white dark:border-white/20" value={rsaParams.q} onChange={e => setRsaParams({...rsaParams, q: e.target.value})} />
                                <input type="text" placeholder="e (default 65537)" className="p-2 border rounded dark:bg-white/5 dark:text-white dark:border-white/20" value={rsaParams.e} onChange={e => setRsaParams({...rsaParams, e: e.target.value})} />
                            </div>
                            <button onClick={handleCalcRSA} className="w-full py-2 bg-green-600 text-white font-bold rounded">CALCULATE KEYS</button>
                            {rsaKeys && (
                                <div className="p-4 bg-gray-100 dark:bg-white/5 rounded text-xs font-mono break-all space-y-2 dark:text-gray-300">
                                    <p><strong className="text-green-600 dark:text-green-400">N (Modulus):</strong> {rsaKeys.n}</p>
                                    <p><strong className="text-blue-600 dark:text-blue-400">Phi:</strong> {rsaKeys.phi}</p>
                                    <p><strong className="text-red-600 dark:text-red-400">d (Private Key):</strong> {rsaKeys.d}</p>
                                </div>
                            )}
                        </div>
                    )}
                    {subTool === 'base' && (
                         <div className="space-y-4">
                             <div className="flex gap-2">
                                 {['b32', 'b58', 'b64'].map(b => (
                                     <button key={b} onClick={() => { setSubTool(b); handleBaseDecode(); }} className="px-4 py-2 border rounded dark:text-white hover:bg-gray-100 dark:hover:bg-white/10">{b.toUpperCase()}</button>
                                 ))}
                             </div>
                             <textarea 
                                className="w-full p-3 h-32 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded font-mono text-sm dark:text-white"
                                placeholder="Paste encoded string..."
                                value={input}
                                onChange={e => setInput(e.target.value)}
                             />
                             <button onClick={handleBaseDecode} className="w-full py-2 bg-gray-900 text-white dark:bg-white dark:text-black font-bold rounded">DECODE</button>
                             {output && <div className="p-3 bg-gray-100 dark:bg-white/5 rounded font-mono text-sm break-all dark:text-white">{output}</div>}
                         </div>
                    )}
                    {subTool === 'magic' && (
                        <div className="space-y-4">
                            <input type="file" onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if(file) {
                                    const buf = await file.slice(0, 4).arrayBuffer();
                                    const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
                                    const match = Object.entries(MAGIC_BYTES).find(([k]) => hex.startsWith(k));
                                    setOutput(`HEX: ${hex}\nTYPE: ${match ? match[1] : 'Unknown'}`);
                                }
                            }} />
                            <pre className="p-3 bg-gray-100 dark:bg-white/5 rounded font-mono dark:text-white">{output}</pre>
                        </div>
                    )}
                     {subTool === 'xor' && (
                         <div className="space-y-4">
                              <input className="w-full p-3 border rounded dark:bg-white/5 dark:text-white dark:border-white/20" placeholder="Input string..." value={input} onChange={e => setInput(e.target.value)} />
                              <input className="w-full p-3 border rounded dark:bg-white/5 dark:text-white dark:border-white/20" placeholder="Key (char)..." onChange={e => {
                                  if(e.target.value && input) {
                                      const k = e.target.value.charCodeAt(0);
                                      setOutput(input.split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ k)).join(''));
                                  }
                              }} />
                              <div className="p-3 bg-gray-100 dark:bg-white/5 rounded font-mono dark:text-white">{output}</div>
                         </div>
                    )}
                    {subTool === 'caesar' && (
                        <div className="space-y-4">
                             <div className="flex items-center gap-4">
                                 <label className="dark:text-white">Shift: {ctfState.caesarShift}</label>
                                 <input type="range" min="1" max="25" value={ctfState.caesarShift} onChange={e => setCtfState({...ctfState, caesarShift: parseInt(e.target.value)})} className="flex-1" />
                             </div>
                             <input className="w-full p-3 border rounded dark:bg-white/5 dark:text-white dark:border-white/20" placeholder="Text..." value={input} onChange={e => setInput(e.target.value)} />
                             <button onClick={() => handleCtfNew('caesar')} className="w-full py-2 bg-gray-900 text-white dark:bg-white dark:text-black rounded font-bold">ROTATE</button>
                             <div className="p-3 bg-gray-100 dark:bg-white/5 rounded font-mono dark:text-white">{output}</div>
                        </div>
                    )}
                    {subTool === 'vigenere' && (
                        <div className="space-y-4">
                             <input className="w-full p-3 border rounded dark:bg-white/5 dark:text-white dark:border-white/20" placeholder="Key..." value={ctfState.vigenereKey} onChange={e => setCtfState({...ctfState, vigenereKey: e.target.value})} />
                             <textarea className="w-full p-3 h-24 border rounded dark:bg-white/5 dark:text-white dark:border-white/20" placeholder="Text..." value={input} onChange={e => setInput(e.target.value)} />
                             <button onClick={() => handleCtfNew('vigenere')} className="w-full py-2 bg-gray-900 text-white dark:bg-white dark:text-black rounded font-bold">ENCRYPT/DECRYPT</button>
                             <div className="p-3 bg-gray-100 dark:bg-white/5 rounded font-mono dark:text-white">{output}</div>
                        </div>
                    )}
                    {subTool === 'morse' && (
                        <div className="space-y-4">
                             <textarea className="w-full p-3 h-24 border rounded dark:bg-white/5 dark:text-white dark:border-white/20" placeholder="Text (or dots/dashes)..." value={input} onChange={e => setInput(e.target.value)} />
                             <div className="grid grid-cols-2 gap-2">
                                 <button onClick={() => handleCtfNew('morse')} className="py-2 bg-gray-900 text-white dark:bg-white dark:text-black rounded font-bold">TO MORSE</button>
                                 <button onClick={() => handleCtfNew('fromMorse')} className="py-2 bg-gray-900 text-white dark:bg-white dark:text-black rounded font-bold">FROM MORSE</button>
                             </div>
                             <div className="p-3 bg-gray-100 dark:bg-white/5 rounded font-mono dark:text-white">{output}</div>
                        </div>
                    )}
                    {subTool === 'reverse' && (
                         <div className="space-y-4">
                             <input className="w-full p-3 border rounded dark:bg-white/5 dark:text-white dark:border-white/20" placeholder="Text..." value={input} onChange={e => { setInput(e.target.value); handleCtfNew('reverse'); }} />
                             <div className="p-3 bg-gray-100 dark:bg-white/5 rounded font-mono dark:text-white">{output}</div>
                         </div>
                    )}
                    {subTool === 'a1z26' && (
                         <div className="space-y-4">
                             <input className="w-full p-3 border rounded dark:bg-white/5 dark:text-white dark:border-white/20" placeholder="Text..." value={input} onChange={e => { setInput(e.target.value); handleCtfNew('a1z26'); }} />
                             <div className="p-3 bg-gray-100 dark:bg-white/5 rounded font-mono dark:text-white">{output}</div>
                         </div>
                    )}
                    {/* NEW CTF UI */}
                    {subTool === 'rot47' && (
                        <div className="space-y-4">
                             <input className="w-full p-3 border rounded dark:bg-white/5 dark:text-white dark:border-white/20" placeholder="Text..." value={input} onChange={e => { setInput(e.target.value); handleCtfNew('rot47'); }} />
                             <div className="p-3 bg-gray-100 dark:bg-white/5 rounded font-mono dark:text-white">{output}</div>
                        </div>
                    )}
                    {subTool === 'atbash' && (
                         <div className="space-y-4">
                             <input className="w-full p-3 border rounded dark:bg-white/5 dark:text-white dark:border-white/20" placeholder="Text..." value={input} onChange={e => { setInput(e.target.value); handleCtfNew('atbash'); }} />
                             <div className="p-3 bg-gray-100 dark:bg-white/5 rounded font-mono dark:text-white">{output}</div>
                        </div>
                    )}
                    {subTool === 'rail' && (
                        <div className="space-y-4">
                             <div className="flex items-center gap-4">
                                 <label className="dark:text-white">Rails: {ctfState.railFenceRails}</label>
                                 <input type="range" min="2" max="10" value={ctfState.railFenceRails} onChange={e => setCtfState({...ctfState, railFenceRails: parseInt(e.target.value)})} className="flex-1" />
                             </div>
                             <input className="w-full p-3 border rounded dark:bg-white/5 dark:text-white dark:border-white/20" placeholder="Text..." value={input} onChange={e => { setInput(e.target.value); handleCtfNew('rail'); }} />
                             <div className="p-3 bg-gray-100 dark:bg-white/5 rounded font-mono dark:text-white">{output}</div>
                        </div>
                    )}
                    {subTool === 'affine' && (
                        <div className="space-y-4">
                             <div className="flex gap-2">
                                <input type="number" placeholder="A (coprime to 26)" className="p-2 border rounded dark:bg-white/5 dark:text-white" value={ctfState.affineA} onChange={e => setCtfState({...ctfState, affineA: parseInt(e.target.value)})} />
                                <input type="number" placeholder="B (shift)" className="p-2 border rounded dark:bg-white/5 dark:text-white" value={ctfState.affineB} onChange={e => setCtfState({...ctfState, affineB: parseInt(e.target.value)})} />
                             </div>
                             <input className="w-full p-3 border rounded dark:bg-white/5 dark:text-white dark:border-white/20" placeholder="Text..." value={input} onChange={e => { setInput(e.target.value); handleCtfNew('affine'); }} />
                             <div className="p-3 bg-gray-100 dark:bg-white/5 rounded font-mono dark:text-white">{output}</div>
                        </div>
                    )}
                    {subTool === 'bacon' && (
                        <div className="space-y-4">
                             <input className="w-full p-3 border rounded dark:bg-white/5 dark:text-white dark:border-white/20" placeholder="Text..." value={input} onChange={e => { setInput(e.target.value); handleCtfNew('bacon'); }} />
                             <div className="p-3 bg-gray-100 dark:bg-white/5 rounded font-mono dark:text-white">{output}</div>
                        </div>
                    )}
                 </div>
             )}

             {/* VAULT */}
             {activeTab === 'vault' && (
                 <div className="space-y-6 text-center">
                     <div className="border-2 border-dashed border-gray-300 dark:border-white/20 rounded-xl p-8 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                         <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="hidden" id="file-upload" />
                         <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-4">
                             <HardDrive size={48} className="text-gray-400 dark:text-white/30" />
                             <span className="dark:text-white">{file ? file.name : 'Drag & Drop or Click to Select File'}</span>
                         </label>
                     </div>
                     <input 
                         type="password" 
                         placeholder="Encryption Password" 
                         className="w-full p-4 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-xl text-center text-lg dark:text-white"
                         value={password}
                         onChange={e => setPassword(e.target.value)}
                     />
                     <div className="grid grid-cols-2 gap-4">
                         <button onClick={() => handleVault('encrypt')} className="py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                             <Lock size={20} /> ENCRYPT
                         </button>
                         <button onClick={() => handleVault('decrypt')} className="py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                             <Check size={20} /> DECRYPT
                         </button>
                     </div>
                 </div>
             )}

             {/* NETWORK & FORENSICS (Simulated UI for Demo) */}
             {activeTab === 'network' && (
                 <div className="grid gap-4">
                     <div className="p-4 border rounded dark:bg-white/5 dark:text-white dark:border-white/20">
                         <h3 className="font-bold mb-2">Subnet Calculator</h3>
                         <div className="flex gap-2">
                             <input className="flex-1 p-2 border rounded dark:bg-white/10" placeholder="IP Address (e.g. 192.168.1.1)" />
                             <input className="w-20 p-2 border rounded dark:bg-white/10" placeholder="/24" />
                             <button className="px-4 bg-blue-600 text-white rounded">CALC</button>
                         </div>
                     </div>
                     <div className="p-4 border rounded dark:bg-white/5 dark:text-white dark:border-white/20">
                         <h3 className="font-bold mb-2">DNS Lookup</h3>
                         <input className="w-full p-2 border rounded dark:bg-white/10 mb-2" placeholder="Domain..." />
                         <button className="w-full py-2 bg-gray-800 text-white rounded">QUERY RECORDS</button>
                     </div>
                 </div>
             )}
             {activeTab === 'forensics' && (
                 <div className="space-y-4">
                     <div className="p-4 border rounded dark:bg-white/5 dark:text-white dark:border-white/20">
                         <h3 className="font-bold mb-2">Metadata Viewer (EXIF)</h3>
                         <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"/>
                     </div>
                     <div className="p-4 border rounded dark:bg-white/5 dark:text-white dark:border-white/20">
                         <h3 className="font-bold mb-2">Steganography (LSB)</h3>
                         <div className="grid grid-cols-2 gap-4">
                             <button className="py-8 border-2 border-dashed rounded flex flex-col items-center">
                                 <Image className="mb-2"/> Hide Data
                             </button>
                             <button className="py-8 border-2 border-dashed rounded flex flex-col items-center">
                                 <Search className="mb-2"/> Extract Data
                             </button>
                         </div>
                     </div>
                 </div>
             )}
             
             {/* SECURITY TAB */}
             {activeTab === 'security' && (
                 <div className="space-y-6">
                     <div className="p-6 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                         <h3 className="text-xl font-bold mb-4 dark:text-white">Password Strength Analyzer</h3>
                         <input 
                             type="text" 
                             placeholder="Enter password to test..." 
                             className="w-full p-4 text-lg border rounded-lg mb-4 dark:bg-black/20 dark:text-white dark:border-white/20"
                             onChange={(e) => {
                                 const val = e.target.value;
                                 const score = Math.min(100, val.length * 5 + (/[A-Z]/.test(val)?10:0) + (/[0-9]/.test(val)?10:0) + (/[^A-Za-z0-9]/.test(val)?20:0));
                                 // Simple visual logic
                                 const bar = document.getElementById('pass-strength');
                                 if(bar) bar.style.width = `${score}%`;
                                 if(bar) bar.style.backgroundColor = score < 40 ? 'red' : score < 80 ? 'orange' : 'green';
                             }}
                         />
                         <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                             <div id="pass-strength" className="h-full w-0 transition-all duration-300"></div>
                         </div>
                     </div>
                     <div className="p-6 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                         <h3 className="text-xl font-bold mb-4 dark:text-white">Secure Password Generator</h3>
                         <button 
                            className="w-full py-3 bg-gray-900 text-white dark:bg-white dark:text-black font-bold rounded-lg"
                            onClick={() => {
                                const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
                                const pass = Array.from({length: 16}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
                                setInput(pass);
                                handleCopy(pass);
                            }}
                         >
                            GENERATE & COPY
                         </button>
                         {input && <div className="mt-4 p-4 text-center text-xl font-mono bg-white dark:bg-black rounded border dark:border-white/20 dark:text-green-400">{input}</div>}
                     </div>
                 </div>
             )}

          </div>
        </div>
      </div>
    </div>
  );
};
