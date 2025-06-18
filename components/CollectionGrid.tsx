import Link from 'next/link'
import { Collection } from '@/types'

interface CollectionGridProps {
  collections: Collection[]
}

export function CollectionGrid({ collections }: CollectionGridProps) {
  if (collections.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No collections available yet.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {collections.map((collection) => (
        <Link
          key={collection.id}
          href={`/collections/${collection.slug}`}
          className="group block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative aspect-video overflow-hidden rounded-t-lg">
            {collection.metadata?.image?.imgix_url ? (
              <img
                src={`${collection.metadata.image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                alt={collection.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-sm">No image</span>
              </div>
            )}
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {collection.title}
            </h3>
            
            {collection.metadata?.description && (
              <p className="text-gray-600 text-sm line-clamp-3">
                {collection.metadata.description}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}