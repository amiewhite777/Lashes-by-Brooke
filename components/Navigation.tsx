'use client'

import { Home, Image, Calendar, User } from 'lucide-react'
import type { AppView } from '@/app/page'

interface NavigationProps {
  currentView: AppView
  onNavigate: (view: AppView) => void
}

const navItems: { view: AppView; icon: typeof Home; label: string }[] = [
  { view: 'home', icon: Home, label: 'Home' },
  { view: 'gallery', icon: Image, label: 'Gallery' },
  { view: 'book', icon: Calendar, label: 'Book' },
  { view: 'profile', icon: User, label: 'Profile' },
]

export default function Navigation({ currentView, onNavigate }: NavigationProps) {
  // Don't show nav on confirmation screen
  if (currentView === 'confirmation') return null

  return (
    <nav className="nav-bar">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map(({ view, icon: Icon, label }) => (
          <button
            key={view}
            onClick={() => onNavigate(view)}
            className={`nav-item ${currentView === view ? 'active' : ''}`}
          >
            <Icon className="w-5 h-5" strokeWidth={currentView === view ? 2 : 1.5} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
