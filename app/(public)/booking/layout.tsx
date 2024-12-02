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
      

      <div className=" mb-28 p-4 rounded-md flex flex-col items-center justify-center text-black mx-auto">
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
