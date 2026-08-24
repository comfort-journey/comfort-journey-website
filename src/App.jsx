import React, { useState } from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import { WishlistCompareProvider } from './context/WishlistCompareContext';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import SmoothScrollProvider from './components/SmoothScrollProvider';
import AmbientBackgroundOrbs from './components/AmbientBackgroundOrbs';
import ZajnoMagneticCursor from './components/animations/ZajnoMagneticCursor';
import FlightRouteVisualizer from './components/animations/FlightRouteVisualizer';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import TourExplorer from './components/TourExplorer';
import TripCustomizerSection from './components/TripCustomizerSection';
import GoogleReviewsSection from './components/GoogleReviewsSection';
import TravelStoriesSection from './components/TravelStoriesSection';
import ServicesSection from './components/ServicesSection';
import AboutPromoSection from './components/AboutPromoSection';
import WhyChooseUs from './components/WhyChooseUs';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import ItineraryModal from './components/ItineraryModal';
import QuickBookingModal from './components/QuickBookingModal';
import AITripPlannerModal from './components/AITripPlannerModal';
import WishlistDrawer from './components/WishlistDrawer';
import CompareModal from './components/CompareModal';
import PolicyModal from './components/PolicyModal';
import AdminCMSModal from './components/AdminCMSModal';
import FloatingQuickDock from './components/FloatingQuickDock';
import LiveBookingToast from './components/LiveBookingToast';

export default function App() {
  // Activate high-performance scroll reveals
  useScrollAnimation();

  const [searchFilters, setSearchFilters] = useState({ destination: '', category: 'All' });
  const [selectedItineraryTour, setSelectedItineraryTour] = useState(null);
  const [selectedBookingTour, setSelectedBookingTour] = useState(null);
  const [isQuickQuoteOpen, setIsQuickQuoteOpen] = useState(false);
  const [isAIPlannerOpen, setIsAIPlannerOpen] = useState(false);
  const [isAdminCMSOpen, setIsAdminCMSOpen] = useState(false);
  const [policyModalType, setPolicyModalType] = useState(null); // 'cancellation' | 'privacy' | 'terms' | null

  return (
    <CurrencyProvider>
      <WishlistCompareProvider>
        <SmoothScrollProvider>
          {/* Zajno Magnetic Cursor Follower */}
          <ZajnoMagneticCursor />

          {/* Ambient Parallax Gradient Orbs */}
          <AmbientBackgroundOrbs />

          <div className="app-root">
            {/* 1. Header Navigation with Currency Switcher & AI Trigger */}
            <Navbar 
              onOpenQuote={() => setIsQuickQuoteOpen(true)} 
              onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
              onOpenAdmin={() => setIsAdminCMSOpen(true)}
            />

            {/* 2. Next-Gen Cinematic Hero ("YOUR JOURNEY YOUR COMFORT") with Vanta Sky Canvas */}
            <Hero 
              onSearch={(filters) => setSearchFilters(filters)} 
              onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
            />

            {/* 3. Trust & Experience Stats Bar with Anime.js Elastic Counters */}
            <StatsBar />

            {/* 4. Handcrafted Luxury Tour Packages Explorer with 3D Card Tilt */}
            <TourExplorer 
              searchFilters={searchFilters} 
              onSelectItinerary={(tour) => setSelectedItineraryTour(tour)}
              onBookNow={(tour) => setSelectedBookingTour(tour)}
              onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
            />

            {/* 5. SVGator Real-Time Vector Flight Routes & Global Radar */}
            <FlightRouteVisualizer 
              onSelectRoute={(route) => {
                setSearchFilters({ destination: route.name.split(' ')[0], category: 'All' });
              }}
              onOpenQuote={() => setIsQuickQuoteOpen(true)}
            />

            {/* 6. Interactive Trip Studio & Live Price Estimator */}
            <TripCustomizerSection />

            {/* 7. Dedicated Verified Google Reviews Section (4.8★ Rating / 85+ Real Reviews) */}
            <GoogleReviewsSection 
              onOpenQuote={() => setIsQuickQuoteOpen(true)}
            />

            {/* 8. Traveler Instagram Reels & Live Video Stories with 3D Tilt */}
            <TravelStoriesSection 
              onOpenQuote={() => setIsQuickQuoteOpen(true)} 
            />

            {/* 8. What We Do (Services) */}
            <ServicesSection 
              onOpenQuote={() => setIsQuickQuoteOpen(true)} 
            />

            {/* 9. Why Choose Comfort Journey (7 Pillars with 3D Tilt) */}
            <WhyChooseUs onOpenAIPlanner={() => setIsAIPlannerOpen(true)} />

            {/* 10. About Us ("WE MAKE YOUR TRIPS UNFORGOTTABLE" - Est. 1992) */}
            <AboutPromoSection 
              onOpenQuote={() => setIsQuickQuoteOpen(true)} 
            />

            {/* 11. Frequently Asked Questions */}
            <FaqSection />

            {/* 12. Global Footer with Trust Policies & Team Portal */}
            <Footer 
              onOpenPolicy={(type) => setPolicyModalType(type)}
              onOpenAdmin={() => setIsAdminCMSOpen(true)}
            />

          {/* --- MODALS & OVERLAYS --- */}

          {/* Day-by-Day Detailed Itinerary Modal */}
          {selectedItineraryTour && (
            <ItineraryModal 
              tour={selectedItineraryTour} 
              onClose={() => setSelectedItineraryTour(null)} 
              onBookTour={(tour) => setSelectedBookingTour(tour)}
            />
          )}

          {/* Quick Quote / Booking Modal */}
          {(selectedBookingTour || isQuickQuoteOpen) && (
            <QuickBookingModal 
              selectedTour={selectedBookingTour} 
              onClose={() => {
                setSelectedBookingTour(null);
                setIsQuickQuoteOpen(false);
              }} 
            />
          )}

          {/* Interactive AI Smart Dream Trip Planner */}
          {isAIPlannerOpen && (
            <AITripPlannerModal 
              onClose={() => setIsAIPlannerOpen(false)}
              onBookCustomTrip={(plan) => {
                setIsAIPlannerOpen(false);
                setIsQuickQuoteOpen(true);
              }}
            />
          )}

          {/* Saved Wishlist Drawer */}
          <WishlistDrawer 
            onSelectItinerary={(tour) => setSelectedItineraryTour(tour)}
            onBookTour={(tour) => setSelectedBookingTour(tour)}
          />

          {/* Side-by-Side Tour Comparison Modal */}
          <CompareModal 
            onSelectItinerary={(tour) => setSelectedItineraryTour(tour)}
            onBookTour={(tour) => setSelectedBookingTour(tour)}
          />

          {/* Trust Policies & Terms Modal */}
          <PolicyModal 
            type={policyModalType}
            isOpen={Boolean(policyModalType)}
            onClose={() => setPolicyModalType(null)}
          />

          {/* Marketing Team CMS, Blog Publisher & SEO Studio */}
          <AdminCMSModal 
            isOpen={isAdminCMSOpen}
            onClose={() => setIsAdminCMSOpen(false)}
          />

          {/* Floating Glassmorphism Action Dock */}
          <FloatingQuickDock 
            onOpenQuote={() => setIsQuickQuoteOpen(true)} 
            onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
          />

          {/* Live Booking Social Proof Ticker */}
          <LiveBookingToast />

          <style>{`
            .app-root {
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              background-color: var(--cj-navy-950, #001233);
              position: relative;
            }
          `}</style>
        </div>
        </SmoothScrollProvider>
      </WishlistCompareProvider>
    </CurrencyProvider>
  );
}
