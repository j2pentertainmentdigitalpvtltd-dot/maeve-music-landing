'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Rocket, ShieldCheck, Globe, Users, Clock, Banknote, ArrowRight, Zap } from 'lucide-react';

// ================= PREMIUM MAEVE NETWORK FIBER BACKGROUND =================
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
    const numberOfParticles = 120; // Thoda optimize kiya hai smooth chalne ke liye
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
        ctx!.fillStyle = 'rgba(139, 92, 246, 0.4)'; // Purple glow for Maeve
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
            // Cyan to Purple blend lines
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
          // Vibrant purple near mouse
          ctx!.strokeStyle = `rgba(168, 85, 247, ${0.4 - distanceMouse/500})`; 
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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-60" />;
};

export default function AboutPage() {
  const DASHBOARD_URL = 'https://app.maevemusic.in'; 
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#030108] font-sans text-slate-300 selection:bg-purple-500/30 overflow-x-hidden relative">
      
      <style dangerouslySetInnerHTML={{ __html: `
        .text-gradient { background: linear-gradient(135deg, #a78bfa 0%, #2dd4bf 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .btn-gradient { background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%); }
        .btn-gradient:hover { background: linear-gradient(135deg, #7c3aed 0%, #0891b2 100%); }
        .card-glass { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.05); }
      `}} />

      <FiberNetwork />
      
      {/* Ambient Glows for Maeve Music Theme */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-[10%] right-1/4 w-[600px] h-[500px] bg-purple-600/10 blur-[150px] rounded-[100%] mix-blend-screen pointer-events-none"></div>
         <div className="absolute bottom-[10%] left-1/4 w-[500px] h-[400px] bg-cyan-600/10 blur-[150px] rounded-[100%] mix-blend-screen pointer-events-none"></div>
      </div>

      {/* ================= PREMIUM NAVBAR ================= */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#030108]/90 backdrop-blur-xl border-b border-white/[0.05] py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between relative z-10">
          <Link href="/" className="flex items-center gap-3 group h-12">
             <div className="relative w-50 h-40 group-hover:scale-105 transition-transform">
                <Image src="/logos/maevemusic.png" alt="Maeve Music Logo" fill className="object-contain object-left drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]" priority/>
             </div>
          </Link>
          
          <div className="hidden xl:flex items-center gap-8 font-bold text-[11px] uppercase tracking-widest text-slate-400">
            
            
            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <Link href="/pricing" className="hover:text-cyan-400 transition-colors">Pricing</Link>
            <Link href="/about" className="hover:text-cyan-400 transition-colors">About</Link>
            <Link href="/stores" className="hover:text-cyan-400 transition-colors">Stores</Link>
          </div>

          <div className="flex items-center gap-6">
            <a href={`${DASHBOARD_URL}/login`} className="hidden md:block font-bold text-[12px] uppercase tracking-widest text-slate-500 hover:text-purple-400 transition-colors">Login</a>
            <a href={`${DASHBOARD_URL}/signup`} className="group relative overflow-hidden inline-flex btn-gradient text-white px-8 py-3.5 rounded-full font-bold text-[12px] uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-105">
              <span className="relative z-10 transition-colors group-hover:text-white">Sign Up Free</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ================= HEADER SECTION ================= */}
      <section className="relative pt-48 pb-20 px-6 text-center z-10 border-b border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-purple-500/30 text-purple-400 font-bold text-[10px] uppercase tracking-widest mb-8 bg-purple-950/20 shadow-[0_0_20px_rgba(139,92,246,0.15)] backdrop-blur-md">
            <Zap size={14} className="text-cyan-400"/> The Future of Distribution
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight uppercase text-white mb-8 leading-[0.9]">
            Born From Passion.<br/>
            <span className="text-gradient">Built For Independence.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto">
            We saw independent artists struggling to get their music heard without selling their souls to record labels. So, we built Maeve Music. A platform that gives the power, the revenue, and the control back to the creator.
          </p>
        </div>
      </section>

      {/* ================= ABOUT MAEVE MUSIC ================= */}
      <section className="py-32 px-6 max-w-[1200px] mx-auto z-10 relative">
        <div className="card-glass p-10 md:p-16 rounded-[2.5rem] shadow-[0_0_60px_rgba(139,92,246,0.05)] relative overflow-hidden group hover:border-purple-500/30 transition-all duration-700">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-cyan-600/10 transition-colors duration-700"></div>
           
           <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-12 border-b border-white/5 pb-8 relative z-10">
              About <span className="text-cyan-400">Maeve Music</span>
           </h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-400 font-medium leading-relaxed text-base relative z-10">
              <div>
                 <p className="mb-6">
                   <strong className="text-purple-400 font-bold text-lg block mb-2">Our Origin</strong>
                   Maeve Music was born from a simple belief: every artist deserves a chance to be heard by the world.
                 </p>
                 <p className="mb-6">
                   In an industry where independent musicians often face challenges in distribution, copyright protection, and audience growth, Maeve Music was created to bridge the gap between talent and opportunity. Our mission is to empower artists by providing reliable music distribution, YouTube Content ID protection, and artist-focused support that helps music reach listeners across the globe.
                 </p>
              </div>
              <div className="md:border-l md:border-white/5 md:pl-12">
                 <p className="mb-6">
                   <strong className="text-cyan-400 font-bold text-lg block mb-2">Our Vision</strong>
                   The name Maeve Music represents creativity, passion, and the courage to share unique stories through sound. We believe that music has the power to connect people, preserve culture, and inspire generations.
                 </p>
                 <p>
                   From emerging independent artists to established creators, Maeve Music is committed to offering transparent services, fast distribution, and dedicated support. We work to ensure that every song receives the professional platform it deserves while helping artists maintain control of their creative journey.
                 </p>
              </div>
           </div>

           {/* MOTTO HIGHLIGHT */}
           <div className="mt-16 text-center border-t border-white/5 pt-12 relative z-10">
              <h4 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-6 drop-shadow-md">
                 “Your Music. Your Voice. Your World.”
              </h4>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                 At Maeve Music, we don’t just distribute music—we help artists turn their dreams into reality and bring their sound to listeners everywhere. 🎵✨
              </p>
           </div>
        </div>
      </section>

      {/* ================= LEADERSHIP TEAM ================= */}
      <section className="py-24 px-6 max-w-[1200px] mx-auto z-10 relative border-t border-white/5">
        <div className="text-center mb-16">
          <p className="text-[12px] font-bold uppercase tracking-widest text-cyan-400 mb-2">The Visionaries</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">Leadership <span className="text-gradient">Team</span></h2>
          <p className="text-slate-400 font-medium text-lg">The minds driving the future of independent music distribution.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Manab Mili - Founder & CEO */}
          <div className="card-glass p-10 rounded-3xl text-center hover:bg-[#060410] hover:border-purple-500/40 transition-all duration-500 shadow-lg group relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             
             <div className="w-24 h-24 bg-[#030108] border border-white/10 rounded-full flex items-center justify-center text-purple-400 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(139,92,246,0.3)] relative z-10">
                <span className="text-3xl font-black uppercase tracking-widest">MM</span>
             </div>
             
             <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-2 relative z-10">Manab Mili</h3>
             <p className="text-cyan-400 font-bold uppercase tracking-widest text-[11px] mb-4 relative z-10">Founder & CEO</p>
             <p className="text-slate-400 font-medium leading-relaxed text-sm relative z-10">
               Driving the core vision of Maeve Music, ensuring independent artists get the technology, reach, and transparent royalties they deserve globally.
             </p>
          </div>

          {/* Mriganko - Managing Director */}
          <div className="card-glass p-10 rounded-3xl text-center hover:bg-[#060410] hover:border-cyan-500/40 transition-all duration-500 shadow-lg group relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             
             <div className="w-24 h-24 bg-[#030108] border border-white/10 rounded-full flex items-center justify-center text-cyan-400 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(6,182,212,0.3)] relative z-10">
                <span className="text-3xl font-black uppercase tracking-widest">M</span>
             </div>
             
             <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-2 relative z-10">Mriganko</h3>
             <p className="text-purple-400 font-bold uppercase tracking-widest text-[11px] mb-4 relative z-10">Managing Director</p>
             <p className="text-slate-400 font-medium leading-relaxed text-sm relative z-10">
               Spearheading global operations and strategic partnerships to constantly expand the Maeve Music network and optimize the artist experience.
             </p>
          </div>
        </div>
      </section>

      {/* ================= THE MAEVE GUARANTEE (Hooks) ================= */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto z-10 relative border-t border-white/5">
        <div className="text-center mb-20">
          <p className="text-[12px] font-bold uppercase tracking-widest text-purple-400 mb-2">Our Promise</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">The Maeve Music <span className="text-gradient">Guarantee</span></h2>
          <p className="text-slate-400 font-medium text-lg">Why independent artists trust us with their life's work.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           
           {/* Hook 1: Anti-Takedown */}
           <div className="card-glass p-10 rounded-3xl hover:bg-[#060410] hover:border-purple-500/40 transition-all duration-500 shadow-lg group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-[#030108] border border-white/10 rounded-2xl flex items-center justify-center text-purple-400 mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(139,92,246,0.2)] relative z-10">
                 <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-4 relative z-10">No Hostage Takedowns</h3>
              <p className="text-slate-400 font-medium leading-relaxed text-sm relative z-10">
                Other distributors delete your music the second your subscription expires. <strong className="text-purple-300">Not us.</strong> Even if your plan lapses, your music stays live and continues to generate lifetime revenue until you explicitly confirm a takedown.
              </p>
           </div>

           {/* Hook 2: Speed */}
           <div className="card-glass p-10 rounded-3xl hover:bg-[#060410] hover:border-cyan-500/40 transition-all duration-500 shadow-lg group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-[#030108] border border-white/10 rounded-2xl flex items-center justify-center text-cyan-400 mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(6,182,212,0.2)] relative z-10">
                 <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-4 relative z-10">Instant Self-Serve Rights</h3>
              <p className="text-slate-400 font-medium leading-relaxed text-sm relative z-10">
                Tired of waiting days for support teams to fix your song's name? Our Self-Serve Commander lets you edit metadata, lyrics, and profiles instantly from your dashboard.
              </p>
           </div>

           {/* Hook 3: Transparency */}
           <div className="card-glass p-10 rounded-3xl hover:bg-[#060410] hover:border-blue-500/40 transition-all duration-500 shadow-lg group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-[#030108] border border-white/10 rounded-2xl flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(59,130,246,0.2)] relative z-10">
                 <Banknote size={28} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-4 relative z-10">100% Transparent Royalties</h3>
              <p className="text-slate-400 font-medium leading-relaxed text-sm relative z-10">
                We believe what you earn is yours. Access crystal-clear, daily streaming analytics and automated monthly payout ledgers. No hidden accounting tricks, just your money.
              </p>
           </div>

        </div>

        <div className="text-center mt-24">
          <a href={`${DASHBOARD_URL}/signup`} className="group relative overflow-hidden inline-flex btn-gradient text-white px-12 py-5 rounded-full font-bold text-xs uppercase tracking-widest shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:scale-105 transition-transform">
            <span className="relative z-10 flex items-center gap-2">Take Control Of Your Music <ArrowRight size={16}/></span>
          </a>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#020105] pt-20 pb-10 border-t border-white/5 text-center md:text-left relative z-20">
         <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          <div className="col-span-1 lg:col-span-1">
             <div className="flex items-center justify-center md:justify-start gap-2 mb-6 h-12">
               <div className="relative w-48 h-40">
                  <Image src="/logos/maevemusic.png" alt="Maeve Music Logo" fill className="object-contain object-left md:object-left" />
               </div>
             </div>
             <p className="text-slate-500 font-medium text-sm pr-4">Empowering independent artists globally with premium distribution and uncompromised royalty collection.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 text-slate-600">Learn About Us</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><span className="text-purple-400 transition-colors drop-shadow-[0_0_5px_rgba(139,92,246,0.5)]">About Maeve Music</span></li>
              <li><Link href="/terms-and-conditions" className="hover:text-purple-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 text-slate-600">Distribute</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><a href={`${DASHBOARD_URL}/signup`} className="hover:text-purple-400 transition-colors">Join Maeve Music</a></li>
              
              <li><Link href="/pricing" className="hover:text-purple-400 transition-colors">Pricing & Plans</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 text-slate-600">Account Services</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><a href={`${DASHBOARD_URL}/login`} className="hover:text-purple-400 transition-colors">Login</a></li>
              <li><Link href="/contact" className="hover:text-purple-400 transition-colors">Contact Support</Link></li>
              
            </ul>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
             © {new Date().getFullYear()} Maeve Music. All rights reserved.
           </div>
           
           {/* Tumhare original social links yahan intact hain */}
           <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              <a href="https://www.facebook.com/share/18qLo6Yx6D/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
              <a href="https://x.com/Maevemusic9" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X (Twitter)</a>
              <a href="https://www.instagram.com/maeve.musicgroup?igsh=ZG1lM3VmcGF4d21q&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
           </div>
        </div>
      </footer>

    </div>
  );
}