import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import "./Editor.scss"

const EditorBar = () => {
    return (
        <Editor
        id='Editor'
          apiKey='qdqrf5hsllrkplvd2x0u6imudcp9wj4dz3xw9ezkm8awydo8'
          init={{
            plugins: [
              // Core editing features
              'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
              // Your account includes a free trial of TinyMCE premium features
              // Try the most popular premium features until Jan 3, 2025:
              'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
            ],
            toolbar: 'bold italic underline strikethrough link numlist bullist',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
              { value: 'Email', title: 'Email' },
            ],
            placeholder: 'Text', // Placeholder matn
            content_style: 'body { font-size: 18px;}'
          }}
          initialValue=""
        />
      );
};

export default EditorBar;
