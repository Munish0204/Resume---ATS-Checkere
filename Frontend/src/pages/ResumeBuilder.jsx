import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const templates = [
  {
    id: 1,
    name: "Enter Full Name",
    title: "Enter Job Title",
    image: "/images/default-template.png",
    photo: "/images/default-photo.png",
    contact: {
      address: "Enter Address",
      email: "Enter Email",
      phone: "Enter Phone Number",
      linkedin: "Enter LinkedIn URL",
      github: "Enter GitHub URL",
    },
    profile: "Write a brief professional summary about yourself...",
    experience: [
      {
        role: "Enter Job Role",
        company: "Enter Company Name",
        period: "Start Date - End Date",
        location: "Enter Location",
        details: "Describe your responsibilities and key achievements in this role...",
      },
    ],
    education: [
      {
        degree: "Enter Degree Name",
        university: "Enter University Name",
        period: "Start Year - End Year",
      },
    ],
    skills: ["Enter skill", "Add more skills..."],
    achievements: ["Enter an achievement", "Add more achievements..."],
    tech_stack: ["Enter technology", "Add more technologies..."],
  },
  {
    id: 2,
    name: "Sample Resume",
    title: "Software Engineer",
    image: "/images/sample-template.png",
    photo: "/images/sample-photo.png",
    contact: {
      address: "123 Street, City, Country",
      email: "sample@example.com",
      phone: "123-456-7890",
      linkedin: "https://linkedin.com/in/sample",
      github: "https://github.com/sample",
    },
    profile: "An experienced software engineer with expertise in web development and AI technologies...",
    experience: [
      {
        role: "Software Engineer",
        company: "Tech Corp",
        period: "2020 - Present",
        location: "Remote",
        details: "Worked on multiple AI-driven web applications, improving efficiency and scalability...",
      },
    ],
    education: [
      {
        degree: "BSc in Computer Science",
        university: "Tech University",
        period: "2016 - 2020",
      },
    ],
    skills: ["JavaScript", "React", "Node.js", "AI Integration"],
    achievements: ["Built an AI-powered resume builder", "Developed a scalable web application"],
    tech_stack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
  },
];

const ResumeTemplateCarousel = () => {
  const navigate = useNavigate();
 
  const handleTemplateSelect = (template) => {
    if (template.id === 1) {
      navigate(`/edit/${template.id}`, { state: { template } });
    } else if (template.id === 2) {
      navigate(`/edit/template2`, { state: { template } });
    } else {
      navigate(`/edit/${template.id}`, { state: { template } });
    }
  };

  
  
  

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10 flex flex-col items-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {/* Left Container: Title & Description */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Choose a Resume Template</h1>
          <p className="text-gray-600 text-base md:text-lg">
            Select a template that best suits your career and customize it with ease.
          </p>
        </div>

        {/* Right Container: Swiper Carousel */}
        <div className="w-full">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{ 
              640: { slidesPerView: 2 }, 
              1024: { slidesPerView: 3 } 
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true 
            }}
            autoplay={{ 
              delay: 3000, 
              disableOnInteraction: false 
            }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay]}
            className="w-full h-full"
          >
            {templates.map((template) => (
              <SwiperSlide key={template.id} className="pb-10">
                <div
                  className="cursor-pointer bg-white shadow-md rounded-lg overflow-hidden text-center hover:shadow-xl transition duration-300"
                  onClick={() => handleTemplateSelect(template)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleTemplateSelect(template)}
                >
                  <img 
                    src={template.image} 
                    alt={template.name} 
                    className="w-full h-64 object-contain rounded-t-lg" 
                    loading="lazy"
                  />
                  <div className="p-4">
                    <h3 className="font-medium">{template.name}</h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplateCarousel;