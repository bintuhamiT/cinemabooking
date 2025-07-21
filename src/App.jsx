import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import MovieCard from './components/MovieCard'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import SearchFilter from './components/SearchFilter'
import LoadingSpinner from './components/LoadingSpinner'
import SuccessModal from './components/SuccessModal'
import { movies } from './data/movies'
import './App.css'
import './styles/custom.css'

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [bookingDetails, setBookingDetails] = useState(null)
  const [filteredMovies, setFilteredMovies] = useState(movies)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleBookClick = (movie) => {
    setSelectedMovie(movie)
    setIsBookingModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsBookingModalOpen(false)
    setSelectedMovie(null)
  }

  const handleBookingSuccess = (details) => {
    setBookingDetails(details)
    setIsBookingModalOpen(false)
    setIsSuccessModalOpen(true)
  }

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredMovies(movies)
      return
    }
    
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredMovies(filtered)
  }

  const handleFilter = (filters) => {
    let filtered = movies

    if (filters.genre) {
      filtered = filtered.filter(movie => movie.genre.includes(filters.genre))
    }

    if (filters.rating) {
      const minRating = parseFloat(filters.rating.replace('+', ''))
      filtered = filtered.filter(movie => movie.rating >= minRating)
    }

    if (filters.duration) {
      filtered = filtered.filter(movie => {
        const duration = movie.duration
        switch (filters.duration) {
          case 'أقل من 90 دقيقة':
            return duration < 90
          case '90-120 دقيقة':
            return duration >= 90 && duration <= 120
          case '120-150 دقيقة':
            return duration >= 120 && duration <= 150
          case 'أكثر من 150 دقيقة':
            return duration > 150
          default:
            return true
        }
      })
    }

    if (filters.price) {
      filtered = filtered.filter(movie => {
        const price = movie.price
        switch (filters.price) {
          case 'أقل من 40 ريال':
            return price < 40
          case '40-50 ريال':
            return price >= 40 && price <= 50
          case '50-60 ريال':
            return price >= 50 && price <= 60
          case 'أكثر من 60 ريال':
            return price > 60
          default:
            return true
        }
      })
    }

    setFilteredMovies(filtered)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner message="جاري تحميل الأفلام..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      
      {/* Search and Filter Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />
        </div>
      </section>
      
      {/* Movies Section */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 animate-fadeIn">
              الأفلام الحالية
            </h2>
            <span className="text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
              {filteredMovies.length} فيلم متاح
            </span>
          </div>
          
          {filteredMovies.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">لا توجد أفلام متطابقة</h3>
              <p className="text-gray-500">جرب تغيير معايير البحث أو التصفية</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMovies.map((movie, index) => (
                <div 
                  key={movie.id} 
                  className="animate-fadeIn card-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <MovieCard 
                    movie={movie} 
                    onBookClick={handleBookClick}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Booking Modal */}
      <BookingModal 
        movie={selectedMovie}
        isOpen={isBookingModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleBookingSuccess}
      />

      {/* Success Modal */}
      <SuccessModal 
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        bookingDetails={bookingDetails}
      />
    </div>
  )
}

export default App
