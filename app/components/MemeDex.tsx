import Image from 'next/image'
import { Button } from '@/app/components/ui/button'

interface MemeDexProps {
  collection: { id: string; name: string; image: string }[]
  onMemeSelect: (meme: { id: string; name: string; image: string }) => void
}

export default function MemeDex({ collection, onMemeSelect }: MemeDexProps) {
  return (
    <div>
      <h2 className="text-2xl pixel-text-minimal mb-8">Your MemeDex</h2>
      {collection.length === 0 ? (
        <p className="text-center pixel-text-minimal mt-8">Your MemeDex is empty. Upload some memes!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {collection.map((meme) => (
            <div key={meme.id} className="border border-white p-2 sm:p-4 text-center">
              <Image src={meme.image} alt={meme.name} width={100} height={100} className="object-cover w-full h-32 mb-2" />
              <p className="pixel-text-minimal mb-1 text-sm">{meme.name}</p>
              <p className="pixel-text-minimal mb-2 text-xs">ID: {meme.id}</p>
              <Button onClick={() => onMemeSelect(meme)} className="w-full bg-white text-black hover:bg-gray-200 pixel-text-minimal text-xs sm:text-sm">
                Select
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

