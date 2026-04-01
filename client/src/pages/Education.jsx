import React, { useEffect, useState } from "react";
import api from "../api/api";

const Education = () => {
  const [educationList, setEducationList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEducation() {
      try {
        const res = await api.get("/education");
        setEducationList(res.data);
      } catch (err) {
        setError("Failed to load education data");
      }
    }
    fetchEducation();
  }, []);

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!educationList.length)
    return <p className="text-center text-white">Loading education...</p>;

  return (
    <section
      id="education"
      className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[4vw] font-sans bg-skills-gradient clip-path-custom-3"
    >
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">EDUCATION</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          My education has been a journey of learning and development. Here are
          the details of my academic background
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute sm:left-1/2 left-0 transform -translate-x-1/2 sm:-translate-x-0 w-1 bg-white h-full"></div>

        {educationList.map((edu, index) => (
          <div
            key={edu._id}
            className={`flex flex-col sm:flex-row items-center mb-16 ${
              index % 2 === 0 ? "sm:justify-start" : "sm:justify-end"
            }`}
          >
            {/* Timeline Circle */}
            <div className="absolute sm:left-1/2 left-0 transform -translate-x-1/2 bg-gray-400 border-4 border-[#8245ec] w-12 h-12 sm:w-16 sm:h-16 rounded-full flex justify-center items-center z-10">
              {edu.logoUrl && (
                <img
                  src={edu.logoUrl}
                  alt={edu.institute}
                  className="w-full h-full object-cover rounded-full"
                />
              )}
            </div>

            {/* Card */}
            <div
              className={`w-full sm:max-w-md p-4 sm:p-8 rounded-2xl border border-white bg-gray-900 backdrop-blur-md 
              shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] 
              ${index % 2 === 0 ? "sm:ml-0" : "sm:mr-0"} 
              sm:ml-44 sm:mr-44 ml-8 transform transition-transform duration-300 hover:scale-105`}
            >
              {/* Header */}
              <div className="flex items-center space-x-6">
                <div className="w-24 h-16 bg-white rounded-md overflow-hidden">
                  {edu.logoUrl && (
                    <img
                      src={edu.logoUrl}
                      alt={edu.institute}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {edu.degree}
                  </h3>
                  <h4 className="text-sm text-gray-300">
                    {edu.institute}
                    {edu.location && `, ${edu.location}`}
                  </h4>
                  <p className="text-sm text-gray-500 mt-2">
                    {edu.startDate
                      ? new Date(edu.startDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                        })
                      : ""}{" "}
                    -{" "}
                    {edu.endDate
                      ? new Date(edu.endDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                        })
                      : "Present"}
                  </p>
                </div>
              </div>

              {edu.grade && (
                <p className="mt-4 text-gray-400 font-bold">
                  Grade: {edu.grade}
                </p>
              )}

              {edu.description && (
                <p className="mt-4 text-gray-400">{edu.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
