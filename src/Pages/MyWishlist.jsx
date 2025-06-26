import React from 'react';
import { IoWarningOutline } from "react-icons/io5";

const MyWishlist = () => {
    return (
        <div className='flex flex-col items-center justify-center h-[calc(100vh-275px)]'>
            <div > <IoWarningOutline size={100} className='text-red-400'/></div>
           
            <p>Empty</p>
        </div>
    );
};

export default MyWishlist;