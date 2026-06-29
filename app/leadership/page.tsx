'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Rocket, Award, ShieldCheck, ArrowRight, Zap, Target, Heart, Menu, X } from 'lucide-react';


export default function LeadershipPage() {
  const DASHBOARD_URL = 'https://app.tuneplusmusic.com'; 
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-[#010205] font-sans text-slate-300 selection:bg-cyan-500/30 overflow-x-hidden relative">
      
      {/* ================= 1. STANDARD CHAMELEON BACKGROUND ================= */}
      
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-[10%] right-1/4 w-[600px] h-[500px] bg-blue-600/5 blur-[150px] rounded-[100%] mix-blend-screen pointer-events-none"></div>
         <div className="absolute bottom-[10%] left-1/4 w-[500px] h-[400px] bg-cyan-600/5 blur-[150px] rounded-[100%] mix-blend-screen pointer-events-none"></div>
      </div>

      {/* ================= 2. PREMIUM STANDARD NAVBAR ================= */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled || mobileMenuOpen ? 'bg-[#010205]/95 backdrop-blur-xl border-b border-white/[0.05] py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between relative z-10">
          <Link href="/" className="flex items-center gap-3 group h-12">
             <div className="relative w-48 h-full group-hover:scale-105 transition-transform">
                <Image src="/logos/tuneplus-logo.png" alt="TunePlus Logo" fill className="object-contain object-left drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]" priority/>
             </div>
          </Link>
          
          <div className="hidden xl:flex items-center gap-6 font-bold text-[11px] uppercase tracking-widest text-slate-400">
            <Link href="/features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/splits" className="hover:text-white transition-colors">Splits</Link>
            <Link href="/accelerator" className="hover:text-white transition-colors">Accelerator</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/stores" className="hover:text-white transition-colors">Stores</Link>
            <Link href="/white-label" className="text-cyan-400 hover:text-cyan-300 transition-colors drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">White Label SaaS</Link>
          </div>

          <div className="hidden xl:flex items-center gap-6">
            <a href={`${DASHBOARD_URL}/login`} className="font-bold text-[12px] uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Login</a>
            <a href={`${DASHBOARD_URL}/signup`} className="group relative overflow-hidden inline-flex bg-cyan-600 text-white px-8 py-3.5 rounded-full font-bold text-[12px] uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <span className="relative z-10 transition-colors group-hover:text-white">Sign Up Free</span>
              <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
            </a>
          </div>

          <button 
            className="xl:hidden text-white p-2 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} className="text-cyan-400" /> : <Menu size={28} className="text-white" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="xl:hidden absolute top-full left-0 w-full bg-[#010205]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl py-6 px-6 flex flex-col gap-6">
            <Link href="/features" onClick={closeMobileMenu} className="font-bold text-[13px] uppercase tracking-widest text-slate-300 hover:text-white">Features</Link>
            <Link href="/services" onClick={closeMobileMenu} className="font-bold text-[13px] uppercase tracking-widest text-slate-300 hover:text-white">Services</Link>
            <Link href="/splits" onClick={closeMobileMenu} className="font-bold text-[13px] uppercase tracking-widest text-slate-300 hover:text-white">Splits</Link>
            <Link href="/accelerator" onClick={closeMobileMenu} className="font-bold text-[13px] uppercase tracking-widest text-slate-300 hover:text-white">Accelerator</Link>
            <Link href="/pricing" onClick={closeMobileMenu} className="font-bold text-[13px] uppercase tracking-widest text-slate-300 hover:text-white">Pricing</Link>
            <Link href="/stores" onClick={closeMobileMenu} className="font-bold text-[13px] uppercase tracking-widest text-slate-300 hover:text-white">Stores</Link>
            <Link href="/white-label" onClick={closeMobileMenu} className="font-bold text-[13px] uppercase tracking-widest text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">White Label SaaS</Link>
            
            <div className="w-full h-[1px] bg-white/10 my-2"></div>
            
            <a href={`${DASHBOARD_URL}/login`} onClick={closeMobileMenu} className="font-bold text-[13px] uppercase tracking-widest text-slate-300 hover:text-white">Login</a>
            <a href={`${DASHBOARD_URL}/signup`} onClick={closeMobileMenu} className="bg-cyan-600 text-white text-center px-8 py-4 rounded-full font-bold text-[13px] uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              Sign Up Free
            </a>
          </div>
        )}
      </nav>

      {/* ================= 3. HERO SECTION ================= */}
      <section className="relative pt-48 pb-20 px-6 text-center z-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-cyan-500/20 text-cyan-400 font-bold text-[10px] uppercase tracking-widest mb-8 bg-cyan-950/20 shadow-inner backdrop-blur-md">
            <Users size={14}/> Meet the Visionaries
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight uppercase text-white mb-8 leading-[0.9] drop-shadow-2xl">
            The Hands Behind<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">MaeveMusic.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto">
            Our leadership team is comprised of industry veterans, software engineers, and most importantly—musicians. We are dedicated to redefining how music is shared and monetized.
          </p>
        </div>
      </section>

      {/* ================= 4. PREMIUM TEAM GRID ================= */}
      <section className="py-20 px-6 max-w-[1200px] mx-auto z-10 relative">
        
        {/* --- EXECUTIVE TEAM --- */}
        <div className="mb-32">
          <div className="text-center mb-16 relative">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase relative z-10 inline-block bg-[#010205] px-6">Executive Team</h2>
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -z-0"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 max-w-3xl mx-auto">
            <TeamMemberCard name="Bhabesh Roy Medhi" role="Director, Founder & CEO" imageSrc="/team/Bhabesh Roy Medhi.png" />
            <TeamMemberCard name="Jitu Roy Medhi" role="Managing Director (MD)" imageSrc="/team/jitu medhi.png" />
          </div>
        </div>

        {/* --- DIRECTORS --- (Centered perfectly with max-w-sm) */}
        <div className="mb-32">
          <div className="text-center mb-16 relative">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase relative z-10 inline-block bg-[#010205] px-6">Directors</h2>
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -z-0"></div>
          </div>
          <div className="grid grid-cols-1 gap-16 max-w-sm mx-auto">
            <TeamMemberCard name="Pranab Jyoti Kalita" role="Director" imageSrc="/team/Pranab j kalita.png" />
          </div>
        </div>

        {/* --- CONTENT OPERATIONS --- */}
        <div className="mb-32">
          <div className="text-center mb-16 relative">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase relative z-10 inline-block bg-[#010205] px-6">Content Operations</h2>
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -z-0"></div>
          </div>
          <div className="grid grid-cols-1 gap-16 max-w-sm mx-auto">
            <TeamMemberCard name="Zac Irfan" role="Head of Operations" imageSrc="/team/zac irfan.jpg" />
          </div>
        </div>

        {/* --- TECHNICAL TEAM --- (Centered for 2 people) */}
        <div className="mb-12">
          <div className="text-center mb-16 relative">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase relative z-10 inline-block bg-[#010205] px-6">Technical Team</h2>
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -z-0"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 max-w-3xl mx-auto">
            <TeamMemberCard name="Anil Kumar" role="Senior Engineer" imageSrc="/team/anil-kumar.png" />
            <TeamMemberCard name="Baint Kaur" role="Senior Developer" imageSrc="/team/baint-kaur.png" />
          </div>
        </div>

      </section>

      {/* ================= 5. LEADERSHIP PRINCIPLES ================= */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto z-10 relative border-t border-white/5">
         <div className="text-center mb-20">
            <p className="text-[12px] font-bold uppercase tracking-widest text-cyan-500 mb-2">Our Foundation</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">Leadership <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Principles</span></h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 rounded-3xl bg-[#050b14]/50 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 shadow-lg group relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
               <div className="relative z-10">
                 <div className="w-16 h-16 bg-[#02040a] rounded-2xl flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform border border-white/10 shadow-inner">
                    <Target size={28}/>
                 </div>
                 <h3 className="text-xl font-bold uppercase text-white mb-3 tracking-tight">Artist-First Logic</h3>
                 <p className="text-slate-400 text-sm leading-relaxed font-medium">Every feature we build starts with one question: Does this make the artist's life easier? If not, we don't build it.</p>
               </div>
            </div>
            
            <div className="p-10 rounded-3xl bg-[#050b14]/50 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 shadow-lg group relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
               <div className="relative z-10">
                 <div className="w-16 h-16 bg-[#02040a] rounded-2xl flex items-center justify-center mb-6 text-amber-500 group-hover:scale-110 transition-transform border border-white/10 shadow-inner">
                    <Zap size={28}/>
                 </div>
                 <h3 className="text-xl font-bold uppercase text-white mb-3 tracking-tight">Technical Agility</h3>
                 <p className="text-slate-400 text-sm leading-relaxed font-medium">The music industry moves fast. Our engineering leadership ensures our V3 engine stays ahead of global store requirements.</p>
               </div>
            </div>
            
            <div className="p-10 rounded-3xl bg-[#050b14]/50 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 shadow-lg group relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
               <div className="relative z-10">
                 <div className="w-16 h-16 bg-[#02040a] rounded-2xl flex items-center justify-center mb-6 text-red-500 group-hover:scale-110 transition-transform border border-white/10 shadow-inner">
                    <Heart size={28}/>
                 </div>
                 <h3 className="text-xl font-bold uppercase text-white mb-3 tracking-tight">Radical Transparency</h3>
                 <p className="text-slate-400 text-sm leading-relaxed font-medium">We lead with honesty. Whether it's royalty reporting or store delays, we provide clear, unedited information to our partners.</p>
               </div>
            </div>
         </div>
      </section>

      {/* ================= 6. JOIN THE TEAM ================= */}
      <section className="py-32 px-6 border-y border-white/5 bg-[#030814]/50 relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase text-white mb-8 leading-tight">
            Build the Future of <br/><span className="text-cyan-500">Music Tech</span> With Us
          </h2>
          <p className="text-slate-400 text-lg font-medium mb-12">
            We are always looking for passionate engineers, curators, and industry experts to join our global operations.
          </p>
          <Link href="/contact" className="group relative overflow-hidden inline-flex bg-cyan-600 text-white px-12 py-5 rounded-full font-bold text-sm uppercase tracking-widest shadow-[0_0_40px_rgba(6,182,212,0.4)] items-center gap-3">
             <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">Apply For Open Roles <ArrowRight size={18}/></span>
             <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
          </Link>
        </div>
      </section>

      {/* ================= 7. FOOTER ================= */}
      <footer className="bg-black pt-20 pb-10 border-t border-white/5 text-center md:text-left relative z-20">
         <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          <div className="col-span-1 lg:col-span-1">
             <div className="flex items-center justify-center md:justify-start h-16 mb-6">
                <div className="relative w-40 h-full">
                  <Image src="/logos/tuneplus-logo.png" alt="TunePlus Logo" fill className="object-contain object-left md:object-left" />
                </div>
             </div>
             <p className="text-slate-500 font-medium text-sm pr-4 leading-relaxed">Empowering independent artists globally with premium distribution and uncompromised royalty collection since 2017.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 text-slate-600">Learn About TunePlus</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About TunePlus</Link></li>
              <li><span className="text-cyan-500 transition-colors drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">Leadership</span></li>
              <li><Link href="/terms-and-conditions" className="hover:text-cyan-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-cyan-400 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 text-slate-600">Make Money With Us</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><a href={`${DASHBOARD_URL}/signup`} className="hover:text-cyan-400 transition-colors">Join TunePlus</a></li>
              <li><Link href="/features" className="hover:text-cyan-400 transition-colors">Features</Link></li>
              <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Services</Link></li>
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

// ================= THE PRO 'TEAM MEMBER CARD' =================
function TeamMemberCard({ name, role, imageSrc }: { name: string, role: string, imageSrc: string }) {
  return (
    <div className="flex flex-col items-center group cursor-pointer w-full">
      {/* Container: Rounded Square Card with Glow and Border */}
      <div className="w-56 h-56 md:w-64 md:h-64 rounded-[2rem] border border-white/[0.08] group-hover:border-cyan-500/50 transition-all duration-500 overflow-hidden mb-6 relative shadow-[0_20px_40px_rgba(0,0,0,0.4)] group-hover:shadow-[0_20px_50px_rgba(6,182,212,0.2)]">
        
        {/* Step-Up fallback styling if image is not found */}
        <div className="absolute inset-0 bg-[#050b14] flex items-center justify-center text-slate-600">
           <Users size={48} className="opacity-20" />
        </div>
        
        <Image 
          src={imageSrc} 
          alt={name} 
          fill
          className="object-cover relative z-10 group-hover:scale-110 transition-transform duration-700 fallback-bg"
          onError={(e) => {
            (e.target as HTMLImageElement).style.opacity = '0';
          }}
        />

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#010205] via-transparent to-transparent opacity-80 z-20"></div>
      </div>
      
      {/* Professional Touch: Name, Role and animated Accent Line */}
      <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-1 group-hover:text-cyan-400 transition-colors text-center drop-shadow-lg">{name}</h3>
      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest text-center">{role}</p>
      <div className="w-8 h-[2px] bg-cyan-500/50 mt-3 group-hover:w-16 transition-all duration-300 rounded-full"></div>
    </div>
  );
}