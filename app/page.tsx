import { getProducts, getCollections, getReviews } from '@/lib/cosmic'
import ProductGrid from '@/components/ProductGrid'
import CollectionCard from '@/components/CollectionCard'
import ReviewCard from '@/components/ReviewCard'
import Hero from '@/components/Hero'

export default async function HomePage() {
  // Fetch data in parallel
  const [products, collections, reviews] = await Promise.all([
    getProducts(),
    getCollections(),
    getReviews()
  ])

  // Get featured collections
  const featuredCollections = collections.filter(
    collection => collection.metadata?.featured === true
  )

  // Get recent reviews (limit to 3)
  const recentReviews = reviews.slice(0, 3)

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Featured Collections */}
      {featuredCollections.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Collections
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our curated collections of premium products
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCollections.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our complete collection of high-quality products
            </p>
          </div>
          <ProductGrid products={products} />
        </div>
      </section>

      {/* Customer Reviews */}
      {recentReviews.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Our Customers Say
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Real reviews from verified customers
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}