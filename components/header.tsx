'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

const sareeTypes = [
  { name: 'Banarasi', slug: 'banarasi' },
  { name: 'Chanderi', slug: 'chanderi' },
  { name: 'Kanjeevaram', slug: 'kanjeevaram' },
  { name: 'Tanti', slug: 'tanti' },
  { name: 'Phulkari', slug: 'phulkari' },
  { name: 'Bhagalpuri', slug: 'bhagalpuri' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCollections, setShowCollections] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-serif font-bold text-lg">S</span>
            </div>
            <span className="hidden sm:block font-serif font-semibold text-lg text-primary">
              SareeBliss
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>

            {/* Collections Dropdown */}
            <div className="relative group">
              <button className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1">
                Collections
                <span className="text-xs">▼</span>
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-card rounded-lg shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                {sareeTypes.map((type) => (
                  <Link
                    key={type.slug}
                    href={`/collections/${type.slug}`}
                    className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-primary transition-colors"
                  >
                    {type.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/contacts"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <Link
              href={searchQuery ? `/search?q=${encodeURIComponent(searchQuery)}` : '/search'}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <Search size={20} className="text-foreground" />
            </Link>

            <Link
              href="/cart"
              className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <ShoppingCart size={20} className="text-foreground" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              {isOpen ? (
                <X size={24} className="text-foreground" />
              ) : (
                <Menu size={24} className="text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-3">
            <Link
              href="/"
              className="block px-4 py-2 text-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            <div>
              <button
                onClick={() => setShowCollections(!showCollections)}
                className="w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors font-medium"
              >
                Collections
              </button>
              {showCollections && (
                <div className="ml-4 space-y-2 mt-2">
                  {sareeTypes.map((type) => (
                    <Link
                      key={type.slug}
                      href={`/collections/${type.slug}`}
                      className="block px-4 py-2 text-sm text-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {type.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contacts"
              className="block px-4 py-2 text-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            <Link
              href="/cart"
              className="flex items-center gap-2 px-4 py-2 text-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart size={20} />
              Cart {itemCount > 0 && `(${itemCount})`}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
