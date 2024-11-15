'use server'

import AppointmentModel from "@/models/appointment-model"
import StaffModel from "@/models/staff-models"
import { daysToWeeks } from "date-fns"
import CustomerModel from "@/models/customer-model"
import dayjs from "dayjs"

export const getDashboardData = async () => {
    try{
        const [todayAppointmentsCount, allAppointmentsCount, allStaffCount, allCustomersCount, todayAppointmentsData ] = await Promise.all([
            AppointmentModel.countDocuments({date: dayjs().format('YYYY-MM-DD')}),
            AppointmentModel.countDocuments(),
            StaffModel.countDocuments(),
            CustomerModel.countDocuments(),
            AppointmentModel.find({date: dayjs().format('YYYY-MM-DD')}).populate('staff').populate('customer')
        ])

        return {
            success: true,
            data:{
                todayAppointmentsCount,
                allAppointmentsCount,
                allStaffCount,
                allCustomersCount,
                todayAppointmentsData : JSON.parse(
                    JSON.stringify(todayAppointmentsData)
                ),

            }

        }

    }catch(error:any){
        return{
            success: false,
            message: error.message 
        }
    }
}