import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageUpload = () => {
  const [images, setImages] = useState([]);

  // Fayllarni qo'shish funksiyasi
  const onDrop = (acceptedFiles) => {
    if (images.length + acceptedFiles.length > 4) {
      alert("Maksimal 4 ta rasm yuklash mumkin!");
      return;
    }

    const newImages = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setImages((prevImages) => [...prevImages, ...newImages]); // Rasmlarni qo'shamiz
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/png, image/jpeg, image/gif",
    multiple: true,
  });

  // Rasm o'chirish funksiyasi
  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* Drag-and-Drop joyi */}
      <div
        {...getRootProps()}
        style={styles.dropArea}
      >
        <input {...getInputProps()} />
        <p>Rasm yuklash yoki drag-and-drop qiling (maksimal 4 ta)</p>
      </div>

      {/* Yuklangan rasmlar */}
      <div style={styles.imageContainer}>
        {images.map((image, index) => (
          <div key={index} style={styles.imageWrapper}>
            <img
              src={image.preview}
              alt="preview"
              style={styles.imagePreview}
            />
            <button
              onClick={() => handleRemoveImage(index)}
              style={styles.removeButton}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  dropArea: {
    border: "2px dashed #ccc",
    padding: "20px",
    textAlign: "center",
    borderRadius: "10px",
    cursor: "pointer",
  },
  imageContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
    flexWrap: "wrap",
  },
  imageWrapper: {
    position: "relative",
    width: "100px",
    height: "100px",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "8px",
  },
  removeButton: {
    position: "absolute",
    top: "5px",
    right: "5px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    cursor: "pointer",
  },
};

export default ImageUpload;
