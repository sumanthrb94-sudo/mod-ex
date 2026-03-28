import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Work_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-work-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'PropChain – Own Premium Dubai Properties from AED 500',
    template: '%s | PropChain',
  },
  description:
    'Fractional real estate ownership on the blockchain. Invest in premium Dubai properties from AED 500. VARA-licensed, instant liquidity, automated dividends.',
  keywords: [
    'real estate tokenization',
    'Dubai property investment',
    'fractional ownership UAE',
    'VARA licensed',
    'blockchain real estate',
    'property tokens',
    'UAE real estate investment',
    'PropChain',
    'Dubai fractional property',
  ],
  authors: [{ name: 'PropChain' }],
  creator: 'PropChain',
  publisher: 'PropChain',
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
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: 'https://propchain.ae',
    siteName: 'PropChain',
    title: 'PropChain – Own Premium Dubai Properties from AED 500',
    description:
      'Fractional real estate ownership on the blockchain. Invest in premium Dubai properties from AED 500. VARA-licensed, instant liquidity, automated dividends.',
    images: [
      {
        url: 'https://propchain.ae/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PropChain – Real Estate Tokenization Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@propchainAE',
    creator: '@propchainAE',
    title: 'PropChain – Own Premium Dubai Properties from AED 500',
    description:
      'Fractional real estate ownership on the blockchain. Invest in premium Dubai properties from AED 500.',
    images: ['https://propchain.ae/og-image.png'],
  },
  alternates: {
    canonical: 'https://propchain.ae',
  },
};

export const viewport: Viewport = {
  themeColor: '#1A1F2E',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${workSans.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body antialiased bg-[#F8F7F4] text-gray-700">
        {children}
      </body>
    </html>
  );
}
