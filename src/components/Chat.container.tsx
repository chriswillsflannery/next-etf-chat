"use client";
import LoadingBubble from "../components/LoadingBubble";
import PromptSuggestionsRow from "../components/PromptSuggestionsRow";
import Bubble from "../components/Bubble";
import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}


export const ChatContainer = () => {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim() || isLoading) return;
    setIsLoading(true);

    const newMessages: Message[] = [
      ...conversation,
      { role: "user", content: input },
    ];
    setConversation(newMessages);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to fetch response");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        assistantMessage += chunk;

        setConversation([
          ...newMessages,
          { role: "assistant", content: assistantMessage },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const noMessages = !conversation || conversation.length === 0;

  const handlePromptClick = (promptText: string) => {
    const msg: Message = {
      content: promptText,
      role: "user",
    };
    setConversation([...conversation, msg]);
    setInput("");
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-32 md:py-48">
      <div className="messages flex flex-col items-center w-full">
        {noMessages ? (
          <>
            <PromptSuggestionsRow handlePrompt={handlePromptClick} />
          </>
        ) : (
          <div className="space-y-4 mb-8">
            {conversation.map((message, idx) => {
              return <Bubble key={`message-${idx}`} message={message} />;
            })}
            {isLoading && <LoadingBubble />}
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg border-t"
      >
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(event) => {
              setInput(event.target.value);
            }}
            value={input}
            placeholder="Ask me something about ETFs..."
          />

          <input
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            type="submit"
            value="Send"
          />
        </div>
      </form>
      <div></div>
    </section>
  );
};
