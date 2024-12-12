"use client";
import React from "react";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

// 数据部分
const pedicureData = {
  category: "E-file Pedicure",
  items: [
    { name: "Pedi-uncoated", price: 50 },
    { name: "Reg polish", price: 55 },
    { name: "Shellac Luxe", price: 75 },
    { name: "Advanced colors", price: 80 },
    { name: "Pedi with color tips", price: 100 },
    { name: "Reg toe tips", price: 25 },
  ],
};
const footPackages = [
  {
    name: "Ultimate Foot Spa",
    description: "Includes paraffin treatment, shellac luxe, and massage for a relaxing experience.",
    price: 120,
    isPopular: true,
  },
  {
    name: "Advanced Pedicure + Design",
    description: "Perfect for adding custom designs to your pedicure while keeping your feet refreshed.",
    price: 95,
    isPopular: false,
  },
  {
    name: "Express Foot Care",
    description: "Quick care package with pedi-uncoated and polish for busy schedules.",
    price: 60,
    isPopular: false,
  },
];

export default function Page() {
  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      {/* 导航栏占位 */}
      <div>
        <NavBar />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-40">
        {/* 主内容部分 */}
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* 左侧内容 */}
          <div className="lg:w-1/2 bg-white p-8 rounded-lg shadow">
            <h1 className="text-4xl font-poppins text-[#432929] mb-4">
              {pedicureData.category}
            </h1>
            <p className="text-lg text-[#5b5b5b] mb-6">
              Discover our premium E-file pedicure options, designed to keep your feet healthy and looking their best.
            </p>
            <div className="space-y-6">
              {pedicureData.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-200 pb-2"
                >
                  <span className="text-lg text-[#5b5b5b]">{item.name}</span>
                  <span className="text-lg font-bold text-[#D4B483]">${item.price}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a
                href="/booking"
                className="bg-[#FBCC86] text-white py-3 px-6 rounded-lg hover:bg-[#C5A173] transition duration-300"
              >
                Book Appointment
              </a>
            </div>
          </div>

          {/* 右侧图片 */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              src="/pedicure1.png"
              alt="E-file Pedicure"
              className="w-full h-auto object-cover rounded-lg"
              style={{ boxShadow: "none", maxHeight: "700px", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* 推荐套餐部分 */}
        <div className="my-40"></div>

        <div className="w-full py-20">
          <div className="max-w-7xl px-6 mx-auto">
            <h1 className="text-4xl font-poppins text-[#D4A373] text-center mb-10">
              Popular Foot Care Combos
            </h1>
            <div className="flex flex-col md:flex-row gap-8 justify-center">
              {footPackages.map((pkg, index) => (
                <div
                  key={index}
                  className={`flex-1 bg-white p-6 rounded-lg shadow-md flex flex-col ${
                    pkg.isPopular ? "border-2 border-[#F1CD96]" : ""
                  }`}
                >
                  <h3 className="text-2xl font-semibold text-[#51655c] mb-4">
                    {pkg.name}
                  </h3>
                  <p className="text-[#666666] flex-grow mb-6">{pkg.description}</p>
                  <p className="text-lg font-bold text-[#D4B483]">${pkg.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 更多服务部分 */}
        <div className="flex flex-col lg:flex-row items-center gap-12 px-6 py-16 bg-white">
          {/* 左侧：图片 */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              src="/foot.jpg"
              alt="Additional Foot Services"
              className="w-full max-w-md object-cover rounded-lg shadow-md"
            />
          </div>

          {/* 右侧：服务详细内容 */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold text-[#D4A373] mb-4">More Foot Care Services</h1>
            <h3 className="text-[#4A675A] text-2xl font-semibold mb-4">Foot Art & Treatments</h3>
            <p className="text-[#666666] text-lg mb-6">
              Explore our additional services for pampering your feet. Add an artistic or relaxing touch to your foot care.
            </p>
            <ul className="text-[#4A675A] text-lg space-y-2 list-disc pl-4">
              <li>Custom Nail Art for Toes</li>
              <li>Callus Removal Treatment</li>
              <li>Foot Mask & Massage</li>
              <li>Detoxifying Treatments</li>
            </ul>
            <div className="mt-6">
              <a
                href="/services"
                className="bg-[#FBCC86] text-white py-3 px-6 rounded-lg hover:bg-[#C5A173] transition duration-300"
              >
                Explore More
              </a>
            </div>
          </div>
        </div>
      </main>
      <div>
        <Footer/>
      </div>
    
    </div>
  );
}
