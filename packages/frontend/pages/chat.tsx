import RawHeader from "@/components/RawHeader";
import { OLAS_ENDPOINT } from "@/constants";
import { Button } from "@headlessui/react";
import { SendHorizonal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add initial bot message
    setMessages([
      {
        text: "Chef AI: Hi, got anything you want to tell us about your 'Burger and fries' order?",
        sender: "bot",
      },
    ]);
  }, []);

  useEffect(() => {
    // Scroll to the bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage: Message = { text: input, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");

      try {
        const response = await fetch(`${OLAS_ENDPOINT}/prompt`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt_text: input,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const botMessage: Message = {
          text: "Chef AI: " + data.result,
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("Error generating AI prompt:", error);
        const botMessage: Message = {
          text: "Chef AI: Sorry, something went wrong.",
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      <RawHeader back ai />
      <div className="flex-1 p-4 overflow-auto mt-10 mb-5 flex flex-col-reverse">
        <div className="flex flex-col space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`py-2 px-4 rounded-lg max-w-[250px] ${
                message.sender === "user"
                  ? "bg-green-500 text-white self-end"
                  : "bg-gray-300 text-black self-start"
              }`}
            >
              <p className="text-xs">{message.text}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 bg-white border-t border-gray-200 flex fixed z-10 bottom-0 right-0 left-0">
        <input
          type="text"
          value={input}
          onKeyPress={handleKeyPress}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border-gray-300 rounded-full px-5 outline-none bg-neutral-200 text-sm"
          placeholder="Type here..."
        />
        <Button
          onClick={handleSend}
          className="ml-2 h-9 w-9 flex items-center justify-center bg-green-500 text-white rounded-full"
        >
          <SendHorizonal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatPage;
