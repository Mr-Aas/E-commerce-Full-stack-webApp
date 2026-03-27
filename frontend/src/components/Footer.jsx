import React from 'react'

function Footer() {
  return (
    <div className='footer  flex justify-around items-center min-h-[40vh] bg-linear-to-r from-slate-900 to-black w-full text-slate-400 '>
      <div className="tags bg-slate-950">
        <ul className="liststyle-none">
            <li className="tag">home</li>
            <li className="tag">about</li>
            <li className="tag">what we do</li>
            <li className="tag">partners</li>
            <li className="tag">blogs</li>
            <li className="tag">contact</li>
        </ul>
      </div>
      <div className="info">
        <h2>All Rights Reserved &copy;</h2>
        <p>this website is underconstruction</p>
      </div>

    </div>
  )
}

export default Footer
