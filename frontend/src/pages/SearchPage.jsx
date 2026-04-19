import { useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/Cart/CartSlice";
import {
  Search,
  Package,
  AlertCircle,
  SlidersHorizontal,
  LayoutGrid,
  Rows3,
  Sparkles,
  ShoppingCart,
  Heart,
  Tag,
  CalendarClock,
  CheckCircle2,
  XCircle,
  Flame,
  Leaf,
  Snowflake,
  ChevronRight,
} from "lucide-react";

const SearchPage = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [activeCategory, setActiveCategory] = useState("all");
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    if (!query.trim()) return;

    const fetch = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/search?q=${query}`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [query]);

  // Derived: category facets
  const categories = useMemo(() => {
    const map = new Map();
    products.forEach((p) => {
      if (p.category) map.set(p.category, (map.get(p.category) || 0) + 1);
    });
    return Array.from(map.entries());
  }, [products]);

  // Derived: filtered + sorted
  const visible = useMemo(() => {
    let list = [...products];
    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }
    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );
        break;
      default:
        break;
    }
    return list;
  }, [products, activeCategory, sortBy]);

  const formatPrice = (n) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  const stockState = (p) => {
    if (p.isAvailable === false || (p.stock ?? 0) <= 0)
      return { tone: "rose", icon: XCircle, label: "Out of stock" };
    if ((p.stock ?? 0) < 10)
      return { tone: "amber", icon: AlertCircle, label: `Only ${p.stock} left` };
    return { tone: "emerald", icon: CheckCircle2, label: "In stock" };
  };

  const toneClasses = {
    rose: "bg-rose-50 text-rose-700 ring-rose-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  };

  const inStockCount = products.filter(
    (p) => (p.stock ?? 0) > 0 && p.isAvailable !== false
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/40">
      {/* Decorative blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="absolute top-1/2 -left-32 h-96 w-96 rounded-full bg-fuchsia-200/30 blur-3xl" />
      </div>

      {/* Hero / Search summary */}
      <header className="relative overflow-hidden border-b border-slate-200/60 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <nav className="mb-4 flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <span className="hover:text-slate-900">Home</span>
            <ChevronRight className="h-3 w-3" />
            <span className="hover:text-slate-900">Search</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-900">"{query}"</span>
          </nav>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-1 text-xs font-semibold text-white shadow-sm shadow-indigo-500/20">
                <Sparkles className="h-3 w-3" />
                Smart search
              </span>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Results for{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
                  "{query}"
                </span>
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
                    Searching the catalog…
                  </span>
                ) : (
                  <>
                    <span className="font-semibold text-slate-900">
                      {visible.length}
                    </span>{" "}
                    of {products.length} product
                    {products.length === 1 ? "" : "s"} ·{" "}
                    <span className="text-emerald-600">{inStockCount} in stock</span>
                  </>
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
                <button
                  onClick={() => setView("grid")}
                  className={`rounded-lg p-2 transition ${view === "grid"
                    ? "bg-slate-900 text-white shadow"
                    : "text-slate-500 hover:text-slate-900"
                    }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`rounded-lg p-2 transition ${view === "list"
                    ? "bg-slate-900 text-white shadow"
                    : "text-slate-500 hover:text-slate-900"
                    }`}
                  aria-label="List view"
                >
                  <Rows3 className="h-4 w-4" />
                </button>
              </div>

              <div className="relative">
                <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-9 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                >
                  <option value="relevance">Sort: Relevance</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="newest">Newest first</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar facets */}
          <aside className="lg:w-72 lg:shrink-0">
            <div className="sticky top-6 space-y-4">
              {/* Category pill */}
              <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm shadow-slate-200/40 backdrop-blur">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white">
                      <Tag className="h-3.5 w-3.5" />
                    </span>
                    Categories
                  </h3>
                  {activeCategory !== "all" && (
                    <button
                      onClick={() => setActiveCategory("all")}
                      className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="space-y-1.5">
                  <button
                    onClick={() => setActiveCategory("all")}
                    className={`group flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition ${activeCategory === "all"
                      ? "bg-gradient-to-r from-indigo-500 to-fuchsia-500 font-semibold text-white shadow-md shadow-indigo-500/30"
                      : "text-slate-600 hover:bg-slate-100"
                      }`}
                  >
                    <span>All categories</span>
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${activeCategory === "all"
                        ? "bg-white/20 text-white"
                        : "bg-slate-200 text-slate-600"
                        }`}
                    >
                      {products.length}
                    </span>
                  </button>
                  {categories.map(([cat, count]) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`group flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition ${activeCategory === cat
                        ? "bg-gradient-to-r from-indigo-500 to-fuchsia-500 font-semibold text-white shadow-md shadow-indigo-500/30"
                        : "text-slate-600 hover:bg-slate-100"
                        }`}
                    >
                      <span className="truncate">{cat}</span>
                      <span
                        className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${activeCategory === cat
                          ? "bg-white/20 text-white"
                          : "bg-slate-200 text-slate-600"
                          }`}
                      >
                        {count}
                      </span>
                    </button>
                  ))}
                  {categories.length === 0 && (
                    <p className="px-3 py-2 text-xs text-slate-400">
                      No categories yet
                    </p>
                  )}
                </div>
              </div>

              {/* Stats card */}
              <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-gradient-to-br from-slate-900 to-indigo-900 p-5 text-white shadow-lg shadow-indigo-900/20">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-200">
                  <Flame className="h-3.5 w-3.5" />
                  Catalog snapshot
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-2xl font-bold">{products.length}</p>
                    <p className="text-[11px] text-indigo-200">Matches</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{categories.length}</p>
                    <p className="text-[11px] text-indigo-200">Categories</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-emerald-300">
                      {inStockCount}
                    </p>
                    <p className="text-[11px] text-indigo-200">Available</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-rose-300">
                      {products.length - inStockCount}
                    </p>
                    <p className="text-[11px] text-indigo-200">Out</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main results */}
          <main className="flex-1">
            {/* Loading */}
            {loading && (
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
                    : "space-y-4"
                }
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <div className="aspect-[4/3] w-full rounded-xl bg-slate-100" />
                    <div className="mt-4 h-4 w-3/4 rounded bg-slate-100" />
                    <div className="mt-2 h-3 w-1/2 rounded bg-slate-100" />
                    <div className="mt-3 h-6 w-1/3 rounded bg-slate-100" />
                  </div>
                ))}
              </div>
            )}

            {/* Empty */}
            {!loading && products.length === 0 && query && (
              <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white/60 py-24 text-center backdrop-blur">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-indigo-400/30" />
                  <div className="relative rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-5 shadow-lg shadow-indigo-500/30">
                    <Search className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  No results found
                </h3>
                <p className="mt-2 max-w-sm text-sm text-slate-500">
                  We couldn't find anything matching{" "}
                  <span className="font-semibold text-slate-700">"{query}"</span>.
                  Try a different keyword or check the spelling.
                </p>
              </div>
            )}

            {/* Grid view */}
            {!loading && view === "grid" && visible.length > 0 && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {visible.map((p) => {
                  const stock = stockState(p);
                  const StockIcon = stock.icon;
                  const isHover = hovered === p._id;
                  const disabled =
                    p.isAvailable === false || (p.stock ?? 0) <= 0;
                  return (
                    <article
                      key={p._id}
                      onMouseEnter={() => setHovered(p._id)}
                      onMouseLeave={() => setHovered(null)}
                      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/10"
                    >
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                        {p.images?.[0] ? (
                          <img
                            src={p.images[0]}
                            alt={p.name?.en || "Product"}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-slate-300">
                            <Package className="h-12 w-12" />
                          </div>
                        )}

                        {/* Top-left badge */}
                        {p.subcategoryType && (
                          <span
                            className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md backdrop-blur ${p.subcategoryType === "Perishable"
                              ? "bg-amber-500/90 text-white"
                              : "bg-slate-900/80 text-white"
                              }`}
                          >
                            {p.subcategoryType === "Perishable" ? (
                              <Leaf className="h-2.5 w-2.5" />
                            ) : (
                              <Snowflake className="h-2.5 w-2.5" />
                            )}
                            {p.subcategoryType}
                          </span>
                        )}

                        {/* Heart */}
                        <button
                          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-slate-500 shadow-md backdrop-blur transition hover:scale-110 hover:text-rose-500"
                          aria-label="Save"
                        >
                          <Heart className="h-4 w-4" />
                        </button>

                        {/* Hover quick-add */}
                        <div
                          className={`absolute inset-x-3 bottom-3 transition-all duration-300 ${isHover
                            ? "translate-y-0 opacity-100"
                            : "translate-y-4 opacity-0"
                            }`}
                        >
                          <button
                            disabled={disabled}
                            onClick={() => {
                              dispatch(addToCart({
                                productId: p._id,          // ✅ REQUIRED
                                name: p.name,              // keep object (we'll handle in UI)
                                price: Number(p.price),    // ✅ ensure number
                                unitType: p.unitType || "unit",
                                image: p.images?.[0] || "",// ✅ match cart field
                                quantity: 1,
                                stock: p.stock || 1           // ✅ correct key
                              }));
                            }}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/95 py-2 text-sm font-semibold text-slate-900 shadow-lg backdrop-blur transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            Quick add
                          </button>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="flex flex-1 flex-col p-4">
                        {p.brand && (
                          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-indigo-600">
                            {p.brand}
                          </p>
                        )}
                        <h3 className="mt-1 line-clamp-1 text-base font-bold text-slate-900">
                          {p.name?.en}
                        </h3>
                        {(p.name?.hi || p.name?.desi) && (
                          <p className="mt-0.5 truncate text-xs italic text-slate-500">
                            {p.name?.hi}
                            {p.name?.hi && p.name?.desi ? " · " : ""}
                            {p.name?.desi}
                          </p>
                        )}

                        {(p.category || p.subcategory) && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {p.category && (
                              <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-medium text-indigo-700">
                                {p.category}
                              </span>
                            )}
                            {p.subcategory && (
                              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                                {p.subcategory}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="mt-3 flex items-center gap-2 text-xs">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold ring-1 ring-inset ${toneClasses[stock.tone]}`}
                          >
                            <StockIcon className="h-3 w-3" />
                            {stock.label}
                          </span>
                          {p.expiryDate && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                              <CalendarClock className="h-3 w-3" />
                              {new Date(p.expiryDate).toLocaleDateString(
                                "en-IN",
                                { day: "2-digit", month: "short" }
                              )}
                            </span>
                          )}
                        </div>

                        <div className="mt-auto flex items-end justify-between border-t border-dashed border-slate-200 pt-3">
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-slate-400">
                              Price
                            </p>
                            <p className="bg-gradient-to-r from-slate-900 to-indigo-700 bg-clip-text text-xl font-extrabold text-transparent">
                              {formatPrice(p.price)}
                              {` / ${p.unitType}`}
                            </p>
                          </div>
                          <button
                            disabled={disabled}
                            onClick={() => {
                              dispatch(addToCart({
                                productId: p._id,          // ✅ REQUIRED
                                name: p.name,              // keep object (we'll handle in UI)
                                price: Number(p.price),    // ✅ ensure number
                                unitType: p.unitType || "unit",
                                image: p.images?.[0] || "",// ✅ match cart field
                                quantity: 1              // ✅ correct key
                              }));
                            }}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white shadow-md transition hover:bg-indigo-600 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-slate-300"
                          >
                            <ShoppingCart className="h-3.5 w-3.5" />
                            Add
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* List view */}
            {!loading && view === "list" && visible.length > 0 && (
              <div className="space-y-4">
                {visible.map((p) => {
                  const stock = stockState(p);
                  const StockIcon = stock.icon;
                  const disabled =
                    p.isAvailable === false || (p.stock ?? 0) <= 0;
                  return (
                    <article
                      key={p._id}
                      className="group flex gap-5 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10"
                    >
                      <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 sm:h-44 sm:w-44">
                        {p.images?.[0] ? (
                          <img
                            src={p.images[0]}
                            alt={p.name?.en || "Product"}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-slate-300">
                            <Package className="h-10 w-10" />
                          </div>
                        )}
                        {p.subcategoryType && (
                          <span
                            className={`absolute left-2 top-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow ${p.subcategoryType === "Perishable"
                              ? "bg-amber-500/90"
                              : "bg-slate-900/80"
                              }`}
                          >
                            {p.subcategoryType === "Perishable" ? (
                              <Leaf className="h-2.5 w-2.5" />
                            ) : (
                              <Snowflake className="h-2.5 w-2.5" />
                            )}
                            {p.subcategoryType}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            {p.brand && (
                              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-indigo-600">
                                {p.brand}
                              </p>
                            )}
                            <h3 className="mt-1 text-lg font-bold text-slate-900">
                              {p.name?.en}
                            </h3>
                            {(p.name?.hi || p.name?.desi) && (
                              <p className="text-xs italic text-slate-500">
                                {p.name?.hi}
                                {p.name?.hi && p.name?.desi ? " · " : ""}
                                {p.name?.desi}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] uppercase tracking-wider text-slate-400">
                              Price
                            </p>
                            <p className="bg-gradient-to-r from-slate-900 to-indigo-700 bg-clip-text text-2xl font-extrabold text-transparent">
                              {formatPrice(p.price)}
                            </p>
                          </div>
                        </div>

                        {p.description && (
                          <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                            {p.description}
                          </p>
                        )}

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {p.category && (
                            <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-medium text-indigo-700">
                              {p.category}
                            </span>
                          )}
                          {p.subcategory && (
                            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                              {p.subcategory}
                            </span>
                          )}
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${toneClasses[stock.tone]}`}
                          >
                            <StockIcon className="h-3 w-3" />
                            {stock.label}
                          </span>
                          {p.expiryDate && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                              <CalendarClock className="h-3 w-3" />
                              Exp{" "}
                              {new Date(p.expiryDate).toLocaleDateString(
                                "en-IN",
                                { day: "2-digit", month: "short", year: "numeric" }
                              )}
                            </span>
                          )}
                        </div>

                        <div className="mt-auto flex items-center justify-end gap-2 pt-3">
                          <button className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600">
                            <Heart className="h-4 w-4" />
                            Save
                          </button>
                          <button
                            disabled={disabled}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-md transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-300"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
