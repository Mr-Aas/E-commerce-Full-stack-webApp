import { Search, Loader2, X, Package, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const navigate = useNavigate();
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);

    // 🔥 Debounce
    useEffect(() => {
        const delay = setTimeout(() => {
            if (query.trim()) {
                fetchResults();
            } else {
                setResults([]);
                setLoading(false);
            }
        }, 400);

        return () => clearTimeout(delay);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClick = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    // Keyboard shortcut: "/" focuses the input
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, []);

    const fetchResults = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/products/search?q=${query}`);
            setResults(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (query.trim()) {
            setFocused(false);
            navigate(`/search?q=${query}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (activeIndex >= 0 && results[activeIndex]) {
                navigate(`/product/${results[activeIndex]._id}`);
                setFocused(false);
            } else {
                handleSearch();
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => Math.min(i + 1, results.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, -1));
        } else if (e.key === "Escape") {
            setFocused(false);
            inputRef.current?.blur();
        }
    };

    const formatPrice = (n) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(n);

    const showDropdown = focused && query.trim().length > 0;

    return (
        <div
            ref={wrapperRef}
            className="sticky top-0 z-30 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-xl"
        >
            <div className="mx-auto flex max-w-5xl items-center px-4 py-3">
                <div className="relative w-full">
                    {/* Glow ring on focus */}
                    <div
                        className={`pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 opacity-0 blur transition duration-300 ${
                            focused ? "opacity-40" : ""
                        }`}
                    />

                    {/* INPUT */}
                    <div
                        className={`relative flex items-center gap-2 rounded-2xl border bg-white pl-4 pr-2 transition-all duration-200 ${
                            focused
                                ? "border-indigo-300 shadow-lg shadow-indigo-500/10"
                                : "border-slate-200 shadow-sm hover:border-slate-300"
                        }`}
                    >
                        <Search
                            className={`h-5 w-5 shrink-0 transition ${
                                focused ? "text-indigo-600" : "text-slate-400"
                            }`}
                        />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search products, brands & more…"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setActiveIndex(-1);
                            }}
                            onFocus={() => setFocused(true)}
                            onKeyDown={handleKeyDown}
                            className="h-12 w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none sm:text-base"
                        />

                        {/* Loading / Clear */}
                        {loading && (
                            <Loader2 className="h-4 w-4 shrink-0 animate-spin text-indigo-500" />
                        )}
                        {!loading && query && (
                            <button
                                onClick={() => {
                                    setQuery("");
                                    setResults([]);
                                    inputRef.current?.focus();
                                }}
                                className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                aria-label="Clear"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}

                        {/* Keyboard hint */}
                        {!query && !focused && (
                            <kbd className="hidden items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 sm:inline-flex">
                                /
                            </kbd>
                        )}

                        {/* Search button */}
                        <button
                            onClick={handleSearch}
                            disabled={!query.trim()}
                            className="hidden items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-2 text-xs font-bold text-white shadow-md transition hover:shadow-lg hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-40 sm:inline-flex"
                        >
                            Search
                            <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                    </div>

                    {/* RESULTS DROPDOWN */}
                    {showDropdown && (
                        <div className="absolute left-0 right-0 top-full mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/60 px-4 py-2.5">
                                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                                    <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                                    {loading
                                        ? "Searching…"
                                        : results.length > 0
                                        ? `${results.length} suggestion${results.length === 1 ? "" : "s"}`
                                        : "No matches"}
                                </div>
                                <div className="hidden items-center gap-1 text-[10px] text-slate-400 sm:flex">
                                    <kbd className="rounded border border-slate-200 bg-white px-1 py-0.5">↑</kbd>
                                    <kbd className="rounded border border-slate-200 bg-white px-1 py-0.5">↓</kbd>
                                    to navigate
                                    <kbd className="ml-1 rounded border border-slate-200 bg-white px-1 py-0.5">↵</kbd>
                                    to open
                                </div>
                            </div>

                            {/* Loading skeletons */}
                            {loading && results.length === 0 && (
                                <div className="divide-y divide-slate-100">
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <div key={i} className="flex animate-pulse items-center gap-3 p-3">
                                            <div className="h-12 w-12 rounded-lg bg-slate-100" />
                                            <div className="flex-1 space-y-2">
                                                <div className="h-3 w-2/3 rounded bg-slate-100" />
                                                <div className="h-2.5 w-1/3 rounded bg-slate-100" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Empty */}
                            {!loading && results.length === 0 && (
                                <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
                                    <div className="rounded-full bg-slate-100 p-3">
                                        <Package className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <p className="mt-3 text-sm font-medium text-slate-700">
                                        Nothing matched "{query}"
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Try a different keyword or check the spelling.
                                    </p>
                                </div>
                            )}

                            {/* Results list */}
                            {results.length > 0 && (
                                <ul className="max-h-96 overflow-y-auto">
                                    {results.map((item, idx) => (
                                        <li key={item._id}>
                                            <button
                                                onMouseEnter={() => setActiveIndex(idx)}
                                                onClick={() => {
                                                    navigate(`/product/${item._id}`);
                                                    setFocused(false);
                                                }}
                                                className={`group flex w-full items-center gap-3 px-4 py-3 text-left transition ${
                                                    activeIndex === idx
                                                        ? "bg-gradient-to-r from-indigo-50 to-fuchsia-50"
                                                        : "hover:bg-slate-50"
                                                }`}
                                            >
                                                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200">
                                                    {item.images?.[0] ? (
                                                        <img
                                                            src={item.images[0]}
                                                            alt={item.name?.en}
                                                            className="h-full w-full object-cover transition group-hover:scale-110"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-slate-300">
                                                            <Package className="h-5 w-5" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    {item.brand && (
                                                        <p className="truncate text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                                                            {item.brand}
                                                        </p>
                                                    )}
                                                    <p className="truncate text-sm font-semibold text-slate-900">
                                                        {item.name?.en}
                                                    </p>
                                                    <div className="mt-0.5 flex items-center gap-2">
                                                        <p className="text-xs font-bold text-slate-700">
                                                            {formatPrice(item.price)}
                                                        </p>
                                                        {item.category && (
                                                            <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
                                                                {item.category}
                                                            </span>
                                                        )}
                                                        {item.subcategoryType === "Perishable" && (
                                                            <span className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">
                                                                Perishable
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <ArrowRight
                                                    className={`h-4 w-4 shrink-0 transition ${
                                                        activeIndex === idx
                                                            ? "translate-x-0 text-indigo-600 opacity-100"
                                                            : "-translate-x-1 text-slate-400 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                                    }`}
                                                />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Footer: see all */}
                            {results.length > 0 && (
                                <button
                                    onClick={handleSearch}
                                    className="flex w-full items-center justify-center gap-2 border-t border-slate-100 bg-slate-50/60 px-4 py-2.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50"
                                >
                                    <TrendingUp className="h-3.5 w-3.5" />
                                    See all results for "{query}"
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchBar;
