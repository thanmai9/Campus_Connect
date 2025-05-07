import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    rollno: "",
    email: "",
    phone: "",
    year: "",
    section: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, branch, rollno, email, phone, year, section, password, confirmPassword } = formData;

    if (!name || !branch || !rollno || !email || !phone || !year || !section || !password || !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await toast.promise(
        axios.post("${process.env.REACT_APP_API_BASE_URL}/api/users/register", formData),
                {
          pending: "Registering your account...",
          success: "Registration successful! Redirecting to login...",
          error: "Something went wrong! Please try again.",
        }
      );
      setTimeout(() => navigate("/LoginPage"), 3000);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f4f4f9",
        minHeight: "100vh",
        padding: "20px",
        overflow: "hidden", 
      }}
    >
      <h1 style={{ color: "black", marginBottom: "20px" }}>Register Page</h1>
      <ToastContainer position="top-right" autoClose={3000} />
      <div
        style={{
          width: "80%",
          maxWidth: "800px",
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 40px" }}>
          {[
            { label: "Name", name: "name", type: "text" },
            { label: "Branch", name: "branch", type: "text" },
            { label: "Roll No", name: "rollno", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone", name: "phone", type: "tel" },
          ].map((field, index) => (
            <div key={index} style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontWeight: "bold", marginBottom: "5px" }}>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                style={{ padding: "10px", border: "1px solid #d57465", borderRadius: "5px", fontSize: "16px" }}
              />
            </div>
          ))}

          {/* Year Dropdown */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontWeight: "bold", marginBottom: "5px" }}>Year</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              style={{ padding: "10px", borderRadius: "5px", fontSize: "16px", border: "1px solid #d57465" }}
            >
              <option value="" disabled>Select Year</option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
            </select>
          </div>

          {/* Section Dropdown */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontWeight: "bold", marginBottom: "5px" }}>Section</label>
            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
              required
              style={{ padding: "10px", borderRadius: "5px", fontSize: "16px", border: "1px solid #d57465" }}
            >
              <option value="" disabled>Select Section</option>
              {["A", "B", "C", "D", "E", "F", "G", "H"].map((sec) => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>

          {/* Password Fields */}
          {[
            { label: "Password", name: "password", show: showPassword, setShow: setShowPassword },
            { label: "Confirm Password", name: "confirmPassword", show: showConfirmPassword, setShow: setShowConfirmPassword },
          ].map((field, index) => (
            <div key={index} style={{ display: "flex", flexDirection: "column", position: "relative" }}>
              <label style={{ fontWeight: "bold", marginBottom: "5px" }}>{field.label}</label>
              <div style={{ position: "relative" }}>
                <input
                  type={field.show ? "text" : "password"}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  style={{ width: "97%", padding: "10px", border: "1px solid #d57465", borderRadius: "5px", fontSize: "16px", paddingRight: "4px" }}
                />
                <span
                  onClick={() => field.setShow(!field.show)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#d57465",
                    transition: "color 0.3s ease",
                  }}
                  onMouseOver={(e) => e.target.style.color = "black"}
                  onMouseOut={(e) => e.target.style.color = "#d57465"}
                >
                  {field.show ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <div style={{ gridColumn: "span 2", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10px" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "#d57465",
                color: "white",
                padding: "14px 24px",
                borderRadius: "8px",
                fontSize: "18px",
                cursor: "pointer",
                border: "none",
                width: "80%",
                fontWeight: "bold",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "black"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#d57465"}
            >
              Register
            </button>

            <p style={{ marginTop: "15px", fontSize: "16px" }}>
              Already have an account?{" "}
              <span onClick={() => navigate("/LoginPage")} style={{ color: "#d57465", cursor: "pointer", fontWeight: "bold" }}>
                Login now
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
