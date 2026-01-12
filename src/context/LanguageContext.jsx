import { createContext, useState, useContext, useEffect } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [isMalayalam, setIsMalayalam] = useState(
    () => JSON.parse(localStorage.getItem("isMalayalam")) || false
  );

  useEffect(() => {
    localStorage.setItem("isMalayalam", JSON.stringify(isMalayalam));
  }, [isMalayalam]);

  return (
    <LanguageContext.Provider value={{ isMalayalam, toggle: () => setIsMalayalam(!isMalayalam) }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
