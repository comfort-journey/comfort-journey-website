import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Layers, Mountain, Globe, Calendar, Route, Maximize, Minimize, ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';
import './styles/MapTab.css';

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

const TYPE_SVG_ICONS = {
  transport: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 11.2 2 11.6 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>`,
  sightseeing: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`,
  meal: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"/><path d="M15 11v11"/><path d="M5 2v4a3 3 0 0 0 3 3v13"/><path d="M8 2v4"/></svg>`,
  hotel: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>`,
  shopping: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`
};

const TYPE_COLORS = {
  transport: '#0284C7',
  sightseeing: '#EA580C',
  meal: '#10B981',
  hotel: '#8B5CF6',
  shopping: '#EC4899',
};

export default function MapTab({
  tour,
  enrichedItinerary = [],
  activeDay = 1,
  routeMode = 'day',
  selectedStop,
  currentDayStops = [],
  currentDayRoute = [],
  fullTourRoute = [],
  mapStyle = 'streets',
  setMapInstance,
  onDayChange,
  onStopSelect,
  onRouteModeChange,
  onMapStyleChange
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const currentTileLayerRef = useRef(null);
  const markersLayerRef = useRef(null);
  const polylineLayerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showStopsBar, setShowStopsBar] = useState(true);

  const currentDayData = enrichedItinerary.find(d => d.day === activeDay) || enrichedItinerary[0] || {};
  const activeStops = currentDayData.stops || [];
  const destinationName = tour?.destination || tour?.location || 'Destination';

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Find valid initial center
      const firstValidStop = activeStops.find(s => s.lat && s.lng) 
        || enrichedItinerary[0]?.stops?.find(s => s.lat && s.lng);

      const initialCenter = firstValidStop?.lat && firstValidStop?.lng
        ? [firstValidStop.lat, firstValidStop.lng]
        : [32.2190, 76.3234];

      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: 12,
        zoomControl: false,
        attributionControl: false
      });

      const preset = TILE_PRESETS[mapStyle] || TILE_PRESETS.streets;
      currentTileLayerRef.current = L.tileLayer(preset.url, {
        maxZoom: preset.maxZoom,
        subdomains: preset.subdomains
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      polylineLayerRef.current = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
      setMapInstance?.(map);

      // Invalidate size after render
      setTimeout(() => map.invalidateSize(), 200);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map layer on style change
  const handleStyleChange = useCallback((styleKey) => {
    if (styleKey === mapStyle || !mapInstanceRef.current) return;
    onMapStyleChange?.(styleKey);

    const map = mapInstanceRef.current;
    if (currentTileLayerRef.current) {
      map.removeLayer(currentTileLayerRef.current);
    }

    const preset = TILE_PRESETS[styleKey] || TILE_PRESETS.streets;
    currentTileLayerRef.current = L.tileLayer(preset.url, {
      maxZoom: preset.maxZoom,
      subdomains: preset.subdomains
    }).addTo(map);
  }, [mapStyle, onMapStyleChange]);

  // Update Markers & Polyline Route
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !markersLayerRef.current || !polylineLayerRef.current) return;

    map.invalidateSize();
    markersLayerRef.current.clearLayers();
    polylineLayerRef.current.clearLayers();

    let stopsToRender = [];
    if (routeMode === 'all') {
      enrichedItinerary.forEach(d => {
        (d.stops || []).forEach((s, idx) => {
          stopsToRender.push({
            ...s,
            dayNumber: d.day,
            stopNumber: `${d.day}.${idx + 1}`
          });
        });
      });
    } else {
      (currentDayData.stops || []).forEach((s, idx) => {
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
      const typeColor = TYPE_COLORS[stop.type] || TYPE_COLORS.sightseeing;

      const markerHtml = `
        <div class="itin-map-pin ${isSelected ? 'selected' : ''}" style="--pin-color: ${typeColor};">
          <div class="pin-seq">${stop.stopNumber}</div>
          <div class="pin-icon">${svgIcon}</div>
          <div class="pin-pointer"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'itin-leaflet-marker',
        html: markerHtml,
        iconSize: [38, 44],
        iconAnchor: [19, 42],
        popupAnchor: [0, -38]
      });

      const marker = L.marker(position, { icon: customIcon });

      // Rich Popup
      const popupHtml = `
        <div class="itin-map-popup">
          ${stop.image ? `<img src="${stop.image}" alt="${stop.title}" class="popup-img" />` : ''}
          <div class="popup-body">
            <span class="popup-time">${stop.time || ''} · ${stop.type || 'Activity'}</span>
            <h4 class="popup-title">${stop.title}</h4>
            <p class="popup-desc">${(stop.subtitle || stop.description || '').slice(0, 90)}...</p>
            <button class="popup-explore-btn" id="popup-btn-${stop.title.replace(/\s+/g, '-')}">
              View Stop Details
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, { maxWidth: 260, className: 'itin-custom-leaflet-popup' });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`popup-btn-${stop.title.replace(/\s+/g, '-')}`);
        if (btn) {
          btn.onclick = () => onStopSelect?.(stop);
        }
      });

      marker.on('click', () => {
        onStopSelect?.(stop);
      });

      markersLayerRef.current.addLayer(marker);
    });

    // Draw Route Polyline
    if (latLngs.length > 1) {
      // Glow background line
      const glowLine = L.polyline(latLngs, {
        color: '#EA580C',
        weight: 6,
        opacity: 0.35,
        lineCap: 'round',
        lineJoin: 'round'
      });
      polylineLayerRef.current.addLayer(glowLine);

      // Main dashed line
      const routeLine = L.polyline(latLngs, {
        color: '#C2410C',
        weight: 3.5,
        opacity: 0.9,
        dashArray: '8, 8',
        lineCap: 'round',
        lineJoin: 'round'
      });
      polylineLayerRef.current.addLayer(routeLine);

      // Fit bounds with comfortable padding
      const bounds = L.latLngBounds(latLngs);
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 14, animate: true });
    } else if (latLngs.length === 1) {
      map.flyTo(latLngs[0], 13, { animate: true, duration: 0.8 });
    }
  }, [activeDay, enrichedItinerary, routeMode, selectedStop, onStopSelect]);

  // Fly to selected stop when requested
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedStop || !selectedStop.lat || !selectedStop.lng) return;
    map.flyTo([selectedStop.lat, selectedStop.lng], 15, { animate: true, duration: 0.8 });
  }, [selectedStop]);

  return (
    <div className={`map-tab-v2 ${isFullscreen ? 'fullscreen-mode' : ''}`}>
      {/* Top Map Header Controls */}
      <div className="map-top-bar">
        <div className="map-bar-left">
          <div className="map-badge-live">
            <span className="live-dot" />
            <span className="live-text">
              {routeMode === 'all' 
                ? `Full Tour Route (${destinationName})` 
                : `Day ${activeDay}: ${currentDayData.title || destinationName}`}
            </span>
          </div>

          {/* Day Pills Navigation */}
          <div className="map-day-pills">
            <button
              type="button"
              className={`map-day-pill ${routeMode === 'all' ? 'active' : ''}`}
              onClick={() => onRouteModeChange?.('all')}
            >
              <Route size={12} />
              <span>All Days</span>
            </button>
            {enrichedItinerary.map(d => (
              <button
                key={d.day}
                type="button"
                className={`map-day-pill ${routeMode === 'day' && activeDay === d.day ? 'active' : ''}`}
                onClick={() => {
                  onRouteModeChange?.('day');
                  onDayChange?.(d.day);
                }}
              >
                <span>Day {d.day}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="map-bar-right">
          {/* Map Layer Switcher */}
          <div className="map-layer-selector">
            {Object.entries(TILE_PRESETS).map(([key, preset]) => (
              <button 
                key={key} 
                type="button" 
                className={`layer-btn ${mapStyle === key ? 'active' : ''}`}
                onClick={() => handleStyleChange(key)}
                title={preset.label}
              >
                {key === 'streets' && <Layers size={13} />}
                {key === 'topo' && <Mountain size={13} />}
                {key === 'satellite' && <Globe size={13} />}
                <span>{preset.label}</span>
              </button>
            ))}
          </div>

          <button 
            type="button" 
            className="map-fullscreen-btn"
            onClick={() => setIsFullscreen(!isFullscreen)}
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </button>
        </div>
      </div>

      {/* Map Canvas */}
      <div ref={mapContainerRef} className="map-canvas-container" />

      {/* Bottom Stops Carousel */}
      {activeStops.length > 0 && showStopsBar && (
        <div className="map-bottom-stops-tray">
          <div className="stops-tray-header">
            <span className="tray-title">Day {activeDay} Sequence ({activeStops.length} stops)</span>
            <button 
              type="button" 
              className="tray-toggle-btn"
              onClick={() => setShowStopsBar(false)}
            >
              Hide
            </button>
          </div>
          <div className="stops-tray-scroll">
            {activeStops.map((stop, idx) => {
              const isSelected = selectedStop?.title === stop.title;
              const typeColor = TYPE_COLORS[stop.type] || TYPE_COLORS.sightseeing;
              return (
                <div 
                  key={`${stop.title}-${idx}`}
                  className={`stop-mini-card ${isSelected ? 'active' : ''}`}
                  onClick={() => {
                    onStopSelect?.(stop);
                    if (stop.lat && stop.lng && mapInstanceRef.current) {
                      mapInstanceRef.current.flyTo([stop.lat, stop.lng], 15, { animate: true, duration: 0.6 });
                    }
                  }}
                >
                  <span className="mini-card-num" style={{ background: typeColor }}>{idx + 1}</span>
                  <div className="mini-card-info">
                    <span className="mini-card-time">{stop.time}</span>
                    <h5 className="mini-card-title">{stop.title}</h5>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Re-open Tray button if hidden */}
      {!showStopsBar && activeStops.length > 0 && (
        <button 
          type="button" 
          className="map-reopen-tray-btn"
          onClick={() => setShowStopsBar(true)}
        >
          <MapPin size={14} />
          <span>Show Stops ({activeStops.length})</span>
        </button>
      )}
    </div>
  );
}