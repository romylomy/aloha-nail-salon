'use client'
import { useEffect, useState, Fragment } from 'react';
import { useAddDealContext } from '@/components/DealContext';
import { toast } from 'react-hot-toast';
import PatientForm from '@/components/forms/patient-form';
import { checkStaffAvailability, saveAppointment } from '@/server-actions/appointments';
import { availabilitySchema, ClientFormValidation } from '@/lib/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { yearMonthFormat } from '@/lib/utils';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RiCalendarScheduleLine } from "react-icons/ri";

import Pedicure from "@/public/pedicure.png";
import Manicure from "@/public/manicure.png";
import NailRemoval from "@/public/nailRemoval.png";
import Other from "@/public/other.png";
import Pro from "@/public/pro.png";
import Design from "@/public/design.png";
import Extension from "@/public/extension.png";
import Image from "next/image";

const AppointmentForm = () => {
  const { updatedNewDealDetails, newDealData } = useAddDealContext();
  const router = useRouter();

  const storedPatientDetails = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('patientDetails') || '{}')
    : {};

  const patientForm = useForm({
    resolver: zodResolver(ClientFormValidation),
    defaultValues: storedPatientDetails || {
      customerName: '',
      email: '',
      phone: '',
    },
  });

  const { services, time, staff, date, customerName, email, phone, cost, taxes, subtotal } = newDealData;
  const StaffId = staff;
  const StaffName = typeof window !== 'undefined' ? localStorage.getItem('staffName') : '';
  const selectedServices = JSON.parse(localStorage.getItem('selectedServices') || '[]');

  const mapServices = selectedServices.flatMap((serviceCategory) => 
    serviceCategory.items.map((serviceItem) => serviceItem.name)
  )

  console.log('this is the map services')
  console.log(mapServices)

  const handleFinalSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const isPatientValid = await patientForm.trigger();
  
    if (isPatientValid) {
      const patientValues = patientForm.getValues(); // Get patient values only after validation
      console.log('this is the patient values')
      updatedNewDealDetails({
        customerName: patientValues.name,
        phone: patientValues.phone,
        email: patientValues.email,
      });
  
      try {
        console.log("Valid Patient Details Submitted:", patientValues);
        toast.success(`patient success this is the patient ${patientValues}`);

            
        const clientDetails = {
          name: customerName,
          email: email,
          phone: phone,
        };

        console.log(clientDetails)
  
        // Now handle the appointment saving
        const formattedDate = yearMonthFormat(date, 'UTC'); // Format the date
        const response = await saveAppointment({
          clientDetails: patientValues, // Save the appointment with the combined form values
          date: formattedDate,
          time: time,
          staffId: StaffId || '', // Use the selected staff ID, or a blank string if none
          services: selectedServices.flatMap((serviceCategory) =>
            serviceCategory.items.map((serviceItem) => serviceItem.name)
          ), // Flatten the service categories and map to service names
          fee: cost,
          StaffName: StaffName,
        });
  
        if (!response.success) {
          throw new Error(response.message); // If there's an error, throw it
        }

        router.push(`/appointment-confirmation?id=${response.data._id}`); // Navigate to the confirmation page

      } catch (error) {
        console.error('Error saving appointment:', error.message); // Log the error
        toast.error(error.message || "An unexpected error occurred."); // Show an error toast
      }
    } else {
      toast.error("Please correct the errors in the patient form.");
    }
  };
  
  

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 pt-10 sm:gap-y-4 ">
      <div className="flex flex-col lg:flex-row w-full gap-6 mt-10">
        <div className="lg:w-1/2">
          <h2 className="text-2xl font-bold py-8">Contact Info</h2>
          <PatientForm form={patientForm} />
        </div>

        <form onSubmit={handleFinalSubmit} className="lg:w-1/2">
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
                  <VerticalTimeline lineColor="gray" layout="1-column-left" animate={false} className="w-1/2 p-0 ">
                    {selectedServices.map((serviceCategory, index) => (
                      <Fragment key={index}>
                        {serviceCategory.items.map((serviceItem, itemIndex) => (
                          <VerticalTimelineElement
                            key={itemIndex}
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
                              <div>

                              <h3 className="font-bold capitalize text-black">{serviceCategory.category}</h3>

                              <h3 className="font-bold capitalize text-slate-600">{serviceItem.name}</h3>
                              </div>
                              <span className="font-normal !mt-0 text-black">${serviceItem.price}</span>
                            </div>
                          </VerticalTimelineElement>
                        ))}
                      </Fragment>
                    ))}
                  </VerticalTimeline>

                  <div className="mt-6 text-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">Subtotal:</span>
                      <span>
                        {`$${subtotal}`}
                    
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold ">Tax (5%):</span>
                      <span>
                      {`$${taxes}`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2 border-t pt-2">
                      <span className="font-bold text-lg">Total:</span>
                      <span className="font-bold text-lg">
                      {`$${cost}`}
                        
                      </span>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button type="submit" className="w-full bg-black text-white py-3 px-6 rounded-md mt-6">
            Submit and Confirm
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
