
// code references https://github.com/adrianhajdin/healthcare on how he makes reusable forms 


import { UseFormReturn } from "react-hook-form"; 
// Importing the type definition for UseFormReturn from react-hook-form, which represents the return value of useForm.

import CustomFormField, { FormFieldType } from "../CustomFormField"; 
// Importing CustomFormField component and the FormFieldType enum from the custom field component.

import { Form } from "@/components/ui/form"; 
// Importing Form component from the UI library.

interface PatientFormProps {
  // Defining the interface for the props that the PatientForm component will accept.
  form: UseFormReturn<{ name: string; email: string; phone: string }>; 
  // The form prop is of type UseFormReturn, with a form structure that includes name, email, and phone fields.
}

const PatientForm: React.FC<PatientFormProps> = ({ form }) => {
  // Defining the PatientForm component using React's functional component syntax and typing props with React.FC.

  return (
    <Form  {...form}>
      {/* Rendering the form component, passing all form properties as props using the spread operator */}
      
      <form className="flex-1 space-y-6 " onSubmit={form.handleSubmit((data) => console.log(data))}>
        {/* Form element that handles the form submission and logs the form data on submit. */}
        
        <CustomFormField
          fieldType={FormFieldType.INPUT} 
          // Specifies that this is a regular input field.
          control={form.control} 
          // Passes the form's control object to manage the field's state and validation.
          name="name" 
          // The name of the form field, used to bind the input to the form's state.
          label="Full name" 
          // The label that appears above the input field.
          placeholder="John Doe" 
          // Placeholder text for the input field.
          iconAlt="user" 
          // An optional icon to indicate that this is a name field.
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT} 
          // Another regular input field for email.
          control={form.control} 
          name="email" 
          label="Email" 
          placeholder="johndoe@gmail.com" 
          iconAlt="email" 
          // Optional icon indicating that this field is for email input.
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT} 
          // Specifies this is a phone number input field, likely with phone-specific formatting.
          control={form.control} 
          name="phone" 
          label="Phone number" 
          placeholder="(555) 123-4567" 
          // Placeholder text for phone input.
        />
        
      </form>
    </Form>
  );
};

export default PatientForm; 
// Exporting the PatientForm component as the default export.
