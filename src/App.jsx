import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import { WishlistCompareProvider } from './context/WishlistCompareContext';
import { UserAuthProvider } from './context/UserAuthContext';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import SmoothScrollProvider from './components/SmoothScrollProvider';
import AmbientBackgroundOrbs from './components/AmbientBackgroundOrbs';
import ZajnoMagneticCursor from './components/animations/ZajnoMagneticCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import TripCustomizerSection from './components/TripCustomizerSection';
import GoogleReviewsSection from './components/GoogleReviewsSection';
import TravelStoriesSection from './components/TravelStoriesSection';
const AboutUsPage = lazy(() => import('./components/AboutUsPage'));
import WhyChooseUs from './components/WhyChooseUs';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import LandingPageTemplate from './components/LandingPageTemplate';
import LandingPagesHubModal from './components/LandingPagesHubModal';
const BlogMagazinePage = lazy(() => import('./components/BlogMagazinePage'));
const BlogPostReader = lazy(() => import('./components/BlogPostReader'));
import IndiaTripsSection from './components/category-showcases/IndiaTripsSection';
import InternationalTripsSection from './components/category-showcases/InternationalTripsSection';
import WeekendGetawaysSection from './components/category-showcases/WeekendGetawaysSection';
import FixedDeparturesSection from './components/category-showcases/FixedDeparturesSection';
import TourismBoardsMarquee from './components/TourismBoardsMarquee';
import { getLandingPageBySlug, LANDING_PAGES_DATA } from './data/landingPagesData';
import { directusService } from './services/directusClient';

const QuickBookingModal = lazy(() => import('./components/QuickBookingModal'));
const AIPlannerPage = lazy(() => import('./components/ai-planner/AIPlannerPage'));
const ItineraryPage = lazy(() => import('./components/itinerary/ItineraryPage'));
const PrivacyPolicyPage = lazy(() => import('./components/legal/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./components/legal/TermsPage'));
import PackageTierCompareModal from './components/PackageTierCompareModal';
import WishlistDrawer from './components/WishlistDrawer';
import CompareModal from './components/CompareModal';
import PolicyModal from './components/PolicyModal';
import VisitorAuthModal from './components/VisitorAuthModal';
const AdminCMSModal = lazy(() => import('./components/AdminCMSModal'));
import FloatingQuickDock from './components/FloatingQuickDock';
import LiveBookingToast from './components/LiveBookingToast';
import LeadCapturePopup from './components/LeadCapturePopup';
import SpinToWinWheel from './components/SpinToWinWheel';

import { seoHeadManager } from './utils/seoHeadManager';
import { jsonLdSchemaGenerator } from './utils/jsonLdSchemaGenerator';
import { usePageSEO } from './hooks/usePageSEO';
import AudiencePicker from './components/AudiencePicker';
import { applyTheme, getStoredTheme } from './hooks/useTheme';
import { trackVirtualPageView, initGlobalClickTracking } from './utils/analytics';

export default function App() {
  // Activate high-performance scroll reveals
  useScrollAnimation();

  // Enforce stored theme or follow OS and dismiss initial splash smoothly
  useEffect(() => {
    applyTheme(getStoredTheme());

    const splash = document.getElementById('cj-initial-splash');
    if (splash) {
      splash.classList.add('cj-splash-fadeout');
      const timer = setTimeout(() => {
        if (splash && splash.parentNode) {
          splash.parentNode.removeChild(splash);
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, []);

  const [searchFilters, setSearchFilters] = useState({ destination: '', category: 'All' });
  const [selectedBookingTour, setSelectedBookingTour] = useState(null);
  const [isQuickQuoteOpen, setIsQuickQuoteOpen] = useState(false);
  const [isAIPlannerOpen, setIsAIPlannerOpen] = useState(false);
  const [tierCompareTour, setTierCompareTour] = useState(null);
  const [isTierCompareOpen, setIsTierCompareOpen] = useState(false);
  const [isAdminCMSOpen, setIsAdminCMSOpen] = useState(false);
  const [isLPHubOpen, setIsLPHubOpen] = useState(false);
  const [policyModalType, setPolicyModalType] = useState(null); // 'cancellation' | 'privacy' | 'terms' | null
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'about' | 'landing' | 'magazine' | 'blog-reader' | 'ai-planner' | 'itinerary'
  const [activeLandingPage, setActiveLandingPage] = useState(null);
  const [activeBlogSlug, setActiveBlogSlug] = useState(null);
  const [activeTourSlug, setActiveTourSlug] = useState(null);
  const [selectedItineraryTour, setSelectedItineraryTour] = useState(null);

  // Dynamic 2026 Page SEO, AEO & GEO injection
  const activeSeoKey = 
    currentView === 'about' ? 'about' :
    currentView === 'magazine' ? 'blog' :
    currentView === 'privacy-policy' ? 'privacy' :
    currentView === 'terms-and-conditions' ? 'terms' :
    (currentView === 'landing' && activeLandingPage?.slug) ? `campaign-${activeLandingPage.slug}` :
    isLPHubOpen ? 'landing-hub' :
    'home';

  // Audience landing pages carry their own approved meta title/description
  const landingSeoOverride = useMemo(() => (
    currentView === 'landing' && activeLandingPage ? {
      metaTitle: activeLandingPage.metaTitle,
      metaDescription: activeLandingPage.metaDesc,
      focusKeyword: [activeLandingPage.focusKeyword, ...(activeLandingPage.secondaryKeywords || [])].join(', '),
      canonicalUrl: `https://www.comfortjourney.in/${activeLandingPage.slug}/`,
      ogImage: /^https?:/.test(activeLandingPage.theme?.heroImage || '')
        ? activeLandingPage.theme.heroImage
        : `https://www.comfortjourney.in/${(activeLandingPage.theme?.heroImage || '').replace(/^\.?\//, '')}`,
      robotsIndex: true
    } : null
  ), [currentView, activeLandingPage]);
  usePageSEO(activeSeoKey, landingSeoOverride);


  // URL routing: Supports both pathname (/cms, /about, /blog) and hash-based routes (#/portal, #/ai-planner)
  useEffect(() => {
    const handleRouteChange = () => {
      const rawHash = window.location.hash || '';
      const hash = rawHash.toLowerCase();
      const rawPath = window.location.pathname || '/';
      const pathname = rawPath.toLowerCase().replace(/\/+$/, '') || '/';
      
      const isCmsRoute = (
        pathname === '/cms' || pathname === '/admin' || pathname === '/portal' || pathname === '/staff' ||
        hash === '#/portal' || hash === '#portal' || hash === '#/team' || hash === '#team' || 
        hash === '#/staff' || hash === '#staff' || hash === '#/admin' || hash === '#admin' || 
        hash === '#/cms' || hash === '#cms'
      );

      // 1. Staff CMS / Admin Portal
      if (isCmsRoute) {
        setCurrentView('cms');
        setIsAdminCMSOpen(true);
        setActiveLandingPage(null);
        setActiveBlogSlug(null);
        setActiveTourSlug(null);
        setSelectedItineraryTour(null);
        window.scrollTo({ top: 0, behavior: 'instant' });
        seoHeadManager.updateMetadata({
          title: "Staff & Management CMS Portal | Comfort Journey",
          description: "Comfort Journey management portal for itineraries, blog publishing, and customer inquiries.",
          url: pathname === '/cms' ? '/cms' : '/#/portal'
        });
        return;
      }

      // 2. Landing Hub modal / route
      if (pathname === '/landing-hub' || hash === '#/landing-hub' || hash === '#/all-landing-pages' || hash === '#landing-hub') {
        setIsLPHubOpen(true);
      }

      // 3. AI Planner dedicated page
      if (pathname === '/ai-planner' || hash === '#/ai-planner' || hash === '#ai-planner') {
        if (typeof history !== 'undefined' && history.replaceState && pathname !== '/ai-planner') {
          history.replaceState(null, '', '/ai-planner');
        }
        setCurrentView('ai-planner');
        setActiveLandingPage(null);
        setActiveBlogSlug(null);
        setActiveTourSlug(null);
        setSelectedItineraryTour(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        seoHeadManager.updateMetadata({
          title: "Comfy.ai Travel Planner | Plan Your Dream Vacation with AI",
          description: "Create personalized itineraries with interactive maps, real-time routing, and AI-powered suggestions. Comfort Journey (Est. 1992).",
          url: '/ai-planner',
          type: "website"
        });
        return;
      }

      // 4. About Us / Who We Are dedicated page
      if (
        pathname === '/about' || pathname === '/about-us' || pathname === '/who-we-are' ||
        hash === '#/about' || hash === '#/who-we-are' || hash === '#/about-us' || hash === '#about'
      ) {
        if (typeof history !== 'undefined' && history.replaceState && pathname !== '/about') {
          history.replaceState(null, '', '/about/');
        }
        setCurrentView('about');
        setActiveLandingPage(null);
        setActiveBlogSlug(null);
        setActiveTourSlug(null);
        setSelectedItineraryTour(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        seoHeadManager.updateMetadata({
          title: "About Us | Who We Are | Comfort Journey Since 1992",
          description: "Learn about Comfort Journey, our heritage, team, and passion for curating luxurious and unforgettable trips across India and the globe.",
          url: '/about/',
          type: "website"
        });
        return;
      }

      // 5. Blog Magazine view
      if (
        pathname === '/blog' || pathname === '/blogs' ||
        hash === '#/blog' || hash === '#/blogs' || hash === '#blog' || hash === '#blogs'
      ) {
        if (typeof history !== 'undefined' && history.replaceState && pathname !== '/blog') {
          history.replaceState(null, '', '/blog/');
        }
        setCurrentView('magazine');
        setActiveLandingPage(null);
        setActiveBlogSlug(null);
        setActiveTourSlug(null);
        setSelectedItineraryTour(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        seoHeadManager.updateMetadata({
          title: "Travel Blogs & Luxury Guides | Comfort Journey",
          description: "Explore handcrafted destination guides, luxury stay reviews, and honeymoon tips curated by Comfort Journey since 1992.",
          url: '/blog/',
          type: "website"
        });
        return;
      }

      // 6. Blog Reader post
      if (
        pathname.startsWith('/blog/') ||
        hash.startsWith('#/blog/') || hash.startsWith('#blog/')
      ) {
        const slug = (pathname.startsWith('/blog/') 
          ? pathname.replace(/^\/blog\//, '') 
          : rawHash.replace(/^#\/?blog\//, '')).replace(/\/+$/, '').trim();
        if (typeof history !== 'undefined' && history.replaceState && !pathname.startsWith('/blog/')) {
          history.replaceState(null, '', `/blog/${slug}/`);
        }
        setActiveBlogSlug(slug);
        setActiveTourSlug(null);
        setSelectedItineraryTour(null);
        setCurrentView('blog-reader');
        setActiveLandingPage(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 7. Legal pages
      if (pathname === '/privacy-policy' || pathname === '/privacy' || hash === '#/privacy-policy' || hash === '#privacy-policy' || hash === '#privacy') {
        if (typeof history !== 'undefined' && history.replaceState && pathname !== '/privacy-policy') {
          history.replaceState(null, '', '/privacy-policy/');
        }
        setCurrentView('privacy-policy');
        setActiveLandingPage(null);
        setActiveBlogSlug(null);
        setActiveTourSlug(null);
        setSelectedItineraryTour(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (pathname === '/terms-and-conditions' || pathname === '/terms' || hash === '#/terms-and-conditions' || hash === '#terms-and-conditions' || hash === '#terms') {
        if (typeof history !== 'undefined' && history.replaceState && pathname !== '/terms-and-conditions') {
          history.replaceState(null, '', '/terms-and-conditions/');
        }
        setCurrentView('terms-and-conditions');
        setActiveLandingPage(null);
        setActiveBlogSlug(null);
        setActiveTourSlug(null);
        setSelectedItineraryTour(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 8. Explicit Home Section Anchors (e.g. clicked #tours, #custom-builder, #google-reviews, #why-us, #hero from anywhere)
      const homeSectionAnchors = [
        '#hero', '#top', '#tours', '#destinations', '#custom-builder', '#trip-studio',
        '#google-reviews', '#reviews', '#why-us', '#whyus', '#india-trips', '#intl-trips',
        '#weekend-trips', '#fixed-departures', '#stories', '#faqs', '#contact'
      ];
      const isHomeAnchor = homeSectionAnchors.includes(hash);

      if (isHomeAnchor) {
        if (typeof history !== 'undefined' && history.replaceState) {
          history.replaceState(null, '', '/');
        }
        setCurrentView('home');
        setActiveLandingPage(null);
        setActiveBlogSlug(null);
        setActiveTourSlug(null);
        setSelectedItineraryTour(null);

        const targetId = (hash === '#hero' || hash === '#top') ? 'hero' : rawHash.replace(/^#/, '');
        setTimeout(() => {
          if (targetId === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const el = document.getElementById(targetId);
            if (el) {
              const headerOffset = 110;
              const pos = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
              window.scrollTo({ top: pos, behavior: 'smooth' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }
        }, 80);
        return;
      }

      // 9. Campaign Landing Pages (checked before tour to support hash navigation from menu)
      const lookupKey = hash || (pathname !== '/' ? '#' + pathname : '');
      const matchedPage = getLandingPageBySlug(lookupKey);
      if (matchedPage) {
        if (typeof history !== 'undefined' && history.replaceState && pathname !== `/${matchedPage.slug}`) {
          history.replaceState(null, '', `/${matchedPage.slug}/`);
        }
        setActiveLandingPage(matchedPage);
        setCurrentView('landing');
        setActiveBlogSlug(null);
        setActiveTourSlug(null);
        setSelectedItineraryTour(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 10. Tour / Package / Itinerary page
      const isTourPath = (
        pathname.startsWith('/tour/') || pathname.startsWith('/package/') || pathname.startsWith('/itinerary/') ||
        hash.startsWith('#/tour/') || hash.startsWith('#tour/') ||
        hash.startsWith('#/package/') || hash.startsWith('#package/') ||
        hash.startsWith('#/itinerary/') || hash.startsWith('#itinerary/')
      );

      if (isTourPath) {
        const tourSlug = (pathname.startsWith('/tour/') || pathname.startsWith('/package/') || pathname.startsWith('/itinerary/'))
          ? pathname.replace(/^\/(tour|package|itinerary)\//, '').replace(/\/+$/, '').trim()
          : rawHash.replace(/^#\/?(tour|package|itinerary)\//, '').replace(/\/+$/, '').trim();

        if (tourSlug) {
          if (typeof history !== 'undefined' && history.replaceState) {
            history.replaceState(null, '', `/tour/${tourSlug}/`);
          }

          setActiveTourSlug(tourSlug);
          const resolvedTour = contentService.getTourBySlug(tourSlug) || contentService.getTourById(tourSlug);
          if (resolvedTour) {
            setSelectedItineraryTour(resolvedTour);
          }

          setCurrentView('itinerary');
          setActiveLandingPage(null);
          setActiveBlogSlug(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          seoHeadManager.updateMetadata({
            title: resolvedTour ? `${resolvedTour.name} | Comfort Journey` : "Detailed Tour Itinerary | Comfort Journey",
            description: resolvedTour?.tagline || resolvedTour?.description?.slice(0, 160) || "Explore handcrafted luxury travel plan curated by Comfort Journey.",
            url: `/tour/${tourSlug}/`,
            type: "website"
          });
          return;
        }
      }

      // 11. Fallback: Homepage
      setCurrentView('home');
      setActiveLandingPage(null);
      setActiveBlogSlug(null);
      setActiveTourSlug(null);
      setSelectedItineraryTour(null);
      seoHeadManager.updateMetadata({
        schema: jsonLdSchemaGenerator.getTravelAgencySchema()
      });

      // Push virtual_pageview event to GTM dataLayer on client-side route change
      setTimeout(() => {
        trackVirtualPageView(window.location.pathname + window.location.hash, document.title);
      }, 50);
    };

    // Activate automatic tracking for WhatsApp CTA clicks
    initGlobalClickTracking();

    // Check on mount (direct URL navigation or ad click)
    handleRouteChange();
    // Listen for hash and browser navigation changes
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);

    // Global listener for opening policy modal from legal consent links across forms
    const handleOpenPolicyModal = (e) => {
      setPolicyModalType(e.detail || 'privacy');
    };
    window.addEventListener('open-policy-modal', handleOpenPolicyModal);

    // Invisible staff shortcut: Ctrl + Shift + A (or Cmd + Shift + A) opens CMS Portal
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminCMSOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('open-policy-modal', handleOpenPolicyModal);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navigateToLandingPage = (slug) => {
    if (typeof history !== 'undefined' && history.pushState) {
      history.pushState(null, '', `/${slug}/`);
    } else {
      window.location.href = `/${slug}/`;
    }
    const matched = getLandingPageBySlug(slug);
    if (matched) {
      setActiveLandingPage(matched);
      setCurrentView('landing');
      setActiveBlogSlug(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      trackVirtualPageView(`/${slug}/`, `${matched.metaTitle || slug} | Comfort Journey`);
    }
  };

  const navigateToBlog = (slug) => {
    if (typeof history !== 'undefined' && history.pushState) {
      history.pushState(null, '', `/blog/${slug}/`);
    } else {
      window.location.href = `/blog/${slug}/`;
    }
    setActiveBlogSlug(slug);
    setCurrentView('blog-reader');
    setActiveLandingPage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackVirtualPageView(`/blog/${slug}/`, `${slug} | Comfort Journey Blog`);
  };

  const navigateToMagazine = () => {
    if (typeof history !== 'undefined' && history.pushState) {
      history.pushState(null, '', `/blog/`);
    } else {
      window.location.href = `/blog/`;
    }
    setCurrentView('magazine');
    setActiveLandingPage(null);
    setActiveBlogSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackVirtualPageView('/blog/', 'Travel Blogs & Luxury Guides | Comfort Journey');
  };

  const navigateToHome = () => {
    window.location.hash = '';
    try {
      if (typeof history !== 'undefined' && history.pushState) {
        history.pushState(null, '', '/');
      }
    } catch (e) {}
    setCurrentView('home');
    setActiveLandingPage(null);
    setActiveBlogSlug(null);
    setActiveTourSlug(null);
    setSelectedItineraryTour(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackVirtualPageView('/', 'Comfort Journey | Tour Packages Worldwide | Since 1992');
  };

  const navigateToAbout = () => {
    if (typeof history !== 'undefined' && history.pushState) {
      history.pushState(null, '', '/about/');
    } else {
      window.location.href = '/about/';
    }
    setCurrentView('about');
    setActiveLandingPage(null);
    setActiveBlogSlug(null);
    setActiveTourSlug(null);
    setSelectedItineraryTour(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackVirtualPageView('/about/', 'About Us | Who We Are | Comfort Journey');
  };

  const navigateToSection = (sectionId) => {
    const cleanId = (sectionId || '').replace(/^#/, '');
    if (cleanId === 'hero' || cleanId === 'top') {
      navigateToHome();
      return;
    }
    if (typeof history !== 'undefined' && history.pushState) {
      history.pushState(null, '', '/');
    } else {
      window.location.hash = '';
    }
    setCurrentView('home');
    setActiveLandingPage(null);
    setActiveBlogSlug(null);
    setActiveTourSlug(null);
    setSelectedItineraryTour(null);
    trackVirtualPageView('/', 'Comfort Journey | Tour Packages Worldwide');
    setTimeout(() => {
      const el = document.getElementById(cleanId);
      if (el) {
        const headerOffset = 110;
        const pos = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const navigateToAIPlanner = () => {
    if (typeof history !== 'undefined' && history.pushState) {
      history.pushState(null, '', '/ai-planner');
    } else {
      window.location.href = '/ai-planner';
    }
    setCurrentView('ai-planner');
    setActiveLandingPage(null);
    setActiveBlogSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackVirtualPageView('/ai-planner', 'Comfy.ai Travel Planner | Comfort Journey');
  };

  const navigateToPrivacyPolicy = () => {
    if (typeof history !== 'undefined' && history.pushState) {
      history.pushState(null, '', '/privacy-policy/');
    } else {
      window.location.href = '/privacy-policy/';
    }
    setCurrentView('privacy-policy');
    setActiveLandingPage(null);
    setActiveBlogSlug(null);
    setActiveTourSlug(null);
    setSelectedItineraryTour(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackVirtualPageView('/privacy-policy/', 'Privacy Policy | Comfort Journey');
  };

  const navigateToTerms = () => {
    if (typeof history !== 'undefined' && history.pushState) {
      history.pushState(null, '', '/terms-and-conditions/');
    } else {
      window.location.href = '/terms-and-conditions/';
    }
    setCurrentView('terms-and-conditions');
    setActiveLandingPage(null);
    setActiveBlogSlug(null);
    setActiveTourSlug(null);
    setSelectedItineraryTour(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackVirtualPageView('/terms-and-conditions/', 'Terms & Conditions | Comfort Journey');
  };

  const navigateToItinerary = (tour) => {
    setSelectedItineraryTour(tour);
    const slug = tour?.slug || tour?.id;
    setActiveTourSlug(slug || null);
    if (slug) {
      if (typeof history !== 'undefined' && history.pushState) {
        history.pushState(null, '', `/tour/${slug}/`);
      } else {
        window.location.href = `/tour/${slug}/`;
      }
    }
    setCurrentView('itinerary');
    setActiveLandingPage(null);
    setActiveBlogSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackVirtualPageView(slug ? `/tour/${slug}/` : '/tour', `${tour?.name || 'Tour'} | Comfort Journey`);
  };

  return (
    <UserAuthProvider>
      <CurrencyProvider>
        <WishlistCompareProvider>
          <SmoothScrollProvider>
            {/* Zajno Magnetic Cursor Follower */}
            <ZajnoMagneticCursor />

            {/* Ambient Parallax Gradient Orbs */}
            <AmbientBackgroundOrbs />

            <div className={`app-root ${currentView === 'ai-planner' ? 'ai-planner-active-view' : ''}`}>
            <Suspense fallback={<div className="route-loading" role="status" aria-live="polite"><span className="route-loading-dot" />Loading…</div>}>
              {currentView === 'cms' ? (
                /* DEDICATED STANDALONE CMS / CONTENT STUDIO VIEW (Instant 0ms Load, Zero Homepage Background Weight) */
                <div style={{ minHeight: '100vh', background: 'var(--color-bg, #001233)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AdminCMSModal
                    isOpen={true}
                    isStandalonePage={true}
                    onClose={navigateToHome}
                  />
                </div>
              ) : currentView === 'ai-planner' ? (
                /* DEDICATED FULL-VIEWPORT AI PLANNER EXPERIENCE */
                <AIPlannerPage 
                  onBackToHome={navigateToHome}
                  onOpenQuote={() => setIsQuickQuoteOpen(true)}
                />
              ) : currentView === 'itinerary' ? (
              /* DEDICATED ITINERARY PAGE VIEW WITH GLOBAL HEADER */
              <>
                <Navbar 
                  onOpenQuote={() => setIsQuickQuoteOpen(true)} 
                  onOpenAIPlanner={navigateToAIPlanner}
                  onOpenAdmin={() => setIsAdminCMSOpen(true)}
                  onOpenLandingHub={() => setIsLPHubOpen(true)}
                  onNavigateMagazine={navigateToMagazine}
                  onNavigateHome={navigateToHome}
                  onNavigateAbout={navigateToAbout}
                  onNavigateSection={navigateToSection}
                  onSelectLandingPage={navigateToLandingPage}
                  currentView={currentView}
                />
                <ItineraryPage 
                  initialTour={selectedItineraryTour}
                  tourSlug={activeTourSlug}
                  onBackToHome={navigateToHome}
                  onBookNow={(tour) => setSelectedBookingTour(tour)}
                  onOpenQuote={() => setIsQuickQuoteOpen(true)}
                />
                <Footer 
                  onOpenPolicy={(type) => setPolicyModalType(type)}
                  onOpenAdmin={() => setIsAdminCMSOpen(true)}
                  onOpenLandingHub={() => setIsLPHubOpen(true)}
                  onSelectLandingPage={navigateToLandingPage}
                  onOpenAIPlanner={navigateToAIPlanner}
                />
              </>
            ) : (
              <>
                {/* 1. Header Navigation with Currency Switcher & AI Trigger */}
                <Navbar 
                  onOpenQuote={() => setIsQuickQuoteOpen(true)} 
                  onOpenAIPlanner={navigateToAIPlanner}
                  onOpenAdmin={() => setIsAdminCMSOpen(true)}
                  onOpenLandingHub={() => setIsLPHubOpen(true)}
                  onNavigateMagazine={navigateToMagazine}
                  onNavigateHome={navigateToHome}
                  onNavigateAbout={navigateToAbout}
                  onNavigateSection={navigateToSection}
                  onSelectLandingPage={navigateToLandingPage}
                  currentView={currentView}
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
                    onSelectItinerary={navigateToItinerary}
                    onBookNow={(tour) => setSelectedBookingTour(tour)}
                    onOpenQuote={() => setIsQuickQuoteOpen(true)}
                  />
                ) : currentView === 'landing' && activeLandingPage ? (
                  /* DEDICATED CAMPAIGN / SEO LANDING PAGE VIEW */
                  <LandingPageTemplate 
pageData={activeLandingPage}
                    onBackToHome={navigateToHome}
                    onSelectItinerary={navigateToItinerary}
                    onBookNow={(tour) => setSelectedBookingTour(tour)}
                    onOpenAIPlanner={navigateToAIPlanner}
                    onOpenQuote={() => setIsQuickQuoteOpen(true)}
                  />
                ) : currentView === 'about' ? (
                  /* DEDICATED ABOUT US / WHO WE ARE PAGE VIEW */
                  <AboutUsPage 
                    onOpenQuote={() => setIsQuickQuoteOpen(true)}
                    onOpenAIPlanner={navigateToAIPlanner}
                    onNavigateHome={navigateToHome}
                  />
                ) : currentView === 'privacy-policy' ? (
                  /* DEDICATED PRIVACY POLICY & DPDP ACT PAGE VIEW */
                  <PrivacyPolicyPage 
                    onNavigateHome={navigateToHome}
                  />
                ) : currentView === 'terms-and-conditions' ? (
                  /* DEDICATED TERMS & CONDITIONS PAGE VIEW */
                  <TermsPage 
                    onNavigateHome={navigateToHome}
                  />
                ) : (
/* HOMEPAGE VIEW */
<>
{/* 2. In-Place Interactive Hero Studio: "How Do You Want to Travel?" (7 Continents Map, Weather/Season, Travel Styles) */}
<Hero
  onSelectItinerary={navigateToItinerary}
  onBookNow={(tour) => setSelectedBookingTour(tour)}
  onOpenAIPlanner={navigateToAIPlanner}
  onOpenQuote={() => setIsQuickQuoteOpen(true)}
/>

{/* 3. Trust & Experience Stats Bar with Anime.js Elastic Counters */}
{/* Who is coming along? Interactive audience picker that replies to the visitor */}
<AudiencePicker />

<StatsBar />

{/* Official Accredited Tourism Boards Marquee Showcase */}
<TourismBoardsMarquee />

{/* 4. India Luxury & Heritage Showcase (Royal Desi Heritage) */}
<IndiaTripsSection
  onSelectItinerary={navigateToItinerary}
  onBookNow={(tour) => setSelectedBookingTour(tour)}
  onOpenAIPlanner={navigateToAIPlanner}
  onNavigateLanding={navigateToLandingPage}
/>

{/* 5. World Passport Signature Collection (International Luxury Escapes) */}
<InternationalTripsSection
  onSelectItinerary={navigateToItinerary}
  onBookNow={(tour) => setSelectedBookingTour(tour)}
  onOpenAIPlanner={navigateToAIPlanner}
  onNavigateLanding={navigateToLandingPage}
/>

{/* 6. 48-Hour Weekend Getaways (Quick Friday-to-Sunday Resets) */}
<WeekendGetawaysSection
  onSelectItinerary={navigateToItinerary}
  onBookNow={(tour) => setSelectedBookingTour(tour)}
  onOpenAIPlanner={navigateToAIPlanner}
  onNavigateLanding={navigateToLandingPage}
/>

{/* 7. Fixed Departure Travel Tribe (Guaranteed Dates & Community Group Batches) */}
<FixedDeparturesSection
  onSelectItinerary={navigateToItinerary}
  onBookNow={(tour) => setSelectedBookingTour(tour)}
  onOpenAIPlanner={navigateToAIPlanner}
  onNavigateLanding={navigateToLandingPage}
/>

                {/* 8. Interactive Trip Studio & Live Price Estimator */}
                <TripCustomizerSection />

                {/* 9. Dedicated Verified Google Reviews Section (4.8★ Rating / 85+ Real Reviews) */}
                <GoogleReviewsSection 
                  onOpenQuote={() => setIsQuickQuoteOpen(true)}
                />

                {/* 10. Traveler Instagram Reels & Live Video Stories with 3D Tilt */}
                <TravelStoriesSection 
                  onOpenQuote={() => setIsQuickQuoteOpen(true)} 
                />

                {/* 11. Unified Comfort Journey Standard: 7 VIP Guarantees & 8 Bespoke Travel Desires */}
                <WhyChooseUs onOpenAIPlanner={navigateToAIPlanner} />

                {/* 12. Frequently Asked Questions */}
                <FaqSection />
              </>
            )}

            {/* 16. Global Footer with Trust Policies & Team Portal */}
            <Footer 
              onOpenPolicy={(type) => setPolicyModalType(type)}
              onOpenAdmin={() => setIsAdminCMSOpen(true)}
              onOpenLandingHub={() => setIsLPHubOpen(true)}
              onSelectLandingPage={navigateToLandingPage}
              onOpenAIPlanner={navigateToAIPlanner}
            />
          </>
        )}

        {/* --- GLOBAL MODALS & QUICK DOCK (RENDERED ON ALL PAGES) --- */}

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

          

          {/* Quick Quote / 5-Step Booking Modal */}
          {(selectedBookingTour || isQuickQuoteOpen) && (
            <Suspense fallback={null}>
            <QuickBookingModal 
              selectedTour={selectedBookingTour} 
              onClose={() => {
                setSelectedBookingTour(null);
                setIsQuickQuoteOpen(false);
              }} 
            />
            </Suspense>
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
            onSelectItinerary={navigateToItinerary}
            onBookTour={(tour) => setSelectedBookingTour(tour)}
          />

          {/* Side-by-Side Tour Comparison Modal */}
          <CompareModal 
            onSelectItinerary={navigateToItinerary}
            onBookTour={(tour) => setSelectedBookingTour(tour)}
          />

          {/* Trust Policies & Terms Modal */}
          <PolicyModal 
            type={policyModalType}
            isOpen={Boolean(policyModalType)}
            onClose={() => setPolicyModalType(null)}
          />

          {/* Website Visitor Authentication Modal (1-Click Google, Phone/Email) */}
          <VisitorAuthModal />

          {/* Marketing Team CMS, Blog Publisher & SEO Studio (Modal mode when triggered from homepage) */}
          {isAdminCMSOpen && currentView !== 'cms' && (
          <Suspense fallback={null}>
          <AdminCMSModal 
            isOpen={isAdminCMSOpen}
            onClose={() => {
              setIsAdminCMSOpen(false);
              // Clear the /cms, /admin, or /portal pathname/hash from URL on close
              const path = window.location.pathname.toLowerCase();
              const hash = window.location.hash.toLowerCase();
              if (path.includes('cms') || path.includes('admin') || path.includes('portal')) {
                history.replaceState(null, '', '/');
              } else if (hash.includes('admin') || hash.includes('portal') || hash.includes('cms')) {
                history.replaceState(null, '', window.location.pathname);
              }
            }}
          />
          </Suspense>
          )}

          {/* Floating Glassmorphism Action Dock (Available on All Pages except AI Planner and Standalone CMS) */}
          {currentView !== 'ai-planner' && currentView !== 'cms' && (
            <FloatingQuickDock 
              onOpenQuote={() => setIsQuickQuoteOpen(true)} 
              onOpenAIPlanner={navigateToAIPlanner}
            />
          )}

          {/* Live Booking Social Proof Ticker */}
          {currentView !== 'landing' && currentView !== 'cms' && <LiveBookingToast />}

          {/* Marketing Welcome Lead Capture Popup (appears after 8s on first visit) */}
          {currentView !== 'ai-planner' && currentView !== 'cms' && <LeadCapturePopup />}

          {/* Gamified Spin-to-Win Wheel Floating Trigger & Interactive Modal */}
          {currentView !== 'ai-planner' && currentView !== 'cms' && <SpinToWinWheel />}

          <style>{`
            .app-root {
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              background-color: transparent;
              color: var(--cj-text-body);
              position: relative;
            }
            .route-loading {
              min-height: 70vh;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
              font-family: var(--font-body);
              color: var(--cj-text-muted);
            }
            .route-loading-dot {
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: #FF892F;
              animation: route-loading-pulse 0.9s ease-in-out infinite alternate;
            }
            @keyframes route-loading-pulse { from { opacity: 0.35; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
            .app-root.ai-planner-active-view {
              height: 100vh;
              max-height: 100vh;
              overflow: hidden;
            }
          `}</style>
          </Suspense>
        </div>
        </SmoothScrollProvider>
      </WishlistCompareProvider>
    </CurrencyProvider>
  </UserAuthProvider>
  );
}

