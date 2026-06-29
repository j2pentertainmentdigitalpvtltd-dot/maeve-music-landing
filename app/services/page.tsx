'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, ShieldCheck, MonitorPlay, Zap,
  BookOpen, Palette, Tv, CheckCircle2, Plus, Minus, Layers
} from 'lucide-react';

// ================= 1. STANDARD NETWORK FIBER BACKGROUND =================
const FiberNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray: any[] = [];
    const numberOfParticles = 150; 
    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    class Particle {
      x: number; y: number; size: number; speedX: number; speedY: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas!.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.speedY *= -1;
      }
      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(6, 182, 212, 0.3)';
        ctx!.fill();
      }
    }

    function init() {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    let animationFrameId: number;

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) { 
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(6, 182, 212, ${0.15 - distance/800})`; 
            ctx!.lineWidth = 0.5;
            ctx!.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx!.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx!.stroke();
          }
        }
        
        const dxMouse = particlesArray[i].x - mouse.x;
        const dyMouse = particlesArray[i].y - mouse.y;
        const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distanceMouse < 200) { 
          ctx!.beginPath();
          ctx!.strokeStyle = `rgba(59, 130, 246, ${0.4 - distanceMouse/500})`; 
          ctx!.lineWidth = 1;
          ctx!.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx!.lineTo(mouse.x, mouse.y);
          ctx!.stroke();
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

// ================= MAIN COMPONENT =================
export default function ArtistServicesPage() {
  const DASHBOARD_URL = 'https://app.tuneplusmusic.com'; 
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqs = [
    {
      q: "How much does it cost to put songs on Spotify & Apple Music?",
      a: "TunePlus makes it easy, cheap, and fast to put your music on the most popular streaming services. Submit your music starting at ₹999/year with our Unlimited Distribution plans."
    },
    {
      q: "How long does it take to get music on stores?",
      a: "We care about making sure your release goes out to your fan base as quickly as possible. After you upload your music, it will take us about one day to approve it. Then you can expect to hear your songs on Apple Music and Spotify after 2-3 business days."
    },
    {
      q: "Do I keep 100% of my royalties?",
      a: "Yes! If you are on the Pro Artist or Label plan, you keep exactly 100% of the revenue generated from stores. For the free Pay Per Release plan, you keep 80%."
    },
    {
      q: "Are there any hidden takedown fees?",
      a: "Absolutely not. You can request a takedown of your music at any time, completely free of charge. You own your music."
    }
  ];

  return (
    <div className="min-h-screen bg-[#02040a] font-sans text-slate-200 selection:bg-blue-500/30 overflow-x-hidden relative">
      
      <FiberNetwork />

      {/* Ambient Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-0 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[10%] left-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] rounded-full mix-blend-screen"></div>
      </div>

      {/* ================= STANDARD NAVBAR ================= */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#02040a]/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group h-12">
             <div className="relative w-48 h-full group-hover:scale-105 transition-transform">
                <Image src="/logos/tuneplus-logo.png" alt="TunePlus Logo" fill className="object-contain object-left drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]" priority/>
             </div>
          </Link>
          
          <div className="hidden xl:flex items-center gap-6 font-bold text-[11px] uppercase tracking-widest text-slate-400">
            <Link href="/features" className="hover:text-white transition-colors">Features</Link>
            <span className="text-white border-b-2 border-cyan-500 pb-1">Services</span>
            <Link href="/splits" className="hover:text-white transition-colors">Splits</Link>
            <Link href="/accelerator" className="hover:text-white transition-colors">Accelerator</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/stores" className="hover:text-white transition-colors">Stores</Link>
            <Link href="/white-label" className="text-cyan-400 hover:text-cyan-300 transition-colors drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">White Label SaaS</Link>
          </div>

          <div className="flex items-center gap-6">
            <a href={`${DASHBOARD_URL}/login`} className="hidden md:block font-bold text-[12px] uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Login</a>
            <a href={`${DASHBOARD_URL}/signup`} className="group relative overflow-hidden inline-flex bg-cyan-600 text-white px-8 py-3.5 rounded-full font-bold text-[12px] uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <span className="relative z-10 transition-colors group-hover:text-white">Sign Up Free</span>
              <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
            </a>
          </div>
        </div>
      </nav>

      {/* ================= CINEMATIC HERO SECTION ================= */}
      <section className="relative pt-48 pb-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden min-h-[85vh] z-10">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-black text-[10px] uppercase tracking-widest mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <Layers size={14}/> Premium Add-Ons
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black uppercase tracking-tighter text-white mb-6 leading-[0.9] drop-shadow-2xl">
            More Than Just <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Distribution.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 font-medium mb-12 max-w-3xl mx-auto leading-relaxed">
            Take your music career to the next level. Collect publishing royalties, monetize YouTube, and design your own cover art—all from your TunePlus dashboard.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href={`${DASHBOARD_URL}/signup`} className="w-full sm:w-auto group relative overflow-hidden inline-flex bg-cyan-600 text-white px-14 py-6 rounded-full font-black text-sm uppercase tracking-[0.2em] transition-all shadow-[0_0_40px_rgba(6,182,212,0.4)] items-center justify-center gap-3">
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">Unlock Services <ArrowRight size={18}/></span>
              <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
            </a>
          </div>
        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="py-24 px-6 border-y border-white/5 bg-[#050b14]/50 relative z-20">
        <div className="max-w-[1400px] mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">Everything an <span className="text-purple-400">Artist Needs</span></h2>
          <p className="text-slate-400 font-medium max-w-2xl mx-auto text-lg">We provide enterprise-grade tools to independent artists, ensuring no money is left on the table.</p>
        </div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Service 1 */}
          <div className="bg-[#02040a] p-12 rounded-[3rem] border border-white/5 hover:border-red-500/50 transition-all duration-500 group text-left relative overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500"><MonitorPlay size={120} className="text-red-500"/></div>
            <div className="bg-red-500/10 w-16 h-16 rounded-2xl flex items-center justify-center text-red-500 mb-8 border border-red-500/20 group-hover:scale-110 transition-transform">
              <MonitorPlay size={32} />
            </div>
            <h3 className="text-3xl font-black uppercase text-white mb-4">YouTube Content ID</h3>
            <p className="text-slate-400 font-medium leading-relaxed mb-8">
              Make money every time someone uses your music in their YouTube videos. We scan the entire platform, claim videos containing your audio, and route the ad revenue directly to your wallet.
            </p>
            <ul className="space-y-3 font-bold text-sm text-slate-300">
              <li className="flex items-center gap-3"><CheckCircle2 className="text-red-500" size={18}/> Global Scanning Engine</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="text-red-500" size={18}/> Dispute Management</li>
            </ul>
          </div>

          {/* Service 2 */}
          <div className="bg-[#02040a] p-12 rounded-[3rem] border border-white/5 hover:border-purple-500/50 transition-all duration-500 group text-left relative overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500"><BookOpen size={120} className="text-purple-500"/></div>
            <div className="bg-purple-500/10 w-16 h-16 rounded-2xl flex items-center justify-center text-purple-400 mb-8 border border-purple-500/20 group-hover:scale-110 transition-transform">
              <BookOpen size={32} />
            </div>
            <h3 className="text-3xl font-black uppercase text-white mb-4">Publishing Administration</h3>
            <p className="text-slate-400 font-medium leading-relaxed mb-8">
              Streaming services pay distribution royalties, but who is collecting your mechanical royalties? We register your songs globally to ensure you collect every penny owed to you as a songwriter.
            </p>
            <ul className="space-y-3 font-bold text-sm text-slate-300">
              <li className="flex items-center gap-3"><CheckCircle2 className="text-purple-400" size={18}/> Global PRO Registration</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="text-purple-400" size={18}/> Mechanical & Performance Royalties</li>
            </ul>
          </div>

          {/* Service 3 */}
          <div className="bg-[#02040a] p-12 rounded-[3rem] border border-white/5 hover:border-emerald-500/50 transition-all duration-500 group text-left relative overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500"><Palette size={120} className="text-emerald-500"/></div>
            <div className="bg-emerald-500/10 w-16 h-16 rounded-2xl flex items-center justify-center text-emerald-500 mb-8 border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <Palette size={32} />
            </div>
            <h3 className="text-3xl font-black uppercase text-white mb-4">Cover Art Studio</h3>
            <p className="text-slate-400 font-medium leading-relaxed mb-8">
              Be your own graphic designer. Create stunning cover art directly during the upload process using our built-in layouts, premium fonts, image filters, and professional overlays.
            </p>
            <ul className="space-y-3 font-bold text-sm text-slate-300">
              <li className="flex items-center gap-3"><CheckCircle2 className="text-emerald-500" size={18}/> 10,000+ Premium Templates</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="text-emerald-500" size={18}/> Store-compliant formatting</li>
            </ul>
          </div>

          {/* Service 4 */}
          <div className="bg-[#02040a] p-12 rounded-[3rem] border border-white/5 hover:border-amber-500/50 transition-all duration-500 group text-left relative overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500"><Tv size={120} className="text-amber-500"/></div>
            <div className="bg-amber-500/10 w-16 h-16 rounded-2xl flex items-center justify-center text-amber-500 mb-8 border border-amber-500/20 group-hover:scale-110 transition-transform">
              <Tv size={32} />
            </div>
            <h3 className="text-3xl font-black uppercase text-white mb-4">Sync Licensing</h3>
            <p className="text-slate-400 font-medium leading-relaxed mb-8">
              Get your music placed in TV shows, movies, commercials, and video games. Our creative pitching team actively seeks high-paying placement opportunities for TunePlus artists.
            </p>
            <ul className="space-y-3 font-bold text-sm text-slate-300">
              <li className="flex items-center gap-3"><CheckCircle2 className="text-amber-500" size={18}/> Netflix, Amazon & Network TV</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="text-amber-500" size={18}/> Retain 80% of Sync Fees</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ================= DEEP DIVE: PUBLISHING ================= */}
      <section className="py-32 px-6 max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-20">
        <div className="flex-1 lg:pr-10">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-8">
            Don't leave <span className="text-purple-400">money</span> <br/>on the table.
          </h2>
          <p className="text-lg text-slate-400 font-medium mb-8 leading-relaxed">
            When your song is streamed on Spotify, it generates two types of royalties: the Sound Recording royalty (which your distributor pays you) and the Composition royalty (which requires a publishing administrator to collect).
          </p>
          <p className="text-lg text-slate-400 font-medium mb-12 leading-relaxed">
            Without Publishing Administration, up to 15% of your global streaming revenue is sitting in black boxes around the world. We track it down and pay it out to you.
          </p>
          <a href={`${DASHBOARD_URL}/signup`} className="group relative overflow-hidden inline-flex bg-white text-black px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl items-center gap-3">
             <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">Register Your Songs <ArrowRight size={18}/></span>
             <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
          </a>
        </div>

        {/* Info Graphic Mockup */}
        <div className="flex-1 w-full">
          <div className="bg-[#050b14] border border-white/5 rounded-[3rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-purple-600/10 blur-[80px] rounded-full pointer-events-none"></div>
            
            <h4 className="text-2xl font-black uppercase tracking-tight text-white mb-10 relative z-10 text-center">Where your money goes</h4>
            
            <div className="space-y-6 relative z-10">
              <div className="bg-[#02040a] p-6 rounded-2xl border border-blue-500/30 flex items-center justify-between">
                <div>
                  <h5 className="text-white font-bold uppercase tracking-widest text-sm mb-1">Sound Recording (Master)</h5>
                  <p className="text-slate-500 font-medium text-xs">Collected by TunePlus Distribution</p>
                </div>
                <div className="text-3xl font-black text-blue-400">~85%</div>
              </div>

              <div className="bg-[#02040a] p-6 rounded-2xl border border-purple-500/50 flex items-center justify-between transform scale-105 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                <div>
                  <h5 className="text-white font-bold uppercase tracking-widest text-sm mb-1 flex items-center gap-2">
                    Composition (Publishing) <span className="bg-purple-500 text-white px-2 py-0.5 rounded text-[8px]">Action Required</span>
                  </h5>
                  <p className="text-slate-400 font-medium text-xs">Mechanicals & Performance Royalties</p>
                </div>
                <div className="text-3xl font-black text-purple-400">~15%</div>
              </div>
            </div>

            <div className="mt-10 p-5 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-4 relative z-10">
              <ShieldCheck className="text-amber-500 shrink-0 mt-1" size={24}/>
              <p className="text-sm font-medium text-amber-200/80 leading-relaxed">Our publishing partners collect directly from global societies, avoiding intermediaries and getting your money to you faster.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FREQUENTLY ASKED QUESTIONS ================= */}
      <section className="py-24 px-6 max-w-[900px] mx-auto z-10 relative border-t border-white/5">
        <div className="mb-16 text-center">
          <p className="text-[12px] font-bold uppercase tracking-widest text-cyan-500 mb-2">FAQS</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">
            Frequently Asked <br/>Questions
          </h2>
        </div>

        <div className="flex flex-col border-t border-white/10">
          {faqs.map((faq, idx) => (
             <FAQItem key={idx} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

      {/* ================= BOTTOM CTA ================= */}
      <section className="py-32 px-6 text-center relative overflow-hidden bg-[#050b14]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">Build a sustainable <br/><span className="text-cyan-400">Career.</span></h2>
          <p className="text-xl text-slate-400 font-medium mb-12 max-w-2xl mx-auto">
            Get access to the same tools and revenue streams used by major labels, all under one roof.
          </p>
          <a href={`${DASHBOARD_URL}/signup`} className="group relative overflow-hidden inline-flex bg-cyan-600 text-white px-14 py-6 rounded-full font-black text-sm uppercase tracking-[0.2em] transition-all shadow-[0_0_40px_rgba(6,182,212,0.4)] items-center gap-3">
             <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">Start Now <ArrowRight size={18}/></span>
             <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
          </a>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black pt-20 pb-10 border-t border-white/5 text-center md:text-left relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
             <div className="flex items-center justify-center md:justify-start gap-2 mb-6 h-12">
               <div className="relative w-40 h-full">
                  <Image src="/logos/tuneplus-logo.png" alt="TunePlus Logo" fill className="object-contain object-left md:object-left" />
               </div>
             </div>
             <p className="text-slate-500 font-medium text-sm pr-4">Empowering independent artists globally with premium distribution, algorithmic growth, and uncompromised royalty collection.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 text-slate-600">Learn About TunePlus</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
              <li><Link href="/leadership" className="hover:text-cyan-400 transition-colors">Leadership</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-cyan-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 text-slate-600">Make Money With Us</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><a href={`${DASHBOARD_URL}/signup`} className="hover:text-cyan-400 transition-colors">Create Your Account</a></li>
              <li><Link href="/features" className="hover:text-cyan-400 transition-colors">Sell Your Music</Link></li>
              <li><span className="text-cyan-500 transition-colors">Artist Services</span></li>
              <li><Link href="/splits" className="hover:text-cyan-400 transition-colors">Splits</Link></li>
              <li><Link href="/accelerator" className="hover:text-cyan-400 transition-colors">Accelerator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 text-slate-600">Account Services</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><a href={`${DASHBOARD_URL}/login`} className="hover:text-cyan-400 transition-colors">Login</a></li>
              <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
             © {new Date().getFullYear()} MaeveMusic. All rights reserved.
           </div>
           <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              <a href="https://www.facebook.com/profile.php?id=61557369243454" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
              <a href="https://x.com/TuneplusMusic" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X (Twitter)</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
           </div>
        </div>
      </footer>

    </div>
  );
}

// ================= FAQ HELPER COMPONENT =================
function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div 
      className="border-b border-white/10 py-6 cursor-pointer group" 
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center gap-6">
        <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{question}</h4>
        <div className="shrink-0 text-slate-500">
          {isOpen ? <Minus size={20} className="text-cyan-500" /> : <Plus size={20} className="group-hover:text-cyan-400 transition-colors" />}
        </div>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
        <p className="text-slate-400 font-medium leading-relaxed text-base">
          {answer}
        </p>
      </div>
    </div>
  );
}