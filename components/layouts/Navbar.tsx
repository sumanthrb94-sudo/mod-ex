'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useScrolled } from '@/lib/hooks/useScrolled';
import { cn } from '@/lib/utils/cn';

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: 'Properties', href: '/properties' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'About', href: '/about' },
  { label: 'Whitepaper', href: '/whitepaper' },
];

function PropChainLogo({ className }: { className?: string }) {
  return (
    <a
      href="/"
      className={cn('flex items-center gap-2 group', className)}
      aria-label="PropChain – Home"
    >
      <div
        className="w-9 h-9 rounded-xl bg-gold-500 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-shadow"
        aria-hidden="true"
      >
        <span className="font-display font-bold text-navy-700 text-lg leading-none">P</span>
      </div>
      <span className="font-display font-semibold text-xl text-white tracking-wide">
        PropChain
      </span>
    </a>
  );
}

export function Navbar() {
  const scrolled = useScrolled(80);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen((v) => !v);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-navy-700/95 backdrop-blur-md shadow-lg border-b border-white/5'
          : 'bg-transparent'
      )}
    >
      <nav
        className="container-xl flex items-center justify-between h-16 md:h-20"
        aria-label="Main navigation"
      >
        <PropChainLogo />

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-4 py-2 text-white/80 hover:text-white font-body text-sm font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/signin"
            className="px-5 py-2 text-white/80 hover:text-white font-body text-sm font-medium rounded-lg border border-white/20 hover:border-white/40 transition-colors"
          >
            Sign In
          </a>
          <a
            href="/register"
            className="px-5 py-2 bg-gold-500 hover:bg-gold-400 text-navy-700 font-body text-sm font-semibold rounded-lg shadow-glow-sm hover:shadow-glow transition-all"
          >
            Get Started
          </a>
        </div>

        {/* Mobile burger */}
        <button
          onClick={toggleMobile}
          className="md:hidden p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-navy-700/98 backdrop-blur-xl border-t border-white/10"
          >
            <div className="container-xl py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <a
                    href={link.href}
                    onClick={closeMobile}
                    className="flex items-center justify-between w-full px-4 py-3 text-white/80 hover:text-white font-body font-medium rounded-xl hover:bg-white/10 transition-colors"
                  >
                    {link.label}
                    <ChevronRight className="w-4 h-4 opacity-50" aria-hidden="true" />
                  </a>
                </motion.div>
              ))}

              <div className="pt-3 pb-2 border-t border-white/10 flex flex-col gap-2">
                <a
                  href="/signin"
                  onClick={closeMobile}
                  className="w-full px-4 py-3 text-center text-white/80 hover:text-white font-body font-medium rounded-xl border border-white/20 hover:border-white/40 transition-colors"
                >
                  Sign In
                </a>
                <a
                  href="/register"
                  onClick={closeMobile}
                  className="w-full px-4 py-3 text-center bg-gold-500 hover:bg-gold-400 text-navy-700 font-body font-semibold rounded-xl transition-colors shadow-glow-sm"
                >
                  Get Started Free
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
