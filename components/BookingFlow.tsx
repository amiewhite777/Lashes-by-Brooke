'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Check } from 'lucide-react'
import { format, addDays, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday, isBefore, startOfToday } from 'date-fns'
import type { BookingData } from '@/app/page'

interface BookingFlowProps {
  initialService: BookingData['service']
  onComplete: (data: BookingData) => void
  onBack: () => void
}

type BookingStep = 'service' | 'datetime' | 'contact'

const services = [
  { id: 'classic', name: 'CLASSIC FULL SET', description: 'Individual application for timeless elegance.', duration: '2 hrs', price: 70 },
  { id: 'hybrid', name: 'HYBRID SET', description: 'Mix of classic and volume for textured dimension.', duration: '2 hrs', price: 70 },
  { id: 'russian', name: 'RUSSIAN VOLUME', description: 'Full, fluffy, and dramatic statement look.', duration: '2.5 hrs', price: 85 },
  { id: 'mega', name: 'MEGA VOLUME', description: 'Maximum drama for bold, glamorous impact.', duration: '3 hrs', price: 95 },
  { id: 'wet', name: 'WET LOOK WISPY', description: 'Trendy, textured, editorial aesthetic.', duration: '2.5 hrs', price: 85 },
  { id: 'infill-classic', name: 'INFILLS — CLASSIC', description: 'Maintenance for your classic set.', duration: '1 hr', price: 40 },
  { id: 'infill-volume', name: 'INFILLS — VOLUME', description: 'Maintenance for your volume set.', duration: '1.5 hrs', price: 50 },
]

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
]

export default function BookingFlow({ initialService, onComplete, onBack }: BookingFlowProps) {
  const [step, setStep] = useState<BookingStep>(initialService ? 'datetime' : 'service')
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(initialService)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    email: '',
  })

  // Calendar helpers
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const startingDayOfWeek = getDay(monthStart)

  const handleServiceSelect = (service: typeof services[0]) => {
    setSelectedService(service)
  }

  const handleDateSelect = (date: Date) => {
    if (isBefore(date, startOfToday())) return
    setSelectedDate(date)
    setSelectedTime(null) // Reset time when date changes
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleContactChange = (field: string, value: string) => {
    setContactInfo({ ...contactInfo, [field]: value })
  }

  const handleContinue = () => {
    if (step === 'service' && selectedService) {
      setStep('datetime')
    } else if (step === 'datetime' && selectedDate && selectedTime) {
      setStep('contact')
    } else if (step === 'contact' && contactInfo.name && contactInfo.phone) {
      onComplete({
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
        contact: contactInfo,
      })
    }
  }

  const handleBack = () => {
    if (step === 'datetime') {
      setStep('service')
    } else if (step === 'contact') {
      setStep('datetime')
    } else {
      onBack()
    }
  }

  const canContinue = () => {
    if (step === 'service') return !!selectedService
    if (step === 'datetime') return !!selectedDate && !!selectedTime
    if (step === 'contact') return !!contactInfo.name && !!contactInfo.phone
    return false
  }

  const steps: { key: BookingStep; label: string }[] = [
    { key: 'service', label: 'Style' },
    { key: 'datetime', label: 'Date & Time' },
    { key: 'contact', label: 'Details' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-lash-black">
      {/* Header */}
      <div className="px-6 pt-14 pb-4">
        <button onClick={handleBack} className="flex items-center gap-2 text-white/60 mb-4">
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6">
          {steps.map((s, index) => (
            <div key={s.key} className="flex items-center">
              <div className={`progress-step ${
                s.key === step ? 'active' : 
                steps.findIndex(st => st.key === step) > index ? 'completed' : ''
              }`}>
                <div className="progress-dot" />
                <span className="text-xs">{s.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`h-px w-8 mx-2 ${
                  steps.findIndex(st => st.key === step) > index 
                    ? 'bg-white/40' 
                    : 'bg-white/10'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 overflow-y-auto pb-32">
        <AnimatePresence mode="wait">
          {/* Step 1: Service Selection */}
          {step === 'service' && (
            <motion.div
              key="service"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h2 className="font-display text-2xl text-white mb-6">SELECT YOUR SERVICE</h2>
              
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className={`service-card w-full text-left ${
                    selectedService?.id === service.id ? 'selected' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-display text-lg text-white mb-1">
                        {service.name}
                      </h3>
                      <p className="text-white/50 text-sm mb-2">
                        {service.description}
                      </p>
                      <p className="text-lash-gold text-sm">
                        {service.duration} • £{service.price}
                      </p>
                    </div>
                    {selectedService?.id === service.id && (
                      <div className="w-6 h-6 rounded-full bg-lash-gold flex items-center justify-center">
                        <Check className="w-4 h-4 text-lash-black" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </motion.div>
          )}

          {/* Step 2: Date & Time Selection */}
          {step === 'datetime' && (
            <motion.div
              key="datetime"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Selected Service Summary */}
              {selectedService && (
                <div className="bg-lash-dark rounded-lg p-4 mb-6 border border-white/10">
                  <p className="text-white/50 text-sm">Booking:</p>
                  <p className="text-white font-medium">{selectedService.name}</p>
                </div>
              )}

              {/* Calendar */}
              <div className="mb-6">
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setCurrentMonth(addDays(currentMonth, -30))}
                    className="text-white/50 hover:text-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h3 className="font-display text-lg text-white">
                    {format(currentMonth, 'MMMM yyyy').toUpperCase()}
                  </h3>
                  <button
                    onClick={() => setCurrentMonth(addDays(currentMonth, 30))}
                    className="text-white/50 hover:text-white rotate-180"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>

                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                    <div key={i} className="text-center text-white/40 text-sm py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Empty cells for days before month starts */}
                  {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                    <div key={`empty-${i}`} className="calendar-day" />
                  ))}
                  
                  {/* Actual days */}
                  {daysInMonth.map((date) => {
                    const isPast = isBefore(date, startOfToday())
                    const isSelected = selectedDate && isSameDay(date, selectedDate)
                    const isTodayDate = isToday(date)

                    return (
                      <button
                        key={date.toISOString()}
                        onClick={() => handleDateSelect(date)}
                        disabled={isPast}
                        className={`calendar-day ${
                          isSelected ? 'selected' : ''
                        } ${isPast ? 'disabled' : ''} ${
                          isTodayDate && !isSelected ? 'today' : ''
                        }`}
                      >
                        {format(date, 'd')}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h4 className="text-white/50 text-sm mb-3">Available times:</h4>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 3: Contact Information */}
          {step === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="font-display text-2xl text-white mb-6">YOUR DETAILS</h2>

              {/* Booking Summary */}
              <div className="bg-lash-dark rounded-lg p-4 mb-6 border border-white/10">
                <p className="text-white font-medium">{selectedService?.name}</p>
                <p className="text-lash-gold text-sm">
                  {selectedDate && format(selectedDate, 'EEEE, MMMM d')} at {selectedTime}
                </p>
              </div>

              {/* Contact Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-white/50 text-sm mb-2">Name *</label>
                  <input
                    type="text"
                    value={contactInfo.name}
                    onChange={(e) => handleContactChange('name', e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-lash-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-lash-gold focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white/50 text-sm mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    placeholder="Your phone number"
                    className="w-full bg-lash-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-lash-gold focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white/50 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    placeholder="Your email (optional)"
                    className="w-full bg-lash-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-lash-gold focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* 11:11 Easter Egg */}
              <p className="text-center text-white/20 text-xs mt-8">✨ You're aligned ✨</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Continue Button - Fixed at bottom */}
      <div className="fixed bottom-20 left-0 right-0 px-6 pb-4 bg-gradient-to-t from-lash-black via-lash-black to-transparent pt-8">
        <button
          onClick={handleContinue}
          disabled={!canContinue()}
          className={`btn-gold w-full ${!canContinue() ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {step === 'contact' ? 'CONFIRM BOOKING' : 'CONTINUE'}
        </button>
      </div>
    </div>
  )
}
