import React from "react";
import { IStaff } from "@/interfaces";
import { cn } from "@/lib/utils";
import Link from 'next/link'

interface AvailableStaffProps {
  time: string;
  staffList: IStaff[];
  selectedStaff: IStaff | null;
  setSelectedStaff: (staff: IStaff) => void;
}

function AvailableStaff({
  time,
  staffList,
  selectedStaff,
  setSelectedStaff,
}: AvailableStaffProps) {

  console.log("Selected Staff in AvailableStaff:", selectedStaff);

  return (
    <div className="mt-7">
      <h1 className="text-primary text-sm font-bold">
        Select Available Staff for the given date and time
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 pb-5">
        {staffList.map((staff) => (
          <div
            key={staff._id}
            className={cn(
              "p-3 border cursor-pointer rounded-lg transition-colors duration-300",
              selectedStaff?._id === staff._id
                ? "border-yellow-400 border-2"
                : "border-gray-300 hover:border-gray-400"
            )}
            onClick={() => setSelectedStaff(staff)}
          >
            <h2 className="font-bold text-md">{staff.name}</h2>
            <span>{time}</span>
          </div>
        ))}
      </div>
      {
        selectedStaff &&  <Link className="border-2 p-2 rounded-md bg-black text-white border-slate-200 " href="/booking/step-three">Next</Link>

      }
    </div>
  );
}

export default AvailableStaff;
