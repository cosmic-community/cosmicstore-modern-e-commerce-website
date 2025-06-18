import { Metadata } from 'next'
import { ReviewGrid } from '@/components/ReviewGrid'
import { getReviews } from '@/lib/cosmic'

export const metadata: Metadata = {
  title: 'Customer Reviews - CosmicStore',
  description: 'Read what our customers have to say about their shopping experience',
}

export default async function ReviewsPage() {
  const reviews = await getReviews()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Customer Reviews</h1>
          <p className="text-lg text-gray-600">
            See what our customers have to say about their shopping experience
          </p>
        </div>
        
        {reviews.length > 0 ? (
          <ReviewGrid reviews={reviews} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No reviews available yet.</p>
            <p className="text-gray-500 mt-2">Be the first to leave a review!</p>
          </div>
        )}
      </div>
    </div>
  )
}