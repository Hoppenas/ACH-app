import React from "react";
import HomeView from "./pages/HomeView";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AboutMe from "./pages/AboutMe/AboutMe";
import MakeUpPage from "./pages/MakeUpPage/MakeUpPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeView />} />
          <Route path="about" element={<AboutMe />} />
          <Route path="makeup" element={<MakeUpPage />} />
          <Route path="hair" element={<div>Hair</div>} />
          <Route
            path="businessportraits"
            element={<div>Business portraits</div>}
          />
          <Route path="contacts" element={<div>Contacts</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
