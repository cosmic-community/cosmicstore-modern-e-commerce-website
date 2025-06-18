'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { Product } from '@/types'

export interface CartItem {
  id: string
  product: Product
  quantity: number
  addedAt: Date
}

export interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  isLoading: boolean
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'SET_LOADING'; payload: boolean }

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  isLoading: true,
}

function calculateTotals(items: CartItem[]) {
  const total = items.reduce((sum, item) => sum + (item.product.metadata?.price || 0) * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  return { total, itemCount }
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity = 1 } = action.payload
      const existingItem = state.items.find(item => item.id === product.id)
      
      let newItems: CartItem[]
      
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        const newItem: CartItem = {
          id: product.id,
          product,
          quantity,
          addedAt: new Date(),
        }
        newItems = [...state.items, newItem]
      }
      
      const { total, itemCount } = calculateTotals(newItems)
      
      return {
        ...state,
        items: newItems,
        total,
        itemCount,
      }
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload.productId)
      const { total, itemCount } = calculateTotals(newItems)
      
      return {
        ...state,
        items: newItems,
        total,
        itemCount,
      }
    }
    
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload
      
      if (quantity <= 0) {
        const newItems = state.items.filter(item => item.id !== productId)
        const { total, itemCount } = calculateTotals(newItems)
        
        return {
          ...state,
          items: newItems,
          total,
          itemCount,
        }
      }
      
      const newItems = state.items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
      
      const { total, itemCount } = calculateTotals(newItems)
      
      return {
        ...state,
        items: newItems,
        total,
        itemCount,
      }
    }
    
    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
      }
    }
    
    case 'LOAD_CART': {
      const items = action.payload
      const { total, itemCount } = calculateTotals(items)
      
      return {
        ...state,
        items,
        total,
        itemCount,
        isLoading: false,
      }
    }
    
    case 'SET_LOADING': {
      return {
        ...state,
        isLoading: action.payload,
      }
    }
    
    default:
      return state
  }
}

interface CartContextType {
  state: CartState
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getItemQuantity: (productId: string) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCartFromStorage = () => {
      try {
        const savedCart = localStorage.getItem('cosmicstore-cart')
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart)
          // Convert addedAt strings back to Date objects
          const cartWithDates = parsedCart.map((item: any) => ({
            ...item,
            addedAt: new Date(item.addedAt),
          }))
          dispatch({ type: 'LOAD_CART', payload: cartWithDates })
        } else {
          dispatch({ type: 'SET_LOADING', payload: false })
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }

    loadCartFromStorage()
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!state.isLoading) {
      try {
        localStorage.setItem('cosmicstore-cart', JSON.stringify(state.items))
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
      }
    }
  }, [state.items, state.isLoading])

  const addItem = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } })
  }

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const getItemQuantity = (productId: string): number => {
    const item = state.items.find(item => item.id === productId)
    return item ? item.quantity : 0
  }

  const value: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemQuantity,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}