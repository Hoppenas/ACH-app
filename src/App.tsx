import React, { useState } from "react";
import Header from "./components/Header/Header";
import UploadForm from "./components/UploadForm/UploadForm";
import ImageGrid from "./components/ImageGrid/ImageGrid";
import Modal from "./components/Modal/Modal";
import Login from "./components/LogIn/Login";

// https://www.nikkimakeup.com/

function App() {
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
      <Header />
      <UploadForm />
      <ImageGrid setSelectedImg={setSelectedImg} />
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
      {showLogin && <Login handleClose={handleClose} />}
    </div>
  );
}

export default App;
