import React from 'react';
import PageHeader from '@/components/page-header';
import StepNavigation from "@/components/step-navigation";
import { AddDealContextProvider } from '@/components/DealContext';

export default function DealsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full px-4 lg:px-0">
      {/* Centering the PageHeader */}
      <div className="flex p-4 justify-evenly pt-10 mt-10 lg:mt-20">
        <div className="text-center text-slate-200">
          <PageHeader
            title="Aloha! Let's book you an appointment"
          />
        </div>
      </div>

      <div className=" lg:mt-20 mt-10 mb-28 p-4 rounded-md flex flex-col items-center text-black lg:flex-row lg:justify-center lg:items-start lg:gap-x-10 lg:max-w-5xl lg:mx-auto">
        {/* Step Navigation */}
        <StepNavigation  />

        {/* Context Provider wrapping the main content */}
        <AddDealContextProvider>
          <div className="w-full lg:w-3/4">
            {children}
          </div>
        </AddDealContextProvider>
      </div>
    </div>
  );
}
