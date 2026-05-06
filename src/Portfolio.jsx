import React, { useEffect, useState, useRef } from 'react';
import {
  Menu,
  X,
  Mail,
  Phone,
  Linkedin,
  Download,
  ExternalLink,
  Sun,
  Moon,
} from 'lucide-react';

// Single-file portfolio for Kashyap Sharma
// Default export: App

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const TYPING_PHRASES = [
  'Kotlin Developer',
  'Android Developer',
  'Firebase Integrator',
  'Play Store Publisher',
];

function useTyping(phrases, speed = 100, pause = 1500) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setDeleting] = useState(false);

  useEffect(() => {
    let mounted = true;
    let timeout;

    const current = phrases[index % phrases.length];

    const tick = () => {
      if (!mounted) return;
      setText((prev) => {
        const next = isDeleting
          ? current.slice(0, prev.length - 1)
          : current.slice(0, prev.length + 1);
        return next;
      });

      if (!isDeleting && text === current) {
        timeout = setTimeout(() => setDeleting(true), pause);
      } else if (isDeleting && text === '') {
        setDeleting(false);
        setIndex((i) => i + 1);
      }
    };

    timeout = setTimeout(tick, isDeleting ? speed / 2 : speed);
    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, isDeleting, index]);

  return text;
}

function useRevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

function IconLabel({ icon: Icon, label }) {
  return (
    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm t-tag">
      <Icon className="w-4 h-4 t-accent" />
      <span>{label}</span>
    </div>
  );
}

function Navbar({ onNavigate, theme, setTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-40 transition-all duration-300 ${
        scrolled ? 't-nav border-b' : 'bg-transparent'
      }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="t-accent font-semibold text-lg tracking-wide">
              Kashyap Sharma
            </button>
            {/* theme toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md t-toggle hover-accent">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-sm">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="t-nav-link transition-colors hover-accent">
                {link.label}
              </button>
            ))}
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-md t-toggle hover-accent">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden t-nav border-t">
          <div className="px-4 py-3 space-y-2 flex flex-col">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setOpen(false);
                }}
                className="text-left t-body py-2 hover-accent">
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ onViewWork }) {
  // slower typing cycle: speed 200ms per character, pause 2000ms between phrases
  const typed = useTyping(TYPING_PHRASES, 200, 2000);

  return (
    <section id="top" className="min-h-[72vh] flex items-center" aria-label="hero">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <p className="text-sm font-mono t-accent">Hello — I'm</p>
            <h1 className="text-4xl sm:text-5xl font-semibold t-heading leading-tight">Kashyap Sharma</h1>
            <h2 className="text-xl font-mono t-accent">{typed}<span className="blinker">|</span></h2>
            <p className="t-body max-w-xl">Building high-performance, user-focused Android apps.</p>

            <div className="flex items-center space-x-4">
              <button
                onClick={onViewWork}
                className="inline-flex items-center gap-2 t-btn-primary px-4 py-2 font-medium rounded-md">
                View My Work ↓
              </button>

              <a href="./Kashyap_Sharma_Android_Developer_Resume.pdf" download className="inline-flex items-center gap-2 t-btn-secondary">
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </div>

            <div className="mt-6 flex items-center space-x-3">
              <pre className="t-code font-mono text-xs p-3 rounded-md max-w-sm">
{`class App : Android {
  fun build() {
    println("Hello, Android")
  }
}`}
              </pre>
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="w-[320px] h-[320px] rounded-2xl p-2 flex items-center justify-center overflow-hidden t-card2">
              <img src="./kashyap.jpg" className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" data-reveal className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="sec-title">About</h3>
          <div className="t-card p-6">
          <p className="mt-4 t-body">I'm Kashyap Sharma, a Junior Android Developer from Kheda / Ahmedabad. Currently working at IQ Infinite Technologies Pvt. Ltd., I focus on creating performant and user-friendly Android applications using Kotlin, Jetpack Compose, and modern Android architecture patterns.</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 t-card2">
              <p className="text-sm t-muted">Location</p>
              <p className="t-heading font-medium">Kheda / Ahmedabad</p>
            </div>
            <div className="p-4 t-card2">
              <p className="text-sm t-muted">Current Company</p>
              <p className="t-heading font-medium">IQ Infinite Technologies Pvt. Ltd.</p>
            </div>
            <div className="p-4 t-card2">
              <p className="text-sm t-muted">Duaration</p>
                <div className="t-heading font-medium">1+ Year Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const groups = [
    { title: 'Languages', items: ['Kotlin', 'Java'] },
    { title: 'UI', items: ['XML', 'Jetpack Compose', 'Material Design'] },
    { title: 'Architecture', items: ['MVVM', 'ViewModel', 'LiveData', 'Flow'] },
    { title: 'Networking', items: ['Retrofit', 'REST API', 'JSON'] },
    { title: 'Database', items: ['Room', 'SQLite', 'Firebase', 'MongoDB'] },
  ];

  const accents = ['sg-green', 'sg-blue', 'sg-purple', 'sg-yellow', 'sg-red'];

  return (
    <section id="skills" data-reveal className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="sec-title mb-6">Skills</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {groups.map((g, i) => (
            <div key={g.title} className={`p-4 rounded-lg ${accents[i]}`}> 
              <h4 className="text-lg t-heading font-medium mb-3">{g.title}</h4>
              <div className="flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span key={it} className="px-3 py-1 t-tag text-sm">{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const items = [
    {
      title: 'Junior Android Developer',
      org: 'IQ Infinite Technologies',
      range: 'March 2025 – Present',
      bullets: [
        'Developed multiple Play Store builds using Kotlin and Jetpack Compose.',
        'Implemented MVVM architecture with ViewModel, LiveData and Flow for modular apps.',
        'Integrated Firebase services: Auth, Firestore, Cloud Messaging and Analytics.',
        'Improved app performance by optimizing database queries and image loading.',
      ],
    },
    {
      title: 'MongoDB DBA Intern',
      org: 'Gravitas Technosoft',
      range: 'Jan 2024 – April 2024',
      bullets: [
        'Maintained MongoDB instances and assisted in backups and monitoring.',
        'Wrote scripts to automate routine database tasks and reports.',
      ],
    },
  ];

  return (
    <section id="experience" data-reveal className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="sec-title mb-6">Experience</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 t-timeline-line" />
          <div className="space-y-8 pl-8">
            {items.map((it, idx) => (
              <div key={it.title} className="relative">
                <div className="absolute -left-5 top-2 w-3 h-3 rounded-full t-timeline-dot" />
                <div className="t-card2 p-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="t-heading font-semibold">{it.title}</div>
                      <div className="t-accent text-sm">{it.org} • <span className="t-muted">{it.range}</span></div>
                    </div>
                  </div>
                  <ul className="mt-3 list-disc list-inside t-body space-y-1">
                    {it.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" data-reveal className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="sec-title mb-6">Education</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="t-card2 p-4">
            <div className="t-heading font-semibold">B.E. Computer Engineering</div>
            <div className="t-muted">GEC Modasa • 2024</div>
            <div className="t-accent mt-2">CGPA: 7.41</div>
          </div>
          <div className="t-card2 p-4">
            <div className="t-heading font-semibold">XII | GSHEB</div>
            <div className="t-muted">Shri H & D Parekh High School • 2020</div>
            <div className="t-accent mt-2">62.83%</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section data-reveal className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="sec-title mb-6">Certifications & Strengths</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="t-card2 p-4">
            <div className="t-heading font-medium">BAPS Youth Fellowship Programme</div>
            <div className="t-muted">June–Nov 2024 — leadership & ethics program</div>
          </div>
          <div className="t-card2 p-4">
            <div className="t-heading font-medium">Strengths</div>
            <div className="mt-3 flex gap-2 flex-wrap">
              <span className="px-3 py-1 t-tag text-sm">Problem-Solving</span>
              <span className="px-3 py-1 t-tag text-sm">Communication</span>
              <span className="px-3 py-1 t-tag text-sm">Leadership</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    {
    title: 'KYM Admin App',
    desc: 'Android admin app for Kheda Yuvak Mandal — member registration, QR-based attendance, digital ID card generation with WhatsApp sharing. Built with Kotlin, MVVM, Room DB, ZXing QR & Navigation Component.',
    link: 'https://github.com/Kash0209sharma/PasswordManager-',
    img: './kym_admin.png',
   },
    {
      title: 'Rummy Scorer',
      desc: 'Android scoring app – set counts, track moves and analyse games. Available on Play Store.',
      link: 'https://play.google.com/store/apps/details?id=com.app.rummyscorer&hl=en_IN',
      img: './rummy-scorer.png',
    },
    {
      title: 'Password Manager',
      desc: 'Secure Android password manager using Jetpack Compose & Material3, AES/GCM encryption with Android Keystore, MVVM & Room.',
      link: 'https://github.com/Kash0209sharma/PasswordManager-',
      img: './password.jpeg',
    },
    {
      title: 'KachuFul',
      desc: 'Android card game application available on Play Store. Features real-time gameplay, intuitive UI, and smooth animations.',
      link: 'https://play.google.com/store/apps/details?id=com.app.judgementalscore&hl=en_IN',
      img: './kachuful.jpeg',
    },
    {
      title: 'Portfolio Website',
      desc: 'This very site – built with React, Tailwind CSS and modern JS tooling.',
      link: 'https://github.com/Kash0209sharma/portfolio',
      img: './portfolio.jpeg',
    },
  ];

  return (
    <section id="projects" data-reveal className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="sec-title mb-6">Projects</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((p) => (
            <a
              key={p.title}
              href={p.link}
              className="block t-card2 p-4 hover:scale-[1.02] transition-transform">
              <div className="w-full rounded-md overflow-hidden mb-3 h-40 sm:h-48">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div className="text-lg font-medium t-heading">{p.title}</div>
              <p className="t-body text-sm mt-1">{p.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hobbies() {
  const cards = [
    { label: 'Reading', emoji: '📚' },
    { label: 'Traveling', emoji: '✈️' },
    { label: 'Painting', emoji: '🎨' },
  ];

  return (
    <section data-reveal className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="sec-title mb-6">Hobbies</h3>
        <div className="flex gap-4">
          {cards.map((c) => (
            <div key={c.label} className="t-card2 p-4 flex-1 text-center">
              <div className="text-4xl">{c.emoji}</div>
              <div className="mt-2 t-heading font-medium">{c.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" data-reveal className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="sec-title mb-6">Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="t-card2 p-6">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 t-accent" />
              <a className="t-accent" href="mailto:kashyapsharma2902@gmail.com">kashyapsharma2902@gmail.com</a>
            </div>
            <div className="flex items-center space-x-3 mt-3">
              <Phone className="w-5 h-5 t-accent" />
              <a className="t-body">70469 52180</a>
            </div>
            <div className="flex items-center space-x-3 mt-3">
              <Linkedin className="w-5 h-5 t-accent" />
              <a href="https://www.linkedin.com/in/kashyap-sharma-232b83258" className="t-body hover-accent">LinkedIn Profile</a>
            </div>
            <div className="flex items-center space-x-3 mt-3">
              <ExternalLink className="w-5 h-5 t-accent" />
              <a href="https://github.com/kashyapsharma2902" className="t-body hover-accent">GitHub</a>
            </div>
          </div>

          <div className="t-card2 p-6">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <input placeholder="Your name" className="t-input" />
              <input placeholder="Your email" className="t-input" />
              <textarea placeholder="Message" rows={5} className="t-input" />
              <div>
                <button type="submit" className="t-btn-primary">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center t-muted">
        <div>Built with ❤️ and React Js enthusiasm by Kashyap Sharma</div>
        <div className="mt-3 flex items-center justify-center gap-4">
          <a className="t-accent" href="https://www.linkedin.com/in/kashyap-sharma-232b83258">LinkedIn</a>
          <a className="t-accent" href="https://github.com/kashyapsharma2902">GitHub</a>
          <a className="t-accent" href="https://www.instagram.com/kashyap292_s?igsh=ODNvb2FwY3A3bjdv">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const sections = useRef({});
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useRevealOnScroll();

  useEffect(() => {
    // inject fonts and small animation styles
    const head = document.head;
    const f1 = document.createElement('link');
    f1.rel = 'stylesheet';
    f1.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Syne:wght@400;700&display=swap';
    head.appendChild(f1);

    const style = document.createElement('style');
    style.innerHTML = `
      /* Theme variables */
      :root {
        --bg: #0d0f14;
        --bg-card: rgba(255,255,255,0.04);
        --bg-card2: rgba(255,255,255,0.07);
        --border: rgba(255,255,255,0.08);
        --text-head: #ffffff;
        --text-body: #cbd5e1;
        --text-muted: #64748b;
        --accent: #3ddc84;
        --accent-dim: rgba(61,220,132,0.15);
        --accent-text: #3ddc84;
        --code-bg: rgba(0,0,0,0.35);
        --nav-bg: rgba(13,15,20,0.6);
        --tag-bg: rgba(255,255,255,0.06);
        --shadow: 0 4px 24px rgba(0,0,0,0.4);
        --btn-foreground: black;
      }

      :root[data-theme='light'] {
        --bg: #f0f4f8;
        --bg-card: rgba(255,255,255,0.75);
        --bg-card2: rgba(255,255,255,0.9);
        --border: rgba(0,0,0,0.08);
        --text-head: #0f172a;
        --text-body: #334155;
        --text-muted: #64748b;
        --accent: #16a34a;
        --accent-dim: rgba(22,163,74,0.1);
        --accent-text: #16a34a;
        --code-bg: rgba(0,0,0,0.05);
        --nav-bg: rgba(240,244,248,0.7);
        --tag-bg: rgba(0,0,0,0.05);
        --shadow: 0 4px 24px rgba(0,0,0,0.08);
        --btn-foreground: white;
      }

      body { background: var(--bg); color: var(--text-body); font-family: 'Syne', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; transition: background 0.3s ease, color 0.3s ease; }
      .font-mono { font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', monospace; }

      /* Grid animation */
      .grid-anim {
        background-image: linear-gradient(var(--accent-dim) 1px, transparent 1px), linear-gradient(90deg, var(--accent-dim) 1px, transparent 1px);
        background-size: 40px 40px, 40px 40px;
        animation: moveGrid 20s linear infinite;
      }
      @keyframes moveGrid { from { background-position: 0 0, 0 0; } to { background-position: 160px 160px, -160px -160px; } }

      /* Reveal */
      [data-reveal] { opacity: 0; transform: translateY(12px); transition: opacity 700ms ease, transform 700ms ease; }
      [data-reveal].reveal-visible { opacity: 1; transform: translateY(0); }

      .blinker { animation: blink 1s steps(2, start) infinite; }
      @keyframes blink { to { visibility: hidden; } }

      /* Semantic theme utilities */
      .t-heading { color: var(--text-head); }
      .t-body { color: var(--text-body); }
      .t-muted { color: var(--text-muted); }
      .t-accent { color: var(--accent-text); }

      .t-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; box-shadow: var(--shadow); backdrop-filter: blur(12px); transition: all 0.3s; }
      .t-card2 { background: var(--bg-card2); border: 1px solid var(--border); border-radius: 8px; transition: all 0.3s; }

      .t-tag { background: var(--tag-bg); color: var(--text-body); border: 1px solid var(--border); border-radius: 9999px; padding: 2px 12px; font-size: 0.8rem; }

      .t-input { background: var(--tag-bg); border: 1px solid var(--border); border-radius: 6px; color: var(--text-head); padding: 8px 10px; width: 100%; outline: none; }
      .t-input:focus { border-color: var(--accent); }

      .t-code { background: var(--code-bg); border: 1px solid var(--border); border-radius: 8px; color: var(--text-body); font-size: 0.75rem; padding: 12px; }

      .t-nav { background: var(--nav-bg); border-bottom: 1px solid var(--border); backdrop-filter: blur(16px); }
      .t-nav-link { color: var(--text-body); transition: color 0.2s; }
      .t-nav-link:hover { color: var(--accent-text); }

      .t-btn-primary { background: var(--accent); color: var(--btn-foreground); font-weight: 600; border-radius: 8px; padding: 8px 20px; transition: all 0.18s; }
      .t-btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }

      .t-btn-secondary { border: 1.5px solid var(--border); color: var(--accent-text); background: transparent; border-radius: 8px; padding: 8px 20px; transition: all 0.18s; }
      .t-btn-secondary:hover { background: var(--accent-dim); border-color: var(--accent); }

      .t-toggle { border: 1.5px solid var(--border); border-radius: 8px; padding: 5px 8px; background: var(--tag-bg); color: var(--text-body); }
      .t-toggle:hover { border-color: var(--accent); }

      .t-timeline-line { background: var(--border); }
      .t-timeline-dot { background: var(--accent); border: 2px solid var(--bg); }

      .sec-title { font-size: 1.5rem; font-weight: 700; color: var(--text-head); margin-bottom: 1.5rem; padding-bottom: 0.5rem; border-bottom: 2px solid var(--accent-dim); display: inline-block; }

      /* Skill group accents */
      .sg-green { background: rgba(61,220,132,0.10); border: 1px solid rgba(61,220,132,0.20); }
      .sg-blue { background: rgba(59,130,246,0.10); border: 1px solid rgba(59,130,246,0.20); }
      .sg-purple { background: rgba(168,85,247,0.10); border: 1px solid rgba(168,85,247,0.20); }
      .sg-yellow { background: rgba(234,179,8,0.10); border: 1px solid rgba(234,179,8,0.20); }
      .sg-red { background: rgba(239,68,68,0.10); border: 1px solid rgba(239,68,68,0.20); }

      /* make sure buttons with links keep spacing utilities */
      .t-btn-primary, .t-btn-secondary { display: inline-flex; align-items: center; gap: 8px; }
      .hover-accent:hover { color: var(--accent-text) !important; }
      .hover-bg-accent-dim:hover { background: var(--accent-dim) !important; }

    `;
    head.appendChild(style);

    return () => {
      head.removeChild(f1);
      head.removeChild(style);
    };
  }, []);

  // hero heading also slowed to match
  const typed = useTyping(TYPING_PHRASES, 200, 2000);

  // sync theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleNavigate = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div className="absolute inset-0 grid-anim opacity-20 pointer-events-none" />
      <Navbar onNavigate={handleNavigate} theme={theme} setTheme={setTheme} />

      <main className="pt-20">
        <div className="max-w-5xl mx-auto">
          <Hero onViewWork={() => handleNavigate('about')} />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Certifications />
          <Hobbies />
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
}
