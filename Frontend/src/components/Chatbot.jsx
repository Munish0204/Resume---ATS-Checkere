import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown"; // ✅ Import React Markdown
import { motion } from "framer-motion";
import { X, Bot } from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

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

  return (
    <>
      {/* Toggle Chatbot Button */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700"
      >
        {showChatbot ? "Close Chat" : "Chat with AI"}
      </button>

      {/* Chatbot UI */}
      {showChatbot && (
        <div className="fixed bottom-16 right-5 w-80 bg-white p-4 rounded-lg shadow-lg border border-gray-300">
          {/* Chatbot Header */}
          <div className="flex justify-between items-center">
  {/* ✅ Added Bot Icon */}
  <h2 className="text-lg font-bold text-blue-700 flex items-center gap-2">
    <Bot size={20} className="text-blue-600" /> Chat with AI
  </h2>
  
  {/* Close Button */}
  <button onClick={() => setShowChatbot(false)} className="text-gray-500 hover:text-gray-700">
    <X size={20} />
  </button>
</div>

          {/* Chat Messages */}
          <div className="h-60 overflow-y-auto p-2 border rounded mt-2">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-2 my-1 rounded-lg ${
                  msg.sender === "user" ? "bg-blue-100 text-right" : "bg-gray-100"
                }`}
              >
                {/* ✅ Render Markdown for bold text */}
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </motion.div>
            ))}
            {loading && <p className="text-gray-500">Thinking...</p>}
          </div>

          {/* Input & Send Button */}
          <div className="flex mt-2">
            <input
              type="text"
              className="flex-1 p-2 border rounded-l"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white p-2 rounded-r hover:bg-blue-700"
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
