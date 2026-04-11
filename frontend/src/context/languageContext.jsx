import { createContext, useState, useEffect } from "react";
import i18n from "i18next"; // ✅ NEW

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(
        localStorage.getItem("lang") || "en"
    );

    // ✅ Sync i18next when app loads or lang changes
    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang]);

    const changeLanguage = (newLang) => {
        setLang(newLang);
        localStorage.setItem("lang", newLang);
        i18n.changeLanguage(newLang); // ✅ immediate sync
    };

    return (
        <LanguageContext.Provider value={{ lang, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}