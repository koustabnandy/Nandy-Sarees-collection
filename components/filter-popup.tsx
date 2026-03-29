'use client';

import { useState, useEffect } from 'react';
import { X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { FilterState } from './filter-panel';

interface FilterPopupProps {
  onFilterChange: (filters: FilterState) => void;
}

const FILTERS = {
  segment: ['Regular', 'Premium', 'Luxury'],
  color: ['Gold', 'Maroon', 'Cream', 'Silver', 'Blue', 'Red', 'Green', 'Purple'],
  fabric: ['Silk', 'Cotton', 'Cotton-Silk blend', 'Zari'],
};

export function FilterPopup({ onFilterChange }: FilterPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 100000],
    segment: [],
    color: [],
    fabric: [],
    work: [],
  });
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    price: false,
    segment: false,
    color: false,
    fabric: false,
  });

  // Load filters from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sareeFilters');
      if (saved) {
        try {
          setFilters(JSON.parse(saved));
        } catch (e) {
          console.log('Error loading saved filters');
        }
      }
    }
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleMultiSelect = (field: string, value: string) => {
    const fieldKey = field as keyof FilterState;
    const current = filters[fieldKey] as string[];
    const newValue = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setFilters({ ...filters, [fieldKey]: newValue });
  };

  const updatePriceRange = (index: number, value: number) => {
    const newRange: [number, number] = [...filters.priceRange] as [number, number];
    newRange[index] = value;
    setFilters({ ...filters, priceRange: newRange });
  };

  const handleApplyFilters = () => {
    localStorage.setItem('sareeFilters', JSON.stringify(filters));
    onFilterChange(filters);
    setIsOpen(false);
  };

  const handleResetFilters = () => {
    const defaultFilters: FilterState = {
      priceRange: [0, 100000],
      segment: [],
      color: [],
      fabric: [],
      work: [],
    };
    setFilters(defaultFilters);
    localStorage.setItem('sareeFilters', JSON.stringify(defaultFilters));
    onFilterChange(defaultFilters);
  };

  return (
    <>
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors"
      >
        <SlidersHorizontal size={20} />
        <span className="font-medium">Filters</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Filter Panel */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-2xl max-h-[85vh] overflow-y-auto transition-transform duration-300 lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:z-0 lg:bg-transparent lg:rounded-none lg:max-h-none lg:h-fit lg:transform-none ${
          isOpen ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between lg:hidden">
          <h2 className="font-serif text-lg font-semibold text-foreground">Filters</h2>
          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-secondary rounded-lg">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 space-y-4 lg:space-y-6">
          {/* Price Range */}
          <div>
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full mb-3 font-serif font-semibold text-sm lg:text-lg text-foreground"
            >
              Price Range
              <ChevronDown
                size={18}
                className={`transition-transform ${expandedSections.price ? 'rotate-180' : ''}`}
              />
            </button>
            {expandedSections.price && (
              <div className="space-y-3 ml-0">
                <div className="text-xs lg:text-sm text-muted-foreground">
                  ₹{filters.priceRange[0].toLocaleString()} - ₹{filters.priceRange[1].toLocaleString()}
                </div>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={filters.priceRange[0]}
                  onChange={(e) => updatePriceRange(0, parseInt(e.target.value))}
                  className="w-full h-2 bg-secondary rounded-lg appearance-none accent-primary"
                />
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={filters.priceRange[1]}
                  onChange={(e) => updatePriceRange(1, parseInt(e.target.value))}
                  className="w-full h-2 bg-secondary rounded-lg appearance-none accent-primary"
                />
              </div>
            )}
          </div>

          {/* Segment */}
          <div>
            <button
              onClick={() => toggleSection('segment')}
              className="flex items-center justify-between w-full mb-3 font-serif font-semibold text-sm lg:text-lg text-foreground"
            >
              Segment
              <ChevronDown
                size={18}
                className={`transition-transform ${expandedSections.segment ? 'rotate-180' : ''}`}
              />
            </button>
            {expandedSections.segment && (
              <div className="space-y-2">
                {FILTERS.segment.map((seg) => (
                  <label key={seg} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.segment.includes(seg.toLowerCase())}
                      onChange={() => toggleMultiSelect('segment', seg.toLowerCase())}
                      className="w-4 h-4 rounded accent-primary"
                    />
                    <span className="text-xs lg:text-sm text-foreground">{seg}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Color */}
          <div>
            <button
              onClick={() => toggleSection('color')}
              className="flex items-center justify-between w-full mb-3 font-serif font-semibold text-sm lg:text-lg text-foreground"
            >
              Color
              <ChevronDown
                size={18}
                className={`transition-transform ${expandedSections.color ? 'rotate-180' : ''}`}
              />
            </button>
            {expandedSections.color && (
              <div className="grid grid-cols-3 gap-2">
                {FILTERS.color.map((color) => (
                  <button
                    key={color}
                    onClick={() => toggleMultiSelect('color', color)}
                    className={`p-2 rounded-lg border text-xs font-medium transition-all ${
                      filters.color.includes(color)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Fabric */}
          <div>
            <button
              onClick={() => toggleSection('fabric')}
              className="flex items-center justify-between w-full mb-3 font-serif font-semibold text-sm lg:text-lg text-foreground"
            >
              Fabric
              <ChevronDown
                size={18}
                className={`transition-transform ${expandedSections.fabric ? 'rotate-180' : ''}`}
              />
            </button>
            {expandedSections.fabric && (
              <div className="space-y-2">
                {FILTERS.fabric.map((fabric) => (
                  <label key={fabric} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.fabric.includes(fabric)}
                      onChange={() => toggleMultiSelect('fabric', fabric)}
                      className="w-4 h-4 rounded accent-primary"
                    />
                    <span className="text-xs lg:text-sm text-foreground">{fabric}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <button
              onClick={handleResetFilters}
              className="flex-1 py-2 border-2 border-border text-foreground rounded-lg hover:bg-secondary transition-colors font-medium text-sm"
            >
              Reset
            </button>
            <button
              onClick={handleApplyFilters}
              className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
