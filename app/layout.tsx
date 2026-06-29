import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// ================= PRO-LEVEL GLOBAL SEO CONFIGURATION =================
export const metadata: Metadata = {
  metadataBase: new URL('https://www.maevemusic.in/'),
  title: {
    default: "MaeveMusic | Premium Music Distribution",
    template: "%s | MaeveMusic"
  },
  description: "India's leading premium music distribution platform. Distribute to Spotify, Apple Music, and 150+ stores. Keep 100% of your royalties with Pay-Per-Release.",
  
  keywords: [
    // Core Distribution
    "music distribution India", 
    "upload music on spotify", 
    "digital music aggregator", 
    "MaeveMusic", 
    "sell music online",
    "best music distribution company",
    // New High-Value Keywords
    "pay per release music distribution",
    "white label record label software",
    "start a record label in india",
    "lifetime music distribution",
    "keep 100% royalties",
    "free ISRC and UPC codes",
    "YouTube Content ID distribution",
    // Competitor Alternatives
    "DistroKid alternative India",
    "TuneCore alternative"
  ],

  // Google indexing ke liye robots settings
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Social Media Previews (WhatsApp, Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.maevemusic.in/",
    title: "MaeveMusic | Premium Music Distribution & SaaS",
    description: "Go global with MaeveMusic. Distribute your music to 150+ stores, keep 100% royalties.",
    siteName: "MaeveMusic",
    images: [{
      url: "/logos/maevemusic.png", // Changed to your main logo for better branding
      width: 1200,
      height: 630,
      alt: "MaeveMusic Dashboard Preview",
    }],
  },

  twitter: {
    card: "summary_large_image",
    title: "MaeveMusic | Sell Your Music Everywhere",
    description: "Keep 100% of your royalties. Premium distribution for independent artists and labels.",
    images: ["/logos/maevemusic.png"],
  },

  // Canonical tag duplicate content issues hatane ke liye
  alternates: {
    canonical: 'https://www.maevemusic.in/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Verification tags for Google Search Console */}
        {/* Isko Google Search Console banane ke baad update kar lena */}
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1582274766232655');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1582274766232655&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}