import { Play, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Hero = () => {
  const featuredMovie = {
    title: "أفنجرز: نهاية اللعبة",
    description: "المعركة الأخيرة لإنقاذ الكون من ثانوس وقواه المدمرة",
    rating: 8.4,
    duration: 181,
    genre: "أكشن، مغامرة، خيال علمي",
    backgroundImage: "https://images.unsplash.com/photo-1489599735734-79b4169c2a78?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
  }

  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${featuredMovie.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <div className="flex items-center mb-4">
            <span className="bg-yellow-500 text-black px-3 py-1 rounded text-sm font-bold mr-3">
              {featuredMovie.genre}
            </span>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="text-yellow-400 font-bold">{featuredMovie.rating}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {featuredMovie.title}
          </h1>
          
          <p className="text-lg md:text-xl mb-6 text-gray-200">
            {featuredMovie.description}
          </p>

          <div className="flex items-center mb-6 text-gray-300">
            <span className="mr-6">{featuredMovie.duration} دقيقة</span>
            <span>2019</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
              احجز تذكرتك الآن
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <Play className="w-5 h-5 mr-2" />
              شاهد الإعلان
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

