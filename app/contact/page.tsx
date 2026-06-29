'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';
import { 
  Search, BookOpen, Music, 
  Globe, PlayCircle, Settings, 
  CreditCard, ShieldCheck, ChevronRight,
  HelpCircle, ArrowLeft, FileText, Menu, X
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

// ================= CATEGORIES & ARTICLES DATA =================
const categoriesMeta = [
  { id: 'distribution', title: "Music Distribution", icon: Music, desc: "Uploading, formatting, and managing your releases." },
  { id: 'stores', title: "Store Partners", icon: Globe, desc: "Spotify, Apple Music, and mapping issues." },
  { id: 'youtube', title: "YouTube Content ID", icon: PlayCircle, desc: "Monetization and copyright claims." },
  { id: 'earnings', title: "Earnings & Payouts", icon: CreditCard, desc: "Royalties, wallet balance, and withdrawals." },
  { id: 'account', title: "Account Settings", icon: Settings, desc: "Security, passwords, and KYC/Bank details." },
  { id: 'copyright', title: "Copyright & Anti-Fraud", icon: ShieldCheck, desc: "Artificial streaming rules and DMCA." }
];

const articlesData = {
  distribution: [
    { id: 'd1', title: "Comprehensive Guide to Uploading Your Release", content: "Uploading your music is a streamlined 6-step process:\n\n1. Release Info: Add your Core Details, Metadata, and auto-generate or provide your UPC.\n2. Upload: Add your high-quality audio files (Strictly WAV or FLAC).\n3. Tracks: Manage metadata for individual tracks, add contributors (Lyricist, Composer), and ISRC.\n4. Store: Select DSP delivery platforms like Spotify, Apple Music, and JioSaavn.\n5. Release Date: Schedule your release at least 14 days ahead for playlist pitching.\n6. Submission: Verify your mapping and submit to our content review team." },
    { id: 'd2', title: "Audio & Artwork Format Guidelines", content: "To guarantee smooth delivery, your assets must meet strict standards.\n\nAudio Requirements:\n- 16-bit or 24-bit WAV or FLAC only.\n- 44.1 kHz sample rate or higher.\n- MP3s are strictly prohibited.\n\nArtwork Requirements:\n- Exactly 3000x3000 pixels (JPG/PNG).\n- The text on the artwork MUST exactly match your release title and artist name.\n- No social media logos, URLs, or barcodes allowed." }
  ],
  stores: [
    { id: 's1', title: "How to Fix Artist Profile Mapping Issues", content: "If your music appears on another artist's page with the same name, do not take it down. Contact our support team with:\n\n1. Your Release UPC.\n2. The link to the incorrect profile where the music is currently.\n3. Your correct profile link.\n\nWe will submit a direct ticket to the stores. This usually takes 3-7 business days to fix." },
    { id: 's2', title: "Delivery Timelines: When will my music go live?", content: "After submission, our Content Review team checks your release within 1-3 business days. Once approved and delivered, stores take an additional 2-5 days to process and make the release live on their platforms." }
  ],
  youtube: [
    { id: 'y1', title: "YouTube Content ID Requirements & Monetization", content: "Content ID scans YouTube for videos using your music so you can earn ad revenue. To be eligible, you MUST own 100% exclusive rights to the audio.\n\nThe following will be REJECTED:\n- Free downloaded beats.\n- Non-exclusive leased beats.\n- Uncleared vocal samples or movie dialogues.\n- Unmodified loop pack samples (e.g., Splice).\n- Public domain recordings." }
  ],
  earnings: [
    { id: 'e1', title: "Managing Your Wallet & Master Settlements", content: "Streaming platforms do not pay in real-time; there is an industry-standard 2-3 month reporting delay. For example, streams from January are typically audited by DSPs and deposited into your MaeveMusic Wallet in late March or early April." },
    { id: 'e2', title: "How to Withdraw Your Funds", content: "Navigate to Account Settings > Payment Hub to add your Primary Bank Account and KYC details.\n\nOnce your 'Available to Withdraw' balance reaches the $50 minimum threshold, go to the Wallet tab and click 'Request Payout'. Funds are transferred within 3-5 business days." }
  ],
  account: [
    { id: 'a1', title: "Changing your Password and Security Settings", content: "Go to Account Settings > Security & Access to update your password or enable Two-Factor Authentication (2FA) for extra protection. If you are locked out, use the 'Forgot Password' link on the login screen." },
    { id: 'a2', title: "Updating your Financial Configuration", content: "Before you can withdraw royalties, you must complete your Identity and Bank verification. Navigate to Account Settings > Payment Hub to securely upload your Bank details, Tax ID/PAN, and complete your KYC for tax compliance." }
  ],
  copyright: [
    { id: 'c1', title: "Anti-Fraud Policy: Artificial Streaming & Penalties", content: "MaeveMusic enforces a strict zero-tolerance policy for artificial streaming (bots, click farms, paid playlist promo).\n\nViolations will result in:\n- Immediate release takedowns.\n- Severe financial fines charged by DSPs deducted directly from your wallet.\n- Permanent account suspension without appeal." },
    { id: 'c2', title: "Copyright Infringement & Duplicate Content Policy", content: "You legally certify that you own 100% of the copyrights upon submission. Uploading music belonging to others, unauthorized remixes, or uncleared samples will trigger a DMCA strike.\n\nFurthermore, uploading the exact same audio file multiple times to manipulate algorithms (Duplicate Content Spam) will trigger an automatic account suspension." }
  ]
};

// Flatten articles for global search
const allArticles = Object.entries(articlesData).flatMap(([catId, articles]) => 
  articles.map(article => ({ ...article, categoryId: catId }))
);

export default function MaeveMusicHelpCenter() {
  const DASHBOARD_URL = 'https://app.maevemusic.in';
  
  // State Management
  const [currentView, setCurrentView] = useState<'home' | 'category' | 'article' | 'search'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ================= MISSING NEWSLETTER VARIABLES ADDED HERE =================
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

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
  // ===========================================================================

  // Search Logic
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim().length > 1) {
      setCurrentView('search');
    } else if (currentView === 'search') {
      setCurrentView('home');
    }
  };

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    const lowerQuery = searchQuery.toLowerCase();
    return allArticles.filter(a => 
      a.title.toLowerCase().includes(lowerQuery) || 
      a.content.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  // Navigation Handlers
  const openCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openArticle = (article: any, fromView: 'category' | 'search' | 'home' = 'category') => {
    setSelectedArticle({ ...article, fromView });
    if (!selectedCategory && article.categoryId) {
      setSelectedCategory(article.categoryId);
    }
    setCurrentView('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (currentView === 'article') {
      if (selectedArticle?.fromView === 'search') setCurrentView('search');
      else setCurrentView('category');
    } else if (currentView === 'category' || currentView === 'search') {
      setCurrentView('home');
      setSearchQuery("");
      setSelectedCategory(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryMeta = (id: string) => categoriesMeta.find(c => c.id === id);
  const activeCatMeta = selectedCategory ? getCategoryMeta(selectedCategory) : null;

  return (
    <div className="min-h-screen bg-[#030108] font-sans text-slate-200 selection:bg-cyan-500/30 flex flex-col relative overflow-x-hidden">
      
      {/* ================= GLOBAL STYLES & GLOWS ================= */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .text-gradient {
            background: linear-gradient(135deg, #a78bfa 0%, #2dd4bf 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
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
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 blur-[150px] rounded-full mix-blend-screen"></div>
      </div>

      {/* ================= TAWK.TO SCRIPT ================= */}
      <Script
        id="tawk-to"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://tawk.to/chat/6a425c6ad118e21d49b23efc/1js9ji0hs';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
          `,
        }}
      />

      {/* ================= MAEVE MUSIC NAVBAR ================= */}
      <nav className="w-full relative z-40 bg-[#030108]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1400px] mx-auto h-20 px-6 md:px-12 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="relative flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="relative w-50 h-40">
              <Image src="/logos/maevemusic.png" alt="MaeveMusic Logo" fill className="object-contain rounded-lg" priority />
            </div>
            <div className="flex flex-col">
               <span className="text-xl md:text-2xl font-black text-white tracking-wide leading-none"><span className="text-cyan-400"></span></span>
               <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Help Center</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <Link href="/pricing" className="hover:text-cyan-400 transition-colors">Pricing</Link>
            <button onClick={() => { setCurrentView('home'); setSearchQuery(""); }} className="text-cyan-400 font-bold">Support</button>
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
            <Link href="/pricing" className="block text-base font-medium text-white pb-2 border-b border-white/5">Pricing</Link>
            <button onClick={() => { setCurrentView('home'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-base font-bold text-cyan-400 pb-2 border-b border-white/5">Support Center</button>
            <div className="pt-4 grid grid-cols-2 gap-3">
              <a href={`${DASHBOARD_URL}/login`} className="text-center text-sm font-bold border border-white/20 rounded-full py-3 text-white">Login</a>
              <a href={`${DASHBOARD_URL}/signup`} className="text-center text-sm font-bold rounded-full py-3 bg-cyan-400 text-black">Sign Up</a>
            </div>
          </div>
        )}
      </nav>

      {/* ================= SEARCH HERO (Always visible except in Article view) ================= */}
      {currentView !== 'article' && (
        <section className="pt-20 pb-16 px-6 relative z-10">
          <Reveal className="max-w-3xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full card-glass mb-6 border-cyan-500/30">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-cyan-300 text-[10px] font-bold uppercase tracking-[0.2em]">Support Desk</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight uppercase">
              How can we <span className="text-gradient">help today?</span>
            </h1>
            
            <div className="relative w-full max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-cyan-400" />
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search for guides, policies, or issues..." 
                className="w-full bg-[#0a0f1a] border border-white/10 rounded-full py-5 pl-16 pr-6 text-white text-lg placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-[0_0_30px_rgba(34,211,238,0.05)] hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]"
              />
            </div>
          </Reveal>
        </section>
      )}

      {/* ================= MAIN CONTENT AREA ================= */}
      <main className="flex-grow flex flex-col items-center w-full z-10 pb-20">

        {/* ---------------- VIEW: HOME (Grid) ---------------- */}
        {currentView === 'home' && (
          <section className="px-6 max-w-[1200px] w-full">
            <Reveal delay={100} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoriesMeta.map((cat) => (
                <div 
                  key={cat.id} onClick={() => openCategory(cat.id)}
                  className="card-glass rounded-[2rem] p-8 hover:-translate-y-2 hover:border-cyan-500/40 transition-all duration-300 cursor-pointer group flex flex-col h-full relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-2xl rounded-full group-hover:bg-cyan-500/10 transition-colors"></div>
                  
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-slate-300 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-all relative z-10">
                    <cat.icon size={26} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight relative z-10">{cat.title}</h3>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6 flex-grow relative z-10">{cat.desc}</p>
                  
                  <div className="flex items-center text-cyan-400 text-sm font-bold mt-auto relative z-10">
                    Explore Articles <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform"/>
                  </div>
                </div>
              ))}
            </Reveal>
          </section>
        )}

        {/* ---------------- VIEW: SEARCH RESULTS ---------------- */}
        {currentView === 'search' && (
          <section className="px-6 max-w-[900px] w-full">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <h2 className="text-2xl font-black text-white">Search Results for <span className="text-cyan-400">"{searchQuery}"</span></h2>
              <span className="text-slate-500 font-bold text-sm uppercase tracking-wider">{searchResults.length} found</span>
            </div>
            
            {searchResults.length > 0 ? (
              <div className="flex flex-col gap-4">
                {searchResults.map((article, idx) => {
                  const catMeta = getCategoryMeta(article.categoryId);
                  return (
                    <div key={idx} onClick={() => openArticle(article, 'search')} className="card-glass p-6 rounded-2xl hover:border-cyan-500/40 hover:bg-white/5 transition-all cursor-pointer group flex items-start gap-5">
                      <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                         <FileText className="text-cyan-400" size={20}/>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{article.title}</h3>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{catMeta?.title}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 card-glass rounded-[2rem]">
                <Search className="mx-auto h-16 w-16 text-slate-600 mb-4 opacity-50" />
                <h3 className="text-2xl font-black text-white mb-2">No articles found</h3>
                <p className="text-slate-400 font-medium">Try adjusting your search terms or browse our categories.</p>
              </div>
            )}
          </section>
        )}

        {/* ---------------- VIEW: CATEGORY LIST ---------------- */}
        {currentView === 'category' && activeCatMeta && (
          <section className="px-6 max-w-[900px] w-full">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-10">
              <button onClick={goBack} className="hover:text-cyan-400 flex items-center gap-1 transition-colors"><ArrowLeft size={14}/> Help Center</button>
              <span className="text-slate-700">/</span>
              <span className="text-cyan-400">{activeCatMeta.title}</span>
            </div>

            <div className="mb-10 pb-8 border-b border-white/10 flex flex-col md:flex-row items-start md:items-center gap-6">
               <div className="w-20 h-20 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl flex items-center justify-center text-cyan-400 shrink-0">
                 <activeCatMeta.icon size={40} />
               </div>
               <div>
                 <h2 className="text-4xl font-black text-white tracking-tight mb-3 uppercase">{activeCatMeta.title}</h2>
                 <p className="text-slate-400 text-lg font-medium">{activeCatMeta.desc}</p>
               </div>
            </div>

            <div className="flex flex-col gap-4">
              {articlesData[selectedCategory as keyof typeof articlesData]?.map((article, idx) => (
                <div key={idx} onClick={() => openArticle(article, 'category')} className="card-glass p-6 rounded-2xl hover:border-cyan-500/40 hover:bg-white/5 transition-all cursor-pointer group flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                        <BookOpen className="text-slate-400 group-hover:text-cyan-400" size={16}/>
                     </div>
                     <h3 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">{article.title}</h3>
                  </div>
                  <ChevronRight size={20} className="text-slate-600 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------------- VIEW: FULL ARTICLE PAGE ---------------- */}
        {currentView === 'article' && selectedArticle && (
          <section className="pt-10 px-6 max-w-[900px] w-full">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest mb-8 overflow-x-auto whitespace-nowrap pb-2">
              <button onClick={() => { setCurrentView('home'); setSearchQuery(""); }} className="hover:text-cyan-400 transition-colors">Help Center</button>
              <span className="text-slate-700">/</span>
              <button onClick={() => setCurrentView('category')} className="hover:text-cyan-400 transition-colors">{activeCatMeta?.title}</button>
              <span className="text-slate-700">/</span>
              <span className="text-cyan-400 truncate max-w-[200px] md:max-w-none">{selectedArticle.title}</span>
            </div>

            <article className="card-glass rounded-[2rem] p-8 md:p-14 relative">
              {/* Back Button */}
              <button onClick={goBack} className="absolute top-8 left-8 md:-left-5 w-10 h-10 bg-[#030108] border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500 transition-all shadow-xl">
                 <ArrowLeft size={18}/>
              </button>

              <h1 className="text-3xl md:text-5xl font-black text-white mb-8 mt-10 md:mt-4 leading-tight tracking-tight uppercase">
                {selectedArticle.title}
              </h1>
              
              <div className="w-20 h-1 bg-cyan-400 rounded-full mb-10"></div>
              
              <div className="prose prose-invert prose-cyan max-w-none">
                {/* Formatting Content with line breaks */}
                {selectedArticle.content.split('\n').map((paragraph: string, idx: number) => (
                  <p key={idx} className="text-slate-300 text-base md:text-lg leading-relaxed mb-6 font-medium">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Feedback Section */}
              <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                 <span className="text-slate-400 font-bold text-sm uppercase tracking-wider">Was this article helpful?</span>
                 <div className="flex gap-4">
                    <button className="px-8 py-2.5 rounded-full card-glass text-white hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:text-emerald-400 transition-all text-sm font-bold tracking-wider">Yes</button>
                    <button className="px-8 py-2.5 rounded-full card-glass text-white hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400 transition-all text-sm font-bold tracking-wider">No</button>
                 </div>
              </div>
            </article>
          </section>
        )}
        
      </main>

      {/* ================= BOTTOM CTA ================= */}
      <section className="py-20 px-6 mt-auto border-t border-white/5 bg-[#030108] relative z-20">
         <div className="max-w-[800px] mx-auto text-center flex flex-col items-center">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">Still Need Help?</h3>
            <p className="text-slate-400 mb-8 max-w-md font-medium">Our dedicated enterprise support team is available to assist you. Start a live chat to connect with an expert agent.</p>
            <button 
              onClick={() => {
                 if (typeof window !== 'undefined' && (window as any).Tawk_API) {
                    (window as any).Tawk_API.toggle();
                 } else {
                    alert("Chat widget is loading. Please wait a few seconds...");
                 }
              }} 
              className="bg-cyan-400 text-black px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-cyan-300 transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:scale-105"
            >
              Start Live Chat
            </button>
         </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#010103] pt-20 pb-10 border-t border-white/5 relative z-20">
        <div className="max-w-[1300px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="lg:col-span-1">
            <div className="relative w-50 h-40 mb-4">
              <Image src="/logos/maevemusic.png" alt="MaeveMusic Logo" fill className="object-contain rounded-lg" />
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
              <li><Link href="/pricing" className="hover:text-cyan-400 transition-colors">Pricing</Link></li>
              <li><Link href={`${DASHBOARD_URL}/signup`} className="hover:text-cyan-400 transition-colors">Sign Up</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Support</h4>
            <ul className="space-y-3 text-slate-400 text-sm font-medium">
              <li><button onClick={() => { setCurrentView('home'); window.scrollTo(0,0); }} className="hover:text-cyan-400 transition-colors">Help Center / FAQ</button></li>
              <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Stay Updated</h4>
            <form onSubmit={handleNewsletterSubscribe} className="w-full">
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Email Address"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-full text-white text-sm outline-none focus:border-cyan-400 transition-colors"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-cyan-400 text-black font-bold px-4 py-3 rounded-xl text-sm transition-transform hover:scale-[1.02] disabled:opacity-60 uppercase tracking-wider"
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              {newsletterMessage && (
                <p className="mt-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">{newsletterMessage}</p>
              )}
            </form>
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