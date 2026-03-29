import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="font-serif font-bold text-lg">S</span>
              </div>
              <span className="font-serif font-semibold text-lg">SareeBliss</span>
            </div>
            <p className="text-white/70 text-sm">
              Discover the finest collection of traditional and contemporary sarees from across India.
            </p>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Collections</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/collections/banarasi" className="hover:text-white transition-colors">
                  Banarasi
                </Link>
              </li>
              <li>
                <Link href="/collections/chanderi" className="hover:text-white transition-colors">
                  Chanderi
                </Link>
              </li>
              <li>
                <Link href="/collections/kanjeevaram" className="hover:text-white transition-colors">
                  Kanjeevaram
                </Link>
              </li>
              <li>
                <Link href="/collections/tanti" className="hover:text-white transition-colors">
                  Tanti
                </Link>
              </li>
              <li>
                <Link href="/collections/phulkari" className="hover:text-white transition-colors">
                  Phulkari
                </Link>
              </li>
              <li>
                <Link href="/collections/bhagalpuri" className="hover:text-white transition-colors">
                  Bhagalpuri
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Return Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:hello@sareebliss.com" className="hover:text-white transition-colors">
                  hello@sareebliss.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-white/10 pt-8 flex items-center justify-between flex-col md:flex-row gap-4">
          <p className="text-white/60 text-sm">
            © 2024 SareeBliss. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
