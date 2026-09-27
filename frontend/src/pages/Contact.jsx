import Image from "../../public/profile.jpeg"



function Contact() {

  return (
    <div className="w-full flex justify-center">
      <div className="contect  border-4 bg-teal-50
        border-teal-300 rounded-2xl flex justify-center flex-col items-center  ">
        <div className="image">
          <img src={Image} alt="Aas mohd Image" width={300} className="rounded-xl" /></div>
        <div className="info   flex justify-center flex-col items-center font-bold text-teal-600 font-serif">

          <div className="name  ">AAS MOHD</div>
          <div className="email">mraas0003@gmail.com</div>
          <div className="name">phone n0-7500371250</div>
        </div>
      </div>

    </div>
  )
}

export default Contact