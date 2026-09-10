# 🏢 Aafa Coliving — Premium PG & Coliving Web Application

[![Live Demo](https://img.shields.io/badge/Live%20Demo-aafa--coliving.vercel.app-gold?style=for-the-badge&logo=vercel)](https://aafa-coliving.vercel.app/)
[![React 19](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2.1-purple?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> **Aafa Coliving** is a state-of-the-art, antigravity glassmorphic web application built for Aafa Coliving & Rooms — Jigani’s premier coliving space located just **300 meters (2-minute walk) from HCL Gate**, Bengaluru. 

🌐 **Live Website**: [https://aafa-coliving.vercel.app/](https://aafa-coliving.vercel.app/)

---

## 🌟 Key Application Features

### 🌌 1. Signature Antigravity Design & 3D Visual System
- **Deep Space Navy & Warm Gold System**: Tailored HSL dark color scheme (`#0B1220` Navy background, `#D4A64A` Gold accents, `#FAF7F0` Coconut White text).
- **3D Extruded Logo Component (`Aafa3DLogo.jsx`)**: Custom house roof + "A" geometry extruded using Three.js `THREE.Shape()` with physical gold reflective material (`MeshPhysicalMaterial`), mouse parallax tilt, and mobile fallback.
- **Hero 3D Parallax Showcase (`Hero3DCanvas.jsx`)**: Orbiting 3D gold torus rings (`TorusGeometry`), distorted metallic glass orb (`MeshDistortMaterial`), particle dust (`ThreeSparkles`), and floating satellite badges.
- **Spring Reactive Custom Cursor (`CustomCursor.jsx`)**: Magnetic gold follower ring with smooth physics spring physics.

### 🤖 2. Gemini AI Concierge Chatbot (`AIChatbot.jsx`)
- **Google Gemini API Integration**: Disabled in the browser; the concierge uses local answers. Any future AI integration must keep credentials on a server with rate limiting.
- **Master Knowledge Training**: Trained on all campus specifications, room pricing, 5-step move-in onboarding, weekly Kerala menu, women's safety, and escalation rules.
- **Smart Local Fallback**: Guaranteed 100% offline response generator if API quotas are exceeded.

### 📱 3. Automated WhatsApp Booking Dispatch (`BookingModal.jsx`)
- **Instant Background Dispatch**: Formats guest details (Name, 10-digit Phone, Selected Room Plan, Move-In Date) and generates a reference code (`AAFA-BKG-XXXXXX`).
- **Structured Booking Receipt**: Confetti celebration + live status badge (`⚡ Automated WhatsApp Confirmation Sent`).
- **1-Click Pre-filled WhatsApp Button**: Direct fallback button (`https://wa.me/918747049377?...`) pre-filled with the exact reservation summary.

### 🍱 4. Day-by-Day Kerala Food Menu (`FoodMenuPage.jsx`)
- **Card-Based Meal Containers**: Floating glassmorphic cards for Breakfast, Lunch, and Dinner with nutritional tags.
- **Day Filter Tabs**: Switch between `Full Week Schedule` or individual days (`MONDAY` through `SUNDAY`).
- **Mess Serving Hours**: Clear timing breakdown for Breakfast, Lunch, Evening Snacks (Pazham Pori & Filter Coffee), and Dinner.
- **100% High-Res Dish Photography**: Curated Unsplash dish photography with click-to-enlarge lightbox modal.

### 🌆 5. Pan-India Expansion & Location Imagery (`locationsData.js`)
- **Location-Tailored Photography**: High-res imagery for Bengaluru (Jigani), Pune (Hinjewadi), Mumbai (BKC), Delhi NCR (Cyber City), Chennai (OMR), and Kerala (Kochi Infopark).
- **Pre-Launch Waitlist Lead Capture**: Priority notification form generating investor-ready lead data for upcoming campuses.

### 🔒 6. Client Admin Live CMS Drawer (`AdminCMSModal.jsx`)
- **No-Code Live Editor**: Accessible via **"Admin CMS Edit 🔒"** in the Footer.
- **Instant Live Updates**: Allows property managers to edit room rates and weekly food schedule live. Development-only preview editor; excluded from production. A shared production CMS requires server-side authentication and authorization.

### ♿ 7. Accessibility & SEO Compliance
- **Keyboard Navigation Focus Rings**: Visible `:focus-visible` gold rings (`outline: 2px solid #D4A64A`).
- **ESLint JSX-A11y Plugin**: Configured accessibility rules catching missing alt text and unlabelled controls.
- **Schema.org Structured Data**: Injected `LodgingBusiness` JSON-LD schema into `index.html`.
- **Route Code-Splitting**: All 14 routes loaded asynchronously via `React.lazy()` + `<Suspense>`.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Core Framework** | React 19.2, React Router DOM 7.1, Vite 8.2 |
| **Styling** | Vanilla CSS Tokens, Tailwind CSS v4 (`@tailwindcss/vite`) |
| **3D & Graphics** | Three.js, React Three Fiber, React Three Drei |
| **Animations** | Framer Motion 13, GSAP 3.15, Canvas Confetti |
| **Form Handling** | React Hook Form 7.85 |
| **Icons & Media** | Lucide React 1.31, Custom Inline Brand SVGs |
| **AI Integration** | Google Gemini REST API (`gemini-1.5-flash`) |
| **Quality & Linting**| ESLint 9, `eslint-plugin-jsx-a11y`, Oxlint |

---

## 📂 Project Structure

```
Aafa Coliving/
├── public/
├── index.html
├── src/
│   ├── components/
│   │   ├── Aafa3DLogo.jsx        # 3D Extruded Gold House Roof + "A" Logo
│   │   ├── AdminCMSModal.jsx     # Client Admin Live CMS Editor Drawer
│   │   ├── AIChatbot.jsx         # Gemini AI Concierge Floating Chatbot
│   │   ├── BookingModal.jsx      # Automated WhatsApp Reservation Modal
│   │   ├── CustomCursor.jsx      # Antigravity Magnetic Gold Cursor
│   │   ├── EnquiryPopup.jsx      # In-Person Walkthrough Booking Popup
│   │   ├── FloatingBackground.jsx# Ambient Radial Particle Mesh
│   │   ├── FloatingWidget.jsx    # Sticky Bottom-Right WhatsApp Hotlines
│   │   ├── Footer.jsx            # Responsive Footer + Map + Social Icons
│   │   ├── Hero3DCanvas.jsx      # 3D Torus Ring Orbit + Interior Parallax
│   │   ├── IntroLoader.jsx       # 2.4s Opening Brand Loader
│   │   ├── Navbar.jsx            # Accordion Mobile & Desktop Dropdowns
│   │   ├── PageTransition.jsx    # Smooth Framer Motion Route Wrapper
│   │   ├── PriceCalculator.jsx   # Interactive Monthly Budget Estimator
│   │   ├── RoomModal.jsx         # Detailed Room Specs Lightbox
│   │   └── ScrollProgress.jsx    # Glowing Gold Top Scroll Progress Line
│   ├── data/
│   │   └── locationsData.js      # Pan-India Multi-City Config Array
│   ├── pages/
│   │   ├── AboutPage.jsx         # Founding Story & Culture
│   │   ├── AmenitiesPage.jsx     # 12 Campus Feature Cards
│   │   ├── BlogPage.jsx          # Jigani Relocation & Lifestyle Guides
│   │   ├── CareersPage.jsx       # Landlord Property Partner Portal
│   │   ├── CityDetailsPage.jsx   # Dynamic City Page (/locations/:citySlug)
│   │   ├── ContactPage.jsx       # Interactive Maps & Contact Hotlines
│   │   ├── FoodMenuPage.jsx      # Day-by-Day Card Menu & Timing Schedule
│   │   ├── GalleryPage.jsx       # Campus Photo Gallery Grid
│   │   ├── GuidelinesPage.jsx    # Resident House Rules & Timings
│   │   ├── Home.jsx              # Overhauled Hero, Hotspots & Stats Bar
│   │   ├── LocationsPage.jsx     # Pan-India Overview Grid & Waitlist
│   │   ├── MoveInPage.jsx        # 4-Step Onboarding & Document Checklist
│   │   ├── ReviewsPage.jsx       # Verified Google ⭐ 4.9 Resident Reviews
│   │   └── RoomsPage.jsx         # 1BHK, 2BHK, Single & ₹499/day Stays
│   ├── App.jsx                   # Main Router, Code-Split Lazy Imports
│   ├── index.css                 # Master Design System Tokens & A11y
│   └── main.jsx                  # Application Mount Point
├── .env                          # Gemini API Key Config
├── eslint.config.js              # ESLint JSX-A11y Rules
└── package.json
```

---

## ⚡ Getting Started Locally

### 1. Prerequisites
Ensure you have **Node.js (v18+)** and **npm** installed on your system.

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/aafa-coliving.git
cd "Aafa Coliving"
npm install
```

### 3. Environment Setup
No environment file is required for the local concierge. Never put secret credentials in `VITE_*` variables:

```env
# No browser API credentials are needed.
```

### 4. Run Development Server
Start the local Vite development server:

```bash
npm run dev
```

Open your browser at `http://localhost:5173/` (or the displayed port).

### 5. Production Build
Validate and compile the production bundle:

```bash
npm run build
```

---

## 🚀 Deployment

This application is optimized for zero-config deployment on **Vercel** or **Netlify**:

```bash
npm run build
```

The output build directory is `dist/`.

---

## 📍 Campus Location & Direct Contact Hotlines

- 📍 **Address**: In front of Meghana Gents & Ladies PG, Sannidhi Layout, 2, Bande Nalla Sandra Rd, near HCL Gate, Jigani, Bengaluru, Karnataka 560105
- 🚶 **Distance**: 300 meters (2-minute walk) from HCL Gate in Jigani
- 📞 **Direct Hotlines**:
  - `+91 87470 49377`
  - `+91 96861 93084`
  - `+91 97456 88880`
  - `099000 82615`
- ⏰ **Desk Hours**: Open All Days, 7:00 AM – 11:00 PM
- 🌐 **Live Website**: [https://aafa-coliving.vercel.app/](https://aafa-coliving.vercel.app/)

---

© 2026 Aafa Coliving Group. All Rights Reserved.

## Scrolling and deployment security

Scrolling uses native browser behavior, reduced-motion preferences, frame-batched progress updates, and shared overlay scroll locks. New routes start at the top; browser Back/Forward restores positions within the current session. Route wrappers avoid transforms so fixed lightboxes remain attached to the viewport.

Booking details are held in memory rather than saved to local storage. External windows use opener isolation. The browser AI key integration is disabled; local concierge answers remain available. If a key was previously deployed, revoke it in the provider console. Existing browser booking history from earlier releases is not automatically deleted.

Vercel uses `vercel.json`; Netlify uses `public/_headers` and `public/_redirects`. Other hosts must configure equivalent response headers and SPA routing. Verify headers on the deployed domain. The CSP permits the existing Google fonts/maps and Unsplash images; review it when adding integrations. Inline script hashes must be regenerated if the structured data in `index.html` changes.

Browser regression checks: with the dev server running, set `PUPPETEER_MODULE` to an installed puppeteer-core module entry file and `CHROME_PATH` to a Chrome executable, then run `node scripts/check-scrolling.mjs`. `TEST_URL` optionally overrides the localhost URL. The checks block external requests for deterministic scroll/layout assertions; verify third-party assets separately on deployment.
