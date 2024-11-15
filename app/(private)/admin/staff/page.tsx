
import React from 'react'
import PageTitle from '@/components/page-title'
import Link from 'next/link';
import FormStaff from '@/components/forms/staff-forms'
import {getStaff} from "@/server-actions/staff"
import {Alert} from 'antd'
import StaffTable from "@/components/StaffTable"
import FormStaffDialog from '@/components/FormStaffDialog'

async function StaffPage() {
    const {success, data} = await getStaff()

    if (!success) {
        console.log( data )
        // You can return some server-side error UI here if needed
        return (
            <Alert
                message="Failed to fetch doctors, please try again later"
                showIcon />
        );
      }

    const staff = data;

  return (
    <div>
        <div className='py-3'> 
            <PageTitle title='Staff'/>
            <FormStaffDialog type="add" /> 
        </div>
        <StaffTable staff ={staff} />
    </div>
  )
}

export default StaffPage;