export default function Footer() {
  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Docs', href: 'docs.pixaiterminal.com' },
    { name: 'X', href: 'https://x.com/_PixAI_' },
    { name: 'Github', href: 'https://github.com/Pixie548/PixAI' },
    { name: 'Telegram', href: 'https://t.me/pixai_portal', className: 'text-white hover:text-gray-300' },
  ]

  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex flex-wrap justify-center gap-6">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm hover:text-gray-300 transition-colors pixel-text-minimal ${item.className || 'text-gray-400'}`}
              >
                {item.name}
              </a>
            ))}
          </div>
          <p className="text-sm pixel-text-minimal text-gray-400">
            © {new Date().getFullYear()} PIXAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

