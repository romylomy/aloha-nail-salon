"use client";
// code reference https://github.com/adrianhajdin/healthcare and https://www.youtube.com/watch?v=lEflo_sc82g&t=7919s 

import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import Image from "next/image";
// Importing a phone input library for the phone number field
import PhoneInput from "react-phone-number-input/input";
// Importing types for the phone input field to ensure proper type handling                 
import { E164Number } from "libphonenumber-js/core"
import {  Form } from "antd";
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
    MultiSelector,
    MultiSelectorContent,
    MultiSelectorInput,
    MultiSelectorList,
    MultiSelectorTrigger,
  } from "@/components/ui/multi-select";
import ReactDatePicker from "react-datepicker";



// Enum to define different field types that groups together various types of form fields 
export enum FormFieldType {
  INPUT = "input",          
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",    
  DATE_PICKER = "datePicker",
  SELECT = "select",
  MULTI_SELECT ="multiSelect"     
}

// CustomProps interface defines the props that can be passed to the CustomFormField component
interface CustomProps {
  control: Control<any>;       // Control object from react-hook-form to manage the form field
  fieldType: FormFieldType;    // The type of field (input, phone input, date picker, etc.)
  name: string;                // Name of the form field (used for tracking value and validation)
  label?: string;              // Optional label for the form field
  placeholder?: string;        // Optional placeholder text
  iconSrc?: string | IconDefinition; // Optional icon for the input field (can be a string or FontAwesome icon)
  iconAlt?: string;            // Optional alt text for the icon (used when iconSrc is an image)
  disabled?: boolean;          // Optional flag to disable the field
  dateFormat?: string;         // Optional date format (for date picker fields)
  showTimeSelect?: boolean;    // Optional flag to show time picker in the date picker
  children?: React.ReactNode;  // Optional children for fields like Select that render dynamic options
}

{/* Custom input field for the full name using CustomFormField component 
  fieldType is passed as INPUT, and the control from react-hook-form is used (form.control 
  property is passed into customFormField which manages and connects individual fields to the form's state )*/}


const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, iconSrc, iconAlt, placeholder } = props;

  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400  ">
          
          {/* Ternary Operator used to conditionally render elements based on the value of iconSrc either of string or truthy value */}

          {typeof iconSrc === "string" ? (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "icon"}
              className="ml-2 py-2"
            />
          ) : iconSrc ? (
            <div />
          ) : null}
           
           {/*FormControl component acts as wrapper around form elements handling accessiblity attributes 
              aria-describy: display messages based on aria-invalid attribute 
              aria-invalid: determines is a boolean determining validity of field*/}
          <FormControl>
            <Input
              placeholder={placeholder}
              value={field.value}
              onChange={field.onChange}
              className='py-5'
              
            /* React Hook Form object attritbutes are passed down which are used to manage the input element
                 onChange: the function that handles input changes and updates the form's state 
                 onBlur: handles the event when the input loses focus
                 value: the current value of the input field 
                 name: the input field, used for state tacking */

              {...field}

              className="shad-input border"
            />
          </FormControl>
        </div>
      );
    
    case FormFieldType.TEXTAREA:
        return (
          <FormControl>
            <Textarea
              placeholder={placeholder}
              {...field}
              className=" bg-dark-400 placeholder:text-dark-600 border-dark-500 focus-visible:ring-0 focus-visible:ring-offset-0 "
             
            />
          </FormControl>
        );

    case FormFieldType.PHONE_INPUT:
      return (
        
        <div className="flex items-center">
          <div className="flex  text-sm rounded-md ">
          <FormControl >
          
          {/* Validation supports phone  numbers for canadian number 
            onChange ensures the state of the form is updated*/}
          <PhoneInput
            default="Canada"
            placeholder={placeholder}
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className='mt-2 h-11 border-2 border-dark-500  rounded-md px-3 text-sm  bg-dark-400 placeholder:text-dark-600 '
           
           
          />
        </FormControl>
          </div>
          
        </div>
      );

    case FormFieldType.SELECT:
      return (
        <FormControl>
           <div className="flex items-center border border-gray-300 bg-gray-100 rounded-md focus-within:border-yellow-500 focus-within:ring-yellow-500">
           
        {/*The select component is a custom dorpdowm component used to allow users to select the staff and service type of nails appointment */}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl> 

                {/*SelectTrigger display clickable area that selects the dropdown and 
                  SelectValue displays either the placeholder or select value
                  SelectContent rendners the actual dropdown menu that contains the selectable options as SelectTrigger is clicked
                  the result of mapping over the staff array which generates a list of selectItems will be displayed as props.children*/}
              <SelectTrigger className="bg-dark-400  placeholder:text-dark-600 border-dark-500 h-11 focus:ring-0 focus:ring-offset-0">
                <SelectValue className="text-slate-200" placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-dark-400 border-dark-500">
              {props.children}
            </SelectContent>
          </Select>
          </div>
        </FormControl>
      );

    case FormFieldType.DATE_PICKER:
      return (
        // ReactDatPicker component for data and time selection
        <div className="flex items-center rounded-md border border-gray-300 focus-within:border-yellow-500 focus-within:ring-yellow-500 w-fit">
         
          <FormControl>
            <ReactDatePicker
              showTimeSelect={props.showTimeSelect ?? false} // allows for the selection of time if showTimeSelect prop is true,
              selected={field.value} // current selected date
              onChange={(date: Date | null) => field.onChange(date)} // updates the form state when date is selected
              timeInputLabel="Time:" // Label for time
              dateFormat={props.dateFormat ?? "MM/dd/yyyy"} // format for displaying the date
              wrapperClassName="date-picker" // css class for custom styling of the date picker
            />
          </FormControl>
        </div>
      );


    case FormFieldType.MULTI_SELECT:
        return (
          // ReactDatPicker component for data and time selection
          <div className="flex w-full rounded-md border border-dark-500 bg-dark-400 ">
           
            <FormControl>
                <MultiSelector values={field.value} onValuesChange={field.onChange}>
                    <MultiSelectorTrigger>
                        <MultiSelectorInput placeholder={placeholder}/>
                    </MultiSelectorTrigger>
                    <MultiSelectorContent>
                        <MultiSelectorList>
                        {props.children}
                        </MultiSelectorList>
                    </MultiSelectorContent>
                </MultiSelector>
            </FormControl>
          </div>
        );

    default:
      return null;
  }
};



function CustomFormField(props: CustomProps) {

  // Destructuring props: pulling out control, fieldType, name, label, placeholder, iconSrc, and iconAlt from props
  const { control, fieldType, name, label } = props;
  return (
    // FormField component from react-hook-form, which connects the form field to form state and validation
    <FormField
      control={control} // passing the control prop coming from react-hook-form, to manage form state 
      name={name} // name of the form field that is used to track its value 
       
      // render prop is used to control how the form field is rendered. It provides access 
      render={({ field }) => (
        <FormItem className="flex-1">

           {/* Conditionally render the label if the fieldType is not a checkbox and if the label prop is provided */}
          {fieldType !== FormFieldType.CHECKBOX && label && <FormLabel>{label}</FormLabel>}

          {/* RenderField component handles rendering the correct form field (input, select, date picker, etc.) 
            based on the fieldType prop passed to CustomFormField. 
            The field object (from react-hook-form) and other props are passed down to RenderField. */}
          <RenderField field={field} props={props} />
          

          {/* FormMessage displays validation or error messages for the form field. 
              If there is an error, it will be displayed with a specific style. */}
          <FormMessage className="shad-error text-red-400" />
        </FormItem>
      )}
    />
  );
}

export default CustomFormField;
