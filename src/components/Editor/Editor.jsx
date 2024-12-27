import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./Editor.scss";

const EditorBar = ({ id, name, initialValue, onChange }) => {
  // Local state for controlled component
  const [content, setContent] = useState(initialValue || "");

  const handleEditorChange = (newContent) => {
    setContent(newContent); // Update local state
    if (onChange) onChange(newContent); // Call the parent's onChange function if provided
  };

  return (
    <Editor
      className="Editor"
      id={id}
      name={name}
      value={content} // Bind value to the local state
      apiKey="qdqrf5hsllrkplvd2x0u6imudcp9wj4dz3xw9ezkm8awydo8"
      init={{
        plugins: [
          "anchor",
          "autolink",
          "charmap",
          "codesample",
          "emoticons",
          "image",
          "link",
          "lists",
          "media",
          "searchreplace",
          "table",
          "visualblocks",
          "wordcount",
          "checklist",
          "mediaembed",
          "casechange",
          "export",
          "formatpainter",
          "pageembed",
          "a11ychecker",
          "tinymcespellchecker",
          "permanentpen",
          "powerpaste",
          "advtable",
          "advcode",
          "editimage",
          "advtemplate",
          "mentions",
          "tinycomments",
          "tableofcontents",
          "footnotes",
          "mergetags",
          "autocorrect",
          "typography",
          "inlinecss",
          "markdown",
          "importword",
          "exportword",
          "exportpdf",
        ],
        toolbar: "bold italic underline strikethrough link numlist bullist",
        tinycomments_mode: "embedded",
        tinycomments_author: "Author name",
        mergetags_list: [
          { value: "First.Name", title: "First Name" },
          { value: "Email", title: "Email" },
        ],
        placeholder: "Text", // Placeholder matn
        content_style: "body { font-size: 18px;}",
      }}
      onEditorChange={handleEditorChange} // Pass the custom handler
    />
  );
};

export default EditorBar;
