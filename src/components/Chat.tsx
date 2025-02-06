import { useState } from "react";
import { getChatResponse } from "../services/api";

export function Chat() {
  const [messages, setMessages] = useState<
    Array<{ role: string; content: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (userMessage: string) => {
    try {
      setIsLoading(true);
      const newMessages = [...messages, { role: "user", content: userMessage }];
      setMessages(newMessages);

      const stream = await getChatResponse(newMessages);
      const reader = stream.getReader();
      let assistantMessage = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantMessage += value;
        // You can update the UI incrementally here if desired
      }

      setMessages([
        ...newMessages,
        { role: "assistant", content: assistantMessage },
      ]);
    } catch (error) {
      console.error("Error:", error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Render your chat UI here */}
      {messages.map((message, index) => (
        <div key={index} className={message.role}>
          {message.content}
        </div>
      ))}
      {/* Add your input component here */}
    </div>
  );
}
