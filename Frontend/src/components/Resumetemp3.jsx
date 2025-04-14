import { useState, useRef } from "react";
import { Download, PlusCircle, Trash } from "lucide-react";

const ResumeTemplate = () => {
  const resumeRef = useRef(null);
  const [resumeData, setResumeData] = useState({
    name: "",
    title: "",
    photo: "",
    contact: [],
    summary: "",
    education: "",
    experiences: [],
    skills: [],
    languages: [],
    projects: []
  });

  // States for editing modes and drafts
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [draftExperience, setDraftExperience] = useState({
    title: "",
    company: "",
    duration: "",
    description: ""
  });

  const [isEditingSkill, setIsEditingSkill] = useState(false);
  const [draftSkill, setDraftSkill] = useState("");

  const [isEditingLanguage, setIsEditingLanguage] = useState(false);
  const [draftLanguage, setDraftLanguage] = useState("");

  const [isEditingProject, setIsEditingProject] = useState(false);
  const [draftProject, setDraftProject] = useState({
    title: "",
    description: "",
    duration: ""
  });

  // General handler for editing fields
  const handleEditChange = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Contact Functions
  const addContact = () => {
    setResumeData(prev => ({
      ...prev,
      contact: [...prev.contact, { type: "", value: "" }]
    }));
  };

  const handleContactChange = (index, field, value) => {
    const updatedContacts = [...resumeData.contact];
    updatedContacts[index][field] = value;
    setResumeData(prev => ({ ...prev, contact: updatedContacts }));
  };

  const removeContact = (index) => {
    setResumeData(prev => ({
      ...prev,
      contact: prev.contact.filter((_, i) => i !== index)
    }));
  };

  // Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumeData(prev => ({ ...prev, photo: reader.result }));
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
      description: ""
    });
  };

  const handleDraftExperienceChange = (field, value) => {
    setDraftExperience(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveDraftExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experiences: [...prev.experiences, draftExperience]
    }));
    setIsEditingExperience(false);
  };

  const cancelDraftExperience = () => {
    setIsEditingExperience(false);
  };

  const removeExperience = (index) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index)
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
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, draftSkill]
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
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
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
      setResumeData(prev => ({
        ...prev,
        languages: [...prev.languages, draftLanguage]
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
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  // Project Functions
  const addProject = () => {
    setIsEditingProject(true);
    setDraftProject({
      title: "",
      description: "",
      duration: ""
    });
  };

  const handleDraftProjectChange = (field, value) => {
    setDraftProject(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveDraftProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, draftProject]
    }));
    setIsEditingProject(false);
  };

  const cancelDraftProject = () => {
    setIsEditingProject(false);
  };

  const removeProject = (index) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  // Download PDF function (placeholder - would need actual implementation)
  const downloadResume = () => {
    alert("PDF download functionality would be implemented here");
  };

  return (
    <div className="flex flex-row gap-6 w-full h-screen bg-gray-50">
      {/* Editor Section */}
      <div className="w-1/2 p-6 bg-white shadow-md rounded-lg overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Resume Editor</h2>

        {/* Profile Photo */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Profile Photo</h3>
          <input
            type="file"
            className="mt-1 p-2 border rounded w-full"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {resumeData.photo && (
            <img
              src={resumeData.photo}
              alt="Profile"
              className="mt-2 w-24 h-24 object-cover rounded-full border-2 border-gray-300"
            />
          )}
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Full Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
            placeholder="John Doe"
            value={resumeData.name}
            onChange={(e) => handleEditChange("name", e.target.value)}
          />
        </div>

        {/* Job Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Job Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
            placeholder="Software Engineer"
            value={resumeData.title}
            onChange={(e) => handleEditChange("title", e.target.value)}
          />
        </div>

        {/* Contact Information */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <button
              onClick={addContact}
              className="text-sm px-3 py-1 bg-green-500 text-white rounded flex items-center gap-1 hover:bg-green-600"
            >
              <PlusCircle size={16} /> Add
            </button>
          </div>
          
          {resumeData.contact.map((contact, index) => (
            <div key={index} className="mt-2 flex gap-2 items-center">
              <select
                className="p-2 border rounded"
                value={contact.type}
                onChange={(e) => handleContactChange(index, "type", e.target.value)}
              >
                <option value="">Type</option>
                <option value="phone">Phone</option>
                <option value="email">Email</option>
                <option value="linkedin">LinkedIn</option>
                <option value="location">Location</option>
                <option value="website">Website</option>
              </select>
              <input
                type="text"
                className="p-2 border rounded w-full"
                placeholder="Value"
                value={contact.value}
                onChange={(e) => handleContactChange(index, "value", e.target.value)}
              />
              <button 
                onClick={() => removeContact(index)} 
                className="text-red-500 hover:text-red-700"
              >
                <Trash size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Professional Summary</label>
          <textarea
            className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
            placeholder="Brief overview of your professional profile..."
            value={resumeData.summary}
            onChange={(e) => handleEditChange("summary", e.target.value)}
            rows={4}
          />
        </div>

        {/* Education */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Education</label>
          <textarea
            className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
            placeholder="Your education details..."
            value={resumeData.education}
            onChange={(e) => handleEditChange("education", e.target.value)}
            rows={4}
          />
        </div>

        {/* Experience */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Work Experience</h3>
            {!isEditingExperience && (
              <button
                onClick={addExperience}
                className="text-sm px-3 py-1 bg-green-500 text-white rounded flex items-center gap-1 hover:bg-green-600"
              >
                <PlusCircle size={16} /> Add
              </button>
            )}
          </div>
          
          {resumeData.experiences.map((experience, index) => (
            <div key={index} className="mb-3 p-3 border rounded bg-gray-50">
              <div className="font-medium">{experience.title}</div>
              <div className="text-sm text-gray-600">
                {experience.company} • {experience.duration}
              </div>
              <p className="text-sm mt-1">{experience.description}</p>
              <button
                onClick={() => removeExperience(index)}
                className="mt-2 text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
              >
                <Trash size={14} /> Remove
              </button>
            </div>
          ))}
          
          {isEditingExperience && (
            <div className="mt-3 p-3 border rounded bg-gray-50">
              <h4 className="font-medium mb-2">Add Experience</h4>
              <input
                type="text"
                className="w-full p-2 border rounded mb-2"
                placeholder="Job Title"
                value={draftExperience.title}
                onChange={(e) => handleDraftExperienceChange("title", e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 border rounded mb-2"
                placeholder="Company"
                value={draftExperience.company}
                onChange={(e) => handleDraftExperienceChange("company", e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 border rounded mb-2"
                placeholder="Duration (e.g. 2018-2020)"
                value={draftExperience.duration}
                onChange={(e) => handleDraftExperienceChange("duration", e.target.value)}
              />
              <textarea
                className="w-full p-2 border rounded mb-2"
                placeholder="Description"
                value={draftExperience.description}
                onChange={(e) => handleDraftExperienceChange("description", e.target.value)}
                rows={3}
              />
              <div className="flex gap-2">
                <button
                  onClick={saveDraftExperience}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={cancelDraftExperience}
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Skills</h3>
            {!isEditingSkill && (
              <button
                onClick={addSkill}
                className="text-sm px-3 py-1 bg-green-500 text-white rounded flex items-center gap-1 hover:bg-green-600"
              >
                <PlusCircle size={16} /> Add
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="bg-gray-100 px-3 py-1 rounded-lg flex items-center gap-1">
                <span>{skill}</span>
                <button
                  onClick={() => removeSkill(index)}
                  className="text-red-500 hover:text-red-700 ml-1"
                >
                  <Trash size={14} />
                </button>
              </div>
            ))}
          </div>
          
          {isEditingSkill && (
            <div className="mt-3 p-3 border rounded bg-gray-50">
              <input
                type="text"
                className="w-full p-2 border rounded mb-2"
                placeholder="Enter a skill"
                value={draftSkill}
                onChange={(e) => handleDraftSkillChange(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  onClick={saveDraftSkill}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add
                </button>
                <button
                  onClick={cancelDraftSkill}
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Languages */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Languages</h3>
            {!isEditingLanguage && (
              <button
                onClick={addLanguage}
                className="text-sm px-3 py-1 bg-green-500 text-white rounded flex items-center gap-1 hover:bg-green-600"
              >
                <PlusCircle size={16} /> Add
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {resumeData.languages.map((language, index) => (
              <div key={index} className="bg-gray-100 px-3 py-1 rounded-lg flex items-center gap-1">
                <span>{language}</span>
                <button
                  onClick={() => removeLanguage(index)}
                  className="text-red-500 hover:text-red-700 ml-1"
                >
                  <Trash size={14} />
                </button>
              </div>
            ))}
          </div>
          
          {isEditingLanguage && (
            <div className="mt-3 p-3 border rounded bg-gray-50">
              <input
                type="text"
                className="w-full p-2 border rounded mb-2"
                placeholder="Enter a language"
                value={draftLanguage}
                onChange={(e) => handleDraftLanguageChange(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  onClick={saveDraftLanguage}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add
                </button>
                <button
                  onClick={cancelDraftLanguage}
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Projects */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Projects</h3>
            {!isEditingProject && (
              <button
                onClick={addProject}
                className="text-sm px-3 py-1 bg-green-500 text-white rounded flex items-center gap-1 hover:bg-green-600"
              >
                <PlusCircle size={16} /> Add
              </button>
            )}
          </div>
          
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mb-3 p-3 border rounded bg-gray-50">
              <div className="font-medium">{project.title}</div>
              <div className="text-sm text-gray-600">{project.duration}</div>
              <p className="text-sm mt-1">{project.description}</p>
              <button
                onClick={() => removeProject(index)}
                className="mt-2 text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
              >
                <Trash size={14} /> Remove
              </button>
            </div>
          ))}
          
          {isEditingProject && (
            <div className="mt-3 p-3 border rounded bg-gray-50">
              <h4 className="font-medium mb-2">Add Project</h4>
              <input
                type="text"
                className="w-full p-2 border rounded mb-2"
                placeholder="Project Name"
                value={draftProject.title}
                onChange={(e) => handleDraftProjectChange("title", e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 border rounded mb-2"
                placeholder="Duration (e.g. 2018-2020)"
                value={draftProject.duration}
                onChange={(e) => handleDraftProjectChange("duration", e.target.value)}
              />
              <textarea
                className="w-full p-2 border rounded mb-2"
                placeholder="Description"
                value={draftProject.description}
                onChange={(e) => handleDraftProjectChange("description", e.target.value)}
                rows={3}
              />
              <div className="flex gap-2">
                <button
                  onClick={saveDraftProject}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={cancelDraftProject}
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Download Button */}
        <button
          onClick={downloadResume}
          className="bg-blue-600 text-white py-2 px-4 rounded flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Download size={18} /> Download Resume
        </button>
      </div>

      {/* Preview Section */}
      <div className="w-1/2 p-6 bg-white shadow-md rounded-lg overflow-y-auto">
        <div ref={resumeRef} className="max-w-2xl mx-auto bg-white p-6 border">
          {/* Header Section with Photo & Contact */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800">{resumeData.name || "Your Name"}</h1>
              <p className="text-xl text-gray-600">{resumeData.title || "Your Title"}</p>
              
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-700">
                {resumeData.contact.map((item, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <span className="font-medium">{item.type}:</span> {item.value}
                  </div>
                ))}
              </div>
            </div>
            
            {resumeData.photo && (
              <div className="ml-4">
                <img 
                  src={resumeData.photo} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-300" 
                />
              </div>
            )}
          </div>

          {/* Summary Section */}
          {resumeData.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-1 mb-2">PROFESSIONAL SUMMARY</h2>
              <p className="text-gray-700">{resumeData.summary}</p>
            </div>
          )}

          {/* Education Section */}
          {resumeData.education && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-1 mb-2">EDUCATION</h2>
              <p className="text-gray-700">{resumeData.education}</p>
            </div>
          )}

          {/* Experience Section */}
          {resumeData.experiences.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-1 mb-2">EXPERIENCE</h2>
              {resumeData.experiences.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between">
                    <h3 className="font-bold">{exp.title}</h3>
                    <span className="text-gray-600">{exp.duration}</span>
                  </div>
                  <p className="text-gray-600 italic">{exp.company}</p>
                  <p className="text-gray-700 mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Skills Section */}
          {resumeData.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-1 mb-2">SKILLS</h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <span key={index} className="bg-gray-100 px-2 py-1 rounded text-gray-700">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* Languages Section */}
          {resumeData.languages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-1 mb-2">LANGUAGES</h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.languages.map((language, index) => (
                  <span key={index} className="bg-gray-100 px-2 py-1 rounded text-gray-700">{language}</span>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {resumeData.projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-1 mb-2">PROJECTS</h2>
              {resumeData.projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between">
                    <h3 className="font-bold">{project.title}</h3>
                    <span className="text-gray-600">{project.duration}</span>
                  </div>
                  <p className="text-gray-700 mt-1">{project.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate;