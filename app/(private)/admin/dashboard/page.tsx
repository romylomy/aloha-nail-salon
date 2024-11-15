import { getDashboardData } from "@/server-actions/dashboard-reports";
import React from "react"
import { Alert } from "antd";
import DashboardCard from "@/components/dashboard-card";
import PageTitle from "@/components/page-title" 
import AppointmentTable from "@/components/AppointmentTable";

async function DashboardPage() {
    
   const {success, data} = await getDashboardData()
   if(!success){
    return(
        <Alert 
            message='failed to fetch dashboard data, please try again later'
            />
    )

   }

   console.log(data)
    return(
        <div className='p-5 y-5 flex flex-col gap-5'>
         <PageTitle title="dashboard"/>
         <div className="grid grid-cols-4 gap-5 mt-5">
            <DashboardCard
                title="Today's Appointments"
                value={data?.todayAppointmentsCount || 0} 
                description="Total Appointments for today"/>
            
            <DashboardCard
                title="All Appointments"
                value={data?.allAppointmentsCount || 0} 
                description="Total Appointments Scheduled till now"/>
            
            <DashboardCard
                title="Staff"
                value={data?.allStaffCount || 0} 
                description="Total Appointments for today"/>
            
            <DashboardCard
                title="Customers"
                value={data?.allStaffCount || 0} 
                description="Total Customers registerd in the system"/>
            
         </div>
         <div className="mt-7">
            <h1 className="text-sm font-bold">Today's Appointment </h1>
            <AppointmentTable appointments={data?.todayAppointmentsData} />
         </div>
        </div>
    )
}

export default DashboardPage;
