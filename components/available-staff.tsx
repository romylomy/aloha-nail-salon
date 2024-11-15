
import React from 'react';
import { IStaff } from '@/interfaces';
import { cn } from '@/lib/utils';

interface AvailableStaffProps {
  time: string;
  staffList: IUser[];
  selectedStaff: IUser | null;
  setSelectedStaff: (staff: IStaff) => void;
}

function AvailableStaff({ time, staffList, selectedStaff, setSelectedStaff }: AvailableStaffProps) {
  return (
    <div className='mt-7'>
      <h1 className='text-primary-text-sm font-bold'> Available Staff for the given date and time </h1>
      <div className="grid grid-cols-4 gap-5 mt-5">
        {staffList.map((staff) => (
          <div
            key={staff.id}
            className={cn(
              "p-3 border cursor-pointer gap-5 rounded-lg",
              selectedStaff && selectedStaff.id === staff.id ? "border-green-200 border-2" : "border-gray-300"
            )}
            onClick={() => setSelectedStaff(staff)}
          >
            <h2 className="font-bold text-md">{staff.name}</h2>
            <span>{time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvailableStaff;
