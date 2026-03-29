'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { PRODUCTS } from '@/lib/products';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

// ✅ Move your main logic into a child component
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = query
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-12">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
            {query ? `Search Results for "${query}"` : 'Search Sarees'}
          </h1>
          <p className="text-muted-foreground">
            {results.length} {results.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-secondary rounded-lg p-8 mb-6">
              <p className="text-lg text-muted-foreground mb-4">
                {query
                  ? `No products found for "${query}"`
                  : 'Enter a search term to find sarees'}
              </p>
              <Link
                href="/collections"
                className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Browse Collections
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

// ✅ Wrap with Suspense
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}