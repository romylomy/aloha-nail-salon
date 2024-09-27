"use client"
import Link from 'next/link';
import React from 'react';

export default function Navbar(){

    return(

        <div className='fixed flex py-4 px-6 shadow-md items-center justify-between w-full' style={{ backgroundColor: "#F7E7CE" }}>
            <div>
                <h1 className='text-2xl text-yellow-800 font-bold'> ALOHA NAILS SALON</h1>
            </div>
            <div className='space-x-4'>
                <button>
                    <Link href={"page"}>
                        <p className='text-xl text-yellow-800 hover:scale-110'>Home</p>
                    </Link>
                </button>
                <button>
                    <Link href={"bookingPage"}>
                        <p className='text-xl text-yellow-800 hover:scale-110'>Booking now</p>
                    </Link>
                </button>
                <button>                
                        <p className='text-xl text-yellow-800 hover:scale-110'>Top</p>
                </button>
                <button>                
                        <p className='text-xl text-yellow-800 hover:scale-110'>Top</p>
                </button>
                <button>                
                        <p className='text-xl text-yellow-800 hover:scale-110'>Top</p>
                </button>
            </div>
        </div>
    );

}