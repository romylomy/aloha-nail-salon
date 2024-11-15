"use client";

import { useState, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Contact() {

  return (
    <main className="font-serif overflow-y-auto text-black bg-[#F7E7CE]" id="contact">
      {/* Flex Container for Contact and Image Sections */}
      <div className="flex flex-col md:flex-row justify-center items-center mt-20 mb-20 px-5">
        
        {/* Content Section */}
        <div className="flex flex-col w-full md:w-1/2 m-5 bg-white rounded-lg px-5 py-5 bg-opacity-70">
          <div className="flex flex-col items-start">
            <span className="text-4xl font-bold mb-4">Contact us</span>
            <p className="text-lg text-gray-700">
            We're always ready to help by providing the best services for you.
            </p>
          </div>
          <div className="my-10 text-lg">
            <p>Let us provide you with comfortable manicure services and improve your quality of life.</p>
            <p>Artwork on your fingertips</p>
          </div>

          <div className="text-xl">
            <p className="m-4 hover:text-gray-500 hover:underline">
              <a href="tel:000-000-0000" className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="w-5 text-yellow-600" />
                <span className="ml-2">Tel: 000-000-0000</span>
              </a>
            </p>
            <p className="m-4 hover:text-gray-500 hover:underline">
              <a href="mailto:aloha@nails.com" className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="w-5 text-yellow-600" />
                <span className="ml-2">Email: aloha@nails.com</span>
              </a>
            </p>
            <p className="m-4 hover:text-gray-500 hover:underline">
              <a className="flex items-center">
                <FontAwesomeIcon icon={faLocationDot} className="w-5 text-yellow-600" />
                1234 12 Ave SW, Calgary, AB
              </a>
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 m-5">
          <img src="/contact.png" alt="Contact Us" className="w-full h-auto rounded-lg shadow-lg"/>
        </div>
      </div>

   
    </main>
  );
}
