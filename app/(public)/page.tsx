"use client"
import Link from 'next/link';
import React from 'react';
import Navbar from "@/components/navbar";
import PhotoGallery from '@/components/photoGallery';
import Contact from '@/components/contact';
import ParallaxSection from '@/components/parallax';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className='bg-[#F5E9D3]'
    style={{
      backgroundImage: 'url("/bg2.jpg")',
    }}>
      {/* header */}
      <Navbar/>

      <main>
      <ParallaxSection/>
      <div className='flex items-center justify-between h-screen'>

        
        
        {/* left content*/}
        <motion.div 
            className="relative w-1/2 pl-10 flex items-center justify-center mt-32 mb-20"
            initial={{ opacity: 0, y: 50 }} // 初始状态：透明且向下偏移
            whileInView={{ opacity: 1, y: 0 }} // 在视口中时：不透明且归位
            transition={{ duration: 0.8 }} // 过渡时间
          >

          {/* white bg*/}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full h-[500px] w-[500px] md:h-[400px] md:w-[700px]"></div>
            <div className="relative z-10">
              <h2 className="text-4xl text-black font-bold mb-4">About us</h2>
              <p className="mb-6 text-black text-lg">
                Every client experience is important. Aloha Nails – a nail salon located in Crowfoot NW Calgary, in addition to providing efficient quality service, we also focus on emotional values, from the joys of employees to customer satisfaction, we believe that everyone can share the joy to create a better service environment.
              </p>
              <a href="booking" className="bg-yellow-500 text-white py-3 px-6 rounded-lg shadow hover:bg-yellow-600 transition duration-300">
                Book Now
              </a>
            </div>
          </motion.div>
          

        {/*right photo*/}
        <motion.div 
            className='w-4/5 h-auto flex justify-end'
            initial={{ opacity: 0, x: 100 }} // 初始状态：透明且向右偏移
            whileInView={{ opacity: 1, x: 0 }} // 在视口中时：不透明且归位
            transition={{ duration: 0.8 }} // 过渡时间
          >
            <img src="/main.jpg" alt="main photo" className='w-[80%] h-auto object-contain' />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} // 初始状态：透明且缩小
          whileInView={{ opacity: 1, scale: 1 }} // 在视口中时：不透明且正常大小
          transition={{ duration: 0.8 }} // 过渡时间
        >
          <PhotoGallery/>
        </motion.div>
        <div>
          <Contact/>
        </div>
      </main>
    </div>
  );
}