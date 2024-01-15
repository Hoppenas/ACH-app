import { useState, useEffect } from "react";
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

//TODO: Check what can be moved to theme.ts
//TODO: FIX: logout after sesion?
//TODO: FIX: Painting overview when upload image and press cancel, image must be deleted from Storage
//TODO: REMOVE: uploadForm.css

function App() {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLogedIn(!!user);
    });
  }, [auth]);

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
