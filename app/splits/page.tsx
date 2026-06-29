'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  PieChart, ArrowRight, ShieldCheck, 
  DollarSign, Mail, FileSpreadsheet, CheckCircle2,
  Calculator, Activity, Download, Send
} from 'lucide-react';

// ================= 1. NETWORK FIBER BACKGROUND =================
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

// ================= MAIN PAGE COMPONENT =================
export default function SplitsPage() {
  const DASHBOARD_URL = 'https://app.tuneplusmusic.com'; 
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Interactive Calculator State
  const [revenue, setRevenue] = useState<number>(5000);
  const [splits, setSplits] = useState([
    { id: 1, role: 'Lead Artist (You)', percentage: 60, color: 'bg-blue-500', hex: '#3b82f6' },
    { id: 2, role: 'Producer', percentage: 25, color: 'bg-cyan-400', hex: '#22d3ee' },
    { id: 3, role: 'Featured Artist', percentage: 15, color: 'bg-indigo-400', hex: '#818cf8' },
  ]);

  const handleSplitChange = (id: number, newVal: number) => {
    const updated = splits.map(s => s.id === id ? { ...s, percentage: Number(newVal) } : s);
    setSplits(updated);
  };

  const totalPercentage = splits.reduce((acc, curr) => acc + curr.percentage, 0);
  const isValid = totalPercentage === 100;

  return (
    <div className="min-h-screen bg-[#02040a] font-sans text-slate-200 selection:bg-blue-500/30 overflow-x-hidden relative">
      <FiberNetwork />

      {/* Ambient Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[10%] left-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] rounded-full mix-blend-screen"></div>
      </div>

      {/* ================= NAVBAR ================= */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#02040a]/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between relative z-10">
          <Link href="/" className="flex items-center gap-3 group h-12">
             <div className="relative w-48 h-full group-hover:scale-105 transition-transform">
                <Image src="/logos/tuneplus-logo.png" alt="TunePlus Logo" fill className="object-contain object-left drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]" priority/>
             </div>
          </Link>
          
          <div className="hidden xl:flex items-center gap-6 font-bold text-[11px] uppercase tracking-widest text-slate-400">
            <Link href="/features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span className="text-white border-b-2 border-cyan-500 pb-1">Splits</span>
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

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-48 pb-20 px-6 text-center z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold text-[11px] uppercase tracking-widest mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <PieChart size={14} /> Frictionless Revenue Sharing
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-black tracking-tight uppercase leading-[0.95] mb-8 text-white">
            Automated <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Royalty Splits.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            Never argue over money again. Automatically divide streaming revenue with your producers, featured artists, and label partners. They get a detailed monthly report directly in their inbox—no accounts needed.
          </p>
          
          <a href={`${DASHBOARD_URL}/signup`} className="group relative overflow-hidden inline-flex bg-white text-black px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] items-center gap-3">
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">Start Splitting Now <ArrowRight size={18}/></span>
            <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
          </a>
        </div>
      </section>

      {/* ================= INTERACTIVE VISUALIZER ================= */}
      <section className="py-20 px-6 relative z-20">
        <div className="max-w-[1200px] mx-auto bg-[#050b14]/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
          
          <div className="text-center mb-12 border-b border-white/5 pb-10">
            <h2 className="text-3xl font-black uppercase text-white tracking-tight mb-4 flex items-center justify-center gap-3">
               <Calculator className="text-cyan-400" /> Interactive Split Simulator
            </h2>
            <p className="text-slate-400 font-medium">Test how easy it is to route earnings. Your partners simply receive an email statement.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Inputs */}
            <div className="space-y-8">
              <div className="bg-[#02040a] border border-white/10 p-6 rounded-2xl shadow-inner">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 block">Simulate Total Track Revenue ($)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <DollarSign className="text-cyan-500 h-5 w-5" />
                  </div>
                  <input 
                    type="number" 
                    value={revenue}
                    onChange={(e) => setRevenue(Number(e.target.value))}
                    className="w-full bg-[#050b14] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white font-bold text-xl focus:border-cyan-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                   <h3 className="text-sm font-bold uppercase tracking-widest text-slate-300">Collaborators & Shares</h3>
                   <span className={`text-xs font-bold px-3 py-1 rounded-md ${isValid ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                      Total: {totalPercentage}%
                   </span>
                </div>
                
                {splits.map((split) => (
                  <div key={split.id} className="bg-[#02040a] border border-white/5 p-5 rounded-2xl flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_${split.hex}]`} style={{ backgroundColor: split.hex }}></div>
                        <span className="font-bold text-white text-sm">{split.role}</span>
                      </div>
                      <span className="font-black text-cyan-400">${((revenue * split.percentage) / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <input 
                        type="range" 
                        min="0" max="100" 
                        value={split.percentage}
                        onChange={(e) => handleSplitChange(split.id, Number(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                      />
                      <span className="text-sm font-bold text-slate-400 w-12 text-right">{split.percentage}%</span>
                    </div>
                  </div>
                ))}
                
                {!isValid && (
                  <p className="text-red-400 text-xs font-bold text-center mt-4 animate-pulse">
                    Warning: Percentages must equal exactly 100% to save a split.
                  </p>
                )}
              </div>
            </div>

            {/* Right: Visual Output & Export */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center mb-10">
                 {/* CSS Based Multi-segment Progress Circle / Donut */}
                 <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                    {(() => {
                      let currentOffset = 0;
                      return splits.map((split, i) => {
                        const dashArray = `${split.percentage} 100`;
                        const dashOffset = -currentOffset;
                        currentOffset += split.percentage;
                        return (
                          <circle
                            key={i}
                            cx="50" cy="50" r="40"
                            fill="transparent"
                            stroke={split.hex}
                            strokeWidth="16"
                            strokeDasharray={dashArray}
                            strokeDashoffset={dashOffset}
                            className="transition-all duration-500 ease-out"
                          />
                        );
                      });
                    })()}
                 </svg>
                 
                 {/* Center Text */}
                 <div className="absolute flex flex-col items-center justify-center bg-[#050b14] w-48 h-48 rounded-full border border-white/5 shadow-inner">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Payout</span>
                    <span className="text-3xl font-black text-white">${revenue.toLocaleString()}</span>
                 </div>
              </div>

              {/* Mock Download Button */}
              <button className="flex items-center gap-3 bg-[#02040a] hover:bg-white/5 border border-white/10 text-slate-300 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg">
                 <FileSpreadsheet size={16} className="text-emerald-500"/>
                 Download Split Report (.XLSX)
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ================= BENEFITS GRID (ENTERPRISE LOGIC) ================= */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto relative z-10 border-t border-white/5 mt-10">
        <div className="text-center mb-20">
          <p className="text-[12px] font-bold uppercase tracking-widest text-cyan-500 mb-2">Why Use TunePlus Splits</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            Professional Accounting. <br/><span className="text-slate-500">Zero Friction.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <BenefitCard 
            icon={Mail} 
            title="No Accounts Needed" 
            desc="Collaborators don't need to sign up for TunePlus. They automatically receive a detailed monthly earnings report directly to their email."
          />
          <BenefitCard 
            icon={FileSpreadsheet} 
            title="Excel Export" 
            desc="Generate and download full, granular .xlsx or .csv split reports for your own tax filing, label accounting, and transparency."
          />
          <BenefitCard 
            icon={Send} 
            title="Automated Routing" 
            desc="Once streaming stores report their numbers, funds are calculated and logged instantly. Say goodbye to manual math errors."
          />
          <BenefitCard 
            icon={ShieldCheck} 
            title="Contractual Trust" 
            desc="Maintain complete trust with your producers and featured artists. Our automated system acts as an unbiased third-party accountant."
          />
        </div>
      </section>

      {/* ================= BOTTOM CTA ================= */}
      <section className="py-32 px-6 border-t border-white/5 bg-[#030814]/50 relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase text-white mb-8 leading-tight">
            Stop Chasing Payments.<br/><span className="text-blue-500">Start Collaborating.</span>
          </h2>
          <p className="text-slate-400 text-lg font-medium mb-12">
            Set up your first automated royalty split in seconds.
          </p>
          <a href={`${DASHBOARD_URL}/signup`} className="group relative overflow-hidden inline-flex bg-cyan-600 text-white px-12 py-5 rounded-full font-bold text-sm uppercase tracking-widest shadow-[0_0_40px_rgba(6,182,212,0.4)] items-center gap-3">
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">Create Free Account <ArrowRight size={18}/></span>
            <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
          </a>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black pt-24 pb-12 border-t border-white/5 text-center md:text-left relative z-20">
         <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 lg:col-span-1">
             <div className="flex items-center justify-center md:justify-start h-16 mb-6">
                <div className="relative w-40 h-full">
                  <Image src="/logos/tuneplus-logo.png" alt="TunePlus Logo" fill className="object-contain object-left md:object-left" />
                </div>
             </div>
             <p className="text-slate-500 font-medium text-sm pr-4">Empowering independent artists globally with premium distribution and uncompromised royalty collection.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 text-slate-600">Learn About TunePlus</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/leadership" className="hover:text-blue-400 transition-colors">Leadership</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-blue-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 text-slate-600">Distribute</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><a href={`${DASHBOARD_URL}/signup`} className="hover:text-cyan-400 transition-colors">Join TunePlus</a></li>
              <li><Link href="/features" className="hover:text-cyan-400 transition-colors">Features</Link></li>
              <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Services</Link></li>
              <li><span className="text-cyan-500 transition-colors">Splits</span></li>
              <li><Link href="/accelerator" className="hover:text-cyan-400 transition-colors">Accelerator</Link></li>
              <li><Link href="/pricing" className="hover:text-cyan-400 transition-colors">Pricing & Plans</Link></li>
              <li><Link href="/white-label" className="hover:text-cyan-400 transition-colors text-cyan-500">White Label SaaS</Link></li>
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
             © {new Date().getFullYear()} MaeveMusic. All rights reserved.
           </div>
           <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              <a href="https://www.facebook.com/profile.php?id=61557369243454" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
              <a href="https://x.com/TuneplusMusic" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X (Twitter)</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
           </div>
        </div>
      </footer>

    </div>
  );
}

// ================= HELPER COMPONENTS =================

function BenefitCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="bg-[#050b14]/50 border border-white/5 p-8 rounded-3xl hover:bg-white/[0.02] hover:border-cyan-500/30 transition-all duration-300 group">
      <div className="w-14 h-14 bg-[#02040a] rounded-2xl flex items-center justify-center mb-6 text-cyan-500 group-hover:scale-110 transition-transform shadow-inner border border-white/5">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-bold text-white mb-3 tracking-tight uppercase">{title}</h3>
      <p className="text-slate-400 text-sm font-medium leading-relaxed">{desc}</p>
    </div>
  );
}