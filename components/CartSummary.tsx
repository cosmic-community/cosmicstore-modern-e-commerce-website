'use client'

import { useCart } from '@/hooks/useCart'
import { calculateCartSummary, formatCartSummary, FREE_SHIPPING_THRESHOLD } from '@/lib/cart'
import { formatPrice } from '@/types'

interface CartSummaryProps {
  showCheckoutButton?: boolean
  compact?: boolean
  className?: string
}

export default function CartSummary({ 
  showCheckoutButton = true, 
  compact = false,
  className = ''
}: CartSummaryProps) {
  const { state } = useCart()
  const { items } = state
  
  const summary = calculateCartSummary(items)
  const formatted = formatCartSummary(summary)
  
  const shippingProgress = summary.subtotal / FREE_SHIPPING_THRESHOLD
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - summary.subtotal

  if (items.length === 0) {
    return null
  }

  if (compact) {
    return (
      <div className={`bg-gray-50 rounded-lg p-4 ${className}`}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Items ({summary.itemCount})</span>
          <span className="font-medium">{formatted.subtotal}</span>
        </div>
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total</span>
          <span>{formatted.total}</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
      
      {/* Free Shipping Progress */}
      {summary.subtotal < FREE_SHIPPING_THRESHOLD && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="text-blue-800">Free shipping progress</span>
            <span className="text-blue-800 font-medium">
              {formatPrice(remainingForFreeShipping)} to go
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(shippingProgress * 100, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-blue-700 mt-1">
            Add {formatPrice(remainingForFreeShipping)} more for free shipping
          </p>
        </div>
      )}
      
      {summary.subtotal >= FREE_SHIPPING_THRESHOLD && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg">
          <div className="flex items-center text-sm text-green-800">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            You qualify for free shipping!
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({summary.itemCount} items)</span>
          <span className="font-medium">{formatted.subtotal}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">{formatted.shipping}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">{formatted.tax}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total</span>
            <span className="text-primary-600">{formatted.total}</span>
          </div>
        </div>
      </div>

      {showCheckoutButton && (
        <div className="mt-6 space-y-3">
          <button className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors">
            Proceed to Checkout
          </button>
          <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Continue Shopping
          </button>
        </div>
      )}
      
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Secure checkout with SSL encryption
        </p>
      </div>
    </div>
  )
}