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
      image: "/assets/images/dr-green.png",
      name: "John Green",
    },
    {
      image: "/assets/images/dr-cameron.png",
      name: "Leila Cameron",
    },
    {
      image: "/assets/images/dr-livingston.png",
      name: "David Livingston",
    },
    {
      image: "/assets/images/dr-peter.png",
      name: "Evan Peter",
    },
    {
      image: "/assets/images/dr-powell.png",
      name: "Jane Powell",
    },
    {
      image: "/assets/images/dr-remirez.png",
      name: "Alex Ramirez",
    },
    {
      image: "/assets/images/dr-lee.png",
      name: "Jasmine Lee",
    },
    {
      image: "/assets/images/dr-cruz.png",
      name: "Alyana Cruz",
    },
    {
      image: "/assets/images/dr-sharma.png",
      name: "Hardik Sharma",
    },
  ];


const  PatientForm = () => {
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
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
        />

        <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Staff.map((staff, i) => (
                <SelectItem key={staff.name + i} value={staff.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={staff.image}
                      width={32}
                      height={32}
                      alt="staff"
                      className="rounded-full border border-dark-500"
                    />
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

export default PatientForm