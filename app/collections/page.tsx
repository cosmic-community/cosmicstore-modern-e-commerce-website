import { Metadata } from 'next'
import { CollectionGrid } from '@/components/CollectionGrid'
import { getCollections } from '@/lib/cosmic'

export const metadata: Metadata = {
  title: 'Collections - CosmicStore',
  description: 'Browse our curated collections of products',
}

export default async function CollectionsPage() {
  const collections = await getCollections()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Collections</h1>
          <p className="text-lg text-gray-600">
            Discover our carefully curated collections of premium products
          </p>
        </div>
        
        <CollectionGrid collections={collections} />
      </div>
    </div>
  )
}