import { useRef, useState } from "react";
import { Download, PlusCircle, Trash } from "lucide-react";

const AmericanResumeEditor = () => {
  const resumeRef = useRef(null);
  const [resumeData, setResumeData] = useState({
    name: "",
    title: "",
    photo: "",
    contact: [],
    summary: "",
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    references: []
  });

  // Draft states
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [draftExperience, setDraftExperience] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: ""
  });

  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const [draftEducation, setDraftEducation] = useState({
    degree: "",
    institution: "",
    location: "",
    graduationDate: "",
    gpa: ""
  });

  const [isEditingSkill, setIsEditingSkill] = useState(false);
  const [draftSkill, setDraftSkill] = useState("");

  const [isEditingCertification, setIsEditingCertification] = useState(false);
  const [draftCertification, setDraftCertification] = useState({
    name: "",
    issuer: "",
    date: ""
  });

  const [isEditingReference, setIsEditingReference] = useState(false);
  const [draftReference, setDraftReference] = useState({
    name: "",
    title: "",
    company: "",
    phone: "",
    email: ""
  });

  // Handle general changes
  const handleChange = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Contact functions
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

  // Photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumeData(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Experience functions
  const addExperience = () => {
    setIsEditingExperience(true);
    setDraftExperience({
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
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
      experience: [...prev.experience, draftExperience]
    }));
    setIsEditingExperience(false);
  };

  const removeExperience = (index) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  // Education functions
  const addEducation = () => {
    setIsEditingEducation(true);
    setDraftEducation({
      degree: "",
      institution: "",
      location: "",
      graduationDate: "",
      gpa: ""
    });
  };

  const handleDraftEducationChange = (field, value) => {
    setDraftEducation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveDraftEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, draftEducation]
    }));
    setIsEditingEducation(false);
  };

  const removeEducation = (index) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  // Skills functions
  const addSkill = () => {
    setIsEditingSkill(true);
    setDraftSkill("");
  };

  const saveDraftSkill = () => {
    if (draftSkill.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, draftSkill]
      }));
      setIsEditingSkill(false);
      setDraftSkill("");
    }
  };

  const removeSkill = (index) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  // Certification functions
  const addCertification = () => {
    setIsEditingCertification(true);
    setDraftCertification({
      name: "",
      issuer: "",
      date: ""
    });
  };

  const handleDraftCertificationChange = (field, value) => {
    setDraftCertification(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveDraftCertification = () => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, draftCertification]
    }));
    setIsEditingCertification(false);
  };

  const removeCertification = (index) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  // Reference functions
  const addReference = () => {
    setIsEditingReference(true);
    setDraftReference({
      name: "",
      title: "",
      company: "",
      phone: "",
      email: ""
    });
  };

  const handleDraftReferenceChange = (field, value) => {
    setDraftReference(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveDraftReference = () => {
    setResumeData(prev => ({
      ...prev,
      references: [...prev.references, draftReference]
    }));
    setIsEditingReference(false);
  };

  const removeReference = (index) => {
    setResumeData(prev => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index)
    }));
  };

  // Simulated PDF download
  const downloadResume = () => {
    alert("Resume download functionality would be implemented here with PDF library");
  };

  return (
    <div className="flex flex-row h-screen bg-gray-100">
      {/* Left Side - Editor Controls */}
      <div className="w-1/2 p-6 overflow-y-auto bg-white shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-blue-800">American Resume Builder</h1>

        {/* Personal Information */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Personal Information</h2>
          
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="John Doe"
              value={resumeData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {/* Professional Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Software Engineer"
              value={resumeData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          {/* Photo Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Photo (Optional)</label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={handlePhotoUpload}
            />
            {resumeData.photo && (
              <div className="mt-2">
                <img 
                  src={resumeData.photo} 
                  alt="Profile" 
                  className="w-20 h-20 object-cover rounded-full"
                />
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Information</label>
            {resumeData.contact.map((contact, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <select
                  value={contact.type}
                  onChange={(e) => handleContactChange(index, "type", e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Type</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="website">Website</option>
                  <option value="address">Address</option>
                </select>
                <input
                  type="text"
                  placeholder="Value"
                  value={contact.value}
                  onChange={(e) => handleContactChange(index, "value", e.target.value)}
                  className="p-2 border border-gray-300 rounded-md flex-grow"
                />
                <button 
                  onClick={() => removeContact(index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <Trash size={18} />
                </button>
              </div>
            ))}
            <button
              onClick={addContact}
              className="mt-2 flex items-center text-blue-600 hover:text-blue-800"
            >
              <PlusCircle size={16} className="mr-1" /> Add Contact Method
            </button>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Professional Summary</h2>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={4}
            placeholder="Brief overview of your qualifications and career goals"
            value={resumeData.summary}
            onChange={(e) => handleChange("summary", e.target.value)}
          />
        </div>

        {/* Experience Section */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Work Experience</h2>
          
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-4 p-3 border border-gray-200 rounded-md bg-white">
              <div className="flex justify-between">
                <h3 className="font-medium">{exp.title} at {exp.company}</h3>
                <button 
                  onClick={() => removeExperience(index)} 
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash size={16} />
                </button>
              </div>
              <p className="text-sm text-gray-600">{exp.location}</p>
              <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</p>
              <p className="mt-2 text-sm">{exp.description}</p>
            </div>
          ))}
          
          {isEditingExperience ? (
            <div className="mt-4 p-3 border border-gray-200 rounded-md bg-white">
              <h3 className="font-medium mb-2">Add Experience</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={draftExperience.title}
                  onChange={(e) => handleDraftExperienceChange("title", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={draftExperience.company}
                  onChange={(e) => handleDraftExperienceChange("company", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={draftExperience.location}
                  onChange={(e) => handleDraftExperienceChange("location", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Start Date"
                    value={draftExperience.startDate}
                    onChange={(e) => handleDraftExperienceChange("startDate", e.target.value)}
                    className="w-1/2 p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="End Date"
                    value={draftExperience.endDate}
                    onChange={(e) => handleDraftExperienceChange("endDate", e.target.value)}
                    className="w-1/2 p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <textarea
                  placeholder="Job Description"
                  value={draftExperience.description}
                  onChange={(e) => handleDraftExperienceChange("description", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={3}
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveDraftExperience}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditingExperience(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={addExperience}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <PlusCircle size={16} className="mr-1" /> Add Experience
            </button>
          )}
        </div>

        {/* Education Section */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Education</h2>
          
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-4 p-3 border border-gray-200 rounded-md bg-white">
              <div className="flex justify-between">
                <h3 className="font-medium">{edu.degree}</h3>
                <button 
                  onClick={() => removeEducation(index)} 
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash size={16} />
                </button>
              </div>
              <p className="text-sm text-gray-600">{edu.institution}, {edu.location}</p>
              <p className="text-sm text-gray-600">Graduation: {edu.graduationDate}</p>
              {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
            </div>
          ))}
          
          {isEditingEducation ? (
            <div className="mt-4 p-3 border border-gray-200 rounded-md bg-white">
              <h3 className="font-medium mb-2">Add Education</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Degree/Program"
                  value={draftEducation.degree}
                  onChange={(e) => handleDraftEducationChange("degree", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Institution"
                  value={draftEducation.institution}
                  onChange={(e) => handleDraftEducationChange("institution", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={draftEducation.location}
                  onChange={(e) => handleDraftEducationChange("location", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Graduation Date"
                  value={draftEducation.graduationDate}
                  onChange={(e) => handleDraftEducationChange("graduationDate", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="GPA (Optional)"
                  value={draftEducation.gpa}
                  onChange={(e) => handleDraftEducationChange("gpa", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveDraftEducation}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditingEducation(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={addEducation}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <PlusCircle size={16} className="mr-1" /> Add Education
            </button>
          )}
        </div>

        {/* Skills Section */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Skills</h2>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
                <span className="text-blue-800">{skill}</span>
                <button 
                  onClick={() => removeSkill(index)} 
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  <Trash size={14} />
                </button>
              </div>
            ))}
          </div>
          
          {isEditingSkill ? (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter skill"
                value={draftSkill}
                onChange={(e) => setDraftSkill(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={saveDraftSkill}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add
              </button>
              <button
                onClick={() => setIsEditingSkill(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={addSkill}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <PlusCircle size={16} className="mr-1" /> Add Skill
            </button>
          )}
        </div>

        {/* Certifications Section */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Certifications</h2>
          
          {resumeData.certifications.map((cert, index) => (
            <div key={index} className="mb-4 p-3 border border-gray-200 rounded-md bg-white">
              <div className="flex justify-between">
                <h3 className="font-medium">{cert.name}</h3>
                <button 
                  onClick={() => removeCertification(index)} 
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash size={16} />
                </button>
              </div>
              <p className="text-sm text-gray-600">{cert.issuer}</p>
              <p className="text-sm text-gray-600">{cert.date}</p>
            </div>
          ))}
          
          {isEditingCertification ? (
            <div className="mt-4 p-3 border border-gray-200 rounded-md bg-white">
              <h3 className="font-medium mb-2">Add Certification</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Certification Name"
                  value={draftCertification.name}
                  onChange={(e) => handleDraftCertificationChange("name", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Issuing Organization"
                  value={draftCertification.issuer}
                  onChange={(e) => handleDraftCertificationChange("issuer", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Date Earned"
                  value={draftCertification.date}
                  onChange={(e) => handleDraftCertificationChange("date", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveDraftCertification}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditingCertification(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={addCertification}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <PlusCircle size={16} className="mr-1" /> Add Certification
            </button>
          )}
        </div>

        {/* References Section */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">References</h2>
          
          {resumeData.references.map((ref, index) => (
            <div key={index} className="mb-4 p-3 border border-gray-200 rounded-md bg-white">
              <div className="flex justify-between">
                <h3 className="font-medium">{ref.name}</h3>
                <button 
                  onClick={() => removeReference(index)} 
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash size={16} />
                </button>
              </div>
              <p className="text-sm text-gray-600">{ref.title} at {ref.company}</p>
              <p className="text-sm text-gray-600">Phone: {ref.phone}</p>
              <p className="text-sm text-gray-600">Email: {ref.email}</p>
            </div>
          ))}
          
          {isEditingReference ? (
            <div className="mt-4 p-3 border border-gray-200 rounded-md bg-white">
              <h3 className="font-medium mb-2">Add Reference</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Reference Name"
                  value={draftReference.name}
                  onChange={(e) => handleDraftReferenceChange("name", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Title"
                  value={draftReference.title}
                  onChange={(e) => handleDraftReferenceChange("title", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={draftReference.company}
                  onChange={(e) => handleDraftReferenceChange("company", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={draftReference.phone}
                  onChange={(e) => handleDraftReferenceChange("phone", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Email"
                  value={draftReference.email}
                  onChange={(e) => handleDraftReferenceChange("email", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveDraftReference}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditingReference(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={addReference}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <PlusCircle size={16} className="mr-1" /> Add Reference
            </button>
          )}
        </div>

        {/* Download Button */}
        <button
          onClick={downloadResume}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 flex items-center justify-center"
        >
          <Download size={20} className="mr-2" /> Download Resume
        </button>
      </div>

      {/* Right Side - Resume Preview */}
      <div ref={resumeRef} className="w-1/2 p-8 overflow-y-auto bg-white">
        <div className="max-w-3xl mx-auto p-8 bg-white border shadow-lg">
          {/* Header with Photo, Name and Title */}
          <div className="flex items-center mb-6">
            {/* Photo */}
            {resumeData.photo && (
              <div className="mr-6">
                <img 
                  src={resumeData.photo} 
                  alt="Profile" 
                  className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
                />
              </div>
            )}
            {/* Name and Title */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-blue-900">{resumeData.name || "Your Name"}</h1>
              {resumeData.title && <p className="text-xl text-gray-600 mt-1">{resumeData.title}</p>}
              
              {/* Contact Information */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3">
                {resumeData.contact.map((contact, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-1">{contact.type}:</span>
                    <span>{contact.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          {resumeData.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-300 pb-1 mb-3">
                Professional Summary
              </h2>
              <p className="text-gray-700">{resumeData.summary}</p>
            </div>
          )}

          {/* Experience Section */}
          {resumeData.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-300 pb-1 mb-3">
                Work Experience
              </h2>
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-lg">{exp.title}</h3>
                    <p className="text-gray-600">
                      {exp.startDate} - {exp.endDate}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-medium text-gray-700">{exp.company}</p>
                    <p className="text-gray-600">{exp.location}</p>
                  </div>
                  <p className="mt-2 text-gray-700 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Education Section */}
          {resumeData.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-300 pb-1 mb-3">
                Education
              </h2>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-lg">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.graduationDate}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-medium text-gray-700">{edu.institution}</p>
                    <p className="text-gray-600">{edu.location}</p>
                  </div>
                  {edu.gpa && (
                    <p className="mt-1 text-gray-700">
                      <span className="font-medium">GPA:</span> {edu.gpa}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Skills Section */}
          {resumeData.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-300 pb-1 mb-3">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications Section */}
          {resumeData.certifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-300 pb-1 mb-3">
                Certifications
              </h2>
              {resumeData.certifications.map((cert, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-bold">{cert.name}</h3>
                  <div className="flex justify-between">
                    <p className="text-gray-700">{cert.issuer}</p>
                    <p className="text-gray-600">{cert.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* References Section */}
          {resumeData.references.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-300 pb-1 mb-3">
                References
              </h2>
              {resumeData.references.map((ref, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-bold">{ref.name}</h3>
                  <p className="text-gray-700">{ref.title} at {ref.company}</p>
                  <div className="flex gap-4 mt-1">
                    {ref.phone && (
                      <p className="text-gray-600">
                        <span className="font-medium">Phone:</span> {ref.phone}
                      </p>
                    )}
                    {ref.email && (
                      <p className="text-gray-600">
                        <span className="font-medium">Email:</span> {ref.email}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AmericanResumeEditor;