import React, { useState } from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import { WishlistCompareProvider } from './context/WishlistCompareContext';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import SmoothScrollProvider from './components/SmoothScrollProvider';
import AmbientBackgroundOrbs from './components/AmbientBackgroundOrbs';
import ZajnoMagneticCursor from './components/animations/ZajnoMagneticCursor';
import NaviCompassKeeper3D from './components/animations/NaviCompassKeeper3D';
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
import PackageTierCompareModal from './components/PackageTierCompareModal';
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
  const [tierCompareTour, setTierCompareTour] = useState(null);
  const [isTierCompareOpen, setIsTierCompareOpen] = useState(false);
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

            {/* 4. Handcrafted Luxury Tour Packages Explorer with 3D Card Tilt & Seasonal Radar */}
            <TourExplorer 
              searchFilters={searchFilters} 
              onSelectItinerary={(tour) => setSelectedItineraryTour(tour)}
              onBookNow={(tour) => setSelectedBookingTour(tour)}
              onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
              onOpenTierCompare={(tour) => {
                setTierCompareTour(tour);
                setIsTierCompareOpen(true);
              }}
            />

            {/* 5. Interactive Trip Studio & Live Price Estimator */}
            <TripCustomizerSection />

            {/* 10. Dedicated Verified Google Reviews Section (4.8★ Rating / 85+ Real Reviews) */}
            <GoogleReviewsSection 
              onOpenQuote={() => setIsQuickQuoteOpen(true)}
            />

            {/* 11. Traveler Instagram Reels & Live Video Stories with 3D Tilt */}
            <TravelStoriesSection 
              onOpenQuote={() => setIsQuickQuoteOpen(true)} 
            />

            {/* 12. What We Do (Services) */}
            <ServicesSection 
              onOpenQuote={() => setIsQuickQuoteOpen(true)} 
            />

            {/* 13. Why Choose Comfort Journey (7 Pillars with 3D Tilt) */}
            <WhyChooseUs onOpenAIPlanner={() => setIsAIPlannerOpen(true)} />

            {/* 14. About Us ("WE MAKE YOUR TRIPS UNFORGOTTABLE" - Est. 1992) */}
            <AboutPromoSection 
              onOpenQuote={() => setIsQuickQuoteOpen(true)} 
            />

            {/* 15. Frequently Asked Questions */}
            <FaqSection />

            {/* 16. Global Footer with Trust Policies & Team Portal */}
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
              onOpenTierCompare={(tour) => {
                setTierCompareTour(tour);
                setIsTierCompareOpen(true);
              }}
              onOpenReadiness={(dest) => setReadinessDestKey(dest)}
            />
          )}

          {/* Quick Quote / 5-Step Booking Modal */}
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
              isOpen={isAIPlannerOpen}
              onClose={() => setIsAIPlannerOpen(false)}
              onSelectTour={(tour) => {
                setIsAIPlannerOpen(false);
                setSelectedItineraryTour(tour);
              }}
              onBookCustomTrip={(plan) => {
                setIsAIPlannerOpen(false);
                setIsQuickQuoteOpen(true);
              }}
            />
          )}

          {/* Package Tier Comparison Modal (Standard vs Premium vs VIP) */}
          <PackageTierCompareModal
            isOpen={isTierCompareOpen}
            onClose={() => {
              setIsTierCompareOpen(false);
              setTierCompareTour(null);
            }}
            selectedTour={tierCompareTour}
            onOpenQuote={() => {
              setIsTierCompareOpen(false);
              setIsQuickQuoteOpen(true);
            }}
          />

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

          {/* Navi, The 3D Compass Keeper Concierge (120+ FPS Cursor Look-At Gaze) */}
          <NaviCompassKeeper3D 
            onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
            onOpenQuote={() => setIsQuickQuoteOpen(true)}
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

