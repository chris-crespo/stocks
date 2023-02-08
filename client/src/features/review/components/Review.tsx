import { defaultRetry } from "~/config"
import { useReview } from "../api/generateReview"
import ReviewSkeleton from "./ReviewSkeleton"

const Review = () => {
  const { data: review, isLoading, isError } = useReview({
    config: {
      retry: defaultRetry
    }
  })

  if (isLoading || isError) return <ReviewSkeleton />

  return (
    <div className="bg-white p-8 rounded-lg w-3/4 max-w-lg">
      <div className="flex mb-6">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img src={review?.user.avatar} />
        </div>
        <div className="flex flex-col justify-around ml-4 w-full max-w-xs text-sm">
          <span className="block">
            {review?.user.name}
          </span>
          <span className="block text-gray-400">
            {review?.user.twitterHandle}
          </span>
        </div>
      </div>
      <div className="tracking-wide leading-6 text-sm">
        {review?.content}
      </div>
    </div>
  )
}

export default Review
