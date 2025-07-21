import { useState } from 'react'
import { X, Calendar, Clock, MapPin, Users, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SeatSelection from './SeatSelection'
import { cinemas } from '../data/movies'

const BookingModal = ({ movie, isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState(1) // 1: تفاصيل, 2: اختيار المقاعد, 3: الدفع
  const [selectedCinema, setSelectedCinema] = useState(cinemas[0])
  const [selectedDate, setSelectedDate] = useState('2024-07-22')
  const [selectedTime, setSelectedTime] = useState(movie?.showtimes?.[0] || '14:00')
  const [selectedSeats, setSelectedSeats] = useState([])
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  })

  if (!isOpen || !movie) return null

  const totalPrice = selectedSeats.length * movie.price

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleBooking = () => {
    const bookingDetails = {
      movie,
      cinema: selectedCinema.name,
      date: dates.find(d => d.value === selectedDate)?.label,
      time: selectedTime,
      seats: selectedSeats,
      total: totalPrice,
      customerInfo
    }
    
    onSuccess(bookingDetails)
    setStep(1)
    setSelectedSeats([])
  }

  const dates = [
    { value: '2024-07-22', label: 'اليوم - 22 يوليو' },
    { value: '2024-07-23', label: 'غداً - 23 يوليو' },
    { value: '2024-07-24', label: 'الأربعاء - 24 يوليو' },
    { value: '2024-07-25', label: 'الخميس - 25 يوليو' }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">حجز تذكرة - {movie.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center p-4 border-b">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-yellow-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}>1</div>
              <span className="mr-2">تفاصيل العرض</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className={`flex items-center ${step >= 2 ? 'text-yellow-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}>2</div>
              <span className="mr-2">اختيار المقاعد</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className={`flex items-center ${step >= 3 ? 'text-yellow-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}>3</div>
              <span className="mr-2">الدفع</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              {/* Movie Info */}
              <div className="flex gap-4">
                <img src={movie.poster} alt={movie.title} className="w-24 h-36 object-cover rounded" />
                <div>
                  <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                  <p className="text-gray-600 mb-2">{movie.genre}</p>
                  <p className="text-gray-600">{movie.duration} دقيقة</p>
                </div>
              </div>

              {/* Cinema Selection */}
              <div>
                <h4 className="text-lg font-semibold mb-3 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  اختر دار السينما
                </h4>
                <div className="space-y-2">
                  {cinemas.map(cinema => (
                    <label key={cinema.id} className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="cinema"
                        value={cinema.id}
                        checked={selectedCinema.id === cinema.id}
                        onChange={() => setSelectedCinema(cinema)}
                        className="mr-3"
                      />
                      <div>
                        <div className="font-semibold">{cinema.name}</div>
                        <div className="text-sm text-gray-600">{cinema.location} - {cinema.distance}</div>
                        <div className="text-sm text-gray-500">{cinema.facilities.join(', ')}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <h4 className="text-lg font-semibold mb-3 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  اختر التاريخ
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {dates.map(date => (
                    <button
                      key={date.value}
                      onClick={() => setSelectedDate(date.value)}
                      className={`p-3 border rounded text-center ${selectedDate === date.value ? 'bg-yellow-500 text-white' : 'hover:bg-gray-50'}`}
                    >
                      {date.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <h4 className="text-lg font-semibold mb-3 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  اختر الوقت
                </h4>
                <div className="flex gap-2 flex-wrap">
                  {movie.showtimes.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-4 py-2 border rounded ${selectedTime === time ? 'bg-yellow-500 text-white' : 'hover:bg-gray-50'}`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                اختر مقاعدك ({selectedSeats.length} مقعد مختار)
              </h4>
              <SeatSelection 
                onSeatSelect={setSelectedSeats}
                selectedSeats={selectedSeats}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              {/* Booking Summary */}
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="text-lg font-semibold mb-3">ملخص الحجز</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>الفيلم:</span>
                    <span>{movie.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>دار السينما:</span>
                    <span>{selectedCinema.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>التاريخ والوقت:</span>
                    <span>{selectedDate} - {selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>المقاعد:</span>
                    <span>{selectedSeats.join(', ')}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>الإجمالي:</span>
                    <span>{totalPrice} ريال</span>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div>
                <h4 className="text-lg font-semibold mb-3">معلومات العميل</h4>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="الاسم الكامل"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="w-full p-3 border rounded"
                  />
                  <input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="w-full p-3 border rounded"
                  />
                  <input
                    type="tel"
                    placeholder="رقم الهاتف"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="w-full p-3 border rounded"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h4 className="text-lg font-semibold mb-3 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  طريقة الدفع
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border rounded cursor-pointer">
                    <input type="radio" name="payment" className="mr-3" defaultChecked />
                    <span>بطاقة ائتمانية</span>
                  </label>
                  <label className="flex items-center p-3 border rounded cursor-pointer">
                    <input type="radio" name="payment" className="mr-3" />
                    <span>مدى</span>
                  </label>
                  <label className="flex items-center p-3 border rounded cursor-pointer">
                    <input type="radio" name="payment" className="mr-3" />
                    <span>Apple Pay</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <div className="text-lg font-bold">
            {selectedSeats.length > 0 && `الإجمالي: ${totalPrice} ريال`}
          </div>
          <div className="flex gap-3">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                السابق
              </Button>
            )}
            {step < 3 ? (
              <Button 
                onClick={handleNext}
                disabled={step === 2 && selectedSeats.length === 0}
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                التالي
              </Button>
            ) : (
              <Button 
                onClick={handleBooking}
                disabled={!customerInfo.name || !customerInfo.email || !customerInfo.phone}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                تأكيد الحجز
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingModal

