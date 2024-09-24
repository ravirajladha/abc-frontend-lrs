// import React, { useState } from "react";

// import Editor from "@monaco-editor/react";

// const CodeEditorWindow = ({ onChange, language, code, theme }) => {
//   const [value, setValue] = useState(code || "");

//   const handleEditorChange = (value) => {
//     setValue(value);
//     onChange("code", value);
//   };

//   return (
//     <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
//       <Editor
//         height="85vh"
//         width={`100%`}
//         language={language || "java"}
//         value={value}
//         theme={theme}
//         defaultValue="// some comment"
//         onChange={handleEditorChange}
//       />
//     </div>
//   );
// };
// export default CodeEditorWindow;

import React, { useRef } from "react";
import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme,fontSize }) => {
  const handleEditorChange = (value) => {
    onChange("code", value); // This line directly notifies parent component of changes
  };

  // disable copy, paste, cut, right click
  const editorRef = useRef(null);
  const onMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.updateOptions({ contextmenu: false });
    editor.focus();

    // editor.onKeyDown((event) => {
    //   const { keyCode, ctrlKey, metaKey } = event;
    //   if ((keyCode === 33 || keyCode === 52) && (metaKey || ctrlKey)) {
    //     event.preventDefault();
    //     alert("Copying, cutting, and pasting are disabled.")
    //   }}
    // )
  };
  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width="100%"
        options={{
          fontSize: fontSize || 14 // Default font size or the one passed via props
        }}
        language={language || "python"}
        value={code} // Directly using code prop here
        theme={theme}
        onChange={handleEditorChange}
        onMount={onMount}
      />
    </div>
  );
};

export default CodeEditorWindow;
