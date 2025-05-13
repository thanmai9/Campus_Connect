import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { gsap } from "gsap";
import "../styles/AdminStudent.css";

export default function AdminStudent() {
  const studentImage = "/images/student.png";
  const adminImage = "/images/admin.jpg";
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const tl = gsap.timeline();
  
    tl.to(".left-gray", { height: "100vh", duration: 0.7, ease: "power2.out" })
      .to(".right-gray", { height: "100vh", duration: 0.7, ease: "power2.out" }, "-=0.8")
      .from(".student-section", { x: "-100%", opacity: 0, duration: 0.7, ease: "power2.out" })
      .from(".admin-section", { x: "100%", opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.8")
      .to(".label", { opacity: 1, scale: 1.2, duration: 0.7, ease: "power2.out" })
      .to(".image-container", { y: "80px", duration: 0.7, ease: "power2.out" }, "-=0.5")
      .to(".as-navbar", { y: "0%", opacity: 1, duration: 0.7, ease: "power2.out" }, "-=0.8")
      .from(".button-left",{x:0,y:0,opacity:0,duration:0.7,ease:"power2.out"})
      .from(".button-right",{x:0,y:0,opacity:0,duration:0.7,ease:"power2.out"}, "-=0.8")
      .to(".button-left, .button-right", { opacity: 1, duration: 0.3});
  }, []);
  
  useEffect(() => {
    document.body.style.overflow = "hidden"; 
    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, []);
  

  return (
    <div className="adminStudent" style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      {/* Gray Expanding Backgrounds */}
      <div className="left-gray" style={{ position: "absolute", top: 0, left: 0, width: "50%", height: 0, backgroundColor: "gray" }}></div>
      <div className="right-gray" style={{ position: "absolute", top: 0, right: 0, width: "50%", height: 0, backgroundColor: "gray" }}></div>

      {/* Image Containers */}
      <div className="image-container" style={{ display: "flex", position: "absolute", top: 0, width: "100%", height: "calc(100vh - 80px)" }}>
        <div className="student-section" style={{ flex: 1, backgroundImage: `url(${studentImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
          <button className="button button-left" onClick={() => navigate("/Home")}>Student</button>
        </div>
        <div className="admin-section" style={{ flex: 1, backgroundImage: `url(${adminImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
          <button className="button button-right" onClick={() => navigate("/AdminHome")}>Admin</button>
        </div>
      </div>

      {/* Navbar */}
      <div className="as-navbar">
        <h2 className="asnav-title">Campus Connect</h2>
        <div className="asnav-right">
          <img src="/images/college-logo.jpeg" alt="VVIT Logo" className="logo" />
          <h2 className="assnav-title">Vasireddy Venkatadri Institute of Technology</h2>
        </div>
      </div>
    </div>
  );
}
