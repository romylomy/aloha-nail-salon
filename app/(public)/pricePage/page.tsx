"use client"
import React, { useState } from "react";
import Navbar from "@/components/navbar";

type ServiceItem = {
  name: string;
  price: number | string;
};

const PricePage = () => {
  const [isCalculationMode, setIsCalculationMode] = useState(false);
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [totalCost, setTotalCost] = useState(0);

  const services = [
    { category: 'E-file Manicure', items: [{ name: 'Mani-uncoated', price: 35 }, { name: 'Reg polish', price: 40 }, { name: 'Shellac', price: 45 }, { name: 'Advanced colors', price: 50 }, { name: 'Shellac Builder', price: 55 }, { name: 'Gel polish (Overlay)', price: 60 }] },
    { category: 'E-file Pedicure', items: [{ name: 'Pedi-uncoated', price: 50 }, { name: 'Reg polish', price: 55 }, { name: 'Shellac Luxe', price: 75 }, { name: 'Advanced colors', price: 80 }, { name: 'Pedi with color tips', price: 100 }, { name: 'Reg toe tips', price: 25 }] },
    { category: 'Extension', items: [{ name: 'New Set', price: 75 }, { name: 'Nail Refill', price: 65 }, { name: 'Polygel', price: 95 }] },
    { category: 'Nail Removal', items: [{ name: 'Reg Polish', price: 5 }, { name: 'Shellac', price: 15 }, { name: 'Acrylic/Gel', price: 25 }] },
    { category: 'Nail Design', items: [{ name: 'French Nail', price: 15 }, { name: 'Nail Design', price: 5 }] },
    { category: 'Pro Treatment', items: [{ name: 'Nail / Hand Treatment with Clear Coating', price: 65 }] },
    { category: 'Others', items: [{ name: 'Extension', price: 5 }, { name: 'Repair', price: 5 }, { name: 'Cut Down', price: 10 }, { name: 'Reg Polish Change', price: 15 }, { name: 'Shellac Change', price: 30 }] },
  ];

  const toggleCalculationMode = () => {
    setIsCalculationMode(!isCalculationMode);
    setSelectedServices([]);
    setTotalCost(0);
  };

  const addService = (service: ServiceItem) => {
    setSelectedServices([...selectedServices, service]);
    setTotalCost(totalCost + Number(service.price));
  };

  const removeService = (index: number) => {
    const service = selectedServices[index];
    setSelectedServices(selectedServices.filter((_, i) => i !== index));
    setTotalCost(totalCost - Number(service.price));
  };

  const clearList = () => {
    setSelectedServices([]);
    setTotalCost(0);
  };

  return (
    <div className="min-h-screen bg-center" style={{ backgroundColor: "#F9F9F9" }}>
      <Navbar />
      <div className="container mx-auto px-6 py-40">
        <h1 className="text-4xl font-bold text-center mb-16 text-[#D4A373]">Our Services</h1>
        <div className="flex justify-end mb-8">
          <button
            onClick={toggleCalculationMode}
            className="px-6 py-3 bg-[#FBCC86] text-white font-semibold rounded-md hover:bg-[#C5A173] transition duration-300"
          >
            {isCalculationMode ? "Leave" : "Estimated price"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((serviceCategory) => (
            <div key={serviceCategory.category} className="bg-white shadow-lg rounded-lg p-8 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold text-[#D4B483] mb-4 border-b-2 border-[#D4B483] pb-2">
                {serviceCategory.category}
              </h2>
              <ul className="space-y-2 text-[#5b5b5b] text-lg">
                {serviceCategory.items.map((item, i) => (
                  <li key={i} className="flex justify-between items-center">
                    <span className="flex-1">{item.name}</span>
                    <span className="min-w-[60px] text-right font-bold text-[#4A675A]">
                      {item.price}
                    </span>

                    {isCalculationMode && (
                      <button
                        className="text-sm text-[#4A675A] ml-4 hover:scale-110"
                        onClick={() => addService(item)}
                      >
                        Add
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {isCalculationMode && (
          <div className="bg-white shadow-lg rounded-lg p-8 mt-16">
            <h2 className="text-2xl font-semibold mb-6 text-[#D4A373]">Selected Services</h2>
            <ul className="space-y-2 text-lg text-[#5b5b5b]">
              {selectedServices.map((service, index) => (
                <li key={index} className="flex justify-between">
                  <span className="flex-1">{service.name}</span>
                  <span className="min-w-[60px] text-right font-bold text-[#4A675A]">
                    {service.price}
                  </span>

                  <button
                    className="text-sm text-red-500 ml-4"
                    onClick={() => removeService(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <h3 className="text-xl font-bold mt-6 text-[#4A675A]">Total: ${totalCost}</h3>
            <button
              onClick={clearList}
              className="mt-6 px-6 py-3 bg-[#FBCC86] text-white font-semibold rounded-md hover:bg-[#C5A173] transition duration-300"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricePage;
