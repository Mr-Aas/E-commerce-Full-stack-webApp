import { Link } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../context/languageContext";
import { useTranslation } from "react-i18next";


const Categorycard = ({ Categories }) => {
  const { lang } = useContext(LanguageContext);
  const { t } = useTranslation();
  if (!Categories) {
    return <div className="data">failed to get data</div>
  }


  console.log("Categories:", Categories);
  if (!Array.isArray(Categories)) {
    return <div>Loading or invalid data...</div>;
  }
  return (
    <>
      {Categories.map((items) => {

        return (

          <div className="group  relative w-72 h-96 rounded-2xl overflow-hidden cursor-pointer shadow-lg" key={items._id}>
            <Link to={`/items/${items.name?.en}`}>

              {/* Background Image */}
              <img
                src={items?.images?.[0] || "/fallback.jpg"}
                alt={items?.name?.[lang]}
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-0 p-5 text-white">
                <h2 className="text-2xl font-bold group-hover:translate-y-[-5px] transition duration-300">
                  {items?.name?.[lang]}
                </h2>
                <span className="text-sm  opacity-80">
                  {t("Types of products in this shop : ")}
                </span>
                <span className="text-sm opacity-80">
                  {items.subcategory?.length}
                </span>

                {/* Button */}
                <button className="mt-3 px-4 py-2 bg-white text-black text-sm rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition duration-300">
                  Explore →
                </button>
              </div>
            </Link>
          </div>

        )
      })}
    </>
  );
};

export default Categorycard;
