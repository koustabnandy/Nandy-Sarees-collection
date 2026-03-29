export interface Product {
  id: string;
  name: string;
  category: 'banarasi' | 'chanderi' | 'kanjeevaram' | 'tanti' | 'phulkari' | 'bhagalpuri';
  price: number;
  originalPrice: number;
  image: string;
  colors: string[];
  fabrics: string[];
  work: string[];
  segment: 'regular' | 'premium' | 'luxury';
  description: string;
  isPujaSpecial?: boolean;
}

export const SAREE_TYPES = [
  { name: 'Banarasi', slug: 'banarasi', description: 'Authentic Banarasi sarees with rich brocade work' },
  { name: 'Chanderi', slug: 'chanderi', description: 'Lightweight Chanderi sarees with subtle elegance' },
  { name: 'Kanjeevaram', slug: 'kanjeevaram', description: 'South Indian silk sarees with temple designs' },
  { name: 'Tanti', slug: 'tanti', description: 'Traditional handwoven Tanti sarees' },
  { name: 'Phulkari', slug: 'phulkari', description: 'Vibrant Phulkari with floral embroidery' },
  { name: 'Bhagalpuri', slug: 'bhagalpuri', description: 'Silk cotton blend with unique patterns' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Royal Gold Banarasi',
    category: 'banarasi',
    price: 8500,
    originalPrice: 12000,
    image: 'https://images.unsplash.com/photo-1610707267991-c8f3d56c0b96?w=500&h=600&fit=crop',
    colors: ['Gold', 'Maroon', 'Cream'],
    fabrics: ['Silk', 'Zari'],
    work: ['Brocade', 'Zari work'],
    segment: 'luxury',
    description: 'Exquisite Banarasi saree with intricate gold brocade work',
    isPujaSpecial: true,
  },
  {
    id: '2',
    name: 'Elegant Silver Chanderi',
    category: 'chanderi',
    price: 4500,
    originalPrice: 6000,
    image: 'https://images.unsplash.com/photo-1605777927616-2fcbf70f9f4f?w=500&h=600&fit=crop',
    colors: ['Silver', 'Cream', 'Light Blue'],
    fabrics: ['Cotton-Silk blend'],
    work: ['Subtle weave'],
    segment: 'premium',
    description: 'Light and elegant Chanderi saree perfect for any occasion',
  },
  {
    id: '3',
    name: 'Temple Design Kanjeevaram',
    category: 'kanjeevaram',
    price: 7500,
    originalPrice: 10500,
    image: 'https://images.unsplash.com/photo-1597103442097-8b74394b95c6?w=500&h=600&fit=crop',
    colors: ['Red', 'Green', 'Gold'],
    fabrics: ['Pure Silk'],
    work: ['Temple design', 'Silk thread'],
    segment: 'luxury',
    description: 'South Indian pure silk saree with traditional temple motifs',
    isPujaSpecial: true,
  },
  {
    id: '4',
    name: 'Handwoven Tanti Classic',
    category: 'tanti',
    price: 3200,
    originalPrice: 4500,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&h=600&fit=crop',
    colors: ['Rust', 'Indigo', 'Natural'],
    fabrics: ['Cotton'],
    work: ['Handwoven'],
    segment: 'regular',
    description: 'Traditional handwoven Tanti saree with authentic patterns',
  },
  {
    id: '5',
    name: 'Vibrant Phulkari Garden',
    category: 'phulkari',
    price: 5200,
    originalPrice: 7000,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=600&fit=crop',
    colors: ['Multicolor', 'Orange', 'Purple'],
    fabrics: ['Cotton-Silk'],
    work: ['Phulkari embroidery'],
    segment: 'premium',
    description: 'Colorful Phulkari with traditional floral embroidery',
  },
  {
    id: '6',
    name: 'Artistic Bhagalpuri',
    category: 'bhagalpuri',
    price: 3800,
    originalPrice: 5000,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=600&fit=crop',
    colors: ['Navy', 'Maroon', 'Peach'],
    fabrics: ['Silk cotton'],
    work: ['Tie and dye', 'Printed'],
    segment: 'premium',
    description: 'Contemporary Bhagalpuri with artistic tie-dye patterns',
  },
  {
    id: '7',
    name: 'Divine Purple Banarasi',
    category: 'banarasi',
    price: 9200,
    originalPrice: 13000,
    image: 'https://images.unsplash.com/photo-1610707267991-c8f3d56c0b96?w=500&h=600&fit=crop',
    colors: ['Purple', 'Gold', 'Cream'],
    fabrics: ['Silk', 'Zari'],
    work: ['Zari brocade'],
    segment: 'luxury',
    description: 'Royal purple Banarasi with divine zari work',
    isPujaSpecial: true,
  },
  {
    id: '8',
    name: 'Minimal Chanderi Beige',
    category: 'chanderi',
    price: 4000,
    originalPrice: 5500,
    image: 'https://images.unsplash.com/photo-1605777927616-2fcbf70f9f4f?w=500&h=600&fit=crop',
    colors: ['Beige', 'Gold', 'White'],
    fabrics: ['Cotton-Silk blend'],
    work: ['Simple weave'],
    segment: 'premium',
    description: 'Minimalist Chanderi saree in soft beige tones',
  },
  {
    id: '9',
    name: 'Emerald Kanjeevaram Royal',
    category: 'kanjeevaram',
    price: 8800,
    originalPrice: 12000,
    image: 'https://images.unsplash.com/photo-1597103442097-8b74394b95c6?w=500&h=600&fit=crop',
    colors: ['Emerald', 'Gold', 'Cream'],
    fabrics: ['Pure Silk'],
    work: ['Temple gold'],
    segment: 'luxury',
    description: 'Premium Kanjeevaram in rich emerald with gold accents',
    isPujaSpecial: true,
  },
];

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getPujaSpecials(): Product[] {
  return PRODUCTS.filter((p) => p.isPujaSpecial);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
