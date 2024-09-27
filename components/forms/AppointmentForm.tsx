"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { UserFormValidation } from "@/lib/validation";


import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";



export enum FormFieldType { 
    INPUT  = 'input',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX= 'checkbox',
    DATE_PICKER='datePicker',
    SELECT ='select', 
    SKELETON = 'skeleton'
    

}

const Staff  = [

    {
      image: "/assets/images/",
      name: "Leila Cameron",
    },
    {
      image: "/assets/images/",
      name: "Evan Peter",
    },
    {
      image: "/assets/images/",
      name: "Jane Powell",
    },
    {
      image: "/assets/images/",
      name: "Alex Ramirez",
    },
    {
      image: "/assets/images/",
      name: "Jasmine Lee",
    },
    {
      image: "/assets/images/",
      name: "Alyana Cruz",
    },

  ];


const  AppointmentForm= () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "", 
      phone:"", 
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
         <section className="mb-12 space-y-4">
            <h1 className="header">Hi there </h1>
            <p className="text-dark-700">Schedule your first appointment </p>

         </section>
        <CustomFormField
            fieldType= {FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full name"
            placeholder= "John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
        />

        <CustomFormField
            fieldType= {FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder= "Johndoe@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
        />

        <CustomFormField
            fieldType= {FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder= "(587) 123-4567"
        />

        <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="nailStylist"
              label="Nail stylist"
              placeholder="Select a nail stylist"
            >
              {Staff.map((staff, i) => (
                <SelectItem key={staff.name + i} value={staff.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <p>{staff.name}</p>
                  </div>
                </SelectItem>
              ))}
        </CustomFormField>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default AppointmentForm