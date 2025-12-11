'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryProps {
  onBookStyle: (serviceId: string) => void
}

const lashStyles = [
  {
    id: 'classic',
    name: 'CLASSIC FULL SET',
    description: 'Individual application for timeless elegance.',
    duration: '2 hrs',
    price: 70,
    color: '#D4A5A5', // blush accent
  },
  {
    id: 'hybrid',
    name: 'HYBRID SET',
    description: 'Mix of classic and volume for textured dimension.',
    duration: '2 hrs',
    price: 70,
    color: '#B8972E',
  },
  {
    id: 'russian',
    name: 'RUSSIAN VOLUME',
    description: 'Full, fluffy, and dramatic statement look.',
    duration: '2.5 hrs',
    price: 85,
    color: '#D4AF37', // gold
  },
  {
    id: 'mega',
    name: 'MEGA VOLUME',
    description: 'Maximum drama for bold, glamorous impact.',
    duration: '3 hrs',
    price: 95,
    color: '#E5C158',
  },
  {
    id: 'wet',
    name: 'WET LOOK WISPY',
    description: 'Trendy, textured, editorial aesthetic.',
    duration: '2.5 hrs',
    price: 85,
    color: '#D4AF37',
  },
]

export default function Gallery({ onBookStyle }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection
      if (nextIndex < 0) nextIndex = lashStyles.length - 1
      if (nextIndex >= lashStyles.length) nextIndex = 0
      return nextIndex
    })
  }

  const currentStyle = lashStyles[currentIndex]

  return (
    <div className="min-h-screen flex flex-col bg-lash-black">
      {/* Header */}
      <div className="px-6 pt-14 pb-4">
        <h1 className="font-display text-2xl text-white">LASH STYLES</h1>
        <p className="text-white/50 text-sm">Swipe to explore</p>
      </div>

      {/* Carousel Container */}
      <div className="flex-1 relative overflow-hidden">
        {/* 11:11 Watermark */}
        <div className="absolute top-4 right-4 font-display text-5xl text-lash-gold/10 z-0">
          11:11
        </div>

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1)
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1)
              }
            }}
            className="absolute inset-0 flex flex-col"
          >
            {/* Video/Image Area */}
            <div className="flex-1 relative mx-6 rounded-2xl overflow-hidden bg-gradient-to-b from-lash-charcoal to-lash-dark">
              {/* Placeholder for video - gradient background simulating eye close-up */}
              <div 
                className="absolute inset-0"
                style={{
                  background: `
                    radial-gradient(ellipse at center, ${currentStyle.color}20 0%, transparent 70%),
                    linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)
                  `,
                }}
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
                >
                  <Play className="w-6 h-6 text-white ml-1" fill="white" />
                </motion.button>
              </div>

              {/* Style Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-lash-black via-lash-black/80 to-transparent">
                <h2 className="font-display text-2xl text-white mb-1">
                  {currentStyle.name}
                </h2>
                <p className="text-white/60 text-sm mb-2">
                  {currentStyle.description}
                </p>
                <p className="text-lash-gold font-medium">
                  {currentStyle.duration} • £{currentStyle.price}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-lash-dark/80 flex items-center justify-center z-10 border border-white/10"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-lash-dark/80 flex items-center justify-center z-10 border border-white/10"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 py-4">
        {lashStyles.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-lash-gold w-6'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Book This Style Button */}
      <div className="px-6 pb-6">
        <button
          onClick={() => onBookStyle(currentStyle.id)}
          className="btn-gold w-full"
        >
          BOOK THIS STYLE
        </button>
      </div>
    </div>
  )
}
