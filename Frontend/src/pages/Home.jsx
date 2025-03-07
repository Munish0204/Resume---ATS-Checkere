import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay"; 
import { Pagination, Autoplay } from "swiper/modules";


const Home = () => {
  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-blue-700 mb-4"
        >
          Build Your AI-Powered Resume
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg text-gray-700 mb-6 max-w-2xl"
        >
          Optimize your resume for ATS, improve content with AI, and increase your chances of landing your dream job.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex space-x-4"
        >
          <Link to="/resume-builder" className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 transition">
            Start Building
          </Link>
          <Link to="/ats-checker" className="px-6 py-3 border border-blue-600 text-blue-600 text-lg font-medium rounded-lg hover:bg-blue-600 hover:text-white transition">
            Check ATS Score
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">Why Choose Our AI Resume Builder?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <FeatureCard title="AI-Powered Resume" description="Get AI-generated suggestions to improve your resume content." />
          <FeatureCard title="ATS Optimization" description="Ensure your resume passes ATS checks and gets noticed by recruiters." />
          <FeatureCard title="Job-Specific Tailoring" description="Customize your resume for each job with one-click AI optimization." />
        </div>
      </section>


      <section className="py-16 bg-white flex flex-col items-center text-center">
  <h2 className="text-3xl font-bold text-blue-700 mb-6">See ResumeAI in Action</h2>
  <p className="text-lg text-gray-700 mb-6 max-w-3xl">
    Watch how our AI-powered resume builder helps you create the perfect resume in just minutes.
  </p>

  <video className="w-full max-w-4xl rounded-lg shadow-lg" controls>
    <source src="/videos/demo.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</section>


<section className="py-16 bg-gray-100 text-center">
  <h2 className="text-3xl font-bold text-blue-700 mb-10">
    Choose Your Resume Style
  </h2>

  <Swiper
    spaceBetween={20}
    slidesPerView={1}
    breakpoints={{
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }}
    pagination={{ clickable: true }}
    autoplay={{
      delay: 3000, 
      disableOnInteraction: false,
    }}
    modules={[Pagination, Autoplay]}
    className="max-w-5xl mx-auto"
  >
    <SwiperSlide>
      <TemplateCard image="/images/template1.png" />
    </SwiperSlide>
    <SwiperSlide>
      <TemplateCard image="/images/template2.png" />
    </SwiperSlide>
    <SwiperSlide>
      <TemplateCard image="/images/template3.png" />
    </SwiperSlide>
    <SwiperSlide>
      <TemplateCard image="/images/template4.png" />
    </SwiperSlide>
  </Swiper>
</section>

    

      {/* Interactive AI Demo */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">Try AI-Powered Resume Suggestions</h2>
        <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
          Enter a job title and get an AI-generated resume summary instantly.
        </p>
        <AIResumeDemo />
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto">
          <FAQ question="What is an ATS?" answer="An Applicant Tracking System (ATS) is software used by recruiters to filter and rank resumes." />
          <FAQ question="How does AI improve my resume?" answer="Our AI suggests relevant keywords, improves clarity, and ensures compliance with ATS algorithms." />
          <FAQ question="Can I export my resume?" answer="Yes! You can export your resume as a PDF or Word file with a single click." />
        </div>
      </section>
    </div>
  );
};


// Resume Template Card Component
const TemplateCard = ({ image }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 200, damping: 10 }}
    className="p-4 bg-white shadow-lg rounded-lg"
  >
    <img src={image} alt="Resume Template" className="rounded-lg" />
  </motion.div>
)

// AI Resume Demo Component
const AIResumeDemo = () => {
  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <input
        type="text"
        placeholder="Enter Job Title (e.g., Data Scientist)"
        className="w-full p-3 border border-gray-300 rounded-md mb-4"
      />
      <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition">
        Generate AI Summary
      </button>
    </div>
  );
};



// Feature Card Component
const FeatureCard = ({ title, description }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      className="p-6 bg-white shadow-lg rounded-lg text-center border border-gray-200"
    >
      <h3 className="text-xl font-semibold text-blue-700 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );

  
// FAQ Component
const FAQ = ({ question, answer }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 200, damping: 10 }}
    className="mb-4 p-4 bg-white shadow-md rounded-md"
  >
    <h3 className="text-lg font-semibold text-blue-700">{question}</h3>
    <p className="text-gray-600 mt-2">{answer}</p>
  </motion.div>
);

export default Home;