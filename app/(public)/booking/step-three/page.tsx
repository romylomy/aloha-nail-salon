'use client'; // Indicates this file is to be executed on the client side.

import { useEffect, useState } from 'react';
import { useAddDealContext } from '@/components/DealContext'; // Import the context to access deal data.
import { toast } from 'react-hot-toast';
import PatientForm from '@/components/forms/patient-form';
import { checkStaffAvailability, saveAppointment } from '@/server-actions/appointments';
import { availabilitySchema, ClientFormValidation } from '@/lib/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation"; // Import Next.js router for navigation

const AppointmentForm = () => {
  const { updatedNewDealDetails, newDealData } = useAddDealContext(); // Use context to access and update deal data.
  const router = useRouter(); // Initialize the router

  const storedPatientDetails = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('patientDetails') || '{}')
    : {};
    console.log("this is the stored patient details ")
  console.log(storedPatientDetails)
  const patientForm = useForm({
    resolver: zodResolver(ClientFormValidation),
    defaultValues: storedPatientDetails || {
      customerName: '',
      email: '',
      phone: '',
    },
  });

  const handleFinalSubmit = async () => {
    const isPatientValid = await patientForm.trigger(); // Validate only the patient form
  
    if (isPatientValid) {
      const patientValues = patientForm.getValues();
  
      // Ensure the values are updated in context before proceeding
      updatedNewDealDetails({
        customerName: patientValues.customerName,
        phone: patientValues.phone,
        email: patientValues.email,
      });
  
      try {
        console.log("Valid Patient Details Submitted:", patientValues);
        toast.success("Patient details validated successfully!");
        router.push("/booking/review");
      } catch (error: any) {
        toast.error(error.message || "An unexpected error occurred.");
      }
    } else {
      toast.error("Please correct the errors in the patient form.");
    }
  };

    
  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 pt-10">
      <div className="w-full max-w-3xl">
        {/* Render Patient Form */}
        <PatientForm form={patientForm} />

        {/* Submit Button for Confirming and Submitting */}
        <button onClick={handleFinalSubmit} className="bg-black mt-4 text-white py-2 px-4 rounded-md ">
          Next
        </button>
      </div>
    </div>
  );
};

export default AppointmentForm;
