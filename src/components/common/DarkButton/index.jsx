import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

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
    <li className={''}>
      <OverlayTrigger placement="bottom" overlay={<Tooltip>Dark Mode</Tooltip>}>
        <span
          className={`cursor-pointer ${
            theme === 'dark' ? clickedClass : ''
          }`}
          onClick={(e) => switchTheme(e)}
        >
          <i className={`feather-moon font-xl  text-white`}></i>
        </span>
      </OverlayTrigger>
    </li>
  );
}

export default DarkButton;
