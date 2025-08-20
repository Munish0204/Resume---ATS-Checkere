import { useRef, useState } from "react";
import { Trash, Download, PlusCircle, Mail, Phone, Globe, MapPin, Calendar, Award, Briefcase, Book, FileText, Cpu, MessageCircle } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useReactToPrint } from 'react-to-print';


export default function ProfessionalResume() {
  const resumeRef = useRef(null);
  const [editableResume, setEditableResume] = useState({
    name: "Andrew O'Sullivan",
    title: "Product Manager",
    summary: "Experienced Product Manager with a proven track record in the development and management of products throughout their lifecycle. Passionate, creative, and results-oriented. Skilled in team leadership and collaboration with cross-functional teams. Excellent communication skills and strategic thinking. Enthusiastic about designing innovative solutions that enhance customer satisfaction.",
    contact: [
      { type: "email", value: "andrew.osullivan@example.com" },
      { type: "phone", value: "+1 (555) 123-4567" },
      { type: "location", value: "New York, NY" },
      { type: "website", value: "andrewosullivan.com" }
    ],
    experiences: [
      {
        title: "Product Manager",
        company: "Technic GmbH",
        duration: "2018 - Present",
        bullets: [
          "Led a cross-functional team of 10 people in the development of a new product line, resulting in a 20% increase in revenue",
          "Conducted market analysis and competitive studies to identify new product opportunities and expand the product portfolio",
          "Successfully launched two new products in the market, leading to a 15% increase in market share"
        ]
      },
      {
        title: "Product Specialist",
        company: "The Tech GmbH",
        duration: "2015 - 2018",
        bullets: [
          "Developed and implemented a product strategy for the European market, resulting in a 25% revenue growth",
          "Conducted training sessions and presentations for customers and sales teams to enhance product knowledge",
          "Analyzed customer feedback and derived product improvements"
        ]
      }
    ],
    education: [
      {
        degree: "Master of Business Administration (MBA)",
        institution: "",
        duration: "08/2013 - 07/2015"
      },
      {
        degree: "Bachelor of Engineering in Information Technology",
        institution: "",
        duration: ""
      }
    ],
    skills: [
      "Project management and team leadership",
      "Customer needs analysis and market research",
      "Agile methods and Scrum",
      "Data analysis"
    ],
    awards: [
      {
        title: "Product Manager of the Year",
        issuer: "The Tech GmbH",
        date: "2022"
      }
    ]
  });

  // Function to handle basic info changes
  const handleInfoChange = (field, value) => {
    setEditableResume(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Function to handle contact changes
  const handleContactChange = (index, field, value) => {
    const updatedContacts = [...editableResume.contact];
    updatedContacts[index][field] = value;
    setEditableResume(prev => ({ ...prev, contact: updatedContacts }));
  };

  // Function to handle experience changes
  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...editableResume.experiences];
    updatedExperiences[index][field] = value;
    setEditableResume(prev => ({ ...prev, experiences: updatedExperiences }));
  };

  // Function to handle education changes
  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...editableResume.education];
    updatedEducation[index][field] = value;
    setEditableResume(prev => ({ ...prev, education: updatedEducation }));
  };

  // Function to handle skill changes
  const handleSkillChange = (index, value) => {
    const updatedSkills = [...editableResume.skills];
    updatedSkills[index] = value;
    setEditableResume(prev => ({ ...prev, skills: updatedSkills }));
  };

  // Function to handle award changes
  const handleAwardChange = (index, field, value) => {
    const updatedAwards = [...editableResume.awards];
    updatedAwards[index][field] = value;
    setEditableResume(prev => ({ ...prev, awards: updatedAwards }));
  };

  // Function to get icon for contact type
  const getContactIcon = (type) => {
    switch (type) {
      case "email": return <Mail size={16} />;
      case "phone": return <Phone size={16} />;
      case "location": return <MapPin size={16} />;
      case "website": return <Globe size={16} />;
      default: return null;
    }
  };

  const handleDownload = async () => {
    const input = resumeRef.current;
    
    if (!input) {
      alert("Resume element not found.");
      return;
    }
  
    // Color conversion function
    const rgbToHex = (colorStr) => {
      if (!colorStr || colorStr === 'transparent' || colorStr === 'rgba(0, 0, 0, 0)') {
        return 'transparent';
      }
      if (colorStr.startsWith('#') || /^[a-zA-Z]+$/.test(colorStr)) {
        return colorStr;
      }
      if (colorStr.startsWith('rgb')) {
        const rgbValues = colorStr.match(/\d+/g);
        if (!rgbValues || rgbValues.length < 3) return '#000000';
        return `#${parseInt(rgbValues[0]).toString(16).padStart(2, '0')}${parseInt(rgbValues[1]).toString(16).padStart(2, '0')}${parseInt(rgbValues[2]).toString(16).padStart(2, '0')}`;
      }
      return '#000000';
    };
  
    // Create a clone of the element
    const clone = input.cloneNode(true);
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.width = '210mm'; // A4 width
    document.body.appendChild(clone);
  
    try {
      // Process colors
      const allElements = clone.querySelectorAll('*');
      allElements.forEach(el => {
        const computedStyle = window.getComputedStyle(el);
        ['color', 'backgroundColor', 'borderColor'].forEach(prop => {
          const value = computedStyle[prop];
          if (value && value.includes('oklch')) {
            el.style[prop] = '#000000';
          } else if (value) {
            el.style[prop] = rgbToHex(value);
          }
        });
      });
  
      // Generate canvas - limit height to single A4 page
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 794, // 210mm in pixels
        height: Math.min(clone.scrollHeight * (794 / clone.offsetWidth), 1123), // Max 297mm in pixels
        windowWidth: clone.scrollWidth,
        windowHeight: clone.scrollHeight
      });
  
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      // Add image to PDF (single page only)
      pdf.addImage(canvas, 'PNG', 0, 0, imgWidth, imgHeight);
      
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      if (document.body.contains(clone)) {
        document.body.removeChild(clone);
      }
    }
  };
  return (
    <div className="flex flex-row gap-6 w-full bg-gray-100 p-4 h-screen">
      {/* Left Side - Editor */}
      <div className="w-1/2 bg-white shadow-md rounded-xl p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Resume Editor</h2>
        
        {/* Basic Info */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Basic Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={editableResume.name}
                onChange={(e) => handleInfoChange("name", e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
              <input
                type="text"
                value={editableResume.title}
                onChange={(e) => handleInfoChange("title", e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
              <textarea
                value={editableResume.summary}
                onChange={(e) => handleInfoChange("summary", e.target.value)}
                className="w-full p-2 border rounded-md"
                rows="5"
              />
            </div>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Contact Information</h3>
          {editableResume.contact.map((contact, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <select
                value={contact.type}
                onChange={(e) => handleContactChange(index, "type", e.target.value)}
                className="p-2 border rounded-md"
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="location">Location</option>
                <option value="website">Website</option>
              </select>
              <input
                type="text"
                value={contact.value}
                onChange={(e) => handleContactChange(index, "value", e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
          ))}
        </div>
        
        {/* Professional Experience */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Professional Experience</h3>
          {editableResume.experiences.map((exp, index) => (
            <div key={index} className="mb-6 p-4 border rounded-md bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => handleExperienceChange(index, "title", e.target.value)}
                    className="font-semibold text-lg mb-1 p-1 border rounded"
                  />
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                    className="text-gray-600 mb-1 p-1 border rounded"
                  />
                </div>
                <input
                  type="text"
                  value={exp.duration}
                  onChange={(e) => handleExperienceChange(index, "duration", e.target.value)}
                  className="text-gray-500 text-sm p-1 border rounded"
                />
              </div>
              <div className="mt-2">
                {exp.bullets.map((bullet, bulletIndex) => (
                  <div key={bulletIndex} className="flex items-start mb-1">
                    <span className="mr-2">•</span>
                    <input
                      type="text"
                      value={bullet}
                      onChange={(e) => {
                        const updatedExperiences = [...editableResume.experiences];
                        updatedExperiences[index].bullets[bulletIndex] = e.target.value;
                        setEditableResume(prev => ({ ...prev, experiences: updatedExperiences }));
                      }}
                      className="w-full p-1 border rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Education */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Education</h3>
          {editableResume.education.map((edu, index) => (
            <div key={index} className="mb-4 p-4 border rounded-md bg-gray-50">
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                className="font-semibold text-lg mb-1 p-1 border rounded w-full"
              />
              <div className="flex justify-between">
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                  className="text-gray-600 mb-1 p-1 border rounded"
                />
                <input
                  type="text"
                  value={edu.duration}
                  onChange={(e) => handleEducationChange(index, "duration", e.target.value)}
                  className="text-gray-500 text-sm p-1 border rounded"
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Skills */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Skills</h3>
          <div className="p-4 border rounded-md bg-gray-50">
            {editableResume.skills.map((skill, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Awards */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Awards</h3>
          {editableResume.awards.map((award, index) => (
            <div key={index} className="mb-4 p-4 border rounded-md bg-gray-50">
              <input
                type="text"
                value={award.title}
                onChange={(e) => handleAwardChange(index, "title", e.target.value)}
                className="font-semibold text-lg mb-1 p-1 border rounded w-full"
              />
              <div className="flex justify-between">
                <input
                  type="text"
                  value={award.issuer}
                  onChange={(e) => handleAwardChange(index, "issuer", e.target.value)}
                  className="text-gray-600 mb-1 p-1 border rounded"
                />
                <input
                  type="text"
                  value={award.date}
                  onChange={(e) => handleAwardChange(index, "date", e.target.value)}
                  className="text-gray-500 text-sm p-1 border rounded"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Right Side - Resume Preview */}
      <div className="w-1/2 bg-white shadow-lg rounded-xl overflow-hidden overflow-y-auto relative">
        {/* Download Button */}
        <div className="absolute top-4 right-4 flex space-x-2">
        <button
  onClick={handleDownload}
  className="download-button w-full flex items-center justify-center gap-2 py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
>
  <Download size={18} />
  Download Resume
</button>
        </div>
        
        <div className="p-8" ref={resumeRef}>
          {/* Header with name and title */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-1">{editableResume.name}</h1>
            <h2 className="text-xl text-gray-600">{editableResume.title}</h2>
          </div>
          
          {/* Contact Information */}
          <div className="flex flex-wrap gap-4 mb-6">
            {editableResume.contact.map((contact, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">
                  {getContactIcon(contact.type)}
                </span>
                <span>{contact.value}</span>
              </div>
            ))}
          </div>
          
          {/* Summary */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2 pb-1 border-b border-gray-300">PROFESSIONAL SUMMARY</h3>
            <p className="text-gray-700 text-sm">{editableResume.summary}</p>
          </div>
          
          {/* Experience */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 pb-1 border-b border-gray-300">PROFESSIONAL EXPERIENCE</h3>
            <div className="space-y-6">
              {editableResume.experiences.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-semibold">{exp.title}</h4>
                      <p className="text-gray-600 text-sm">{exp.company}</p>
                    </div>
                    <p className="text-gray-500 text-sm">{exp.duration}</p>
                  </div>
                  <ul className="mt-2 pl-5 space-y-1">
                    {exp.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="text-sm text-gray-700">{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          {/* Education */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 pb-1 border-b border-gray-300">EDUCATION</h3>
            <div className="space-y-4">
              {editableResume.education.map((edu, index) => (
                <div key={index}>
                  <h4 className="font-semibold">{edu.degree}</h4>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{edu.institution}</span>
                    <span>{edu.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Skills */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 pb-1 border-b border-gray-300">SKILLS</h3>
            <div className="grid grid-cols-2 gap-2">
              {editableResume.skills.map((skill, index) => (
                <div key={index} className="text-sm text-gray-700">
                  • {skill}
                </div>
              ))}
            </div>
          </div>
          
          {/* Awards */}
          {editableResume.awards.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 pb-1 border-b border-gray-300">AWARDS</h3>
              <div className="space-y-3">
                {editableResume.awards.map((award, index) => (
                  <div key={index}>
                    <h4 className="font-semibold">{award.title}</h4>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{award.issuer}</span>
                      <span>{award.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}