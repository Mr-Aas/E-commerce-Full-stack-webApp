
import './App.css'
import Navbar from './components/Navbar'
// import Card from './utilities/Card'
// import Intro
import ProductCard from './components/products/ProductCard'
import { useEffect, useState } from 'react'
function App() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError('')
      try {
        const res = await fetch('/api/products')
        if (!res.ok) throw new Error(`Backend error (${res.status})`)
        const data = await res.json()
        if (!cancelled) setProducts(Array.isArray(data) ? data : [])
      } catch (e) {
        if (!cancelled) {
          setProducts([])
          setError('Backend is not running. Start the backend to see products.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return (
    <>
      <Navbar />
      {/* <Card /> */}
      {loading && (
        <div className="px-4 sm:px-6 lg:px-8 pt-6 text-gray-600">Loading products...</div>
      )}
      {!loading && error && (
        <div className="px-4 sm:px-6 lg:px-8 pt-6 text-red-600">{error}</div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 p-4 sm:p-6 lg:p-8">

        {products.map((product) => (
          <ProductCard
            key={product._id || product.id}
            product={product}
          />
        ))}

      </div>






      {/* <Introbanner /> */}

    </>
  )
}

export default App
