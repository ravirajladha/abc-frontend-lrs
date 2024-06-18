import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleDarkMode } from '@/store/themeSlice';

const useDarkMode = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.darkMode);

  // ** Return a wrapped version of useState's setter function
  const setDarkMode = (mode) => {
    dispatch(handleDarkMode(mode));
  };

  useEffect(() => {
    // ** Get Body Tag
    const body = window.document.body;
    const classNames = {
      dark: 'dark',
      light: 'light',
    };
    // ** Check if dark mode is enabled
    if (isDark) {
      body.classList.add(classNames.dark);
      body.classList.remove(classNames.light);
    } else {
      body.classList.add(classNames.light);
      body.classList.remove(classNames.dark);
    }
  }, [isDark]);

  return [isDark, setDarkMode];
};

export default useDarkMode;
