import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { PRODUCTS } from '@/lib/products';

export const metadata = {
  title: 'Collections - SareeBliss',
  description: 'Browse our complete collection of authentic Indian sarees',
};

export default function CollectionsPage() {
  const categories = ['Banarasi', 'Chanderi', 'Kanjeevaram', 'Tanti', 'Phulkari', 'Bhagalpuri'];
  const allProducts = PRODUCTS;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
          All Collections
        </h1>
        <p className="text-muted-foreground mb-8">
          Discover our complete range of exquisite sarees across all categories
        </p>

        {/* Category Grid */}
        <div className="mb-16">
          <h2 className="font-semibold text-foreground mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <a
                key={category}
                href={`/collections/${category.toLowerCase()}`}
                className="p-4 border border-border rounded-lg hover:border-primary hover:bg-secondary transition-colors text-center"
              >
                <span className="font-medium text-foreground capitalize">{category}</span>
              </a>
            ))}
          </div>
        </div>

        {/* All Products Grid */}
        <div>
          <h2 className="font-semibold text-foreground mb-6">
            All Products ({allProducts.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
