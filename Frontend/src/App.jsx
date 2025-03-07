import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import ResumeBuilder from "./pages/ResumeBuilder";
import ATSChecker from "./pages/ATSChecker";
import InterviewPrep from "./pages/InterviewPrep";
import ApplicationTracker from "./pages/ApplicationTracker";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/ats-checker" element={<ATSChecker />} />
        <Route path="/interview-prep" element={<InterviewPrep />} />
        <Route path="/application-tracker" element={<ApplicationTracker />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;