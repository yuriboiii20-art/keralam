import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Sparkles } from 'lucide-react';

import CustomCursor from './components/CustomCursor';
import FloatingBackground from './components/FloatingBackground';
import ScrollProgress from './components/ScrollProgress';
import IntroLoader from './components/IntroLoader';
import EnquiryPopup from './components/EnquiryPopup';
import AIChatbot from './components/AIChatbot';
import RouteScroll from './components/RouteScroll';
const AdminCMSModal = import.meta.env.DEV ? lazy(() => import('./components/AdminCMSModal')) : null;
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import RoomModal from './components/RoomModal';

// Code-Split Page Components via React.lazy()
const Home = lazy(() => import('./pages/Home'));
const RoomsPage = lazy(() => import('./pages/RoomsPage'));
const FoodMenuPage = lazy(() => import('./pages/FoodMenuPage'));
const AmenitiesPage = lazy(() => import('./pages/AmenitiesPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const LocationsPage = lazy(() => import('./pages/LocationsPage'));
const CityDetailsPage = lazy(() => import('./pages/CityDetailsPage'));
const GuidelinesPage = lazy(() => import('./pages/GuidelinesPage'));
const MoveInPage = lazy(() => import('./pages/MoveInPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));

// Fallback Loader for Route Transitions
function PageFallback() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center pt-32 pb-20">
      <div className="w-14 h-14 rounded-2xl bg-[#D4A64A]/20 border border-[#D4A64A]/40 text-[#D4A64A] flex items-center justify-center animate-bounce mb-3 shadow-[0_0_25px_rgba(212,166,74,0.4)]">
        <Sparkles className="w-7 h-7" />
      </div>
      <p className="text-xs font-mono uppercase text-[#D4A64A] tracking-wider animate-pulse">
        Loading Sanctuary...
      </p>
    </div>
  );
}

function AnimatedRoutes({ onOpenBooking, onSelectRoom }) {
  const location = useLocation();

  // Dynamic SEO Page Title update on route change
  useEffect(() => {
    const titles = {
      '/': 'Aafa Coliving | Premium PG in Jigani near HCL Gate Bengaluru',
      '/rooms': 'Rooms & Pricing | 1BHK, 2BHK & Daily Stay ₹499/day — Aafa Coliving',
      '/food-menu': 'Weekly Homestyle Kerala Food Menu Schedule — Aafa Coliving',
      '/menu': 'Weekly Homestyle Kerala Food Menu Schedule — Aafa Coliving',
      '/amenities': 'Zero-Gravity Amenities | Wi-Fi, Generator & Kerala Mess — Aafa',
      '/gallery': 'Virtual Campus Photo Gallery | Bedrooms & Lounge — Aafa Coliving',
      '/reviews': 'Verified Google Resident Reviews & Ratings — Aafa Coliving',
      '/about': 'Our Story & Community Culture — Aafa Coliving Jigani',
      '/blog': 'Life at Aafa & Jigani Relocation Guide — Aafa Coliving Blog',
      '/contact': 'Contact Hotlines, Address & Directions near HCL Gate — Aafa Coliving',
      '/locations': 'Pan-India Locations & Expansion Map — Aafa Coliving',
      '/guidelines': 'House Guidelines & Resident Rules — Aafa Coliving',
      '/move-in': 'Move-In Process & Required Documents Checklist — Aafa Coliving',
      '/careers': 'Partner With Us & Property Franchise Portal — Aafa Group',
    };
    document.title = titles[location.pathname] || 'Aafa Coliving | PG in Jigani Bengaluru';
  }, [location.pathname]);

  return (
    <Suspense fallback={<PageFallback />}>
      <RouteScroll />
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home onOpenBooking={onOpenBooking} />} />
          <Route
            path="/rooms"
            element={
              <RoomsPage
                onOpenBooking={onOpenBooking}
                onSelectRoom={onSelectRoom}
              />
            }
          />
          <Route path="/food-menu" element={<FoodMenuPage onOpenBooking={onOpenBooking} />} />
          <Route path="/menu" element={<FoodMenuPage onOpenBooking={onOpenBooking} />} />
          <Route path="/amenities" element={<AmenitiesPage onOpenBooking={onOpenBooking} />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/locations/:citySlug" element={<CityDetailsPage onOpenBooking={onOpenBooking} />} />
          <Route path="/guidelines" element={<GuidelinesPage />} />
          <Route path="/move-in" element={<MoveInPage onOpenBooking={onOpenBooking} />} />
          <Route path="/careers" element={<CareersPage />} />
        </Routes>

    </Suspense>
  );
}

export default function App() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingRoomTitle, setBookingRoomTitle] = useState('');
  const [isEnquiryPopupOpen, setIsEnquiryPopupOpen] = useState(false);
  const [isAdminCMSOpen, setIsAdminCMSOpen] = useState(false);



  const handleOpenBooking = (roomTitle = '') => {
    setBookingRoomTitle(roomTitle);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setBookingRoomTitle('');
  };

  return (
    <MotionConfig reducedMotion="user">
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#0B1220] text-[#FAF7F0] selection:bg-[#D4A64A]/30 selection:text-[#FAF7F0] overflow-x-clip">

        {/* Intro Loading Screen */}
        <IntroLoader />

        {/* Top Scroll Progress Line */}
        <ScrollProgress />

        {/* Custom Spring Reactive Cursor & Trail */}
        <CustomCursor />

        {/* Ambient Fluid Background */}
        <FloatingBackground />

        {/* Floating Header Navbar */}
        <Navbar onOpenBooking={() => handleOpenBooking()} />

        {/* Code-Split Animated Routes */}
        <main className="relative z-10">
          <AnimatedRoutes
            onOpenBooking={handleOpenBooking}
            onSelectRoom={(room) => setSelectedRoom(room)}
          />
        </main>

        {/* Modals & Popups */}
        <RoomModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onBookNow={(title) => handleOpenBooking(title)}
        />

        <BookingModal
          isOpen={isBookingOpen}
          onClose={handleCloseBooking}
          initialRoomTitle={bookingRoomTitle}
        />

        <EnquiryPopup
          isOpen={isEnquiryPopupOpen}
          onClose={() => setIsEnquiryPopupOpen(false)}
        />

        {/* Admin Live CMS Drawer Modal */}
        {import.meta.env.DEV && <Suspense fallback={null}><AdminCMSModal
          isOpen={isAdminCMSOpen}
          onClose={() => setIsAdminCMSOpen(false)}
        /></Suspense>}

        {/* Floating AI Chatbot Concierge */}
        <AIChatbot onOpenBooking={() => handleOpenBooking()} />

        {/* Footer */}
        <Footer
          onOpenBooking={() => handleOpenBooking()}
          onOpenAdminCMS={() => setIsAdminCMSOpen(true)}
        />

      </div>
    </BrowserRouter>
    </MotionConfig>
  );
}
