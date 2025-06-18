import Link from 'next/link'
import { Product, formatPrice } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const featuredImage = product.metadata?.featured_image
  const price = product.metadata?.price || 0
  const inStock = product.metadata?.in_stock ?? true

  return (
    <div className="card group hover:shadow-lg transition-shadow duration-300">
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-square overflow-hidden">
          {featuredImage ? (
            <img
              src={`${featuredImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={product.title}
              width={300}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600">
            {product.title}
          </h3>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary-600">
              {formatPrice(price)}
            </span>
            
            {!inStock && (
              <span className="text-sm text-red-600 font-medium">
                Out of Stock
              </span>
            )}
          </div>

          {product.metadata?.collections && product.metadata.collections.length > 0 && (
            <div className="mt-2">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {product.metadata.collections[0].title}
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}