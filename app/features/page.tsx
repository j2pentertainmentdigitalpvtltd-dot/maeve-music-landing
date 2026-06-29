'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Globe, BarChart3, ShieldCheck, 
  ArrowRight, Zap, Headphones, 
  Users, PieChart, Link as LinkIcon, Smartphone,
  Plus, Minus
} from 'lucide-react';

// ================= 1. INTENSIFIED NETWORK FIBER =================
export const FiberNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray: any[] = [];
    const numberOfParticles = 250; 
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
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
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
        ctx!.fillStyle = 'rgba(59, 130, 246, 0.4)';
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
          if (distance < 150) { 
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(59, 130, 246, ${0.25 - distance/1000})`; 
            ctx!.lineWidth = 0.5;
            ctx!.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx!.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx!.stroke();
          }
        }
        
        const dxMouse = particlesArray[i].x - mouse.x;
        const dyMouse = particlesArray[i].y - mouse.y;
        const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distanceMouse < 250) { 
          ctx!.beginPath();
          ctx!.strokeStyle = `rgba(6, 182, 212, ${0.6 - distanceMouse/500})`; 
          ctx!.lineWidth = 1.5;
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
export default function FeaturesPage() {
  const DASHBOARD_URL = 'https://app.tuneplusmusic.com'; 
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#02040a] font-sans text-slate-200 selection:bg-blue-500/30 overflow-x-hidden relative">
      
      <FiberNetwork />
      
      {/* Ambient Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-600/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
      </div>

      {/* ================= PREMIUM NAVBAR ================= */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#02040a]/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group h-12">
             <div className="relative w-48 h-full group-hover:scale-105 transition-transform">
                <Image src="/logos/tuneplus-logo.png" alt="TunePlus Logo" fill className="object-contain object-left drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]" priority/>
             </div>
          </Link>
          
          <div className="hidden xl:flex items-center gap-6 font-bold text-[11px] uppercase tracking-widest text-slate-400">
            <span className="text-white border-b-2 border-cyan-500 pb-1">Features</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
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

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 px-6 flex items-center justify-center overflow-hidden z-10 min-h-[80vh]">
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-transparent border border-blue-500/30 text-blue-400 font-bold text-[10px] uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(37,99,235,0.1)]">
              <Zap size={14}/> Everything You Need to Succeed
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-tight mb-6 text-white">
              The Ultimate Toolkit For <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Independent Artists.</span>
            </h1>
            
            <p className="text-base md:text-lg text-slate-400 font-medium mb-10 max-w-xl leading-relaxed">
              We don't just put your music in stores. We provide a complete ecosystem to manage your releases, split royalties automatically, analyze global trends, and protect your copyrights.
            </p>

            <a href={`${DASHBOARD_URL}/signup`} className="group relative overflow-hidden inline-flex bg-white text-black px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-xl items-center gap-3">
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">Explore Dashboard <ArrowRight size={16}/></span>
              <div className="absolute inset-0 w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
            </a>
          </div>

          <div className="relative w-full aspect-video rounded-3xl border border-white/10 bg-[#050b14]/50 backdrop-blur-md overflow-hidden flex items-center justify-center shadow-[0_40px_100px_rgba(0,0,0,0.5)] group p-4 md:p-8">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
             
             <div className="relative w-full h-full z-10">
                 <Image 
                   src="/images/Artist-Dashboard.png" 
                   alt="TunePlus Platform Features" 
                   fill
                   className="object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                   priority
                 />
             </div>
             
             <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent opacity-50 z-20 pointer-events-none"></div>
          </div>

        </div>
      </section>

      {/* ================= CORE FEATURES GRID ================= */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto z-10 relative border-t border-white/5">
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">All The Essentials, <br/><span className="text-blue-500">Right At Your Fingertips.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureBlock 
            icon={Globe} 
            title="Global Distribution" 
            desc="Reach billions of listeners by sending your music to Spotify, Apple Music, TikTok, Amazon, YouTube Music, and 150+ other digital stores worldwide." 
          />
          <FeatureBlock 
            icon={PieChart} 
            title="Automated Royalty Splits" 
            desc="Collaborating with producers or other artists? Setup automated royalty splits. We will route the exact percentages to each collaborator's wallet automatically." 
          />
          <FeatureBlock 
            icon={BarChart3} 
            title="Advanced Analytics" 
            desc="Track your daily streams, listener demographics, and playlist placements with crystal clear data. Know exactly where your fans are." 
          />
          <FeatureBlock 
            icon={ShieldCheck} 
            title="Content ID & Protection" 
            desc="Monetize user-generated content on YouTube, Instagram, and Facebook. We scan and protect your music so you get paid whenever your song is used." 
          />
          <FeatureBlock 
            icon={Zap} 
            title="Fast Lane Delivery" 
            desc="No more waiting weeks. Get your releases processed and delivered to major stores in record time so you can hit your release dates perfectly." 
          />
          <FeatureBlock 
            icon={LinkIcon} 
            title="Smart Links & Pre-Saves" 
            desc="Generate beautiful promotional smart links and pre-save campaigns instantly. Share one link that routes fans to their preferred streaming platform." 
          />
          <FeatureBlock 
            icon={Smartphone} 
            title="Self-Serve Metadata" 
            desc="Made a typo? Need to update your artist profile? Make changes to your live catalog directly from your dashboard without waiting for email support." 
          />
          <FeatureBlock 
            icon={Users} 
            title="Label Management" 
            desc="Running an indie label? Manage multiple artists under one centralized account. Track individual performance and generate unified reports." 
          />
          <FeatureBlock 
            icon={Headphones} 
            title="24/7 Dedicated Support" 
            desc="Real humans, real help. Our dedicated artist support team is available around the clock to resolve issues and guide you through the process." 
          />
        </div>
      </section>

      {/* ================= FREQUENTLY ASKED QUESTIONS (FAQ) ================= */}
      <section className="py-24 px-6 max-w-[900px] mx-auto z-10 relative border-t border-white/5">
        <div className="mb-16 text-center md:text-left">
          <p className="text-[12px] font-bold uppercase tracking-widest text-cyan-500 mb-2">FAQS</p>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-4">
            Frequently Asked <br/>Questions
          </h2>
          <p className="text-slate-400 font-medium text-base">Explore common questions about TunePlus.</p>
        </div>

        <div className="flex flex-col border-t border-white/10">
          <FAQItem 
            question="What is music distribution, and why is it important?" 
            answer="Music distribution involves getting your music onto various platforms and streaming services like Spotify and Apple Music so it can be accessed by listeners worldwide. For independent artists, it's crucial because it ensures your music reaches a broader audience, maximizes your exposure, and helps you manage your music royalties efficiently."
          />
          <FAQItem 
            question="How long does it take for my music to go live?" 
            answer="With our Fast Lane Delivery, your music can go live on major platforms like Spotify and Apple Music in as little as 24-48 hours. However, we recommend submitting your release at least 2 weeks in advance to ensure pitching opportunities."
          />
          <FAQItem 
            question="Do I keep 100% of my royalties?" 
            answer="Yes! TunePlus operates on a transparent model. Depending on the plan you choose, you keep up to 100% of your streaming revenue and master rights. No hidden cuts, no hostage contracts."
          />
          <FAQItem 
            question="How do royalty splits work?" 
            answer="Our Automated Royalty Splits feature allows you to seamlessly share revenue with your collaborators. Simply enter their email and the percentage they are owed during the upload process. We automatically route their earnings to their TunePlus wallet, completely free of charge."
          />
          <FAQItem 
            question="Can I migrate my catalog from another distributor?" 
            answer="Absolutely. You can migrate your entire catalog to TunePlus without losing your play counts or playlist placements. Simply use the exact same audio files, metadata, and ISRC codes when uploading your tracks to our platform."
          />
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="py-32 px-6 border-t border-white/5 relative z-10 bg-[#050b14]/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase text-white mb-6">
            Ready To Take Control Of Your Career?
          </h2>
          <p className="text-slate-400 font-medium text-lg mb-10 leading-relaxed">
            Join thousands of independent artists and labels who trust TunePlus to deliver their music to the world. Keep 100% of your rights.
          </p>
          <a href={`${DASHBOARD_URL}/signup`} className="group relative overflow-hidden inline-flex bg-cyan-600 text-white px-12 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all shadow-[0_0_40px_rgba(6,182,212,0.4)] items-center gap-3 hover:-translate-y-1">
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">Create Free Account <ArrowRight size={18}/></span>
            <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
          </a>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black pt-20 pb-10 border-t border-white/5 text-center md:text-left relative z-20">
         <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
             <div className="flex items-center justify-center md:justify-start h-16 mb-6">
                <div className="relative w-40 h-full">
                  <Image src="/logos/tuneplus-logo.png" alt="TunePlus Logo" fill className="object-contain object-left md:object-left" />
                </div>
             </div>
             <p className="text-slate-500 font-medium text-sm pr-4">Empowering independent artists globally with premium distribution and uncompromised royalty collection since 2017.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 text-slate-600">Learn About TunePlus</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
              <li><Link href="/leadership" className="hover:text-cyan-400 transition-colors">Leadership</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-cyan-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-cyan-400 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 text-slate-600">Distribute</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><a href={`${DASHBOARD_URL}/signup`} className="hover:text-cyan-400 transition-colors">Join TunePlus</a></li>
              <li><span className="text-cyan-500 transition-colors">Features</span></li>
              <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Artist Services</Link></li>
              <li><Link href="/splits" className="hover:text-cyan-400 transition-colors">Splits</Link></li>
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
             © {new Date().getFullYear()} TunePlus Music. All rights reserved.
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

// ================= REUSABLE COMPONENTS =================

function FeatureBlock({ icon: Icon, title, desc }: any) {
  return (
    <div className="bg-white/[0.02] border border-white/[0.08] p-8 rounded-2xl hover:bg-white/[0.04] hover:border-cyan-500/30 transition-colors duration-300 text-left group shadow-lg">
      <div className="mb-6 text-cyan-500 group-hover:text-blue-400 transition-colors">
         <Icon size={32} strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-3">{title}</h3>
      <p className="text-slate-400 font-medium leading-relaxed text-sm">{desc}</p>
    </div>
  );
}

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