const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();
const { pipeline } = require("@xenova/transformers");
const natural = require("natural");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Single multer instance for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });


const GEMINI_API_KEY = 'AIzaSyA_mudXAEO8V0na6r9W67X-CdFvVTeaRLc';
const GEMINI_MODEL = "gemini-1.5-pro";  // ✅ Use the correct model
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;


// 🟢 **Chatbot API**
app.post("/chatbot", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    console.log("📨 Received message:", message);
    const response = await axios.post(GEMINI_API_URL,
      {
        contents: [{ parts: [{ text: message }] }]
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    console.log("✅ AI API Response:", response.data);

    const botReply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response.";

    return res.json({ reply: botReply });

  } catch (error) {
    console.error("❌ AI API Error:", error.response?.data || error.message);

    if (error.response?.status === 403) {
      return res.status(500).json({ error: "Invalid API Key or quota exceeded." });
    } else if (error.response?.status === 404) {
      return res.status(500).json({ error: "Incorrect API endpoint or model name." });
    }

    return res.status(500).json({ error: "Failed to fetch response from AI" });
  }
});

// 🟢 **Generate Resume Summary Using Gemini**
app.post("/generate-summary", async (req, res) => {
  const { jobTitle } = req.body;

  if (!jobTitle) {
    return res.status(400).json({ error: "Job title is required" });
  }

  try {
    const aiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Write a professional resume summary for a ${jobTitle}.`
              }
            ]
          }
        ]
      }
    );

    // Extract AI-generated summary
    const summary =
      aiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text || "No summary generated.";

    res.json({ summary });
  } catch (error) {
    console.error("AI API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Error generating summary" });
  }
});

//ATS checker

// ✅ Function to extract text from resume files
const extractTextFromFile = async (fileBuffer, mimetype) => {
  try {
    if (mimetype === "application/pdf") {
      const data = await pdfParse(fileBuffer);
      return data.text;
    } else {
      return fileBuffer.toString("utf-8");
    }
  } catch (error) {
    console.error("❌ Error extracting text from file:", error.message);
    throw new Error("Failed to extract text from file.");
  }
};

// ✅ Preprocess text (lowercase, remove stopwords, and tokenize)
const preprocessText = (text) => {
  // Convert to lowercase
  text = text.toLowerCase();

  // Remove punctuation and special characters
  text = text.replace(/[^\w\s]/g, "");

  // Tokenize into words
  const words = text.split(/\s+/);

  // Remove stopwords
  const filteredWords = words.filter((word) => !natural.stopwords.includes(word));

  return filteredWords;
};

// ✅ Extract keywords from text
const extractKeywords = (text) => {
  const words = preprocessText(text);
  return [...new Set(words)]; // Remove duplicates
};

// ✅ Match resume keywords to job description keywords
const matchKeywords = (resumeKeywords, jobDescriptionKeywords) => {
  const matchedKeywords = resumeKeywords.filter((keyword) =>
    jobDescriptionKeywords.includes(keyword)
  );

  const matchPercentage = (
    (matchedKeywords.length / jobDescriptionKeywords.length) *
    100
  ).toFixed(2);

  return { matchedKeywords, matchPercentage };
};

// 🟢 **ATS Resume Checker API**
app.post("/check-ats", upload.single("resume"), async (req, res) => {
  try {
    const { jobDescription } = req.body;
    if (!req.file || !jobDescription) {
      return res.status(400).json({ error: "Resume file and job description are required." });
    }

    // Extract text from resume
    const resumeText = await extractTextFromFile(req.file.buffer, req.file.mimetype);

    // Preprocess and extract keywords from resume and job description
    const resumeKeywords = extractKeywords(resumeText);
    const jobDescriptionKeywords = extractKeywords(jobDescription);

    // Match keywords and calculate score
    const { matchedKeywords, matchPercentage } = matchKeywords(
      resumeKeywords,
      jobDescriptionKeywords
    );

    res.json({
      score: matchPercentage,
      matchedKeywords: matchedKeywords,
      feedback: `Your resume matches the job description by ${matchPercentage}%. ${jobDescriptionKeywords.filter(
        (keyword) => !resumeKeywords.includes(keyword)
      )}.`,
    });
  } catch (error) {
    console.error("❌ Error processing ATS:", error.message);
    res.status(500).json({ error: error.message || "Failed to analyze resume." });
  }
});



// 🟢 **Generate Interview Questions Using Gemini**
app.post("/generate-questions", async (req, res) => {
  try {
    const { jobRole } = req.body;

    if (!jobRole) {
      return res.status(400).json({ error: "Job role is required" });
    }

    console.log(`🔹 Requesting questions for: ${jobRole}`);

    const response = await axios.post(GEMINI_API_URL, {
      contents: [{ parts: [{ text: `Generate 5 interview questions for a ${jobRole} position.` }] }],
    });

    console.log("🔹 Gemini API Response:", JSON.stringify(response.data, null, 2));

    const questions =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.split("\n") || [];

    if (questions.length === 0) {
      throw new Error("No questions generated. Possible API quota issue.");
    }

    res.json({ questions });
  } catch (error) {
    console.error("❌ Error generating questions:", error.response?.data || error.message);

    res.status(500).json({
      error: "Failed to generate interview questions.",
      details: error.response?.data || error.message,
    });
  }
});


// 🟢 **Evaluate Interview Answers**
app.post("/evaluate-answers", async (req, res) => {
  try {
    const { answers, questions } = req.body;
    
    if (!answers || !questions) {
      return res.status(400).json({ error: "Missing answers or questions." });
    }

    let feedback = {};

    // Use Promise.all() for parallel requests
    const feedbackResponses = await Promise.all(
      Object.keys(answers).map(async (index) => {
        try {
          const response = await axios.post(
            `${GEMINI_API_URL}`,
            {
              contents: [
                {
                  parts: [
                    { text: "Evaluate this interview answer and provide constructive feedback." },
                    { text: `Question: ${questions[index]}\nAnswer: ${answers[index]}` },
                  ],
                },
              ],
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          // Extract feedback safely
          return {
            index,
            feedbackText:
              response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
              "No feedback available.",
          };
        } catch (error) {
          console.error(`❌ Error evaluating answer ${index}:`, error.message);
          return { index, feedbackText: "Error evaluating this answer." };
        }
      })
    );

    // Convert array response to object
    feedbackResponses.forEach(({ index, feedbackText }) => {
      feedback[index] = feedbackText;
    });

    res.json({ feedback });
  } catch (error) {
    console.error("❌ Error in API:", error.message);
    res.status(500).json({ error: "Failed to evaluate answers." });
  }
});


// 🟢 **Generate Cover Letter**
app.post("/extract-text", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const pdfText = await pdfParse(req.file.buffer);
    res.json({ text: pdfText.text });
  } catch (error) {
    console.error("PDF Extraction Error:", error);
    res.status(500).json({ error: "Error extracting text from PDF" });
  }
});

// Generate AI cover letter
app.post("/generate-cover-letter", async (req, res) => {
  const { resume, jobTitle, companyName } = req.body;

  if (!resume || !jobTitle || !companyName) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Call Gemini AI API to generate the cover letter
    const aiResponse = await axios.post(GEMINI_API_URL,
      {
        contents: [
          {
            parts: [
              {
                text: `Write a professional cover letter for the position of ${jobTitle} at ${companyName}. Use the following resume details:\n${resume}`,
              },
            ],
          },
        ],
      }
    );

    // Extract the generated cover letter from the response
    const coverLetter = aiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to generate cover letter.";

    res.json({ coverLetter });
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate cover letter" });
  }
});


// 🟢 **Start Server**
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

