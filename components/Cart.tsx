'use client'

import { useCart } from '@/hooks/useCart'
import CartItem from './CartItem'
import CartSummary from './CartSummary'
import Link from 'next/link'

interface CartProps {
  showHeader?: boolean
  showSummary?: boolean
  maxItems?: number
  className?: string
}

export default function Cart({ 
  showHeader = true, 
  showSummary = true, 
  maxItems,
  className = ''
}: CartProps) {
  const { state, clearCart } = useCart()
  const { items, itemCount, isLoading } = state

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex space-x-4 py-4">
              <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <svg
          className="mx-auto h-24 w-24 text-gray-300 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-500 mb-6">
          Start shopping to add items to your cart
        </p>
        <Link
          href="/products"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  const displayItems = maxItems ? items.slice(0, maxItems) : items
  const hasMoreItems = maxItems && items.length > maxItems

  return (
    <div className={className}>
      {showHeader && (
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Shopping Cart {itemCount > 0 && `(${itemCount})`}
          </h1>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm text-red-600 hover:text-red-800 focus:outline-none"
            >
              Clear Cart
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
            {displayItems.map((item) => (
              <div key={item.id} className="p-6">
                <CartItem item={item} />
              </div>
            ))}
          </div>
          
          {hasMoreItems && (
            <div className="mt-4 text-center">
              <Link
                href="/cart"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                View all {items.length} items in cart
              </Link>
            </div>
          )}
        </div>

        {showSummary && (
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}