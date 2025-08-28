import React from "react";
import {Link }  from "react-router-dom";
import EstimateForm from "./EstimateForm.jsx";

 <section className="fence-section">
+       <h2>Fence Installation & Repair</h2>
+       <p>
+         Enhance your property’s curb appeal and security with our professional fence services.  
+         Whether you’re looking for classic wood, low-maintenance vinyl, or durable chain-link,  
+         our certified team handles everything from precise installation to on-site repairs.  
+         We work with premium materials, offer customized designs, and ensure your fence  
+         complements your landscaping perfectly.
+       </p>
+       <ul className="fence-features">
+         <li>Custom layout & design consultation</li>
+         <li>Pressure-treated wood, vinyl, and chain-link options</li>
+         <li>Sturdy posts, concrete footings, and quality hardware</li>
+         <li>Full‐service repair & maintenance plans</li>
+         <li>VA & Military Discounts apply</li>
+       </ul>

+     </section>
export default function Fences() {
  return (
    <main className="trust-list">
      {/* Hero */}
      <header className="featured-service">
        <h2 >
          Fence Installation & Repair
        </h2>
        <p >
          Elevate your property’s security, privacy, and curb appeal with our turnkey fence solutions. From custom designs to fast repairs, our certified team ensures every job is built to last.
        </p>

    
          <h2> Premium Materials</h2>
          <p>
            Choose from treated wood, low-maintenance vinyl, or heavy-duty chain-link—all backed by warranty.
          </p>

        <div className="feature-card p-6 bg-white rounded-lg shadow-md">
          <h2 className="font-semibold text-xl mb-2">Professional Installation</h2>
          <p>
            Sturdy posts, concrete footings, and precision hardware mean your fence stands strong season after season.
          </p>
        </div>
        <div className="feature-card p-6 bg-white rounded-lg shadow-md">
          <h2 className="font-semibold text-xl mb-2">Quick Repairs & Maintenance</h2>
          <p>
            From broken slats to gate realignment, our on-site repair crew restores your fence fast and affordably.
          </p>
        </div>
        <div className="feature-card p-6 bg-white rounded-lg shadow-md">
          <h2 className="font-semibold text-xl mb-2">VA & Military Discounts</h2>
          <p>
            We honor your service with exclusive pricing on both new installations and repair work.
          </p>
        </div>
              </header>

      {/* Call to Action */}
      <h2 className="contact-section">
          Get Your Free Fence Estimate Quote         <EstimateForm /> </h2>
   
    </main>
  );
}   
