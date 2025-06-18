'use client'

import Link from 'next/link'
import { CartItem as CartItemType } from '@/context/CartContext'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/types'
import { getCartItemSubtotal } from '@/lib/cart'

interface CartItemProps {
  item: CartItemType
  showRemoveButton?: boolean
  compact?: boolean
}

export default function CartItem({ item, showRemoveButton = true, compact = false }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()
  const { product, quantity } = item
  
  const price = product.metadata?.price || 0
  const subtotal = getCartItemSubtotal(item)
  const featuredImage = product.metadata?.featured_image
  const inStock = product.metadata?.in_stock ?? true
  const stockQuantity = product.metadata?.stock_quantity

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(product.id)
    } else {
      updateQuantity(product.id, newQuantity)
    }
  }

  const handleRemove = () => {
    removeItem(product.id)
  }

  if (compact) {
    return (
      <div className="flex items-center space-x-3 py-2">
        <Link href={`/products/${product.slug}`} className="flex-shrink-0">
          {featuredImage ? (
            <img
              src={`${featuredImage.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
              alt={product.title}
              width={48}
              height={48}
              className="w-12 h-12 object-cover rounded"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-400 text-xs">No Image</span>
            </div>
          )}
        </Link>
        
        <div className="flex-1 min-w-0">
          <Link 
            href={`/products/${product.slug}`}
            className="text-sm font-medium text-gray-900 hover:text-primary-600 line-clamp-1"
          >
            {product.title}
          </Link>
          <div className="text-xs text-gray-500">
            Qty: {quantity} × {formatPrice(price)}
          </div>
        </div>
        
        <div className="text-sm font-medium text-gray-900">
          {formatPrice(subtotal)}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start space-x-4 py-6 border-b border-gray-200 last:border-b-0">
      <Link href={`/products/${product.slug}`} className="flex-shrink-0">
        {featuredImage ? (
          <img
            src={`${featuredImage.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
            alt={product.title}
            width={120}
            height={120}
            className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg"
          />
        ) : (
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}
      </Link>
      
      <div className="flex-1 min-w-0">
        <Link 
          href={`/products/${product.slug}`}
          className="text-lg font-medium text-gray-900 hover:text-primary-600 line-clamp-2"
        >
          {product.title}
        </Link>
        
        <div className="mt-1 text-sm text-gray-500">
          {product.metadata?.sku && (
            <span>SKU: {product.metadata.sku}</span>
          )}
        </div>
        
        <div className="mt-2 flex items-center space-x-2">
          <span className="text-lg font-semibold text-primary-600">
            {formatPrice(price)}
          </span>
          
          {!inStock && (
            <span className="text-sm text-red-600 font-medium">
              Out of Stock
            </span>
          )}
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <label htmlFor={`quantity-${product.id}`} className="sr-only">
              Quantity
            </label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="px-2 py-1 text-gray-600 hover:text-gray-800 focus:outline-none"
                aria-label="Decrease quantity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              
              <input
                id={`quantity-${product.id}`}
                type="number"
                min="1"
                max={stockQuantity}
                value={quantity}
                onChange={(e) => {
                  const newQuantity = parseInt(e.target.value, 10)
                  if (!isNaN(newQuantity) && newQuantity > 0) {
                    handleQuantityChange(newQuantity)
                  }
                }}
                className="w-16 px-2 py-1 text-center border-0 focus:ring-0 focus:outline-none"
              />
              
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={stockQuantity ? quantity >= stockQuantity : false}
                className="px-2 py-1 text-gray-600 hover:text-gray-800 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Increase quantity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
            
            {stockQuantity && quantity >= stockQuantity && (
              <span className="text-xs text-orange-600">
                Max available: {stockQuantity}
              </span>
            )}
          </div>
          
          {showRemoveButton && (
            <button
              onClick={handleRemove}
              className="text-sm text-red-600 hover:text-red-800 focus:outline-none"
            >
              Remove
            </button>
          )}
        </div>
      </div>
      
      <div className="text-right">
        <div className="text-lg font-semibold text-gray-900">
          {formatPrice(subtotal)}
        </div>
        {quantity > 1 && (
          <div className="text-sm text-gray-500">
            {quantity} × {formatPrice(price)}
          </div>
        )}
      </div>
    </div>
  )
}