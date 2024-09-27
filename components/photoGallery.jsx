import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NailGallery() {
 
  const nailDesigns = [
    {
      title: "Acrylic Nails",
      image: "/img1.jpg",  
      link: "/pricePage/",
    },
    {
      title: "Gel Nails",
      image: "/img2.jpg",  
      link: "/pricePage/",
    },
    {
      title: "Dip Powder",
      image: "/img3.jpg",  
      link: "/pricePage/",
    },
    {
        title: "Dip Powder",
        image: "/img4.jpg",  
        link: "/pricePage/",
      },
      {
        title: "Dip Powder",
        image: "/img5.jpg",  
        link: "/pricePage/",
      },
      {
        title: "Dip Powder",
        image: "/img6.jpg",  
        link: "/pricePage/",
      },
  ];

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-center text-4xl font-bold mb-8">Nail Design Gallery</h2>
      <div className="flex flex-wrap justify-between">
        {nailDesigns.map((design, index) => (
          <Link href={design.link} key={index} className="block w-full md:w-[30%] mb-8 relative">
            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <Image
                src={design.image}
                alt={design.title}
                width={400}
                height={300}
                className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
                <h3 className="text-xl font-bold">{design.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
