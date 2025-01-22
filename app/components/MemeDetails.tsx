import Image from 'next/image'

interface MemeDetailsProps {
  meme: { id: string; name: string; image: string }
}

export default function MemeDetails({ meme }: MemeDetailsProps) {
  return (
    <div className="bg-gray-900 p-4 rounded-lg h-full flex flex-col">
      <h3 className="text-xl pixel-text-minimal mb-4">{meme.name}</h3>
      <div className="flex-grow flex items-center justify-center mb-4">
        <Image src={meme.image} alt={meme.name} width={200} height={200} className="pixel-art-icon" />
      </div>
      <div className="mt-4 space-y-2">
        <p className="pixel-text-minimal">ID: {meme.id}</p>
        <p className="pixel-text-minimal">Created: {new Date().toLocaleDateString()}</p>
        <p className="pixel-text-minimal">Rarity: Common</p>
      </div>
    </div>
  )
}

