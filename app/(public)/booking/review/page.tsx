'use client';

import { useEffect, useState, Fragment  } from "react";
import { useRouter } from 'next/navigation';
import { useAddDealContext } from '@/components/DealContext';
import { NewDealType, selectServicesSchema } from '@/lib/validation';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button'; // UI component for buttons
import { saveAppointment } from '@/server-actions/appointments'; // Server actions for saving appointments
import { yearMonthFormat } from '@/lib/utils'; // Utility function for formatting dates
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RiCalendarScheduleLine } from "react-icons/ri";
import Pro from "@/public/pro.png";
import Image from "next/image";

export default function ReviewForm() {
  const router = useRouter();
  const { newDealData } = useAddDealContext();

  const { services, time, staff, date, customerName, email, phone, cost   } = newDealData;
  const StaffId = staff;
  const StaffName = typeof window !== 'undefined' ? localStorage.getItem('staffName') : '';
  const selectedServices = JSON.parse(localStorage.getItem('selectedServices') || '[]');



  console.log('this is the selected services')
  console.log(services)
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const patientValues = {
      name: customerName,
      email: email,
      phone: phone,
    };

    try {
      const formattedDate = yearMonthFormat(date, 'UTC'); // Format the date

      const response = await saveAppointment({
        clientDetails: patientValues, // Save the appointment with the combined form values
        date: formattedDate,
        time: time,
        staffId: StaffId || '', // Use the selected staff ID, or a blank string if none
        services: services,
        fee: cost,
        StaffName: StaffName
      });

      if (!response.success) {
        throw new Error(response.message); // If there's an error, throw it
      }

      router.push(`/appointment-confirmation?id=${response.data._id}`); // Navigate to the confirmation page
    } catch (error: any) {
      console.error('Error saving appointment:', error.message); // Log the error
      alert(error.message); // Show an error alert
    }
  };

  return  (
    <div className="py-6 px-4 lg:py-8 lg:px-10 -md mt-10 ">
      <form onSubmit={handleFormSubmit} className="lg:w-1/2">
          <h3 className="text-2xl font-semibold lg:text-left py-8">Appointment Details</h3>

          <Accordion type="single" collapsible className=" p-y-2 px-4 rounded-lg border-2 border-slate-200">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex justify-between items-center gap-x-5">
                  <div className="p-4 bg-slate-200 rounded-lg">
                    <RiCalendarScheduleLine size={30} />
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-xl font-semibold text-gray-700">
                        {format(Date(date), 'PPP')}
                      </p>
                      <p className="text-gray-700">Time: {time}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-700">Staff: {StaffName}</p>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <VerticalTimeline lineColor="gray" layout="1-column-left" animate={false} className="w-1/2 p-0">
                    {selectedServices.map((serviceCategory, index) => (
                      <Fragment key={index}>
                        {serviceCategory.items.map((serviceItem, itemIndex) => (
                          <VerticalTimelineElement
                            key={itemIndex}
                            icon={<Image width={400} height={400} src={Pro} alt={serviceItem.name} />}
                            className=" p-2 py-"
                            visible={true}
                            contentStyle={{
                              boxShadow: "none",
                              border: "1px solid rgba(0, 0, 0, 0.05)",
                              textAlign: "left",
                              className:"p-2  bg-yellow-200 items-center "
                            }}
                            contentArrowStyle={{ borderRight: '7px solid rgb(33, 150, 243)' }}
                            iconStyle={{
                              background: "gray",
                              fontSize: "2.5rem",
                            }}
                          >
                            <div className="flex justify-between text-sm">
                              <h3 className="font-bold capitalize text-black">{serviceCategory.category}</h3>

                              <h3 className="font-bold capitalize text-black">{serviceItem.name}</h3>
                              <span className="font-normal !mt-0 text-black">${serviceItem.price}</span>
                            </div>
                          </VerticalTimelineElement>
                        ))}
                      </Fragment>
                    ))}
                  </VerticalTimeline>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button type="submit" className="w-full bg-black text-white py-3 px-6 rounded-md mt-6">
            Submit and Confirm
          </Button>
        </form>
    </div>
  );
}