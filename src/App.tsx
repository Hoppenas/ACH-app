import React, { useState } from "react";
import "./App.css";
import Title from "./components/Title/Title";
import UploadForm from "./components/Title/UploadForm/UploadForm";
import ImageGrid from "./components/ImageGrid/ImageGrid";
import Modal from "./components/Modal/Modal";

function App() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  return (
    <div className="App">
      <Title />
      <UploadForm />
      <ImageGrid setSelectedImg={setSelectedImg} />
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  );
}

export default App;
