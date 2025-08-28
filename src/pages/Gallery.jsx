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
        <h2>Gallery</h2>
        <p>
          See our team in action — from emergency removals to precision
          trimming.
        </p>
        <div className="gallery-grid">
          <div className="gallery-item">
            <h3>Before Tree Removal</h3>
            <img
              src="/images/Emergency-tree-work.jpg"
              alt="Before Tree Removal"
            />
          </div>
          <div className="gallery-item">
            <h3>After Tree Removal</h3>
            <img
              src="/images/residential-tree-services.jpg"
              alt="After Tree Removal"
            />
          </div>
          <div className="gallery-item">
            {" "}
            <h3>Our Chipper Truck</h3>
            <img src="/images/tree-cutting.jpg" alt="Chipper Truck" />
          </div>
          <div className="gallery-item">
            {" "}
            <h3>Stump Grinding Equipment</h3>
            <img
              src="/images/Tree-trimming-from-ground.jpg"
              alt="Stump Grinder"
            />
          </div>
          {/* Add more items as needed */}
        </div>

        <section className="cta-section">
          <h3>Like what you see?</h3>
          <p>
            Get a free estimate from our team today — fast, professional, and no
            obligation.
          </p>
          <EstimateForm />
        </section>
      </section>
      <Footer />
    </main>
  );
}
