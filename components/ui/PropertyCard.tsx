'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Badge } from '@/components/ui/Badge';
import type { Property } from '@/lib/data/properties';

interface PropertyCardProps {
  property: Property;
  className?: string;
  compact?: boolean;
}

interface FundingRingProps {
  funded: number;
  size?: number;
}

function FundingRing({ funded, size = 48 }: FundingRingProps) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (funded / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-label={`${funded}% funded`}
      role="img"
    >
      <circle
        cx="24"
        cy="24"
        r={radius}
        fill="none"
        stroke="#E5E7EB"
        strokeWidth="3"
      />
      <circle
        cx="24"
        cy="24"
        r={radius}
        fill="none"
        stroke="#D4AF37"
        strokeWidth="3"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 24 24)"
        style={{ transition: 'stroke-dashoffset 1s ease' }}
      />
      <text
        x="24"
        y="28"
        textAnchor="middle"
        fontSize="10"
        fill="#D4AF37"
        fontWeight="600"
      >
        {funded}%
      </text>
    </svg>
  );
}

function formatAEDShort(value: number): string {
  if (value >= 1000000) return `AED ${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `AED ${(value / 1000).toFixed(0)}K`;
  return `AED ${value}`;
}

const typeVariant: Record<string, 'gold' | 'teal' | 'navy'> = {
  Residential: 'teal',
  Commercial: 'navy',
  'Off-Plan': 'gold',
};

export function PropertyCard({ property, className, compact = false }: PropertyCardProps) {
  const {
    name,
    location,
    type,
    status,
    totalValue,
    funded,
    minInvestment,
    annualYield,
    gradient,
    id,
  } = property;

  return (
    <motion.article
      whileHover={{ y: -4, boxShadow: '0 8px 40px rgba(212,175,55,0.2)' }}
      transition={{ duration: 0.25 }}
      className={cn(
        'bg-white rounded-2xl overflow-hidden shadow-card border border-gray-100 flex flex-col',
        className
      )}
    >
      {/* Image placeholder */}
      <div className="relative h-48 overflow-hidden">
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br',
            gradient
          )}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={typeVariant[type] ?? 'gray'}>{type}</Badge>
          {status === 'coming-soon' && (
            <Badge variant="warning">Coming Soon</Badge>
          )}
          {funded >= 90 && (
            <Badge variant="danger">Almost Full</Badge>
          )}
        </div>

        {/* Yield badge top right */}
        <div className="absolute top-3 right-3">
          <div className="bg-navy-700/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5 text-center">
            <p className="text-gold-500 font-bold text-sm leading-none">{annualYield}%</p>
            <p className="text-white/60 text-xs mt-0.5">Yield</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-navy-700 text-lg font-semibold leading-snug line-clamp-1">
              {name}
            </h3>
            <p className="flex items-center gap-1 text-gray-500 text-sm mt-0.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{location}</span>
            </p>
          </div>
          <FundingRing funded={funded} />
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>Funded</span>
            <span className="text-gold-600 font-semibold">{funded}%</span>
          </div>
          <div
            className="h-2 bg-gray-100 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={funded}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${funded}% funded`}
          >
            <div
              className="h-full bg-gold-500 rounded-full transition-all duration-1000"
              style={{ width: `${funded}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500 mb-0.5">Total Value</p>
            <p className="font-semibold text-navy-700 text-sm">
              {formatAEDShort(totalValue)}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500 mb-0.5">Min. Investment</p>
            <p className="font-semibold text-navy-700 text-sm">
              AED {minInvestment.toLocaleString('en-AE')}
            </p>
          </div>
        </div>

        {/* CTA */}
        {!compact && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4" aria-hidden="true" />
              <span>{annualYield}% Annual Return</span>
            </div>
            <a
              href={`/properties/${id}`}
              className="inline-flex items-center gap-1.5 bg-gold-500 hover:bg-gold-400 text-navy-700 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
              aria-label={`Invest in ${name}`}
            >
              Invest Now
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default PropertyCard;
