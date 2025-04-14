import React, { useState } from "react";
import axios from "axios";

const ATSChecker = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setResumeFile(file);
    setError(""); // Clear errors when a new file is selected
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setResumeFile(droppedFile);
    }
  };

  const handleCheckATS = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      setError("Please upload a resume and enter the job description.");
      return;
    }

    setLoading(true);
    setError("");
    setScore(null);
    setFeedback("");

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobDescription", jobDescription);

    try {
      const response = await axios.post("http://localhost:8000/check-ats", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setScore(response.data.score);
      setFeedback(response.data.feedback);
    } catch (error) {
      console.error("Error checking ATS:", error);
      setError("Failed to check ATS. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">ATS Checker</h1>

      {/* Upload Box with Drag-and-Drop Support */}
      <div
        className={`w-full max-w-lg p-6 border-2 border-dashed rounded-lg transition-all 
        ${dragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"} 
        flex flex-col items-center justify-center cursor-pointer shadow-md`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
          <svg
            className="w-12 h-12 text-gray-400 mb-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-3-3m3 3l3-3m-9 3a5 5 0 0110 0m-5-3V4"></path>
          </svg>
          <span className="text-gray-500">Drag & Drop or Click to Upload</span>
          <span className="text-sm text-gray-400">(PDF files only)</span>
        </label>
        {resumeFile && <p className="mt-2 text-sm text-gray-600">📄 {resumeFile.name}</p>}
      </div>

      {/* Job Description Input */}
      <textarea
        className="w-full max-w-2xl p-3 border rounded-md mt-4"
        rows="5"
        placeholder="Paste job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      ></textarea>

      {/* Check ATS Score Button */}
      <button
        onClick={handleCheckATS}
        className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Checking..." : "Check ATS Score"}
      </button>

      {/* Error Message */}
      {error && <p className="text-red-600 mt-3">{error}</p>}

      {/* Result */}
      {score !== null && (
        <div className="mt-6 p-4 bg-white shadow-md rounded-lg max-w-2xl">
          <h2 className="text-xl font-bold text-green-600">ATS Score: {score}%</h2>
          <p className="text-gray-700 mt-2">{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default ATSChecker;
