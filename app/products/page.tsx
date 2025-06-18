import { getProducts, getCollections } from '@/lib/cosmic'
import ProductGrid from '@/components/ProductGrid'
import ProductFilters from '@/components/ProductFilters'

export const metadata = {
  title: 'Products - CosmicStore',
  description: 'Browse our complete collection of high-quality products',
}

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { collection: collectionSlug } = await searchParams
  
  const [products, collections] = await Promise.all([
    getProducts(),
    getCollections()
  ])

  // Filter products by collection if specified
  let filteredProducts = products
  if (collectionSlug && typeof collectionSlug === 'string') {
    const selectedCollection = collections.find(c => c.slug === collectionSlug)
    if (selectedCollection) {
      filteredProducts = products.filter(product => 
        product.metadata?.collections?.some(c => c.id === selectedCollection.id)
      )
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Products</h1>
        <p className="text-gray-600">
          {collectionSlug 
            ? `Products in ${collections.find(c => c.slug === collectionSlug)?.title || 'collection'}`
            : 'Browse our complete collection of high-quality products'
          }
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-1/4">
          <ProductFilters collections={collections} />
        </aside>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}