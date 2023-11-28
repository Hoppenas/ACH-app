import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AboutMe from "./pages/AboutMe/AboutMe";
import MakeUpPage from "./pages/MakeUpPage/MakeUpPage";
import HairPage from "./pages/Hair/HairPage";
import ContactMePage from "./pages/ContactMePage/ContactMePage";

//TODO Contact me page add contacts
//TODO Move profile picture to firebase
//TODO Check delete function
//TODO Restyle scroll bar
//TODO Gallery images one per row for mobile
//TODO Add buttons for next img on modal

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AboutMe />} />
          <Route path="about" element={<AboutMe />} />
          <Route path="makeup" element={<MakeUpPage />} />
          <Route path="hair" element={<HairPage />} />
          <Route path="contacts" element={<ContactMePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
