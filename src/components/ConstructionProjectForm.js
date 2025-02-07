import React, { useState, useEffect, useRef } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Modal from "./Modal"; // Reusable modal component
import Spinner from "./Spinner"; // Loading spinner component
import axios from "axios";
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
    projectManagerName: "",
    estimatedDuration: "",
    preferredStartTime: "",
    additionalNotes: "",
    buildingLength: "",
    buildingWidth: "",
    buildingHeight: "",
    squareFootage: "",
  });
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    console.log("Form data state updated: ", formData);
  }, [formData]);

  const calculateSquareFootage = () => {
    const length = parseFloat(formData.buildingLength) || 0;
    const width = parseFloat(formData.buildingWidth) || 0;
    const squareFootage = length * width;
    setFormData((prevData) => ({
      ...prevData,
      squareFootage: squareFootage ? squareFootage.toFixed(2) : "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    console.log("Validating fields: ", formData); // Log form data to debug

    if (!formData.projectName)
      newErrors.projectName = "Project Name is required.";
    if (!formData.budget) newErrors.budget = "Budget is required.";
    if (isNaN(Number(formData.budget.replace(/[^0-9]/g, ""))))
      newErrors.budget = "Budget must be a positive number.";
    if (!formData.startDate) newErrors.startDate = "Start date is required.";
    if (!formData.completionDate)
      newErrors.completionDate = "Completion date is required.";
    if (new Date(formData.startDate) >= new Date(formData.completionDate)) {
      newErrors.completionDate =
        "Completion date must be later than the start date.";
    }
    if (!formData.contactEmail.includes("@"))
      newErrors.contactEmail = "Invalid email format.";
    const numericPhone = formData.phoneNumber.replace(/\D/g, "");
    if (numericPhone.length !== 10)
      newErrors.phoneNumber = "Valid 10-digit phone number is required.";

    console.log("Validation errors: ", newErrors); // Log validation errors

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmSubmission = async (e) => {
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
    setShowPreviewModal(false);

    try {
      const response = await axios.post(
        "https://yqa9atlz7f.execute-api.us-east-1.amazonaws.com/production/submit",
        formData
      );
      console.log("API response: ", response.data);
      setShowSuccessModal(true);
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
        projectManagerName: "",
        estimatedDuration: "",
        preferredStartTime: "",
        additionalNotes: "",
        buildingLength: "",
        buildingWidth: "",
        buildingHeight: "",
        squareFootage: "",
      });
    } catch (error) {
      console.error("Error submitting form: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviewSubmission = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.error("Validation failed: ", errors);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    calculateSquareFootage();
    setShowPreviewModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "budget") {
      formattedValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters first
      if (formattedValue)
        formattedValue = `$${Number(formattedValue).toLocaleString()}`;
    } else if (name === "phoneNumber") {
      const cleaned = value.replace(/\D/g, "");
      formattedValue =
        cleaned.length <= 3
          ? `(${cleaned}`
          : cleaned.length <= 6
          ? `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
          : `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
              6,
              10
            )}`;
    }

    setFormData((prevData) => ({ ...prevData, [name]: formattedValue }));
  };

  return (
    <div className="form-card" ref={formRef}>
      <h1 className="form-title">Construction Project Form</h1>
      <form
        onSubmit={handlePreviewSubmission}
        className={isShaking ? "error-group" : ""}
      >
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

        {formData.projectType === "Residential" && (
          <div className="form-group">
            <label className="label">Project Sub-Type</label>
            <select
              name="projectSubType"
              value={formData.projectSubType}
              onChange={handleChange}
              className="select"
              aria-label="Project Sub-Type"
            >
              <option value="">Select Residential sub-type</option>
              <option value="Single Family">Single Family</option>
              <option value="Apartment">Apartment</option>
              <option value="Modular Home">Modular Home</option>
              <option value="Condo">Condo</option>
              <option value="Townhome">Townhome</option>
              <option value="Barndominium">Barndominium</option>
            </select>
          </div>
        )}

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
          {errors.completionDate && (
            <p className="error">{errors.completionDate}</p>
          )}
        </div>

        <div className="form-group">
          <label className="label">Project Address</label>
          <input
            type="text"
            name="projectAddress"
            value={formData.projectAddress}
            onChange={handleChange}
            placeholder="123 Main Street Your City, Your State 12345"
            className="input"
            aria-label="Project Address"
            onFocus={(e) => e.target.showPicker && e.target.showPicker()}
          />
          {errors.projectAddress && (
            <p className="error">{errors.projectAddress}</p>
          )}
        </div>

        <div className="form-group">
          <label className="label">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            placeholder="Enter contact email address"
            className="input"
            aria-label="Contact Email"
          />
          {errors.contactEmail && (
            <p className="error">{errors.contactEmail}</p>
          )}
        </div>

        <div className="form-group">
          <label className="label">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter contact phone number (e.g., 123-456-7890)"
            className="input"
            aria-label="Phone Number"
          />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
        </div>

        <div className="form-group">
          <label className="label">Building Length (ft)</label>
          <input
            type="text"
            name="buildingLength"
            value={formData.buildingLength}
            onChange={handleChange}
            placeholder="Enter building length"
            className="input"
            aria-label="Building Length"
          />
        </div>

        <div className="form-group">
          <label className="label">Building Width (ft)</label>
          <input
            type="text"
            name="buildingWidth"
            value={formData.buildingWidth}
            onChange={handleChange}
            placeholder="Enter building width"
            className="input"
            aria-label="Building Width"
          />
        </div>

        <div className="form-group">
          <label className="label">Building Height (ft)</label>
          <input
            type="text"
            name="buildingHeight"
            value={formData.buildingHeight}
            onChange={handleChange}
            placeholder="Enter building height"
            className="input"
            aria-label="Building Height"
          />
        </div>

        <div className="form-group">
          <label className="label">Additional Notes</label>
          <textarea
            type="text"
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            placeholder="Any other notes you need to mention..."
            className="input"
            aria-label="Additional Notes"
          />
        </div>

        <button
          type="submit"
          className="button"
          disabled={loading}
          aria-label="Submit Form"
        >
          {loading ? <Spinner /> : "Submit"}
        </button>
      </form>

      {showPreviewModal && (
        <Modal onClose={() => setShowPreviewModal(false)}>
          <div className="preview-modal-content">
            <h2>Project Details Preview</h2>
            <p>
              <strong>Project Name:</strong> {formData.projectName}
            </p>
            <p>
              <strong>Project Type:</strong> {formData.projectType}
            </p>
            <p>
              <strong>Project Sub-Type:</strong> {formData.projectSubType}
            </p>
            <p>
              <strong>Budget:</strong> {formData.budget}
            </p>
            <p>
              <strong>Start Date:</strong> {formData.startDate}
            </p>
            <p>
              <strong>Completion Date:</strong> {formData.completionDate}
            </p>
            <p>
              <strong>Contact Email:</strong> {formData.contactEmail}
            </p>
            <p>
              <strong>Phone Number:</strong> {formData.phoneNumber}
            </p>
            <p>
              <strong>Project Address:</strong> {formData.projectAddress}
            </p>
            <p>
              <strong>Building Length:</strong> {formData.buildingLength}
            </p>
            <p>
              <strong>Building Width:</strong> {formData.buildingWidth}
            </p>
            <p>
              <strong>Building Height:</strong> {formData.buildingHeight}
            </p>
            <p>
              <strong>Square Footage:</strong> {formData.squareFootage} sq ft
            </p>
            {formData.additionalNotes && (
              <p>
                <strong>Additional Notes:</strong> {formData.additionalNotes}
              </p>
            )}
            <button onClick={handleConfirmSubmission} className="button">
              Confirm and Submit
            </button>
          </div>
        </Modal>
      )}

      {showSuccessModal && (
        <Modal onClose={() => setShowSuccessModal(false)}>
          <div className="success-modal-content">
            <AiOutlineCheckCircle size={50} color="green" />
            <p>Form submitted successfully!</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="button"
              aria-label="Close Success Modal"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ConstructionProjectForm;
