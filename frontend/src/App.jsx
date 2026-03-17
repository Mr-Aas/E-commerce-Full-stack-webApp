
import './App.css'
import Navbar from './components/Navbar'
// import Card from './utilities/Card'
// import Intro
import ProductCard from './utilities/Card'
import products from '../data/products'
function App() {


  return (
    <>
      <Navbar />
      {/* <Card /> */}
      <div className="grid grid-cols-4 gap-6 flex-col p-10">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>






      {/* <Introbanner /> */}

    </>
  )
}

export default App
