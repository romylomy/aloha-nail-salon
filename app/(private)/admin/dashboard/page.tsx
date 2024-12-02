import { getDashboardData } from "@/server-actions/dashboard-reports";
import React from "react"
import { Alert } from "antd";
import DashboardCard from "@/components/dashboard-card";
import PageTitle from "@/components/page-title" 
import AppointmentTable from "@/components/appointmentTable";
import GroupEditing from "@/components/appointmentSchedule"

async function DashboardPage() {
    
   const {success, data} = await getDashboardData()
   if(!success){
    return(
        <Alert 
            message='failed to fetch dashboard data, please try again later'
            />
    )

   }
   const staffData = Array.from(
    new Map(
      data.todayAppointmentsData.map((appointment: any) => [
        appointment.staff._id, // Use `staff._id` as the key to ensure uniqueness
        {
          _id: appointment.staff._id,
          name: appointment.staff.name,
          email: appointment.staff.email,
          phone: appointment.staff.phone,
        },
      ])
    ).values()
  );
  
  const appointmentData = data.todayAppointmentsData
  .filter((appointment) => appointment.status === 'approved') // Filter only approved appointments
  .map((appointment) => {
    const startTime = new Date(`${appointment.date}T${appointment.time}`);
    const endTime = new Date(startTime.getTime() + 30 * 60 * 1000);

    return {
      Id: appointment._id,
      Subject: appointment.services.join(', '),
      Description: appointment.customer.name,
      StartTime: startTime,
      EndTime: endTime,
      IsAllDay: false,
      staffId: appointment.staff._id,
    };
  });

    console.log(data.todayAppointmentsData)
  console.log(staffData)
  console.log(appointmentData)
  
    return(
        <div className='p-5 y-5 flex flex-col gap-5'>
         <PageTitle title="dashboard"/>
         <GroupEditing appointmentData={appointmentData} staffData={staffData} />
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