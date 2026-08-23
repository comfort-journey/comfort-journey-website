import React from 'react';
import { X, Heart, Trash2, ArrowRight, MessageCircle, Clock, MapPin } from 'lucide-react';
import { TOURS_DATA } from '../data/toursData';
import { useCurrency } from '../context/CurrencyContext';
import { useWishlistCompare } from '../context/WishlistCompareContext';

export default function WishlistDrawer({ onSelectItinerary, onBookTour }) {
  const { formatPrice } = useCurrency();
  const { wishlist, toggleWishlist, isWishlistOpen, setIsWishlistOpen } = useWishlistCompare();

  if (!isWishlistOpen) return null;

  const savedTours = TOURS_DATA.filter((tour) => wishlist.includes(tour.id));

  return (
    <div className="wishlist-overlay" onClick={() => setIsWishlistOpen(false)}>
      <div className="wishlist-drawer-content" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="title-row">
            <Heart size={20} className="text-amber fill-amber" />
            <h3>Saved Wishlist ({savedTours.length})</h3>
          </div>
          <button className="close-drawer-btn" onClick={() => setIsWishlistOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Saved List */}
        <div className="saved-items-list">
          {savedTours.length > 0 ? (
            savedTours.map((tour) => (
              <div key={tour.id} className="saved-tour-card glass-card">
                <img src={tour.image} alt={tour.name} className="saved-thumb" />
                <div className="saved-info">
                  <span className="saved-cat">{tour.category}</span>
                  <h4 className="saved-name">{tour.name}</h4>
                  <div className="saved-meta">
                    <span><Clock size={12} /> {tour.duration}</span>
                    <strong className="saved-price">{formatPrice(tour.price)}</strong>
                  </div>

                  <div className="saved-actions">
                    <button
                      className="btn-secondary mini-btn"
                      onClick={() => {
                        setIsWishlistOpen(false);
                        onSelectItinerary(tour);
                      }}
                    >
                      Itinerary
                    </button>
                    <button
                      className="btn-primary mini-btn"
                      onClick={() => {
                        setIsWishlistOpen(false);
                        onBookTour(tour);
                      }}
                    >
                      Book Now
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => toggleWishlist(tour.id)}
                      title="Remove"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-wishlist">
              <Heart size={44} className="text-muted" />
              <h4>Your Wishlist is Empty</h4>
              <p>Click the heart icon on any tour card to save packages here for easy comparison and booking.</p>
              <button 
                className="btn-primary"
                onClick={() => setIsWishlistOpen(false)}
              >
                Browse Packages
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {savedTours.length > 0 && (
          <div className="drawer-footer">
            <button
              className="btn-whatsapp w-full"
              onClick={() => {
                const tourNames = savedTours.map((t) => t.name).join(', ');
                const msg = encodeURIComponent(`Hi Comfort Journey! I have saved these tours in my wishlist on your website: ${tourNames}. Please share details!`);
                window.open(`https://wa.me/918770403315?text=${msg}`, '_blank');
              }}
            >
              <MessageCircle size={18} />
              Inquire Wishlist via WhatsApp
            </button>
          </div>
        )}
      </div>

      <style>{`
        .wishlist-overlay {
          position: fixed;
          inset: 0;
          background: rgba(7, 11, 20, 0.75);
          backdrop-filter: blur(10px);
          z-index: 99999;
          display: flex;
          justify-content: flex-end;
          animation: fadeIn 0.25s ease-out;
        }

        .wishlist-drawer-content {
          width: 100%;
          max-width: 440px;
          height: 100%;
          background: var(--cj-bg-panel);
          border-left: 1px solid var(--cj-glass-border);
          display: flex;
          flex-direction: column;
          box-shadow: -10px 0 40px rgba(0, 0, 0, 0.6);
          animation: slideFromRight 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideFromRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .drawer-header {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--cj-glass-border);
        }

        .title-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .title-row h3 {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          color: #FFFFFF;
        }

        .close-drawer-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .saved-items-list {
          flex: 1;
          overflow-y: auto;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .saved-tour-card {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: rgba(19, 29, 51, 0.8);
          border-radius: var(--radius-md);
        }

        .saved-thumb {
          width: 85px;
          height: 85px;
          border-radius: var(--radius-sm);
          object-fit: cover;
          flex-shrink: 0;
        }

        .saved-info {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          flex: 1;
        }

        .saved-cat {
          font-family: var(--font-ui);
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--cj-amber-500);
          text-transform: uppercase;
        }

        .saved-name {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          color: #FFFFFF;
          line-height: 1.3;
        }

        .saved-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #94A3B8;
        }

        .saved-price {
          font-family: var(--font-serif);
          color: var(--cj-gold-500);
          font-size: 1.15rem;
          font-weight: 900;
        }

        .saved-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.4rem;
        }

        .mini-btn {
          padding: 0.45rem 0.85rem;
          font-size: 0.82rem;
          min-height: 38px;
        }

        .delete-btn {
          color: #94A3B8;
          padding: 0.45rem;
          transition: color 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .delete-btn:hover {
          color: #EF4444;
        }

        .empty-wishlist {
          text-align: center;
          padding: 4rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: #94A3B8;
        }

        .empty-wishlist h4 {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          color: #FFFFFF;
        }

        .drawer-footer {
          padding: 1.25rem;
          border-top: 1px solid var(--cj-glass-border);
          background: var(--cj-bg-card);
        }

        @media (max-width: 600px) {
          .wishlist-drawer-content {
            max-width: 100%;
          }
          .drawer-footer button {
            min-height: 48px;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
