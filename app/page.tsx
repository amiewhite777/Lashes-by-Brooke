'use client'

import { useState } from 'react'
import Hero from '@/components/Hero'
import Gallery from '@/components/Gallery'
import BookingFlow from '@/components/BookingFlow'
import Navigation from '@/components/Navigation'
import Confirmation from '@/components/Confirmation'

export type AppView = 'home' | 'gallery' | 'book' | 'profile' | 'confirmation'

export interface BookingData {
  service: {
    id: string
    name: string
    description: string
    duration: string
    price: number
  } | null
  date: Date | null
  time: string | null
  contact: {
    name: string
    phone: string
    email: string
  } | null
}

export default function Home() {
  const [currentView, setCurrentView] = useState<AppView>('home')
  const [bookingData, setBookingData] = useState<BookingData>({
    service: null,
    date: null,
    time: null,
    contact: null,
  })

  const handleBookingComplete = (data: BookingData) => {
    setBookingData(data)
    setCurrentView('confirmation')
  }

  const handleNewBooking = () => {
    setBookingData({
      service: null,
      date: null,
      time: null,
      contact: null,
    })
    setCurrentView('home')
  }

  return (
    <main className="min-h-screen bg-lash-black">
      {/* 11:11 Watermark */}
      <div className="watermark-1111 top-20 right-4">11:11</div>
      
      {/* Main Content */}
      <div className="pb-20">
        {currentView === 'home' && (
          <Hero 
            onBookClick={() => setCurrentView('book')} 
            onViewStyles={() => setCurrentView('gallery')}
          />
        )}
        
        {currentView === 'gallery' && (
          <Gallery 
            onBookStyle={(serviceId) => {
              // Pre-select the service and go to booking
              const services = [
                { id: 'classic', name: 'Classic Full Set', description: 'Individual application for timeless elegance.', duration: '2 hrs', price: 70 },
                { id: 'hybrid', name: 'Hybrid Set', description: 'Mix of classic and volume for textured dimension.', duration: '2 hrs', price: 70 },
                { id: 'russian', name: 'Russian Volume', description: 'Full, fluffy, and dramatic statement look.', duration: '2.5 hrs', price: 85 },
                { id: 'mega', name: 'Mega Volume', description: 'Maximum drama for bold, glamorous impact.', duration: '3 hrs', price: 95 },
                { id: 'wet', name: 'Wet Look Wispy', description: 'Trendy, textured, editorial aesthetic.', duration: '2.5 hrs', price: 85 },
              ]
              const service = services.find(s => s.id === serviceId)
              if (service) {
                setBookingData({ ...bookingData, service })
              }
              setCurrentView('book')
            }}
          />
        )}
        
        {currentView === 'book' && (
          <BookingFlow 
            initialService={bookingData.service}
            onComplete={handleBookingComplete}
            onBack={() => setCurrentView('home')}
          />
        )}

        {currentView === 'confirmation' && (
          <Confirmation 
            bookingData={bookingData}
            onNewBooking={handleNewBooking}
          />
        )}

        {currentView === 'profile' && (
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="text-center">
              <h2 className="font-display text-3xl text-lash-gold mb-4">COMING SOON</h2>
              <p className="text-white/60">Your profile and booking history</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom Navigation */}
      <Navigation 
        currentView={currentView} 
        onNavigate={setCurrentView} 
      />
    </main>
  )
}
