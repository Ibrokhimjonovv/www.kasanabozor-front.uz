import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./Editor.scss";

const EditorBar = ({ id, name, initialValue = "", onChange }) => {
  const [content, setContent] = useState(initialValue);
  useEffect(() => {
    setContent(initialValue);
  }, [initialValue]);
  const handleEditorChange = (newContent) => {
    setContent(newContent);
    if (onChange) onChange(newContent); 
  };
  return (
    <Editor
      className="Editor"
      id={id}
      name={name}
      value={content}
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
        placeholder: "Text...",
        content_style: "body { font-size: 18px; }",
      }}
      onEditorChange={handleEditorChange} 
    />
  );
};

export default EditorBar;
