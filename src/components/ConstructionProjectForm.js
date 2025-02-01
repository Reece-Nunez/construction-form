import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const ConstructionProjectForm = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    projectType: "Residential",
    budget: "",
    startDate: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Log changes to form data
  console.log("Form Data State Updated:", formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.projectName) formErrors.projectName = "Project name is required.";
    if (!formData.budget) formErrors.budget = "Budget is required.";
    if (!formData.startDate) formErrors.startDate = "Start date is required.";
    
    console.log("Validation Errors:", formErrors);
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      console.log("Form Submitted Successfully:", formData);
      setIsSubmitted(true);
      setFormData({
        projectName: "",
        projectType: "Residential",
        budget: "",
        startDate: "",
        description: "",
      });
    } else {
      setErrors(formErrors);
      console.error("Form Submission Failed:", formErrors);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-10 p-5 shadow-lg rounded-2xl">
      <CardContent>
        <h2 className="text-2xl font-bold mb-5">Construction Project Form</h2>
        {isSubmitted && <p className="text-green-500">Form submitted successfully!</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className={`border p-2 rounded w-full ${
                errors.projectName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.projectName && <p className="text-red-500 text-sm">{errors.projectName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Project Type</label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Budget ($)</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className={`border p-2 rounded w-full ${
                errors.budget ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.budget && <p className="text-red-500 text-sm">{errors.budget}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className={`border p-2 rounded w-full ${
                errors.startDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Project Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ConstructionProjectForm;
