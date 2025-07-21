import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl">🎬</div>
              <h3 className="text-xl font-bold">سينما بوك</h3>
            </div>
            <p className="text-gray-400 mb-4">
              منصتك المفضلة لحجز تذاكر السينما بسهولة وسرعة. استمتع بأحدث الأفلام في أفضل دور السينما.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">الأفلام الحالية</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">الأفلام القادمة</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">دور السينما</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">العروض الخاصة</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">حجوزاتي</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">الدعم</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">مركز المساعدة</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">اتصل بنا</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">سياسة الإرجاع</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">الشروط والأحكام</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">سياسة الخصوصية</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">تواصل معنا</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-yellow-400 mr-3" />
                <span className="text-gray-400">+966 11 123 4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-yellow-400 mr-3" />
                <span className="text-gray-400">info@cinemabook.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 text-yellow-400 mr-3" />
                <span className="text-gray-400">الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 سينما بوك. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

