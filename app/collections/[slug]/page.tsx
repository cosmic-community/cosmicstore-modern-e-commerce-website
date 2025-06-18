import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCollection, getProductsByCollection } from '@/lib/cosmic'
import { ProductGrid } from '@/components/ProductGrid'
import { Collection } from '@/types'

interface CollectionPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const collection = await getCollection(slug)
    
    return {
      title: `${collection.title} - CosmicStore`,
      description: collection.metadata?.description || `Browse products in the ${collection.title} collection`,
    }
  } catch {
    return {
      title: 'Collection Not Found - CosmicStore',
    }
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params
  
  try {
    const [collection, products] = await Promise.all([
      getCollection(slug),
      getProductsByCollection(slug)
    ])

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Collection Header */}
          <div className="mb-12">
            {collection.metadata?.image?.imgix_url && (
              <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                <img
                  src={`${collection.metadata.image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                  alt={collection.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{collection.title}</h1>
                    {collection.metadata?.description && (
                      <p className="text-lg md:text-xl max-w-2xl mx-auto">
                        {collection.metadata.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {!collection.metadata?.image?.imgix_url && (
              <div className="mb-8">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                  {collection.title}
                </h1>
                {collection.metadata?.description && (
                  <p className="text-lg text-gray-600 max-w-2xl">
                    {collection.metadata.description}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Products in Collection */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Products in this Collection ({products.length})
            </h2>
            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found in this collection.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  } catch {
    notFound()
  }
}