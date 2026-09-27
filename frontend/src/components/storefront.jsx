import React, { useMemo, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageContext } from "../context/languageContext";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/Cart/CartSlice";
import api from "../api/axios";

export function getLocalizedText(val, lang = "en") {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object") {
    return val[lang] || val.en || val.hi || val.desi || Object.values(val)[0] || "";
  }
  return String(val);
}

function ProductTile({ product, featured = false, onAdd, onClickProduct }) {
  const { lang } = useContext(LanguageContext);
  const nameStr = getLocalizedText(product.name, lang);
  const imageSrc = product.images?.[0] || "/fallback.jpg";
  const isAvailable = product.stock > 0 && product.isAvailable !== false;

  return (
    <article
      className={`group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/30 ${
        featured ? "sm:col-span-2 sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden bg-muted cursor-pointer ${
          featured ? "aspect-[1.35] sm:aspect-auto sm:min-h-60" : "aspect-[1.1]"
        }`}
        onClick={() => onClickProduct(product._id)}
      >
        <img
          src={imageSrc}
          alt={nameStr}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
          }}
        />
        {product.brand && (
          <span className="absolute top-2 left-2 rounded-full bg-background/80 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-semibold text-foreground border border-border">
            {product.brand}
          </span>
        )}
      </div>

      <div className={`flex min-w-0 flex-1 flex-col p-4 ${featured ? "sm:justify-center sm:p-6" : ""}`}>
        {featured && (
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-accent">
            Featured Product
          </p>
        )}
        <h3
          onClick={() => onClickProduct(product._id)}
          className={`font-display font-semibold leading-snug cursor-pointer hover:text-primary transition-colors ${
            featured ? "text-base sm:text-xl" : "text-sm sm:text-base"
          }`}
        >
          {nameStr}
        </h3>
        {product.description && (
          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{product.description}</p>
        )}
        
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <div className="min-w-0">
            <span className="font-display text-base font-bold text-foreground">₹{product.price}</span>
            <span className="block text-[11px] text-muted-foreground sm:inline sm:pl-1">
              / {product.unitType || "unit"}
            </span>
          </div>
          <Button
            size="sm"
            variant="default"
            disabled={!isAvailable}
            className="rounded-full px-3 text-xs gap-1 shadow-sm cursor-pointer"
            aria-label={`Add ${nameStr} to basket`}
            onClick={() => onAdd(product)}
          >
            {isAvailable ? (
              <>
                <Plus className="h-3.5 w-3.5" /> Add
              </>
            ) : (
              "Out of stock"
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}

export function Storefront({ initialCategoryName, categoryOnly = false }) {
  const { lang } = useContext(LanguageContext);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeAisle, setActiveAisle] = useState("All");

  // Fetch categories from backend
  useEffect(() => {
    let isMounted = true;
    api
      .get("/categories")
      .then((res) => {
        if (!isMounted) return;
        const cats = Array.isArray(res.data) ? res.data : [];
        setCategories(cats);
        if (cats.length > 0) {
          if (initialCategoryName) {
            const found = cats.find(
              (c) =>
                getLocalizedText(c.name, "en").toLowerCase() === initialCategoryName.toLowerCase()
            );
            setSelectedCategory(found || cats[0]);
          } else {
            setSelectedCategory(cats[0]);
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
    return () => {
      isMounted = false;
    };
  }, [initialCategoryName]);

  // Fetch products when selectedCategory changes
  useEffect(() => {
    if (!selectedCategory) return;
    let isMounted = true;
    setLoading(true);
    const catNameEn = getLocalizedText(selectedCategory.name, "en");

    api
      .get(`/products/items/${encodeURIComponent(catNameEn)}`)
      .then((res) => {
        if (!isMounted) return;
        setProducts(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        if (isMounted) {
          setProducts([]);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedCategory]);

  const categoryName = getLocalizedText(selectedCategory?.name, lang);

  // Derive subcategory / aisle list
  const aisles = useMemo(() => {
    if (!selectedCategory) return ["All"];
    const subcatsFromCat = selectedCategory.subcategory?.map((sub) =>
      getLocalizedText(sub.name, lang)
    ) || [];
    const subcatsFromProds = Array.from(new Set(products.map((p) => p.subcategory).filter(Boolean)));
    const combined = Array.from(new Set([...subcatsFromCat, ...subcatsFromProds]));
    return ["All", ...combined];
  }, [selectedCategory, products, lang]);

  // Group products by aisle/subcategory
  const visibleAisles = useMemo(() => {
    if (activeAisle === "All") {
      // Group by subcategory
      const groups = {};
      products.forEach((p) => {
        const subName = p.subcategory || "General";
        if (!groups[subName]) groups[subName] = [];
        groups[subName].push(p);
      });
      return Object.keys(groups).map((name) => ({
        name,
        products: groups[name],
      }));
    } else {
      const subProds = products.filter(
        (p) => (p.subcategory || "").toLowerCase() === activeAisle.toLowerCase()
      );
      return subProds.length ? [{ name: activeAisle, products: subProds }] : [];
    }
  }, [products, activeAisle]);

  function changeCategory(cat) {
    setSelectedCategory(cat);
    setActiveAisle("All");
  }

  function handleAddToCart(product) {
    dispatch(
      addToCart({
        productId: product._id,
        name: getLocalizedText(product.name, lang),
        price: product.price,
        unitType: product.unitType,
        image: product.images?.[0],
        stock: product.stock,
        quantity: 1,
      })
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="mx-auto w-full">
        <main className="pb-16 pt-2">
          {/* Hero Section */}
          {!categoryOnly && (
            <section className="px-5 pt-4 md:px-8">
              <div className="relative overflow-hidden md:w-full  rounded-3xl md:rounded-lg bg-gradient-to-br from-teal-900 via-teal-600 to-emerald-900  px-6 py-8 text-white md:min-h-72 md:px-12 md:py-12 shadow-xl">
                <div className="relative z-10 max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-widest text-teal-300">
                    Smart Shopping · Fresh Daily
                  </p>
                  <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight text-balance md:text-5xl">
                    Everyday Essentials, Arranged By Aisle.
                  </h1>
                  
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Button
                      variant="ledgerHero"
                      className="gap-2 shadow-md bg-amber-400 text-teal-950 font-bold hover:bg-amber-300 cursor-pointer"
                      onClick={() => {
                        document.getElementById("market-aisles")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Shop Now <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-teal-500/20 blur-3xl" />
              </div>
            </section>
          )}

          {categoryOnly && (
            <div className="px-5 pt-4 md:px-8">
              <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
                ← Back to categories
              </Link>
              <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">{categoryName}</h1>
            </div>
          )}

          {/* Category Tabs */}
          <nav aria-label="Shop sticky categories" className="mt-6 px-5 md:px-8 sticky top-18 z-30">
            <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
              {categories.map((cat) => {
                const catName = getLocalizedText(cat.name, lang);
                const isSelected = selectedCategory?._id === cat._id;
                return (
                  <Button
                    key={cat._id}
                    variant="ledgerTab"
                    data-active={isSelected}
                    aria-pressed={isSelected}
                    onClick={() => changeCategory(cat)}
                    className={`shrink-0 px-5 py-2 font-medium rounded-full transition-all cursor-pointer ${
                      isSelected
                        ? "bg-teal-600 text-white shadow-sm hover:bg-teal-700"
                        : "bg-secondary/60 hover:bg-secondary text-foreground"
                    }`}
                  >
                    {catName}
                  </Button>
                );
              })}
            </div>
          </nav>

          {/* Subcategory / Aisle Filter Chips */}
          <div id="market-aisles" className="mt-4 sticky top-28 z-30 scroll-mt-20 px-5 md:px-8">
            <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
              {aisles.map((aisleName) => {
                const isActive = activeAisle === aisleName;
                return (
                  <Button
                    key={aisleName}
                    variant="ledgerChip"
                    size="sm"
                    className={`shrink-0 px-4 rounded-full border text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? "border-teal-600 bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300 font-semibold"
                        : "border-border bg-background text-muted-foreground hover:bg-secondary"
                    }`}
                    onClick={() => setActiveAisle(aisleName)}
                  >
                    {aisleName}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Product Aisle Sections */}
          <div className="px-5 pb-10 md:px-8 mt-6">
            {loading ? (
              <div className="py-20 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent" />
                <p className="mt-4 text-sm text-muted-foreground font-medium">Loading products...</p>
              </div>
            ) : visibleAisles.length ? (
              visibleAisles.map((aisleSection, aisleIndex) => (
                <section
                  key={aisleSection.name}
                  className="mt-8 border-t border-border/60 pt-6 first:border-t-0 first:pt-0"
                >
                  <div className="mb-4 flex items-baseline justify-between gap-3">
                    <h2 className="font-display text-xl font-bold md:text-2xl text-foreground">
                      {aisleSection.name}
                    </h2>
                    <span className="text-xs text-muted-foreground font-medium">
                      {aisleSection.products.length}{" "}
                      {aisleSection.products.length === 1 ? "item" : "items"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {aisleSection.products.map((product, pIndex) => (
                      <ProductTile
                        key={product._id}
                        product={product}
                        featured={aisleIndex === 0 && pIndex === 0 && aisleSection.products.length > 2}
                        onAdd={handleAddToCart}
                        onClickProduct={(id) => navigate(`/product/${id}`)}
                      />
                    ))}
                  </div>
                </section>
              ))
            ) : (
              <div className="py-20 text-center rounded-2xl bg-secondary/20 border border-dashed border-border">
                <p className="font-display text-lg font-semibold">No products found</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try selecting another category or aisle.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}