import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/Cart/CartSlice";


function ProductDetailsPage(
    { product: productProp, lang = "en", onAddToCart, onBuyNow, onBack }

) {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const id = params?.id;
    const [fetched, setFetched] = useState(productProp || null);
    const [loading, setLoading] = useState(!productProp && !!id);
    const [error, setError] = useState(null);

    const [activeImg, setActiveImg] = useState(0);
    const [qty, setQty] = useState(1);
    const [wishlisted, setWishlisted] = useState(false);

    useEffect(() => {
        // Only fetch if no product was passed in via props AND we have an id in the URL
        if (productProp || !id) return;
        let cancelled = false;
        setLoading(true);
        setError(null);
        api
            .get(`/products/${id}`)
            .then((res) => {
                if (!cancelled) setFetched(res.data);
            })
            .catch((err) => {
                console.error("Failed to load product", err);
                if (!cancelled) setError(err);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [id, productProp]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="flex items-center gap-3 text-slate-600">
                    <span className="h-3 w-3 animate-pulse rounded-full bg-indigo-500" />
                    Loading product…
                </div>
            </div>
        );
    }

    if (!loading && error) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 px-4 text-center">
                <h2 className="text-xl font-bold text-slate-900">Product not found</h2>
                <p className="text-sm text-slate-500">
                    We couldn't load this product. It may have been removed.
                </p>
                <button
                    onClick={() => (onBack ? onBack() : navigate(-1))}
                    className="mt-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-600"
                >
                    Go back
                </button>
            </div>
        );
    }

    const p = fetched || productProp || {};

    // name is an object { en, hi, desi } — fall back gracefully
    const name =
        (p.name && (p.name[lang] || p.name.en || p.name.hi || p.name.desi)) ||
        "Untitled product";

    const images = p.images?.length
        ? p.images
        : ["https://via.placeholder.com/600x600?text=Product"];

    // isAvailable is a Boolean in the schema. Treat stock===0 as out of stock too.
    const inStock =
        p.isAvailable !== false && (p.stock == null || p.stock > 0);

    const isPerishable = p.subcategoryType === "Perishable";
    const expiry = p.expiryDate ? new Date(p.expiryDate) : null;
    const expired = expiry ? expiry.getTime() < Date.now() : false;


    const maxQty = p.stock && p.stock > 0 ? p.stock : 99;
    const dec = () => setQty((q) => Math.max(1, q - 1));
    const inc = () => setQty((q) => Math.min(maxQty, q + 1));

    const formatDate = (d) =>
        d?.toLocaleDateString(undefined, {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-sm text-gray-500">
                        <button onClick={onBack} className="hover:text-gray-900 transition">
                            Home
                        </button>
                        <span>/</span>
                        {p.category && (
                            <>
                                <button
                                    onClick={onBack}
                                    className="hover:text-gray-900 transition capitalize"
                                >
                                    {p.category}
                                </button>
                                <span>/</span>
                            </>
                        )}
                        {p.subcategory && (
                            <>
                                <span className="capitalize">{p.subcategory}</span>
                                <span>/</span>
                            </>
                        )}
                        <span className="text-gray-900 font-medium truncate">{name}</span>
                    </nav>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                    {/* LEFT: Gallery */}
                    <div className="flex flex-col-reverse gap-4 sm:flex-row">
                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="flex gap-3 sm:flex-col">
                                {images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImg(i)}
                                        className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-white transition ${activeImg === i
                                            ? "border-blue-600 ring-2 ring-blue-100"
                                            : "border-gray-200 hover:border-gray-400"
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${name} ${i + 1}`}
                                            className="h-full w-full object-contain"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Main image */}
                        <div className="relative flex-1 overflow-hidden rounded-2xl border border-gray-200 bg-white ">
                            {isPerishable && (
                                <span className="absolute left-4 top-4 z-10 rounded-full bg-teal-600 px-3 py-1 text-xs font-bold text-white shadow">
                                    Perishable
                                </span>
                            )}
                            <button
                                onClick={() => setWishlisted((w) => !w)}
                                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 backdrop-blur shadow hover:bg-white transition"
                                aria-label="Wishlist"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill={wishlisted ? "#ef4444" : "none"}
                                    stroke={wishlisted ? "#ef4444" : "currentColor"}
                                    strokeWidth="2"
                                    className="h-5 w-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                                    />
                                </svg>
                            </button>
                            <div className=" bg-slate-200  flex items-center justify-center p-8">
                                <img
                                    src={images[activeImg]}
                                    alt={name}
                                    className="max-h-full max-w-full object-contain  transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Info / Buy box */}
                    <div className="lg:sticky lg:top-6 lg:self-start">
                        {p.brand && (
                            <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
                                {p.brand}
                            </p>
                        )}

                        <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                            {name}
                        </h1>

                        {/* Category chips */}
                        {(p.category || p.subcategory) && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {p.category && (
                                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 capitalize">
                                        {p.category}
                                    </span>
                                )}
                                {p.subcategory && (
                                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 capitalize">
                                        {p.subcategory}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Price */}
                        <div className="mt-5 flex items-end gap-3">
                            <span className="text-4xl font-bold text-gray-900">
                                ₹{Number(p.price ?? 0).toLocaleString()} / {p.unitType}
                            </span>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Inclusive of all taxes</p>

                        {/* Stock / availability */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {inStock ? (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                                    <span className="h-2 w-2 rounded-full bg-green-500" />
                                    In stock
                                    {typeof p.stock === "number" ? ` · ${p.stock} ${p.unitType} left` : ""}
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700">
                                    <span className="h-2 w-2 rounded-full bg-red-500" />
                                    Out of stock
                                </span>
                            )}

                            {/* Expiry info for perishables */}
                            {isPerishable && expiry && (
                                <span
                                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${expired
                                        ? "bg-red-50 text-red-700"
                                        : "bg-amber-50 text-green-500 border"
                                        }`}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="h-3.5 w-3.5"
                                    >
                                        <circle cx="12" cy="12" r="9" />
                                        <path d="M12 7v5l3 2" strokeLinecap="round" />
                                    </svg>
                                    {expired ? "Expired on " : "Best before "}
                                    {formatDate(expiry)}
                                </span>
                            )}
                        </div>

                        {/* Quantity */}
                        <div className="mt-6 flex items-center gap-4">
                            <span className="text-sm font-medium text-gray-700">Quantity</span>
                            <div className="flex items-center rounded-lg border border-gray-300 bg-white">
                                <button
                                    onClick={dec}
                                    disabled={qty <= 1}
                                    className="grid h-10 w-10 place-items-center text-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    −
                                </button>
                                <span className="w-12 text-center text-base font-semibold text-gray-900">
                                    {qty}
                                </span>
                                <button
                                    onClick={inc}
                                    disabled={qty >= maxQty}
                                    className="grid h-10 w-10 place-items-center text-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* CTAs */}
                        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <button
                                disabled={!inStock}
                                onClick={() => {
                                    dispatch(addToCart({
                                        productId: p._id,
                                        name: p.name,
                                        unitType: p.unitType || "unit",
                                        price: Number(p.price),
                                        image: p.images?.[0] || "",
                                        quantity: qty,
                                        stock: p.stock // ✅ ADD THIS
                                    }));
                                }}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-blue-600 bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
                            >
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                Add to Cart
                            </button>
                            <button
                                disabled={!inStock}
                                onClick={() => {
                                    dispatch(addToCart({
                                        productId: p._id,
                                        name: p.name,
                                        unitType: p.unitType || "unit",
                                        price: Number(p.price),
                                        image: p.images?.[0] || "",
                                        quantity: qty,
                                        stock: p.stock // ✅ ADD THIS
                                    }));
                                    navigate("/cart")
                                }}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:from-teal-800 hover:to-teal-900 disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-300"
                            >
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                                Buy Now
                            </button>
                        </div>

                        {/* Trust badges */}
                        <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:grid-cols-3">
                            <Trust
                                icon="truck"
                                title="Free delivery"
                                subtitle="On orders over ₹499"
                            />
                            <Trust icon="return" title="Easy returns" subtitle="7-day returns" />
                            <Trust
                                icon="shield"
                                title="Secure payment"
                                subtitle="100% protected"
                            />
                        </div>

                        {/* Description */}
                        {p.description && (
                            <div className="mt-8">
                                <h3 className="text-base font-semibold text-gray-900">
                                    Description
                                </h3>
                                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-600">
                                    {p.description}
                                </p>
                            </div>
                        )}

                        {/* Product details table */}
                        <div className="mt-8">
                            <h3 className="text-base font-semibold text-gray-900">
                                Product details
                            </h3>
                            <dl className="mt-3 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white text-sm">
                                {p.brand && (
                                    <Row label="Brand" value={p.brand} />
                                )}
                                {p.category && (
                                    <Row label="Category" value={p.category} capitalize />
                                )}
                                {p.subcategory && (
                                    <Row
                                        label="Subcategory"
                                        value={p.subcategory}
                                        capitalize
                                    />
                                )}
                                {p.subcategoryType && (
                                    <Row label="Type" value={p.subcategoryType} />
                                )}
                                {isPerishable && expiry && (
                                    <Row label="Expiry date" value={formatDate(expiry)} />
                                )}
                                {p.createdAt && (
                                    <Row
                                        label="Listed on"
                                        value={formatDate(new Date(p.createdAt))}
                                    />
                                )}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Row({ label, value, capitalize }) {
    return (
        <div className="flex items-center justify-between gap-4 px-4 py-2.5">
            <dt className="text-gray-500">{label}</dt>
            <dd
                className={`font-medium text-gray-900 ${capitalize ? "capitalize" : ""
                    }`}
            >
                {value}
            </dd>
        </div>
    );
}

function Trust({ icon, title, subtitle }) {
    const icons = {
        truck: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7h11v8H3zM14 10h4l3 3v2h-7zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
            />
        ),
        return: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10h11a5 5 0 010 10h-3M3 10l4-4M3 10l4 4"
            />
        ),
        shield: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z"
            />
        ),
    };
    return (
        <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                >
                    {icons[icon]}
                </svg>
            </div>
            <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">{title}</p>
                <p className="truncate text-xs text-gray-500">{subtitle}</p>
            </div>
        </div>
    );
}

export default ProductDetailsPage;
