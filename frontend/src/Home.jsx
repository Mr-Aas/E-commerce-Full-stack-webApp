import { useState, useEffect } from 'react'

import Itemcard from './components/Itemcard.jsx'
import ImageSlider from './components/ImageSlider.jsx'



function Home() {
  const [slides, setslides] = useState([]);
  const [grocery, setgrocery] = useState([])
  const [hardware, sethardware] = useState([])
  const [Products, setProducts] = useState([])


  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/api/slides').then(res => res.json()),
      fetch('http://localhost:5000/api/grocery').then(res => res.json()),
      fetch('http://localhost:5000/api/hardware').then(res => res.json())
    ]).then(([slides, grocery, hardware]) => {
      setslides(slides);
      setgrocery(grocery);
      sethardware(hardware);
    });
  }, []);
  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, []);

  console.log(Products)

  if (!grocery || !hardware || slides.length === 0 ||!Products) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="slider">
        <ImageSlider slides={slides} />
      </section>


      <section className="grocery my-3 bg-teal-100  rounded-2xl flex flex-col ">
        <div className="sectionNAME text-3xl font-medium m-3 bg-teal-200 px-10 rounded-full  h-[45px]">
          {grocery.dataname}
        </div>
        <div className="datacards overflow-hidden ">
          <Itemcard data={grocery.items} /></div>
      </section>
      <section className="grocery my-3 bg-teal-100  rounded-2xl flex flex-col ">
        <div className="sectionNAME text-3xl font-medium m-3 bg-teal-200 px-10 rounded-full  h-[45px]">
          {hardware.dataname}
        </div>
        <div className="datacards overflow-hidden ">
          <Itemcard data={hardware.items} /></div>
      </section>
      <section className="grocery my-3 bg-teal-100  rounded-2xl flex flex-col ">
        <div className="sectionNAME text-3xl font-medium m-3 bg-teal-200 px-10 rounded-full  h-[45px]">
          {Products.name}
        </div>
        <div className="datacards overflow-hidden ">
          <Itemcard data={Products} /></div>
      </section>

    </>
  )
}

export default Home
