import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EstimateForm from "./EstimateForm";
import "../index.css";

export default function Gallery() {


  return (
    <main>
      ;
      <section className="gallery-section">
        <h2>Our Work In Action</h2>
        <h3>
        Explore how our team delivers safe, efficient, and professional tree services — 
    from urgent removals to detailed precision trimming.
        </h3>
        <div className="gallery-grid">
          <div className="gallery-item">
            <h3>Before Tree Removal</h3>
            <img
              src="/images/Tree-Cutting.jpg"
              alt="Before Tree Removal"
            />
          </div>
          <div className="gallery-item">
            <h3>After Tree Removal</h3>
            <img
              src="/images/Tree-Cutting3.jpg"
              alt="After Tree Removal"
            />
          </div>
          <div className="gallery-item">
            {" "}
            <h3>Professional Chipper Truck</h3>
            <img src="/images/tree-cutting.jpg" alt="Chipper Truck" />
          </div>
          <div className="gallery-item">
            {" "}
            <h3>Stump Grinding Process</h3>
            <img
              src="/images/StumpGrinding.jpg"
              alt="Stump Grinder"
            />
          </div>
          <div className="gallery-item">
            {" "}
            <h3>The Team</h3>
            <img
              src="/images/"
              alt="Stump Grinder"
            />
          </div>
          {/* Add more items as needed */}
        </div>

        <section className="cta-section">
          <h3>Ready to Remove or Trim Your Trees?</h3>
          <h3>
           Request your free estimate today. Our team provides fast, reliable, and 
      professional service with no obligation.
          </h3>
          <EstimateForm />
        </section>
      </section>
    </main>
  );
}
