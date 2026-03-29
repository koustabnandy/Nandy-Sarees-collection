import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Carousel } from '@/components/carousel';
import { ProductCard } from '@/components/product-card';
import { PRODUCTS } from '@/lib/products';

export const metadata = {
  title: 'SareeBliss - Exquisite Indian Sarees Collection',
  description: 'Discover authentic Indian sarees including Banarasi, Chanderi, Kanjeevaram, and more. No login needed. Shop online with secure payments and express delivery.',
};

const categories = [
  { name: 'Banarasi', image: 'https://images.unsplash.com/photo-1610122533632-d8f1f47ae87f?w=500&h=500&fit=crop' },
  { name: 'Chanderi', image: 'https://images.unsplash.com/photo-1605933248857-10927d46f3e8?w=500&h=500&fit=crop' },
  { name: 'Kanjeevaram', image: 'https://images.unsplash.com/photo-1612551489533-c74a62a90a4f?w=500&h=500&fit=crop' },
  { name: 'Tanti', image: 'https://images.unsplash.com/photo-1617634924626-92ab08dfef4f?w=500&h=500&fit=crop' },
  { name: 'Phulkari', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&h=500&fit=crop' },
  { name: 'Bhagalpuri', image: 'https://images.unsplash.com/photo-1580162392410-8a74c5b9f27b?w=500&h=500&fit=crop' },
];

const pujaSpecials = PRODUCTS.filter((p) => p.isPujaSpecial).slice(0, 4);
const featuredProducts = PRODUCTS.slice(0, 8);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1">
        {/* Carousel */}
        <Carousel />

        {/* Categories Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Explore Our Collections
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <a
                key={category.name}
                href={`/collections/${category.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-lg aspect-square"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-end p-4">
                  <span className="text-white font-semibold text-sm">{category.name}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-border">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-12">
            Featured Collection
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Puja Specials */}
        {pujaSpecials.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-border">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                Puja Specials
              </h2>
              <p className="text-muted-foreground">Curated selection for your festive celebrations</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pujaSpecials.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Benefits Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-border">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Why Choose SareeBliss
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: '🚚', title: 'Free Shipping', desc: 'On orders above ₹5000' },
              { icon: '🔒', title: 'Secure Payment', desc: 'Safe and encrypted transactions' },
              { icon: '↩️', title: 'Easy Returns', desc: '7-day return guarantee' },
              { icon: '📞', title: 'Customer Support', desc: 'Email & WhatsApp assistance' },
            ].map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
