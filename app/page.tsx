'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// Isse 'contact' hata de
import { Music, Globe, Zap, DollarSign, Menu, X, PlayCircle, ShieldCheck, Quote, Plus, Minus, Mail, Contact } from 'lucide-react';

// --- SCROLL REVEAL COMPONENT ---
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');
const [contact, setContact] = useState('');
const [message, setMessage] = useState('');
const [isFormSubmitting, setIsFormSubmitting] = useState(false);
const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// --- FAQ COMPONENT ---
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 py-5 cursor-pointer group" onClick={() => setIsOpen(!isOpen)}>
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-[16px] font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">{question}</h4>
        <div className="text-cyan-400 shrink-0">{isOpen ? <Minus size={20} /> : <Plus size={20} />}</div>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
        <p className="text-slate-400 text-[15px] leading-relaxed pr-4">{answer}</p>
      </div>
    </div>
  );
}



// --- FLOATING MUSIC NOTES (FIXED HYDRATION ERROR) ---
const FloatingNotes = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);
  if (!isClient) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random() * 0.3 + 0.1,
            transform: `scale(${Math.random() * 0.5 + 0.5}) rotate(${Math.random() * 45 - 20}deg)`
          }}
        >
          <Music size={30} className={i % 2 === 0 ? "text-indigo-400" : "text-cyan-400"} />
        </div>
      ))}
    </div>
  );
};

export default function MaeveMusicLandingPage() {
  const DASHBOARD_URL = 'https://app.maevemusic.in';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  

  // --- 🔥 FORM STATE ---
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

  const handleNewsletterSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewsletterMessage('');
    if (!newsletterEmail.trim()) {
      setNewsletterMessage('Please enter your email.');
      return;
    }
    setIsSubscribing(true);
    setTimeout(() => {
      setNewsletterMessage('Subscribed successfully.');
      setNewsletterEmail('');
      setIsSubscribing(false);
    }, 1000);
  };

  // --- 🔥 CALLBACK FORM SUBMIT HANDLER ---
  const handleCallbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ type: null, message: '' });

    // Validation: Check karo ki Name aur Contact khaali na ho
    if (!name.trim() || !contact.trim()) {
      setFormStatus({ type: 'error', message: 'Full Name and Contact are mandatory.' });
      return;
    }

    setIsFormSubmitting(true);

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Naye fields bhejo
        body: JSON.stringify({ name, contact, message }),
      });

      if (response.ok) {
        setFormStatus({ type: 'success', message: 'Success! We will contact you soon.' });
        // Naye fields reset karo
        setName(''); setContact(''); setMessage('');
      } else {
        const data = await response.json();
        setFormStatus({ type: 'error', message: data.message || 'Submission failed.' });
      }
    } catch (error) {
      setFormStatus({ type: 'error', message: 'Network error. Could not connect to the server.' });
    } finally {
      setIsFormSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030108] font-sans text-slate-200 selection:bg-indigo-500/30 relative overflow-hidden">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: scroll 40s linear infinite;
          }
          .animate-marquee:hover { animation-play-state: paused; }
          
          @keyframes scroll-reverse {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-marquee-reverse {
            display: flex;
            width: max-content;
            animation: scroll-reverse 40s linear infinite;
          }
          .animate-marquee-reverse:hover { animation-play-state: paused; }

          @keyframes float-up {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 0.3; }
            90% { opacity: 0.3; }
            100% { transform: translateY(-20vh) rotate(360deg); opacity: 0; }
          }
          .animate-float {
            animation: float-up 15s linear infinite;
          }
          .text-gradient {
            background: linear-gradient(135deg, #a78bfa 0%, #2dd4bf 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .btn-gradient {
            background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%);
          }
          .btn-gradient:hover {
            background: linear-gradient(135deg, #7c3aed 0%, #0891b2 100%);
          }
          .card-glass {
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.05);
          }
        `,
        }}
      />

      {/* BACKGROUND GLOWS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/20 blur-[150px] rounded-full mix-blend-screen"></div>
      </div>

      <FloatingNotes />

      {/* NAVIGATION */}
      <nav className="w-full relative z-40 bg-[#030108]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1400px] mx-auto h-20 px-6 md:px-12 flex items-center justify-between">
          
          <Link href="/" className="relative flex items-center gap-2">
            <div className="relative w-50 h-40">
              <Image src="/logos/maevemusic.png" alt="maevemusic.png" fill className="object-contain rounded-lg" priority />
            </div>
            <span className="text-2xl font-black text-white tracking-wide"><span className="text-cyan-400"></span></span>
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="#features" className="hover:text-cyan-400 transition-colors">Features</Link>
            <Link href="#stores" className="hover:text-cyan-400 transition-colors">Platforms</Link>
            <Link href="#testimonials" className="hover:text-cyan-400 transition-colors">Reviews</Link>
            <Link href="#faq" className="hover:text-cyan-400 transition-colors">FAQ</Link>
            <Link href="/pricing" className="hover:text-cyan-400 transition-colors">Pricing</Link>
            <Link href="/about" className="hover:text-cyan-400 transition-colors">About</Link>
            <Link href="/stores" className="hover:text-cyan-400 transition-colors">Stores</Link>

          </div>

          <div className="flex items-center gap-4">
            <a href={`${DASHBOARD_URL}/login`} className="hidden md:block text-sm font-semibold text-white hover:text-indigo-400 transition-colors">
              Log in
            </a>
            <a href={`${DASHBOARD_URL}/signup`} className="hidden md:inline-flex btn-gradient text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-105">
              Sign Up Free
            </a>
            <button className="lg:hidden p-2 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={40} className="text-cyan-400" /> : <Menu size={40} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full border-t border-white/5 bg-[#030108]/95 backdrop-blur-3xl px-6 py-6 space-y-4 z-50 shadow-2xl">
            <Link href="#features" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-white pb-2 border-b border-white/5">Features</Link>
            <Link href="#stores" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-white pb-2 border-b border-white/5">Platforms</Link>
            <Link href="#testimonials" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-white pb-2 border-b border-white/5">Reviews</Link>
            <Link href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-white pb-2 border-b border-white/5">FAQ</Link>
            <Link href="about" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-white pb-2 border-b border-white/5">About</Link>
            <div className="pt-4 grid grid-cols-2 gap-3">
              <a href={`${DASHBOARD_URL}/login`} className="text-center text-sm font-bold border border-white/20 rounded-full py-3 text-white">Login</a>
              <a href={`${DASHBOARD_URL}/signup`} className="text-center text-sm font-bold rounded-full py-3 btn-gradient text-white">Sign Up</a>
            </div>
          </div>
        )}
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 px-4 lg:px-12 z-10 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: TEXT */}
          <Reveal className="flex flex-col items-start text-left z-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full card-glass mb-8 border-cyan-500/30">
              <span className="flex h-3 w-3 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-cyan-300 text-xs font-bold uppercase tracking-[0.15em]">Global Music Distribution</span>
            </div>

            <h1 className="text-4xl sm:text-4xl md:text-[5rem] lg:text-[5.5rem] font-black uppercase tracking-tight leading-[1.05] mb-6 drop-shadow-2xl">
              <span className="text-white">YOUR MUSIC </span>
              <br className="hidden md:block"/>
              <span className="text-gradient">EVERYWHERE,</span>
              <br />
              <span className="text-white">WE DELIVER<br className="md:hidden" /> GLOBALLY</span>
            </h1>

            <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-6 tracking-wide drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              Fast Approved, Fast Earning
            </h2>

            <p className="text-base md:text-lg text-slate-300 max-w-xl mb-10 font-medium leading-relaxed">
              Free Release your Music on Spotify, Apple music, Amazon music, Youtube music and many more and keep <span className="text-white font-bold">100% Royalities for lifetime.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
              <a href={`${DASHBOARD_URL}/signup`} className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full btn-gradient text-white font-black text-sm uppercase tracking-wider hover:scale-105 transition-all shadow-[0_0_30px_rgba(139,92,246,0.5)]">
                Release Your Music Now
                <Zap size={18} />
              </a>
              <a href="about" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full card-glass text-white font-bold text-sm uppercase tracking-wider hover:bg-white/5 transition-all">
                <PlayCircle size={18} className="text-cyan-400" />
                How it works
              </a>
            </div>
          </Reveal>

          {/* RIGHT SIDE: BENTO GRID WITH DASHBOARD WIDGETS & PERFECT IMAGES */}
          <Reveal delay={200} className="relative w-full h-[550px] flex items-center justify-center z-10 hidden lg:flex">
            
            <div className="grid grid-cols-3 grid-rows-3 gap-5 h-[480px] w-full max-w-[500px]">
                
                {/* 1. Top Left Tall Box: Portrait Image (Col 1, Row 1-2) */}
                <div className="col-start-1 col-span-1 row-start-1 row-span-2 rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/5 relative group shadow-2xl">
                    <Image src="/artist/Tarun Da.jpg" alt="Artist 1" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* 2. Top Right Wide Box: REVENUE LINE CHART (Col 2-3, Row 1) */}
                <div className="col-start-2 col-span-2 row-start-1 row-span-1 rounded-[2rem] bg-[#0A1A24] border border-cyan-900/50 p-5 flex flex-col justify-between shadow-lg relative group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent"></div>
                    
                    <div className="relative z-10 flex justify-between items-start w-full">
                        <div>
                            <p className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-1">Total Revenue</p>
                            <p className="text-white text-2xl font-black tracking-tight">$12,450.00</p>
                        </div>
                        <div className="bg-cyan-400/20 px-2 py-1 rounded text-cyan-300 text-[10px] font-bold">+14%</div>
                    </div>
                    
                    <div className="relative z-10 w-full h-12 mt-2">
                        <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                            <path d="M0,30 L0,15 C10,15 15,25 25,20 C35,15 40,5 50,10 C60,15 65,28 75,20 C85,12 90,5 100,2 L100,30 Z" fill="url(#grad1)" opacity="0.4" />
                            <path d="M0,15 C10,15 15,25 25,20 C35,15 40,5 50,10 C60,15 65,28 75,20 C85,12 90,5 100,2" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
                            <defs>
                                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>

                {/* 3. Middle Center Box: STREAMS BAR CHART (Col 2, Row 2) */}
                <div className="col-start-2 col-span-1 row-start-2 row-span-1 rounded-[2rem] bg-[#1A0E2E] border border-purple-900/50 p-4 flex flex-col justify-end shadow-lg relative group overflow-hidden">
                    <p className="text-purple-300 text-[10px] font-bold tracking-widest uppercase absolute top-4 left-4 z-10">Streams</p>
                    <div className="flex items-end justify-between w-full h-16 gap-1.5 z-10 relative">
                        <div className="w-full bg-purple-500/20 rounded-t-sm h-[40%] group-hover:h-[50%] transition-all duration-300"></div>
                        <div className="w-full bg-purple-500/40 rounded-t-sm h-[70%] group-hover:h-[80%] transition-all duration-300"></div>
                        <div className="w-full bg-purple-400 rounded-t-sm h-[90%] group-hover:h-[100%] transition-all duration-300 shadow-[0_0_10px_#c084fc]"></div>
                        <div className="w-full bg-purple-500/30 rounded-t-sm h-[60%] group-hover:h-[70%] transition-all duration-300"></div>
                    </div>
                </div>

                {/* 4. RIGHT TALL BOX: Portrait Image (Col 3, Row 2-3) */}
                <div className="col-start-3 col-span-1 row-start-2 row-span-2 rounded-[2rem] overflow-hidden bg-[#0A1A24] border border-cyan-500/30 relative group shadow-[0_0_30px_rgba(6,182,212,0.2)] flex flex-col justify-end">
                    <Image src="/artist/Tarulata kutum.jpeg" alt="Artist 3" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030108] via-[#030108]/30 to-transparent opacity-90"></div>
                    
                    <div className="relative z-20 p-5 w-full">
                        <div className="flex items-center gap-2 mb-1.5">
                            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></div>
                            <span className="text-cyan-400 font-black text-[9px] tracking-widest uppercase">Verified</span>
                        </div>
                        <span className="text-white font-bold text-xs tracking-wider uppercase drop-shadow-md block">20M+ Streams</span>
                    </div>
                </div>

                {/* 5. Bottom Left Box: PIE/DONUT CHART (Col 1, Row 3) */}
                <div className="col-start-1 col-span-1 row-start-3 row-span-1 rounded-[2rem] bg-[#240C1E] border border-pink-900/50 flex flex-col items-center justify-center shadow-lg relative group overflow-hidden">
                    <div className="w-16 h-16 rounded-full bg-[conic-gradient(#ec4899_0%_100%,#831843_100%_100%)] flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                        <div className="w-12 h-12 bg-[#240C1E] rounded-full flex items-center justify-center">
                            <span className="text-pink-500 text-xs font-black">100%</span>
                        </div>
                    </div>
                    <p className="text-pink-400 text-[9px] font-bold tracking-widest uppercase mt-3">Royalties</p>
                </div>

                {/* 6. Bottom Center Box: GUITAR BOY (Col 2, Row 3) */}
                <div className="col-start-2 col-span-1 row-start-3 row-span-1 rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/5 relative shadow-lg group">
                    <Image src="/artist/Mousam Gogoi.jpeg" alt="Artist 2" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                </div>

            </div>

            {/* Glowing Depth behind the grid */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 blur-[100px] rounded-full z-[-1] pointer-events-none"></div>
          </Reveal>

        </div>
      </section>

      {/* ================= STORES TAPE ================= */}
      <section id="stores" className="py-10 border-y border-white/5 bg-[#030108]/50 backdrop-blur-md relative z-20 overflow-hidden">
        <div className="text-center mb-8">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Deliver to 150+ Digital Stores worldwide</p>
        </div>
        <div className="animate-marquee opacity-70 hover:opacity-100 transition-opacity">
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-12 md:gap-24 px-6 md:px-12 shrink-0">
              <Image src="/logos/spotify.png" alt="Spotify" width={120} height={40} className="object-contain" />
              <Image src="/logos/Apple.png" alt="Apple Music" width={120} height={40} className="object-contain" />
              <Image src="/logos/youtube.png" alt="YouTube" width={120} height={40} className="object-contain" />
              <Image src="/logos/metaaaa.png" alt="Meta" width={120} height={40} className="object-contain" />
              <Image src="/logos/amazon.png" alt="Amazon" width={120} height={40} className="object-contain" />
              <Image src="/logos/saavn.png" alt="JioSaavn" width={120} height={40} className="object-contain" />
              <Image src="/logos/gaana.png" alt="Gaana" width={120} height={40} className="object-contain" />
              <Image src="/logos/tik-tok.png" alt="TikTok" width={120} height={40} className="object-contain" />
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section id="features" className="py-24 px-6 md:px-12 max-w-[1300px] mx-auto relative z-10">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
            Everything you need <br/><span className="text-gradient">to succeed</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">No hidden fees, no complicated contracts. Just pure tools for independent artists.</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          <Reveal delay={100} className="card-glass p-10 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6 border border-indigo-500/30 group-hover:bg-indigo-500/40 transition-colors">
              <Globe size={32} className="text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Global Reach</h3>
            <p className="text-slate-400 leading-relaxed">
              Instantly distribute your tracks to Spotify, Apple Music, TikTok, Instagram, and over 150+ stores globally with a single click.
            </p>
          </Reveal>

          <Reveal delay={200} className="card-glass p-10 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300 group relative overflow-hidden border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full"></div>
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-6 border border-cyan-500/30 group-hover:bg-cyan-500/40 transition-colors relative z-10">
              <DollarSign size={32} className="text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">100% Royalties</h3>
            <p className="text-slate-400 leading-relaxed relative z-10">
              You own your masters and you keep 100% of your earnings. We process payouts fast, so you get paid for every stream.
            </p>
          </Reveal>

          <Reveal delay={300} className="card-glass p-10 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 border border-purple-500/30 group-hover:bg-purple-500/40 transition-colors">
              <ShieldCheck size={32} className="text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Fast Approval</h3>
            <p className="text-slate-400 leading-relaxed">
              Our dedicated QA team reviews and approves your releases at lightning speed, ensuring your music drops exactly when you plan it.
            </p>
          </Reveal>

        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section id="testimonials" className="py-24 px-6 md:px-12 max-w-[1300px] mx-auto relative z-10 border-t border-white/5">
        <Reveal className="text-center mb-16">
          <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-3 block">Hall of Fame</span>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Artist Reviews
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <Reveal delay={100} className="relative card-glass p-8 rounded-[2rem] border-t-2 border-t-indigo-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all">
            <Quote size={40} className="text-indigo-500/30 absolute top-6 right-6" />
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              ))}
            </div>
            <p className="text-lg text-slate-300 font-medium mb-8 leading-relaxed">
              "Very Dedicated Team, I highly Recommend."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-indigo-500/50 relative">
                 <Image src="/artist/Torawati Mili Bori Singer.jpeg" alt="Torawati Mili Bori" fill className="object-cover" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">Torawati Mili Bori</h4>
                <p className="text-indigo-400 text-sm">Artist</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200} className="relative card-glass p-8 rounded-[2rem] border-t-2 border-t-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all md:-translate-y-6">
            <Quote size={40} className="text-cyan-400/30 absolute top-6 right-6" />
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              ))}
            </div>
            <p className="text-lg text-slate-300 font-medium mb-8 leading-relaxed">
              "Excellent, Outstanding service and fast distribution."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-400/50 relative">
                 <Image src="/artist/Actor Director Feroz Pegu.jpeg" alt="Feroz Pegu" fill className="object-cover" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">Feroz Pegu</h4>
                <p className="text-cyan-400 text-sm">Artist</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={300} className="relative card-glass p-8 rounded-[2rem] border-t-2 border-t-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all">
            <Quote size={40} className="text-purple-500/30 absolute top-6 right-6" />
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              ))}
            </div>
            <p className="text-lg text-slate-300 font-medium mb-8 leading-relaxed">
              "All in all, its great. Highly satisfied with the transparency."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-purple-500/50 relative">
                 <Image src="/artist/Mousam Gogoi.jpeg" alt="Mousam Gogoi" fill className="object-cover" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">Mousam Gogoi</h4>
                <p className="text-purple-400 text-sm">Artist</p>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section id="faq" className="py-24 px-6 md:px-12 max-w-[800px] mx-auto relative z-10 border-t border-white/5">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Frequently Asked Questions
          </h2>
        </Reveal>
        
        <Reveal delay={200} className="card-glass rounded-[2rem] p-8">
          <FAQItem 
            question="What is music distribution, and why is it important?" 
            answer="Distribution gets your music onto platforms like Spotify, Apple Music, and YouTube. It's essential for independent artists to reach a global audience and collect streaming royalties." 
          />
          <FAQItem 
            question="How long does it take for my music to go live?" 
            answer="With our Fast Lane Delivery, many releases go live in 24-48 hours on major platforms. However, we always recommend uploading your music at least 2 weeks in advance." 
          />
          <FAQItem 
            question="What happens if my plan expires?" 
            answer="Zero Forced Takedowns. Even if your subscription expires, your music stays online and you keep earning your royalties permanently unless you explicitly request a removal." 
          />
          <FAQItem 
            question="Do I keep 100% of my royalties?" 
            answer="Yes. MaeveMusic is built for artist-first ownership. You keep your master rights and 100% of your streaming income without hidden fees." 
          />
        </Reveal>
      </section>

      {/* ================= 🔥 CALLBACK FORM SECTION 🔥 ================= */}
<section className="py-24 px-6 relative z-10">
  <Reveal className="max-w-[1100px] mx-auto rounded-[3rem] card-glass p-12 relative overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.15)] border-cyan-500/10">
    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
    
    <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
      
      {/* Left Side: Text */}
      <div className="text-left">
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
          Ready to show your music <span className="text-gradient">to the world?</span>
        </h2>
        <p className="text-slate-300 text-lg max-w-lg mb-8 leading-relaxed">
          Need a personalized consultation? Request a callback and our team will get in touch shortly.
        </p>
      </div>

      {/* Right Side: The Callback Form */}
      <form onSubmit={handleCallbackSubmit} className="flex flex-col gap-5 p-8 bg-black/40 rounded-3xl border border-white/5 shadow-inner">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-1">Request a Callback</h3>
          <p className="text-sm text-slate-400">Fill your details and we will call you back.</p>
        </div>

        {formStatus.message && (
          <div className={`p-4 rounded-xl text-sm font-medium ${formStatus.type === 'success' ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/30' : 'bg-rose-950/50 text-rose-300 border border-rose-500/30'}`}>
            {formStatus.message}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-cyan-400 transition-colors"
          />
          <input
            type="text"
            value={contact} // Sahi variable: contact
            onChange={(e) => setContact(e.target.value)} // Sahi function: setContact
            placeholder="Phone Number or Email"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-cyan-400 transition-colors"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help you?"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-cyan-400 transition-colors h-32"
          />
        </div>

        <button
          type="submit"
          disabled={isFormSubmitting}
          className="w-full btn-gradient text-white font-black px-6 py-4 rounded-full text-sm uppercase tracking-wider transition-all hover:scale-105 disabled:opacity-60"
        >
          {isFormSubmitting ? 'Sending Request...' : 'Request Callback'}
        </button>
      </form>

    </div>
  </Reveal>
</section>

      {/* ================= COVER ART PORTFOLIO SECTION ================= */}
      <section className="py-24 relative z-10 overflow-hidden border-t border-white/5 bg-[#030108]/50">
        <Reveal className="text-center mb-16 px-6">
          <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-3 block">Our Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Recent <span className="text-gradient">Releases</span>
          </h2>
        </Reveal>

        {/* Marquee Row 1 (Moving Left) */}
        <div className="relative flex overflow-x-hidden group mb-6">
          <div className="animate-marquee flex gap-6 px-3">
            {["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg"].map((name, i) => (
              <div key={i} className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shrink-0 shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/5 hover:border-cyan-400/50 hover:-translate-y-2 cursor-pointer transition-all duration-500">
                <Image src={`/covers/${name}`} alt={name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                   <PlayCircle className="text-cyan-400 mb-2" size={40} />
                </div>
              </div>
            ))}
          </div>
          <div className="animate-marquee flex gap-6 px-3">
            {["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg"].map((name, i) => (
              <div key={`dup-${i}`} className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shrink-0 shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/5">
                <Image src={`/covers/${name}`} alt={name} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Row 2 (Moving Right) */}
        <div className="relative flex overflow-x-hidden group mt-6">
          <div className="animate-marquee-reverse flex gap-6 px-3">
            {["13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "21.jpg", "20.jpg", "19.jpg", "18.jpg", "17.jpg", "16.jpg", "15.jpg", "14"].map((name, i) => (
              <div key={i} className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shrink-0 shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/5 hover:border-purple-400/50 hover:-translate-y-2 cursor-pointer transition-all duration-500">
                <Image src={`/covers/${name}`} alt={name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                   <PlayCircle className="text-purple-400 mb-2" size={40} />
                </div>
              </div>
            ))}
          </div>
          <div className="animate-marquee-reverse flex gap-6 px-3">
            {["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg"].map((name, i) => (
              <div key={`dup2-${i}`} className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shrink-0 shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/5">
                <Image src={`/covers/${name}`} alt={name} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
            <footer className="bg-[#010205] pt-20 pb-10 border-t border-white/5 text-center md:text-left relative z-20">
               <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
                <div className="col-span-1 lg:col-span-1">
                   <div className="flex items-center justify-center md:justify-start gap-2 mb-6 h-12">
                     <div className="relative w-50 h-40">
                        <Image src="/logos/maevemusic.png" alt="TunePlus Logo" fill className="object-contain object-left md:object-left" />
                     </div>
                   </div>
                   <p className="text-slate-400 font-medium text-sm pr-4">YOUR MUSIC
EVERYWHERE,
WE DELIVER GLOBALLY. Free Release your Music on Spotify, Apple music, Amazon music, Youtube music and many more and keep 100% Royalities for lifetime.</p>
                </div>
                
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 text-slate-600">Learn About Maeve Music</h4>
                  <ul className="space-y-4 text-sm font-medium text-slate-400">
                    
                    
                    <li><Link href="/terms-and-conditions" className="hover:text-cyan-400 transition-colors">Terms & Conditions</Link></li>
                    <li><Link href="/privacy-policy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
                    <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
                  </ul>
                </div>
      
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 text-slate-600">Distribute</h4>
                  <ul className="space-y-4 text-sm font-medium text-slate-400">
                    <li><a href={`${DASHBOARD_URL}/signup`} className="hover:text-cyan-400 transition-colors">Join Maeve Music</a></li>
                    
                    <li><Link href="/pricing" className="hover:text-cyan-400 transition-colors">Pricing & Plans</Link></li>
                    
                  </ul>
                </div>
      
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 text-slate-600">Account Services</h4>
                  <ul className="space-y-4 text-sm font-medium text-slate-400">
                    <li><a href={`${DASHBOARD_URL}/login`} className="hover:text-cyan-400 transition-colors">Login</a></li>
                    <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact Support</Link></li>
                    
                  </ul>
                </div>
              </div>
      
              <div className="max-w-[1400px] mx-auto px-6 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
                 <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                   © {new Date().getFullYear()} Maeve Music. All rights reserved.
                 </div>
                 <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    <a href="https://www.facebook.com/share/18qLo6Yx6D/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
                    <a href="https://x.com/Maevemusic9" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X (Twitter)</a>
                    <a href="https://www.instagram.com/maeve.musicgroup?igsh=ZG1lM3VmcGF4d21q&utm_source=qr" className="hover:text-white transition-colors">Instagram</a>
                 </div>
              </div>
            </footer>
      
          </div>
        );
      }