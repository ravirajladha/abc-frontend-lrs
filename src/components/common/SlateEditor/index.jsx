import React, { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

const SlateEditor = ({ onChange }) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);

  const handleEditorChange = (newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Slate editor={editor} value={value} onChange={handleEditorChange}>
      <Editable placeholder="Enter some text..." />
    </Slate>
  );
};

export default SlateEditor;