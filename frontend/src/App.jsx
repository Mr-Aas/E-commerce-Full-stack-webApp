import Navbar from './components/Navbar'
import ImageSlider from './components/ImageSlider'
import Itemcard from './components/itemcard'
import './App.css'

function App() {


  return (
    <>
      <Navbar />
      <section className="first bg-slate-300 overflow-hidden justify-center items-center flex">


        <ImageSlider />
      </section>
      <section className="floatingitems absolute top-[60vh] bg-amber-600 w-full
    ">

        <Itemcard />
      </section>


    </>
  )
}

export default App
