import React from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer";
import "../index.css";
import { useNavigate } from "react-router-dom";
import EstimateForm from "./EstimateForm.jsx";
// import InlineEstimateForm from "../components/InlineEstimateForm";

export default function Home() {
  const navigate = useNavigate();

  const handleGAEvent = (eventName, label) => {
    if (window.gtag) {
      window.gtag("event", eventName, {
        event_category: "engagement",
        event_label: label,
        value: 1,
      });
    }
  };

  return (
    <main>
      <section className="hero-section">
        <EstimateForm onSuccess={() => navigate("/thank-you")} />
        <br />

        <strong>
          <ul className="trust-list">
            <h2>Trusted Tree Experts in DFW Since 2021</h2>

            <strong>
              We are a team of experienced Professionals offering top-notch tree
              services. Whether you need tree trimming, removal, or emergency
              services, we have you covered. Committed to excellence, our team
              is dedicated to providing the best service possible, ensuring your
              trees are healthy, thrive and your property remains secure.
            </strong>

            <br />
            <li>✅ Fully Licensed and Insured for Your Peace of Mind</li>
            <li>✅ 24/7 Emergency Tree Removal Services</li>
            <li>
              ✅ Flexible Payment Options: Zelle, Cash, Check, Visa, Mastercard,
              Amex
            </li>
            <li>✅ Complimentary Estimates with Transparent Pricing</li>
          </ul>
        </strong>
        <section className="featured-service">
          <h2>Need Expert Tree Removal, Trimming, or Stump Grinding?</h2>
          <p>
            We deliver same-day stump grinding and comprehensive tree care
            services across the DFW region, ensuring safety, cleanliness, and
            cost-effective solutions tailored to your needs.
          </p>
          <a href="/services#stump-grinding" className="btn-primary">
            Explore Our Services & FAQ
          </a>
        </section>

        <section id="contact" className="contact-section">
          <h2>Client Testimonials</h2>
          <blockquote>
            <h3>
              “Carlos and his team showed up on time, walked me through the
              entire process, and had the tree removed within hours. They even
              cleaned up the yard better than it was before. I’ve worked with
              other tree services in the past, but this was by far the most
              professional experience I’ve had.” — Sarah, Plano, Tx
            </h3>
          </blockquote>
          <blockquote>
            <h3>
              “We had a massive oak leaning dangerously close to our house after
              a storm. I called Best Tree Service DFW and they were out within
              the hour. The crew was calm, confident, and clearly experienced.
              They removed the tree safely I’ve already recommended them to my
              neighbors.” — Issac, Mansfield, Tx
            </h3>
          </blockquote>
          <blockquote>
            <h3>
              “I manage several commercial properties in Richardson, and Best
              Tree Service DFW is now our go-to tree service. They’re
              responsive, insured, and always leave the site spotless. Whether
              it’s trimming, removal, or emergency work — they deliver every
              time.” — Monica Property Manager, Richardson, TX{" "}
            </h3>
          </blockquote>
          <div className="contact-info">
            <h2>Contact us</h2>
            <p> For inquiries or to schedule a service, Contact us at:</p>
            <p>
              📞 <strong>Phone:</strong>{" "}
              <a
                href="tel:2149447415"
                onClick={() =>
                  handleGAEvent("phone_click", "Phone Number Click")
                }
              >
                (214)944-7415
              </a>
            </p>
            <p>
              📧 <strong>Email:</strong>{" "}
              <a
                href="mailto:Besttreeservicedfw@gmail.com"
                onClick={() => handleGAEvent("email_click", "Email Click")}
              >
                Besttreeservicedfw@gmail.com
              </a>
            </p>
            <p>
              <a
                href="https://www.facebook.com/profile.php?id=61560664231263"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (window.gtag) {
                    window.gtag("event", "click", {
                      event_category: "social",
                      event_label: "Facebook Profile Link",
                      value: 1,
                    });
                  }
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <img
                  src="/images/icons/facebook.svg"
                  alt="Facebook"
                  width="20"
                  height="20"
                  style={{ verticalAlign: "middle" }}
                />
                Connect with Us on Facebook
              </a>
            </p>

            <p>
              <strong>Location:</strong> Serving Dallas-Fort Worth and
              Surrounding Areas
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
