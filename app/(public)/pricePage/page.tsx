"use client"
import React, { useState } from 'react';
import Navbar from '@/components/navbar';

type ServiceItem = {
  name: string;
  price: number;
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
    setTotalCost(totalCost + service.price);
  };
  const removeService = (index: number) => {
    const service = selectedServices[index];
    setSelectedServices(selectedServices.filter((_, i) => i !== index));
    setTotalCost(totalCost - service.price);
  };

  const clearList = () => {
    setSelectedServices([]);
    setTotalCost(0);
  };

  return (
    <div className="min-h-screen bg-center" style={{ backgroundImage: 'url("/bg1.jpg")' }}>
      <Navbar />
      <div className="container mx-auto px-4 py-36">
        <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
        <div className='flex justify-end'>
          <button
            onClick={toggleCalculationMode}
            className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-md mb-8 hover:bg-yellow-600 transition duration-300"
          >
            {isCalculationMode ? "Leave" : "Estimated price"}
          </button>
        </div>
        

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((serviceCategory) => (
            <div key={serviceCategory.category} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold text-yellow-600 mb-4">{serviceCategory.category}</h2>
              <ul className="space-y-2 text-black text-lg">
                {serviceCategory.items.map((item) => (
                  <li key={item.name} className="flex justify-between items-center">
                    <span className="flex-1">{item.name}</span>
                    <span className="min-w-[60px] text-right">${item.price}</span>

                    {isCalculationMode && (
                      <button
                        className="text-sm text-yellow-800 ml-4 hover:scale-110"
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
          <div className="bg-white shadow-lg rounded-lg p-6 mt-12">
            <h2 className="text-2xl font-semibold mb-4">List</h2>
            <ul className="space-y-2 text-lg">
              {selectedServices.map((service, index) => (
                <li key={index} className="flex justify-between">
                  <span className="flex-1">{service.name}</span>
                  <span className="min-w-[60px] text-right">${service.price}</span>

                  <button
                    className="text-sm text-red-500 ml-4"
                    onClick={() => removeService(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <h3 className="text-xl font-bold mt-4">Total: ${totalCost}</h3>
            {/* Clear Button */}
            <button
              onClick={clearList}
              className="mt-4 px-6 py-2 bg-yellow-400 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-300"
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
