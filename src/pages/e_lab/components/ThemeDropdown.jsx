import React from "react";
import Select from "react-select";

import { customStyles } from "../constants/customStyles";

const allowedThemes = [
  { id: "github", label: "Light" },
  { id: "oceanic-next", label: "Dark" },
  // Add more themes with custom labels as needed
];

const ThemeDropdown = ({ handleThemeChange, theme }) => {
  // Filter the themes based on the allowedThemes array
  const filteredThemes = allowedThemes.map(({ id, label }) => ({
    label,
    value: id,
    key: id,
  }));

  return (
    <Select
      placeholder={`Select Theme`}
      options={filteredThemes}
      value={theme}
      styles={customStyles}
      onChange={handleThemeChange}
    />
  );
};

export default ThemeDropdown;
