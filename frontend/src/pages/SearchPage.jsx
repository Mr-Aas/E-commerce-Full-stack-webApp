import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

const SearchPage = () => {
  const query = new URLSearchParams(useLocation().search).get("q");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get(`/products/search?q=${query}`);
      setProducts(res.data);
    };

    if (query) fetch();
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h2 className="text-xl mb-4">
        Results for "{query}"
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(p => (
          <div key={p._id} className="border p-3 rounded">
            <img src={p.images?.[0]} />
            <p>{p.name}</p>
            <p>₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;