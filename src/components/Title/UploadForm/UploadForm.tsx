import React from "react";

const UploadForm: React.FC = () => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let selected = e.target.files;
    console.log(selected);
  };

  return (
    <form>
      <input type="file" onChange={changeHandler} />
    </form>
  );
};

export default UploadForm;
