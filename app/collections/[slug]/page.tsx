'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { FilterPopup } from '@/components/filter-popup';
import type { FilterState } from '@/components/filter-panel';
import { PRODUCTS } from '@/lib/products';
import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 100000],
    segment: [],
    color: [],
    fabric: [],
    work: [],
  });

  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  // Memoize filtered products calculation
  const filteredProducts = useMemo(() => {
    const categoryProducts = PRODUCTS.filter(
      (p) => p.category.toLowerCase() === slug.toLowerCase()
    );

    return categoryProducts.filter((product) => {
      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Segment filter
      if (filters.segment.length > 0 && !filters.segment.includes(product.segment)) {
        return false;
      }

      // Color filter
      if (filters.color.length > 0 && !filters.color.some((c) => product.colors.includes(c))) {
        return false;
      }

      // Fabric filter
      if (filters.fabric.length > 0 && !filters.fabric.some((f) => product.fabrics.includes(f))) {
        return false;
      }

      return true;
    });
  }, [slug, filters]);

  if (filteredProducts.length === 0 && filters.segment.length === 0 && filters.color.length === 0 && filters.fabric.length === 0 && filters.priceRange[0] === 0 && filters.priceRange[1] === 100000) {
    // No products in category at all
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-12">
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Category not found
          </h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <a href="/" className="hover:text-primary transition-colors">
            Home
          </a>
          <span>/</span>
          <a href="/collections" className="hover:text-primary transition-colors">
            Collections
          </a>
          <span>/</span>
          <span className="text-foreground">{categoryName}</span>
        </div>

        {/* Filter Popup */}
        <FilterPopup onFilterChange={setFilters} />

        {/* Products */}
        <div>
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
              {categoryName} Sarees
            </h1>
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} products
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No products match your filters
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
