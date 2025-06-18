'use client'

import { useState } from 'react'
import { Product } from '@/types'
import { useCart } from '@/hooks/useCart'

interface AddToCartButtonProps {
  product: Product
  quantity?: number
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}

export default function AddToCartButton({ 
  product, 
  quantity = 1, 
  disabled = false,
  className = '',
  children 
}: AddToCartButtonProps) {
  const { addItem, getItemQuantity } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const currentQuantity = getItemQuantity(product.id)
  const inStock = product.metadata?.in_stock ?? true
  const isDisabled = disabled || !inStock || isAdding

  const handleAddToCart = async () => {
    if (isDisabled) return

    setIsAdding(true)
    
    try {
      addItem(product, quantity)
      setShowSuccess(true)
      
      // Reset success state after 2 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 2000)
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setIsAdding(false)
    }
  }

  const getButtonText = () => {
    if (showSuccess) return 'Added to Cart!'
    if (isAdding) return 'Adding...'
    if (!inStock) return 'Out of Stock'
    if (currentQuantity > 0) return `Add More (${currentQuantity} in cart)`
    return 'Add to Cart'
  }

  const buttonClasses = `
    inline-flex items-center justify-center
    px-6 py-3 border border-transparent
    text-base font-medium rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    ${isDisabled 
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
      : showSuccess
      ? 'bg-green-600 text-white'
      : 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500'
    }
    ${className}
  `.trim()

  return (
    <button
      onClick={handleAddToCart}
      disabled={isDisabled}
      className={buttonClasses}
      aria-label={`Add ${product.title} to cart`}
    >
      {isAdding && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          ></circle>
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      
      {showSuccess && (
        <svg 
          className="mr-2 h-4 w-4" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
      )}
      
      {children || getButtonText()}
    </button>
  )
}