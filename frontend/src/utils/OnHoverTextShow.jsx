import { useState } from "react"


function OnHoverTextShow({alt}) {
    const [Show, setShow] = useState(false)
    let timer;
    const handleMouseEnter = () => {
        timer = setTimeout(() => {
            setShow(true)

        }, 700);
    }
    const handleMouseLeave = () => {
        clearInterval(timer)
        setShow(false)
    }


    return (
        <div>
            {Show && (
                <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                    image
                </div>
            )}
        </div>
//         <span class="absolute hidden group-hover:block">
//     Profile
//   </span>
    )
}
export {handleMouseEnter,handleMouseLeave}
// export default OnHoverTextShow
