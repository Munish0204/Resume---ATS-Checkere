import React, { useState } from "react";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";

const ResumeBuilder = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    experience: "",
    skills: "",
    education: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to download resume as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Resume", 10, 10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Name: ${formData.name}`, 10, 20);
    doc.text(`Email: ${formData.email}`, 10, 30);
    doc.text(`Phone: ${formData.phone}`, 10, 40);

    doc.text("Summary:", 10, 50);
    doc.text(formData.summary, 10, 60, { maxWidth: 180 });

    doc.text("Experience:", 10, 80);
    doc.text(formData.experience, 10, 90, { maxWidth: 180 });

    doc.text("Skills:", 10, 110);
    doc.text(formData.skills, 10, 120, { maxWidth: 180 });

    doc.text("Education:", 10, 140);
    doc.text(formData.education, 10, 150, { maxWidth: 180 });

    doc.save("resume.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
        Resume Builder
      </h1>

      {!selectedTemplate ? (
        <div>
          <h2 className="text-2xl text-center font-semibold mb-6">
            Choose a Resume Template
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedTemplate(true)}
              className="cursor-pointer p-4 bg-white shadow-lg rounded-lg text-center"
            >
              <div className="h-40 bg-gray-300 flex items-center justify-center text-xl font-semibold">
                Empty Template
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Resume Form */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Fill in Your Details</h2>
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-2 mb-3 border rounded" />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 mb-3 border rounded" />
            <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full p-2 mb-3 border rounded" />
            <textarea name="summary" placeholder="Professional Summary" onChange={handleChange} className="w-full p-2 mb-3 border rounded"></textarea>
            <textarea name="experience" placeholder="Work Experience" onChange={handleChange} className="w-full p-2 mb-3 border rounded"></textarea>
            <textarea name="skills" placeholder="Skills" onChange={handleChange} className="w-full p-2 mb-3 border rounded"></textarea>
            <textarea name="education" placeholder="Education" onChange={handleChange} className="w-full p-2 mb-3 border rounded"></textarea>
            <button onClick={downloadPDF} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Download PDF
            </button>
          </div>

          {/* Resume Preview */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>
            <div id="resume-preview" className="border p-4 rounded-lg bg-gray-50">
              <p className="text-lg font-bold">{formData.name || "Your Name"}</p>
              <p>{formData.email || "youremail@example.com"}</p>
              <p>{formData.phone || "123-456-7890"}</p>
              <hr className="my-2" />
              <p><strong>Summary:</strong> {formData.summary || "Write your professional summary here..."}</p>
              <p><strong>Experience:</strong> {formData.experience || "List your work experience..."}</p>
              <p><strong>Skills:</strong> {formData.skills || "Mention your skills..."}</p>
              <p><strong>Education:</strong> {formData.education || "Add your educational background..."}</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
