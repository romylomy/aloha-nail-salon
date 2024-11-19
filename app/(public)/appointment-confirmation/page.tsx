'use client';

import PageTitle from "@/components/page-title";
import { useSearchParams } from "next/navigation";
import { IAppointment } from "@/interfaces/index";
import { getAppointmentById } from "@/server-actions/appointments";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import AppointmentReceipt from "@/components/confirmation-receipt";

function AppointmentConfirmation() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const appointmentId = searchParams.get("id") || "";
  const [appointment, setAppointment] = useState<IAppointment | null>(null);

  const getData = async () => {
    if (!appointmentId) return;
    try {
      console.log(`Fetching appointment with ID: ${appointmentId}`);
      setLoading(true);
      
      const { data, success } = await getAppointmentById(appointmentId); // Await the async function
      
      if (success) {
        setAppointment(data);
      } else {
        message.error("Failed to retrieve appointment data.");
      }
      
    } catch (error) {
      console.error("Error fetching appointment:", error);
      message.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (appointmentId) {
      getData();
    }
  }, [appointmentId]); // Trigger on appointmentId change

  return (
    <div className="p-5">
      <div className="justify-center flex ">
        <PageTitle title="Appointment Confirmation" />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        appointment && <AppointmentReceipt appointment={appointment} />
      )}
    </div>
  );
}

export default AppointmentConfirmation;
