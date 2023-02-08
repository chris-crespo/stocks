const ReviewSkeleton = () => {
  return (
    <div className="bg-white p-8 rounded-lg w-3/4 max-w-lg">
      <div className="animate-pulse">
        <div className="flex mb-8">
          <div className="w-12 h-12 rounded-full bg-gray-200" />
          <div className="flex flex-col justify-around ml-4 w-full max-w-xs">
            <span className="block bg-gray-200 w-full h-3 rounded-lg" />
            <span className="block bg-gray-200 w-full h-3 rounded-lg" />
          </div>
        </div>
        <div>
          <span className="block bg-gray-200 w-full h-3 mb-4 rounded-lg"></span>
          <span className="block bg-gray-200 w-full h-3 mb-4 rounded-lg"></span>
          <span className="block bg-gray-200 w-full h-3 mb-4 rounded-lg"></span>
          <span className="block bg-gray-200 w-full h-3 mb-4 rounded-lg"></span>
          <span className="block bg-gray-200 w-3/4 h-3 rounded-lg"></span>
        </div>
      </div>
    </div>
  )
}

export default ReviewSkeleton
