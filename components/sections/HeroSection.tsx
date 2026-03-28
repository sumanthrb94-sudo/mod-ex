'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, Play, ChevronDown, TrendingUp, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface HeroPropertyCard {
  name: string;
  location: string;
  funded: number;
  yield: number;
  gradient: string;
  delay: number;
  rotation: number;
  translateY: number;
}

const heroCards: HeroPropertyCard[] = [
  {
    name: 'Marina Heights Tower',
    location: 'Dubai Marina',
    funded: 73,
    yield: 8.2,
    gradient: 'from-sky-400 via-blue-600 to-navy-700',
    delay: 0,
    rotation: -6,
    translateY: 0,
  },
  {
    name: 'Palm Residence',
    location: 'Palm Jumeirah',
    funded: 45,
    yield: 9.1,
    gradient: 'from-teal-400 via-cyan-600 to-blue-800',
    delay: 0.1,
    rotation: 0,
    translateY: -20,
  },
  {
    name: 'DIFC Sky Penthouse',
    location: 'DIFC',
    funded: 15,
    yield: 10.2,
    gradient: 'from-rose-400 via-pink-600 to-navy-800',
    delay: 0.2,
    rotation: 6,
    translateY: -40,
  },
];

const trustItems = [
  'VARA Licensed',
  'SCA Regulated',
  'AED 50M+ Funded',
  '2,400+ Investors',
];

const revealVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

function MiniPropertyCard({
  card,
  mouseX,
  mouseY,
  index,
}: {
  card: HeroPropertyCard;
  mouseX: number;
  mouseY: number;
  index: number;
}) {
  const parallaxStrength = (index + 1) * 12;
  const x = mouseX * parallaxStrength;
  const y = mouseY * parallaxStrength;
  const circumference = 2 * Math.PI * 16;
  const offset = circumference - (card.funded / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: card.rotation }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: card.rotation,
        x,
        y: card.translateY + y,
      }}
      transition={{
        opacity: { duration: 0.6, delay: card.delay + 0.5 },
        scale: { duration: 0.6, delay: card.delay + 0.5 },
        x: { duration: 0.15, ease: 'linear' },
        y: { duration: 0.15, ease: 'linear' },
      }}
      className="absolute w-64 bg-navy-700/90 backdrop-blur-md border border-white/15 rounded-2xl overflow-hidden shadow-2xl"
      style={{
        right: index === 0 ? '20%' : index === 1 ? '0' : '-20%',
        top: index === 0 ? '10%' : index === 1 ? '30%' : '55%',
      }}
    >
      {/* Card image */}
      <div className={cn('h-28 bg-gradient-to-br relative', card.gradient)}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-2 right-2 bg-navy-700/90 rounded-lg px-2 py-1">
          <p className="text-gold-500 font-bold text-xs">{card.yield}% Yield</p>
        </div>
      </div>

      {/* Card content */}
      <div className="p-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm truncate">{card.name}</p>
          <p className="text-white/50 text-xs flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3" aria-hidden="true" />
            <span>{card.location}</span>
          </p>
          <div className="mt-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-white/40">Funded</span>
              <span className="text-gold-500 font-semibold">{card.funded}%</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold-500 rounded-full"
                style={{ width: `${card.funded}%` }}
              />
            </div>
          </div>
        </div>

        {/* Mini ring */}
        <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
          <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
          <circle
            cx="20"
            cy="20"
            r="16"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 20 20)"
          />
          <text x="20" y="24" textAnchor="middle" fontSize="9" fill="#D4AF37" fontWeight="600">
            {card.funded}%
          </text>
        </svg>
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setMouseX((e.clientX - centerX) / centerX);
    setMouseY((e.clientY - centerY) / centerY);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero"
      aria-label="Hero section"
    >
      {/* Background blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl animate-float pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-float-delayed pointer-events-none"
        aria-hidden="true"
      />
      <div className="absolute inset-0 pattern-dots pointer-events-none" aria-hidden="true" />

      <div className="container-xl relative z-10 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left: 60% content */}
          <div className="lg:col-span-3 space-y-8">
            {/* VARA badge */}
            <motion.div
              custom={0}
              variants={revealVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex"
            >
              <span className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-500/30 rounded-full px-4 py-1.5 text-gold-400 text-sm font-semibold">
                <span
                  className="w-2 h-2 bg-gold-500 rounded-full animate-pulse-gold"
                  aria-hidden="true"
                />
                VARA Licensed Platform
              </span>
            </motion.div>

            {/* Heading */}
            <div className="space-y-4">
              <motion.h1
                custom={1}
                variants={revealVariants}
                initial="hidden"
                animate="visible"
                className="font-display text-5xl md:text-6xl xl:text-7xl font-semibold text-white leading-[1.05]"
              >
                Own Premium{' '}
                <span className="text-gradient-gold">Dubai Properties</span>{' '}
                from{' '}
                <span className="text-gold-500">AED 500</span>
              </motion.h1>

              <motion.p
                custom={2}
                variants={revealVariants}
                initial="hidden"
                animate="visible"
                className="font-body text-white/70 text-lg md:text-xl leading-relaxed max-w-xl"
              >
                Fractional ownership meets blockchain. Instant liquidity, automated dividends,
                VARA-compliant. Join thousands of UAE investors earning from Dubai&apos;s most
                prestigious properties.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              custom={3}
              variants={revealVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4"
            >
              <a
                href="/properties"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-700 font-semibold px-8 py-4 rounded-xl shadow-glow hover:shadow-glow transition-all text-base"
              >
                Browse Properties
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="/how-it-works"
                className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all text-base"
              >
                <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                How It Works
              </a>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              custom={4}
              variants={revealVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center gap-0"
              aria-label="Platform credentials"
            >
              {trustItems.map((item, i) => (
                <React.Fragment key={item}>
                  <span className="text-white/50 text-sm font-body">{item}</span>
                  {i < trustItems.length - 1 && (
                    <span className="text-gold-500/50 mx-3 text-sm" aria-hidden="true">|</span>
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          </div>

          {/* Right: 40% floating cards */}
          <div
            className="lg:col-span-2 relative h-[500px] hidden lg:block"
            aria-hidden="true"
          >
            {heroCards.map((card, i) => (
              <MiniPropertyCard
                key={card.name}
                card={card}
                mouseX={mouseX}
                mouseY={mouseY}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-white/40 text-xs font-body uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5 text-white/40 animate-bounce-slow" />
      </motion.div>
    </section>
  );
}

export default HeroSection;
