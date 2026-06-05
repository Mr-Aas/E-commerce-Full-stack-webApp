import { useLoaderData } from "react-router-dom";

import Categorycard from "../components/Catogorycard";

import Footer from "../components/Footer";


const HomePage = () => {
    const Categories = useLoaderData();
    
    return (
        <div className="flex items-center flex-col m-0 p-0">
            <div className=" flex flex-wrap my-4 gap-4 justify-center w-[90vw]">
                <Categorycard Categories={Categories} />
            
            </div>
            <Footer />
        </div>
    )
}

export default HomePage
