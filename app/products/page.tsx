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
  const params = await searchParams
  const { 
    collection: collectionSlug,
    minPrice,
    maxPrice,
    inStock,
    sortBy 
  } = params
  
  const [products, collections] = await Promise.all([
    getProducts(),
    getCollections()
  ])

  // Apply filters
  let filteredProducts = products

  // Filter by collection
  if (collectionSlug && typeof collectionSlug === 'string') {
    const selectedCollection = collections.find(c => c.slug === collectionSlug)
    if (selectedCollection) {
      filteredProducts = filteredProducts.filter(product => 
        product.metadata?.collections?.some(c => c.id === selectedCollection.id)
      )
    }
  }

  // Filter by price range
  if (minPrice || maxPrice) {
    const min = minPrice ? parseFloat(minPrice as string) : 0
    const max = maxPrice ? parseFloat(maxPrice as string) : Infinity
    filteredProducts = filteredProducts.filter(product => {
      const price = product.metadata?.price || 0
      return price >= min && price <= max
    })
  }

  // Filter by stock status
  if (inStock === 'true') {
    filteredProducts = filteredProducts.filter(product => 
      product.metadata?.in_stock === true || 
      (product.metadata?.stock_quantity && product.metadata.stock_quantity > 0)
    )
  }

  // Sort products
  if (sortBy && typeof sortBy === 'string') {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.metadata?.price || 0) - (b.metadata?.price || 0)
        case 'price-high':
          return (b.metadata?.price || 0) - (a.metadata?.price || 0)
        case 'name-asc':
          return a.title.localeCompare(b.title)
        case 'name-desc':
          return b.title.localeCompare(a.title)
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
    })
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