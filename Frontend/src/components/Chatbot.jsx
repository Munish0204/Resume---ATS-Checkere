import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { X, Bot } from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/chatbot", {
        message: input,
      });

      const botReply = response.data.reply || "I'm sorry, I didn't understand that.";
      setMessages([...newMessages, { text: botReply, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages([...newMessages, { text: "Error connecting to AI service.", sender: "bot" }]);
    }

    setLoading(false);
  };

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700"
      >
        {showChatbot ? "Close Chat" : "Chat with AI"}
      </button>

      {/* Chat Window */}
      {showChatbot && (
        <div className="fixed bottom-20 right-5 w-96 h-[500px] bg-white shadow-xl rounded-lg border border-gray-300 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b bg-blue-50 rounded-t">
            <h2 className="text-lg font-bold text-blue-700 flex items-center gap-2">
              <Bot size={20} className="text-blue-600" /> Chat with AI
            </h2>
            <button
              onClick={() => setShowChatbot(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`max-w-[85%] p-2 rounded-lg whitespace-pre-wrap ${
                  msg.sender === "user"
                    ? "bg-blue-100 ml-auto text-right"
                    : "bg-gray-100 text-left"
                }`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </motion.div>
            ))}
            {loading && <p className="text-sm text-gray-500">Thinking...</p>}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex p-3 border-t">
            <input
              type="text"
              className="flex-1 p-2 border rounded-l outline-none"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
