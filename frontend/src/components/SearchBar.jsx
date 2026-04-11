import { Search } from "lucide-react"


function SearchBar() {
    return (


        <div className="bg-white mx-auto w-full h-14 flex items-center sticky top-0 z-10">
            <div className=" px-4 w-full">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full border rounded-lg h-10 px-3"
                    />
                    <Search className="absolute right-3 top-3 w-5" />
                </div>
            
            </div>

        </div>
    )
}

export default SearchBar
