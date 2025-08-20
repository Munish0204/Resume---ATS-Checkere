import { useRef, useState } from "react";
import { Download, PlusCircle, Trash } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeEditor = () => {
  const resumeRef = useRef(null);
  const [editableResume, setEditableResume] = useState({
    name: "",
    photo: "",
    contact: [],
    title: "",
    summary: "",
    education: "",
    experiences: [],
    skills: [],
    languages: [],
    certificates: [],
    projects: [],
    courses: [],
    awards: [],
    publications: [],
    references: [],
    declaration: "",
  });

  // Preview placeholder content
  const placeholders = {
    name: "John Smith",
    title: "Software Developer",
    summary: "Dedicated and efficient software developer with 5+ years of experience in application development. Proficient in JavaScript, React, and Node.js. Strong background in creating responsive and user-friendly web applications. Excellent problem-solving skills and ability to work in fast-paced environments.",
    education: "Bachelor of Science in Computer Science\nStanford University\n2015-2019\n\nHigh School Diploma\nLincoln High School\n2011-2015",
    contact: [
      { type: "email", value: "johnsmith@email.com" },
      { type: "phone", value: "+1 (555) 123-4567" },
      { type: "linkedin", value: "linkedin.com/in/johnsmith" }
    ],
    experiences: [
      {
        title: "Senior Software Developer",
        company: "Tech Solutions Inc.",
        duration: "Jan 2021 - Present",
        description: "Lead development of multiple web applications using React and Node.js. Implemented CI/CD pipelines and improved code quality standards."
      },
      {
        title: "Software Developer",
        company: "Digital Innovations",
        duration: "Jun 2019 - Dec 2020",
        description: "Developed and maintained e-commerce platforms. Collaborated with UX designers to implement responsive interfaces."
      }
    ],
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "HTML/CSS", "Git", "Docker"],
    languages: ["English (Native)", "Spanish (Intermediate)", "French (Basic)"],
    certificates: [
      {
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "2022"
      },
      {
        name: "React Certified Developer",
        issuer: "Meta",
        date: "2021"
      }
    ],
    projects: [
      {
        title: "E-commerce Platform",
        duration: "2022",
        description: "Built a fully functional e-commerce platform with React, Node.js, and MongoDB. Implemented payment processing and inventory management."
      },
      {
        title: "Task Management App",
        duration: "2021",
        description: "Developed a task management application with drag-and-drop functionality using React and Firebase."
      }
    ],
    courses: [
      {
        name: "Advanced React Patterns",
        institution: "Frontend Masters",
        date: "2023"
      },
      {
        name: "Node.js Microservices",
        institution: "Udemy",
        date: "2022"
      }
    ],
    awards: [
      {
        title: "Developer of the Year",
        issuer: "Tech Solutions Inc.",
        date: "2022"
      },
      {
        title: "Hackathon Winner",
        issuer: "CodeFest",
        date: "2021"
      }
    ],
    publications: [
      {
        title: "Modern React Development Techniques",
        publisher: "Dev.to",
        date: "2023"
      },
      {
        title: "Optimizing Node.js Applications",
        publisher: "Medium",
        date: "2022"
      }
    ],
    references: [
      {
        name: "Jane Wilson",
        contact: "jane.wilson@techsolutions.com",
        relationship: "Manager at Tech Solutions Inc."
      },
      {
        name: "Robert Johnson",
        contact: "robert.j@digitalinnovations.com",
        relationship: "Lead Developer at Digital Innovations"
      }
    ],
    declaration: "I hereby declare that all the information provided in this resume is true and correct to the best of my knowledge and belief."
  };

  // States for editing modes and drafts
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [draftExperience, setDraftExperience] = useState({
    title: "",
    company: "",
    duration: "",
    description: "",
  });

  const [isEditingSkill, setIsEditingSkill] = useState(false);
  const [draftSkill, setDraftSkill] = useState("");

  const [isEditingLanguage, setIsEditingLanguage] = useState(false);
  const [draftLanguage, setDraftLanguage] = useState("");

  const [isEditingCertificate, setIsEditingCertificate] = useState(false);
  const [draftCertificate, setDraftCertificate] = useState({
    name: "",
    issuer: "",
    date: "",
  });

  const [isEditingProject, setIsEditingProject] = useState(false);
  const [draftProject, setDraftProject] = useState({
    title: "",
    description: "",
    duration: "",
  });

  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [draftCourse, setDraftCourse] = useState({
    name: "",
    institution: "",
    date: "",
  });

  const [isEditingAward, setIsEditingAward] = useState(false);
  const [draftAward, setDraftAward] = useState({
    title: "",
    issuer: "",
    date: "",
  });

  const [isEditingPublication, setIsEditingPublication] = useState(false);
  const [draftPublication, setDraftPublication] = useState({
    title: "",
    publisher: "",
    date: "",
  });

  const [isEditingReference, setIsEditingReference] = useState(false);
  const [draftReference, setDraftReference] = useState({
    name: "",
    contact: "",
    relationship: "",
  });

  // States for visibility
  const [showProfile, setShowProfile] = useState(true);
  const [showEducation, setShowEducation] = useState(true);

  // General handler for editing fields
  const handleEditChange = (field, value) => {
    setEditableResume((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Contact Functions
  const addContact = () => {
    setEditableResume((prev) => ({
      ...prev,
      contact: [...prev.contact, { type: "", value: "" }],
    }));
  };

  const handleContactChange = (index, field, value) => {
    const updatedContacts = [...editableResume.contact];
    updatedContacts[index][field] = value;
    setEditableResume((prev) => ({ ...prev, contact: updatedContacts }));
  };

  const removeContact = (index) => {
    setEditableResume((prev) => ({
      ...prev,
      contact: prev.contact.filter((_, i) => i !== index),
    }));
  };

  // Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditableResume((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Experience Functions
  const addExperience = () => {
    setIsEditingExperience(true);
    setDraftExperience({
      title: "",
      company: "",
      duration: "",
      description: "",
    });
  };

  const handleDraftExperienceChange = (field, value) => {
    setDraftExperience((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveDraftExperience = () => {
    setEditableResume((prev) => ({
      ...prev,
      experiences: [...prev.experiences, draftExperience],
    }));
    setIsEditingExperience(false);
  };

  const cancelDraftExperience = () => {
    setIsEditingExperience(false);
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...editableResume.experiences];
    updatedExperiences[index][field] = value;
    setEditableResume((prev) => ({ ...prev, experiences: updatedExperiences }));
  };

  const removeExperience = (index) => {
    setEditableResume((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));
  };

  // Skills Functions
  const addSkill = () => {
    setIsEditingSkill(true);
    setDraftSkill("");
  };

  const handleDraftSkillChange = (value) => {
    setDraftSkill(value);
  };

  const saveDraftSkill = () => {
    if (draftSkill.trim() !== "") {
      setEditableResume((prev) => ({
        ...prev,
        skills: [...prev.skills, draftSkill],
      }));
      setIsEditingSkill(false);
      setDraftSkill("");
    }
  };

  const cancelDraftSkill = () => {
    setIsEditingSkill(false);
    setDraftSkill("");
  };

  const removeSkill = (index) => {
    setEditableResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  // Language Functions
  const addLanguage = () => {
    setIsEditingLanguage(true);
    setDraftLanguage("");
  };

  const handleDraftLanguageChange = (value) => {
    setDraftLanguage(value);
  };

  const saveDraftLanguage = () => {
    if (draftLanguage.trim() !== "") {
      setEditableResume((prev) => ({
        ...prev,
        languages: [...prev.languages, draftLanguage],
      }));
      setIsEditingLanguage(false);
      setDraftLanguage("");
    }
  };

  const cancelDraftLanguage = () => {
    setIsEditingLanguage(false);
    setDraftLanguage("");
  };

  const removeLanguage = (index) => {
    setEditableResume((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index),
    }));
  };

  // Certificate Functions
  const addCertificate = () => {
    setIsEditingCertificate(true);
    setDraftCertificate({
      name: "",
      issuer: "",
      date: "",
    });
  };

  const handleDraftCertificateChange = (field, value) => {
    setDraftCertificate((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveDraftCertificate = () => {
    setEditableResume((prev) => ({
      ...prev,
      certificates: [...prev.certificates, draftCertificate],
    }));
    setIsEditingCertificate(false);
  };

  const cancelDraftCertificate = () => {
    setIsEditingCertificate(false);
  };

  const removeCertificate = (index) => {
    setEditableResume((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index),
    }));
  };

  // Project Functions
  const addProject = () => {
    setIsEditingProject(true);
    setDraftProject({
      title: "",
      description: "",
      duration: "",
    });
  };

  const handleDraftProjectChange = (field, value) => {
    setDraftProject((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveDraftProject = () => {
    setEditableResume((prev) => ({
      ...prev,
      projects: [...prev.projects, draftProject],
    }));
    setIsEditingProject(false);
  };

  const cancelDraftProject = () => {
    setIsEditingProject(false);
  };

  const removeProject = (index) => {
    setEditableResume((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  // Course Functions
  const addCourse = () => {
    setIsEditingCourse(true);
    setDraftCourse({
      name: "",
      institution: "",
      date: "",
    });
  };

  const handleDraftCourseChange = (field, value) => {
    setDraftCourse((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveDraftCourse = () => {
    setEditableResume((prev) => ({
      ...prev,
      courses: [...prev.courses, draftCourse],
    }));
    setIsEditingCourse(false);
  };

  const cancelDraftCourse = () => {
    setIsEditingCourse(false);
  };

  const removeCourse = (index) => {
    setEditableResume((prev) => ({
      ...prev,
      courses: prev.courses.filter((_, i) => i !== index),
    }));
  };

  // Award Functions
  const addAward = () => {
    setIsEditingAward(true);
    setDraftAward({
      title: "",
      issuer: "",
      date: "",
    });
  };

  const handleDraftAwardChange = (field, value) => {
    setDraftAward((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveDraftAward = () => {
    setEditableResume((prev) => ({
      ...prev,
      awards: [...prev.awards, draftAward],
    }));
    setIsEditingAward(false);
  };

  const cancelDraftAward = () => {
    setIsEditingAward(false);
  };

  const removeAward = (index) => {
    setEditableResume((prev) => ({
      ...prev,
      awards: prev.awards.filter((_, i) => i !== index),
    }));
  };

  // Publication Functions
  const addPublication = () => {
    setIsEditingPublication(true);
    setDraftPublication({
      title: "",
      publisher: "",
      date: "",
    });
  };

  const handleDraftPublicationChange = (field, value) => {
    setDraftPublication((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveDraftPublication = () => {
    setEditableResume((prev) => ({
      ...prev,
      publications: [...prev.publications, draftPublication],
    }));
    setIsEditingPublication(false);
  };

  const cancelDraftPublication = () => {
    setIsEditingPublication(false);
  };

  const removePublication = (index) => {
    setEditableResume((prev) => ({
      ...prev,
      publications: prev.publications.filter((_, i) => i !== index),
    }));
  };

  // Reference Functions
  const addReference = () => {
    setIsEditingReference(true);
    setDraftReference({
      name: "",
      contact: "",
      relationship: "",
    });
  };

  const handleDraftReferenceChange = (field, value) => {
    setDraftReference((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveDraftReference = () => {
    setEditableResume((prev) => ({
      ...prev,
      references: [...prev.references, draftReference],
    }));
    setIsEditingReference(false);
  };

  const cancelDraftReference = () => {
    setIsEditingReference(false);
  };

  const removeReference = (index) => {
    setEditableResume((prev) => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index),
    }));
  };

  // Declaration Functions
  const handleDeclarationChange = (e) => {
    setEditableResume((prev) => ({
      ...prev,
      declaration: e.target.value,
    }));
  };

  // Download PDF
  const handleDownload = async () => {
    const input = resumeRef.current;
  
    if (!input) {
      alert("Resume element not found.");
      return;
    }
  
    // Create a clean print clone
    const clone = input.cloneNode(true);
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.width = '794px'; // Approx. A4 width at 96 DPI
    clone.style.fontFamily = 'Arial, sans-serif';
    clone.style.color = '#000000';
    clone.style.backgroundColor = '#ffffff';
    clone.style.padding = '20px';
    document.body.appendChild(clone);
  
    try {
      // Clean up styles
      const allElements = clone.querySelectorAll('*');
      allElements.forEach(el => {
        el.style.color = '#000000';
        el.style.backgroundColor = 'transparent';
        el.style.boxShadow = 'none';
        el.style.textShadow = 'none';
        el.style.filter = 'none';
        el.style.borderColor = '#000000';
        el.style.overflow = 'visible';
      });
  
      const canvas = await html2canvas(clone, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: '#ffffff',
      });
  
      const imgHeight = canvas.height;
      const imgWidth = canvas.width;
  
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageHeight = 297;
      const pageWidth = 210;
      const margin = 10;
      const scale = pageWidth / imgWidth;
      const sliceHeight = (pageHeight - 2 * margin) / scale;
  
      let position = 0;
      let pageIndex = 0;
  
      while (position < imgHeight) {
        const sliceCanvas = document.createElement('canvas');
        sliceCanvas.width = imgWidth;
        sliceCanvas.height = Math.min(sliceHeight, imgHeight - position);
  
        const ctx = sliceCanvas.getContext('2d');
        ctx.drawImage(
          canvas,
          0,
          position,
          imgWidth,
          sliceCanvas.height,
          0,
          0,
          imgWidth,
          sliceCanvas.height
        );
  
        const imgData = sliceCanvas.toDataURL('image/png');
  
        if (pageIndex > 0) pdf.addPage();
        pdf.addImage(
          imgData,
          'PNG',
          margin,
          margin,
          pageWidth - 2 * margin,
          ((sliceCanvas.height * (pageWidth - 2 * margin)) / imgWidth),
          undefined,
          'FAST'
        );
  
        position += sliceHeight;
        pageIndex++;
      }
  
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      if (document.body.contains(clone)) {
        document.body.removeChild(clone);
      }
    }
  };
  

  return (
    <div className="flex flex-row gap-6 w-full">
      {/* Editor Section */}
      <div className="w-1/2 p-6 bg-gray-100 shadow-md rounded-xl overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">Resume Editor</h2>

        {/* Profile Photo */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Profile Photo</h3>
          <input
            type="file"
            className="mt-2 p-2 border rounded-md w-full"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {editableResume.photo && (
            <img
              src={editableResume.photo}
              alt="Profile"
              className="mt-2 w-32 h-32 object-cover rounded-full border-2 border-gray-300"
            />
          )}
        </div>

        {/* Name */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-1">Your Name</h3>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="Your Name"
            value={editableResume.name}
            onChange={(e) => handleEditChange("name", e.target.value)}
          />
        </div>

        {/* Title */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-1">Your Title</h3>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="e.g. Software Developer"
            value={editableResume.title}
            onChange={(e) => handleEditChange("title", e.target.value)}
          />
        </div>

        {/* Contact Information */}
        <div className="mt-6">
          <h3 className="text-lg font-bold">Contact Information</h3>
          {editableResume.contact.map((contact, index) => (
            <div key={index} className="mt-2 flex gap-2 items-center">
              <select
                className="p-2 border rounded-md"
                value={contact.type}
                onChange={(e) => handleContactChange(index, "type", e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="phone">Phone</option>
                <option value="email">Email</option>
                <option value="linkedin">LinkedIn</option>
                <option value="github">GitHub</option>
                <option value="portfolio">Portfolio</option>
              </select>
              <input
                type="text"
                className="p-2 border rounded-md w-full"
                placeholder="Enter contact info"
                value={contact.value}
                onChange={(e) => handleContactChange(index, "value", e.target.value)}
              />
              <button onClick={() => removeContact(index)} className="text-red-500 hover:text-red-700">
                <Trash size={16} />
              </button>
            </div>
          ))}
          <button
            onClick={addContact}
            className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md flex items-center gap-2 hover:bg-green-600"
          >
            <PlusCircle size={16} /> Add Contact
          </button>
        </div>

        {/* Profile Section */}
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold mb-1">Profile</h3>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              {showProfile ? "Hide" : "Show"}
            </button>
          </div>
          {showProfile && (
            <textarea
              className="w-full p-2 border rounded-md"
              placeholder="Enter your profile summary"
              value={editableResume.summary}
              onChange={(e) => handleEditChange("summary", e.target.value)}
              rows={4}
            />
          )}
        </div>

        {/* Education Section */}
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold mb-1">Education</h3>
            <button
              onClick={() => setShowEducation(!showEducation)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              {showEducation ? "Hide" : "Show"}
            </button>
          </div>
          {showEducation && (
            <textarea
              className="w-full p-2 border rounded-md"
              placeholder="Enter your education details"
              value={editableResume.education}
              onChange={(e) => handleEditChange("education", e.target.value)}
              rows={4}
            />
          )}
        </div>

        {/* Experience */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-1">Experience</h3>
          {editableResume.experiences.length === 0 && !isEditingExperience ? (
            <div className="text-gray-500">No experiences added yet.</div>
          ) : (
            <div>
              {editableResume.experiences.map((experience, index) => (
                <div key={index} className="mt-2 p-4 border rounded-md bg-white mb-4">
                  <h4 className="font-semibold">{experience.title} at {experience.company}</h4>
                  <p className="text-sm text-gray-500">{experience.duration}</p>
                  <p className="text-sm mt-2">{experience.description}</p>
                  <button
                    onClick={() => removeExperience(index)}
                    className="mt-2 text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash size={16} /> Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {isEditingExperience && (
            <div className="mt-4 p-4 border rounded-md bg-white">
              <h4 className="font-semibold mb-2">Add New Experience</h4>
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Job Title"
                value={draftExperience.title}
                onChange={(e) => handleDraftExperienceChange("title", e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Company"
                value={draftExperience.company}
                onChange={(e) => handleDraftExperienceChange("company", e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Duration (e.g., Jan 2020 - Dec 2022)"
                value={draftExperience.duration}
                onChange={(e) => handleDraftExperienceChange("duration", e.target.value)}
              />
              <textarea
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Description"
                value={draftExperience.description}
                onChange={(e) => handleDraftExperienceChange("description", e.target.value)}
                rows={3}
              />
              <div className="flex gap-2">
                <button
                  onClick={saveDraftExperience}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Save Experience
                </button>
                <button
                  onClick={cancelDraftExperience}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {!isEditingExperience && (
            <button
              onClick={addExperience}
              className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md flex items-center gap-2 hover:bg-green-600"
            >
              <PlusCircle size={16} /> Add Experience
            </button>
          )}
        </div>

        {/* Skills Section */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-1">Skills</h3>
          {editableResume.skills.length === 0 && !isEditingSkill ? (
            <div className="text-gray-500">No skills added yet.</div>
          ) : (
            <div>
              {editableResume.skills.map((skill, index) => (
                <div key={index} className="mt-2 p-4 border rounded-md bg-white mb-4">
                  <p className="text-sm">{skill}</p>
                  <button
                    onClick={() => removeSkill(index)}
                    className="mt-2 text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash size={16} /> Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {isEditingSkill && (
            <div className="mt-4 p-4 border rounded-md bg-white">
              <h4 className="font-semibold mb-2">Add New Skill</h4>
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Enter a skill"
                value={draftSkill}
                onChange={(e) => handleDraftSkillChange(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  onClick={saveDraftSkill}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Save Skill
                </button>
                <button
                  onClick={cancelDraftSkill}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {!isEditingSkill && (
            <button
              onClick={addSkill}
              className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md flex items-center gap-2 hover:bg-green-600"
            >
              <PlusCircle size={16} /> Add Skill
            </button>
          )}
        </div>

        {/* Language Section */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-1">Languages</h3>
          {editableResume.languages.length === 0 && !isEditingLanguage ? (
            <div className="text-gray-500">No languages added yet.</div>
          ) : (
            <div>
              {editableResume.languages.map((language, index) => (
                <div key={index} className="mt-2 p-4 border rounded-md bg-white mb-4">
                  <p className="text-sm">{language}</p>
                  <button
                    onClick={() => removeLanguage(index)}
                    className="mt-2 text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash size={16} /> Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {isEditingLanguage && (
            <div className="mt-4 p-4 border rounded-md bg-white">
              <h4 className="font-semibold mb-2">Add New Language</h4>
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Enter a language"
                value={draftLanguage}
                onChange={(e) => handleDraftLanguageChange(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  onClick={saveDraftLanguage}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Save Language
                </button>
                <button
                  onClick={cancelDraftLanguage}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {!isEditingLanguage && (
            <button
              onClick={addLanguage}
              className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md flex items-center gap-2 hover:bg-green-600"
            >
              <PlusCircle size={16} /> Add Language
            </button>
          )}
        </div>

        {/* Certificate Section */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-1">Certificates</h3>
          {editableResume.certificates.length === 0 && !isEditingCertificate ? (
            <div className="text-gray-500">No certificates added yet.</div>
          ) : (
            <div>
              {editableResume.certificates.map((certificate, index) => (
                <div key={index} className="mt-2 p-4 border rounded-md bg-white mb-4">
                  <h4 className="font-semibold">{certificate.name}</h4>
                  <p className="text-sm text-gray-500">{certificate.issuer}</p>
                  <p className="text-sm">{certificate.date}</p>
                  <button
                    onClick={() => removeCertificate(index)}
                    className="mt-2 text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash size={16} /> Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {isEditingCertificate && (
            <div className="mt-4 p-4 border rounded-md bg-white">
              <h4 className="font-semibold mb-2">Add New Certificate</h4>
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Certificate Name"
                value={draftCertificate.name}
                onChange={(e) => handleDraftCertificateChange("name", e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Issuing Organization"
                value={draftCertificate.issuer}
                onChange={(e) => handleDraftCertificateChange("issuer", e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Date (e.g., 2023)"
                value={draftCertificate.date}
                onChange={(e) => handleDraftCertificateChange("date", e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  onClick={saveDraftCertificate}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Save Certificate
                </button>
                <button
                  onClick={cancelDraftCertificate}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {!isEditingCertificate && (
            <button
              onClick={addCertificate}
              className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md flex items-center gap-2 hover:bg-green-600"
            >
              <PlusCircle size={16} /> Add Certificate
            </button>
          )}
        </div>

        {/* Projects Section */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-1">Projects</h3>
          {editableResume.projects.length === 0 && !isEditingProject ? (
            <div className="text-gray-500">No projects added yet.</div>
          ) : (
            <div>
              {editableResume.projects.map((project, index) => (
                <div key={index} className="mt-2 p-4 border rounded-md bg-white mb-4">
                  <h4 className="font-semibold">{project.title}</h4>
                  <p className="text-sm text-gray-500">{project.duration}</p>
                  <p className="text-sm mt-2">{project.description}</p>
                  <button
                    onClick={() => removeProject(index)}
                    className="mt-2 text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash size={16} /> Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {isEditingProject && (
            <div className="mt-4 p-4 border rounded-md bg-white">
              <h4 className="font-semibold mb-2">Add New Project</h4>
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Project Title"
                value={draftProject.title}
                onChange={(e) => handleDraftProjectChange("title", e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Duration (e.g., 2022)"
                value={draftProject.duration}
                onChange={(e) => handleDraftProjectChange("duration", e.target.value)}
              />
              <textarea
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Description"
                value={draftProject.description}
                onChange={(e) => handleDraftProjectChange("description", e.target.value)}
                rows={3}
              />
              <div className="flex gap-2">
                <button
                  onClick={saveDraftProject}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Save Project
                </button>
                <button
                  onClick={cancelDraftProject}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {!isEditingProject && (
            <button
              onClick={addProject}
              className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md flex items-center gap-2 hover:bg-green-600"
            >
              <PlusCircle size={16} /> Add Project
            </button>
          )}
        </div>

        {/* Courses Section */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-1">Courses</h3>
          {editableResume.courses.length === 0 && !isEditingCourse ? (
            <div className="text-gray-500">No courses added yet.</div>
          ) : (
            <div>
              {editableResume.courses.map((course, index) => (
                <div key={index} className="mt-2 p-4 border rounded-md bg-white mb-4">
                  <h4 className="font-semibold">{course.name}</h4>
                  <p className="text-sm text-gray-500">{course.institution}</p>
                  <p className="text-sm">{course.date}</p>
                  <button
                    onClick={() => removeCourse(index)}
                    className="mt-2 text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash size={16} /> Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {isEditingCourse && (
            <div className="mt-4 p-4 border rounded-md bg-white">
              <h4 className="font-semibold mb-2">Add New Course</h4>
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Course Name"
                value={draftCourse.name}
                onChange={(e) => handleDraftCourseChange("name", e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Institution"
                value={draftCourse.institution}
                onChange={(e) => handleDraftCourseChange("institution", e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Date (e.g., 2023)"
                value={draftCourse.date}
                onChange={(e) => handleDraftCourseChange("date", e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  onClick={saveDraftCourse}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Save Course
                </button>
                <button
                  onClick={cancelDraftCourse}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {!isEditingCourse && (
            <button
              onClick={addCourse}
              className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md flex items-center gap-2 hover:bg-green-600"
            >
              <PlusCircle size={16} /> Add Course
            </button>
          )}
        </div>

        {/* Awards Section */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-1">Awards</h3>
          {editableResume.awards.length === 0 && !isEditingAward ? (
            <div className="text-gray-500">No awards added yet.</div>
          ) : (
            <div>
              {editableResume.awards.map((award, index) => (
                <div key={index} className="mt-2 p-4 border rounded-md bg-white mb-4">
                  <h4 className="font-semibold">{award.title}</h4>
                  <p className="text-sm text-gray-500">{award.issuer}</p>
                  <p className="text-sm">{award.date}</p>
                  <button
                    onClick={() => removeAward(index)}
                    className="mt-2 text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash size={16} /> Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {isEditingAward && (
            <div className="mt-4 p-4 border rounded-md bg-white">
              <h4 className="font-semibold mb-2">Add New Award</h4>
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Award Title"
                value={draftAward.title}
                onChange={(e) => handleDraftAwardChange("title", e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Issuing Organization"
                value={draftAward.issuer}
                onChange={(e) => handleDraftAwardChange("issuer", e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Date (e.g., 2023)"
                value={draftAward.date}
                onChange={(e) => handleDraftAwardChange("date", e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  onClick={saveDraftAward}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Save Award
                </button>
                <button
                  onClick={cancelDraftAward}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {!isEditingAward && (
            <button
              onClick={addAward}
              className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md flex items-center gap-2 hover:bg-green-600"
            >
              <PlusCircle size={16} /> Add Award
            </button>
          )}
        </div>

        {/* Publications Section */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-1">Publications</h3>
          {editableResume.publications.length === 0 && !isEditingPublication ? (
            <div className="text-gray-500">No publications added yet.</div>
          ) : (
            <div>
              {editableResume.publications.map((publication, index) => (
                <div key={index} className="mt-2 p-4 border rounded-md bg-white mb-4">
                  <h4 className="font-semibold">{publication.title}</h4>
                  <p className="text-sm text-gray-500">{publication.publisher}</p>
                  <p className="text-sm">{publication.date}</p>
                  <button
                    onClick={() => removePublication(index)}
                    className="mt-2 text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash size={16} /> Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {isEditingPublication && (
            <div className="mt-4 p-4 border rounded-md bg-white">
              <h4 className="font-semibold mb-2">Add New Publication</h4>
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Publication Title"
                value={draftPublication.title}
                onChange={(e) => handleDraftPublicationChange("title", e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Publisher"
                value={draftPublication.publisher}
                onChange={(e) => handleDraftPublicationChange("publisher", e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Date (e.g., 2023)"
                value={draftPublication.date}
                onChange={(e) => handleDraftPublicationChange("date", e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  onClick={saveDraftPublication}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Save Publication
                </button>
                <button
                  onClick={cancelDraftPublication}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {!isEditingPublication && (
            <button
              onClick={addPublication}
              className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md flex items-center gap-2 hover:bg-green-600"
            >
              <PlusCircle size={16} /> Add Publication
            </button>
          )}
        </div>

        {/* References Section */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-1">References</h3>
          {editableResume.references.length === 0 && !isEditingReference ? (
            <div className="text-gray-500">No references added yet.</div>
          ) : (
            <div>
              {editableResume.references.map((reference, index) => (
                <div key={index} className="mt-2 p-4 border rounded-md bg-white mb-4">
                  <h4 className="font-semibold">{reference.name}</h4>
                  <p className="text-sm text-gray-500">{reference.contact}</p>
                  <p className="text-sm">{reference.relationship}</p>
                  <button
                    onClick={() => removeReference(index)}
                    className="mt-2 text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash size={16} /> Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {isEditingReference && (
            <div className="mt-4 p-4 border rounded-md bg-white">
              <h4 className="font-semibold mb-2">Add New Reference</h4>
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Reference Name"
                value={draftReference.name}
                onChange={(e) => handleDraftReferenceChange("name", e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Contact Info"
                value={draftReference.contact}
                onChange={(e) => handleDraftReferenceChange("contact", e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Relationship"
                value={draftReference.relationship}
                onChange={(e) => handleDraftReferenceChange("relationship", e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  onClick={saveDraftReference}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Save Reference
                </button>
                <button
                  onClick={cancelDraftReference}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {!isEditingReference && (
            <button
              onClick={addReference}
              className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md flex items-center gap-2 hover:bg-green-600"
            >
              <PlusCircle size={16} /> Add Reference
            </button>
          )}
        </div>

        {/* Declaration Section */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-1">Declaration</h3>
          <textarea
            className="w-full p-2 border rounded-md"
            placeholder="Enter your declaration statement"
            value={editableResume.declaration}
            onChange={handleDeclarationChange}
            rows={4}
          />
        </div>
      </div>

      {/* Preview Section */}
      <div className="w-1/2 p-6 bg-white shadow-md rounded-xl overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Resume Preview</h2>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600"
          >
            <Download size={16} /> Download PDF
          </button>
        </div>

        <div ref={resumeRef} className="p-8 bg-white border rounded-lg">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold">
                {editableResume.name || placeholders.name}
              </h1>
              <p className="text-lg text-gray-600">
                {editableResume.title || placeholders.title}
              </p>
            </div>
            {editableResume.photo && (
              <img
                src={editableResume.photo}
                alt="Profile"
                className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
              />
            )}
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-1 mb-4">
              Contact Information
            </h2>
            <div className="flex flex-wrap gap-4">
              {(editableResume.contact.length > 0
                ? editableResume.contact
                : placeholders.contact
              ).map((contact, index) => (
                <div key={index} className="flex items-center">
                  <span className="font-medium capitalize">{contact.type}:</span>
                  <span className="ml-1">{contact.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Summary */}
          {showProfile && (
            <div className="mb-8">
              <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-1 mb-4">
                Profile
              </h2>
              <p className="whitespace-pre-line">
                {editableResume.summary || placeholders.summary}
              </p>
            </div>
          )}

          {/* Education */}
          {showEducation && (
            <div className="mb-8">
              <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-1 mb-4">
                Education
              </h2>
              <p className="whitespace-pre-line">
                {editableResume.education || placeholders.education}
              </p>
            </div>
          )}

          {/* Experience */}
          <div className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-1 mb-4">
              Experience
            </h2>
            {(editableResume.experiences.length > 0
              ? editableResume.experiences
              : placeholders.experiences
            ).map((experience, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold text-lg">
                  {experience.title} at {experience.company}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{experience.duration}</p>
                <p className="whitespace-pre-line">{experience.description}</p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-1 mb-4">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {(editableResume.skills.length > 0
                ? editableResume.skills
                : placeholders.skills
              ).map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-1 mb-4">
              Languages
            </h2>
            <div className="flex flex-wrap gap-2">
              {(editableResume.languages.length > 0
                ? editableResume.languages
                : placeholders.languages
              ).map((language, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-1 mb-4">
              Certificates
            </h2>
            {(editableResume.certificates.length > 0
              ? editableResume.certificates
              : placeholders.certificates
            ).map((certificate, index) => (
              <div key={index} className="mb-2">
                <h3 className="font-bold">{certificate.name}</h3>
                <p className="text-gray-600 text-sm">
                  {certificate.issuer} • {certificate.date}
                </p>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-1 mb-4">
              Projects
            </h2>
            {(editableResume.projects.length > 0
              ? editableResume.projects
              : placeholders.projects
            ).map((project, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{project.duration}</p>
                <p className="whitespace-pre-line">{project.description}</p>
              </div>
            ))}
          </div>

          {/* Courses */}
          <div className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-1 mb-4">
              Courses
            </h2>
            {(editableResume.courses.length > 0
              ? editableResume.courses
              : placeholders.courses
            ).map((course, index) => (
              <div key={index} className="mb-2">
                <h3 className="font-bold">{course.name}</h3>
                <p className="text-gray-600 text-sm">
                  {course.institution} • {course.date}
                </p>
              </div>
            ))}
          </div>

          {/* Awards */}
          <div className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-1 mb-4">
              Awards
            </h2>
            {(editableResume.awards.length > 0
              ? editableResume.awards
              : placeholders.awards
            ).map((award, index) => (
              <div key={index} className="mb-2">
                <h3 className="font-bold">{award.title}</h3>
                <p className="text-gray-600 text-sm">
                  {award.issuer} • {award.date}
                </p>
              </div>
            ))}
          </div>

          {/* Publications */}
          <div className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-1 mb-4">
              Publications
            </h2>
            {(editableResume.publications.length > 0
              ? editableResume.publications
              : placeholders.publications
            ).map((publication, index) => (
              <div key={index} className="mb-2">
                <h3 className="font-bold">{publication.title}</h3>
                <p className="text-gray-600 text-sm">
                  {publication.publisher} • {publication.date}
                </p>
              </div>
            ))}
          </div>

          {/* References */}
          <div className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-1 mb-4">
              References
            </h2>
            {(editableResume.references.length > 0
              ? editableResume.references
              : placeholders.references
            ).map((reference, index) => (
              <div key={index} className="mb-2">
                <h3 className="font-bold">{reference.name}</h3>
                <p className="text-gray-600 text-sm">{reference.contact}</p>
                <p className="text-sm">{reference.relationship}</p>
              </div>
            ))}
          </div>

          {/* Declaration */}
          <div className="mt-8 pt-4 border-t-2 border-gray-200">
            <p className="italic">
              {editableResume.declaration || placeholders.declaration}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;