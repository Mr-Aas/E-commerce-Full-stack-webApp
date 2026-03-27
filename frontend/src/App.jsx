import grocery from './data/grocery/data'
import hardware from './data/hardware/data'
import Itemcard from './components/Itemcard'
import ImageSlider from './components/ImageSlider'



function App() {

  return (
    <>
    <section className="slider">
<ImageSlider/>
    </section>
      <section className="grocery my-3 bg-teal-100  rounded-2xl flex flex-col ">
        <div className="sectionNAME text-3xl font-medium m-3 bg-teal-200 px-10 rounded-full  h-[45px]">
          {grocery[0]}
        </div>
        <div className="datacards overflow-hidden ">
        <Itemcard data={grocery.slice(1)} /></div>
      </section>
      <section className="grocery my-3 bg-teal-100  rounded-2xl flex flex-col ">
        <div className="sectionNAME text-3xl font-medium m-3 bg-teal-200 px-10 rounded-full  h-[45px]">
          {hardware[0]}
        </div>
        <div className="datacards overflow-hidden ">
        <Itemcard data={hardware.slice(1)} /></div>
      </section>
     
    </>
  )
}

export default App
