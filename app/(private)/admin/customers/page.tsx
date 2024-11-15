import { getAllCustomers } from '@/server-actions/customer'
import React from 'react'
import { Alert } from 'antd'
import PageTitle from '@/components/page-title'
import CustomerTable from '@/components/customer-table'
import FilterCustomer from '@/components/filter-customer'

interface CustomersPageProps{
    searchParams : {
        name: string,
        phone: string 
    }
}

async function CustomerList({searchParams}: CustomersPageProps) {
    const { success, data } = await getAllCustomers(searchParams)

    if (!success) {
        return <Alert message='Failed to fetch customers' type='error' showIcon />
    }

    const customers = data || []  // Provide a fallback empty array

    return (
        <div className='p-5'>
            <PageTitle title='Customers' />
            <FilterCustomer/>
            <CustomerTable customers={customers} /> 
        </div>
    )
}

export default CustomerList
