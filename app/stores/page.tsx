'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, Zap, UploadCloud, 
  ArrowLeft, Globe, PlayCircle, BarChart3, ShieldCheck, MonitorPlay, Plus, Minus, Info
} from 'lucide-react';

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
    const numberOfParticles = 120; 
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
        ctx!.fillStyle = 'rgba(139, 92, 246, 0.4)'; // Maeve Purple
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
            ctx!.strokeStyle = `rgba(6, 182, 212, ${0.15 - distance/800})`; // Cyan lines
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
          ctx!.strokeStyle = `rgba(168, 85, 247, ${0.4 - distanceMouse/500})`; // Purple glow near mouse
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

// ================= DYNAMIC STORE DATA =================
const STORE_DATA = [
  { 
    id: 'spotify', name: 'Spotify', logoUrl: '/logos/spotify.png',
    description: 'Spotify is currently the global leader in purely music streaming. Boasting hundreds of millions of monthly listeners and an incredibly sophisticated playlist ecosystem, it is the premier platform to expand your fanbase significantly.',
    strength: 'Unmatched Audience Reach', theme: 'emerald', tooltip: 'Get your music on the world\'s most popular streaming service.'
  },
  { 
    id: 'apple-music', name: 'Apple Music', logoUrl: '/logos/Apple.png', 
    description: 'With a vast user base integrated across every Apple device globally, Apple Music is essential for a complete digital strategy. It ensures track discovery is seamless.',
    strength: 'Integrated Platform Dominance', theme: 'red', tooltip: 'Reach premium listeners across the global Apple ecosystem.'
  },
  { 
    id: 'youtube-music', name: 'YouTube Music', logoUrl: '/logos/youtube.png',
    description: 'YouTube Music places your catalogue in front of over a billion users on the world’s biggest video platform. It pairs your audio with artwork, generating earnings for every stream.',
    strength: 'Massive Algorithmic Reach', theme: 'red', tooltip: 'Monetize your tracks via YouTube Music and Content ID.'
  },
  { 
    id: 'amazon-music', name: 'Amazon Music', logoUrl: '/logos/amazon.png',
    description: 'The world\'s biggest retailer gives you direct access to listeners via downloads and streams across all major music markets. Your catalog gets eligible for direct integration into Amazon Prime.',
    strength: 'Essential Retail Visibility', theme: 'cyan', tooltip: 'Optimized for voice-command discovery via Alexa.'
  },
  { 
    id: 'meta', name: 'Meta (FB & IG)', logoUrl: '/logos/metaaaa.png', 
    description: 'With a combined user base of billions, Facebook and Instagram are the ultimate platforms for fan engagement. Deliver your music to their libraries to allow users to create posts, Reels, and stories.',
    strength: 'Primary Viral Engagement Tool', theme: 'purple', tooltip: 'Allow fans to use your audio in their social content.'
  },
  { 
    id: 'jiosaavn', name: 'JioSaavn', logoUrl: '/logos/saavn.png',
    description: 'As India’s most influential digital music service, JioSaavn connects your Catalogue directly to over 100 million active local listeners. Its culture-specific focus makes it indispensable.',
    strength: 'Local Focus & Indian Reach', theme: 'green', tooltip: 'Gateway to the South Asian and Indian diaspora audience.'
  },
  { 
    id: 'tik-tok', name: 'TikTok', logoUrl: '/logos/tik-tok.png',
    description: 'The short-form video explosion relies 100% on audio. Distribute to TikTok to allow users to use your tracks for challenges and trends, providing the fastest way to achieve global breakout success.',
    strength: 'Direct Virality & Creator Economy', theme: 'cyan', tooltip: 'Essential for breaking tracks via global trends.'
  },
  { 
    id: 'gaana', name: 'Gaana', logoUrl: '/logos/gaana.png',
    description: 'With multiple language options and a specific focus on regional Indian markets, Gaana is a major player in South Asia. Put your catalogue in front of their dedicated regional userbase.',
    strength: 'Subcontinent Regional Dominance', theme: 'red', tooltip: 'Major platform for regional Indian music discovery.'
  },
  { 
    id: 'shazam', name: 'Shazam', logoUrl: '/logos/shazam.png',
    description: 'If they hear it, they need to know it. Shazam is the industry standard for music recognition, ubiquitous when users want to identify your tracks playing in the wild.',
    strength: 'Fundamental Track Discovery', theme: 'blue', tooltip: 'Helps fans find your music when playing in public.'
  },
  { 
    id: 'deezer', name: 'Deezer', logoUrl: '/logos/dezzerrr.png', 
    description: 'A global powerhouse in music streaming with millions of active users across Europe and Latin America. Expand your international footprint effortlessly.',
    strength: 'Curated Premium Audience', theme: 'purple', tooltip: 'Expand your international footprint with high-fidelity audio.'
  },
  { 
    id: 'pandora', name: 'Pandora', logoUrl: '/logos/Pandora.png',
    description: 'The pioneer of personalized radio. Get your music into the Music Genome Project and reach millions of listeners through highly targeted algorithmic radio stations.',
    strength: 'Algorithmic Radio Dominance', theme: 'blue', tooltip: 'Reach millions through targeted algorithmic radio.'
  },
  { 
    id: 'boomplay', name: 'Boomplay', logoUrl: '/logos/boom.png', 
    description: 'The undisputed leader in African music streaming. Tap into the fastest-growing music market in the world and connect with millions of fans across the continent.',
    strength: 'African Reach', theme: 'green', tooltip: 'The number one streaming app for African markets.'
  },
  { 
    id: 'anghami', name: 'Anghami', logoUrl: '/logos/aghamiiiii.png', 
    description: 'The premier music streaming platform in the Middle East and North Africa. Maximize your reach in the MENA region with dedicated localized curation.',
    strength: 'MENA Dominance', theme: 'purple', tooltip: 'Maximize your reach in the Middle East and North Africa.'
  },
  { 
    id: 'iheartradio', name: 'iHeartRadio', logoUrl: '/logos/iheart.png', 
    description: 'Bridge the gap between digital streaming and traditional radio. Reach millions of listeners through one of the largest radio networks globally.',
    strength: 'Broadcast Radio Integration', theme: 'red', tooltip: 'Integration with massive global broadcast networks.'
  },
  { 
    id: 'joox', name: 'JOOX', logoUrl: '/logos/jjokks.png', 
    description: 'A dominant force in Southeast Asia\'s streaming landscape. Gain unparalleled access to millions of highly engaged listeners across the Asian market.',
    strength: 'Southeast Asia Audience', theme: 'green', tooltip: 'Connect with millions of listeners in Southeast Asia.'
  },
  { 
    id: 'kkbox', name: 'KKBox', logoUrl: '/logos/KKBox.png',
    description: 'The pioneer of digital music in Asia. Essential for reaching dedicated fans in Taiwan, Hong Kong, Japan, and the broader Southeast Asian region.',
    strength: 'Asian Market Expertise', theme: 'cyan', tooltip: 'Essential for reaching dedicated fans across East Asia.'
  },
  { 
    id: 'snapchat', name: 'Snapchat', logoUrl: '/logos/snapshat.png', 
    description: 'The original short-form storytelling app uses audio to connect millions of users daily. Distribute your catalogue to Snapchat\'s audio library for engaged Gen-Z discovery.',
    strength: 'Social Sharing Virality', theme: 'yellow', tooltip: 'Put your tracks in Snapchat’s audio library for Gen-Z.'
  },
  { 
    id: '7digital', name: '7digital', logoUrl: '/logos/7 digital.png',
    description: 'A foundational B2B digital music platform that powers hundreds of music services worldwide. Ensure your catalog is available across a vast network of retail outlets.',
    strength: 'B2B Infrastructure Access', theme: 'white', tooltip: 'Powers hundreds of third-party music services worldwide.'
  },
  { 
    id: 'whatsapp', name: 'WhatsApp', logoUrl: '/logos/whatsapp.png',
    description: 'Share your music directly through WhatsApp statuses and chat messages, tapping into billions of active daily users instantly.',
    strength: 'Direct Messaging Virality', theme: 'green', tooltip: 'Let fans share your music directly in chats and statuses.'
  }
];

const getTheme = (theme: string) => {
  const themes: Record<string, any> = {
    emerald: { text: 'text-emerald-400', glow: 'from-emerald-500/10 to-transparent', border: 'group-hover:border-emerald-500/30' },
    red: { text: 'text-red-400', glow: 'from-red-500/10 to-transparent', border: 'group-hover:border-red-500/30' },
    cyan: { text: 'text-cyan-400', glow: 'from-cyan-500/10 to-transparent', border: 'group-hover:border-cyan-500/30' },
    purple: { text: 'text-purple-400', glow: 'from-purple-500/10 to-transparent', border: 'group-hover:border-purple-500/30' },
    green: { text: 'text-green-400', glow: 'from-green-500/10 to-transparent', border: 'group-hover:border-green-500/30' },
    blue: { text: 'text-blue-400', glow: 'from-blue-500/10 to-transparent', border: 'group-hover:border-blue-500/30' },
    yellow: { text: 'text-yellow-400', glow: 'from-yellow-500/10 to-transparent', border: 'group-hover:border-yellow-500/30' },
    white: { text: 'text-slate-200', glow: 'from-slate-500/10 to-transparent', border: 'group-hover:border-slate-400/30' },
  };
  return themes[theme] || themes.blue; 
};

// ================= REUSABLE FAQ COMPONENT =================
function DetailFaq({ selectedStore, faqs }: any) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const tTheme = getTheme(selectedStore.theme);
  
  return (
    <section className="py-24 px-6 max-w-[900px] mx-auto border-t border-white/5 pb-32">
        <div className="text-center md:text-left mb-16">
          <p className={`text-[12px] font-bold uppercase tracking-widest ${tTheme.text} mb-2`}>FAQS</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Frequently Asked <br/>Questions
          </h2>
        </div>

        <div className="flex flex-col border-t border-white/10">
          {faqs.map((faq:any, idx:number) => (
            <div key={idx} className="border-b border-white/[0.08] py-8 cursor-pointer group" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
              <div className="flex justify-between items-center gap-6">
                <h4 className={`text-lg font-bold text-slate-200 group-hover:${tTheme.text} transition-colors duration-300 leading-tight`}>{faq.q}</h4>
                <div className="shrink-0 text-slate-500 transition-transform duration-300">
                  {openFaq === idx ? <Minus size={24} className={tTheme.text} /> : <Plus size={24} className={`group-hover:${tTheme.text}`} />}
                </div>
              </div>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === idx ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                <p className={`text-slate-400 font-medium leading-relaxed text-base border-l-2 border-white/10 pl-6`}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
    </section>
  );
}

// ================= MAIN COMPONENT =================
export default function PremiumStoresSystemPage() {
  const DASHBOARD_URL = 'https://app.maevemusic.in'; 
  const [scrolled, setScrolled] = useState(false);
  const [selectedStore, setSelectedStore] = useState<any | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqs = [
    {
      q: `What is the cost to distribute my music to ${selectedStore?.name}?`,
      a: `Maeve Music has simplified costs, ensuring global distribution is affordable. Release unlimited catalogue starting from our base plans—this covers major platforms globally, including ${selectedStore?.name}. No hidden fees.`
    },
    {
      q: `How long until my tracks are live on ${selectedStore?.name}?`,
      a: `Releases are usually approved within 24-48 hours of submission. Following that, expect your tracks to be live and playable on ${selectedStore?.name} within standard processing times.`
    },
    {
      q: `How do my streaming royalties get collected from ${selectedStore?.name}?`,
      a: `Streaming services generally have a two-month delay in reporting earnings. We collect and pay your royalties immediately upon receipt into your Maeve Music wallet.`
    },
    {
      q: `Can I retain ownership of my songs on ${selectedStore?.name}?`,
      a: `Absolutely. You keep 100% ownership and copyright of your tracks when you distribute via Maeve Music to ${selectedStore?.name}. We are strictly your technical distribution partner.`
    }
  ];

  return (
    <div className="min-h-screen bg-[#030108] font-sans text-slate-300 selection:bg-purple-500/30 text-left overflow-x-hidden scroll-smooth relative">
      
      <style dangerouslySetInnerHTML={{ __html: `
        .text-gradient { background: linear-gradient(135deg, #a78bfa 0%, #2dd4bf 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .btn-gradient { background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%); }
        .btn-gradient:hover { background: linear-gradient(135deg, #7c3aed 0%, #0891b2 100%); }
        .card-glass { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.05); }
      `}} />

      <FiberNetwork />
      
      {/* Ambient Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/10 blur-[150px] rounded-[100%] mix-blend-screen pointer-events-none"></div>
      </div>

      {/* ================= STANDARD NAVBAR ================= */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled || selectedStore ? 'bg-[#030108]/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group h-12">
             <div className="relative w-48 h-40 group-hover:scale-105 transition-transform">
                <Image src="/logos/maevemusic.png" alt="Maeve Music Logo" fill className="object-contain object-left drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]" priority/>
             </div>
          </Link>
          
          <div className="hidden xl:flex items-center gap-6 font-bold text-[11px] uppercase tracking-widest text-slate-400">
            
            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <Link href="/pricing" className="hover:text-cyan-400 transition-colors">Pricing</Link>
            <Link href="/about" className="hover:text-cyan-400 transition-colors">About</Link>
            <Link href="/stores" className="hover:text-cyan-400 transition-colors">Stores</Link>
            
          </div>

          <div className="flex items-center gap-6">
            <a href={`${DASHBOARD_URL}/login`} className="hidden md:block font-bold text-[12px] uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Login</a>
            <a href={`${DASHBOARD_URL}/signup`} className="group relative overflow-hidden inline-flex btn-gradient text-white px-8 py-3.5 rounded-full font-bold text-[12px] uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-105">
              <span className="relative z-10 transition-colors group-hover:text-white">Sign Up Free</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ================= DYNAMIC ROUTING FLOW ================= */}
      <div className="relative z-10">
        {!selectedStore ? (
          
          /* ================= VIEW 1: GLOBAL STORES LISTING ================= */
          <div className="pt-48 animate-in fade-in duration-700">
            <section className="px-6 text-center max-w-4xl mx-auto mb-24 relative">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-purple-500/30 text-purple-400 font-bold text-[10px] uppercase tracking-widest mb-8 bg-purple-950/20 shadow-inner backdrop-blur-md">
                 <Globe size={14} className="text-cyan-400"/> 150+ Digital Store Partners
              </div>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-6 leading-tight">
                Every Store. <br/><span className="text-gradient">Every Listener.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                Maeve Music distributes your music to all of the world's primary digital music stores and streaming services, from Spotify to WhatsApp. Reach a global audience immediately.
              </p>
            </section>

            {/* Grid Cards */}
            <section className="px-6 max-w-[1400px] mx-auto pb-32">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {STORE_DATA.map((store, index) => {
                  const tTheme = getTheme(store.theme);
                  return (
                    <div 
                      key={index} 
                      onClick={() => { setSelectedStore(store); window.scrollTo(0, 0); }} 
                      className={`group relative card-glass rounded-3xl p-8 flex flex-col cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:bg-[#060410] ${tTheme.border} shadow-lg`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${tTheme.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl`}></div>

                      <div className="relative z-10 flex flex-col h-full items-start text-left">
                        
                        <div className="w-full flex justify-between items-start mb-8">
                          <div className="relative w-16 h-16 mb-2 group-hover:scale-110 transition-transform duration-500 drop-shadow-lg bg-black/20 p-2 rounded-xl border border-white/5">
                            <Image src={store.logoUrl} alt={`${store.name} logo`} fill className="object-contain p-1" />
                          </div>

                          {/* Info Tooltip */}
                          <div className="relative group/tooltip">
                            <Info size={18} className="text-slate-600 hover:text-white cursor-help transition-colors" />
                            <div className="absolute right-0 top-full mt-2 w-48 p-4 bg-[#1e293b] text-white text-xs rounded-xl shadow-2xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-[60] border border-white/10">
                              {store.tooltip}
                              <div className="absolute bottom-full right-2 -mb-1 border-4 border-transparent border-b-[#1e293b]"></div>
                            </div>
                          </div>
                        </div>

                        <h2 className="text-xl font-bold uppercase tracking-tight text-white mb-3 leading-none">{store.name}</h2>
                        <p className="text-slate-400 font-medium text-xs leading-relaxed mb-6 flex-1 line-clamp-3">{store.description}</p>

                        <div className={`mt-auto w-full relative overflow-hidden rounded-xl bg-white/5 border border-white/10 p-3 text-center transition-colors group-hover:border-purple-500/50`}>
                             <div className="absolute inset-0 w-0 bg-gradient-to-r from-purple-600/40 to-cyan-600/40 transition-all duration-300 ease-out group-hover:w-full"></div>
                             <span className={`relative z-10 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${tTheme.text} group-hover:text-white transition-colors`}>
                               Explore Integration <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                             </span>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
              
                <div className="mt-24 text-center">
                  <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-8">Want to see all 150+ platforms?</h3>
                  <a href={`${DASHBOARD_URL}/signup`} className="group relative overflow-hidden inline-flex btn-gradient text-white px-12 py-5 rounded-full font-bold text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:scale-105 transition-transform">
                    <span className="relative z-10 transition-colors group-hover:text-white">Join Maeve Music Free</span>
                  </a>
                </div>
            </section>
          </div>
        ) : (

          /* ================= VIEW 2: STORE DETAILED SECTION ================= */
          <div className="animate-in slide-in-from-right-10 fade-in duration-700 bg-[#030108]">
            
            <div className="fixed top-24 w-full z-40 bg-gradient-to-b from-[#030108] to-transparent py-4 pt-6">
               <div className="max-w-[1400px] mx-auto px-6">
                  <button onClick={() => setSelectedStore(null)} className="group relative overflow-hidden inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-slate-300 card-glass px-5 py-2.5 rounded-full shadow-lg hover:text-white transition-colors">
                    <span className="relative z-10 flex items-center gap-2"><ArrowLeft size={14}/> Back to Network</span>
                    <div className="absolute inset-0 w-0 bg-white/10 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
                  </button>
               </div>
            </div>

            <section className="relative pt-44 pb-24 px-6 flex flex-col items-center justify-center text-center overflow-hidden border-b border-white/5">
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r ${getTheme(selectedStore.theme).glow} to-transparent blur-[150px] rounded-full pointer-events-none opacity-50`}></div>

              <div className="relative z-10 max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                 <div className="text-center lg:text-left order-2 lg:order-1">
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full card-glass ${getTheme(selectedStore.theme).text} font-bold text-[10px] uppercase tracking-widest mb-6`}>
                      <MonitorPlay size={14}/> Official Integration
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-6 leading-[0.9]">
                      Distribute to <br/><span className={getTheme(selectedStore.theme).text}>{selectedStore.name}</span>
                    </h1>
                    <p className="text-lg text-slate-400 font-medium mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                      If your music belongs on {selectedStore.name}, Maeve Music eliminates the barriers. We partner directly to deliver your releases flawlessly. Retain 100% ownership and start publishing with unparalleled speed.
                    </p>
                    
                    <a href={`${DASHBOARD_URL}/signup`} className="group relative overflow-hidden inline-flex bg-white text-black px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest shadow-xl items-center gap-3 hover:scale-105 transition-transform">
                      <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors"><PlayCircle size={18}/> RELEASE ON {selectedStore.name.toUpperCase()}</span>
                      <div className="absolute inset-0 w-0 bg-purple-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
                    </a>
                 </div>
                 
                 <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                   <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center group drop-shadow-2xl bg-black/20 rounded-full border border-white/5 p-8">
                     <Image src={selectedStore.logoUrl} alt={`${selectedStore.name} massive logo`} fill className="object-contain p-8 group-hover:scale-110 transition-transform duration-700" />
                   </div>
                 </div>
              </div>
            </section>

            <section className="py-24 px-6 border-b border-white/5 relative z-10">
              <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card-glass p-10 rounded-3xl text-left hover:border-purple-500/30 transition-colors shadow-lg group">
                  <Globe size={32} className={`${getTheme(selectedStore.theme).text} mb-6 group-hover:scale-110 transition-transform`}/>
                  <h4 className="text-lg font-bold text-white uppercase mb-3 tracking-tight">Global Coverage</h4>
                  <p className="text-slate-400 font-medium text-sm leading-relaxed">Deliver your music to {selectedStore.name} listeners across all active countries.</p>
                </div>
                <div className="card-glass p-10 rounded-3xl text-left hover:border-purple-500/30 transition-colors shadow-lg group">
                  <ShieldCheck size={32} className={`${getTheme(selectedStore.theme).text} mb-6 group-hover:scale-110 transition-transform`}/>
                  <h4 className="text-lg font-bold text-white uppercase mb-3 tracking-tight">100% Ownership</h4>
                  <p className="text-slate-400 font-medium text-sm leading-relaxed">Retain all creative control and rights. We are strictly technical partners.</p>
                </div>
                <div className="card-glass p-10 rounded-3xl text-left hover:border-purple-500/30 transition-colors shadow-lg group">
                  <BarChart3 size={32} className={`${getTheme(selectedStore.theme).text} mb-6 group-hover:scale-110 transition-transform`}/>
                  <h4 className="text-lg font-bold text-white uppercase mb-3 tracking-tight">Live Analytics</h4>
                  <p className="text-slate-400 font-medium text-sm leading-relaxed">Monitor your streaming data, saves, and generated revenue from {selectedStore.name}.</p>
                </div>
              </div>
            </section>

            <section className="py-24 px-6 max-w-[1200px] mx-auto border-b border-white/5 relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6 leading-tight">
                    How to Upload to <br/><span className={getTheme(selectedStore.theme).text}>{selectedStore.name}</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { step: '01', title: `Create your Maeve Music account and pick a distribution plan.` },
                    { step: '02', title: `Specify release type and upload store-compliant cover art.` },
                    { step: '03', title: `Provide lossless audio files, credits, and metadata.` },
                    { step: '04', title: `Our team approves your release and delivers to ${selectedStore.name}.` },
                    { step: '05', title: `Unlock data dashboard to track your plays and wallet.` },
                    { step: '06', title: `Claim your verified artist profile on ${selectedStore.name}.` },
                  ].map((item, idx) => (
                    <div key={idx} className="card-glass rounded-3xl p-8 flex flex-col gap-6 hover:bg-white/[0.02] hover:border-cyan-500/30 transition-all duration-300">
                      <div className="flex items-center justify-between">
                         <span className={`text-4xl font-black tracking-tighter ${getTheme(selectedStore.theme).text} opacity-50`}>{item.step}</span>
                         <UploadCloud className="text-slate-500" size={24} />
                      </div>
                      <p className="text-slate-300 font-medium text-sm leading-relaxed">{item.title}</p>
                    </div>
                  ))}
                </div>
            </section>

            <DetailFaq selectedStore={selectedStore} faqs={faqs} />
          </div>
        )}
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#020105] pt-20 pb-10 border-t border-white/5 text-center md:text-left relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
             <div className="flex items-center justify-center md:justify-start gap-2 mb-6 h-12">
               <div className="relative w-48 h-40">
                  <Image src="/logos/maevemusic.png" alt="Maeve Music Logo" fill className="object-contain object-left md:object-left" />
               </div>
             </div>
             <p className="text-slate-500 font-medium text-sm pr-4">Empowering independent artists globally with premium distribution, algorithmic growth, and uncompromised royalty collection.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 text-slate-600">Learn About Us</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About Maeve Music</Link></li>
              
              <li><Link href="/terms-and-conditions" className="hover:text-cyan-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 text-slate-600">Make Money With Us</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><a href={`${DASHBOARD_URL}/signup`} className="hover:text-cyan-400 transition-colors">Create Your Account</a></li>
              
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
             © {new Date().getFullYear()} Maeve Music. All rights reserved.
           </div>
           <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              <a href="https://www.facebook.com/share/18qLo6Yx6D/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
              <a href="https://x.com/Maevemusic9" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X (Twitter)</a>
              <a href="https://www.instagram.com/maeve.musicgroup?igsh=ZG1lM3VmcGF4d21q&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
           </div>
        </div>
      </footer>

    </div>
  );
}