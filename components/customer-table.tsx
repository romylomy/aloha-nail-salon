'use client'

import React, { useState } from 'react'
import {ICustomer} from '@/interfaces/index'
import {Table, Button} from 'antd'
import{Trash2, Pen, List } from 'lucide-react'
import CustomerAppointmentModal from '@/components/customers-appointment-modal'

interface CustomerTableProps {
  customers?: ICustomer[];  // Make the customers prop optional
}

function CustomerTable({ customers = [] }: CustomerTableProps) {  // Default to an empty array if not provided
  
    const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(null)
    const [showCustomerAppointmentModal, setShowCustomerAppointmentModal] = useState(false)

  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text: any, record: any) => (
        <div className='flex gap-5'>
          <Button size='small'>
            <Trash2 size={14} />
          </Button>

          <Button size='small'>
            <Pen size={14} />
          </Button>

          <Button 
            size='small'
            onClick={()=>{
              setSelectedCustomer(record)
              setShowCustomerAppointmentModal(true)
            }}>
            <List size={14} /> View Appointments
          </Button>
        </div>
      )
    }
  ]
  
  return (
    <div>
       <Table 
        dataSource={customers} 
        columns={columns} 
        rowKey='_id' 
        pagination={false} 
      /> 
      {
        selectedCustomer && setShowCustomerAppointmentModal && (
        <CustomerAppointmentModal 
            selectedCustomer={selectedCustomer}
            showCustomerAppointmentModal={showCustomerAppointmentModal}
            setShowCustomerAppointmentModal={setShowCustomerAppointmentModal}
            />
        )
          
      }
    </div>
  )
}

export default CustomerTable;
