import type { Metadata, Viewport } from 'next';
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/animation/SmoothScroll';
import { siteConfig } from '@/data/site';

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
  style: 'italic',
  weight: '400',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const viewport: Viewport = {
  themeColor: '#0c0a12',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteConfig.domain}`),
  title: siteConfig.title,
  description: `${siteConfig.name} — Web Application Developer & Founder from Mymensingh, Bangladesh. Building RoktoFinder, JaniBD, and learning Deep Learning.`,
  keywords: [
    'Muhammad Nafiz',
    'মুহাম্মদ নাফিজ',
    'Web Developer',
    'AI Engineer',
    'Deep Learning',
    'Mymensingh',
    'Bangladesh',
    'RoktoFinder',
    'JaniBD',
    'SaaS',
    'Next.js Portfolio',
  ],
  authors: [{ name: siteConfig.name, url: `https://${siteConfig.domain}` }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `https://${siteConfig.domain}`,
    title: siteConfig.title,
    description: `${siteConfig.name} — Web Application Developer & Founder from Mymensingh, Bangladesh. Building RoktoFinder, JaniBD, and learning Deep Learning.`,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: `${siteConfig.name} — Web Application Developer & Founder from Mymensingh, Bangladesh. Building RoktoFinder, JaniBD, and learning Deep Learning.`,
  },
  icons: {
    icon: '/logo/mark.svg',
    apple: '/logo/mark.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="bg-dark-bg text-dark-text min-h-screen selection:bg-brand selection:text-white font-sans antialiased"
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
