import React, { useState ,useEffect} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles for the "snow" theme

const TextEditor = ({ initialValue = '', onContentChange }) => {
    const [content, setContent] = useState(initialValue);
    useEffect(() => {
        setContent(initialValue);
    }, [initialValue]);
    const handleChange = (content, delta, source, editor) => {
        setContent(editor.getHTML()); // Update the local state with the formatted HTML
        onContentChange(editor.getHTML()); // Pass the HTML content up to the parent component
    };

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image', 'video'],
            ['clean'],
            ['code-block']
        ]
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet',
        'link', 'image', 'video',
        'clean',
        'code-block'
    ];

    return (
        <ReactQuill 
            theme="snow"
            value={content}
            onChange={handleChange}
            modules={modules}
            formats={formats}
        />
    );
};

export default TextEditor;
