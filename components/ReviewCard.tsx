import { Review, getRatingNumber } from '@/types'

interface ReviewCardProps {
  review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const rating = review.metadata?.rating ? getRatingNumber(review.metadata.rating) : 0
  const customerName = review.metadata?.customer_name || 'Anonymous'
  const comment = review.metadata?.comment || ''
  const reviewTitle = review.metadata?.title || review.title
  const verifiedPurchase = review.metadata?.verified_purchase || false

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex items-center">
              {renderStars(rating)}
            </div>
            <span className="text-sm text-gray-600">
              {rating}/5
            </span>
          </div>
          
          <h3 className="font-semibold text-gray-900 mb-1">
            {reviewTitle}
          </h3>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{customerName}</span>
            {verifiedPurchase && (
              <span className="inline-flex items-center gap-1 text-green-600">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified Purchase
              </span>
            )}
          </div>
        </div>
      </div>
      
      {comment && (
        <p className="text-gray-700 text-sm leading-relaxed">
          {comment}
        </p>
      )}
      
      {review.metadata?.product && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            Review for: {review.metadata.product.title}
          </span>
        </div>
      )}
    </div>
  )
}