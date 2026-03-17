
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 p-4 sm:p-6 lg:p-8">

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
