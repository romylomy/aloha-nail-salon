'use client'

import React from 'react'
import {Button, Input } from "antd"
import { useRouter } from 'next/navigation'


function AppointmentFilters() {

    const [date, setDate] = React.useState('')
    const [customerName, setCustomerName] = React.useState('')
    const [staffName, setStaffName] = React.useState('') 
    const router = useRouter()

    const onFilter = () => {
        router.push(`/admin/appointments?date=${date}&customerName=${customerName}&staffName=${staffName}`)
    }

    const resetFilter = () => {
        setDate('')
        setCustomerName('')
        setStaffName('')
        router.push(`/admin/appointments`)
    }

    return (
        <div className="grid lg:grid-cols-4 gap-5 items-end py-7">
          <div className="flex flex-col">
            <label htmlFor="Search" className="text-sm">
              Appointment Date
            </label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
    
          <div className="flex flex-col">
            <label htmlFor="Speciality" className="text-sm">
              Staff Name
            </label>
            <Input
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
            />
          </div>
    
          <div className="flex flex-col">
            <label htmlFor="Phone" className="text-sm">
              Customer Name
            </label>
            <Input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
    
          <div className="flex justify-end gap-5">
            <Button onClick={resetFilter}>Clear Filters</Button>
            <Button type="primary" onClick={onFilter}>
              Apply Filters
            </Button>
          </div>
        </div>
      );
    }

export default AppointmentFilters