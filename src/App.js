import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CropList from "./components/CropList";
import CropDetail from "./components/CropDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CropList />} />
        <Route path="/crop/:ipfsHash" element={<CropDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
