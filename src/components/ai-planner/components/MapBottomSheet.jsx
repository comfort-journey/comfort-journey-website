import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Layers, Mountain, Globe, Calendar, Route, Navigation2, ChevronUp, ChevronDown, Maximize, Minimize } from 'lucide-react';

const TILE_PRESETS = {
  streets: { label: 'Streets', url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', maxZoom: 19, subdomains: ['a', 'b', 'c'] },
  topo: { label: 'Terrain', url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', maxZoom: 19, subdomains: ['server'] },
  satellite: { label: 'Satellite', url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', maxZoom: 19, subdomains: ['server'] }
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

export default function MapBottomSheet({
  tripPlan,
  activeDay,
  selectedStop,
  onStopSelect,
  isOpen,
  onClose,
  isFullscreen,
  onFullscreenChange
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const currentTileLayerRef = useRef(null);
  const markersLayerRef = useRef(null);
  const polylineLayerRef = useRef(null);
  const markersMapRef = useRef(new Map());
  const dragStartRef = useRef(null);
  const sheetRef = useRef(null);

  const [activeStyle, setActiveStyle] = useState('streets');
  const [routeMode, setRouteMode] = useState('day');
  const [sheetHeight, setSheetHeight] = useState('50vh');

  const currentDayData = tripPlan?.days?.find(d => d.day === activeDay) || tripPlan?.days?.[0];
  const destinationName = tripPlan?.destination || 'Destination';
  const activeStops = currentDayData?.stops || [];

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || !isOpen) return;

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
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isOpen]);

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
          stopsToRender.push({ ...s, dayNumber: d.day, stopNumber: `${d.day}.${idx + 1}` });
        });
      });
    } else {
      (currentDayData?.stops || []).forEach((s, idx) => {
        stopsToRender.push({ ...s, dayNumber: activeDay, stopNumber: `${idx + 1}` });
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
      const glowLine = L.polyline(latLngs, { color: '#FF892F', weight: 7, opacity: 0.45, lineCap: 'round', lineJoin: 'round' });
      polylineLayerRef.current.addLayer(glowLine);
      const routeLine = L.polyline(latLngs, { color: '#002B7F', weight: 3.5, opacity: 0.95, dashArray: '6, 8', lineCap: 'round', lineJoin: 'round' });
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
    map.flyTo([selectedStop.lat, selectedStop.lng], 14, { animate: true, duration: 0.8 });
  }, [selectedStop]);

  // Drag to resize sheet
  const handleDragStart = (e) => {
    dragStartRef.current = {
      y: e.clientY || e.touches?.[0]?.clientY,
      height: sheetRef.current?.offsetHeight || window.innerHeight / 2
    };
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('touchmove', handleDragMove, { passive: true });
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd);
    document.body.style.userSelect = 'none';
  };

  const handleDragMove = (e) => {
    if (!dragStartRef.current) return;
    const clientY = e.clientY || e.touches?.[0]?.clientY;
    const deltaY = dragStartRef.current.y - clientY;
    const newHeight = Math.max(300, Math.min(window.innerHeight - 100, dragStartRef.current.height + deltaY));
    setSheetHeight(`${newHeight}px`);
  };

  const handleDragEnd = () => {
    dragStartRef.current = null;
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('touchmove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('touchend', handleDragEnd);
    document.body.style.userSelect = '';
  };

  if (!isOpen || !tripPlan) return null;

  return (
    <div
      ref={sheetRef}
      className={`map-bottom-sheet ${isFullscreen ? 'fullscreen' : ''}`}
      style={{ height: isFullscreen ? '100vh' : sheetHeight }}
    >
      {/* Drag Handle */}
      <div className="sheet-handle" onMouseDown={handleDragStart} onTouchStart={handleDragStart} role="button" tabIndex={0} aria-label="Drag to resize map">
        <div className="handle-bar" />
      </div>

      {/* Sheet Header */}
      <div className="sheet-header">
        <div className="header-left">
          <span className="badge-pulse" aria-hidden="true" />
          <span className="badge-title">
            {routeMode === 'all' ? `FULL ${destinationName.toUpperCase()} TOUR` : `DAY ${activeDay} ROUTE`}
          </span>
        </div>
        <div className="header-right">
          <div className="route-mode-toggle">
            <button type="button" className={`route-toggle ${routeMode === 'day' ? 'active' : ''}`} onClick={() => setRouteMode('day')}>
              <Calendar size={11} /> <span>Day {activeDay}</span>
            </button>
            <button type="button" className={`route-toggle ${routeMode === 'all' ? 'active' : ''}`} onClick={() => setRouteMode('all')}>
              <Route size={11} /> <span>Full Tour</span>
            </button>
          </div>
          <button type="button" className="style-toggle" onClick={() => onFullscreenChange(!isFullscreen)} aria-label={isFullscreen ? 'Minimize map' : 'Expand map'}>
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </button>
        </div>
      </div>

      {/* Map Canvas */}
      <div ref={mapContainerRef} className="map-canvas" />

      {/* Floating Controls */}
      <div className="map-floating-controls">
        <div className="map-style-switcher">
          {Object.entries(TILE_PRESETS).map(([key, preset]) => (
            <button key={key} type="button" className={`style-btn ${activeStyle === key ? 'active' : ''}`} onClick={() => handleStyleChange(key)} title={preset.label}>
              {key === 'streets' && <Layers size={12} />}
              {key === 'topo' && <Mountain size={12} />}
              {key === 'satellite' && <Globe size={12} />}
              <span>{preset.label}</span>
            </button>
          ))}
        </div>
        <div className="map-hint">
          <Navigation2 size={12} />
          <span>Tap pins to explore · Drag handle to resize</span>
        </div>
      </div>

      <style jsx>{`
        .map-bottom-sheet {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--planner-navy-950);
          border-radius: var(--radius-xl) var(--radius-xl) 0 0;
          border-top: 1px solid var(--planner-border);
          box-shadow: 0 -20px 60px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          z-index: var(--z-sheet);
          overflow: hidden;
          transition: height var(--transition-base);
        }

        .map-bottom-sheet.fullscreen {
          height: 100vh !important;
          border-radius: 0;
          top: 0;
        }

        .sheet-handle {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          cursor: grab;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid var(--planner-border);
        }

        .handle-bar {
          width: 40px;
          height: 4px;
          background: var(--planner-text-subtle);
          border-radius: 2px;
          opacity: 0.5;
        }

        .sheet-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-3) var(--space-4);
          background: rgba(0, 18, 51, 0.9);
          border-bottom: 1px solid var(--planner-border);
          flex-wrap: wrap;
          gap: var(--space-2);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: var(--space-2);
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
          font-size: 0.7rem;
          color: var(--planner-tangerine-500);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }

        .route-mode-toggle {
          display: flex;
          gap: var(--space-1);
          background: rgba(255, 255, 255, 0.06);
          border-radius: var(--radius-full);
          padding: 2px;
        }

        .route-toggle {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          color: var(--planner-text-muted);
          font-size: 0.6rem;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .route-toggle:hover { color: var(--planner-text-heading); }
        .route-toggle.active { background: var(--planner-tangerine-500); color: var(--planner-navy-950); font-weight: 800; }

        .style-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--planner-text-muted);
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .style-toggle:hover {
          background: rgba(255, 137, 47, 0.15);
          border-color: var(--planner-tangerine-500);
          color: var(--planner-tangerine-500);
        }

        .map-canvas {
          flex: 1;
          width: 100%;
          min-height: 0;
        }

        .map-floating-controls {
          position: absolute;
          bottom: var(--space-4);
          left: var(--space-4);
          right: var(--space-4);
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          pointer-events: none;
          z-index: 1000;
        }

        .map-style-switcher {
          display: flex;
          background: rgba(0, 18, 51, 0.9);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-full);
          padding: var(--space-1);
          gap: var(--space-1);
          box-shadow: var(--planner-shadow-md);
          pointer-events: auto;
          align-self: flex-start;
        }

        .style-btn {
          display: inline-flex;
          align-items: center;
          gap: var(--space-1);
          background: none;
          border: none;
          color: var(--planner-text-muted);
          font-size: 0.6rem;
          font-weight: 600;
          padding: var(--space-1) var(--space-2);
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .style-btn:hover { color: var(--planner-text-heading); }
        .style-btn.active { background: var(--planner-tangerine-500); color: var(--planner-navy-950); font-weight: 800; }

        .map-hint {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          background: rgba(0, 18, 51, 0.88);
          backdrop-filter: blur(6px);
          padding: var(--space-1) var(--space-3);
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--planner-text-subtle);
          font-size: 0.6rem;
          pointer-events: none;
          align-self: flex-end;
        }

        /* Pin Styles */
        .custom-comfy-marker-container { background: none; border: none; }
        .comfy-modern-pin {
          position: relative; width: 38px; height: 38px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          border: 2.5px solid #FFFFFF; box-shadow: 0 5px 15px rgba(0,0,0,0.4);
          transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.25s ease;
          background: var(--pin-bg);
        }
        .pin-anchor-dot { position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%);
          width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 6px solid #FFFFFF; }
        .comfy-modern-pin:hover, .comfy-modern-pin.is-selected { transform: scale(1.22) translateY(-4px); z-index: 9999; }
        .comfy-modern-pin.is-selected { border-color: var(--planner-tangerine-500); box-shadow: 0 0 0 4px rgba(255,137,47,0.45), 0 8px 24px rgba(0,0,0,0.55); }
        .comfy-modern-pin.is-selected .pin-anchor-dot { border-top-color: var(--planner-tangerine-500); }
        .pin-badge-seq { position: absolute; top: -6px; right: -6px; background: var(--planner-navy-950); color: var(--planner-tangerine-500); font-weight: 800; font-size: 0.6rem;
          min-width: 17px; height: 17px; border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; padding: 0 3px;
          border: 1.5px solid var(--planner-tangerine-500); box-shadow: 0 2px 5px rgba(0,0,0,0.4); }
        .pin-icon-inner { color: #FFFFFF; display: flex; align-items: center; justify-content: center; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3)); }
        .leaflet-tooltip.comfy-marker-tooltip { background: var(--planner-navy-950) !important; color: var(--planner-text-heading) !important; border: 1px solid rgba(255,137,47,0.5) !important; border-radius: var(--radius-sm) !important; padding: var(--space-1) var(--space-2) !important; box-shadow: var(--planner-shadow-lg) !important; font-size: 0.7rem !important; }
      `}</style>
    </div>
  );
}