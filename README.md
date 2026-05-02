# Jade Theme - Mobile-First Wedding Invitation

A premium, interactive, mobile-first wedding invitation web application. Designed to deliver an immersive and tactile experience, including a 3D animated envelope opening sequence and a scratch-to-reveal date card.

## 🚀 Core Technologies
- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS + Radix UI (shadcn/ui base)
- **Animations:** 
  - Framer Motion (for smooth UI transitions & overlays)
  - GSAP & ScrollTrigger (for scroll-based parallax and entry animations)
- **Forms & Validation:** react-hook-form + zod
- **Icons:** lucide-react

## 🧠 Architecture & Logic Flow

### 1. Device Enforcement
The application is strictly designed for **mobile experiences**. 
- In `App.tsx`, a desktop blocker overlay (`hidden md:flex`) ensures that users opening the link on large screens are prompted to switch to their smartphones for the intended experience.

### 2. Envelope Intro Sequence (`EnvelopeOpening.tsx`)
- Acts as a full-screen `z-[100]` overlay on initial load.
- Uses `framer-motion` for a complex, 3D interactive sequence where a virtual envelope with a wax seal is manually opened. 
- Once the envelope animation is completed, it triggers a callback (`handleEnvelopeComplete`) which unmounts the envelope component, smoothly revealing the main landing page underneath.

### 3. Main Content Rendering (`LandingPage.tsx`)
- After the envelope overlay disappears, the user interacts with the `LandingPage`.
- `LandingPage` orchestrates several modular sections. It uses GSAP's `ScrollTrigger` to apply fade-in and slide-up animations to each section as it enters the viewport.

## 📂 Code File Structure

```text
src/
├── App.tsx                    # Main entry, handles Mobile Blocker & Envelope vs. LandingPage state
├── main.tsx                   # React DOM root render
├── index.css                  # Global Tailwind imports & custom utilities
├── App.css                    # Legacy/Additional custom CSS
├── lib/                       # Utility functions (e.g., tailwind merge `cn`)
├── components/                
│   └── ui/                    # Reusable shadcn/ui components (buttons, dialogs, forms, etc.)
└── sections/                  # Core application modules (The Invitation Pages)
    ├── EnvelopeOpening.tsx    # 3D interactive envelope opening animation
    ├── LandingPage.tsx        # Scroll orchestrator containing all sections below
    ├── HeroSection.tsx        # Hero banner with couple's names & background
    ├── DateSection.tsx        # Interactive "scratch-to-reveal" calendar date
    ├── LetterSection.tsx      # Expanding/unfolding letter content
    ├── ScheduleSection.tsx    # Timeline of wedding events
    ├── VenueSection.tsx       # Venue details, address, and map integrations
    ├── DressCodeSection.tsx   # Dress code guidelines & image references
    ├── RSVPSection.tsx        # Form to collect guest attendance & details
    └── FooterSection.tsx      # Closing remarks & decorative footer
```

## 🖼️ Image & Asset References (Public Directory)

The `public/` folder contains all static media essential to the theme:

**Envelope Animation Assets:**
- `blue_envelope.png` / `.webp` - Main envelope body.
- `envelop_new.png`, `blue_envelope2.png` - Flaps and envelope layering details.
- `logo.png` / `seal.png` - The wax seal placed on the envelope.
- `closed.png` / `opened.png` - State representations.

**Content & Decor:**
- `hero-bg.jpg` - Background image for the Hero Section.
- `couple.jpg` / `couple_placeholder.png` - Photos of the couple.
- `Cloud_1.png` / `.webp` - Decorative floating elements used in parallax sections.
- `blue_heart.png`, `white flower.webp` - Micro-decorations.
- `venue.jpg` - Image of the wedding location.

**Dress Code Gallery:**
- `dress1.jpg`, `dress2.jpg`, `dress3.jpg`, `dress4.jpg` - Visual examples for the required attire.

**Media:**
- `starter_video.mp4` - Video assets used in immersive sections.

## 🛠️ Setup & Development

**Install Dependencies:**
```bash
npm install
```

**Run Development Server:**
```bash
npm run dev
```

**Build for Production:**
```bash
npm run build
```
