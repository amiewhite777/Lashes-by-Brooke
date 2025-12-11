# Lashes by Brooke ✨

Premium eyelash extension booking app for Brooke's lash business in Bristol.

**Aesthetic:** Celestial angel numbers (11:11, 222) meets UK drill energy. Heavenly results, London energy.

## Features

- 🏠 **Landing Page** — Bold hero with brand intro and CTAs
- 📸 **Video Gallery** — Swipeable showcase of lash styles with video placeholders
- 📅 **Custom Booking** — Service selection → Date/time picker → Contact form
- ✅ **Confirmation** — Beautiful booking confirmation with angel number Easter eggs
- 📱 **Mobile-First** — Designed for phones, where most clients will browse

## Tech Stack

- **Next.js 14** — React framework with App Router
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling with custom brand theme
- **Framer Motion** — Smooth animations
- **date-fns** — Date handling for calendar
- **Lucide React** — Icons

## Color Palette

- `#0A0A0A` — Lash Black (primary background)
- `#1A1A1A` — Lash Dark (cards, secondary bg)
- `#D4AF37` — Lash Gold (accents, CTAs)
- `#D4A5A5` — Lash Blush (subtle accents)
- `#FFFFFF` — White (text)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### 3. Deploy to Vercel

The easiest way to deploy:

```bash
npx vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

## Customization

### Adding Real Videos/Images

Replace the placeholder gradients in these components:

1. **Hero.tsx** — Update the hero image/video at the top of the landing page
2. **Gallery.tsx** — Add actual video thumbnails for each lash style

### Updating Services & Prices

Edit the `services` array in `/components/BookingFlow.tsx`:

```typescript
const services = [
  { id: 'classic', name: 'CLASSIC FULL SET', description: '...', duration: '2 hrs', price: 70 },
  // Add more services...
]
```

### Updating Time Slots

Edit the `timeSlots` array in `/components/BookingFlow.tsx`:

```typescript
const timeSlots = [
  '9:00 AM', '10:00 AM', // etc.
]
```

### Adding Backend Booking Storage

Currently bookings are client-side only. To persist bookings, add:

1. **Supabase** — Easy setup, generous free tier
2. **Firebase** — Real-time database option
3. **Airtable** — Simple spreadsheet-like backend

## Future Enhancements

- [ ] Email/SMS notifications for bookings
- [ ] Google Calendar integration
- [ ] Client profiles and booking history
- [ ] Admin dashboard for Brooke
- [ ] Deposit payments via Stripe
- [ ] Real video uploads with cloudinary or similar

## File Structure

```
lashes-by-brooke/
├── app/
│   ├── globals.css      # Global styles & brand theme
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main app component
├── components/
│   ├── Hero.tsx         # Landing page hero
│   ├── Gallery.tsx      # Swipeable style gallery
│   ├── BookingFlow.tsx  # Multi-step booking
│   ├── Confirmation.tsx # Booking success screen
│   └── Navigation.tsx   # Bottom nav bar
├── tailwind.config.ts   # Custom theme config
└── package.json
```

---

Built with 💛 for Brooke

*11:11 — It's meant to be* ✨
