
// app/admin/staff/page.tsx (Server Component)
import React from 'react';
import { getAllUsers } from '@/server-actions/users';
import {IUser} from '@/interfaces/index';
import UsersTable from '@/components/userTable';
import {Alert} from "antd"

export default async function StaffPage() {
  const { success, data } = await getAllUsers();

  console.log(data)

  if (!success) {
    // You can return some server-side error UI here if needed
    return (
        <Alert
            message="Failed to fetch users, please try again later"
            showIcon />
    );
  }

  // Pass the fetched users data to the Client Component
  return <UsersTable users={data} />;
}
