import { CreateQurbaniListing } from '@/components/qurbani/CreateQurbaniListing'

export default function CreateQurbaniPage() {
  return (
    <main className="pt-20 pb-24">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-primary mb-6">নতুন কোরবানি তালিকা</h2>
        <CreateQurbaniListing />
      </div>
    </main>
  )
}
