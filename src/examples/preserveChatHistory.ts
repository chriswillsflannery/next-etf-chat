import { CoreMessage } from "ai";

const messages: CoreMessage[] = [
  {
    role: "system",
    content:
      "You are a helpful assistant that can answer questions about the moon.",
  },
  {
    role: "user",
    content: "What is the capital of the moon?",
  },
  {
    role: "assistant",
    content: "The capital of the moon is called Luna City.",
  },
];

// AI chat maintains conversation history in a messages array,
// but faces context length limitations. While models enforce maximum context length,
// truncation decisions are handled client-side. Clients can use various strategies:
// keeping recent messages, preserving important ones, or summarizing old content.
// A novel approach is using two models: a small, cheap model for context management
// (keep/delete/summarize decisions), and a larger model for actual responses.
// This two-tier system balances cost and performance, with the smaller model handling
// context optimization before passing the compressed history to the main model for response generation.
