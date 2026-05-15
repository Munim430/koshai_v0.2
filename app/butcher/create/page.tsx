import { CreateButcherListing } from '@/components/butcher/CreateButcherListing'

export default function CreateButcherPage() {
  return (
    <main className="pt-20 pb-24">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-primary mb-6">কসাই সেবা যুক্ত করুন</h2>
        <CreateButcherListing />
      </div>
    </main>
  )
}
