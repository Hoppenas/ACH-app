import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AboutMe from "./pages/AboutMe/AboutMe";
import PaintingsPage from "./pages/Paintings/PaintingsPage";
import ContactMePage from "./pages/ContactMePage/ContactMePage";
import ServicesPage from "./pages/Services/Services";
import PortfolioPage from "./pages/PortfolioPage/PortfolioPage";
import LoginPage from "./pages/Login/Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import PaintingOverview from "./pages/PaintingOverview/PaintingOverview";

//TODO Move profile picture to firebase
//TODO Gallery images one per row for mobile
//TODO UI for painting page

//https://ubaimutl.github.io/react-portfolio/

function App() {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    setIsLogedIn(!!user);
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout isLogedIn={isLogedIn} />}>
          <Route index element={<AboutMe />} />
          <Route path="about" element={<AboutMe />} />
          <Route path="services" element={<ServicesPage />} />
          <Route
            path="portfolio"
            element={<PortfolioPage isLogedIn={isLogedIn} />}
          />
          <Route
            path="paintings"
            element={<PaintingsPage isLogedIn={isLogedIn} />}
          />
          <Route
            path="paintings/:paintingId/overview"
            element={<PaintingOverview isLogedIn={isLogedIn} />}
          />
          <Route path="contacts" element={<ContactMePage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
