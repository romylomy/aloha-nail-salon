import React from 'react';
import PageHeader from '@/components/page-header';
import StepNavigation from "@/components/step-navigation"

export default function DealsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full px-2 lg:px-0 ">
      {/* Centering the PageHeader */}
      <div className="flex justify-center py-10">
        <div className="text-center text-slate-200">
          <PageHeader
            title="Aloha! Let's book you an appointment"
            subtitle="Have an amazing deal or discount tailored for developers? Let us know!"
          />
        </div>
      </div>

      <div className="mt-20 mb-28 flex flex-col gap-x-16 text-black lg:flex-row">
      <StepNavigation />

        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
