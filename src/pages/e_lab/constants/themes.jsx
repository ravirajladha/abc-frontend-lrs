// themes.js
export const githubTheme = {
  base: 'vs', // This theme is based on the default light theme
  inherit: true,
  rules: [
    { token: 'comment', foreground: '888888', fontStyle: 'italic' },
    // ... add more token rules specific to GitHub theme
  ],
  colors: {
    'editor.foreground': '#333333',
    'editor.background': '#f7f7f7',
    // ... add more color settings specific to GitHub theme
  }
};
// themes.js
export const oceanicNextTheme = {
    base: 'vs-dark', // This theme is based on the default dark theme
    inherit: true,
    rules: [
      { token: 'comment', foreground: '7F9F9F', fontStyle: 'italic' },
      // ... add more token rules specific to Oceanic Next theme
    ],
    colors: {
      'editor.foreground': '#D8DEE9',
      'editor.background': '#1B2B34',
      // ... add more color settings specific to Oceanic Next theme
    }
  };
  