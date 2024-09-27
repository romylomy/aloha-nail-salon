"use client"
import Link from 'next/link';
import React from 'react';
import Navbar from "@/components/navbar";
import PhotoGallery from '@/components/photoGallery';

export default function Home() {
  return (
    <div className='bg-[#F5E9D3]'>
      {/* header */}
      <Navbar/>

      <main>
      
      <div className='flex items-center justify-between h-screen'>

        {/* left content*/}
        <div className="relative w-1/2 pl-10 flex items-center justify-center">

          {/* white bg*/}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full h-[500px] w-[500px] md:h-[400px] md:w-[400px]"></div>
              <div className="relative z-10">
                  <h2 className="text-4xl font-bold mb-4">Book Your Appointment</h2>
                  <p className="mb-6 text-lg">
                    Visit our salon at 4531 Bowness Rd NW, Calgary, AB T3B 0A9. We offer
                    top-quality nail and spa services in a luxurious environment. Call us
                    at +1 (825) 365-7899 to schedule your appointment.
                  </p>
                  <a href="bookingPage" className="bg-yellow-500 text-white py-3 px-6 rounded-lg shadow hover:bg-yellow-600 transition duration-300">
                    Book Now
                  </a>
              </div>
          </div>

        {/*right photo*/}
        <div className='w-4/5 h-auto flex justify-end'>
          <img src="/main.jpg" alt="main photo" className='w-[80%] h-auto object-contain' />
        </div>
      </div>

      <div>
        <PhotoGallery/>
      </div>
        
      </main>
    </div>
  );
}
