import { useState, useEffect } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'

import Itemcard from '../components/Itemcard.jsx'
import ImageSlider from "../components/ImageSlider.jsx"




function ItemsPage() {
  const items = useLoaderData()
  const { category } = useParams()

  console.log(items)

  if (!items) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="slider">
        <ImageSlider />
      </section>

      <section className="grocery my-3 bg-teal-100  rounded-2xl flex flex-col ">
        <div className="sectionNAME text-3xl font-medium m-3 bg-teal-200 px-10 rounded-full  h-[45px]">
          {category }
        </div>
        <div className="datacards overflow-hidden ">
          <Itemcard data={items} /></div>
      </section>

    </>
  )
}

export default ItemsPage
