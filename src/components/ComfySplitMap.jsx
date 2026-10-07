import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation2, Layers, Mountain, Globe, Route, Calendar } from 'lucide-react';

/**
 * Tile Providers - 100% Free & Open (NO API Key Needed, Zero Watermarks)
 */
const TILE_PRESETS = {
  streets: {
    label: 'Streets',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    maxZoom: 19,
    subdomains: ['a', 'b', 'c'],
    attribution: '© OpenStreetMap contributors'
  },
  topo: {
    label: 'Terrain',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    maxZoom: 19,
    subdomains: ['server'],
    attribution: '© Esri Topo'
  },
  satellite: {
    label: 'Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    maxZoom: 19,
    subdomains: ['server'],
    attribution: '© Esri Satellite'
  }
};

// Clean, modern luxury stroke SVG icons for map pins (100% Crisp & High-End)
const TYPE_SVG_ICONS = {
  transport: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 11.2 2 11.6 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>`,
  sightseeing: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`,
  meal: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"/><path d="M15 11v11"/><path d="M5 2v4a3 3 0 0 0 3 3v13"/><path d="M8 2v4"/></svg>`,
  hotel: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>`,
  shopping: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`
};


/**
 * ComfySplitMap - Interactive Leaflet Map for Comfy.ai Planner
 * Inspired by Trip.com's Split-Screen Map & Route View.
 * 100% Free to use, zero API key required, crystal-clear worldwide map tiles.
 */
export default function ComfySplitMap({
  activeDay = 1,
  days = [],
  selectedStop = null,
  onSelectStop = null,
  destinationName = 'Kashmir'
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const currentTileLayerRef = useRef(null);
  const markersLayerRef = useRef(null);
  const polylineLayerRef = useRef(null);
  const markersMapRef = useRef(new Map());

  // Map tile style selector: 'streets' | 'topo' | 'satellite'
  const [activeStyle, setActiveStyle] = useState('streets');

  // Route View Mode: 'day' (Active day route) | 'all' (Full multi-day tour route)
  const [routeMode, setRouteMode] = useState('day');

  // Active day data
  const currentDayData = days.find(d => d.day === activeDay) || days[0];

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const firstStop = days[0]?.stops?.[0];
      const initialCenter = firstStop?.lat && firstStop?.lng 
        ? [firstStop.lat, firstStop.lng] 
        : [7.8804, 98.3923];

      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: 12,
        zoomControl: false,
        attributionControl: false
      });

      // Add 100% Free OpenStreetMap Tile Layer (NO API Key required)
      const preset = TILE_PRESETS[activeStyle] || TILE_PRESETS.streets;
      currentTileLayerRef.current = L.tileLayer(preset.url, {
        maxZoom: preset.maxZoom,
        subdomains: preset.subdomains
      }).addTo(map);

      // Custom Zoom Control at bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      polylineLayerRef.current = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Switch Tile Style (Streets vs Terrain vs Satellite)
  const handleStyleChange = (styleKey) => {
    if (styleKey === activeStyle || !mapInstanceRef.current) return;
    setActiveStyle(styleKey);

    const map = mapInstanceRef.current;
    if (currentTileLayerRef.current) {
      map.removeLayer(currentTileLayerRef.current);
    }

    const preset = TILE_PRESETS[styleKey];
    currentTileLayerRef.current = L.tileLayer(preset.url, {
      maxZoom: preset.maxZoom,
      subdomains: preset.subdomains
    }).addTo(map);
  };

  // Update Markers & Polyline when activeDay, days, or routeMode changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !markersLayerRef.current || !polylineLayerRef.current) return;

    // Invalidate size immediately so Leaflet knows true container dimensions
    map.invalidateSize();

    // Clear previous markers & polylines
    markersLayerRef.current.clearLayers();
    polylineLayerRef.current.clearLayers();
    markersMapRef.current.clear();

    // Determine stops to display based on routeMode
    let stopsToRender = [];
    if (routeMode === 'all') {
      days.forEach(d => {
        (d.stops || []).forEach((s, idx) => {
          stopsToRender.push({
            ...s,
            dayNumber: d.day,
            stopNumber: `${d.day}.${idx + 1}`
          });
        });
      });
    } else {
      (currentDayData?.stops || []).forEach((s, idx) => {
        stopsToRender.push({
          ...s,
          dayNumber: activeDay,
          stopNumber: `${idx + 1}`
        });
      });
    }

    if (!stopsToRender.length) return;

    const latLngs = [];

    stopsToRender.forEach((stop) => {
      if (!stop.lat || !stop.lng) return;

      const position = [stop.lat, stop.lng];
      latLngs.push(position);

      const isSelected = selectedStop?.title === stop.title;
      const svgIcon = TYPE_SVG_ICONS[stop.type] || TYPE_SVG_ICONS.sightseeing;

      // Modern luxury map pin with circular badge and anchor caret
      const markerHtml = `
        <div class="comfy-modern-pin ${isSelected ? 'is-selected' : ''} type-${stop.type}">
          <div class="pin-badge-seq">${stop.stopNumber}</div>
          <div class="pin-icon-inner">${svgIcon}</div>
          <div class="pin-anchor-dot"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-comfy-marker-container',
        html: markerHtml,
        iconSize: [42, 48],
        iconAnchor: [21, 46],
        popupAnchor: [0, -44]
      });

      const marker = L.marker(position, { icon: customIcon });

      // Click to select stop
      marker.on('click', () => {
        if (onSelectStop) onSelectStop(stop);
        map.flyTo(position, 14, { animate: true, duration: 0.8 });
      });

      // Tooltip
      marker.bindTooltip(`
        <div class="comfy-marker-tooltip">
          <strong>Day ${stop.dayNumber} · ${stop.title}</strong>
          <div>${stop.subtitle || ''}</div>
          <small>${stop.time || ''} · ${stop.duration || ''}</small>
        </div>
      `, { direction: 'top', offset: [0, -40] });

      markersLayerRef.current.addLayer(marker);
      markersMapRef.current.set(stop.title, marker);
    });

    // Draw route polyline if 2 or more stops exist
    if (latLngs.length > 1) {
      // Glow polyline
      const glowLine = L.polyline(latLngs, {
        color: '#FF892F',
        weight: 7,
        opacity: 0.45,
        lineCap: 'round',
        lineJoin: 'round'
      });
      polylineLayerRef.current.addLayer(glowLine);

      // Core route polyline
      const routeLine = L.polyline(latLngs, {
        color: '#002B7F',
        weight: 3.5,
        opacity: 0.95,
        dashArray: '6, 8',
        lineCap: 'round',
        lineJoin: 'round'
      });
      polylineLayerRef.current.addLayer(routeLine);

      // Fit map bounds to show full route with padding
      const bounds = L.latLngBounds(latLngs);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14, animate: true });
    } else if (latLngs.length === 1) {
      map.flyTo(latLngs[0], 13, { animate: true, duration: 0.8 });
    }
  }, [activeDay, days, routeMode]);

  // When selectedStop is changed via parent click, center on it smoothly
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedStop || !selectedStop.lat || !selectedStop.lng) return;

    map.flyTo([selectedStop.lat, selectedStop.lng], 14, {
      animate: true,
      duration: 0.8
    });
  }, [selectedStop]);

  const activeStops = currentDayData?.stops || [];

  return (
    <div className="comfy-split-map-wrapper">
      {/* Real Map Canvas */}
      <div ref={mapContainerRef} className="comfy-leaflet-canvas" />

      {/* Floating Route Info Banner (Trip.com Inspired) */}
      <div className="comfy-map-floating-badge">
        <div className="badge-header">
          <div className="badge-pulse-dot" />
          <span className="badge-title">
            {routeMode === 'all' 
              ? `FULL ${destinationName.toUpperCase()} TOUR ROUTE` 
              : `DAY ${activeDay} ROUTE OVERVIEW`}
          </span>
        </div>

        {/* Route View Switcher: Day vs Full Tour */}
        <div className="map-route-mode-toggle">
          <button
            type="button"
            className={`route-toggle-btn ${routeMode === 'day' ? 'active' : ''}`}
            onClick={() => setRouteMode('day')}
            title="View today's specific route and stops"
          >
            <Calendar size={11} />
            <span>Day {activeDay}</span>
          </button>
          <button
            type="button"
            className={`route-toggle-btn ${routeMode === 'all' ? 'active' : ''}`}
            onClick={() => setRouteMode('all')}
            title="View full vacation tour itinerary on map"
          >
            <Route size={11} />
            <span>Full Tour</span>
          </button>
        </div>

        <div className="badge-stops-summary">
          <span>{routeMode === 'all' ? `${days.length} Days Itinerary` : `${activeStops.length} Stops planned`}</span>
          <span className="dot-separator">•</span>
          <span>{destinationName}</span>
        </div>
      </div>

      {/* Map Style Selector Pill (Clean SVGs: Streets, Terrain, Satellite) */}
      <div className="comfy-map-style-switcher">
        {Object.entries(TILE_PRESETS).map(([key, preset]) => (
          <button
            key={key}
            type="button"
            className={`map-style-btn ${activeStyle === key ? 'active' : ''}`}
            onClick={() => handleStyleChange(key)}
            title={`Switch to ${preset.label}`}
          >
            {key === 'streets' && <Layers size={12} />}
            {key === 'topo' && <Mountain size={12} />}
            {key === 'satellite' && <Globe size={12} />}
            <span>{preset.label}</span>
          </button>
        ))}
      </div>

      {/* Map Helper Hint */}
      <div className="comfy-map-hint">
        <Navigation2 size={12} />
        <span>Click any stop or pin to zoom and explore nearby places</span>
      </div>

      <style>{`
        .comfy-split-map-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 420px;
          border-radius: 16px;
          overflow: hidden;
          background: #E2E8F0;
          border: 1px solid rgba(255, 137, 47, 0.25);
          box-shadow: inset 0 0 25px rgba(0, 0, 0, 0.2);
        }

        .comfy-leaflet-canvas {
          width: 100%;
          height: 100%;
          min-height: 420px;
        }

        /* Floating Trip.com style Route Badge */
        .comfy-map-floating-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 1000;
          background: rgba(0, 18, 51, 0.94);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 137, 47, 0.4);
          border-radius: 12px;
          padding: 8px 12px;
          color: var(--cj-text-heading);
          font-size: 0.78rem;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
        }

        .badge-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 6px;
        }

        .badge-pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px #10B981;
        }

        .badge-title {
          font-weight: 700;
          letter-spacing: 0.5px;
          font-size: 0.7rem;
          color: #FF892F;
        }

        .map-route-mode-toggle {
          display: flex;
          gap: 4px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 2px;
          margin-bottom: 5px;
        }

        .route-toggle-btn {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.68rem;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: all 0.2s ease;
        }

        .route-toggle-btn:hover {
          color: var(--cj-text-heading);
        }

        .route-toggle-btn.active {
          background: #FF892F;
          color: #001233;
          font-weight: 800;
        }

        .badge-stops-summary {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .dot-separator {
          color: rgba(255, 255, 255, 0.3);
        }

        /* Map Style Switcher (Streets / Terrain / Satellite) */
        .comfy-map-style-switcher {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 1000;
          display: flex;
          background: rgba(0, 18, 51, 0.9);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          padding: 3px;
          gap: 3px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
        }

        .map-style-btn {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.7rem;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 14px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: all 0.2s ease;
        }

        .map-style-btn:hover {
          color: var(--cj-text-heading);
        }

        .map-style-btn.active {
          background: #FF892F;
          color: #001233;
          font-weight: 800;
        }

        .comfy-map-hint {
          position: absolute;
          bottom: 14px;
          left: 14px;
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(0, 18, 51, 0.88);
          backdrop-filter: blur(6px);
          padding: 5px 11px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.85);
          font-size: 0.7rem;
          pointer-events: none;
        }

        /* Modern Luxury Map Pin Styling */
        .custom-comfy-marker-container {
          background: none;
          border: none;
        }

        .comfy-modern-pin {
          position: relative;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 2.5px solid #FFFFFF;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
          transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.25s ease;
        }

        .comfy-modern-pin.type-transport {
          background: linear-gradient(135deg, #0284C7, #0369A1);
        }
        .comfy-modern-pin.type-sightseeing {
          background: linear-gradient(135deg, #F59E0B, #D97706);
        }
        .comfy-modern-pin.type-meal {
          background: linear-gradient(135deg, #10B981, #059669);
        }
        .comfy-modern-pin.type-hotel {
          background: linear-gradient(135deg, #8B5CF6, #7C3AED);
        }
        .comfy-modern-pin.type-shopping {
          background: linear-gradient(135deg, #F43F5E, #E11D48);
        }

        .pin-anchor-dot {
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 6px solid #FFFFFF;
        }

        .comfy-modern-pin:hover, .comfy-modern-pin.is-selected {
          transform: scale(1.22) translateY(-4px);
          z-index: 9999;
        }

        .comfy-modern-pin.is-selected {
          border-color: #FF892F;
          box-shadow: 0 0 0 4px rgba(255, 137, 47, 0.45), 0 8px 24px rgba(0, 0, 0, 0.55);
        }

        .comfy-modern-pin.is-selected .pin-anchor-dot {
          border-top-color: #FF892F;
        }

        .pin-badge-seq {
          position: absolute;
          top: -6px;
          right: -6px;
          background: #001233;
          color: #FF892F;
          font-weight: 800;
          font-size: 0.65rem;
          min-width: 17px;
          height: 17px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
          border: 1.5px solid #FF892F;
          box-shadow: 0 2px 5px rgba(0,0,0,0.4);
        }

        .pin-icon-inner {
          color: var(--cj-text-heading);
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
        }

        .comfy-modern-pin.is-selected .pin-pulse {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 2px solid rgba(255, 137, 47, 0.6);
          animation: mapPinPulse 1.6s infinite;
        }


        @keyframes mapPinPulse {
          0% { transform: scale(1); opacity: 0.9; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        /* Marker Tooltip — dark navy in BOTH themes (readable on map tiles) */
        .leaflet-tooltip.comfy-marker-tooltip {
          background: #001233 !important;
          color: #FFFFFF !important;
          border: 1px solid rgba(255, 137, 47, 0.5) !important;
          border-radius: 8px !important;
          padding: 6px 10px !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5) !important;
          font-size: 0.75rem !important;
        }

        /* LIGHT THEME — white map control chips (tooltips stay dark) */
        :root:not([data-theme="dark"]) .comfy-map-floating-badge,
        [data-theme="light"] .comfy-map-floating-badge,
        :root:not([data-theme="dark"]) .route-toggle-btn,
        [data-theme="light"] .route-toggle-btn,
        :root:not([data-theme="dark"]) .map-style-btn,
        [data-theme="light"] .map-style-btn {
          background: #FFFFFF;
          border-color: var(--cj-line, #E8E0CF);
        }
      `}</style>
    </div>
  );
}

