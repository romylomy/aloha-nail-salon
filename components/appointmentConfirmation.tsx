// React and Next.js imports
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { IAppointment } from "@/interfaces"; // Import the IAppointment interface to type the appointment object.
// Local component imports
import { Section, Container } from "@/components/craft";

// Asset imports
import Poster from "@/public/poster.png";

interface IAppointmentReceiptProps {
  appointment: IAppointment;
}

// Helper function to render a property with a label and its corresponding value.
const renderProperty = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex justify-between items-center text-sm gap-x-2 py-1">
    <p className="font-semibold text-gray-700">{label}:</p>
    <span className="text-gray-900">{value}</span>
  </div>
);

// Helper function to format the date to "Thursday, January 23"
const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};

function AppointmentReceipt({ appointment }: IAppointmentReceiptProps) {
  return (
    <Section
      className="relative min-h-screen w-full bg-cover bg-center bg-slate-100 py-8 p-5"
      style={{
        backgroundImage: `url("/poster.png)`, // Apply the Poster image as background
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container className="max-w-2xl mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Aloha {appointment.customer.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            {`Your appointment on `}
            <span className="font-bold">{formatDate(appointment.date)}</span>
            {` with `}
            <span className="font-bold">{appointment.staff.name}</span>
            {` has been successfully confirmed.`}
          </p>
        </div>

        {/* Appointment Details */}
        <div className="mt-8 border-t border-gray-300 pt-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Appointment Details</h2>
          <div className="space-y-3">
            {renderProperty({ label: "Nail Tech", value: appointment.staff.name })}
            {renderProperty({ label: "Service(s)", value: appointment.services.join(", ") })}
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need to make changes? Contact us at <span className="font-semibold">587-973-6068</span>.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block bg-yellow-500 text-white px-6 py-2 rounded-full font-medium hover:bg-yellow-600 transition"
          >
            Home
          </Link>
        </div>
      </Container>
    </Section>
  );
}

export default AppointmentReceipt;
