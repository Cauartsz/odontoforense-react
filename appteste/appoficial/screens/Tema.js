// screens/Tema.js
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const theme = {
    isDarkMode,
    toggleTheme,
    backgroundColor: isDarkMode ? '#121212' : '#ffffff',
    textColor: isDarkMode ? '#ffffff' : '#000000',
    boxBackground: isDarkMode ? '#1e1e1e' : '#e0e0e0',
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
