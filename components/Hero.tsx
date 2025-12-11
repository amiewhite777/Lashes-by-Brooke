'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface HeroProps {
  onBookClick: () => void
  onViewStyles: () => void
}

export default function Hero({ onBookClick, onViewStyles }: HeroProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Hero Image Container */}
      <div className="relative h-[65vh] overflow-hidden">
        {/* Hero Image - Temporary placeholder, replace with /public/hero.jpg */}
        <Image
          src="https://images.unsplash.com/photo-1583001931096-959e942a7a8e?w=1080&q=80"
          alt="Lashes by Brooke - Beautiful eyelash extensions"
          fill
          className="object-cover object-top"
          priority
          quality={90}
        />

        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lash-black/40 to-lash-black" />
        
        {/* 11:11 Watermark */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute top-32 right-6 font-display text-6xl text-lash-gold/10"
        >
          11:11
        </motion.div>
      </div>
      
      {/* Content Section */}
      <div className="relative flex-1 px-6 -mt-32 z-10">
        {/* Brand Name */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-display text-5xl md:text-6xl text-white leading-none mb-2"
        >
          LASHES BY<br />BROOKE
        </motion.h1>
        
        {/* Tagline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-white/70 text-lg mb-8"
        >
          Heavenly results. London energy.
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="space-y-3"
        >
          <button 
            onClick={onBookClick}
            className="btn-gold w-full"
          >
            BOOK YOUR SET
          </button>
          
          <button 
            onClick={onViewStyles}
            className="btn-outline w-full"
          >
            View Styles
          </button>
        </motion.div>
        
        {/* Bristol Badge */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 flex items-center justify-center gap-2 text-white/40 text-sm"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span>Bristol, UK</span>
        </motion.div>
      </div>
    </div>
  )
}
