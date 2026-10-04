import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Layers, Mountain, Globe, Calendar, Route, Navigation2 } from 'lucide-react';

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
  transport: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 11.2 2 11.6 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>`,
  sightseeing: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`,
  meal: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"/><path d="M15 11v11"/><path d="M5 2v4a3 3 0 0 0 3 3v13"/><path d="M8 2v4"/></svg>`,
  hotel: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>`,
  shopping: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`
};

const TYPE_COLORS = {
  transport: '#0284C7',
  sightseeing: '#F59E0B',
  meal: '#10B981',
  hotel: '#8B5CF6',
  shopping: '#F43F5E',
};

export default function MapPanel({
  tripPlan,
  activeDay,
  selectedStop,
  onStopSelect,
  setMapInstance
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const currentTileLayerRef = useRef(null);
  const markersLayerRef = useRef(null);
  const polylineLayerRef = useRef(null);
  const markersMapRef = useRef(new Map());

  const [activeStyle, setActiveStyle] = useState('streets');
  const [routeMode, setRouteMode] = useState('day');

  const currentDayData = tripPlan?.days?.find(d => d.day === activeDay) || tripPlan?.days?.[0];
  const destinationName = tripPlan?.destination || 'Destination';

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const firstStop = tripPlan?.days?.[0]?.stops?.[0];
      const initialCenter = firstStop?.lat && firstStop?.lng
        ? [firstStop.lat, firstStop.lng]
        : [7.8804, 98.3923];

      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: 12,
        zoomControl: false,
        attributionControl: false
      });

      const preset = TILE_PRESETS[activeStyle] || TILE_PRESETS.streets;
      currentTileLayerRef.current = L.tileLayer(preset.url, {
        maxZoom: preset.maxZoom,
        subdomains: preset.subdomains
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      polylineLayerRef.current = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
      setMapInstance?.(map);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [setMapInstance]);

  // Switch Tile Style
  const handleStyleChange = useCallback((styleKey) => {
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
  }, [activeStyle]);

  // Update Markers & Polyline
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !markersLayerRef.current || !polylineLayerRef.current) return;

    map.invalidateSize();
    markersLayerRef.current.clearLayers();
    polylineLayerRef.current.clearLayers();
    markersMapRef.current.clear();

    let stopsToRender = [];
    if (routeMode === 'all') {
      tripPlan?.days?.forEach(d => {
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
      const typeColor = TYPE_COLORS[stop.type] || TYPE_COLORS.sightseeing;

      const markerHtml = `
        <div class="comfy-modern-pin ${isSelected ? 'is-selected' : ''}" style="--pin-bg: ${typeColor};">
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

      marker.on('click', () => {
        if (onStopSelect) onStopSelect(stop);
        map.flyTo(position, 14, { animate: true, duration: 0.8 });
      });

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

    if (latLngs.length > 1) {
      const glowLine = L.polyline(latLngs, {
        color: '#FF892F',
        weight: 7,
        opacity: 0.45,
        lineCap: 'round',
        lineJoin: 'round'
      });
      polylineLayerRef.current.addLayer(glowLine);

      const routeLine = L.polyline(latLngs, {
        color: '#002B7F',
        weight: 3.5,
        opacity: 0.95,
        dashArray: '6, 8',
        lineCap: 'round',
        lineJoin: 'round'
      });
      polylineLayerRef.current.addLayer(routeLine);

      const bounds = L.latLngBounds(latLngs);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14, animate: true });
    } else if (latLngs.length === 1) {
      map.flyTo(latLngs[0], 13, { animate: true, duration: 0.8 });
    }
  }, [activeDay, tripPlan?.days, routeMode, selectedStop, onStopSelect]);

  // Fly to selected stop
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
    <div className="map-panel">
      <div ref={mapContainerRef} className="map-canvas" />

      {/* Floating Route Badge */}
      <div className="map-floating-badge">
        <div className="badge-header">
          <span className="badge-pulse" aria-hidden="true" />
          <span className="badge-title">
            {routeMode === 'all'
              ? `FULL ${destinationName.toUpperCase()} TOUR ROUTE`
              : `DAY ${activeDay} ROUTE OVERVIEW`}
          </span>
        </div>

        <div className="route-mode-toggle">
          <button
            type="button"
            className={`route-toggle ${routeMode === 'day' ? 'active' : ''}`}
            onClick={() => setRouteMode('day')}
            title="View today's route"
          >
            <Calendar size={11} aria-hidden="true" />
            <span>Day {activeDay}</span>
          </button>
          <button
            type="button"
            className={`route-toggle ${routeMode === 'all' ? 'active' : ''}`}
            onClick={() => setRouteMode('all')}
            title="View full tour route"
          >
            <Route size={11} aria-hidden="true" />
            <span>Full Tour</span>
          </button>
        </div>

        <div className="badge-summary">
          <span>{routeMode === 'all' ? `${tripPlan?.days?.length || 0} Days` : `${activeStops.length} Stops`}</span>
          <span className="dot">•</span>
          <span>{destinationName}</span>
        </div>
      </div>

      {/* Map Style Switcher */}
      <div className="map-style-switcher">
        {Object.entries(TILE_PRESETS).map(([key, preset]) => (
          <button
            key={key}
            type="button"
            className={`style-btn ${activeStyle === key ? 'active' : ''}`}
            onClick={() => handleStyleChange(key)}
            title={`Switch to ${preset.label}`}
          >
            {key === 'streets' && <Layers size={12} aria-hidden="true" />}
            {key === 'topo' && <Mountain size={12} aria-hidden="true" />}
            {key === 'satellite' && <Globe size={12} aria-hidden="true" />}
            <span>{preset.label}</span>
          </button>
        ))}
      </div>

      {/* Map Hint */}
      <div className="map-hint" aria-hidden="true">
        <Navigation2 size={12} />
        <span>Click any stop or pin to explore</span>
      </div>

      <style>{`
        .map-panel {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: #E2E8F0;
        }

        .map-canvas {
          width: 100%;
          height: 100%;
        }

        .map-floating-badge {
          position: absolute;
          top: var(--space-4);
          left: var(--space-4);
          z-index: 1000;
          background: rgba(0, 18, 51, 0.94);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 137, 47, 0.4);
          border-radius: var(--radius-md);
          padding: var(--space-2) var(--space-3);
          color: var(--planner-text-heading);
          font-size: 0.75rem;
          box-shadow: var(--planner-shadow-lg);
          min-width: 220px;
        }

        .badge-header {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          margin-bottom: var(--space-2);
        }

        .badge-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 10px #10B981;
          animation: pulse 2s infinite;
        }

        .badge-title {
          font-weight: 700;
          letter-spacing: 0.02em;
          font-size: 0.65rem;
          color: var(--planner-tangerine-500);
          text-transform: uppercase;
        }

        .route-mode-toggle {
          display: flex;
          gap: var(--space-1);
          background: rgba(255, 255, 255, 0.06);
          border-radius: var(--radius-full);
          padding: 2px;
          margin-bottom: var(--space-2);
        }

        .route-toggle {
          display: inline-flex;
          align-items: center;
          gap: var(--space-1);
          background: none;
          border: none;
          color: var(--planner-text-muted);
          font-size: 0.62rem;
          font-weight: 600;
          padding: var(--space-1) var(--space-2);
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .route-toggle:hover {
          color: var(--planner-text-heading);
        }

        .route-toggle.active {
          background: var(--planner-tangerine-500);
          color: var(--planner-navy-950);
          font-weight: 800;
        }

        .badge-summary {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: 0.65rem;
          color: var(--planner-text-subtle);
        }

        .dot {
          color: var(--planner-text-subtle);
        }

        .map-style-switcher {
          position: absolute;
          top: var(--space-4);
          right: var(--space-4);
          z-index: 1000;
          display: flex;
          background: rgba(0, 18, 51, 0.9);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-full);
          padding: var(--space-1);
          gap: var(--space-1);
          box-shadow: var(--planner-shadow-md);
        }

        .style-btn {
          display: inline-flex;
          align-items: center;
          gap: var(--space-1);
          background: none;
          border: none;
          color: var(--planner-text-muted);
          font-size: 0.62rem;
          font-weight: 600;
          padding: var(--space-1) var(--space-2);
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .style-btn:hover {
          color: var(--planner-text-heading);
        }

        .style-btn.active {
          background: var(--planner-tangerine-500);
          color: var(--planner-navy-950);
          font-weight: 800;
        }

        .map-hint {
          position: absolute;
          bottom: var(--space-4);
          left: var(--space-4);
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: var(--space-2);
          background: rgba(0, 18, 51, 0.88);
          backdrop-filter: blur(6px);
          padding: var(--space-1) var(--space-3);
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--planner-text-muted);
          font-size: 0.65rem;
          pointer-events: none;
        }

        /* Modern Pin Styles */
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
          background: var(--pin-bg);
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
          border-color: var(--planner-tangerine-500);
          box-shadow: 0 0 0 4px rgba(255, 137, 47, 0.45), 0 8px 24px rgba(0, 0, 0, 0.55);
        }

        .comfy-modern-pin.is-selected .pin-anchor-dot {
          border-top-color: var(--planner-tangerine-500);
        }

        .pin-badge-seq {
          position: absolute;
          top: -6px;
          right: -6px;
          background: var(--planner-navy-950);
          color: var(--planner-tangerine-500);
          font-weight: 800;
          font-size: 0.6rem;
          min-width: 17px;
          height: 17px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
          border: 1.5px solid var(--planner-tangerine-500);
          box-shadow: 0 2px 5px rgba(0,0,0,0.4);
        }

        .pin-icon-inner {
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
        }

        .leaflet-tooltip.comfy-marker-tooltip {
          background: var(--planner-navy-950) !important;
          color: var(--planner-text-heading) !important;
          border: 1px solid rgba(255, 137, 47, 0.5) !important;
          border-radius: var(--radius-sm) !important;
          padding: var(--space-1) var(--space-2) !important;
          box-shadow: var(--planner-shadow-lg) !important;
          font-size: 0.7rem !important;
        }
      `}</style>
    </div>
  );
}