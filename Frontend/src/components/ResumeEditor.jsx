  import { useRef, useState } from "react";
  import { Download, PlusCircle, Trash } from "lucide-react";
  import html2canvas from "html2canvas";
  import { jsPDF } from "jspdf";

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
      languages: [], // Array for storing languages
      certificates: [], // Array for storing certificates
      projects: [], // Array for storing projects
      courses: [], // Array for storing courses
      awards: [], // Array for storing awards
      publications: [], // Array for storing publications
      references: [], // Array for storing references
      declaration: "", // Declaration text
    });

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
    const downloadPDF = async () => {
      if (resumeRef.current) {
        try {
          const canvas = await html2canvas(resumeRef.current);
          const imgData = canvas.toDataURL("image/jpeg");
          const pdf = new jsPDF();
          const imgWidth = 210;
          const imgHeight = (canvas.height * 210) / canvas.width;
          let heightLeft = imgHeight;
          let position = 0;

          pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
          heightLeft -= 297;
          while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
            heightLeft -= 297;
          }
          pdf.save("resume.pdf");
        } catch (error) {
          console.error("Error generating PDF:", error);
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
                  <Trash />
                </button>
              </div>
            ))}
            <button
              onClick={addContact}
              className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md flex items-center gap-2 hover:bg-green-600"
            >
              <PlusCircle /> Add Contact
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
                <PlusCircle /> Add Experience
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
                <PlusCircle /> Add Skill
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
                <PlusCircle /> Add Language
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
                    <p className="text-sm text-gray-500">{certificate.date}</p>
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
                  placeholder="Issuer"
                  value={draftCertificate.issuer}
                  onChange={(e) => handleDraftCertificateChange("issuer", e.target.value)}
                />
                <input
                  type="text"
                  className="w-full p-2 border rounded-md mb-2"
                  placeholder="Date (e.g., Jan 2020)"
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
                <PlusCircle /> Add Certificate
              </button>
            )}
          </div>

          {/* Project Section */}
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
                  placeholder="Duration (e.g., Jan 2020 - Dec 2022)"
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
                <PlusCircle /> Add Project
              </button>
            )}
          </div>

          {/* Course Section */}
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
                    <p className="text-sm text-gray-500">{course.date}</p>
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
                  placeholder="Date (e.g., Jan 2020)"
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
                <PlusCircle /> Add Course
              </button>
            )}
          </div>

          {/* Award Section */}
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
                    <p className="text-sm text-gray-500">{award.date}</p>
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
                  placeholder="Issuer"
                  value={draftAward.issuer}
                  onChange={(e) => handleDraftAwardChange("issuer", e.target.value)}
                />
                <input
                  type="text"
                  className="w-full p-2 border rounded-md mb-2"
                  placeholder="Date (e.g., Jan 2020)"
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
                <PlusCircle /> Add Award
              </button>
            )}
          </div>

          {/* Publication Section */}
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
                    <p className="text-sm text-gray-500">{publication.date}</p>
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
                  placeholder="Date (e.g., Jan 2020)"
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
                <PlusCircle /> Add Publication
              </button>
            )}
          </div>

          {/* Reference Section */}
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
                    <p className="text-sm text-gray-500">{reference.relationship}</p>
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
                  placeholder="Name"
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
                <PlusCircle /> Add Reference
              </button>
            )}
          </div>

          {/* Declaration Section */}
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-1">Declaration</h3>
            <textarea
              className="w-full p-2 border rounded-md"
              placeholder="Enter your declaration"
              value={editableResume.declaration}
              onChange={handleDeclarationChange}
              rows={4}
            />
          </div>

          {/* Download PDF Button */}
          <button
            onClick={downloadPDF}
            className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg flex items-center justify-center hover:bg-blue-700 transition"
          >
            <Download className="w-5 h-5 mr-2" /> Download PDF
          </button>
        </div>

        {/* Resume Preview Section */}
        <div
          ref={resumeRef}
          className="w-1/2 p-6 bg-white shadow-md rounded-xl overflow-y-auto h-screen sticky top-0 flex justify-center"
        >
          <div className="w-full max-w-2xl">
            {/* Profile Photo */}
            {editableResume.photo && (
              <img
                src={editableResume.photo}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full border-2 border-gray-300 mx-auto mb-4"
              />
            )}

            {/* Name and Title */}
            <h1 className="text-3xl font-bold text-center mb-2">{editableResume.name}</h1>
            <p className="text-lg text-gray-700 text-center mb-4">{editableResume.title}</p>

            {/* Contact Information */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {editableResume.contact.map((contact, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-gray-600">{contact.type}:</span>
                  <span className="text-gray-800">{contact.value}</span>
                </div>
              ))}
            </div>

            {/* Profile Section */}
            {showProfile && editableResume.summary && (
              <>
                <h2 className="text-2xl font-bold mb-4">Profile</h2>
                <hr className="border-t-2 border-gray-300 mb-4" />
                <p className="text-gray-700">{editableResume.summary}</p>
              </>
            )}

            {/* Education Section */}
            {showEducation && editableResume.education && (
              <>
                <h2 className="text-2xl font-bold mb-4">Education</h2>
                <hr className="border-t-2 border-gray-300 mb-4" />
                <p className="text-gray-700">{editableResume.education}</p>
              </>
            )}

            {/* Experience Section */}
            {editableResume.experiences.length > 0 && (
              <>
                <h2 className="text-2xl font-bold mb-4">Experience</h2>
                <hr className="border-t-2 border-gray-300 mb-4" />
                {editableResume.experiences.map((experience, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-xl font-semibold">{experience.title}</h3>
                    <p className="text-gray-600">{experience.company}</p>
                    <p className="text-gray-500 text-sm">{experience.duration}</p>
                    <p className="text-gray-700">{experience.description}</p>
                  </div>
                ))}
              </>
            )}

            {/* Skills Section */}
            {editableResume.skills.length > 0 && (
              <>
                <h2 className="text-2xl font-bold mb-4">Skills</h2>
                <hr className="border-t-2 border-gray-300 mb-4" />
                <div className="flex flex-wrap gap-2">
                  {editableResume.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </>
            )}

            {/* Languages Section */}
            {editableResume.languages.length > 0 && (
              <>
                <h2 className="text-2xl font-bold mb-4">Languages</h2>
                <hr className="border-t-2 border-gray-300 mb-4" />
                <div className="flex flex-wrap gap-2">
                  {editableResume.languages.map((language, index) => (
                    <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                      {language}
                    </span>
                  ))}
                </div>
              </>
            )}

            {/* Certificates Section */}
            {editableResume.certificates.length > 0 && (
              <>
                <h2 className="text-2xl font-bold mb-4">Certificates</h2>
                <hr className="border-t-2 border-gray-300 mb-4" />
                {editableResume.certificates.map((certificate, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-xl font-semibold">{certificate.name}</h3>
                    <p className="text-gray-600">{certificate.issuer}</p>
                    <p className="text-gray-500 text-sm">{certificate.date}</p>
                  </div>
                ))}
              </>
            )}

            {/* Projects Section */}
            {editableResume.projects.length > 0 && (
              <>
                <h2 className="text-2xl font-bold mb-4">Projects</h2>
                <hr className="border-t-2 border-gray-300 mb-4" />
                {editableResume.projects.map((project, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p className="text-gray-600">{project.duration}</p>
                    <p className="text-gray-700">{project.description}</p>
                  </div>
                ))}
              </>
            )}

            {/* Courses Section */}
            {editableResume.courses.length > 0 && (
              <>
                <h2 className="text-2xl font-bold mb-4">Courses</h2>
                <hr className="border-t-2 border-gray-300 mb-4" />
                {editableResume.courses.map((course, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-xl font-semibold">{course.name}</h3>
                    <p className="text-gray-600">{course.institution}</p>
                    <p className="text-gray-500 text-sm">{course.date}</p>
                  </div>
                ))}
              </>
            )}

            {/* Awards Section */}
            {editableResume.awards.length > 0 && (
              <>
                <h2 className="text-2xl font-bold mb-4">Awards</h2>
                <hr className="border-t-2 border-gray-300 mb-4" />
                {editableResume.awards.map((award, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-xl font-semibold">{award.title}</h3>
                    <p className="text-gray-600">{award.issuer}</p>
                    <p className="text-gray-500 text-sm">{award.date}</p>
                  </div>
                ))}
              </>
            )}

            {/* Publications Section */}
            {editableResume.publications.length > 0 && (
              <>
                <h2 className="text-2xl font-bold mb-4">Publications</h2>
                <hr className="border-t-2 border-gray-300 mb-4" />
                {editableResume.publications.map((publication, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-xl font-semibold">{publication.title}</h3>
                    <p className="text-gray-600">{publication.publisher}</p>
                    <p className="text-gray-500 text-sm">{publication.date}</p>
                  </div>
                ))}
              </>
            )}

            {/* References Section */}
            {editableResume.references.length > 0 && (
              <>
                <h2 className="text-2xl font-bold mb-4">References</h2>
                <hr className="border-t-2 border-gray-300 mb-4" />
                {editableResume.references.map((reference, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-xl font-semibold">{reference.name}</h3>
                    <p className="text-gray-600">{reference.contact}</p>
                    <p className="text-gray-500 text-sm">{reference.relationship}</p>
                  </div>
                ))}
              </>
            )}

            {/* Declaration Section */}
            {editableResume.declaration && (
              <>
                <h2 className="text-2xl font-bold mb-4">Declaration</h2>
                <hr className="border-t-2 border-gray-300 mb-4" />
                <p className="text-gray-700">{editableResume.declaration}</p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default ResumeEditor;