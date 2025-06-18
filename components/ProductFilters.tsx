'use client'

import { useState } from 'react'
import { Collection } from '@/types'

interface ProductFiltersProps {
  collections: Collection[]
  onFiltersChange: (filters: {
    collection?: string
    priceRange?: [number, number]
    inStock?: boolean
    sortBy?: string
  }) => void
}

export default function ProductFilters({ collections, onFiltersChange }: ProductFiltersProps) {
  const [selectedCollection, setSelectedCollection] = useState<string>('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [inStockOnly, setInStockOnly] = useState<boolean>(false)
  const [sortBy, setSortBy] = useState<string>('newest')

  const handleFiltersUpdate = () => {
    onFiltersChange({
      collection: selectedCollection || undefined,
      priceRange: priceRange,
      inStock: inStockOnly || undefined,
      sortBy: sortBy
    })
  }

  const clearFilters = () => {
    setSelectedCollection('')
    setPriceRange([0, 1000])
    setInStockOnly(false)
    setSortBy('newest')
    onFiltersChange({})
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Collection Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Collection
          </label>
          <select
            value={selectedCollection}
            onChange={(e) => {
              setSelectedCollection(e.target.value)
              handleFiltersUpdate()
            }}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">All Collections</option>
            {collections.map((collection) => (
              <option key={collection.id} value={collection.slug}>
                {collection.title}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange[0]}
                onChange={(e) => {
                  const newRange: [number, number] = [Number(e.target.value), priceRange[1]]
                  setPriceRange(newRange)
                  handleFiltersUpdate()
                }}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange[1]}
                onChange={(e) => {
                  const newRange: [number, number] = [priceRange[0], Number(e.target.value)]
                  setPriceRange(newRange)
                  handleFiltersUpdate()
                }}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>

        {/* In Stock Filter */}
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => {
                setInStockOnly(e.target.checked)
                handleFiltersUpdate()
              }}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">In Stock Only</span>
          </label>
        </div>

        {/* Sort By Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value)
              handleFiltersUpdate()
            }}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>
    </div>
  )
}