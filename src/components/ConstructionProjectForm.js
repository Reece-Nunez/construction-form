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
    projectAddress: "",
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
    if (isNaN(Number(formData.budget.replace(/[^0-9]/g, '')))) newErrors.budget = "Budget must be a positive number.";
    if (!formData.startDate) newErrors.startDate = "Start date is required.";
    if (!formData.completionDate) newErrors.completionDate = "Completion date is required.";
    if (new Date(formData.startDate) >= new Date(formData.completionDate)) {
      newErrors.completionDate = "Completion date must be later than the start date.";
    }
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
        projectAddress: "",
        description: "",
        buildingLength: "",
        buildingWidth: "",
        buildingHeight: "",
      });
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "budget") {
      formattedValue = `$${Number(value.replace(/[^0-9]/g, "")).toLocaleString()}`;
    } else if (name === "phoneNumber") {
      const cleaned = value.replace(/\D/g, "");
      formattedValue = cleaned.length <= 3
        ? `(${cleaned}`
        : cleaned.length <= 6
        ? `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
        : `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }

    setFormData((prevData) => ({ ...prevData, [name]: formattedValue }));
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
            placeholder="Enter Your Name or Project Name"
            className="input"
            aria-label="Project Name"
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
            aria-label="Project Type"
          >
            <option value="">Select project type</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
          </select>
        </div>

        <div className="form-group">
          <label className="label">Project Sub-Type</label>
          <select
            name="projectSubType"
            value={formData.projectSubType}
            onChange={handleChange}
            className="select"
            aria-label="Project Sub-Type"
          >
            <option value="">Select project sub-type</option>
            <option value="Single Family">Single Family</option>
            <option value="Apartment">Apartment</option>
            <option value="Modular Home">Modular Home</option>
            <option value="Condo">Condo</option>
            <option value="Townhome">Townhome</option>
            <option value="Barndominium">Barndominium</option>
          </select>
        </div>

        <div className="form-group">
          <label className="label">Budget</label>
          <input
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Enter project budget (e.g., $100,000)"
            className="input"
            aria-label="Project Budget"
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
            aria-label="Start Date"
            onFocus={(e) => e.target.showPicker && e.target.showPicker()}
          />
          {errors.startDate && <p className="error">{errors.startDate}</p>}
        </div>

        <div className="form-group">
          <label className="label">Completion Date</label>
          <input
            type="date"
            name="completionDate"
            value={formData.completionDate}
            onChange={handleChange}
            className="input"
            aria-label="Completion Date"
            onFocus={(e) => e.target.showPicker && e.target.showPicker()}
          />
          {errors.completionDate && <p className="error">{errors.completionDate}</p>}
        </div>

        <div className="form-group">
          <label className="label">Project Address</label>
          <input
            type="text"
            name="projectAddress"
            value={formData.projectAddress}
            onChange={handleChange}
            placeholder="Enter project address"
            className="input"
            aria-label="Project Address"
          />
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
            aria-label="Contact Email"
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
            placeholder="Enter phone number (e.g., (123) 456-7890)"
            className="input"
            aria-label="Phone Number"
          />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
        </div>

        <button type="submit" className="button" disabled={loading} aria-label="Submit Form">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {showSuccessModal && (
        <Modal onClose={() => setShowSuccessModal(false)}>
          <div className="success-modal-content">
            <AiOutlineCheckCircle size={50} color="green" />
            <p>Form submitted successfully!</p>
            <button onClick={() => setShowSuccessModal(false)} className="button" aria-label="Close Success Modal">Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ConstructionProjectForm;
