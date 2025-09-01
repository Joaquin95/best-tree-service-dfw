import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ThankYou() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="thank-you">
      <h1>Thank You!</h1>
      <p>Your submission has been received.</p>
      <p>We will contact you shortly.</p>
      <p>
        Redirecting to home in <strong>5</strong> seconds…
      </p>
    </div>
  );
}
