import { CheckCircle, Download, Share2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const SuccessModal = ({ isOpen, onClose, bookingDetails }) => {
  if (!isOpen) return null

  const handleDownloadTicket = () => {
    // Simulate ticket download
    const ticketData = {
      bookingId: 'CB' + Date.now(),
      movie: bookingDetails?.movie?.title,
      cinema: bookingDetails?.cinema,
      date: bookingDetails?.date,
      time: bookingDetails?.time,
      seats: bookingDetails?.seats,
      total: bookingDetails?.total
    }
    
    const dataStr = JSON.stringify(ticketData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `ticket-${ticketData.bookingId}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'تذكرة السينما',
        text: `تم حجز تذكرة لفيلم ${bookingDetails?.movie?.title}`,
        url: window.location.href
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `تم حجز تذكرة لفيلم ${bookingDetails?.movie?.title} في ${bookingDetails?.cinema}`
      )
      alert('تم نسخ تفاصيل الحجز!')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">تم الحجز بنجاح!</h2>
          <p className="text-gray-600">تم تأكيد حجز تذكرتك بنجاح</p>
        </div>

        {/* Booking Details */}
        {bookingDetails && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">رقم الحجز:</span>
              <span className="font-semibold">CB{Date.now().toString().slice(-6)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">الفيلم:</span>
              <span className="font-semibold">{bookingDetails.movie?.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">دار السينما:</span>
              <span className="font-semibold">{bookingDetails.cinema}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">التاريخ والوقت:</span>
              <span className="font-semibold">{bookingDetails.date} - {bookingDetails.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">المقاعد:</span>
              <span className="font-semibold">{bookingDetails.seats?.join(', ')}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-gray-600">الإجمالي:</span>
              <span className="font-bold text-green-600">{bookingDetails.total} ريال</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleDownloadTicket}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
          >
            <Download className="w-5 h-5 mr-2" />
            تحميل التذكرة
          </Button>
          
          <Button
            onClick={handleShare}
            variant="outline"
            className="w-full"
          >
            <Share2 className="w-5 h-5 mr-2" />
            مشاركة
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>سيتم إرسال تفاصيل الحجز إلى بريدك الإلكتروني</p>
          <p className="mt-1">يرجى إحضار هويتك الشخصية عند الحضور</p>
        </div>
      </div>
    </div>
  )
}

export default SuccessModal

