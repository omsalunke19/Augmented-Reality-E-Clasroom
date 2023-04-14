import React from 'react'
import { HiOutlineSearch } from "react-icons/hi"

const SearchBar = () => {
    return (
        <div className='w-[60%] sm:w-[70%] justify-center items-center'>

            <div className='w-full flex justify-center items-center bg-Light space-x-2 px-3 rounded-md hover:cursor-text'>
                <HiOutlineSearch size={"1rem"} className="text-black" />
                <input
                    title='searchInput'
                    type="search"
                    placeholder='Search'
                    className='outline-none border-none w-full px-1 py-2 bg-Light font-nunito_sans placeholder:font-nunito_sans text-black placeholder:text-black'
                />
            </div>


        </div>
    )
}

export default SearchBar