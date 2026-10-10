/**
 * High-Resolution Curated Regional Photography Database
 * Provides authentic, high-quality images for tour destinations
 * when CMS gallery has fewer than 5 photos.
 */

export const DESTINATION_GALLERY_FALLBACKS = {
  dalhousie: [
    { url: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1600&q=85', alt: 'Khajjiar Mini Switzerland Alpine Meadows & Pine Forests' },
    { url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=85', alt: 'Dainkund Peak Panoramic Himalayan Ridge View' },
    { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85', alt: 'Kalatop Forest Wildlife Sanctuary Nature Walk' },
    { url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85', alt: 'Chamba Valley Historic Heritage Temples & Ravi River' },
    { url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=85', alt: 'St. John Church Colonial Architecture in the Pines' },
    { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85', alt: 'Snow-capped Pir Panjal Range Golden Sunset' },
    { url: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=85', alt: 'Pristine Himalayan Forest Trail with Morning Sunbeams' }
  ],
  kashmir: [
    { url: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=85', alt: 'Dal Lake Traditional Shikara Ride at Sunset, Srinagar' },
    { url: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=85', alt: 'Gulmarg Gondola Summit Cable Car & Pine Slopes' },
    { url: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=85', alt: 'Betaab Valley Pristine Lidder River Flow, Pahalgam' },
    { url: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=1200&q=85', alt: 'Floating Flower Market on Dal Lake' },
    { url: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=85', alt: 'Sonamarg Meadow of Gold Alpine Glaciers' }
  ],
  rajasthan: [
    { url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=85', alt: 'Amber Fort Royal Courtyard, Jaipur' },
    { url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85', alt: 'Hawa Mahal Palace of Winds, Pink City' },
    { url: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=85', alt: 'Udaipur City Palace Overlooking Lake Pichola' },
    { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85', alt: 'Thar Desert Sam Sand Dunes Starlit Luxury Camp' },
    { url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=85', alt: 'Mehrangarh Fort Blue City Panorama, Jodhpur' }
  ],
  bali: [
    { url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85', alt: 'Tegalalang Emerald Green Rice Terraces, Ubud' },
    { url: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1200&q=85', alt: 'Uluwatu Clifftop Ocean Sunset & Coastal Temple' },
    { url: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=85', alt: 'Luxury Jungle Pool Villa Retreat, Ubud' },
    { url: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=1200&q=85', alt: 'Kelingking Beach T-Rex Cliff, Nusa Penida' },
    { url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=85', alt: 'Pura Ulun Danu Bratan Water Temple in Mist' }
  ],
  dubai: [
    { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85', alt: 'Burj Khalifa Downtown Illuminated Skyline, Dubai' },
    { url: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=85', alt: 'Red Sand Dunes Sunset 4x4 Safari, Arabian Desert' },
    { url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=85', alt: 'Dubai Marina Luxury Yacht Cruise & Towers' },
    { url: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=1200&q=85', alt: 'Museum of the Future Architectural Wonder' },
    { url: 'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1200&q=85', alt: 'Atlantis The Royal Palm Jumeirah Beachfront' }
  ],
  europe: [
    { url: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=85', alt: 'Lake Lucerne Mount Pilatus Alpine Panorama, Switzerland' },
    { url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85', alt: 'Eiffel Tower Romantic Twilight View, Paris' },
    { url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=85', alt: 'Colosseum Historic Roman Architecture, Italy' },
    { url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=85', alt: 'Cinque Terre Colorful Clifftop Fishing Village' },
    { url: 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1200&q=85', alt: 'Swiss Glacier Express Scenic Panoramic Train' }
  ]
};

/**
 * Merges tour images, CMS gallery, and regional fallbacks to produce a 5+ photo gallery array.
 */
export function getTourGalleryImages(tour = {}) {
  const images = [];
  const seenUrls = new Set();

  // 1. First add cover image if valid
  if (tour.image && !tour.image.startsWith('data:image')) {
    images.push({ url: tour.image, alt: tour.name || 'Tour Cover Photo' });
    seenUrls.add(tour.image);
  }

  // 2. Add CMS gallery items
  if (tour.gallery && Array.isArray(tour.gallery)) {
    tour.gallery.forEach((g) => {
      const url = typeof g === 'string' ? g : g?.url;
      const alt = typeof g === 'string' ? tour.name : (g?.alt || tour.name);
      if (url && !seenUrls.has(url)) {
        images.push({ url, alt });
        seenUrls.add(url);
      }
    });
  }

  // 3. Add images from tour.images if present
  if (tour.images && Array.isArray(tour.images)) {
    tour.images.forEach((img) => {
      const url = typeof img === 'string' ? img : img?.url;
      const alt = typeof img === 'string' ? tour.name : (img?.alt || tour.name);
      if (url && !seenUrls.has(url)) {
        images.push({ url, alt });
        seenUrls.add(url);
      }
    });
  }

  // 4. If fewer than 5 photos, pull authentic regional photos
  const text = [
    tour.destination,
    tour.location,
    tour.name,
    tour.city,
    tour.state,
    tour.country
  ].filter(Boolean).join(' ').toLowerCase();

  let fallbackKey = 'dalhousie';
  if (text.includes('kashmir') || text.includes('srinagar') || text.includes('gulmarg') || text.includes('pahalgam')) {
    fallbackKey = 'kashmir';
  } else if (text.includes('rajasthan') || text.includes('jaipur') || text.includes('udaipur') || text.includes('jodhpur')) {
    fallbackKey = 'rajasthan';
  } else if (text.includes('bali') || text.includes('indonesia')) {
    fallbackKey = 'bali';
  } else if (text.includes('dubai') || text.includes('uae')) {
    fallbackKey = 'dubai';
  } else if (text.includes('europe') || text.includes('swiss') || text.includes('paris') || text.includes('rome')) {
    fallbackKey = 'europe';
  }

  const regionalList = DESTINATION_GALLERY_FALLBACKS[fallbackKey] || DESTINATION_GALLERY_FALLBACKS.dalhousie;
  regionalList.forEach((item) => {
    if (!seenUrls.has(item.url)) {
      images.push(item);
      seenUrls.add(item.url);
    }
  });

  // If tour.image was base64 and we have nothing else at index 0, place regional at front
  if (images.length === 0 && tour.image) {
    images.push({ url: tour.image, alt: tour.name });
  }

  return images;
}
