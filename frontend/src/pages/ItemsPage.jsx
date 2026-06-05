
import { useLoaderData, useParams } from 'react-router-dom'
import { useContext } from "react";
import { LanguageContext } from "../context/languageContext";

import Itemcard from '../components/Itemcard.jsx'
// import ImageSlider from "../components/ImageSlider.jsx"




function ItemsPage() {
  const { products, categories } = useLoaderData()
  const { lang } = useContext(LanguageContext);
  const { category } = useParams()
  console.log(categories[0].subcategory[0].name?.[lang])

  const selectedCategory = categories.find(
    (cat) => cat.name?.en === category
  );

  const subcategoryMap = {};

  selectedCategory?.subcategory?.forEach((sub) => {
    subcategoryMap[sub.name.en] = sub.name;
  });


  if (!products) {
    return <div>Loading...</div>;
  }
  products.map((e) => console.log(e))


  const groupedproducts = products.reduce((acc, item) => {
    const subcatObj = subcategoryMap[item.subcategory];

    const key =
      subcatObj?.[lang] ||   // translated
      subcatObj?.en ||       // fallback
      item.subcategory ||    // raw
      "Unknown";

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(item);
    return acc;
  }, {});


  if (!products || products.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-600 text-center">
          Items will be Available Soon 🤞
        </p>
      </div>
    );
  }

  return (
    <>
      {/* <Backbutton /> */}
      <section className="slider">
        {/* <ImageSlider /> */}
      </section>
      {Object.keys(groupedproducts).map((subcat) => {
        console.log(Object.keys(groupedproducts))

        return (
          <>
            <section key={subcat} className="grocery bg-teal-50  rounded-2xl flex flex-col "  >
              <div className="sectionNAME text-3xl font-medium m-3 bg-teal-200 px-10 rounded-lg border-2 border-teal-300  h-[35px] text-teal-600 flex justify-center items-center"> 
                {subcat}
              </div>
              <div className="datacards overflow-hidden ">
                <Itemcard data={groupedproducts[subcat]} /></div>
            </section>
          </>)
      })}

    </>
  )
}

export default ItemsPage
