import { loader } from "@monaco-editor/react";
import { githubTheme, oceanicNextTheme } from '../constants/themes'; // Adjust the path as necessary

const monacoThemes = {
  github: githubTheme,
  "oceanic-next": oceanicNextTheme,
  // ... other themes
};

const defineTheme = (theme) => {
  return new Promise((res, rej) => {
    loader.init().then(monaco => {
      try {
        monaco.editor.defineTheme(theme, monacoThemes[theme]);
        res();
      } catch (e) {
        console.error(e);
        rej(e);
      }
    });
  });
};

export { defineTheme };
