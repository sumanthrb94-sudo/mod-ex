'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCountUp } from '@/lib/hooks/useCountUp';

interface Stat {
  prefix?: string;
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  description: string;
}

const stats: Stat[] = [
  {
    prefix: 'AED ',
    value: 50,
    suffix: 'M+',
    label: 'Total Funded',
    description: 'In tokenized real estate assets across UAE',
  },
  {
    value: 2400,
    suffix: '+',
    label: 'Active Investors',
    description: 'From across the UAE and wider GCC region',
  },
  {
    value: 8.5,
    suffix: '%',
    decimals: 1,
    label: 'Avg Annual Return',
    description: 'Average yield across our portfolio properties',
  },
];

function StatItem({ stat }: { stat: Stat }) {
  const { displayValue, ref } = useCountUp({
    target: stat.value,
    duration: 2,
    prefix: stat.prefix,
    suffix: stat.suffix,
    decimals: stat.decimals ?? 0,
  });

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center px-8 py-2"
    >
      <motion.p
        className="font-display text-5xl md:text-6xl font-bold text-gold-500 tabular-nums"
        aria-live="polite"
      >
        <motion.span>{displayValue}</motion.span>
      </motion.p>
      <p className="mt-2 font-semibold text-white text-lg">{stat.label}</p>
      <p className="mt-1 text-white/50 text-sm font-body max-w-[200px]">{stat.description}</p>
    </div>
  );
}

export function StatsSection() {
  return (
    <section
      className="relative bg-navy-700 py-16 overflow-hidden"
      aria-label="Platform statistics"
    >
      {/* Texture overlay */}
      <div className="absolute inset-0 pattern-grid opacity-50 pointer-events-none" aria-hidden="true" />

      <div className="container-xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <StatItem stat={stat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
