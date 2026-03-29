'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  priceRange: [number, number];
  segment: string[];
  color: string[];
  fabric: string[];
  work: string[];
}

const FILTERS = {
  segment: ['Regular', 'Premium', 'Luxury'],
  color: ['Gold', 'Maroon', 'Cream', 'Silver', 'Blue', 'Red', 'Green', 'Purple'],
  fabric: ['Silk', 'Cotton', 'Cotton-Silk blend', 'Zari'],
};

export function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [2000, 50000],
    segment: [],
    color: [],
    fabric: [],
    work: [],
  });

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    price: true,
    segment: true,
    color: true,
    fabric: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateFilter = (field: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleMultiSelect = (field: string, value: string) => {
    const fieldKey = field as keyof FilterState;
    const current = filters[fieldKey] as string[];
    const newValue = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilter(fieldKey, newValue);
  };

  return (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full mb-4 font-serif font-semibold text-lg"
        >
          Price Range
          <ChevronDown
            size={20}
            className={`transition-transform ${expandedSections.price ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.price && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                ₹{filters.priceRange[0].toLocaleString()} - ₹
                {filters.priceRange[1].toLocaleString()}
              </label>
              <input
                type="range"
                min="2000"
                max="50000"
                step="500"
                value={filters.priceRange[0]}
                onChange={(e) =>
                  updateFilter('priceRange', [parseInt(e.target.value), filters.priceRange[1]])
                }
                className="w-full"
              />
              <input
                type="range"
                min="2000"
                max="50000"
                step="500"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value)])
                }
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Segment */}
      <div>
        <button
          onClick={() => toggleSection('segment')}
          className="flex items-center justify-between w-full mb-4 font-serif font-semibold text-lg"
        >
          Segment
          <ChevronDown
            size={20}
            className={`transition-transform ${expandedSections.segment ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.segment && (
          <div className="space-y-3">
            {FILTERS.segment.map((seg) => (
              <label key={seg} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.segment.includes(seg.toLowerCase())}
                  onChange={() => toggleMultiSelect('segment', seg.toLowerCase())}
                  className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
                />
                <span className="text-sm text-foreground">{seg}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Color */}
      <div>
        <button
          onClick={() => toggleSection('color')}
          className="flex items-center justify-between w-full mb-4 font-serif font-semibold text-lg"
        >
          Color
          <ChevronDown
            size={20}
            className={`transition-transform ${expandedSections.color ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.color && (
          <div className="grid grid-cols-3 gap-3">
            {FILTERS.color.map((color) => (
              <button
                key={color}
                onClick={() => toggleMultiSelect('color', color)}
                className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                  filters.color.includes(color)
                    ? 'border-primary bg-primary/10'
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
          className="flex items-center justify-between w-full mb-4 font-serif font-semibold text-lg"
        >
          Fabric
          <ChevronDown
            size={20}
            className={`transition-transform ${expandedSections.fabric ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.fabric && (
          <div className="space-y-3">
            {FILTERS.fabric.map((fabric) => (
              <label key={fabric} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.fabric.includes(fabric)}
                  onChange={() => toggleMultiSelect('fabric', fabric)}
                  className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
                />
                <span className="text-sm text-foreground">{fabric}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Reset Button */}
      <button
        onClick={() => {
          const defaultFilters: FilterState = {
            priceRange: [2000, 50000],
            segment: [],
            color: [],
            fabric: [],
            work: [],
          };
          setFilters(defaultFilters);
          onFilterChange(defaultFilters);
        }}
        className="w-full py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium"
      >
        Reset Filters
      </button>
    </div>
  );
}
