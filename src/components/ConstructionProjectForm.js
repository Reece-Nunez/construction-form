import React, { useState } from "react";
import "../index.css";

const ConstructionProjectForm = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    projectType: "Residential",
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "budget") {
      const formattedValue = formatCurrency(value);
      setFormData((prevData) => ({ ...prevData, [name]: formattedValue }));
    } else if (name === "phoneNumber") {
      const formattedPhone = formatPhoneNumber(value);
      setFormData((prevData) => ({ ...prevData, [name]: formattedPhone }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, "");

    // Format the cleaned value based on its length
    if (cleaned.length <= 3) {
      return `(${cleaned}`;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
        6,
        10
      )}`;
    }
  };

  const formatCurrency = (value) => {
    value = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    if (!value) return "";
    return `$${Number(value).toLocaleString()}`; // Format with dollar sign and commas
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.projectName)
      formErrors.projectName = "Project name is required.";
    if (!formData.budget) formErrors.budget = "Budget is required.";
    if (!formData.startDate) formErrors.startDate = "Start date is required.";
    if (!formData.contactEmail || !/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      formErrors.contactEmail = "Valid email is required.";
    }

    // Extract only digits and validate length
    const numericPhone = formData.phoneNumber.replace(/\D/g, "");
    if (numericPhone.length !== 10) {
      formErrors.phoneNumber = "Valid 10-digit phone number is required.";
    }

    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    console.log("Validation errors:", formErrors);

    if (Object.keys(formErrors).length === 0) {
      console.log("Form submitted successfully!");
      setIsSubmitted(true);

      setFormData({
        projectName: "",
        projectType: "Residential",
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

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);

      setErrors({});
    } else {
      setErrors(formErrors);
      setIsShaking(true);

      setTimeout(() => setIsShaking(false), 400);
    }
  };

  return (
    <div className="form-card">
      <div title-card>
      <h2 className="form-title">Construction Project Form</h2>
      <img alt="logo" href="/assets/images/outlaw.png" />
      </div>

      {isSubmitted && (
        <p className="success-message">Form submitted successfully!</p>
      )}

      <form onSubmit={handleSubmit}>
        <div
          className={`form-group ${
            isShaking && errors.projectName ? "error-group" : ""
          }`}
        >
          <label className="label">Project Name</label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
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
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
          </select>
        </div>

        <div
          className={`form-group ${
            isShaking && errors.budget ? "error-group" : ""
          }`}
        >
          <label className="label">Budget ($)</label>
          <input
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
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

        <div
          className={`form-group ${
            isShaking && errors.contactEmail ? "error-group" : ""
          }`}
        >
          <label className="label">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className="input"
          />
          {errors.contactEmail && (
            <p className="error">{errors.contactEmail}</p>
          )}
        </div>

        <div
          className={`form-group ${
            isShaking && errors.phoneNumber ? "error-group" : ""
          }`}
        >
          <label className="label">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="input"
          />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
        </div>

        <div className="form-group">
          <label className="label">Project Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea"
            rows="4"
          ></textarea>
        </div>

        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ConstructionProjectForm;
