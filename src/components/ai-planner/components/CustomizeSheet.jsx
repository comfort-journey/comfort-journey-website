import React from 'react';
import { Car, Utensils, BedDouble, Users, X, ChevronDown, ChevronUp, Check, Settings } from 'lucide-react';
import './styles/CustomizeSheet.css';

const PACING_OPTIONS = [
  { id: 'relaxed', label: 'Relaxed Pace', desc: 'Gentle & comfortable, more rest time & scenic stops' },
  { id: 'balanced', label: 'Balanced Pace', desc: 'Good mix of activities and leisure moments' },
  { id: 'active', label: 'Active Sightseer', desc: 'Packed days, maximum exploration & early starts' },
];

const VEHICLE_OPTIONS = [
  { id: 'hycross', label: 'Innova Hycross', full: 'Private Toyota Innova Hycross (Hybrid AC)', desc: 'Premium hybrid, ultra-smooth & captain seats' },
  { id: 'crysta', label: 'Innova Crysta', full: 'Private Toyota Innova Crysta (AC)', desc: 'Trusted classic, roomy & reliable mountain cruiser' },
  { id: 'sedan', label: 'Luxury Sedan', full: 'Private Luxury Sedan (AC)', desc: 'Sleek, comfortable for couples or small families' },
  { id: 'fortuner', label: 'Luxury SUV', full: 'Private Luxury SUV / Mercedes', desc: 'Ultimate prestige, high clearance & luxury ride' },
  { id: 'tempo', label: 'Tempo Traveller', full: 'Private AC Tempo Traveller / Urbania', desc: 'Spacious high-roof van for family groups up to 12' },
];

const STAY_OPTIONS = [
  { id: '4star', label: '4★ Deluxe Boutique', desc: 'Handpicked comfort, verified hygiene & great views' },
  { id: '5star', label: '5★ Luxury Resort', desc: 'Premium amenities, heated rooms & 5-star hospitality' },
  { id: 'poolvilla', label: 'Private Pool Villa', desc: 'Exclusive secluded villa with private pool' },
  { id: 'heritage', label: 'Heritage Chalet', desc: 'Authentic character, wooden architecture & warmth' },
  { id: 'houseboat', label: 'Dal Lake Houseboat', desc: 'Iconic luxury cedarwood houseboat stay' },
];

const DIETARY_OPTIONS = [
  { id: 'pureveg', label: 'Pure Vegetarian', desc: '100% vegetarian meals, verified kitchens' },
  { id: 'jain', label: 'Jain Friendly', desc: 'Strictly no onion, garlic or root vegetables' },
  { id: 'halal', label: 'Halal Certified', desc: 'Verified halal culinary preparation' },
  { id: 'multicuisine', label: 'Multi-Cuisine', desc: 'North Indian, Continental & local specialties' },
];

export default function CustomizeSheet({
  isOpen,
  onClose,
  tripPlan,
  onPacingChange,
  onVehicleChange,
  onStayTierChange,
  onDietaryChange
}) {
  if (!isOpen) return null;

  const sections = [
    {
      key: 'pacing',
      title: 'Travel Pace',
      icon: Users,
      color: 'amber',
      options: PACING_OPTIONS,
      current: tripPlan?.pacing?.toLowerCase().includes('relaxed') ? 'relaxed' : 
             tripPlan?.pacing?.toLowerCase().includes('balanced') ? 'balanced' : 'active',
      onChange: onPacingChange,
      renderValue: (opt) => opt.label
    },
    {
      key: 'vehicle',
      title: 'Private Vehicle',
      icon: Car,
      color: 'cyan',
      options: VEHICLE_OPTIONS,
      current: tripPlan?.vehicle?.toLowerCase().includes('hycross') ? 'hycross' :
             tripPlan?.vehicle?.toLowerCase().includes('crysta') ? 'crysta' :
             tripPlan?.vehicle?.toLowerCase().includes('sedan') ? 'sedan' :
             tripPlan?.vehicle?.toLowerCase().includes('fortuner') || tripPlan?.vehicle?.toLowerCase().includes('mercedes') ? 'fortuner' : 'tempo',
      onChange: (val) => onVehicleChange(VEHICLE_OPTIONS.find(o => o.id === val)?.full),
      renderValue: (opt) => opt.label
    },
    {
      key: 'stay',
      title: 'Stay Tier',
      icon: BedDouble,
      color: 'purple',
      options: STAY_OPTIONS,
      current: tripPlan?.stayTier?.includes('5★') ? '5star' :
             tripPlan?.stayTier?.includes('Pool Villa') ? 'poolvilla' :
             tripPlan?.stayTier?.includes('Heritage') ? 'heritage' :
             tripPlan?.stayTier?.includes('Houseboat') ? 'houseboat' : '4star',
      onChange: (val) => onStayTierChange(STAY_OPTIONS.find(o => o.id === val)?.label),
      renderValue: (opt) => opt.label
    },
    {
      key: 'dietary',
      title: 'Meals & Dietary',
      icon: Utensils,
      color: 'lime',
      options: DIETARY_OPTIONS,
      current: tripPlan?.dietary?.includes('Jain') ? 'jain' :
             tripPlan?.dietary?.includes('Halal') ? 'halal' :
             tripPlan?.dietary?.includes('Multi') ? 'multicuisine' : 'pureveg',
      onChange: onDietaryChange,
      renderValue: (opt) => opt.label
    },
  ];

  return (
    <div className="customize-sheet-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="customize-title">
      <div className="customize-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Drag Handle */}
        <div className="sheet-handle" aria-hidden="true">
          <div className="handle-bar" />
        </div>

        {/* Header */}
        <header className="sheet-header">
          <h2 id="customize-title" className="sheet-title">
            <span className="title-icon">
              <Settings size={18} />
            </span>
            <span>Customize Your Trip</span>
          </h2>
          <button type="button" className="sheet-close" onClick={onClose} aria-label="Close customization">
            <X size={18} />
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="sheet-content">
          {sections.map((section) => (
            <CustomizeSection
              key={section.key}
              {...section}
            />
          ))}
        </div>

        {/* Pinned Footer */}
        <div className="sheet-footer">
          <button type="button" className="btn-apply" onClick={onClose}>
            <span>Done & Apply to Itinerary</span>
            <Check size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function CustomizeSection({ title, icon: Icon, color, options, current, onChange, renderValue }) {
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <section className="customize-section" aria-labelledby={`${title.toLowerCase().replace(/[^a-z]/g, '')}-heading`}>
      <button
        type="button"
        className="section-header"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={`${title.toLowerCase().replace(/[^a-z]/g, '')}-content`}
      >
        <div className="header-left">
          <span className={`section-icon icon-${color}`}>
            <Icon size={15} aria-hidden="true" />
          </span>
          <h3 id={`${title.toLowerCase().replace(/[^a-z]/g, '')}-heading`} className="section-title">{title}</h3>
          <span className="current-value">{renderValue(options.find(o => o.id === current) || options[0])}</span>
        </div>
        <span className="expand-icon">{isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
      </button>

      <div id={`${title.toLowerCase().replace(/[^a-z]/g, '')}-content`} className="section-content" hidden={!isExpanded} style={{ display: isExpanded ? 'block' : 'none' }}>
        <div className="options-grid">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`option-card ${current === option.id ? 'selected' : ''}`}
              onClick={() => onChange(option.id)}
              aria-pressed={current === option.id}
            >
              <div className="option-main">
                <span className="option-label">{option.label}</span>
                <span className="option-desc">{option.desc}</span>
              </div>
              {current === option.id && (
                <span className="option-check" aria-hidden="true">
                  <Check size={13} strokeWidth={3} />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}