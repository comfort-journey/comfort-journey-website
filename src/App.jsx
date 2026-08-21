import React, { useState } from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import { WishlistCompareProvider } from './context/WishlistCompareContext';
import SmoothScrollProvider from './components/SmoothScrollProvider';
import AmbientBackgroundOrbs from './components/AmbientBackgroundOrbs';
import { useLuxuryAnimationSuite } from './hooks/useLuxuryAnimationSuite';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import TourExplorer from './components/TourExplorer';
import TripCustomizerSection from './components/TripCustomizerSection';
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
  // Activate luxury animation physics (Spotlight, Scroll Reveals, 3D Tilt, Magnetic CTAs)
  useLuxuryAnimationSuite();

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
          <div className="app-root">
            {/* Ambient Background Gradient Orbs (Fixed Parallax) */}
            <AmbientBackgroundOrbs />

            {/* 1. Header Navigation with Currency Switcher & AI Trigger */}
            <Navbar 
              onOpenQuote={() => setIsQuickQuoteOpen(true)} 
              onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
              onOpenAdmin={() => setIsAdminCMSOpen(true)}
            />

          {/* 2. Next-Gen Cinematic Hero ("YOUR JOURNEY YOUR COMFORT") */}
          <Hero 
            onSearch={(filters) => setSearchFilters(filters)} 
            onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
          />

          {/* 3. Trust & Experience Stats Bar */}
          <StatsBar />

          {/* 4. Handcrafted Luxury Tour Packages Explorer */}
          <TourExplorer 
            searchFilters={searchFilters} 
            onSelectItinerary={(tour) => setSelectedItineraryTour(tour)}
            onBookNow={(tour) => setSelectedBookingTour(tour)}
            onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
          />

          {/* 5. Interactive Trip Studio & Live Price Estimator */}
          <TripCustomizerSection />

          {/* 6. Traveler Video Stories, Reels & Verified Google Reviews */}
          <TravelStoriesSection 
            onOpenQuote={() => setIsQuickQuoteOpen(true)} 
          />

          {/* 7. What We Do (Services) */}
          <ServicesSection 
            onOpenQuote={() => setIsQuickQuoteOpen(true)} 
          />

          {/* 8. Why Choose Comfort Journey */}
          <WhyChooseUs />

          {/* 9. About Us ("WE MAKE YOUR TRIPS UNFORGOTTABLE" - Est. 1992) */}
          <AboutPromoSection 
            onOpenQuote={() => setIsQuickQuoteOpen(true)} 
          />

          {/* 10. Frequently Asked Questions */}
          <FaqSection />

          {/* 11. Global Footer with Trust Policies & Team Portal */}
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
              background-color: #070B14;
            }
          `}</style>
        </div>
        </SmoothScrollProvider>
      </WishlistCompareProvider>
    </CurrencyProvider>
  );
}
