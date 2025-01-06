import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "./imgUpload.scss";

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  // Fayllarni qo'shish funksiyasi
  const onDrop = (acceptedFiles) => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

    // Yangi fayllarni filtrlaymiz
    const validFiles = acceptedFiles.filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        alert(`${file.name} hajmi 5 MB dan katta!`);
        return false;
      }
      return true;
    });

    // Maksimal fayllar sonini tekshirish
    if (images.length + validFiles.length > 4) {
      alert("Maksimal 4 ta rasm yuklash mumkin!");
      return;
    }

    const newImages = validFiles.map((file) => {
      Object.assign(file, { preview: URL.createObjectURL(file) })
      console.log(file)     
    });
    setImages((prevImages) => [...prevImages, ...newImages]); // Rasmlarni qo'shamiz
    setIsDragging(false); // Rasm qo'shilgandan keyin holatni tiklaymiz
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    accept: "image/png, image/jpeg, image/gif",
    multiple: true,
  });

  // Rasm o'chirish funksiyasi
  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Muqova qilish funksiyasi
  const handleSetAsCover = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      const [selectedImage] = updatedImages.splice(index, 1);
      updatedImages.unshift(selectedImage);
      return updatedImages;
    });
  };

  return (
    <div>
      {/* Drag-and-Drop joyi */}
      <div
        {...getRootProps()}
        className={`upload-image-container ${isDragging ? "dragging" : ""}`}
      >
        <input {...getInputProps()} />
        <div style={{display: 'flex', alignItems: 'center', justifyContent: "center", flexDirection: "column"}}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 22.5L10.4519 15.0481C11.7211 13.7789 13.7789 13.7789 15.0481 15.0481L22.5 22.5M19.25 19.25L21.8269 16.6731C23.0961 15.4039 25.1539 15.4039 26.4231 16.6731L29 19.25M19.25 9.5H19.2663M6.25 29H25.75C27.5449 29 29 27.5449 29 25.75V6.25C29 4.45507 27.5449 3 25.75 3H6.25C4.45507 3 3 4.45507 3 6.25V25.75C3 27.5449 4.45507 29 6.25 29Z"
              stroke="#41A58D"
              stroke-width="2.67"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p>
            <span>Upload a file</span> <span>or drag and drop</span>{" "}
            <span>PNG, JPG, GIF upto 5MB</span>
          </p>
        </div>
      </div>

      {/* Yuklangan rasmlar */}
      <div id="loaded-img">
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image.preview} alt="preview" />
            <button onClick={() => handleRemoveImage(index)}>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.5 2.5L2.5 9.5M9.5 9.5L2.5 2.5"
                  stroke="#757575"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </button>
            {index === 0 ? (
              <span className="cover-label">
                <svg
                  width="12"
                  height="11"
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.23364 5.94117L3.91042 5.55969L3.91042 5.55969L4.23364 5.94117ZM4.26005 5.91589L3.90381 5.56504L3.90341 5.56544L4.26005 5.91589ZM3.14919 6.86003L2.82596 6.47855L2.82596 6.47855L3.14919 6.86003ZM3.08978 6.92258L3.50019 7.20818L3.50019 7.20818L3.08978 6.92258ZM8.84646 5.97956L8.5002 6.34026L8.84646 5.97956ZM7.92091 5.09103L7.57464 5.45172L7.57464 5.45172L7.92091 5.09103ZM7.57719 5.08861L7.23603 4.72308L7.23477 4.72427L7.57719 5.08861ZM5.86283 6.69986L6.20399 7.06539L6.20526 7.0642L5.86283 6.69986ZM5.51383 6.69224L5.15585 7.04131L5.15656 7.04204L5.51383 6.69224ZM5.50933 6.68762L5.151 7.03634L5.15134 7.03669L5.50933 6.68762ZM5.48483 6.66384L5.81219 6.2859L5.81219 6.2859L5.48483 6.66384ZM4.64967 5.94045L4.97703 5.56252L4.97703 5.56251L4.64967 5.94045ZM4.62507 5.91656L4.98352 5.56797L4.98318 5.56762L4.62507 5.91656ZM4.62067 5.91205L4.97878 5.5631L4.9781 5.56241L4.62067 5.91205ZM4.26479 5.91107L3.90926 5.5595L3.90855 5.56022L4.26479 5.91107ZM8.15996 2.79985V2.29985C7.88382 2.29985 7.65996 2.52371 7.65996 2.79985H8.15996ZM8.33155 2.79985H8.83155C8.83155 2.52371 8.60769 2.29985 8.33155 2.29985V2.79985ZM8.33155 2.94516V3.44516C8.60769 3.44516 8.83155 3.22131 8.83155 2.94516H8.33155ZM8.15996 2.94516H7.65996C7.65996 3.22131 7.88382 3.44516 8.15996 3.44516V2.94516ZM0.700195 2.49995V8.49995H1.7002V2.49995H0.700195ZM3.0002 10.8H9.0002V9.79995H3.0002V10.8ZM11.3002 8.49995V2.49995H10.3002V8.49995H11.3002ZM9.0002 0.199951H3.0002V1.19995H9.0002V0.199951ZM11.3002 2.49995C11.3002 1.2297 10.2705 0.199951 9.0002 0.199951V1.19995C9.71817 1.19995 10.3002 1.78198 10.3002 2.49995H11.3002ZM9.0002 10.8C10.2705 10.8 11.3002 9.77021 11.3002 8.49995H10.3002C10.3002 9.21792 9.71817 9.79995 9.0002 9.79995V10.8ZM0.700195 8.49995C0.700195 9.77021 1.72994 10.8 3.0002 10.8V9.79995C2.28223 9.79995 1.7002 9.21792 1.7002 8.49995H0.700195ZM1.7002 2.49995C1.7002 1.78198 2.28223 1.19995 3.0002 1.19995V0.199951C1.72994 0.199951 0.700195 1.2297 0.700195 2.49995H1.7002ZM4.55686 6.32265C4.58648 6.29756 4.61083 6.27228 4.61668 6.26633L3.90341 5.56544C3.90111 5.56778 3.89997 5.56894 3.89899 5.56993C3.89812 5.5708 3.89809 5.57083 3.89857 5.57036C3.89941 5.56954 3.90369 5.56539 3.91042 5.55969L4.55686 6.32265ZM3.47242 7.24151L4.55687 6.32265L3.91042 5.55969L2.82596 6.47855L3.47242 7.24151ZM3.50019 7.20818C3.49001 7.2228 3.48108 7.23263 3.47622 7.23763C3.47153 7.24247 3.46939 7.24407 3.47242 7.2415L2.82596 6.47855C2.78958 6.50938 2.73158 6.56197 2.67938 6.63698L3.50019 7.20818ZM3.5002 7.20817L3.50019 7.20818L2.67938 6.63698C2.56312 6.80404 2.5002 7.00326 2.5002 7.20817H3.5002ZM3.5002 8.24995V7.20817H2.5002V8.24995H3.5002ZM3.2502 7.99995C3.38827 7.99995 3.5002 8.11188 3.5002 8.24995H2.5002C2.5002 8.66417 2.83598 8.99995 3.2502 8.99995V7.99995ZM8.75019 7.99995H3.2502V8.99995H8.75019V7.99995ZM8.5002 8.24995C8.5002 8.11188 8.61212 7.99995 8.75019 7.99995V8.99995C9.16441 8.99995 9.50019 8.66417 9.50019 8.24995H8.5002ZM8.5002 6.34026V8.24995H9.50019V6.34026H8.5002ZM8.5002 6.34026H9.50019C9.50019 6.06796 9.38916 5.80744 9.19273 5.61887L8.5002 6.34026ZM7.57464 5.45172L8.5002 6.34026L9.19273 5.61887L8.26717 4.73034L7.57464 5.45172ZM7.91835 5.45414C7.82131 5.54471 7.6704 5.54365 7.57464 5.45172L8.26717 4.73034C7.9799 4.45455 7.52716 4.45137 7.23604 4.72309L7.91835 5.45414ZM6.20526 7.0642L7.91962 5.45295L7.23477 4.72427L5.5204 6.33552L6.20526 7.0642ZM5.15656 7.04204C5.43884 7.33035 5.90388 7.3455 6.20399 7.06539L5.52167 6.33434C5.62185 6.24084 5.77672 6.24605 5.8711 6.34244L5.15656 7.04204ZM5.15134 7.03669L5.15585 7.04131L5.87181 6.34317L5.86731 6.33855L5.15134 7.03669ZM5.15747 7.04177C5.15124 7.03638 5.14727 7.03248 5.14649 7.03172C5.14605 7.03128 5.14609 7.03131 5.14689 7.03213C5.14781 7.03306 5.14887 7.03414 5.151 7.03634L5.86765 6.3389C5.86223 6.33333 5.83959 6.30963 5.81219 6.2859L5.15747 7.04177ZM4.32231 6.31839L5.15747 7.04178L5.81219 6.2859L4.97703 5.56252L4.32231 6.31839ZM4.26663 6.26516C4.27209 6.27077 4.2948 6.29457 4.32231 6.31839L4.97703 5.56251C4.98327 5.56792 4.98726 5.57184 4.98804 5.57261C4.98849 5.57305 4.98845 5.57302 4.98764 5.5722C4.98673 5.57127 4.98566 5.57018 4.98352 5.56797L4.26663 6.26516ZM4.26256 6.26099L4.26697 6.2655L4.98318 5.56762L4.97878 5.5631L4.26256 6.26099ZM4.62032 6.26263C4.52172 6.36235 4.36143 6.36206 4.26324 6.26168L4.9781 5.56241C4.6853 5.26308 4.20331 5.26214 3.90926 5.5595L4.62032 6.26263ZM4.61629 6.26673L4.62103 6.26191L3.90855 5.56022L3.90381 5.56504L4.61629 6.26673ZM8.15996 3.29985H8.33155V2.29985H8.15996V3.29985ZM7.83155 2.79985V2.94516H8.83155V2.79985H7.83155ZM8.33155 2.44516H8.15996V3.44516H8.33155V2.44516ZM8.65996 2.94516V2.79985H7.65996V2.94516H8.65996Z"
                    fill="white"
                  />
                </svg>
                Muqova
              </span>
            ) : (
              <span
                className="set-cover"
                onClick={() => handleSetAsCover(index)}
              >
                <svg
                  width="12"
                  height="11"
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.23364 5.94117L3.91042 5.55969L3.91042 5.55969L4.23364 5.94117ZM4.26005 5.91589L3.90381 5.56504L3.90341 5.56544L4.26005 5.91589ZM3.14919 6.86003L2.82596 6.47855L2.82596 6.47855L3.14919 6.86003ZM3.08978 6.92258L3.50019 7.20818L3.50019 7.20818L3.08978 6.92258ZM8.84646 5.97956L8.5002 6.34026L8.84646 5.97956ZM7.92091 5.09103L7.57464 5.45172L7.57464 5.45172L7.92091 5.09103ZM7.57719 5.08861L7.23603 4.72308L7.23477 4.72427L7.57719 5.08861ZM5.86283 6.69986L6.20399 7.06539L6.20526 7.0642L5.86283 6.69986ZM5.51383 6.69224L5.15585 7.04131L5.15656 7.04204L5.51383 6.69224ZM5.50933 6.68762L5.151 7.03634L5.15134 7.03669L5.50933 6.68762ZM5.48483 6.66384L5.81219 6.2859L5.81219 6.2859L5.48483 6.66384ZM4.64967 5.94045L4.97703 5.56252L4.97703 5.56251L4.64967 5.94045ZM4.62507 5.91656L4.98352 5.56797L4.98318 5.56762L4.62507 5.91656ZM4.62067 5.91205L4.97878 5.5631L4.9781 5.56241L4.62067 5.91205ZM4.26479 5.91107L3.90926 5.5595L3.90855 5.56022L4.26479 5.91107ZM8.15996 2.79985V2.29985C7.88382 2.29985 7.65996 2.52371 7.65996 2.79985H8.15996ZM8.33155 2.79985H8.83155C8.83155 2.52371 8.60769 2.29985 8.33155 2.29985V2.79985ZM8.33155 2.94516V3.44516C8.60769 3.44516 8.83155 3.22131 8.83155 2.94516H8.33155ZM8.15996 2.94516H7.65996C7.65996 3.22131 7.88382 3.44516 8.15996 3.44516V2.94516ZM0.700195 2.49995V8.49995H1.7002V2.49995H0.700195ZM3.0002 10.8H9.0002V9.79995H3.0002V10.8ZM11.3002 8.49995V2.49995H10.3002V8.49995H11.3002ZM9.0002 0.199951H3.0002V1.19995H9.0002V0.199951ZM11.3002 2.49995C11.3002 1.2297 10.2705 0.199951 9.0002 0.199951V1.19995C9.71817 1.19995 10.3002 1.78198 10.3002 2.49995H11.3002ZM9.0002 10.8C10.2705 10.8 11.3002 9.77021 11.3002 8.49995H10.3002C10.3002 9.21792 9.71817 9.79995 9.0002 9.79995V10.8ZM0.700195 8.49995C0.700195 9.77021 1.72994 10.8 3.0002 10.8V9.79995C2.28223 9.79995 1.7002 9.21792 1.7002 8.49995H0.700195ZM1.7002 2.49995C1.7002 1.78198 2.28223 1.19995 3.0002 1.19995V0.199951C1.72994 0.199951 0.700195 1.2297 0.700195 2.49995H1.7002ZM4.55686 6.32265C4.58648 6.29756 4.61083 6.27228 4.61668 6.26633L3.90341 5.56544C3.90111 5.56778 3.89997 5.56894 3.89899 5.56993C3.89812 5.5708 3.89809 5.57083 3.89857 5.57036C3.89941 5.56954 3.90369 5.56539 3.91042 5.55969L4.55686 6.32265ZM3.47242 7.24151L4.55687 6.32265L3.91042 5.55969L2.82596 6.47855L3.47242 7.24151ZM3.50019 7.20818C3.49001 7.2228 3.48108 7.23263 3.47622 7.23763C3.47153 7.24247 3.46939 7.24407 3.47242 7.2415L2.82596 6.47855C2.78958 6.50938 2.73158 6.56197 2.67938 6.63698L3.50019 7.20818ZM3.5002 7.20817L3.50019 7.20818L2.67938 6.63698C2.56312 6.80404 2.5002 7.00326 2.5002 7.20817H3.5002ZM3.5002 8.24995V7.20817H2.5002V8.24995H3.5002ZM3.2502 7.99995C3.38827 7.99995 3.5002 8.11188 3.5002 8.24995H2.5002C2.5002 8.66417 2.83598 8.99995 3.2502 8.99995V7.99995ZM8.75019 7.99995H3.2502V8.99995H8.75019V7.99995ZM8.5002 8.24995C8.5002 8.11188 8.61212 7.99995 8.75019 7.99995V8.99995C9.16441 8.99995 9.50019 8.66417 9.50019 8.24995H8.5002ZM8.5002 6.34026V8.24995H9.50019V6.34026H8.5002ZM8.5002 6.34026H9.50019C9.50019 6.06796 9.38916 5.80744 9.19273 5.61887L8.5002 6.34026ZM7.57464 5.45172L8.5002 6.34026L9.19273 5.61887L8.26717 4.73034L7.57464 5.45172ZM7.91835 5.45414C7.82131 5.54471 7.6704 5.54365 7.57464 5.45172L8.26717 4.73034C7.9799 4.45455 7.52716 4.45137 7.23604 4.72309L7.91835 5.45414ZM6.20526 7.0642L7.91962 5.45295L7.23477 4.72427L5.5204 6.33552L6.20526 7.0642ZM5.15656 7.04204C5.43884 7.33035 5.90388 7.3455 6.20399 7.06539L5.52167 6.33434C5.62185 6.24084 5.77672 6.24605 5.8711 6.34244L5.15656 7.04204ZM5.15134 7.03669L5.15585 7.04131L5.87181 6.34317L5.86731 6.33855L5.15134 7.03669ZM5.15747 7.04177C5.15124 7.03638 5.14727 7.03248 5.14649 7.03172C5.14605 7.03128 5.14609 7.03131 5.14689 7.03213C5.14781 7.03306 5.14887 7.03414 5.151 7.03634L5.86765 6.3389C5.86223 6.33333 5.83959 6.30963 5.81219 6.2859L5.15747 7.04177ZM4.32231 6.31839L5.15747 7.04178L5.81219 6.2859L4.97703 5.56252L4.32231 6.31839ZM4.26663 6.26516C4.27209 6.27077 4.2948 6.29457 4.32231 6.31839L4.97703 5.56251C4.98327 5.56792 4.98726 5.57184 4.98804 5.57261C4.98849 5.57305 4.98845 5.57302 4.98764 5.5722C4.98673 5.57127 4.98566 5.57018 4.98352 5.56797L4.26663 6.26516ZM4.26256 6.26099L4.26697 6.2655L4.98318 5.56762L4.97878 5.5631L4.26256 6.26099ZM4.62032 6.26263C4.52172 6.36235 4.36143 6.36206 4.26324 6.26168L4.9781 5.56241C4.6853 5.26308 4.20331 5.26214 3.90926 5.5595L4.62032 6.26263ZM4.61629 6.26673L4.62103 6.26191L3.90855 5.56022L3.90381 5.56504L4.61629 6.26673ZM8.15996 3.29985H8.33155V2.29985H8.15996V3.29985ZM7.83155 2.79985V2.94516H8.83155V2.79985H7.83155ZM8.33155 2.44516H8.15996V3.44516H8.33155V2.44516ZM8.65996 2.94516V2.79985H7.65996V2.94516H8.65996Z"
                    fill="white"
                  />
                </svg>
                Muqova qilish
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
