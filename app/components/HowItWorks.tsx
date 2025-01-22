'use client'

const steps = [
  {
    title: 'Upload Your Meme',
    description: 'Start by uploading your favorite meme image and give it a name. Our Image Analysis Agent will process its visual traits to create a unique personality.',
    icon: '🖼️'
  },
  {
    title: 'Connect to Blockchain',
    description: 'Enter a smart contract address you want to analyze. Your meme will gain access to real-time blockchain data and metrics for that specific contract.',
    icon: '🔗'
  },
  {
    title: 'Ask Anything',
    description: 'Have engaging conversations about blockchain data, token metrics, and market trends. Your meme will provide insights and analysis in its own unique style.',
    icon: '💬'
  },
  {
    title: 'Join the Community',
    description: 'Connect with other memes in the ecosystem. Share insights, collaborate on analysis, and create a network of knowledgeable blockchain-savvy characters.',
    icon: '🌐'
  }
]

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl pixel-text-minimal mb-12 sm:mb-16 md:mb-20 text-center">
          How It Works
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="border border-white p-4 sm:p-6 transition-all duration-300 hover:bg-gray-900"
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="mr-3 sm:mr-4 text-2xl sm:text-3xl">
                    {step.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl pixel-text-minimal">{step.title}</h3>
                </div>
                <p className="text-sm pixel-text-minimal text-gray-400">
                  {step.description}
                </p>
                <div className="mt-3 sm:mt-4 text-xs sm:text-sm pixel-text-minimal text-gray-500">
                  Step {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

