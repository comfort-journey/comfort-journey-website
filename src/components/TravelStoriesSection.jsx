import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Instagram, CheckCircle2 } from 'lucide-react';

const basePrefix = (import.meta.env.BASE_URL || './').replace(/\/$/, '') + '/';

// Real Comfort Journey traveler reels (lightweight mobile-optimized MP4s + instant posters)
const COMFORT_JOURNEY_STORIES = [
  {
    id: 'story-1',
    videoFileName: 'reel-1.mp4',
    posterFileName: 'reel-1-poster.webp',
    title: '13,000ft Skydiving in Dubai',
    subtitle: 'Out of office mode activated 🪂',
    traveler: 'Dubai Explorer',
    destination: 'Dubai, UAE',
    tag: 'Adventure',
    instagramUrl: 'https://www.instagram.com/reel/DY0_FKniL_8/'
  },
  {
    id: 'story-2',
    videoFileName: 'reel-2.mp4',
    posterFileName: 'reel-2-poster.webp',
    title: 'Royal Rajasthan Heritage',
    subtitle: 'Palaces, sunsets & desert culture 🏰',
    traveler: 'Rajasthan Getaway',
    destination: 'Rajasthan, India',
    tag: 'Heritage',
    instagramUrl: 'https://www.instagram.com/reel/DeRRWnszQLK/'
  },
  {
    id: 'story-3',
    videoFileName: 'reel-3.mp4',
    posterFileName: 'reel-3-poster.webp',
    title: 'Real Guest Trip Review',
    subtitle: 'From planning to unforgettable memories 💖',
    traveler: 'Happy Guests',
    destination: 'Bespoke Tour',
    tag: 'Guest Review',
    instagramUrl: 'https://www.instagram.com/reel/Dc6SeyuCtAR/'
  },
  {
    id: 'story-4',
    videoFileName: 'reel-4.mp4',
    posterFileName: 'reel-4-poster.webp',
    title: 'God’s Own Country: Kerala',
    subtitle: 'Munnar tea hills & Alleppey backwaters 🌴',
    traveler: 'Family & Couple Escape',
    destination: 'Kerala, India',
    tag: 'Nature',
    instagramUrl: 'https://www.instagram.com/reel/DdtdiSaCk4G/'
  },
  {
    id: 'story-5',
    videoFileName: 'reel-5.mp4',
    posterFileName: 'reel-5-poster.webp',
    title: 'Manali & Kasol Mountain Roadtrip',
    subtitle: 'Snow peaks, valley breezes & friendship 🏔️',
    traveler: 'Friends Roadtrip',
    destination: 'Himachal Pradesh',
    tag: 'Mountains',
    instagramUrl: 'https://www.instagram.com/reel/DdjTY0oK9lA/'
  },
  {
    id: 'story-6',
    videoFileName: 'reel-6.mp4',
    posterFileName: 'reel-6-poster.webp',
    title: 'Andaman Islands Paradise',
    subtitle: 'Radhanagar beach & coral scuba haven 🌊',
    traveler: 'Island Hopping',
    destination: 'Andaman Islands',
    tag: 'Beaches',
    instagramUrl: 'https://www.instagram.com/reel/DdEP2f7Rft2/'
  }
];

export default function TravelStoriesSection({ onOpenQuote }) {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const videoRefs = useRef({});
  const [activeAudioId, setActiveAudioId] = useState(null); // Only one video has audio unmuted
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  // Performance: Only play videos when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '150px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Synchronized multi-video playback: plays all cards simultaneously when in view
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([id, videoEl]) => {
      if (!videoEl) return;
      if (isSectionVisible) {
        if (id !== activeAudioId) {
          videoEl.muted = true;
        }
        videoEl.play().catch(() => {});
      } else {
        videoEl.pause();
      }
    });
  }, [isSectionVisible, activeAudioId]);

  // Click card to toggle audio on/off with visual highlight
  const handleCardClick = (storyId) => {
    const video = videoRefs.current[storyId];
    if (!video) return;

    if (activeAudioId === storyId) {
      // Currently unmuted -> mute it
      video.muted = true;
      setActiveAudioId(null);
    } else {
      // Mute all other videos
      Object.entries(videoRefs.current).forEach(([id, otherVideo]) => {
        if (otherVideo && id !== storyId) {
          otherVideo.muted = true;
        }
      });
      // Unmute clicked video
      video.muted = false;
      video.play().catch(() => {});
      setActiveAudioId(storyId);
    }
  };

  const handleToggleMute = (e, storyId) => {
    e.stopPropagation();
    handleCardClick(storyId);
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="stories" ref={sectionRef} className="cj-stories-section">
      <div className="container">
        {/* Modern Distinct Header & Ratings */}
        <div className="cj-stories-header">
          <h2 className="cj-stories-title">
            MEMORIES CRAFTED WITH COMFORT JOURNEY <span className="cj-sparkle">✨</span>
          </h2>
          <p className="cj-stories-subtitle">
            Real moments, smiles, and adventures shared by our travelers across the world
          </p>

          <div className="cj-trust-bar">
            {/* Google Rating */}
            <div className="cj-rating-pill">
              <svg className="cj-g-logo" viewBox="0 0 24 24" width="22" height="22">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <div className="cj-rating-details">
                <span className="cj-score">4.8<span className="cj-scale">/5</span> <span className="cj-star">★</span></span>
                <span className="cj-count">85+ reviews</span>
              </div>
            </div>

            {/* Verified Happy Guests (Clean 10,000+ Happy Guests pill without 4.9 rating) */}
            <div className="cj-rating-pill cj-guest-pill">
              <div className="cj-guest-badge">
                <CheckCircle2 size={16} strokeWidth={2.8} />
              </div>
              <div className="cj-rating-details">
                <span className="cj-guest-highlight">10,000+ Happy Guests</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Container with Elegant Arched Video Cards */}
        <div className="cj-carousel-container">
          {/* Scroll Nav Buttons */}
          <button 
            type="button" 
            className="cj-nav-arrow cj-nav-left"
            onClick={() => handleScroll('left')}
            aria-label="Previous Stories"
          >
            <ChevronLeft size={22} />
          </button>

          <button 
            type="button" 
            className="cj-nav-arrow cj-nav-right"
            onClick={() => handleScroll('right')}
            aria-label="Next Stories"
          >
            <ChevronRight size={22} />
          </button>

          {/* Cards Track */}
          <div className="cj-cards-track" ref={scrollRef}>
            {COMFORT_JOURNEY_STORIES.map((story) => {
              const hasAudio = activeAudioId === story.id;
              const videoSrc = `${basePrefix}videos/reels/${story.videoFileName}`;
              const posterSrc = `${basePrefix}videos/reels/${story.posterFileName}`;

              return (
                <div 
                  key={story.id} 
                  className={`cj-card-wrapper ${hasAudio ? 'has-audio' : ''}`}
                  onClick={() => handleCardClick(story.id)}
                  title={hasAudio ? 'Click to mute sound' : 'Click to unmute sound'}
                >
                  <div className="cj-arched-card">
                    {/* HTML5 Vertical Video: simultaneous autoplay, muted by default, lightweight poster fallback */}
                    <video
                      ref={(el) => { if (el) videoRefs.current[story.id] = el; }}
                      src={videoSrc}
                      poster={posterSrc}
                      className="cj-video-element"
                      playsInline
                      muted={!hasAudio}
                      autoPlay
                      loop
                      preload="auto"
                    />

                    {/* Gradient Overlays for Cinematic Depth */}
                    <div className="cj-video-vignette" />

                    {/* Top Right Sound Toggle Pill */}
                    <button
                      type="button"
                      className={`cj-sound-pill ${hasAudio ? 'unmuted' : 'muted'}`}
                      onClick={(e) => handleToggleMute(e, story.id)}
                      aria-label={hasAudio ? 'Mute audio' : 'Unmute audio'}
                      title={hasAudio ? 'Mute sound' : 'Unmute sound'}
                    >
                      {hasAudio ? (
                        <Volume2 size={16} />
                      ) : (
                        <VolumeX size={16} />
                      )}
                    </button>

                    {/* Bottom Info Bar with Destination, Title & Instagram Link */}
                    <div className="cj-card-bottom-info">
                      <div className="cj-tag-row">
                        <span className="cj-story-tag">{story.tag}</span>
                        <span className="cj-destination-pill">{story.destination}</span>
                      </div>
                      <h4 className="cj-story-title">{story.title}</h4>
                      <p className="cj-story-sub">{story.subtitle}</p>

                      <a 
                        href={story.instagramUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="cj-ig-link"
                        onClick={(e) => e.stopPropagation()}
                        title="Watch on Instagram @comfort.journey"
                      >
                        <Instagram size={13} />
                        <span>@comfort.journey</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Clean, Simple CTA Footer */}
        {onOpenQuote && (
          <div className="cj-stories-cta">
            <div className="cj-cta-content">
              <h3>Ready to craft your next unforgettable memory?</h3>
              <p>Handcrafted domestic & international holiday packages personalized for your family.</p>
            </div>
            <button className="btn-primary cj-cta-btn" onClick={onOpenQuote}>
              <span>Plan My Trip</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        .cj-stories-section {
          padding: 4.5rem 0 3.5rem 0;
          background: #000000;
          color: #FFFFFF;
          position: relative;
          overflow: hidden;
        }

        .cj-stories-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .cj-stories-title {
          font-family: var(--font-heading, inherit);
          font-size: clamp(1.75rem, 3.6vw, 2.65rem);
          font-weight: 900;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: #FFFFFF;
          margin: 0 0 0.5rem 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .cj-sparkle {
          display: inline-block;
          font-style: normal;
        }

        .cj-stories-subtitle {
          color: rgba(255, 255, 255, 0.72);
          font-size: clamp(0.95rem, 1.8vw, 1.1rem);
          max-width: 650px;
          margin: 0 auto 1.5rem auto;
          line-height: 1.5;
        }

        .cj-trust-bar {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 2.25rem;
          flex-wrap: wrap;
          padding: 0.4rem 1.4rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .cj-rating-pill {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .cj-g-logo {
          flex-shrink: 0;
        }

        .cj-guest-pill {
          gap: 0.6rem;
        }

        .cj-guest-badge {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1877F2 0%, #0056b3 100%);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(24, 119, 242, 0.4);
        }

        .cj-rating-details {
          display: flex;
          align-items: baseline;
          gap: 0.45rem;
        }

        .cj-score {
          font-size: 1.05rem;
          font-weight: 800;
          color: #FFFFFF;
        }

        .cj-scale {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.75);
          font-weight: 600;
        }

        .cj-star {
          color: #FFB800;
          font-size: 1.05rem;
          margin-left: 2px;
        }

        .cj-count {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.65);
          font-weight: 500;
        }

        .cj-guest-highlight {
          font-size: 0.98rem;
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: 0.01em;
        }

        /* Carousel Layout */
        .cj-carousel-container {
          position: relative;
          width: 100%;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .cj-cards-track {
          display: flex;
          gap: 1.35rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 1rem 0.5rem 1.5rem 0.5rem;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .cj-cards-track::-webkit-scrollbar {
          display: none;
        }

        /* Arched Video Card */
        .cj-card-wrapper {
          flex: 0 0 245px;
          width: 245px;
          height: 435px;
          scroll-snap-align: center;
          cursor: pointer;
          user-select: none;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cj-card-wrapper:hover {
          transform: translateY(-6px);
        }

        .cj-arched-card {
          position: relative;
          width: 100%;
          height: 100%;
          /* Signature clean stadium arch */
          border-radius: 122px 122px 24px 24px;
          overflow: hidden;
          background: #080C14;
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .cj-card-wrapper:hover .cj-arched-card {
          border-color: rgba(255, 137, 47, 0.5);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.85), 0 0 24px rgba(255, 137, 47, 0.25);
        }

        .cj-card-wrapper.has-audio .cj-arched-card {
          border-color: #FF892F;
          box-shadow: 0 22px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(255, 137, 47, 0.4);
        }

        .cj-video-element {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          background: #060A12;
        }

        /* Subtle vignette mask */
        .cj-video-vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.25) 0%,
            transparent 20%,
            transparent 50%,
            rgba(0, 0, 0, 0.88) 100%
          );
        }

        /* Bottom Speaker Sound Button */
        .cj-sound-pill {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          padding: 0;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.35);
          color: #FFFFFF;
          cursor: pointer;
          z-index: 5;
          transition: all 0.25s ease;
        }

        .cj-sound-pill:hover {
          background: rgba(255, 137, 47, 0.95);
          border-color: #FF892F;
          transform: scale(1.08);
        }

        .cj-sound-pill.unmuted {
          background: #FF892F;
          border-color: #FF892F;
          color: #FFFFFF;
          box-shadow: 0 2px 10px rgba(255, 137, 47, 0.5);
        }

        /* Bottom Info Overlay */
        .cj-card-bottom-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.25rem 3.4rem 0.95rem 1rem;
          z-index: 3;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .cj-tag-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .cj-story-tag {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          background: rgba(255, 137, 47, 0.9);
          color: #FFFFFF;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          letter-spacing: 0.04em;
        }

        .cj-destination-pill {
          font-size: 0.7rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          background: rgba(255, 255, 255, 0.15);
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          backdrop-filter: blur(4px);
        }

        .cj-story-title {
          font-size: 0.95rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
          line-height: 1.25;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8);
        }

        .cj-story-sub {
          font-size: 0.78rem;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cj-ig-link {
          pointer-events: auto;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.75);
          text-decoration: none;
          margin-top: 0.2rem;
          transition: color 0.2s ease;
          width: fit-content;
        }

        .cj-ig-link:hover {
          color: #FF892F;
        }

        /* Carousel Navigation Buttons */
        .cj-nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.95);
          border: none;
          color: #111827;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cj-nav-arrow:hover {
          background: #FF892F;
          color: #FFFFFF;
          transform: translateY(-50%) scale(1.12);
          box-shadow: 0 6px 20px rgba(255, 137, 47, 0.5);
        }

        .cj-nav-left {
          left: 0.25rem;
        }

        .cj-nav-right {
          right: 0.25rem;
        }

        /* CTA Footer */
        .cj-stories-cta {
          margin-top: 3.25rem;
          background: linear-gradient(135deg, rgba(20, 26, 40, 0.8) 0%, rgba(10, 14, 24, 0.95) 100%);
          border-radius: 20px;
          padding: 2rem 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .cj-cta-content h3 {
          font-size: 1.35rem;
          color: #FFFFFF;
          margin: 0 0 0.35rem 0;
          font-weight: 700;
        }

        .cj-cta-content p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.92rem;
          margin: 0;
        }

        .cj-cta-btn {
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .cj-stories-section {
            padding: 3rem 0 2.5rem 0;
          }

          .cj-stories-title {
            font-size: 1.45rem;
          }

          .cj-stories-subtitle {
            font-size: 0.88rem;
            margin-bottom: 1.25rem;
          }

          .cj-trust-bar {
            gap: 1.25rem;
            padding: 0.4rem 1rem;
          }

          .cj-card-wrapper {
            flex: 0 0 195px;
            width: 195px;
            height: 350px;
          }

          .cj-arched-card {
            border-radius: 98px 98px 20px 20px;
          }

          .cj-nav-arrow {
            display: none;
          }

          .cj-stories-cta {
            flex-direction: column;
            text-align: center;
            padding: 1.5rem 1.25rem;
            gap: 1.25rem;
          }

          .cj-cta-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
