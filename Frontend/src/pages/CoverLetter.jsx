import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

const CoverLetterGenerator = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false); // ✅ FIXED: Added missing state

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Extract text from uploaded PDF
  const handleExtractText = async () => {
    if (!file) {
      setError("Please upload a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/extract-text", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setExtractedText(response.data.text);
    } catch (error) {
      setError("Error extracting text from PDF.");
    } finally {
      setLoading(false);
    }
  };

  // Generate AI Cover Letter
  const handleGenerateCoverLetter = async () => {
    if (!extractedText.trim() || !jobTitle.trim() || !companyName.trim()) {
      setError("Please provide all inputs.");
      return;
    }

    setLoading(true);
    setError("");
    setCoverLetter("");

    try {
      const response = await axios.post(
        "http://localhost:8000/generate-cover-letter",
        {
          resume: extractedText,
          jobTitle,
          companyName,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setCoverLetter(response.data.coverLetter || "Failed to generate cover letter.");
    } catch (error) {
      setError(error.response?.data?.error || "Error connecting to AI service.");
    } finally {
      setLoading(false);
    }
  };

  // Download as TXT file
  const handleDownloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([coverLetter], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "Cover_Letter.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Download as PDF file
  const handleDownloadPdf = () => {
    const pdf = new jsPDF();
    pdf.text(coverLetter, 10, 10);
    pdf.save("Cover_Letter.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Cover Letter Generate</h1>

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
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const droppedFile = e.dataTransfer.files[0];
          if (droppedFile) {
            setFile(droppedFile);
          }
        }}
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
        {file && <p className="mt-2 text-sm text-gray-600">📄 {file.name}</p>}
      </div>

      <button
        onClick={handleExtractText}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Extracting..." : "Extract Text"}
      </button>

      {extractedText && (
        <div className="mt-4 p-4 bg-white shadow rounded w-full max-w-2xl">
          <h3 className="text-lg font-semibold mb-2">Extracted Resume Details:</h3>
          <textarea className="w-full p-2 border rounded" rows="6" value={extractedText} readOnly />
        </div>
      )}

      <div className="mt-4 w-full max-w-2xl">
        <label className="block mb-2">Job Title:</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />

        <label className="block mt-2 mb-2">Company Name:</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <button
          onClick={handleGenerateCoverLetter}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Cover Letter"}
        </button>
      </div>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {coverLetter && (
        <div className="mt-6 p-4 bg-white shadow rounded w-full max-w-2xl">
          <h3 className="text-lg font-semibold mb-2">Generated Cover Letter:</h3>
          <p className="whitespace-pre-wrap">{coverLetter}</p>

          {/* Download Buttons */}
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleDownloadTxt}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Download as TXT
            </button>

            <button
              onClick={handleDownloadPdf}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Download as PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverLetterGenerator;
