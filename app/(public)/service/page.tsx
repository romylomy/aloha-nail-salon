"use client";
import React from "react";
import NavBar from "@/components/navbar";

// 数据部分
const manicureData = {
  category: "E-file Manicure",
  items: [
    { name: "Mani-uncoated", price: 35 },
    { name: "Reg polish", price: 40 },
    { name: "Shellac", price: 45 },
    { name: "Advanced colors", price: 50 },
    { name: "Shellac Builder", price: 55 },
    { name: "Gel polish (Overlay)", price: 60 },
  ],
};
const handPackages = [
  {
    name: "Most Popular: Nail Removal + Shellac",
    description: "Remove old nails and strengthen with premium coating for durability.",
    price: 60,
    isPopular: true,
  },
  {
    name: "Extension + Design",
    description: "Enhance your nails with extensions and personalized designs.",
    price: 95,
    isPopular: false,
  },
  {
    name: "Luxury Package: Removal, Extension, Advanced colors",
    description: "Complete care with removal, extensions, design, and a relaxing hand massage.",
    price: 120,
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
              {manicureData.category}
            </h1>
            <p className="text-lg text-[#5b5b5b] mb-6">
              Choose from our premium E-file manicure options to keep your nails looking their best.
            </p>
            <div className="space-y-6">
              {manicureData.items.map((item, index) => (
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
              src="/heroImage2.jpg"
              alt="E-file Manicure"
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
              Popular Combo
            </h1>
            <div className="flex flex-col md:flex-row gap-8 justify-center">
              {handPackages.map((pkg, index) => (
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
                  {/* <div className="mt-auto">
                    <a
                      href="/booking"
                      className="block bg-[#FBCC86] text-white py-2 px-4 rounded-lg text-center hover:bg-[#C5A173] transition duration-300"
                    >
                      Book Now
                    </a>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-12 px-6 py-16 bg-white">
  {/* 左侧：图片 */}
  <div className="lg:w-1/2 flex justify-center">
    <img
      src="/head.jpg"
      alt="Service Example"
      className="w-full max-w-md object-cover rounded-lg shadow-md"
    />
  </div>

  {/* 右侧：服务详细内容 */}
  <div className="lg:w-1/2">
    <h1 className="text-4xl font-bold text-[#D4A373] mb-4">Other Services</h1>
    <h3 className="text-[#4A675A] text-2xl font-semibold mb-4">
      Nail Art & Polish
    </h3>
    <p className="text-[#666666] text-lg mb-6">
      Explore our additional services for enhancing your nail experience. We offer a wide variety of premium nail art, polish options, and treatments for a perfect finish.
    </p>
    <ul className="text-[#4A675A] text-lg space-y-2 list-disc pl-4">
      <li>Custom Nail Art Design</li>
      <li>Gel Polish Application</li>
      <li>Strengthening Treatments</li>
      <li>Paraffin Wax Treatment</li>
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
    </div>
  );
}
