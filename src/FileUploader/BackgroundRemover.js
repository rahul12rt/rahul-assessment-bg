// FileUpload.js
import React, { useState } from "react";
import axios from "axios";

const BackgroundRemover = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newBackgroundFile, setNewBackgroundFile] = useState(null);
  const [removedImageUrl, setRemovedImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("white"); // Initial background color

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleNewBackgroundChange = (event) => {
    const file = event.target.files[0];
    setNewBackgroundFile(file);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        setError("No file selected");
        return;
      }

      const formData = new FormData();
      formData.append("image", selectedFile, selectedFile.name);

      const response = await axios.post(
        "http://localhost:3000/background-removal/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const resultPath = response.data.resultUrl.replace(/\\/g, "/");
      setRemovedImageUrl(resultPath);
      setNewBackgroundFile(null); // Reset new background image

      setError(null);
    } catch (error) {
      setError(
        "An error occurred while processing the image. Please try again."
      );
    }
  };

  const handleAddBackground = async () => {
    try {
      if (!newBackgroundFile) {
        setError("No new background image selected");
        return;
      }

      const formData = new FormData();
      formData.append("image", newBackgroundFile, newBackgroundFile.name);

      const response = await axios.post(
        "http://localhost:3000/background-removal/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const resultPath = response.data.resultUrl.replace(/\\/g, "/");
      setRemovedImageUrl(resultPath);

      setError(null);
    } catch (error) {
      setError(
        "An error occurred while adding the background image. Please try again."
      );
    }
  };

  const handleColorButtonClick = (color) => {
    setBackgroundColor(color);
  };

  return (
    <div>
      <h2>Remove Background</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {removedImageUrl && (
        <>
          <div>
            <button onClick={() => handleColorButtonClick("red")} className="color-picker">Red</button>
            <button onClick={() => handleColorButtonClick("blue")} className="color-picker">Blue</button>
            <button onClick={() => handleColorButtonClick("green")} className="color-picker">
              Green
            </button>
            <button onClick={() => handleColorButtonClick("yellow")} className="color-picker">
              Yellow
            </button>
            <button onClick={() => handleColorButtonClick("purple")} className="color-picker">
              Purple
            </button>
            <button onClick={() => handleColorButtonClick("orange")} className="color-picker">
              Orange
            </button>
          </div>
          <div>
            <h2>Processed Image:</h2>
            <div style={{ backgroundColor}}>
              <img
                src={removedImageUrl}
                alt="Removed"
                style={{ maxWidth: "100%" }}
              />
            </div>
          </div>
        </>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default BackgroundRemover;
