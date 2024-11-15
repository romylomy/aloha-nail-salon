import React from 'react'
import PageTitle from '@/components/page-title'
import {Button} from 'antd'
import Link from 'next/link';
import FormStaff from '@/components/forms/doctor-forms'
function AddStaff() {
  return (
    <div className=''>
        <div className=''> 
            <PageTitle title='Add Staff'/>
            <h1>Staff Form</h1>

            <FormStaff/>
    

        </div> 
    </div>
  )
}

export default AddStaff