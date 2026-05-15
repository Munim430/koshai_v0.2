'use client'

import { useEffect, useState } from 'react'

interface CountdownState {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function EidCountdownHero() {
  const [countdown, setCountdown] = useState<CountdownState>({
    days: 45,
    hours: 12,
    minutes: 30,
    seconds: 45,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev

        seconds--
        if (seconds < 0) {
          seconds = 59
          minutes--
        }
        if (minutes < 0) {
          minutes = 59
          hours--
        }
        if (hours < 0) {
          hours = 23
          days--
        }
        if (days < 0) {
          days = 365
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (val: number) => String(val).padStart(2, '0')

  return (
    <div className="gradient-hero rounded-3xl p-8 text-white shadow-2xl">
      <div className="text-center">
        <h2 className="text-lg font-bold mb-2 font-semibold">ঈদের জন্য গণনা</h2>
        <p className="text-sm opacity-90 mb-6">আপনার পশু প্রস্তুত করুন</p>

        {/* Countdown Numbers */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {/* Days */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30">
            <div className="text-3xl font-bold pulse-text">
              {formatTime(countdown.days)}
            </div>
            <div className="text-xs opacity-90 mt-1">দিন</div>
          </div>

          {/* Hours */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30">
            <div className="text-3xl font-bold pulse-text">
              {formatTime(countdown.hours)}
            </div>
            <div className="text-xs opacity-90 mt-1">ঘন্টা</div>
          </div>

          {/* Minutes */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30">
            <div className="text-3xl font-bold pulse-text">
              {formatTime(countdown.minutes)}
            </div>
            <div className="text-xs opacity-90 mt-1">মিনিট</div>
          </div>

          {/* Seconds */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30">
            <div className="text-3xl font-bold pulse-text">
              {formatTime(countdown.seconds)}
            </div>
            <div className="text-xs opacity-90 mt-1">সেকেন্ড</div>
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full bg-white text-[#DA291C] font-bold py-3 rounded-full hover:bg-white/90 transition-all duration-200 active:scale-95 shadow-lg">
          এখনই শুরু করুন
        </button>
      </div>
    </div>
  )
}
