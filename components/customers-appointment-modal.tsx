import React, { useEffect } from 'react';
import { ICustomer, IAppointment, IStaff } from '@/interfaces/index';
import { useState } from 'react';
import { getAppointmentByCustomerId } from '@/server-actions/appointments';
import { message, Modal, Table } from 'antd';
import { formatDateTime } from '@/lib/utils';

interface CustomerAppointmentModalProps {
  selectedCustomer: ICustomer;
  showCustomerAppointmentModal: boolean;
  setShowCustomerAppointmentModal: (show: boolean) => void;
}

function CustomerAppointmentModal({
  selectedCustomer,
  showCustomerAppointmentModal,
  setShowCustomerAppointmentModal,
}: CustomerAppointmentModalProps) {
  const [appointment, setAppointments] = useState<IAppointment[]>([]);

  const getData = async () => {
    try {
      if (!selectedCustomer?._id) {
        return message.error('No customer selected');
      }
      const { success, data } = await getAppointmentByCustomerId(selectedCustomer._id);
      if (!success) {
        return message.error('Failed to fetch appointments');
      }

      setAppointments(data);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (showCustomerAppointmentModal && selectedCustomer) {
      getData();  // Fetch data when modal is opened and a customer is selected
    }
  }, [showCustomerAppointmentModal, selectedCustomer]);

  const columns = [
    {
      title: 'Staff Name',
      dataIndex: 'staff',
      render: (staff: IStaff | undefined) => (staff ? staff.name : 'No staff assigned'),
    },
    {
      title: 'Services',
      dataIndex: 'services',
    },
    {
      title: 'Date & Time',
      dataIndex: 'time',
      render: (_: string, row: IAppointment) => {
        const dateTime = `${row.date}T${row.time}:00`;
        return <>{formatDateTime(dateTime, 'America/Edmonton')}</>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: string) => status.toUpperCase(),
    },
  ];

  return (
    <Modal
      open={showCustomerAppointmentModal}
      onCancel={() => setShowCustomerAppointmentModal(false)}
      footer={null}
      centered
      title={`Appointments of ${selectedCustomer.name}`}
      width={800}
    >
      <div className='mt-5'>
        <Table
          columns={columns}
          dataSource={appointment}
          rowKey='_id'
          pagination={false}
        />
      </div>
    </Modal>
  );
}

export default CustomerAppointmentModal;
