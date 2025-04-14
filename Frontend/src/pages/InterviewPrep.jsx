import React, { useState } from "react";
import axios from "axios";

const AIInterviewPrep = () => {
  const [jobRole, setJobRole] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [loading, setLoading] = useState(false);

  // Function to fetch interview questions from backend
  const fetchQuestions = async () => {
    if (!jobRole.trim()) {
      alert("Please enter a job role.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/generate-questions", { jobRole });
      const filteredQuestions = response.data.questions.filter(q => q.trim() !== ""); // Remove empty strings
      setQuestions(filteredQuestions);
      setAnswers({}); // Reset answers on new questions
      setFeedback({}); // Reset feedback
    } catch (error) {
      console.error("❌ Error fetching questions:", error);
      alert("Failed to generate questions.");
    }
    setLoading(false);
  };

  // Function to handle answer input changes
  const handleAnswerChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  // Function to send answers for AI evaluation
  const evaluateAnswers = async () => {
    if (Object.keys(answers).length === 0) {
      alert("Please answer at least one question before getting feedback.");
      return;
    }

    setLoading(true);
    try {
      const requestData = { questions, answers };
      console.log("🚀 Sending request to AI API:", requestData);

      const response = await axios.post("http://localhost:8000/evaluate-answers", requestData);

      console.log("✅ AI Feedback Response:", response.data);

      if (response.data && response.data.feedback) {
        setFeedback(response.data.feedback);
      } else {
        alert("Unexpected response format from server.");
      }
    } catch (error) {
      console.error("❌ Error evaluating answers:", error);
      alert("Failed to evaluate answers. Check server logs.");
    }
    setLoading(false);
  };

  // Function to format feedback with bullet points and bold text
  const formatFeedback = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Convert **bold** to <strong>
      .replace(/\n\* /g, "<li>") // Convert newline + * to list item
      .replace(/\n/g, "<br />"); // Convert newlines to <br> for better readability
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">AI Interview Prep</h1>

      {/* Input for job role */}
      <input
        type="text"
        className="p-2 border rounded w-full max-w-md"
        placeholder="Enter Job Role (e.g., Software Engineer)"
        value={jobRole}
        onChange={(e) => setJobRole(e.target.value)}
      />

      {/* Generate Questions Button */}
      <button
        onClick={fetchQuestions}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Questions"}
      </button>

      {/* Display Questions & Answer Inputs */}
      {questions.length > 0 && (
        <div className="mt-6 w-full max-w-2xl bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Interview Questions</h2>

          {questions.map((q, index) => (
            <div key={index} className="mb-4">
              <p
                className="font-semibold"
                dangerouslySetInnerHTML={{ __html: formatFeedback(q) }}
              />
              <textarea
                className="w-full p-2 border rounded"
                rows="3"
                placeholder="Type your answer here..."
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              ></textarea>

              {/* Display AI Feedback */}
              {feedback[index] && (
                <div
                  className="text-green-600 mt-2 p-3 bg-green-100 rounded"
                  dangerouslySetInnerHTML={{ __html: formatFeedback(feedback[index]) }}
                />
              )}
            </div>
          ))}

          {/* Get AI Feedback Button */}
          <button
            onClick={evaluateAnswers}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Evaluating..." : "Get AI Feedback"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AIInterviewPrep;
