import React, { useState } from 'react';
import { Sun, CloudRain, Thermometer, Wind, Info, CalendarCheck2, Sparkles } from 'lucide-react';
import { getDestinationClimate } from '../../../data/destinationClimates';
import './styles/WeatherMonthlySection.css';

export default function WeatherMonthlySection({ tour }) {
  const climate = getDestinationClimate(tour);
  const [selectedMonth, setSelectedMonth] = useState(null);

  if (!climate || !climate.months?.length) return null;

  // Find min and max temp to scale bar heights dynamically
  const temps = climate.months.map(m => m.avgTempC);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const tempRange = Math.max(1, maxTemp - minTemp);

  const getBarHeightPercent = (temp) => {
    // Keep minimum height of 28% and maximum of 95%
    const normalized = (temp - minTemp) / tempRange;
    return Math.round(28 + normalized * 67);
  };

  const getStatusColorClass = (status) => {
    switch (status) {
      case 'best': return 'status-best';
      case 'good': return 'status-good';
      case 'hot': return 'status-hot';
      case 'rainy': return 'status-rainy';
      default: return 'status-good';
    }
  };

  const activeMonthData = selectedMonth 
    ? climate.months.find(m => m.month === selectedMonth) 
    : (climate.months.find(m => m.status === 'best') || climate.months[4]);

  return (
    <section id="weather" className="weather-section-root">
      {/* Eyebrow Label */}
      <div className="weather-eyebrow">
        <Sun size={14} className="eyebrow-icon" />
        <span>TIMING & CLIMATE INTELLIGENCE</span>
      </div>

      {/* Main Heading */}
      <h2 className="weather-heading">
        The best time to visit {climate.destinationName || tour?.name || 'this destination'}
      </h2>

      {/* Best Time Pill Badge */}
      <div className="weather-best-badge">
        <span className="badge-flower">🌿</span>
        <span className="badge-label">Best time:</span>
        <span className="badge-months">{climate.bestTimeHeadline}</span>
      </div>

      {/* Weather by Month Card */}
      <div className="weather-chart-card">
        <div className="chart-header">
          <h3 className="chart-title">Weather by month</h3>
          
          {/* Legend */}
          <div className="chart-legend" role="list">
            <span className="legend-item" role="listitem">
              <span className="legend-dot dot-best" />
              <span>Best time</span>
            </span>
            <span className="legend-item" role="listitem">
              <span className="legend-dot dot-good" />
              <span>Good</span>
            </span>
            <span className="legend-item" role="listitem">
              <span className="legend-dot dot-hot" />
              <span>Busy / hot</span>
            </span>
            <span className="legend-item" role="listitem">
              <span className="legend-dot dot-rainy" />
              <span>Rainy / extreme</span>
            </span>
          </div>
        </div>

        {/* 12-Month Bar Chart */}
        <div className="chart-bars-track">
          {climate.months.map((m) => {
            const isSelected = activeMonthData?.month === m.month;
            const barHeight = getBarHeightPercent(m.avgTempC);
            const colorClass = getStatusColorClass(m.status);

            return (
              <button
                key={m.month}
                type="button"
                className={`month-col-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedMonth(m.month)}
                title={`${m.name}: ${m.avgTempC}°C (${m.statusLabel})`}
                aria-label={`View weather for ${m.name}`}
              >
                {/* Degree Number Above Bar */}
                <span className="temp-label">{m.avgTempC}°</span>

                {/* Vertical Pill Bar */}
                <div className="bar-wrapper">
                  <div 
                    className={`bar-pill ${colorClass}`}
                    style={{ height: `${barHeight}%` }}
                  />
                </div>

                {/* Month Name Below Bar */}
                <span className="month-name-label">{m.month}</span>
              </button>
            );
          })}
        </div>

        {/* Active Month Live Inspector Detail Box */}
        {activeMonthData && (
          <div className="month-inspector-box">
            <div className="inspector-left">
              <div className="inspector-month-tag">
                <span className={`inspector-dot ${getStatusColorClass(activeMonthData.status)}`} />
                <strong>{activeMonthData.name}</strong>
                <span className="inspector-status-badge">{activeMonthData.statusLabel}</span>
              </div>
              <p className="inspector-desc">{activeMonthData.desc}</p>
            </div>

            <div className="inspector-stats-row">
              <div className="inspector-stat">
                <Thermometer size={16} className="stat-icon" />
                <div>
                  <span className="stat-label">Daily Average</span>
                  <span className="stat-val">{activeMonthData.avgTempC}°C ({activeMonthData.lowTempC}° - {activeMonthData.highTempC}°)</span>
                </div>
              </div>

              <div className="inspector-stat">
                <CloudRain size={16} className="stat-icon" />
                <div>
                  <span className="stat-label">Est. Rainfall</span>
                  <span className="stat-val">{activeMonthData.rainfallMm} mm</span>
                </div>
              </div>

              <div className="inspector-stat">
                <Wind size={16} className="stat-icon" />
                <div>
                  <span className="stat-label">Climate Feel</span>
                  <span className="stat-val">{activeMonthData.status === 'best' ? 'Ideal Sightseeing' : activeMonthData.status === 'good' ? 'Pleasant & Cool' : activeMonthData.status === 'hot' ? 'Warm Sunshine' : 'Crisp Chill'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3 Seasonal Insight Cards (Shoulder, Peak, Low Season) */}
      <div className="season-cards-grid">
        {/* Shoulder Season */}
        <div className="season-card card-shoulder">
          <div className="season-card-top">
            <span className="season-pill-badge shoulder">Shoulder</span>
            <h4 className="season-title">{climate.shoulderSeason.title}</h4>
            <span className="season-months-highlight">{climate.shoulderSeason.months}</span>
          </div>
          <p className="season-desc">{climate.shoulderSeason.desc}</p>
        </div>

        {/* Peak Season */}
        <div className="season-card card-peak">
          <div className="season-card-top">
            <span className="season-pill-badge peak">Peak</span>
            <h4 className="season-title">{climate.peakSeason.title}</h4>
            <span className="season-months-highlight">{climate.peakSeason.months}</span>
          </div>
          <p className="season-desc">{climate.peakSeason.desc}</p>
        </div>

        {/* Low Season */}
        <div className="season-card card-low">
          <div className="season-card-top">
            <span className="season-pill-badge low">Low season</span>
            <h4 className="season-title">{climate.lowSeason.title}</h4>
            <span className="season-months-highlight">{climate.lowSeason.months}</span>
          </div>
          <p className="season-desc">{climate.lowSeason.desc}</p>
        </div>
      </div>

      {/* Climatological Source Note */}
      <div className="weather-source-note">
        <Info size={14} />
        <span>Based on 30-year regional climatological historical models. Weather in mountain valleys can vary; our private chauffeurs adapt daily departure timings for optimal sunshine and scenic views.</span>
      </div>
    </section>
  );
}
