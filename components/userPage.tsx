'use client';

import React, { useEffect } from 'react';
import IUser from '@/interfaces/index';
import { toast } from 'react-hot-toast';

interface StaffListProps {
  users: IUser[];
}

const StaffList: React.FC<StaffListProps> = ({ users }) => {
  // Show toast when users data is successfully passed

  /*React Strict Mode in development renders components twice to detect unexpected side effects 
    and ensure your components behave correctly. This double rendering causes the useEffect
     hook to run twice, leading to multiple toast notifications. */

  useEffect(() => {
    if (users.length > 0) {
      toast.success('Users loaded successfully');
    } else {
      toast.error('No users found');
    }
  }, [users]);

  return (
    <div className='p-5'>
      <h1 className='text-2xl font-bold'>Staff Members</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StaffList;