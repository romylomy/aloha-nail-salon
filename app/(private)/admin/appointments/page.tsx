import React from 'react'
import PageTitle from "@/components/page-title"
import { Alert } from 'antd'
import {getAllAppointments} from "@/server-actions/appointments"
import AppointmentTable from "@/components/appointmentTable"
import AppointmentFilters from "@/components/appointments-filter"

interface appointmentPageProps {
  searchParams:{
    date: string,
    customerName: string,
    staffName: string
  }
}

async function AppointmentPage({searchParams}:appointmentPageProps) {

    const {success, data} = await getAllAppointments(searchParams)
    
    if(!success){
        return <Alert message="Failed to fetch appointments" showIcon />
    }

    const appointments = data

  return (
    <div className="p-5 ">
        <PageTitle title="Appointments"/>
        <AppointmentFilters/>

    <AppointmentTable appointments={appointments}/>
    </div>

  )
}

export default AppointmentPage