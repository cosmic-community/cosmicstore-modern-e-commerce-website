import { CartItem } from '@/context/CartContext'
import { formatPrice } from '@/types'

export interface CartSummary {
  subtotal: number
  tax: number
  shipping: number
  total: number
  itemCount: number
}

export const TAX_RATE = 0.08 // 8% tax rate
export const FREE_SHIPPING_THRESHOLD = 100
export const SHIPPING_COST = 10

export function calculateCartSummary(items: CartItem[]): CartSummary {
  const subtotal = items.reduce(
    (sum, item) => sum + (item.product.metadata?.price || 0) * item.quantity,
    0
  )
  
  const tax = subtotal * TAX_RATE
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + tax + shipping
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return {
    subtotal,
    tax,
    shipping,
    total,
    itemCount,
  }
}

export function formatCartSummary(summary: CartSummary) {
  return {
    subtotal: formatPrice(summary.subtotal),
    tax: formatPrice(summary.tax),
    shipping: summary.shipping === 0 ? 'Free' : formatPrice(summary.shipping),
    total: formatPrice(summary.total),
    itemCount: summary.itemCount,
  }
}

export function validateCartItem(item: CartItem): boolean {
  if (!item.product || !item.product.id) return false
  if (item.quantity <= 0) return false
  if (!item.product.metadata?.in_stock) return false
  
  return true
}

export function getCartItemSubtotal(item: CartItem): number {
  return (item.product.metadata?.price || 0) * item.quantity
}

export function isCartEmpty(items: CartItem[]): boolean {
  return items.length === 0
}

export function getUniqueProductCount(items: CartItem[]): number {
  return items.length
}

export function getTotalQuantity(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}