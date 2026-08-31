import React, { useState, useEffect } from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import { WishlistCompareProvider } from './context/WishlistCompareContext';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import SmoothScrollProvider from './components/SmoothScrollProvider';
import AmbientBackgroundOrbs from './components/AmbientBackgroundOrbs';
import ZajnoMagneticCursor from './components/animations/ZajnoMagneticCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import TourExplorer from './components/TourExplorer';
import TripCustomizerSection from './components/TripCustomizerSection';
import GoogleReviewsSection from './components/GoogleReviewsSection';
import TravelStoriesSection from './components/TravelStoriesSection';
import ServicesSection from './components/ServicesSection';
import AboutUsPage from './components/AboutUsPage';
import WhyChooseUs from './components/WhyChooseUs';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import LandingPageTemplate from './components/LandingPageTemplate';
import LandingPagesHubModal from './components/LandingPagesHubModal';
import BlogMagazinePage from './components/BlogMagazinePage';
import BlogPostReader from './components/BlogPostReader';
import { getLandingPageBySlug, LANDING_PAGES_DATA } from './data/landingPagesData';
import { directusService } from './services/directusClient';
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

import { seoHeadManager } from './utils/seoHeadManager';
import { jsonLdSchemaGenerator } from './utils/jsonLdSchemaGenerator';

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
  const [isLPHubOpen, setIsLPHubOpen] = useState(false);
  const [policyModalType, setPolicyModalType] = useState(null); // 'cancellation' | 'privacy' | 'terms' | null
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'about' | 'landing' | 'magazine' | 'blog-reader'
  const [activeLandingPage, setActiveLandingPage] = useState(null);
  const [activeBlogSlug, setActiveBlogSlug] = useState(null);

  // Inject TouristTrip schema whenever an itinerary is viewed
  useEffect(() => {
    if (selectedItineraryTour) {
      const tourSchema = jsonLdSchemaGenerator.getTouristTripSchema(selectedItineraryTour);
      seoHeadManager.updateMetadata({
        title: `${selectedItineraryTour.name} | Comfort Journey Tour Packages`,
        description: selectedItineraryTour.tagline || `Handcrafted ${selectedItineraryTour.duration} tour to ${selectedItineraryTour.location}.`,
        image: selectedItineraryTour.image,
        url: `/#/tour/${selectedItineraryTour.slug || selectedItineraryTour.id}`,
        type: "product",
        schema: tourSchema
      });
    }
  }, [selectedItineraryTour]);

  // Hash-based URL routing: Directus Blogs, Admin CMS, About Us, Landing Pages, or Tour Details
  useEffect(() => {
    const handleRouteChange = () => {
      const rawHash = window.location.hash;
      const hash = rawHash.toLowerCase();
      
      if (hash === '#/admin' || hash === '#admin') {
        setIsAdminCMSOpen(true);
      } else if (hash === '#/landing-hub' || hash === '#/all-landing-pages' || hash === '#landing-hub') {
        setIsLPHubOpen(true);
      } else if (hash === '#/about' || hash === '#/who-we-are' || hash === '#/about-us' || hash === '#about') {
        setCurrentView('about');
        setActiveLandingPage(null);
        setActiveBlogSlug(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#/blog' || hash === '#/blogs' || hash === '#blog' || hash === '#blogs') {
        setCurrentView('magazine');
        setActiveLandingPage(null);
        setActiveBlogSlug(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        seoHeadManager.updateMetadata({
          title: "Editorial Travel Journal & Luxury Guides | Comfort Journey",
          description: "Explore handcrafted destination guides, luxury stay reviews, and honeymoon tips curated by Comfort Journey since 1992.",
          url: "/#/blog",
          type: "website"
        });
      } else if (hash.startsWith('#/blog/') || hash.startsWith('#blog/')) {
        const slug = rawHash.replace(/^#\/?blog\//, '').trim();
        setActiveBlogSlug(slug);
        setCurrentView('blog-reader');
        setActiveLandingPage(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#/tour/') || hash.startsWith('#tour/') || hash.startsWith('#/package/')) {
        const tourSlug = rawHash.replace(/^#\/?(tour|package)\//, '').trim();
        directusService.fetchTourBySlug(tourSlug).then(matchedTour => {
          if (matchedTour) {
            setSelectedItineraryTour(matchedTour);
          }
        });
      } else {
        // Check if hash matches any of our 15 dedicated Campaign Landing Pages
        const matchedPage = getLandingPageBySlug(hash);
        if (matchedPage) {
          setActiveLandingPage(matchedPage);
          setCurrentView('landing');
          setActiveBlogSlug(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          setCurrentView('home');
          setActiveLandingPage(null);
          setActiveBlogSlug(null);
          // Inject site-wide TravelAgency schema on homepage
          seoHeadManager.updateMetadata({
            schema: jsonLdSchemaGenerator.getTravelAgencySchema()
          });
        }
      }
    };

    // Check on mount (direct URL navigation or ad click)
    handleRouteChange();
    // Listen for hash changes (in-app navigation)
    window.addEventListener('hashchange', handleRouteChange);
    return () => window.removeEventListener('hashchange', handleRouteChange);
  }, []);

  const navigateToLandingPage = (slug) => {
    window.location.hash = `#/landing/${slug}`;
  };

  const navigateToBlog = (slug) => {
    window.location.hash = `#/blog/${slug}`;
  };

  const navigateToMagazine = () => {
    window.location.hash = `#/blog`;
  };

  const navigateToHome = () => {
    history.pushState(null, '', window.location.pathname);
    setCurrentView('home');
    setActiveLandingPage(null);
    setActiveBlogSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
              onOpenLandingHub={() => setIsLPHubOpen(true)}
              onNavigateMagazine={navigateToMagazine}
            />

            {currentView === 'magazine' ? (
              /* DEDICATED BLOG MAGAZINE / JOURNAL VIEW */
              <BlogMagazinePage 
                onNavigateHome={navigateToHome}
                onSelectBlog={navigateToBlog}
                onOpenQuote={() => setIsQuickQuoteOpen(true)}
              />
            ) : currentView === 'blog-reader' && activeBlogSlug ? (
              /* DEDICATED SINGLE BLOG POST READER VIEW */
              <BlogPostReader 
                slug={activeBlogSlug}
                onNavigateHome={navigateToHome}
                onNavigateMagazine={navigateToMagazine}
                onSelectItinerary={(tour) => setSelectedItineraryTour(tour)}
                onBookNow={(tour) => setSelectedBookingTour(tour)}
                onOpenQuote={() => setIsQuickQuoteOpen(true)}
              />
            ) : currentView === 'landing' && activeLandingPage ? (
              /* DEDICATED CAMPAIGN / SEO LANDING PAGE VIEW */
              <LandingPageTemplate 
                pageData={activeLandingPage}
                onBackToHome={navigateToHome}
                onSelectItinerary={(tour) => setSelectedItineraryTour(tour)}
                onBookNow={(tour) => setSelectedBookingTour(tour)}
                onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
                onOpenQuote={() => setIsQuickQuoteOpen(true)}
              />
            ) : currentView === 'about' ? (
              /* DEDICATED ABOUT US / WHO WE ARE PAGE VIEW */
              <AboutUsPage 
                onOpenQuote={() => setIsQuickQuoteOpen(true)}
                onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
                onNavigateHome={navigateToHome}
              />
            ) : (
              /* HOMEPAGE VIEW */
              <>
                {/* 2. In-Place Interactive Hero Studio: "How Do You Want to Travel?" (7 Continents Map, Weather/Season, Travel Styles) */}
                <Hero 
                  onSelectItinerary={(tour) => setSelectedItineraryTour(tour)}
                  onBookNow={(tour) => setSelectedBookingTour(tour)}
                  onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
                  onOpenQuote={() => setIsQuickQuoteOpen(true)}
                />

                {/* 3. Trust & Experience Stats Bar with Anime.js Elastic Counters */}
                <StatsBar />

                {/* 4. Handcrafted Luxury Tour Packages Catalog Explorer with 3D Card Tilt & Seasonal Radar */}
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

                {/* 15. Frequently Asked Questions */}
                <FaqSection />
              </>
            )}

            {/* 16. Global Footer with Trust Policies & Team Portal */}
            <Footer 
              onOpenPolicy={(type) => setPolicyModalType(type)}
              onOpenAdmin={() => setIsAdminCMSOpen(true)}
              onOpenLandingHub={() => setIsLPHubOpen(true)}
              onSelectLandingPage={navigateToLandingPage}
            />

          {/* --- MODALS & OVERLAYS --- */}

          {/* All 15 Campaign & SEO Landing Pages Directory Modal */}
          <LandingPagesHubModal 
            isOpen={isLPHubOpen}
            onClose={() => {
              setIsLPHubOpen(false);
              if (window.location.hash.toLowerCase().includes('landing-hub')) {
                history.replaceState(null, '', window.location.pathname);
              }
            }}
            onSelectLandingPage={navigateToLandingPage}
          />

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
            onClose={() => {
              setIsAdminCMSOpen(false);
              // Clear the #admin hash from URL on close
              if (window.location.hash.toLowerCase().includes('admin')) {
                history.replaceState(null, '', window.location.pathname);
              }
            }}
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

