import { Film } from 'lucide-react'

const LoadingSpinner = ({ message = "جاري التحميل..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-16 h-16 border-4 border-gray-200 border-t-yellow-500 rounded-full animate-spin"></div>
        
        {/* Inner film icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Film className="w-6 h-6 text-yellow-500 animate-pulse" />
        </div>
      </div>
      
      <p className="mt-4 text-gray-600 font-medium">{message}</p>
    </div>
  )
}

export default LoadingSpinner

