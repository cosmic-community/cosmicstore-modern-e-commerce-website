// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getProduct, getProductReviews } from '@/lib/cosmic'
import ProductDetails from '@/components/ProductDetails'
import ReviewCard from '@/components/ReviewCard'
import { formatPrice } from '@/types'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProduct(slug)
  
  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.title} - CosmicStore`,
    description: product.metadata?.description || `${product.title} - Premium quality product`,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  
  const [product, reviews] = await Promise.all([
    getProduct(slug),
    getProduct(slug).then(p => p ? getProductReviews(p.id) : [])
  ])

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetails product={product} />
      
      {/* Reviews Section */}
      {reviews.length > 0 && (
        <section className="mt-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Customer Reviews ({reviews.length})
            </h2>
            <p className="text-gray-600">
              See what our customers have to say about this product
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}