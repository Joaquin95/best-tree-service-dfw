import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";  
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar.jsx";
import "leaflet/dist/leaflet.css";
import ThankYou from "./pages/ThankYou";
import Services from "./pages/Services.jsx";
import Gallery from "./pages/Gallery.jsx";
import StumpGrinding from "./pages/StumpGrinding.jsx";
import TreeRemoval from "./pages/TreeRemoval.jsx";
import TreeTrimming from "./pages/TreeTrimming.jsx";
import EstimateForm from "./pages/EstimateForm.jsx";
import ServiceArea from "./pages/ServiceArea.jsx";

export default function App() {
  return (
    <BrowserRouter>
     <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/estimate" element={<EstimateForm onSuccess={() => {}} />} />
        <Route path="/service-area" element={<ServiceArea />} />
        <Route path="/services" element={<Services />} />
        <Route path="/stump-grinding" element={<StumpGrinding />} />
        <Route path="/tree-removal"   element={<TreeRemoval />} />
        <Route path="/tree-trimming"  element={<TreeTrimming />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    <Footer />
    </BrowserRouter>
  );
}
