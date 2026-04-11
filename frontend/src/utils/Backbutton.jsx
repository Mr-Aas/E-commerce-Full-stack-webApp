import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

function Backbutton() {
    const navigate = useNavigate();

    return (
        <div className="button sticky top-15 z-40">

        <button
            onClick={() => navigate(-1)}
            className="flex items-center  gap-2 px-1 mx-4 py-2 bg-slate-100 text-black rounded-xl shadow-lg
            hover:bg-slate-200 active:scale-95 transition-all duration-200 "
            >
            

                <ChevronLeft size={20} />
                <span className="text-sm font-medium">Back</span>
            
        </button>
            </div>
    );
}

export default Backbutton;