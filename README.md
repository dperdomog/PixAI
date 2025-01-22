# PixAI - AI-Powered Meme Character Framework

PixAI is an innovative platform that transforms static meme images into interactive, AI-powered characters with unique personalities and blockchain capabilities.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Features

- 🎨 Meme character generation from images
- 🤖 Interactive AI-powered conversations
- 🔗 Blockchain integration for tracking meme ownership
- 🎮 Multi-character interactions
- 🔒 Secure API infrastructure

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key
- Bitquery API key

## 🛠️ Quick Start

1. Clone the repository:
```bash
git clone https://github.com/Pixie548/PixAI.git
cd PixAI
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy example env file
cp .env.example .env.local

# Edit .env.local with your API keys and configuration
```

Required environment variables in `.env.local`:
```env
OPENAI_API_KEY=your_openai_api_key
BITQUERY_API_KEY=your_bitquery_api_key
```

4. Start the server:
```bash
npm run server
```

5. Start the web application:
```bash
npm run web
```

The application will be available at:
- Frontend: http://localhost:3000
- API: http://localhost:3001

## 📚 Documentation

Detailed documentation is available in the [docs](./docs) directory:

- [API Endpoints](./docs/endpoints.md)
- [Architecture Overview](./docs/architecture.md)
- [DEFAI Integration](./docs/defai.md)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for their powerful AI models
- Bitquery for blockchain data integration
- All contributors who help improve this project

---
Made with ❤️ by the PixAI Team
