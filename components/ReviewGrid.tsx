import { Review } from '@/types'
import { ReviewCard } from './ReviewCard'

interface ReviewGridProps {
  reviews: Review[]
}

export function ReviewGrid({ reviews }: ReviewGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  )
}