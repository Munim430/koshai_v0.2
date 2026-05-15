export default function Home() {
  return (
    <main className="pt-16">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-primary mb-4">স্বাগতম KOSHAI এ</h2>
        <p className="text-foreground mb-6">বাংলাদেশের সবচেয়ে বড় গবাদি পশু বাজারপ্লেস, কসাই সেবা এবং কোরবানি শেয়ারিং প্ল্যাটফর্ম।</p>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-secondary p-4 rounded-lg border border-accent/10">
            <h3 className="font-bold text-lg mb-2">🐄 গবাদি পশু বাজার</h3>
            <p className="text-sm text-foreground/70">গরু, ছাগল এবং ভেড়া সরাসরি কৃষকদের কাছ থেকে কিনুন</p>
          </div>

          <div className="bg-secondary p-4 rounded-lg border border-accent/10">
            <h3 className="font-bold text-lg mb-2">🔪 কসাই সেবা</h3>
            <p className="text-sm text-foreground/70">বিশ্বস্ত কসাই পরিষেবা এবং ডেলিভারি</p>
          </div>

          <div className="bg-secondary p-4 rounded-lg border border-accent/10">
            <h3 className="font-bold text-lg mb-2">📍 কোরবানি শেয়ারিং</h3>
            <p className="text-sm text-foreground/70">বন্ধুদের সাথে কোরবানি শেয়ার করুন</p>
          </div>
        </div>
      </div>
    </main>
  )
}
