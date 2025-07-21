import { Star, Clock, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

const MovieCard = ({ movie, onBookClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Movie Poster */}
      <div className="relative">
        <img 
          src={movie.poster} 
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
          {movie.genre}
        </div>
        {movie.rating && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded text-sm font-bold flex items-center">
            <Star className="w-3 h-3 mr-1" />
            {movie.rating}
          </div>
        )}
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{movie.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{movie.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {movie.duration} دقيقة
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {movie.releaseDate}
          </div>
        </div>

        {/* Showtimes */}
        <div className="mb-3">
          <p className="text-sm font-semibold text-gray-700 mb-2">مواعيد العرض:</p>
          <div className="flex flex-wrap gap-2">
            {movie.showtimes?.map((time, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
              >
                {time}
              </span>
            ))}
          </div>
        </div>

        {/* Price and Book Button */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-green-600">{movie.price} ريال</span>
          <Button 
            onClick={() => onBookClick(movie)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
          >
            احجز الآن
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MovieCard

