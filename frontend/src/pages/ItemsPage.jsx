
import { useLoaderData, useParams } from 'react-router-dom'


import Itemcard from '../components/Itemcard.jsx'
// import ImageSlider from "../components/ImageSlider.jsx"




function ItemsPage() {
  const items = useLoaderData()
  const { category } = useParams()

  

  if (!items) {
    return <div>Loading...</div>;
  }
  
  const groupedItems = items.reduce((acc, item) => {
    const key = item.subcategory;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(item);
    return acc;
  }, {});



 

  return (
    <>
      <section className="slider">
        {/* <ImageSlider /> */}
      </section>
      {Object.keys(groupedItems).map((subcat) => {
        return (
          <>
            <section className="grocery my-3 bg-teal-50  rounded-2xl flex flex-col " key={subcat} >
              <div className="sectionNAME text-3xl font-medium m-3 bg-teal-100 px-10 rounded-sm border-2 border-teal-300  h-[45px]">
                {subcat}
              </div>
              <div className="datacards overflow-hidden ">
                <Itemcard data={groupedItems[subcat]} /></div>
            </section>
          </>)
      })}

    </>
  )
}

export default ItemsPage
