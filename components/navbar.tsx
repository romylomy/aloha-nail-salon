"use client"
import Link from 'next/link';
import React, { useState } from 'react';

export default function Navbar(){

    const [isOpen, setIsOpen] = useState(false); // Menu is initially closed

    const toggleMenu = () => {
        setIsOpen(!isOpen);  // Toggle the menu open/closed
    };
    
    return(
        
        <div className='fixed flex py-4 px-6 z-50 shadow-md items-center justify-between w-full ' style={{ backgroundColor: "#F7E7CE" }}>
            <div>
                <h1 className='text-2xl text-yellow-800 font-bold'> ALOHA NAILS SALON</h1>
            </div>
            <div className='hidden md:flex space-x-6'>
                <button>
                    <Link href={"/"}>
                        <p className='text-xl text-yellow-800 hover:scale-110'>Home</p>
                    </Link>
                </button>
                <button>
                    <Link href={"booking"}>
                        <p className='text-xl text-yellow-800 hover:scale-110'>Booking now</p>
                    </Link>
                </button>
                <button>
                    <Link href={"pricePage"}>
                        <p className='text-xl text-yellow-800 hover:scale-110'>Price page</p>
                    </Link>                
                        
                </button>
                <button> 
                    <Link href="/#contact"> 
                        <p className='text-xl text-yellow-800 hover:scale-110'>Contact us</p>
                    </Link>               
                </button>
                {/* <button>                
                        <p className='text-xl text-yellow-800 hover:scale-110'>Top</p>
                </button> */}
            </div>
            
            {/* mobile menu for responsive, displayed on small scream */}
            <div
                className={`fixed top-0 right-0 w-64 h-full z-40 bg-white shadow-lg transform ${
                    isOpen ? 'translate-x-0' : 'translate-x-full' 
                    // a ternary operator used to conditionally apply different Tailwind classes
                    //If isOpen is true, the menu will have the class 'translate-x-0' (visible)
                    //If isOpen is false, the menu will have the class 'translate-x-full' (hidden)
                } transition-transform duration-300 ease-in-out`}>
                <div className='flex flex-col p-4 space-y-6'>
                    <Link href={"/"} onClick={() => setIsOpen(false)}>
                        <p className='text-xl text-yellow-800 hover:scale-110'>Home</p>
                    </Link>
                    <Link href={"bookingPage"} onClick={() => setIsOpen(false)}>
                        <p className='text-xl text-yellow-800 hover:scale-110'>Booking now</p>
                    </Link>
                    <Link href={"pricePage"} onClick={() => setIsOpen(false)}>
                        <p className='text-xl text-yellow-800 hover:scale-110'>Price page</p>
                    </Link>
                    <Link href="/#contact" onClick={() => setIsOpen(false)}>
                        <p className='text-xl text-yellow-800 hover:scale-110'>Contact us</p>
                    </Link>
                </div>
            </div>

            {/* close the menu*/}
            {isOpen && (
                <div
                    className='fixed inset-0 bg-black opacity-50 z-30'
                    onClick={() => setIsOpen(false)}
                />
            )}
            {/* logo for toggling the mobile menu */}
            <div className='md:hidden'>
                <button onClick={toggleMenu}>
                    <svg
                        className='w-8 h-8 text-yellow-800'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7' />
                    </svg>
                </button>
                
            </div>
        </div>
    );

}