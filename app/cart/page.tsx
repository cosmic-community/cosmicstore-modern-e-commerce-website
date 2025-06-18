import type { Metadata } from 'next'
import Cart from '@/components/Cart'

export const metadata: Metadata = {
  title: 'Shopping Cart - CosmicStore',
  description: 'Review your selected items and proceed to checkout',
}

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Cart />
    </div>
  )
}