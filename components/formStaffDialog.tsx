
// code references https://ui.shadcn.com/docs/components/dialog and chatgpt

'use client';

import { useState, useEffect } from "react";
import React from 'react';
import FormStaff from '@/components/forms/staff-forms';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";

interface StaffFormProps {
  type: "add" | "edit";
  staffId?: string;
}

const FormStaffDialog = ({ type, staffId }: StaffFormProps) => {
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch staff details using the API route
  const fetchStaffDetails = async (id: string) => {
    try {
      setLoading(true); // Set loading to true at the start of the fetch
      const response = await fetch(`/api/staff/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch staff details');
      }
      const data = await response.json();
      setInitialValues(data); // Set the fetched data as initial values
    } catch (error) {
      console.error("Error fetching staff data:", error);
    } finally {
      setLoading(false); // Set loading to false once done
    }
  };

  // Use `useEffect` to fetch staff data only when dialog is opened in "edit" mode
  useEffect(() => {
    if (type === "edit" && staffId && open) {
      fetchStaffDetails(staffId);
    }
  }, [type, staffId, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          {type === "add" ? "Add Staff" : <>
            <Pencil size={14} /> Edit Staff
          </>}
        </Button>
      </DialogTrigger>
      <DialogContent className="text-lg shad-dialog lg:max-h-lg lg:max-w-xl sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">
            {type === "add" ? "Create Staff" : "Edit Staff"}
          </DialogTitle>
          <DialogDescription>
            Please fill in the following details to {type === "add" ? "add" : "edit"} staff
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <FormStaff type={type} initialValues={initialValues} setOpen={setOpen} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FormStaffDialog;
