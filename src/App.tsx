import React from "react";
import "./App.css";
import Title from "./components/Title/Title";
import UploadForm from "./components/Title/UploadForm/UploadForm";
import ImageGrid from "./components/ImageGrid/ImageGrid";

function App() {
  return (
    <div className="App">
      <Title />
      <UploadForm />
      <ImageGrid />
    </div>
  );
}

export default App;
