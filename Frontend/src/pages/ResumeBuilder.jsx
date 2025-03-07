import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const templates = [
  { id: 1, name: "Simple", className: "border p-4 bg-gray-50 rounded" },
  { id: 2, name: "Professional", className: "border-2 p-6 bg-white shadow-lg rounded" },
  { id: 3, name: "Modern", className: "border p-5 bg-blue-50 rounded-lg" }
];

const ResumeBuilder = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    experience: "",
    skills: "",
    education: "",
  });
  const resumeRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const downloadPDF = () => {
    html2canvas(resumeRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 180, 250);
      pdf.save("resume.pdf");
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">Resume Builder</h1>

      {!selectedTemplate ? (
        <div>
          <h2 className="text-2xl text-center font-semibold mb-6">Choose a Resume Template</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {templates.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedTemplate(template)}
                className="cursor-pointer p-4 bg-white shadow-lg rounded-lg text-center"
              >
                <div className="h-40 flex items-center justify-center text-xl font-semibold">
                  {template.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-10">
          {/* Resume Form */}
          <div className="bg-white p-6 shadow-md rounded-lg w-full md:w-1/3">
            <h2 className="text-xl font-semibold mb-4">Fill in Your Details</h2>
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-2 mb-3 border rounded" />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 mb-3 border rounded" />
            <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full p-2 mb-3 border rounded" />
            <textarea name="summary" placeholder="Professional Summary" onChange={handleChange} className="w-full p-2 mb-3 border rounded"></textarea>
            <textarea name="experience" placeholder="Work Experience" onChange={handleChange} className="w-full p-2 mb-3 border rounded"></textarea>
            <textarea name="skills" placeholder="Skills" onChange={handleChange} className="w-full p-2 mb-3 border rounded"></textarea>
            <textarea name="education" placeholder="Education" onChange={handleChange} className="w-full p-2 mb-3 border rounded"></textarea>
            <button onClick={downloadPDF} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Download PDF</button>
          </div>

          {/* Resume Preview with Canva-like Design */}
          <motion.div ref={resumeRef} className={`relative w-full md:w-2/3 p-6 shadow-md rounded-lg ${selectedTemplate.className}`}>  
            <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>
            <div className="border-2 border-gray-300 p-6 bg-white rounded-md shadow-lg">
              <p className="text-2xl font-bold text-center">{formData.name || "Your Name"}</p>
              <p className="text-center text-gray-600">{formData.email || "youremail@example.com"}</p>
              <p className="text-center text-gray-600">{formData.phone || "123-456-7890"}</p>
              <hr className="my-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Summary</h3>
                  <p>{formData.summary || "Write your professional summary here..."}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Skills</h3>
                  <p>{formData.skills || "Mention your skills..."}</p>
                </div>
              </div>
              <h3 className="font-semibold mt-4">Experience</h3>
              <p>{formData.experience || "List your work experience..."}</p>
              <h3 className="font-semibold mt-4">Education</h3>
              <p>{formData.education || "Add your educational background..."}</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
