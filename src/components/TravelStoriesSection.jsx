import React, { useState, useRef } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

// Real traveler journey video reviews (clean vertical MP4s matching Pickyourtrail style)
const TRAVELER_STORIES = [
  {
    id: 'story-1',
    videoUrl: 'https://pickyourtrail-video.gumlet.io/media/videos/testimonials/App+Stories/Customer+testimonial/Mayur_sonia_kotak_bali/Mayur_sonia_idn.mp4',
    title: 'Bali Overwater Villa & Ocean Escape',
    traveler: 'Mayur & Sonia',
    destination: 'Bali'
  },
  {
    id: 'story-2',
    videoUrl: 'https://pickyourtrail-video.gumlet.io/media/videos/testimonials/App+Stories/Customer+testimonial/Aishwarya_bali/Aishwarya_Bali.mp4',
    title: 'Airport Excitement & Vacation Mode',
    traveler: 'Aishwarya',
    destination: 'Bali'
  },
  {
    id: 'story-3',
    videoUrl: 'https://pickyourtrail-video.gumlet.io/media/videos/testimonials/App+Stories/Customer+testimonial/Nakul_subree_sin/Nakul_Srubeev_sin.mp4',
    title: 'Singapore City Walk & Attractions',
    traveler: 'Nakul & Surbhi',
    destination: 'Singapore'
  },
  {
    id: 'story-4',
    videoUrl: 'https://pickyourtrail-video.gumlet.io/media/videos/testimonials/App+Stories/Customer+testimonial/priyadarshini_singapore/Priyadharsini&family_singapore.mp4',
    title: '3 Days, 1 Destination - Family Fun',
    traveler: 'Priyadarshini & Family',
    destination: 'Singapore'
  },
  {
    id: 'story-5',
    videoUrl: 'https://pickyourtrail-video.gumlet.io/media/app_home/love+from+gram/Sneha+Shenoy_Vietnam.mp4',
    title: 'Vietnam Luxury Stays & Scenery',
    traveler: 'Sneha Shenoy',
    destination: 'Vietnam'
  },
  {
    id: 'story-6',
    videoUrl: 'https://pickyourtrail-video.gumlet.io/media/test/Customisation_Chakaravarthy_Dubai.mp4',
    title: 'Dubai Desert Safari & Dunes Adventure',
    traveler: 'Chakaravarthy',
    destination: 'Dubai'
  },
  {
    id: 'story-7',
    videoUrl: 'https://pickyourtrail-video.gumlet.io/media/test/Expertise_Hrishikesh_Dubai.mp4',
    title: 'Dubai Skyline & Marina Experience',
    traveler: 'Hrishikesh',
    destination: 'Dubai'
  }
];

export default function TravelStoriesSection({ onOpenQuote }) {
  const scrollRef = useRef(null);
  const videoRefs = useRef({});
  const [playingId, setPlayingId] = useState(null);
  const [mutedStates, setMutedStates] = useState({});

  // Single-click play or pause — no popup modals
  const handleTogglePlay = (storyId) => {
    const targetVideo = videoRefs.current[storyId];
    if (!targetVideo) return;

    if (playingId === storyId) {
      // Currently playing -> pause it
      targetVideo.pause();
      setPlayingId(null);
    } else {
      // Pause any previously playing video
      if (playingId && videoRefs.current[playingId]) {
        videoRefs.current[playingId].pause();
      }
      // Play clicked video
      targetVideo.play().then(() => {
        setPlayingId(storyId);
      }).catch((err) => {
        console.warn('Playback error or blocked by autoplay policy:', err);
        // Fallback: try muted
        targetVideo.muted = true;
        targetVideo.play().then(() => {
          setPlayingId(storyId);
          setMutedStates(prev => ({ ...prev, [storyId]: true }));
        }).catch(() => {});
      });
    }
  };

  // Toggle mute without interrupting playback
  const handleToggleMute = (e, storyId) => {
    e.stopPropagation();
    const video = videoRefs.current[storyId];
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setMutedStates(prev => ({
      ...prev,
      [storyId]: nextMuted
    }));
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="stories" className="pyt-stories-section">
      <div className="container">
        {/* Header matching Pickyourtrail: STORIES OF OUR TRAVELLERS 💖 + Ratings */}
        <div className="pyt-stories-header">
          <h2 className="pyt-stories-title">
            STORIES OF OUR TRAVELLERS <span className="pyt-heart">💖</span>
          </h2>

          <div className="pyt-trust-bar">
            {/* Google Rating */}
            <div className="pyt-rating-pill">
              <svg className="pyt-g-logo" viewBox="0 0 24 24" width="22" height="22">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <div className="pyt-rating-details">
                <span className="pyt-score">4.8<span className="pyt-scale">/5</span> <span className="pyt-star">★</span></span>
                <span className="pyt-count">85+ reviews</span>
              </div>
            </div>

            {/* Verified Guests Rating */}
            <div className="pyt-rating-pill">
              <div className="pyt-guest-badge">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
              </div>
              <div className="pyt-rating-details">
                <span className="pyt-score">4.9<span className="pyt-scale">/5</span> <span className="pyt-star">★</span></span>
                <span className="pyt-count">50,000+ Happy Guests</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Container with Pickyourtrail Arched Video Cards */}
        <div className="pyt-carousel-container">
          {/* Scroll Nav Buttons */}
          <button 
            type="button" 
            className="pyt-nav-arrow pyt-nav-left"
            onClick={() => handleScroll('left')}
            aria-label="Previous Stories"
          >
            <ChevronLeft size={22} />
          </button>

          <button 
            type="button" 
            className="pyt-nav-arrow pyt-nav-right"
            onClick={() => handleScroll('right')}
            aria-label="Next Stories"
          >
            <ChevronRight size={22} />
          </button>

          {/* Cards Track */}
          <div className="pyt-cards-track" ref={scrollRef}>
            {TRAVELER_STORIES.map((story) => {
              const isPlaying = playingId === story.id;
              const isMuted = mutedStates[story.id] ?? false;

              return (
                <div 
                  key={story.id} 
                  className={`pyt-card-wrapper ${isPlaying ? 'is-playing' : ''}`}
                  onClick={() => handleTogglePlay(story.id)}
                  title={isPlaying ? 'Click to pause' : 'Click to play'}
                >
                  <div className="pyt-arched-card">
                    {/* HTML5 Vertical Video */}
                    <video
                      ref={(el) => { if (el) videoRefs.current[story.id] = el; }}
                      src={story.videoUrl}
                      className="pyt-video-element"
                      playsInline
                      loop
                      preload="metadata"
                      onEnded={() => setPlayingId(null)}
                    />

                    {/* Subtle Top & Bottom Cinematic Vignette for depth */}
                    <div className="pyt-video-vignette" />

                    {/* Centered Frosted Play / Pause Icon Button */}
                    <div className={`pyt-play-indicator ${isPlaying ? 'playing' : 'paused'}`}>
                      {isPlaying ? (
                        <Pause size={24} color="#FFFFFF" strokeWidth={2.5} />
                      ) : (
                        <Play size={24} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: '3px' }} />
                      )}
                    </div>

                    {/* Sound Control Toggle (visible when playing or hovered) */}
                    {isPlaying && (
                      <button
                        type="button"
                        className="pyt-sound-btn"
                        onClick={(e) => handleToggleMute(e, story.id)}
                        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                        title={isMuted ? 'Unmute sound' : 'Mute sound'}
                      >
                        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Clean, Simple CTA Footer */}
        {onOpenQuote && (
          <div className="pyt-stories-cta">
            <div className="pyt-cta-content">
              <h3>Ready to create your own travel memories?</h3>
              <p>Customized international & domestic packages crafted just for you.</p>
            </div>
            <button className="btn-primary pyt-cta-btn" onClick={onOpenQuote}>
              <span>Plan My Trip</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        .pyt-stories-section {
          padding: 4.5rem 0 3.5rem 0;
          background: #000000;
          color: #FFFFFF;
          position: relative;
          overflow: hidden;
        }

        .pyt-stories-header {
          text-align: center;
          margin-bottom: 2.25rem;
        }

        .pyt-stories-title {
          font-family: var(--font-heading, inherit);
          font-size: clamp(1.8rem, 3.8vw, 2.75rem);
          font-weight: 900;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: #FFFFFF;
          margin: 0 0 1rem 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .pyt-heart {
          display: inline-block;
          font-style: normal;
        }

        .pyt-trust-bar {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
          flex-wrap: wrap;
          padding: 0.35rem 1.25rem;
        }

        .pyt-rating-pill {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .pyt-g-logo {
          flex-shrink: 0;
        }

        .pyt-guest-badge {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #1877F2;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
        }

        .pyt-rating-details {
          display: flex;
          align-items: baseline;
          gap: 0.45rem;
        }

        .pyt-score {
          font-size: 1.05rem;
          font-weight: 800;
          color: #FFFFFF;
        }

        .pyt-scale {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.75);
          font-weight: 600;
        }

        .pyt-star {
          color: #FFB800;
          font-size: 1.05rem;
          margin-left: 2px;
        }

        .pyt-count {
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.65);
          font-weight: 500;
        }

        /* Carousel Layout */
        .pyt-carousel-container {
          position: relative;
          width: 100%;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .pyt-cards-track {
          display: flex;
          gap: 1.25rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 1rem 0.5rem 1.5rem 0.5rem;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none; /* Hide scrollbar for seamless look */
        }

        .pyt-cards-track::-webkit-scrollbar {
          display: none;
        }

        /* Arched Video Card (Exact Pickyourtrail Arch Shape) */
        .pyt-card-wrapper {
          flex: 0 0 240px;
          width: 240px;
          height: 425px;
          scroll-snap-align: center;
          cursor: pointer;
          user-select: none;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pyt-card-wrapper:hover {
          transform: translateY(-4px);
        }

        .pyt-arched-card {
          position: relative;
          width: 100%;
          height: 100%;
          /* Signature Pickyourtrail stadium arch top */
          border-radius: 120px 120px 24px 24px;
          overflow: hidden;
          background: #080C14;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .pyt-card-wrapper:hover .pyt-arched-card {
          border-color: rgba(255, 255, 255, 0.25);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 137, 47, 0.2);
        }

        .pyt-card-wrapper.is-playing .pyt-arched-card {
          border-color: rgba(255, 137, 47, 0.6);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.85), 0 0 25px rgba(255, 137, 47, 0.3);
        }

        .pyt-video-element {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          background: #060A12;
        }

        /* Subtle vignette mask */
        .pyt-video-vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.15) 0%,
            transparent 25%,
            transparent 75%,
            rgba(0, 0, 0, 0.35) 100%
          );
        }

        /* Center Frosted Play/Pause Indicator */
        .pyt-play-indicator {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1.5px solid rgba(255, 255, 255, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.3s ease, transform 0.3s ease;
          pointer-events: none;
          z-index: 3;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
        }

        .pyt-play-indicator.playing {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.85);
        }

        .pyt-card-wrapper:hover .pyt-play-indicator.playing {
          opacity: 0.85;
          transform: translate(-50%, -50%) scale(1);
        }

        .pyt-card-wrapper:hover .pyt-play-indicator.paused {
          transform: translate(-50%, -50%) scale(1.1);
          background: rgba(255, 137, 47, 0.8);
          border-color: #FF892F;
        }

        /* Top Sound Toggle Button */
        .pyt-sound-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 4;
          transition: all 0.2s ease;
        }

        .pyt-sound-btn:hover {
          background: rgba(255, 137, 47, 0.85);
          border-color: #FF892F;
          transform: scale(1.1);
        }

        /* Carousel Navigation Buttons */
        .pyt-nav-arrow {
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

        .pyt-nav-arrow:hover {
          background: #FF892F;
          color: #FFFFFF;
          transform: translateY(-50%) scale(1.12);
          box-shadow: 0 6px 20px rgba(255, 137, 47, 0.5);
        }

        .pyt-nav-left {
          left: 0.25rem;
        }

        .pyt-nav-right {
          right: 0.25rem;
        }

        /* CTA Footer */
        .pyt-stories-cta {
          margin-top: 3rem;
          background: linear-gradient(135deg, rgba(20, 26, 40, 0.8) 0%, rgba(10, 14, 24, 0.95) 100%);
          border-radius: 20px;
          padding: 2rem 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .pyt-cta-content h3 {
          font-size: 1.35rem;
          color: #FFFFFF;
          margin: 0 0 0.35rem 0;
          font-weight: 700;
        }

        .pyt-cta-content p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.92rem;
          margin: 0;
        }

        .pyt-cta-btn {
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .pyt-stories-section {
            padding: 3rem 0 2.5rem 0;
          }

          .pyt-stories-title {
            font-size: 1.5rem;
          }

          .pyt-trust-bar {
            gap: 1.25rem;
          }

          .pyt-card-wrapper {
            flex: 0 0 190px;
            width: 190px;
            height: 340px;
          }

          .pyt-arched-card {
            border-radius: 95px 95px 20px 20px;
          }

          .pyt-nav-arrow {
            display: none; /* Swipe on mobile touch screens */
          }

          .pyt-stories-cta {
            flex-direction: column;
            text-align: center;
            padding: 1.5rem 1.25rem;
            gap: 1.25rem;
          }

          .pyt-cta-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
