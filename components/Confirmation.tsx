'use client'

import { motion } from 'framer-motion'
import { Check, Calendar, MapPin, Clock } from 'lucide-react'
import { format } from 'date-fns'
import type { BookingData } from '@/app/page'

interface ConfirmationProps {
  bookingData: BookingData
  onNewBooking: () => void
}

export default function Confirmation({ bookingData, onNewBooking }: ConfirmationProps) {
  const { service, date, time, contact } = bookingData

  return (
    <div className="min-h-screen flex flex-col bg-lash-black px-6 pt-14">
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
        className="w-20 h-20 mx-auto mb-6 rounded-full bg-lash-gold flex items-center justify-center shadow-gold-glow"
      >
        <Check className="w-10 h-10 text-lash-black" strokeWidth={3} />
      </motion.div>

      {/* Confirmation Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center mb-8"
      >
        <h1 className="font-display text-3xl text-white mb-2">YOU'RE BOOKED</h1>
        <p className="text-white/60">See you soon, {contact?.name?.split(' ')[0]}! ✨</p>
      </motion.div>

      {/* Booking Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-lash-dark rounded-2xl p-6 border border-white/10 mb-6"
      >
        {/* Service */}
        <div className="mb-6">
          <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Service</p>
          <p className="text-white font-display text-xl">{service?.name}</p>
          <p className="text-lash-gold">{service?.duration} • £{service?.price}</p>
        </div>

        {/* Date & Time */}
        <div className="flex gap-6 mb-6">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-lash-gold mt-0.5" />
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Date</p>
              <p className="text-white">
                {date && format(date, 'EEEE')}
              </p>
              <p className="text-white/60 text-sm">
                {date && format(date, 'MMMM d, yyyy')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-lash-gold mt-0.5" />
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Time</p>
              <p className="text-white">{time}</p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-3 pt-4 border-t border-white/10">
          <MapPin className="w-5 h-5 text-lash-gold mt-0.5" />
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Location</p>
            <p className="text-white">Bristol, UK</p>
            <p className="text-white/40 text-sm">Address sent via text</p>
          </div>
        </div>
      </motion.div>

      {/* Angel Number Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mb-8"
      >
        <p className="text-lash-gold/60 text-sm font-display tracking-wider">
          11:11 — IT'S MEANT TO BE
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="space-y-3 mt-auto pb-24"
      >
        <button className="btn-outline w-full flex items-center justify-center gap-2">
          <Calendar className="w-4 h-4" />
          Add to Calendar
        </button>
        
        <button
          onClick={onNewBooking}
          className="w-full text-white/40 text-sm hover:text-white transition-colors py-3"
        >
          Back to Home
        </button>
      </motion.div>

      {/* 11:11 Watermark */}
      <div className="absolute top-20 right-6 font-display text-8xl text-lash-gold/5 pointer-events-none">
        11:11
      </div>
    </div>
  )
}
