import { BrowserRouter, Routes, Route, useLocation
 } from "react-router-dom";
import React from "react";  
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar.jsx";
import "leaflet/dist/leaflet.css";
import ThankYou from "./pages/ThankYou.jsx";
import Services from "./pages/Services.jsx";
import Gallery from "./pages/Gallery.jsx";
import StumpGrinding from "./pages/StumpGrinding.jsx";
import TreeRemoval from "./pages/TreeRemoval.jsx";
import TreeTrimming from "./pages/TreeTrimming.jsx";
import EstimateForm from "./pages/EstimateForm.jsx";
import ServiceArea from "./pages/ServiceArea.jsx";
import Fences from "./pages/Fences.jsx";
import { useEffect } from "react";

function RouteChangeTracker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}


export default function App() {
  return (
    <BrowserRouter>
      <RouteChangeTracker />

     <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/estimate" element={<EstimateForm onSuccess={() => {}} />} />
        <Route path="/service-area" element={<ServiceArea />} />
        <Route path="/services" element={<Services />} />
        <Route path="/fences" element={<Fences />} />
        <Route path="/stump-grinding" element={<StumpGrinding />} />
        <Route path="/tree-removal"   element={<TreeRemoval />} />
        <Route path="/tree-trimming"  element={<TreeTrimming />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    <Footer />
    </BrowserRouter>
  );
}
