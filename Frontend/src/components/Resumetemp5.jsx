import { useRef, useState } from "react";
import { Trash, Download, PlusCircle, Mail, Phone, Globe, MapPin, Calendar, Award, Briefcase, Book, FileText, Cpu, MessageCircle } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useReactToPrint } from 'react-to-print';

const ResumeTemplate = () => {
  const resumeRef = useRef(null);
  const [editableResume, setEditableResume] = useState({
    name: "Brian T. Wayne",
    title: "Business Development Consultant",
    summary: "I'm Brian Thomas Wayne, a business development consultant with a passion for helping companies achieve their growth potential. With my MBA degree and extensive experience in strategy and relationship building, I strive to provide innovative solutions that drive success for my clients.",
    contact: [
      { type: "email", value: "brian@wayne.com" },
      { type: "phone", value: "+1-54-754-3010" },
      { type: "location", value: "22611 Pacific Coast Hwy, Malibu, California, 9022, USA" },
      { type: "website", value: "wayne.com" },
      { type: "website", value: "linkedin.com/wayne-3245" }
    ],
    education: [
      {
        degree: "Master of Business Administration",
        institution: "Harvard Business School",
        duration: "2016 – 2018 | Boston"
      }
    ],
    experiences: [
      {
        title: "Business Development Consultant",
        company: "Appleseed Inc.",
        duration: "2022 – present | NewYork",
        description: [
          "Developed and implemented strategic plans resulting in a 30% increase in new business opportunities.",
          "Collaborated with cross-functional teams to drive business growth and expansion.",
          "Established and maintained relationships with key partners resulting in a 25% increase in sales revenue.",
          "Conducted market research and analysis to identify new market opportunities resulting in the successful launch of a new product line."
        ]
      },
      {
        title: "Business Development",
        company: "aexus",
        duration: "2018 – 2021 | Los Angeles, USA",
        description: [
          "Worked closely with tech and software companies to provide expert sales outsourcing services",
          "Built and managed dedicated sales teams in Europe, the Americas, and Asia Pacific",
          "Contributed to Aexus Sales Outsourcing's proven track record of success in acting as an extension to the sales force of over 500+ vendors of new and innovative software and tech products, services, and solutions since the year 2000."
        ]
      }
    ],
    skills: [
      "Strategic thinking and problem-solving",
      "Relationship building and networking",
      "Effective communication and negotiation",
      "Sales and business development strategy development and execution",
      "Team management and leadership",
      "Creative and innovative thinking"
    ],
    awards: [
      {
        title: "Outstanding Business Student Award",
        issuer: "University of Southern California",
        date: "2014"
      },
      {
        title: "Dean's List",
        issuer: "University of California, Los Angeles",
        date: "2015-2016"
      }
    ],
    languages: [
      { name: "English", proficiency: "Native" },
      { name: "Spanish", proficiency: "Fluent" }
    ],
    accentColor: "#2563eb"
  });

  // States for editing modes
  const [currentSection, setCurrentSection] = useState("info");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [draftItem, setDraftItem] = useState({});

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

  // Function to handle education changes
  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...editableResume.education];
    updatedEducation[index][field] = value;
    setEditableResume(prev => ({ ...prev, education: updatedEducation }));
  };

  // Function to handle experience changes
  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...editableResume.experiences];
    updatedExperiences[index][field] = value;
    setEditableResume(prev => ({ ...prev, experiences: updatedExperiences }));
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

  // Function to handle language changes
  const handleLanguageChange = (index, field, value) => {
    const updatedLanguages = [...editableResume.languages];
    updatedLanguages[index][field] = value;
    setEditableResume(prev => ({ ...prev, languages: updatedLanguages }));
  };

  // Function to handle color change
  const handleColorChange = (color) => {
    setEditableResume(prev => ({
      ...prev,
      accentColor: color
    }));
  };

  // Function to add a new item to a section
  const addItem = (section) => {
    setIsEditing(true);
    setCurrentSection(section);
    setEditIndex(null);
    
    if (section === "education") {
      setDraftItem({
        degree: "",
        institution: "",
        duration: "",
      });
    } else if (section === "experience") {
      setDraftItem({
        title: "",
        company: "",
        duration: "",
        description: [""]
      });
    } else if (section === "skill") {
      setDraftItem("");
    } else if (section === "award") {
      setDraftItem({
        title: "",
        issuer: "",
        date: ""
      });
    } else if (section === "language") {
      setDraftItem({
        name: "",
        proficiency: ""
      });
    }
  };

  // Function to edit an existing item
  const editItem = (section, index) => {
    setIsEditing(true);
    setCurrentSection(section);
    setEditIndex(index);
    
    if (section === "education") {
      setDraftItem({...editableResume.education[index]});
    } else if (section === "experience") {
      setDraftItem({...editableResume.experiences[index]});
    } else if (section === "skill") {
      setDraftItem(editableResume.skills[index]);
    } else if (section === "award") {
      setDraftItem({...editableResume.awards[index]});
    } else if (section === "language") {
      setDraftItem({...editableResume.languages[index]});
    }
  };

  // Function to save the draft item
  const saveDraftItem = () => {
    if (currentSection === "education") {
      let updatedEducation = [...editableResume.education];
      if (editIndex !== null) {
        updatedEducation[editIndex] = draftItem;
      } else {
        updatedEducation.push(draftItem);
      }
      setEditableResume(prev => ({ ...prev, education: updatedEducation }));
    } else if (currentSection === "experience") {
      let updatedExperiences = [...editableResume.experiences];
      if (editIndex !== null) {
        updatedExperiences[editIndex] = draftItem;
      } else {
        updatedExperiences.push(draftItem);
      }
      setEditableResume(prev => ({ ...prev, experiences: updatedExperiences }));
    } else if (currentSection === "skill") {
      let updatedSkills = [...editableResume.skills];
      if (editIndex !== null) {
        updatedSkills[editIndex] = draftItem;
      } else {
        updatedSkills.push(draftItem);
      }
      setEditableResume(prev => ({ ...prev, skills: updatedSkills }));
    } else if (currentSection === "award") {
      let updatedAwards = [...editableResume.awards];
      if (editIndex !== null) {
        updatedAwards[editIndex] = draftItem;
      } else {
        updatedAwards.push(draftItem);
      }
      setEditableResume(prev => ({ ...prev, awards: updatedAwards }));
    } else if (currentSection === "language") {
      let updatedLanguages = [...editableResume.languages];
      if (editIndex !== null) {
        updatedLanguages[editIndex] = draftItem;
      } else {
        updatedLanguages.push(draftItem);
      }
      setEditableResume(prev => ({ ...prev, languages: updatedLanguages }));
    }
    
    setIsEditing(false);
    setEditIndex(null);
    setDraftItem({});
  };

  // Function to cancel editing
  const cancelEditing = () => {
    setIsEditing(false);
    setEditIndex(null);
    setDraftItem({});
  };

  // Function to remove an item
  const removeItem = (section, index) => {
    if (section === "education") {
      setEditableResume(prev => ({
        ...prev,
        education: prev.education.filter((_, i) => i !== index)
      }));
    } else if (section === "experience") {
      setEditableResume(prev => ({
        ...prev,
        experiences: prev.experiences.filter((_, i) => i !== index)
      }));
    } else if (section === "skill") {
      setEditableResume(prev => ({
        ...prev,
        skills: prev.skills.filter((_, i) => i !== index)
      }));
    } else if (section === "award") {
      setEditableResume(prev => ({
        ...prev,
        awards: prev.awards.filter((_, i) => i !== index)
      }));
    } else if (section === "language") {
      setEditableResume(prev => ({
        ...prev,
        languages: prev.languages.filter((_, i) => i !== index)
      }));
    }
  };

  // Function to handle draft item changes
  const handleDraftChange = (field, value) => {
    setDraftItem(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Function to handle description bullet changes
  const handleDescriptionChange = (index, value) => {
    const updatedDescription = [...draftItem.description];
    updatedDescription[index] = value;
    setDraftItem(prev => ({
      ...prev,
      description: updatedDescription
    }));
  };

  // Function to add a new description bullet
  const addDescriptionBullet = () => {
    setDraftItem(prev => ({
      ...prev,
      description: [...prev.description, ""]
    }));
  };

  // Function to remove a description bullet
  const removeDescriptionBullet = (index) => {
    const updatedDescription = [...draftItem.description];
    updatedDescription.splice(index, 1);
    setDraftItem(prev => ({
      ...prev,
      description: updatedDescription
    }));
  };

  // Function to get icon for contact type
  const getContactIcon = (type) => {
    switch (type) {
      case "email": return <Mail size={16} />;
      case "phone": return <Phone size={16} />;
      case "location": return <MapPin size={16} />;
      case "website": return <Globe size={16} />;
      default: return <MessageCircle size={16} />;
    }
  };

  const handleDownload = async () => {
    const input = resumeRef.current;
    
    if (!input) {
      alert("Resume element not found.");
      return;
    }
  
    // Create a clone of the element to modify styles safely
    const clone = input.cloneNode(true);
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    document.body.appendChild(clone);
  
    try {
      // Replace oklch colors in the clone
      const elements = clone.querySelectorAll('*');
      elements.forEach(el => {
        const styles = window.getComputedStyle(el);
        if (styles.color.includes('oklch')) {
          el.style.color = '#000000'; // Fallback color
        }
        if (styles.backgroundColor.includes('oklch')) {
          el.style.backgroundColor = '#ffffff'; // Fallback color
        }
      });
  
      const canvas = await html2canvas(clone, {
        scale: 2,
        logging: true,
        useCORS: true,
        removeContainer: true
      });
  
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('resume.pdf');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      document.body.removeChild(clone);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
  });

  return (
    <div className="flex flex-row h-screen overflow-hidden bg-gray-100">
      {/* Left Side - Editor (fixed width, scrollable) */}
      <div className="w-1/2 p-4 overflow-y-auto">
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Resume Editor</h2>
          
          {/* Section Navigation */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button 
              onClick={() => setCurrentSection("info")} 
              className={`px-3 py-1 rounded-md ${currentSection === "info" ? "text-white" : "bg-gray-200"}`}
              style={{backgroundColor: currentSection === "info" ? editableResume.accentColor : ""}}
            >
              Basic Info
            </button>
            <button 
              onClick={() => setCurrentSection("education")} 
              className={`px-3 py-1 rounded-md ${currentSection === "education" ? "text-white" : "bg-gray-200"}`}
              style={{backgroundColor: currentSection === "education" ? editableResume.accentColor : ""}}
            >
              Education
            </button>
            <button 
              onClick={() => setCurrentSection("experience")} 
              className={`px-3 py-1 rounded-md ${currentSection === "experience" ? "text-white" : "bg-gray-200"}`}
              style={{backgroundColor: currentSection === "experience" ? editableResume.accentColor : ""}}
            >
              Experience
            </button>
            <button 
              onClick={() => setCurrentSection("skill")} 
              className={`px-3 py-1 rounded-md ${currentSection === "skill" ? "text-white" : "bg-gray-200"}`}
              style={{backgroundColor: currentSection === "skill" ? editableResume.accentColor : ""}}
            >
              Skills
            </button>
            <button 
              onClick={() => setCurrentSection("award")} 
              className={`px-3 py-1 rounded-md ${currentSection === "award" ? "text-white" : "bg-gray-200"}`}
              style={{backgroundColor: currentSection === "award" ? editableResume.accentColor : ""}}
            >
              Awards
            </button>
            <button 
              onClick={() => setCurrentSection("language")} 
              className={`px-3 py-1 rounded-md ${currentSection === "language" ? "text-white" : "bg-gray-200"}`}
              style={{backgroundColor: currentSection === "language" ? editableResume.accentColor : ""}}
            >
              Languages
            </button>
            <button 
              onClick={() => setCurrentSection("color")} 
              className={`px-3 py-1 rounded-md ${currentSection === "color" ? "text-white" : "bg-gray-200"}`}
              style={{backgroundColor: currentSection === "color" ? editableResume.accentColor : ""}}
            >
              Theme
            </button>
          </div>

          {/* Form based on current section */}
          {currentSection === "info" && !isEditing && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editableResume.name}
                  onChange={(e) => handleInfoChange("name", e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Your Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
                <input
                  type="text"
                  value={editableResume.title}
                  onChange={(e) => handleInfoChange("title", e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g. Business Development Consultant"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
                <textarea
                  value={editableResume.summary}
                  onChange={(e) => handleInfoChange("summary", e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Brief professional summary"
                  rows="4"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Information</label>
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
                      placeholder={`Enter your ${contact.type}`}
                    />
                    <button
                      onClick={() => removeItem("contact", index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setEditableResume(prev => ({
                      ...prev,
                      contact: [...prev.contact, { type: "email", value: "" }]
                    }));
                  }}
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  <PlusCircle size={16} /> Add Contact Info
                </button>
              </div>
            </div>
          )}

          {currentSection === "education" && !isEditing && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Education</h3>
                <button
                  onClick={() => addItem("education")}
                  className="flex items-center gap-1 text-sm bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                >
                  <PlusCircle size={16} /> Add
                </button>
              </div>
              
              {editableResume.education.length === 0 ? (
                <div className="text-gray-500 text-center py-6">No education entries yet. Add your educational background.</div>
              ) : (
                <div className="space-y-4">
                  {editableResume.education.map((edu, index) => (
                    <div key={index} className="p-4 border rounded-md bg-gray-50">
                      <div className="flex justify-between">
                        <h4 className="font-semibold">{edu.degree}</h4>
                        <div className="flex gap-2">
                          <button
                            onClick={() => editItem("education", index)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => removeItem("education", index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{edu.institution}</p>
                      <p className="text-sm text-gray-500">{edu.duration}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentSection === "experience" && !isEditing && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Experience</h3>
                <button
                  onClick={() => addItem("experience")}
                  className="flex items-center gap-1 text-sm bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                >
                  <PlusCircle size={16} /> Add
                </button>
              </div>
              
              {editableResume.experiences.length === 0 ? (
                <div className="text-gray-500 text-center py-6">No experience entries yet. Add your work history.</div>
              ) : (
                <div className="space-y-4">
                  {editableResume.experiences.map((exp, index) => (
                    <div key={index} className="p-4 border rounded-md bg-gray-50">
                      <div className="flex justify-between">
                        <h4 className="font-semibold">{exp.title}</h4>
                        <div className="flex gap-2">
                          <button
                            onClick={() => editItem("experience", index)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => removeItem("experience", index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.duration}</p>
                      <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                        {exp.description.map((desc, i) => (
                          <li key={i}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentSection === "skill" && !isEditing && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Skills</h3>
                <button
                  onClick={() => addItem("skill")}
                  className="flex items-center gap-1 text-sm bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                >
                  <PlusCircle size={16} /> Add
                </button>
              </div>
              
              {editableResume.skills.length === 0 ? (
                <div className="text-gray-500 text-center py-6">No skills added yet. Add your professional skills.</div>
              ) : (
                <div className="space-y-4">
                  {editableResume.skills.map((skill, index) => (
                    <div key={index} className="p-4 border rounded-md bg-gray-50">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">{skill}</h4>
                        <div className="flex gap-2">
                          <button
                            onClick={() => editItem("skill", index)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => removeItem("skill", index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentSection === "award" && !isEditing && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Awards</h3>
                <button
                  onClick={() => addItem("award")}
                  className="flex items-center gap-1 text-sm bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                >
                  <PlusCircle size={16} /> Add
                </button>
              </div>
              
              {editableResume.awards.length === 0 ? (
                <div className="text-gray-500 text-center py-6">No awards added yet. Add your achievements and honors.</div>
              ) : (
                <div className="space-y-4">
                  {editableResume.awards.map((award, index) => (
                    <div key={index} className="p-4 border rounded-md bg-gray-50">
                      <div className="flex justify-between">
                        <h4 className="font-semibold">{award.title}</h4>
                        <div className="flex gap-2">
                          <button
                            onClick={() => editItem("award", index)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => removeItem("award", index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">Issuer: {award.issuer}</p>
                      <p className="text-sm text-gray-500">Date: {award.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentSection === "language" && !isEditing && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Languages</h3>
                <button
                  onClick={() => addItem("language")}
                  className="flex items-center gap-1 text-sm bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                >
                  <PlusCircle size={16} /> Add
                </button>
              </div>
              
              {editableResume.languages.length === 0 ? (
                <div className="text-gray-500 text-center py-6">No languages added yet. Add languages you speak.</div>
              ) : (
                <div className="space-y-4">
                  {editableResume.languages.map((language, index) => (
                    <div key={index} className="p-4 border rounded-md bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold">{language.name}</h4>
                          <p className="text-sm text-gray-600">Proficiency: {language.proficiency}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => editItem("language", index)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => removeItem("language", index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentSection === "color" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Resume Theme</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
                  <div className="flex flex-wrap gap-2">
                    {['#0f52ba', '#2563eb', '#3b82f6', '#7c3aed', '#8b5cf6', '#db2777', '#e11d48', '#dc2626', '#ea580c', '#d97706', '#059669', '#10b981'].map(color => (
                      <button
                        key={color}
                        onClick={() => handleColorChange(color)}
                        className={`w-8 h-8 rounded-full ${editableResume.accentColor === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="mt-2">
                    <input
                      type="color"
                      value={editableResume.accentColor}
                      onChange={(e) => handleColorChange(e.target.value)}
                      className="w-full h-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Edit forms for different sections */}
          {(isEditing && currentSection === "education") && (
            <div className="space-y-4 mt-4">
              <h3 className="text-lg font-semibold">{editIndex !== null ? "Edit Education" : "Add Education"}</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                <input
                  type="text"
                  value={draftItem.degree || ""}
                  onChange={(e) => handleDraftChange("degree", e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g. Master of Business Administration"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                <input
                  type="text"
                  value={draftItem.institution || ""}
                  onChange={(e) => handleDraftChange("institution", e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g. Harvard Business School"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={draftItem.duration || ""}
                  onChange={(e) => handleDraftChange("duration", e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g. 2016 – 2018 | Boston"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={cancelEditing}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={saveDraftItem}
                  className="px-4 py-2 text-white rounded-md"
                  style={{backgroundColor: editableResume.accentColor}}
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {(isEditing && currentSection === "experience") && (
            <div className="space-y-4 mt-4">
              <h3 className="text-lg font-semibold">{editIndex !== null ? "Edit Experience" : "Add Experience"}</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  value={draftItem.title || ""}
                  onChange={(e) => handleDraftChange("title", e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g. Business Development Consultant"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  value={draftItem.company || ""}
                  onChange={(e) => handleDraftChange("company", e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g. Appleseed Inc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={draftItem.duration || ""}
                  onChange={(e) => handleDraftChange("duration", e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g. 2022 – present | NewYork"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <div className="space-y-2">
                  {draftItem.description?.map((desc, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-gray-500">•</span>
                      <input
                        type="text"
                        value={desc}
                        onChange={(e) => handleDescriptionChange(index, e.target.value)}
                        className="flex-1 p-2 border rounded-md"
                        placeholder="Description bullet point"
                      />
                      <button
                        onClick={() => removeDescriptionBullet(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addDescriptionBullet}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mt-2"
                  >
                    <PlusCircle size={16} /> Add Bullet Point
                  </button>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={cancelEditing}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={saveDraftItem}
                  className="px-4 py-2 text-white rounded-md"
                  style={{backgroundColor: editableResume.accentColor}}
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {(isEditing && currentSection === "skill") && (
            <div className="space-y-4 mt-4">
              <h3 className="text-lg font-semibold">{editIndex !== null ? "Edit Skill" : "Add Skill"}</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
                <input
                  type="text"
                  value={draftItem || ""}
                  onChange={(e) => setDraftItem(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g. Strategic thinking and problem-solving"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={cancelEditing}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={saveDraftItem}
                  className="px-4 py-2 text-white rounded-md"
                  style={{backgroundColor: editableResume.accentColor}}
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {(isEditing && currentSection === "award") && (
            <div className="space-y-4 mt-4">
              <h3 className="text-lg font-semibold">{editIndex !== null ? "Edit Award" : "Add Award"}</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Award Title</label>
                <input
                  type="text"
                  value={draftItem.title || ""}
                  onChange={(e) => handleDraftChange("title", e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g. Outstanding Business Student Award"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issuer</label>
                <input
                  type="text"
                  value={draftItem.issuer || ""}
                  onChange={(e) => handleDraftChange("issuer", e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g. University of Southern California"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="text"
                  value={draftItem.date || ""}
                  onChange={(e) => handleDraftChange("date", e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g. 2014"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={cancelEditing}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={saveDraftItem}
                  className="px-4 py-2 text-white rounded-md"
                  style={{backgroundColor: editableResume.accentColor}}
                >
                  Save
                </button>
              </div>
            </div>
          )}
    {(isEditing && currentSection === "language") && (
  <div className="space-y-4 mt-4">
    <h3 className="text-lg font-semibold">{editIndex !== null ? "Edit Language" : "Add Language"}</h3>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
      <input
        type="text"
        value={draftItem.name || ""}
        onChange={(e) => handleDraftChange("name", e.target.value)}
        className="w-full p-2 border rounded-md"
        placeholder="e.g. Spanish"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Proficiency</label>
      <select
        value={draftItem.proficiency || ""}
        onChange={(e) => handleDraftChange("proficiency", e.target.value)}
        className="w-full p-2 border rounded-md"
      >
        <option value="">Select proficiency</option>
        <option value="Native">Native</option>
        <option value="Fluent">Fluent</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Basic">Basic</option>
      </select>
    </div>
    <div className="flex justify-end gap-2">
      <button
        onClick={cancelEditing}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
      >
        Cancel
      </button>
      <button
        onClick={saveDraftItem}
        className="px-4 py-2 text-white rounded-md"
        style={{backgroundColor: editableResume.accentColor}}
      >
        Save
      </button>
    </div>
  </div>
)}

{/* Download Button */}
<div className="mt-8">
<button
  onClick={handleDownload}
  className="download-button w-full flex items-center justify-center gap-2 py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
>
  <Download size={18} />
  Download Resume
</button>
</div>
</div>
</div>

{/* Right Side - Resume Preview (fixed width, scrollable) */}
<div className="w-1/2 p-4 overflow-y-auto bg-gray-50">
  <div 
    ref={resumeRef} 
    className="bg-white shadow-lg rounded-lg overflow-hidden"
    style={{ maxWidth: '800px', margin: '0 auto' }}
  >
    {/* Resume Header */}
    <div 
      className="p-8"
      style={{ backgroundColor: editableResume.accentColor }}
    >
      <h1 className="text-3xl font-bold text-white">{editableResume.name}</h1>
      <p className="text-xl text-white opacity-90">{editableResume.title}</p>
    </div>

    {/* Resume Content */}
    <div className="p-8">
      {/* Contact Information */}
      <div className="flex flex-wrap gap-4 mb-6">
        {editableResume.contact.map((contact, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span style={{ color: editableResume.accentColor }}>
              {getContactIcon(contact.type)}
            </span>
            <span>{contact.value}</span>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2" style={{ color: editableResume.accentColor }}>
          Professional Summary
        </h2>
        <p className="text-gray-700">{editableResume.summary}</p>
      </div>

      {/* Education */}
      {editableResume.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: editableResume.accentColor }}>
            Education
          </h2>
          {editableResume.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-bold">{edu.degree}</h3>
                <span className="text-gray-500">{edu.duration.split('|')[0].trim()}</span>
              </div>
              <p className="text-gray-600">{edu.institution}</p>
              <p className="text-gray-500 text-sm">{edu.duration.split('|')[1]?.trim()}</p>
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {editableResume.experiences.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: editableResume.accentColor }}>
            Professional Experience
          </h2>
          {editableResume.experiences.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between">
                <h3 className="font-bold">{exp.title}</h3>
                <span className="text-gray-500">{exp.duration.split('|')[0].trim()}</span>
              </div>
              <p className="text-gray-600">{exp.company}</p>
              <p className="text-gray-500 text-sm mb-2">{exp.duration.split('|')[1]?.trim()}</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {editableResume.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: editableResume.accentColor }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {editableResume.skills.map((skill, index) => (
              <span 
                key={index} 
                className="px-3 py-1 rounded-full text-sm"
                style={{ 
                  backgroundColor: `${editableResume.accentColor}20`,
                  color: editableResume.accentColor
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Awards */}
      {editableResume.awards.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: editableResume.accentColor }}>
            Awards & Honors
          </h2>
          {editableResume.awards.map((award, index) => (
            <div key={index} className="mb-3">
              <h3 className="font-bold">{award.title}</h3>
              <p className="text-gray-600">{award.issuer}</p>
              <p className="text-gray-500 text-sm">{award.date}</p>
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {editableResume.languages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: editableResume.accentColor }}>
            Languages
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {editableResume.languages.map((language, index) => (
              <div key={index}>
                <h3 className="font-medium">{language.name}</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full" 
                    style={{ 
                      backgroundColor: editableResume.accentColor,
                      width: language.proficiency === "Native" ? "100%" : 
                             language.proficiency === "Fluent" ? "80%" :
                             language.proficiency === "Intermediate" ? "60%" : "40%"
                    }}
                  ></div>
                </div>
                <p className="text-gray-500 text-sm mt-1">{language.proficiency}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
</div>
</div>
);
};

export default ResumeTemplate;
         