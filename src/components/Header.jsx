import { Search, User, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Header = () => {
  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-yellow-400">🎬</div>
            <h1 className="text-xl font-bold">سينما بوك</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-yellow-400 transition-colors">الرئيسية</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">الأفلام</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">دور السينما</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">العروض</a>
          </nav>

          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-slate-800 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="ابحث عن فيلم..." 
                className="bg-transparent text-white placeholder-gray-400 outline-none w-48"
              />
            </div>
            
            <Button variant="ghost" size="sm" className="text-white hover:text-yellow-400">
              <User className="w-5 h-5" />
            </Button>
            
            <Button variant="ghost" size="sm" className="md:hidden text-white">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

