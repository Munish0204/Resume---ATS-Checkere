import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import ResumeBuilder from "./pages/ResumeBuilder";
import ATSChecker from "./pages/ATSChecker";
import InterviewPrep from "./pages/InterviewPrep";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CoverLetterGenerator from "./pages/CoverLetter";
import ResumeEditor from "./components/ResumeEditor";
import ResumeTemp2 from "./components/Resume temp2";
import ResumeTemp3 from "./components/Resumetemp3";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/ats-checker" element={<ATSChecker />} />
        <Route path="/interview-prep" element={<InterviewPrep />} />
        <Route path="/cover-letter" element={<CoverLetterGenerator />} />
        <Route path="/edit/:id1" element={<ResumeEditor />} />
        <Route path="/edit/template2" element={<ResumeTemp2 />} />
        <Route path="/edit/template3" element={<ResumeTemp3 />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
