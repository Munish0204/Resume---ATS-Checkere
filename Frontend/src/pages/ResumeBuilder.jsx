import React from "react";
import { useNavigate } from "react-router-dom";

// Import all template images
import Temp1 from "../assets/Temp1.png";
import Temp2 from "../assets/Temp2.png";
import Temp3 from "../assets/Temp3.png";
import Temp4 from "../assets/Temp4.png";
import Temp5 from "../assets/Temp5.png";
import Temp6 from "../assets/Temp6.png";

const TemplateCard = ({ template, onClick }) => {
    const navigate = useNavigate();
    const [imageError, setImageError] = React.useState(false);

    const handleCardClick = () => {
        if (onClick) {
            onClick(template);
        }
        navigate(`/edit/template${template.id}`);
    };

    const handlePreview = (e) => {
        e.stopPropagation();
        console.log("Preview template:", template.name);
    };

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 h-full"
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleCardClick()}
        >
            <div className="relative pb-[125%] bg-gray-50 overflow-hidden">
                {!imageError && template.image ? (
                    <img
                        src={template.image}
                        alt={template.name || "Resume template"}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={handleImageError}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400">Template Preview</span>
                    </div>
                )}

                <div className="absolute inset-0 hover:bg-black hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center z-20">
                    <span className="opacity-0 hover:opacity-100 text-white font-medium bg-red-600 px-4 py-2 rounded-full transition-opacity duration-300">
                        Use This Template
                    </span>
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-1 truncate">
                    {template.name || "Grenadine Template"}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                    {template.description || "Multi-column resume with red accents"}
                </p>
                <div className="mt-3 flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400">
                            {template.sections?.length || 4} sections
                        </span>
                        <div className="mt-2 flex gap-1 flex-wrap">
                            {(template.tags || ["Modern", "Professional"]).map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <button
                        className="text-sm text-red-600 hover:text-red-800 font-medium"
                        onClick={handlePreview}
                    >
                        Preview
                    </button>
                </div>
            </div>
        </div>
    );
};

const TemplateCardExample = () => {
    const templates = [
        {
            id: "1",
            name: "Modern template",
            description: "Multi-column resume with red accents",
            image: Temp1,
            tags: ["Professional", "Modern"],
            sections: ["Profile", "Experience", "Education", "Skills"]
        },
        {
            id: "2",
            name: "Professional template",
            description: "Enhanced resume with red accents",
            image: Temp2,
            tags: ["Premium", "Modern"],
            sections: ["Profile", "Experience", "Education", "Skills", "Projects"]
        },
        {
            id: "3",
            name: "Simple template",
            description: "Professional CV with customizable sections",
            image: Temp3,
            tags: ["Executive", "Creative"],
            sections: ["Profile", "Experience", "Education", "Skills", "Projects", "Awards"]
        },
        {
            id: "4",
            name: "Creative template",
            description: "Clean and simple resume design",
            image: Temp4,
            tags: ["Simple", "Clean"],
            sections: ["Summary", "Work History", "Education", "Skills"]
        },
        {
            id: "5",
            name: "Concise template",
            description: "Premium template for senior positions",
            image: Temp5,
            tags: ["Executive", "Leadership"],
            sections: ["Profile", "Career Highlights", "Experience", "Education", "Skills"]
        },
        {
            id: "6",
            name: "Classic template",
            description: "Traditional resume layout",
            image: Temp6,
            tags: ["Traditional", "Standard"],
            sections: ["Summary", "Experience", "Education", "Skills"]
        }
    ];

    const handleTemplateClick = (template) => {
        console.log("Selected template:", template.name);
    };

    return (
        <div className="w-full px-4">
            <div className="flex flex-row justify-between space-x-8 mt-6">
                {templates.slice(0, 3).map((template) => (
                    <div className="flex-1" key={template.id}>
                        <TemplateCard template={template} onClick={handleTemplateClick} />
                    </div>
                ))}
            </div>
            <div className="flex flex-row justify-between space-x-8 mt-10">
                {templates.slice(3).map((template) => (
                    <div className="flex-1" key={template.id}>
                        <TemplateCard template={template} onClick={handleTemplateClick} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TemplateCardExample;
