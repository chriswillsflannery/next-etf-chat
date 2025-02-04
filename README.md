# ETF Chat Assistant

An AI-powered chat application that helps users learn about Exchange-Traded Funds (ETFs) using RAG (Retrieval-Augmented Generation) technology. The application combines OpenAI's language models with up-to-date ETF data to provide accurate, contextual information about ETF investing.

## Features

- 🤖 AI-powered chat interface for ETF-related questions
- 📊 Real-time ETF data integration
- 💡 Smart prompt suggestions for common ETF queries
- ✨ Streaming responses for better user experience
- 🔍 RAG implementation for accurate, data-backed answers

## Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS
- **AI/ML**: OpenAI GPT-3.5 Turbo, Text Embeddings
- **Database**: Astra DB (for vector storage)
- **API**: Next.js API Routes with streaming support

## Getting Started

1. Clone the repository

2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables:

```env
OPENAI_API_KEY=your_openai_api_key
ASTRA_DB_APPLICATION_TOKEN=your_astra_token
ASTRA_DB_API_ENDPOINT=your_astra_endpoint
ASTRA_DB_NAMESPACE=your_namespace
ASTRA_DB_COLLECTION=your_collection
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to start chatting about ETFs!

## How It Works

1. The application maintains a database of current ETF information using vector embeddings
2. When a user asks a question, the system:
   - Creates an embedding of the user's query
   - Retrieves relevant ETF information from the vector database
   - Combines this information with GPT-3.5's knowledge to generate accurate responses
3. Responses are streamed in real-time for better user experience

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
