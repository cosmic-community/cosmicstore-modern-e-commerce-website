import { Product, Review, formatPrice, getRatingNumber } from '@/types'
import ReviewCard from './ReviewCard'

interface ProductDetailsProps {
  product: Product
  reviews?: Review[]
}

export default function ProductDetails({ product, reviews = [] }: ProductDetailsProps) {
  const featuredImage = product.metadata?.featured_image
  const images = product.metadata?.images || []
  const price = product.metadata?.price || 0
  const inStock = product.metadata?.in_stock ?? true
  const stockQuantity = product.metadata?.stock_quantity
  const sku = product.metadata?.sku
  const description = product.metadata?.description

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + getRatingNumber(review.metadata?.rating || { key: '0', value: '0' }), 0) / reviews.length
    : 0

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          {featuredImage && (
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={`${featuredImage.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                alt={product.title}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {images.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {images.slice(0, 4).map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src={`${image.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                    alt={`${product.title} ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover hover:opacity-75 transition-opacity cursor-pointer"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            
            {reviews.length > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {renderStars(averageRating)}
                </div>
                <span className="text-sm text-gray-600">
                  {averageRating.toFixed(1)} ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                </span>
              </div>
            )}
            
            <div className="text-3xl font-bold text-primary-600 mb-4">
              {formatPrice(price)}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              {sku && (
                <span>SKU: {sku}</span>
              )}
              {stockQuantity !== undefined && (
                <span>Stock: {stockQuantity}</span>
              )}
              <span className={`font-medium ${inStock ? 'text-green-600' : 'text-red-600'}`}>
                {inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          {description && (
            <div className="prose prose-sm max-w-none">
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          )}

          <div className="space-y-4">
            <button
              disabled={!inStock}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                inStock
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            
            <button className="w-full py-3 px-6 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Add to Wishlist
            </button>
          </div>

          {product.metadata?.collections && product.metadata.collections.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Collections:</h3>
              <div className="flex flex-wrap gap-2">
                {product.metadata.collections.map((collection) => (
                  <span
                    key={collection.id}
                    className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
                  >
                    {collection.title}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Customer Reviews ({reviews.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}