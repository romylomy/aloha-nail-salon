"use client"
import React from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"

 import {Control } from "react-hook-form"
 import { FormFieldType } from './forms/AppointmentForm'
 import Image from "next/image"
import PhoneInput from 'react-phone-number-input/input'
import { E164Number } from "libphonenumber-js/core"
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import ReactDatePicker from "react-datepicker";




interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType
    name: string , 
    label?: string, 
    placeholder?: string , 
    iconSrc?:string, 
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode
    renderSkeleton?: (field: any ) => React.ReactNode 

}

const RenderField = ({field, props}: {field: any; props: CustomProps}) => {

    const {fieldType, iconSrc, iconAlt, placeholder } = props 

  switch (props.fieldType) {
    case FormFieldType.INPUT:

        return (
            <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                {iconSrc && (

                    <Image
                        src={iconSrc}
                        height={24}
                        width={24}
                        alt={iconAlt || 'icon'}
                        className='ml-2' 
                    />
                )}

                <FormControl>
                    <Input
                        placeholder={placeholder}
                        {...field}
                        className='shad-input border'/>
                </FormControl>
            </div>
        )
        
    case FormFieldType.PHONE_INPUT:
        return (
            <FormControl>
                <PhoneInput 
                   default="Canada"
                   placeholder={placeholder}
                   international 
                   withCountryCallingCode
                   value={field.value as E164Number | undefined}
                   onChange={field.onChange}
                   className="input-phone"



                   />
            </FormControl>
        )
        case FormFieldType.SELECT:
            return (
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="shad-select-trigger">
                      <SelectValue placeholder={props.placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="shad-select-content">
                    {props.children}
                  </SelectContent>
                </Select>
              </FormControl>
            )
        

         
    default:
        break;
  }
}


function CustomFormField(props: CustomProps) {

    const {control, fieldType, name, label, placeholder, iconSrc, iconAlt } = props 
  return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
        <FormItem className="flex-1">

            {fieldType !== FormFieldType.CHECKBOX && label && (
                <FormLabel>{label}</FormLabel>
            )}
            
            <RenderField field={field} props={props} /> 
            
            <FormMessage className="shad-error" />
        </FormItem>
        )}
    />
  )
}

export default CustomFormField