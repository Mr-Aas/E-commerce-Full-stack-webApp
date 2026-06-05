import { useContext, useState, useRef, useEffect } from "react";
import { LanguageContext } from "../context/languageContext";

const options = [
    { value: "desi", label: "Aam Bhasha" },
    { value: "en", label: "English" },
    { value: "hi", label: "हिन्दी" },
];

function LanguageSelector() {
    const { lang, changeLanguage } = useContext(LanguageContext);
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const selected = options.find((o) => o.value === lang) || options[0];

    useEffect(() => {
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div ref={ref} className="relative inline-block max-w-[70px]">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex 
                items-center justify-between gap-2 px-4 py-2 rounded-xl text-sm font-medium shadow-sm   transition-all duration-200 hover:shadow-md"
                style={{
                    background: "linear-gradient(90deg, #2dd4bf, #14b8a6)",
                    borderColor: "#5a4222",
                    color: "white",
                }}
            >
                <span>{selected.label}</span>
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {open && (
                <ul
                    className="absolute z-50 mt-1 w-full rounded-lg shadow-lg overflow-hidden border animate-in fade-in slide-in-from-top-1 duration-150"
                    style={{ background: "#2a1d14", borderColor: "#5a4332" }}
                >
                    {options.map((opt) => (
                        <li
                            key={opt.value}
                            onClick={() => {
                                changeLanguage(opt.value);
                                setOpen(false);
                            }}
                            className="px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150"
                            style={{
                                color: opt.value === lang ? "#e6d2bd" : "#a89279",
                                background: opt.value === lang ? "#3b2a1d" : "transparent",
                            }}
                            onMouseEnter={(e) => {
                                if (opt.value !== lang) e.currentTarget.style.background = "#352518";
                            }}
                            onMouseLeave={(e) => {
                                if (opt.value !== lang) e.currentTarget.style.background = "transparent";
                            }}
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default LanguageSelector;