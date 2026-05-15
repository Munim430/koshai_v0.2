import { CreateAnimalListing } from '@/components/marketplace/CreateAnimalListing'

export default function CreateListingPage() {
  return (
    <main className="pt-20 pb-24">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-primary mb-6">নতুন তালিকা যোগ করুন</h2>
        <CreateAnimalListing />
      </div>
    </main>
  )
}
