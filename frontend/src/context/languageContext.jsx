import { createContext, useState } from "react";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(
        localStorage.getItem("lang") || "en"
    );

    const changeLanguage = (newLang) => {
        setLang(newLang);
        localStorage.setItem("lang", newLang);
    };

    return (
        <LanguageContext.Provider value={{ lang, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}