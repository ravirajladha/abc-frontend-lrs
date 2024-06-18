import React from 'react';

function DarkButton() {
  let clickedClass = 'clicked';
  const body = document.body;
  const lightTheme = 'theme-light';
  const darkTheme = 'theme-dark';

  let theme;

  if (localStorage) {
    theme = localStorage.getItem('theme');
  }

  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme);
  } else {
    body.classList.add(lightTheme);
  }

  const switchTheme = (e) => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme);
      e.target.classList.remove(clickedClass);
      localStorage.setItem('theme', 'theme-light');
      theme = lightTheme;
    } else {
      body.classList.replace(lightTheme, darkTheme);
      e.target.classList.add(clickedClass);
      localStorage.setItem('theme', 'theme-dark');
      theme = darkTheme;
    }
  };
  return (
    <li className={'nav-item dropdown '}>
      <span
        className={`navi-link  cursor-pointer ${
          theme === 'dark' ? clickedClass : ''
        }`}
        onClick={(e) => switchTheme(e)}
      >
        <i className={`feather-moon`}></i>
      </span>
    </li>
  );
}

export default DarkButton;
