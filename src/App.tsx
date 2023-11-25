import React from "react";
import HomeView from "./pages/HomeView";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AboutMe from "./pages/AboutMe/AboutMe";
import MakeUpPage from "./pages/MakeUpPage/MakeUpPage";
import HairPage from "./pages/Hair/HairPage";
import ContactMePage from "./pages/ContactMePage/ContactMePage";

//TODO move upload images hook out from progressBar
//TODO add enums for gallery type: images, hair, etc
//TODO add navigation to followMeBar: instagram, facebook etc
//TODO Contact me page add contacts
//TODO Remove HomeView
//TODO Move profile picture to firebase
//TODO Chose other pic for ContactMe page
//TODO Move minWidth value to constants.tsx
//TODO Check delete function
//TODO Remove ImageGrid component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AboutMe />} />
          <Route path="about" element={<AboutMe />} />
          <Route path="makeup" element={<MakeUpPage />} />
          <Route path="hair" element={<HairPage />} />
          <Route path="home" element={<HomeView />} />
          <Route
            path="businessportraits"
            element={<div>Business portraits</div>}
          />
          <Route path="contacts" element={<ContactMePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
