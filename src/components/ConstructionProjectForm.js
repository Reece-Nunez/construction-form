import React, { useState, useEffect } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Modal from "./Modal"; // Reusable modal component
import "../index.css"; // Using the established CSS

const ConstructionProjectForm = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    projectType: "",
    projectSubType: "",
    budget: "",
    startDate: "",
    completionDate: "",
    contactEmail: "",
    phoneNumber: "",
    description: "",
    buildingLength: "",
    buildingWidth: "",
    buildingHeight: "",
  });
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    console.log("Form data state updated: ", formData);
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.projectName) newErrors.projectName = "Project Name is required.";
    if (!formData.budget) newErrors.budget = "Budget is required.";
    if (!formData.startDate) newErrors.startDate = "Start date is required.";
    if (!formData.contactEmail.includes("@")) newErrors.contactEmail = "Invalid email format.";
    const numericPhone = formData.phoneNumber.replace(/\D/g, "");
    if (numericPhone.length !== 10) newErrors.phoneNumber = "Valid 10-digit phone number is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submission attempted.");

    if (!validateForm()) {
      console.error("Validation failed: ", errors);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    setLoading(true);
    console.log("Submitting form with data: ", formData);

    setTimeout(() => {
      setLoading(false);
      setShowSuccessModal(true);
      console.log("Form successfully submitted.");
      setFormData({
        projectName: "",
        projectType: "",
        projectSubType: "",
        budget: "",
        startDate: "",
        completionDate: "",
        contactEmail: "",
        phoneNumber: "",
        description: "",
        buildingLength: "",
        buildingWidth: "",
        buildingHeight: "",
      });
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="form-card">
      <h1 className="form-title">Construction Project Form</h1>
      <form onSubmit={handleSubmit} className={isShaking ? "error-group" : ""}>
        <div className="form-group">
          <label className="label">Project Name</label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            placeholder="Enter project name"
            className="input"
          />
          {errors.projectName && <p className="error">{errors.projectName}</p>}
        </div>

        <div className="form-group">
          <label className="label">Project Type</label>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="select"
          >
            <option value="">Select project type</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
          </select>
        </div>

        <div className="form-group">
          <label className="label">Budget</label>
          <input
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Enter project budget"
            className="input"
          />
          {errors.budget && <p className="error">{errors.budget}</p>}
        </div>

        <div className="form-group">
          <label className="label">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="input"
          />
          {errors.startDate && <p className="error">{errors.startDate}</p>}
        </div>

        <div className="form-group">
          <label className="label">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            placeholder="Enter contact email"
            className="input"
          />
          {errors.contactEmail && <p className="error">{errors.contactEmail}</p>}
        </div>

        <div className="form-group">
          <label className="label">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="input"
          />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
        </div>

        <button type="submit" className="button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {showSuccessModal && (
        <Modal onClose={() => setShowSuccessModal(false)}>
          <div className="success-modal-content">
            <AiOutlineCheckCircle size={50} color="green" />
            <p>Form submitted successfully!</p>
            <button onClick={() => setShowSuccessModal(false)} className="button">Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ConstructionProjectForm;
