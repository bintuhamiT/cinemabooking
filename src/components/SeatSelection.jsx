import { useState } from 'react'
import { Button } from '@/components/ui/button'

const SeatSelection = ({ onSeatSelect, selectedSeats = [] }) => {
  const [seats, setSeats] = useState(() => {
    // إنشاء مصفوفة المقاعد (10 صفوف × 12 مقعد)
    const seatLayout = []
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    
    rows.forEach(row => {
      for (let i = 1; i <= 12; i++) {
        const seatId = `${row}${i}`
        const isOccupied = Math.random() < 0.3 // 30% من المقاعد محجوزة عشوائياً
        seatLayout.push({
          id: seatId,
          row,
          number: i,
          isOccupied,
          isSelected: selectedSeats.includes(seatId)
        })
      }
    })
    return seatLayout
  })

  const handleSeatClick = (seatId) => {
    const seat = seats.find(s => s.id === seatId)
    if (seat.isOccupied) return

    const updatedSeats = seats.map(s => 
      s.id === seatId ? { ...s, isSelected: !s.isSelected } : s
    )
    setSeats(updatedSeats)
    
    const newSelectedSeats = updatedSeats
      .filter(s => s.isSelected)
      .map(s => s.id)
    
    onSeatSelect(newSelectedSeats)
  }

  const getSeatClass = (seat) => {
    if (seat.isOccupied) return 'bg-red-500 cursor-not-allowed'
    if (seat.isSelected) return 'bg-yellow-500 hover:bg-yellow-600'
    return 'bg-gray-300 hover:bg-gray-400 cursor-pointer'
  }

  const groupedSeats = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = []
    acc[seat.row].push(seat)
    return acc
  }, {})

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Screen */}
      <div className="mb-8">
        <div className="w-full h-4 bg-gradient-to-r from-gray-300 via-gray-500 to-gray-300 rounded-t-full mb-2"></div>
        <p className="text-center text-gray-600 text-sm">الشاشة</p>
      </div>

      {/* Seats */}
      <div className="space-y-3 mb-6">
        {Object.entries(groupedSeats).map(([row, rowSeats]) => (
          <div key={row} className="flex items-center justify-center gap-2">
            <span className="w-6 text-center font-bold text-gray-700">{row}</span>
            <div className="flex gap-1">
              {rowSeats.slice(0, 6).map(seat => (
                <button
                  key={seat.id}
                  onClick={() => handleSeatClick(seat.id)}
                  className={`w-8 h-8 rounded-t-lg text-xs font-bold transition-colors ${getSeatClass(seat)}`}
                  disabled={seat.isOccupied}
                  title={seat.isOccupied ? 'مقعد محجوز' : `مقعد ${seat.id}`}
                >
                  {seat.number}
                </button>
              ))}
            </div>
            <div className="w-8"></div> {/* ممر */}
            <div className="flex gap-1">
              {rowSeats.slice(6, 12).map(seat => (
                <button
                  key={seat.id}
                  onClick={() => handleSeatClick(seat.id)}
                  className={`w-8 h-8 rounded-t-lg text-xs font-bold transition-colors ${getSeatClass(seat)}`}
                  disabled={seat.isOccupied}
                  title={seat.isOccupied ? 'مقعد محجوز' : `مقعد ${seat.id}`}
                >
                  {seat.number}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded-t"></div>
          <span>متاح</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded-t"></div>
          <span>مختار</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-t"></div>
          <span>محجوز</span>
        </div>
      </div>
    </div>
  )
}

export default SeatSelection

