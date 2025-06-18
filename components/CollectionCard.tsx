import Link from 'next/link'
import { Collection } from '@/types'

interface CollectionCardProps {
  collection: Collection
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const image = collection.metadata?.image
  const featured = collection.metadata?.featured || false

  return (
    <div className={`card group hover:shadow-lg transition-shadow duration-300 ${featured ? 'ring-2 ring-primary-500' : ''}`}>
      <Link href={`/collections/${collection.slug}`}>
        <div className="aspect-[4/3] overflow-hidden">
          {image ? (
            <img
              src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={collection.title}
              width={400}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600">
              {collection.title}
            </h3>
            {featured && (
              <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full font-medium">
                Featured
              </span>
            )}
          </div>
          
          {collection.metadata?.description && (
            <p className="text-gray-600 text-sm line-clamp-2">
              {collection.metadata.description}
            </p>
          )}
          
          <div className="mt-4">
            <span className="text-primary-600 font-medium text-sm group-hover:text-primary-700">
              View Collection →
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}