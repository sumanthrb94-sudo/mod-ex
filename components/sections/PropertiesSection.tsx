'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { properties } from '@/lib/data/properties';

export function PropertiesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);

  const checkScrollability = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScrollability, { passive: true });
    checkScrollability();
    return () => el.removeEventListener('scroll', checkScrollability);
  }, [checkScrollability]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('article')?.offsetWidth ?? 340;
    const gap = 24;
    el.scrollBy({
      left: direction === 'right' ? cardWidth + gap : -(cardWidth + gap),
      behavior: 'smooth',
    });
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    autoAdvanceRef.current = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 4) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scroll('right');
      }
    }, 5000);
    return () => {
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
    };
  }, [isPaused, scroll]);

  return (
    <section
      className="py-24 bg-[#F8F7F4] overflow-hidden"
      aria-labelledby="properties-section-heading"
    >
      <div className="container-xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-1.5 text-gold-600 text-sm font-semibold mb-4">
              Live Opportunities
            </span>
            <h2
              id="properties-section-heading"
              className="font-display text-4xl md:text-5xl text-navy-700 font-semibold"
            >
              Featured{' '}
              <span className="text-gold-500">Properties</span>
            </h2>
            <p className="mt-3 text-gray-500 font-body text-lg max-w-lg">
              Handpicked premium Dubai properties with vetted financials and strong yield
              potential.
            </p>
          </motion.div>

          {/* Navigation arrows (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous properties"
              className="w-12 h-12 rounded-xl border-2 border-navy-700/20 hover:border-gold-500 flex items-center justify-center text-navy-700 hover:text-gold-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Next properties"
              className="w-12 h-12 rounded-xl border-2 border-navy-700/20 hover:border-gold-500 flex items-center justify-center text-navy-700 hover:text-gold-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          role="list"
          aria-label="Featured properties"
        >
          {properties.map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="snap-start shrink-0 w-[85vw] md:w-[340px] lg:w-[380px]"
              role="listitem"
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>

        {/* Mobile nav arrows */}
        <div className="flex justify-center gap-4 mt-6 md:hidden">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous properties"
            className="w-12 h-12 rounded-xl border-2 border-navy-700/20 flex items-center justify-center text-navy-700 disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Next properties"
            className="w-12 h-12 rounded-xl border-2 border-navy-700/20 flex items-center justify-center text-navy-700 disabled:opacity-30"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* View All link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <a
            href="/properties"
            className="inline-flex items-center gap-2 text-navy-700 hover:text-gold-600 font-semibold font-body border-b-2 border-gold-500 pb-0.5 transition-colors"
          >
            View All Properties
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default PropertiesSection;
