import React, { useState } from "react";
import UploadForm from "../components/UploadForm/UploadForm";
import ImageGrid from "../components/ImageGrid/ImageGrid";
import Modal from "../components/Modal/Modal";
import Login from "../components/LogIn/Login";
import "./homeView.css";

// https://www.nikkimakeup.com/

function HomeView() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.ctrlKey && event.code === "KeyL") {
      setShowLogin(true);
    }
  };

  const handleClose = () => setShowLogin(false);

  return (
    <div className="App" tabIndex={0} onKeyDown={keyDownHandler}>
      <div className="header">
        <h1>FireGram</h1>
        <h2>Your Pictures</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <UploadForm />
      <ImageGrid setSelectedImg={setSelectedImg} />
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
      {showLogin && <Login handleClose={handleClose} />}
    </div>
  );
}

export default HomeView;
