import React, { useState } from "react";
import "./App.css";
import Title from "./components/Title/Title";
import UploadForm from "./components/UploadForm/UploadForm";
import ImageGrid from "./components/ImageGrid/ImageGrid";
import Modal from "./components/Modal/Modal";
import Login from "./components/LogIn/Login";

function App() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.ctrlKey && event.code === "KeyL") {
      setShowLogin(true);
    }
  };
  return (
    <div className="App" tabIndex={0} onKeyDown={keyDownHandler}>
      <Title />
      <UploadForm />
      <ImageGrid setSelectedImg={setSelectedImg} />
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
      {showLogin && <Login handleClose={() => setShowLogin(false)} />}
    </div>
  );
}

export default App;
