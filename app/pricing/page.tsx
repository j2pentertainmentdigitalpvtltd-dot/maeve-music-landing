'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Check, X, Plus, Minus, Zap, ShieldCheck, Menu
} from 'lucide-react';

// ================= SCROLL REVEAL COMPONENT =================
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ================= STANDARD NETWORK FIBER BACKGROUND =================
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
    const numberOfParticles = 100; 
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
        ctx!.fillStyle = 'rgba(6, 182, 212, 0.2)';
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
          if (distance < 100) { 
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(6, 182, 212, ${0.1 - distance/1000})`; 
            ctx!.lineWidth = 0.5;
            ctx!.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx!.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx!.stroke();
          }
        }
        
        const dxMouse = particlesArray[i].x - mouse.x;
        const dyMouse = particlesArray[i].y - mouse.y;
        const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distanceMouse < 150) { 
          ctx!.beginPath();
          ctx!.strokeStyle = `rgba(59, 130, 246, ${0.3 - distanceMouse/500})`; 
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

export default function PricingPage() {
  const DASHBOARD_URL = 'https://app.maevemusic.in'; 
  const [activeTab, setActiveTab] = useState<'pay-per-release' | 'artists' | 'labels'>('artists');
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#030108] font-sans text-slate-300 selection:bg-cyan-500/30 overflow-x-hidden relative">
      
      <FiberNetwork />

      {/* BACKGROUND GLOWS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 blur-[150px] rounded-full mix-blend-screen"></div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .text-gradient {
            background: linear-gradient(135deg, #a78bfa 0%, #2dd4bf 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `,
        }}
      />

      {/* ================= MAEVE MUSIC NAVBAR ================= */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#030108]/90 backdrop-blur-xl border-b border-white/5 py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-[1400px] mx-auto h-20 px-6 md:px-12 flex items-center justify-between">
          
          <Link href="/" className="relative flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="relative w-50 h-40">
              <Image src="/logos/maevemusic.png" alt="MaeveMusic Logo" fill className="object-contain rounded-lg" priority />
            </div>
            <span className="text-2xl font-black text-white tracking-wide leading-none"><span className="text-cyan-400"></span></span>
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-slate-300">
            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <Link href="/pricing" className="hover:text-cyan-400 transition-colors">Pricing</Link>
            <Link href="/about" className="hover:text-cyan-400 transition-colors">About</Link>
            <Link href="/stores" className="hover:text-cyan-400 transition-colors">Stores</Link>
            
          </div>

          <div className="flex items-center gap-4">
            <a href={`${DASHBOARD_URL}/login`} className="hidden md:block text-sm font-semibold text-white hover:text-cyan-400 transition-colors">
              Log in
            </a>
            <a href={`${DASHBOARD_URL}/signup`} className="hidden md:inline-flex bg-cyan-400 text-black px-6 py-2.5 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:scale-105 hover:bg-cyan-300">
              Sign Up Free
            </a>
            <button className="lg:hidden p-2 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={35} className="text-cyan-400" /> : <Menu size={35} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full border-t border-white/5 bg-[#030108]/95 backdrop-blur-3xl px-6 py-6 space-y-4 z-50 shadow-2xl">
            <Link href="/" className="block text-base font-medium text-white pb-2 border-b border-white/5">Home</Link>
            <span className="block w-full text-left text-base font-bold text-cyan-400 pb-2 border-b border-white/5">Pricing</span>
            <Link href="/help-center" className="block text-base font-medium text-white pb-2 border-b border-white/5">Help Center</Link>
            <div className="pt-4 grid grid-cols-2 gap-3">
              <a href={`${DASHBOARD_URL}/login`} className="text-center text-sm font-bold border border-white/20 rounded-full py-3 text-white">Login</a>
              <a href={`${DASHBOARD_URL}/signup`} className="text-center text-sm font-bold rounded-full py-3 bg-cyan-400 text-black">Sign Up</a>
            </div>
          </div>
        )}
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="pt-40 pb-12 px-6 text-center relative z-10">
        <Reveal className="max-w-[1000px] mx-auto text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-500/20 text-cyan-400 font-bold text-[10px] uppercase tracking-widest mb-6 bg-cyan-900/10 shadow-inner">
            <ShieldCheck size={14}/> 100% Secure & Transparent
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-6">
            Find The Right <br/><span className="text-gradient">Plan For You</span>
          </h1>
          <p className="text-lg text-slate-400 font-medium mb-12 max-w-2xl">
            No hidden fees. No sneaky contracts. Keep your rights and scale your music journey with industry-leading tools.
          </p>

          {/* 🚀 TABS */}
          <div className="flex flex-wrap items-center gap-6 border-b border-white/10 mb-16">
            <button 
              onClick={() => setActiveTab('artists')}
              className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === 'artists' ? 'text-white border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Plans for Artists
            </button>
            <button 
              onClick={() => setActiveTab('pay-per-release')}
              className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'pay-per-release' ? 'text-white border-b-2 border-yellow-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Pay Per Song <span className="absolute -top-3 -right-6 text-[8px] bg-yellow-500 text-black px-1.5 py-0.5 rounded-sm animate-pulse">HOT</span>
            </button>
            <button 
              onClick={() => setActiveTab('labels')}
              className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === 'labels' ? 'text-white border-b-2 border-purple-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Plans for Labels
            </button>
          </div>
        </Reveal>
      </section>

      {/* ================= REDESIGNED PRICING CARDS ================= */}
      <section className="pb-24 px-6 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          
          {/* 🔥 ARTIST PLANS (FREE, RISE, STAR) */}
          {activeTab === 'artists' && (
            <Reveal className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* FREE PLAN */}
              <div className="bg-[#05050A] rounded-[2rem] border border-white/5 hover:border-slate-500/30 transition-all duration-300 shadow-xl overflow-hidden group flex flex-col h-full">
                <div className="p-8 border-b border-white/5 bg-white/[0.01]">
                   <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-1">MAEVE MUSIC FREE</h3>
                   <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest mb-6">For New Born Artists</p>
                   <div className="flex items-end gap-1 mb-6">
                     <span className="text-5xl font-black text-white tracking-tighter">₹0</span>
                   </div>
                   <a href={`${DASHBOARD_URL}/signup`} className="w-full block py-4 text-center rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all">Start Free</a>
                </div>
                <div className="p-8 flex-grow">
                  <ul className="space-y-1">
                    <FeatureItem text="Keep 80% of your earning" />
                    <FeatureItem text="Free ISRC & UPC Codes" />
                    <FeatureItem text="Artist Link" />
                    <FeatureItem text="Standard Processing time" />
                  </ul>
                </div>
              </div>

              {/* RISE PLAN (RECOMMENDED) */}
              <div className="bg-[#030914] rounded-[2rem] border-2 border-cyan-500/50 hover:border-cyan-400 transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.15)] overflow-hidden group flex flex-col h-full transform lg:-translate-y-4">
                <div className="p-8 border-b border-cyan-500/20 bg-cyan-900/10 relative">
                   <div className="absolute top-4 right-4 bg-cyan-400 text-black text-[9px] font-black uppercase tracking-widest py-1 px-3 rounded-full">Most Popular</div>
                   <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-1">MAEVE MUSIC RISE</h3>
                   <p className="text-cyan-400/80 text-[11px] font-bold uppercase tracking-widest mb-6">For New Artists</p>
                   <div className="flex items-end gap-1 mb-6">
                     <span className="text-5xl font-black text-white tracking-tighter">₹94</span>
                     <span className="text-cyan-400/70 font-bold text-[10px] uppercase mb-2">/ MONTH</span>
                   </div>
                   <a href={`${DASHBOARD_URL}/signup`} className="w-full block py-4 text-center rounded-xl bg-cyan-400 text-black font-black text-xs uppercase tracking-widest hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)]">Get Started</a>
                </div>
                <div className="p-8 flex-grow">
                  <ul className="space-y-1">
                    <FeatureItem text="Keep 90% of your earning" color="text-cyan-400" />
                    <FeatureItem text="Unlimited Release to all major DSPs" color="text-cyan-400" />
                    <FeatureItem text="Release Within 7 days" color="text-cyan-400" />
                    <FeatureItem text="Free ISRC & UPC Code" color="text-cyan-400" />
                    <FeatureItem text="Monetize UGC (Meta, Tiktok, YouTube)" color="text-cyan-400" />
                    <FeatureItem text="YouTube Content Id" color="text-cyan-400" />
                    <FeatureItem text="Copyright Protection" color="text-cyan-400" />
                    <FeatureItem text="High Quality Audio" color="text-cyan-400" />
                    <FeatureItem text="Royalty Splits at Source" color="text-cyan-400" />
                    <FeatureItem text="On demand Royalty Payouts" color="text-cyan-400" />
                    <FeatureItem text="Standard Analytics Dashboard" color="text-cyan-400" />
                    <FeatureItem text="4 Days Priority Support" color="text-cyan-400" />
                  </ul>
                </div>
              </div>

              {/* STAR PLAN */}
              <div className="bg-[#0B0514] rounded-[2rem] border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 shadow-lg overflow-hidden group flex flex-col h-full">
                <div className="p-8 border-b border-purple-500/20 bg-purple-900/10">
                   <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-1">MAEVE MUSIC STAR</h3>
                   <p className="text-purple-400/80 text-[11px] font-bold uppercase tracking-widest mb-6">For Ready Artists</p>
                   <div className="flex items-end gap-1 mb-6">
                     <span className="text-5xl font-black text-white tracking-tighter">₹299</span>
                     <span className="text-purple-400/70 font-bold text-[10px] uppercase mb-2">/ MONTH</span>
                   </div>
                   <a href={`${DASHBOARD_URL}/signup`} className="w-full block py-4 text-center rounded-xl bg-purple-500/20 border border-purple-500/50 text-purple-300 font-black text-xs uppercase tracking-widest hover:bg-purple-500/30 transition-all">Go Pro</a>
                </div>
                <div className="p-8 flex-grow">
                  <p className="text-[11px] font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest"><Zap size={14} className="text-purple-400"/> Everything in Rise, plus:</p>
                  <ul className="space-y-1">
                    <FeatureItem text="Keep 95% of your Earning" color="text-purple-400" />
                    <FeatureItem text="Fast Release (24-48 hrs)" color="text-purple-400" />
                    <FeatureItem text="Spotify Discover Mode" color="text-purple-400" />
                    <FeatureItem text="Dolby Atmos Distribution" color="text-purple-400" />
                    <FeatureItem text="Sync Licensing (Tv, Movies, Gaming)" color="text-purple-400" />
                    <FeatureItem text="Vevo Channel Creations" color="text-purple-400" />
                    <FeatureItem text="Catalog Migration" color="text-purple-400" />
                    <FeatureItem text="WhatsApp Support" color="text-purple-400" />
                  </ul>
                </div>
              </div>

            </Reveal>
          )}

          {/* 🔥 PAY PER SONG (SINGLE RELEASE) */}
          {activeTab === 'pay-per-release' && (
            <Reveal className="max-w-lg mx-auto">
              <div className="bg-[#141005] rounded-[2.5rem] border-2 border-yellow-500/50 hover:border-yellow-400 transition-all duration-300 shadow-[0_0_40px_rgba(234,179,8,0.15)] overflow-hidden flex flex-col">
                <div className="p-10 border-b border-yellow-500/20 bg-yellow-900/10 text-center">
                   <h3 className="text-3xl font-black uppercase tracking-widest text-white mb-2">Single Release</h3>
                   <p className="text-yellow-500/80 text-xs font-bold uppercase tracking-widest mb-6">Pay Once, Keep Forever</p>
                   <div className="flex justify-center items-end gap-1 mb-8">
                     <span className="text-6xl font-black text-white tracking-tighter">₹405</span>
                     <span className="text-yellow-500/70 font-bold text-[10px] uppercase mb-2">/ ONE TIME</span>
                   </div>
                   <a href={`${DASHBOARD_URL}/signup`} className="w-full block py-4 rounded-xl bg-yellow-400 text-black font-black text-sm uppercase tracking-widest hover:bg-yellow-300 transition-all shadow-[0_0_20px_rgba(250,204,21,0.3)]">Distribute Now</a>
                </div>
                <div className="p-10">
                  <ul className="space-y-2">
                    <FeatureItem text="Keep 100% Royalty" color="text-yellow-400"/>
                    <FeatureItem text="Fast Release (24-48 hrs)" color="text-yellow-400"/>
                    <FeatureItem text="YouTube Content Id" color="text-yellow-400"/>
                    <FeatureItem text="Free ISRC & UPC Code" color="text-yellow-400"/>
                    <FeatureItem text="Lyrics & Credit Distributions" color="text-yellow-400"/>
                    <FeatureItem text="Email Support" color="text-yellow-400"/>
                  </ul>
                </div>
              </div>
            </Reveal>
          )}

          {/* 🔥 LABEL PLANS */}
          {activeTab === 'labels' && (
            <Reveal className="max-w-lg mx-auto">
              {/* LABEL PLAN */}
              <div className="bg-[#030914] rounded-[2.5rem] border-2 border-cyan-500/50 hover:border-cyan-400 transition-all duration-300 shadow-[0_0_40px_rgba(6,182,212,0.15)] overflow-hidden flex flex-col">
                <div className="p-10 border-b border-cyan-500/20 bg-cyan-900/10 text-center">
                   <h3 className="text-3xl font-black uppercase tracking-widest text-white mb-2">Maeve Label</h3>
                   <p className="text-cyan-400/80 text-xs font-bold uppercase tracking-widest mb-6">Perfect for Independent Labels</p>
                   <div className="flex justify-center items-end gap-1 mb-8">
                     <span className="text-6xl font-black text-white tracking-tighter">₹583</span>
                     <span className="text-cyan-400/70 font-bold text-[10px] uppercase mb-2">/ MONTH</span>
                   </div>
                   <a href={`${DASHBOARD_URL}/signup`} className="w-full block py-4 rounded-xl bg-cyan-400 text-black font-black text-sm uppercase tracking-widest hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]">Start Label</a>
                </div>
                <div className="p-10">
                  <ul className="space-y-2">
                    <FeatureItem text="Unlimited Artist for your Roaster" color="text-cyan-400"/>
                    <FeatureItem text="Keep 95% of all Royalties" color="text-cyan-400"/>
                    <FeatureItem text="Sub Label Management" color="text-cyan-400"/>
                    <FeatureItem text="Single user access" color="text-cyan-400"/>
                    <FeatureItem text="Email Support" color="text-cyan-400"/>
                    <FeatureItem text="Catalog Migration" color="text-cyan-400"/>
                    <FeatureItem text="YouTube Official Artist" color="text-cyan-400"/>
                    <FeatureItem text="Dolby Atmos Distribution" color="text-cyan-400"/>
                    <FeatureItem text="Sync Licensing & Ad Support" color="text-cyan-400"/>
                  </ul>
                </div>
              </div>
            </Reveal>
          )}

        </div>
      </section>

      {/* ================= DETAILED COMPARISON TABLE ================= */}
      <section className="py-24 px-6 max-w-[1200px] mx-auto border-t border-white/5 relative z-10">
        <Reveal>
          <div className="mb-16 text-center md:text-left">
            <p className="text-[12px] font-bold uppercase tracking-widest text-cyan-500 mb-2">Feature Breakdown</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">Compare Plans</h2>
          </div>
          
          <div className="overflow-x-auto bg-[#05050A] border border-white/10 rounded-[2rem] p-6 shadow-2xl">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                {activeTab === 'pay-per-release' ? (
                  <tr className="border-b border-white/10">
                    <th className="p-6 text-sm font-bold uppercase tracking-widest text-slate-500 w-1/2 bg-transparent">Feature</th>
                    <th className="p-6 text-sm font-bold uppercase tracking-widest text-yellow-400 text-center">SINGLE (₹405)</th>
                  </tr>
                ) : activeTab === 'artists' ? (
                  <tr className="border-b border-white/10">
                    <th className="p-6 text-[11px] font-bold uppercase tracking-widest text-slate-500 w-1/4 bg-transparent">Feature</th>
                    <th className="p-6 text-[11px] font-bold uppercase tracking-widest text-slate-400 text-center">FREE</th>
                    <th className="p-6 text-[11px] font-bold uppercase tracking-widest text-cyan-400 text-center">RISE (₹94)</th>
                    <th className="p-6 text-[11px] font-bold uppercase tracking-widest text-purple-400 text-center">STAR (₹299)</th>
                  </tr>
                ) : (
                  <tr className="border-b border-white/10">
                    <th className="p-6 text-sm font-bold uppercase tracking-widest text-slate-500 w-1/2 bg-transparent">Feature</th>
                    <th className="p-6 text-sm font-bold uppercase tracking-widest text-cyan-400 text-center">LABEL (₹583)</th>
                  </tr>
                )}
              </thead>
              <tbody className="divide-y divide-white/5 text-sm font-medium text-slate-300">
                
                {/* PAY PER SONG DATA */}
                {activeTab === 'pay-per-release' && (
                  <>
                    <ComparisonRow title="Royalty Share" col1="100%" color="text-yellow-400" />
                    <ComparisonRow title="Billing Model" col1="One-Time Payment" color="text-yellow-400" />
                    <ComparisonRow title="Processing Time" col1="Fast Release (24-48 hrs)" color="text-yellow-400" />
                    <ComparisonRow title="Free ISRC & UPC Codes" col1={true} color="text-yellow-400" />
                    <ComparisonRow title="YouTube Content ID" col1={true} color="text-yellow-400" />
                    <ComparisonRow title="Lyrics & Credit Distributions" col1={true} color="text-yellow-400" />
                    <ComparisonRow title="Support" col1="Email Support" color="text-yellow-400" />
                  </>
                )}

                {/* ARTIST DATA */}
                {activeTab === 'artists' && (
                  <>
                    <ComparisonRow3 title="Royalty Share" col1="80%" col2="90%" col3="95%" color2="text-cyan-400" color3="text-purple-400"/>
                    <ComparisonRow3 title="Processing Time" col1="Standard" col2="Within 7 Days" col3="Fast (24-48 hrs)" color2="text-cyan-400" color3="text-purple-400"/>
                    <ComparisonRow3 title="Unlimited Releases" col1={false} col2={true} col3={true} color2="text-cyan-400" color3="text-purple-400"/>
                    <ComparisonRow3 title="Free ISRC & UPC Codes" col1={true} col2={true} col3={true} color2="text-cyan-400" color3="text-purple-400"/>
                    <ComparisonRow3 title="YouTube Content ID" col1={false} col2={true} col3={true} color2="text-cyan-400" color3="text-purple-400"/>
                    <ComparisonRow3 title="Monetize UGC (Meta, TikTok)" col1={false} col2={true} col3={true} color2="text-cyan-400" color3="text-purple-400"/>
                    <ComparisonRow3 title="Royalty Splits" col1={false} col2={true} col3={true} color2="text-cyan-400" color3="text-purple-400"/>
                    <ComparisonRow3 title="Dolby Atmos Distribution" col1={false} col2={false} col3={true} color2="text-cyan-400" color3="text-purple-400"/>
                    <ComparisonRow3 title="Vevo Channel Creation" col1={false} col2={false} col3={true} color2="text-cyan-400" color3="text-purple-400"/>
                    <ComparisonRow3 title="Sync Licensing" col1={false} col2={false} col3={true} color2="text-cyan-400" color3="text-purple-400"/>
                    <ComparisonRow3 title="Support" col1="Standard" col2="4-Days Priority" col3="WhatsApp Support" color2="text-cyan-400" color3="text-purple-400"/>
                  </>
                )}

                {/* LABEL DATA */}
                {activeTab === 'labels' && (
                  <>
                    <ComparisonRow title="No. of Artists" col1="Unlimited" color="text-cyan-400" />
                    <ComparisonRow title="Royalty Share" col1="95%" color="text-cyan-400" />
                    <ComparisonRow title="User Access" col1="Single-user" color="text-cyan-400" />
                    <ComparisonRow title="Sub-Label Management" col1={true} color="text-cyan-400" />
                    <ComparisonRow title="Catalog Migration" col1={true} color="text-cyan-400" />
                    <ComparisonRow title="Dolby Atmos Distribution" col1={true} color="text-cyan-400" />
                    <ComparisonRow title="Sync Licensing & Ads" col1={true} color="text-cyan-400" />
                    <ComparisonRow title="YouTube Official Artist" col1={true} color="text-cyan-400" />
                    <ComparisonRow title="Support" col1="Email Support" color="text-cyan-400" />
                  </>
                )}

              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section id="faq" className="py-24 px-6 max-w-[900px] mx-auto z-10 relative border-t border-white/5">
        <Reveal>
          <div className="mb-16 text-center md:text-left">
            <p className="text-[12px] font-bold uppercase tracking-widest text-cyan-500 mb-2">FAQS</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">
              Frequently Asked <br/>Questions
            </h2>
            <p className="text-slate-400 font-medium text-base">Explore common questions about Maeve Music plans.</p>
          </div>

          <div className="flex flex-col border-t border-white/10 bg-[#05050A] rounded-[2rem] p-8 shadow-xl border border-white/5">
            <FAQItem 
              question="What's the difference between Free and Rise plan?" 
              answer="With the Free plan, you keep 80% royalties and get standard processing. The Rise plan (₹94/mo) gives you 90% royalties, 7-day releases, YouTube Content ID, Royalty Splits, and UGC monetization."
            />
            <FAQItem 
              question="Why should I choose Pay-Per-Song (Single)?" 
              answer="Pay-Per-Song (₹405) is perfect if you want to pay just once and keep 100% of your royalties forever without any recurring monthly fees. It includes fast 24-48 hour releases and Content ID."
            />
            <FAQItem 
              question="Are ISRC and UPC codes really free?" 
              answer="Yes! We automatically generate and assign free industry-standard ISRC and UPC codes for all your releases across all our plans."
            />
            <FAQItem 
              question="Do I keep 100% ownership of my music?" 
              answer="Absolutely. You retain 100% ownership of your masters and copyrights. We only distribute your music and collect royalties on your behalf."
            />
            <FAQItem 
              question="Can I upgrade my plan later?" 
              answer="Yes! You can easily upgrade from Free to Rise, or Rise to Star anytime directly from your dashboard to unlock more premium tools."
            />
          </div>
        </Reveal>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#010103] pt-20 pb-10 border-t border-white/5 relative z-20">
        <div className="max-w-[1300px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="lg:col-span-1">
            <div className="relative w-50 h-40 mb-4">
              <Image src="/logos/maevemusic.png" alt="maevemusic.png" fill className="object-contain rounded-lg" />
            </div>
            <h3 className="text-xl font-black text-white mb-4 uppercase">MaeveMusic</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
              YOUR MUSIC EVERYWHERE, WE DELIVER GLOBALLY. Fast Approved, Fast Earning.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Platform</h4>
            <ul className="space-y-3 text-slate-400 text-sm font-medium">
              <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><span className="text-cyan-400 transition-colors">Pricing</span></li>
              <li><Link href={`${DASHBOARD_URL}/signup`} className="hover:text-cyan-400 transition-colors">Sign Up</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Support</h4>
            <ul className="space-y-3 text-slate-400 text-sm font-medium">
              <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Help Center / FAQ</Link></li>
              
              <li><Link href="/terms-and-conditions" className="hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Join Us</h4>
            <div className="flex flex-col gap-4">
              <a href={`${DASHBOARD_URL}/signup`} className="w-full text-center bg-cyan-400 text-black font-bold px-4 py-3 rounded-xl text-sm transition-transform hover:scale-[1.02] uppercase tracking-wider">
                Create Account
              </a>
              <a href={`${DASHBOARD_URL}/login`} className="w-full text-center border border-white/20 text-white font-bold px-4 py-3 rounded-xl text-sm transition-transform hover:bg-white/5 uppercase tracking-wider">
                Login
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-[1300px] mx-auto px-6 pt-8 border-t border-white/5 text-slate-500 text-xs font-bold uppercase tracking-widest flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} MaeveMusic. All rights reserved.</p>
          <p>Made for Independent Artists</p>
        </div>
      </footer>

    </div>
  );
}

// ================= HELPER COMPONENTS =================

// NEW Feature Item (No truncation, multiline friendly)
function FeatureItem({ text, color = "text-slate-300" }: { text: string, color?: string }) {
  return (
    <li className="flex items-start gap-4 py-3 border-b border-white/5 last:border-0">
      <Check className={`${color} shrink-0 mt-0.5`} size={18}/> 
      <span className="text-[13px] font-bold leading-relaxed tracking-wide text-slate-300">{text}</span>
    </li>
  );
}

// 2 Columns (Single / Label)
function ComparisonRow({ title, col1, color }: { title: string, col1: any, color: string }) {
  const renderValue = (val: any, activeColor: string) => {
    if (typeof val === 'boolean') return val ? <Check className={`mx-auto ${activeColor}`} size={20}/> : <X className="mx-auto text-slate-600" size={20}/>;
    return <span className={`font-bold ${activeColor}`}>{val}</span>;
  };
  return (
    <tr className="hover:bg-white/[0.02] transition-colors border-b border-white/5">
      <td className="p-6 font-bold text-[12px] uppercase tracking-widest text-slate-400">{title}</td>
      <td className="p-6 text-center">{renderValue(col1, color)}</td>
    </tr>
  );
}

// 4 Columns (Artists)
function ComparisonRow3({ title, col1, col2, col3, color2, color3 }: { title: string, col1: any, col2: any, col3: any, color2: string, color3: string }) {
  const renderValue = (val: any, activeColor: string) => {
    if (typeof val === 'boolean') return val ? <Check className={`mx-auto ${activeColor}`} size={20}/> : <X className="mx-auto text-slate-600" size={20}/>;
    return <span className={`font-bold ${activeColor}`}>{val}</span>;
  };
  return (
    <tr className="hover:bg-white/[0.02] transition-colors border-b border-white/5">
      <td className="p-6 font-bold text-[11px] uppercase tracking-widest text-slate-400">{title}</td>
      <td className="p-6 text-center">{renderValue(col1, 'text-slate-400')}</td>
      <td className="p-6 text-center">{renderValue(col2, color2)}</td>
      <td className="p-6 text-center">{renderValue(col3, color3)}</td>
    </tr>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.08] py-6 cursor-pointer group last:border-0" onClick={() => setIsOpen(!isOpen)}>
      <div className="flex justify-between items-center gap-6">
        <h4 className="text-[15px] font-bold text-slate-200 group-hover:text-cyan-400 transition-colors duration-300 uppercase tracking-wide">{question}</h4>
        <div className="shrink-0 text-slate-500 transition-transform duration-300">
          {isOpen ? <Minus size={20} className="text-cyan-500" /> : <Plus size={20} className="group-hover:text-cyan-400" />}
        </div>
      </div>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
        <p className="text-slate-400 font-medium leading-relaxed text-sm border-l-2 border-cyan-500/50 pl-4">
          {answer}
        </p>
      </div>
    </div>
  );
}