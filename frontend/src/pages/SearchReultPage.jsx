// import { useState } from "react";

// /**
//  * ProductDetailsPage
//  * Modern e-commerce product details page.
//  *
//  * Usage:
//  *   <ProductDetailsPage
//  *     product={product}
//  *     onAddToCart={(p, qty) => ...}
//  *     onBuyNow={(p, qty) => ...}
//  *   />
//  *
//  * Expected `product` shape (all optional except name/price):
//  * {
//  *   id, name, brand, price, mrp, currency = "₹",
//  *   rating, reviewsCount,
//  *   images: [url, ...],
//  *   description, highlights: [string, ...],
//  *   stock, isAvailable,
//  *   deliveryDays, returnDays,
//  *   variants: [{ label, value }]
//  * }
//  */
// function ProductDetailsPage({ product, onAddToCart, onBuyNow, onBack }) {
//     const p = product || {};
//     const currency = p.currency || "₹";
//     const images = p.images?.length ? p.images : ["https://via.placeholder.com/600x600?text=Product"];
//     const inStock = (p.stock ?? 0) > 0;
//     const discount =
//         p.mrp && p.price && p.mrp > p.price
//             ? Math.round(((p.mrp - p.price) / p.mrp) * 100)
//             : 0;

//     const [activeImg, setActiveImg] = useState(0);
//     const [qty, setQty] = useState(1);
//     const [wishlisted, setWishlisted] = useState(false);

//     const dec = () => setQty((q) => Math.max(1, q - 1));
//     const inc = () => setQty((q) => Math.min(p.stock || 99, q + 1));

//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Breadcrumb */}
//             <div className="border-b border-gray-200 bg-white">
//                 <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
//                     <nav className="flex items-center gap-2 text-sm text-gray-500">
//                         <button
//                             onClick={onBack}
//                             className="hover:text-gray-900 transition"
//                         >
//                             Home
//                         </button>
//                         <span>/</span>
//                         <button
//                             onClick={onBack}
//                             className="hover:text-gray-900 transition"
//                         >
//                             Products
//                         </button>
//                         <span>/</span>
//                         <span className="text-gray-900 font-medium truncate">
//                             {p.name}
//                         </span>
//                     </nav>
//                 </div>
//             </div>

//             <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
//                 <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
//                     {/* LEFT: Gallery */}
//                     <div className="flex flex-col-reverse gap-4 sm:flex-row">
//                         {/* Thumbnails */}
//                         {images.length > 1 && (
//                             <div className="flex gap-3 sm:flex-col">
//                                 {images.map((img, i) => (
//                                     <button
//                                         key={i}
//                                         onClick={() => setActiveImg(i)}
//                                         className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-white transition ${activeImg === i
//                                             ? "border-blue-600 ring-2 ring-blue-100"
//                                             : "border-gray-200 hover:border-gray-400"
//                                             }`}
//                                     >
//                                         <img
//                                             src={img}
//                                             alt={`${p.name} ${i + 1}`}
//                                             className="h-full w-full object-contain"
//                                         />
//                                     </button>
//                                 ))}
//                             </div>
//                         )}

//                         {/* Main image */}
//                         <div className="relative flex-1 overflow-hidden rounded-2xl border border-gray-200 bg-white">
//                             {discount > 0 && (
//                                 <span className="absolute left-4 top-4 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow">
//                                     -{discount}% OFF
//                                 </span>
//                             )}
//                             <button
//                                 onClick={() => setWishlisted((w) => !w)}
//                                 className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 backdrop-blur shadow hover:bg-white transition"
//                                 aria-label="Wishlist"
//                             >
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 24 24"
//                                     fill={wishlisted ? "#ef4444" : "none"}
//                                     stroke={wishlisted ? "#ef4444" : "currentColor"}
//                                     strokeWidth="2"
//                                     className="h-5 w-5"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
//                                     />
//                                 </svg>
//                             </button>
//                             <div className="aspect-square flex items-center justify-center p-8">
//                                 <img
//                                     src={images[activeImg]}
//                                     alt={p.name}
//                                     className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-105"
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* RIGHT: Info / Buy box */}
//                     <div className="lg:sticky lg:top-6 lg:self-start">
//                         {p.brand && (
//                             <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
//                                 {p.brand}
//                             </p>
//                         )}

//                         <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
//                             {p.name}
//                         </h1>

//                         {/* Rating */}
//                         {p.rating != null && (
//                             <div className="mt-3 flex items-center gap-3">
//                                 <div className="flex items-center gap-1 rounded-md bg-green-600 px-2 py-0.5 text-sm font-semibold text-white">
//                                     {p.rating.toFixed(1)}
//                                     <svg
//                                         viewBox="0 0 20 20"
//                                         fill="currentColor"
//                                         className="h-3.5 w-3.5"
//                                     >
//                                         <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.561-.955L10 0l2.948 5.955 6.561.955-4.755 4.635 1.123 6.545z" />
//                                     </svg>
//                                 </div>
//                                 {p.reviewsCount != null && (
//                                     <span className="text-sm text-gray-500">
//                                         {p.reviewsCount.toLocaleString()} ratings
//                                     </span>
//                                 )}
//                             </div>
//                         )}

//                         {/* Price */}
//                         <div className="mt-5 flex items-end gap-3">
//                             <span className="text-4xl font-bold text-gray-900">
//                                 {currency}
//                                 {p.price?.toLocaleString()}
                                
//                             </span>
//                             {p.mrp && p.mrp > p.price && (
//                                 <>
//                                     <span className="text-lg text-gray-400 line-through">
//                                         {currency}
//                                         {p.mrp.toLocaleString()}
//                                     </span>
//                                     <span className="text-base font-semibold text-green-600">
//                                         {discount}% off
//                                     </span>
//                                 </>
//                             )}
//                         </div>
//                         <p className="mt-1 text-xs text-gray-500">
//                             Inclusive of all taxes
//                         </p>

//                         {/* Stock */}
//                         <div className="mt-4">
//                             {inStock ? (
//                                 <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
//                                     <span className="h-2 w-2 rounded-full bg-green-500" />
//                                     In stock
//                                     {p.stock ? ` · ${p.stock} left` : ""}
//                                 </span>
//                             ) : (
//                                 <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700">
//                                     <span className="h-2 w-2 rounded-full bg-red-500" />
//                                     Out of stock
//                                 </span>
//                             )}
//                         </div>

//                         {/* Highlights */}
//                         {p.highlights?.length > 0 && (
//                             <div className="mt-6">
//                                 <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
//                                     Highlights
//                                 </h3>
//                                 <ul className="mt-2 space-y-1.5">
//                                     {p.highlights.map((h, i) => (
//                                         <li
//                                             key={i}
//                                             className="flex items-start gap-2 text-sm text-gray-600"
//                                         >
//                                             <svg
//                                                 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"
//                                                 viewBox="0 0 20 20"
//                                                 fill="currentColor"
//                                             >
//                                                 <path
//                                                     fillRule="evenodd"
//                                                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                                                     clipRule="evenodd"
//                                                 />
//                                             </svg>
//                                             {h}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         )}

//                         {/* Quantity */}
//                         <div className="mt-6 flex items-center gap-4">
//                             <span className="text-sm font-medium text-gray-700">
//                                 Quantity
//                             </span>
//                             <div className="flex items-center rounded-lg border border-gray-300 bg-white">
//                                 <button
//                                     onClick={dec}
//                                     disabled={qty <= 1}
//                                     className="grid h-10 w-10 place-items-center text-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
//                                 >
//                                     −
//                                 </button>
//                                 <span className="w-12 text-center text-base font-semibold text-gray-900">
//                                     {qty}
//                                 </span>
//                                 <button
//                                     onClick={inc}
//                                     disabled={p.stock != null && qty >= p.stock}
//                                     className="grid h-10 w-10 place-items-center text-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
//                                 >
//                                     +
//                                 </button>
//                             </div>
//                         </div>

//                         {/* CTAs */}
//                         <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
//                             <button
//                                 disabled={!inStock}
//                                 onClick={() => onAddToCart?.(p, qty)}
//                                 className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-blue-600 bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
//                             >
//                                 <svg
//                                     className="h-5 w-5"
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     strokeWidth="2"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                                     />
//                                 </svg>
//                                 Add to Cart
//                             </button>
//                             <button
//                                 disabled={!inStock}
//                                 onClick={() => onBuyNow?.(p, qty)}
//                                 className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:from-orange-600 hover:to-orange-700 disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-300"
//                             >
//                                 <svg
//                                     className="h-5 w-5"
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     strokeWidth="2"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         d="M13 10V3L4 14h7v7l9-11h-7z"
//                                     />
//                                 </svg>
//                                 Buy Now
//                             </button>
//                         </div>

//                         {/* Delivery / trust badges */}
//                         <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:grid-cols-3">
//                             <Trust
//                                 icon="truck"
//                                 title="Free delivery"
//                                 subtitle={
//                                     p.deliveryDays
//                                         ? `In ${p.deliveryDays} days`
//                                         : "On orders over ₹499"
//                                 }
//                             />
//                             <Trust
//                                 icon="return"
//                                 title="Easy returns"
//                                 subtitle={`${p.returnDays || 7}-day returns`}
//                             />
//                             <Trust
//                                 icon="shield"
//                                 title="Secure payment"
//                                 subtitle="100% protected"
//                             />
//                         </div>

//                         {/* Description */}
//                         {p.description && (
//                             <div className="mt-8">
//                                 <h3 className="text-base font-semibold text-gray-900">
//                                     Description
//                                 </h3>
//                                 <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-600">
//                                     {p.description}
//                                 </p>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// function Trust({ icon, title, subtitle }) {
//     const icons = {
//         truck: (
//             <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M3 7h11v8H3zM14 10h4l3 3v2h-7zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
//             />
//         ),
//         return: (
//             <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M3 10h11a5 5 0 010 10h-3M3 10l4-4M3 10l4 4"
//             />
//         ),
//         shield: (
//             <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z"
//             />
//         ),
//     };
//     return (
//         <div className="flex items-center gap-3">
//             <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
//                 <svg
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     className="h-5 w-5"
//                 >
//                     {icons[icon]}
//                 </svg>
//             </div>
//             <div className="min-w-0">
//                 <p className="text-sm font-semibold text-gray-900">{title}</p>
//                 <p className="truncate text-xs text-gray-500">{subtitle}</p>
//             </div>
//         </div>
//     );
// }

// export default ProductDetailsPage;
