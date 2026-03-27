import grocery from './data/grocery/data'
import hardware from './data/hardware/data'
import Itemcard from './components/Itemcard'
import './App.css'










function App() {
  let groceryHeading = grocery[0]
  let groceryData = grocery[1, grocery.length - 1]

  let hardwareHeading = hardware[0]
  let hardwareData = hardware[1, hardware.length - 1]



  { console.log(grocery) }

  return (
    <>
      <section className="grocery border-2 rounded-2xl flex flex-col">
        <div className="sectionNAME text-3xl font-medium m-3 bg-red-100 rounded-full  h-[40px]">
          {grocery[0]}
        </div>
        <Itemcard data={grocery.slice(1)} />
      </section>
      <section className="grocery border-2 rounded-2xl flex flex-col">
        <div className="sectionNAME text-3xl font-medium m-3 bg-red-100 rounded-full  h-[40px]">
          {hardware[0]}
        </div>
        <Itemcard data={hardware.slice(1)} />
      </section>
    </>
  )
}

export default App
