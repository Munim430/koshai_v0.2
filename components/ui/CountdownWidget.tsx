'use client'

import { useState, useEffect } from 'react'

interface CountdownTime {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownWidget() {
  const [time, setTime] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateCountdown = () => {
      // Calculate to next Eid (approximate - using June 16, 2026 as example)
      const targetDate = new Date('2026-06-16').getTime()
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTime({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateCountdown()
    const timer = setInterval(calculateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="gradient-countdown rounded-lg p-6 border border-primary/20">
      <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-4">ঈদ পর্যন্ত সময়</h3>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'দিন', value: time.days },
          { label: 'ঘন্টা', value: time.hours },
          { label: 'মিনিট', value: time.minutes },
          { label: 'সেকেন্ড', value: time.seconds },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-lg p-3 text-center border border-primary/20">
            <div className="text-2xl font-bold text-primary">{String(item.value).padStart(2, '0')}</div>
            <div className="text-xs text-muted font-semibold mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
