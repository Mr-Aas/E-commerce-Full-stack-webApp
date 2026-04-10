import { Link } from "react-router-dom";


const Categorycard = ({ Categories }) => {


  if (!Categories) {
    return <div className="data">failed to get data</div>
  }



  return (
    <>
      {Categories.map((items) => {
        console.log(items.name, items.images)

        return (

          <div className="group  relative w-72 h-96 rounded-2xl overflow-hidden cursor-pointer shadow-lg" key={items._id}>
            <Link to={`/items/${items.name}`}>

              {/* Background Image */}
              <img
                src={items?.images?.[0] || "/fallback.jpg"}
                alt={items?.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-0 p-5 text-white">
                <h2 className="text-2xl font-bold group-hover:translate-y-[-5px] transition duration-300">
                  {items.name}
                </h2>
                <p className="text-sm opacity-80">
                  {items.subcategory?.length
                    ? items.subcategory.map(sub => sub.name).join(", ")
                    : "No subcategories"}
                </p>

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
