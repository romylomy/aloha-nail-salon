"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAddDealContext } from "@/components/DealContext";
import { useRouter } from "next/navigation"; // Import Next.js router for navigation
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";

const selectServicesSchema = z.object({
  services: z
    .array(
      z.object({
        category: z.string().min(1, "Category is required"),
        icon: z.string().min(1, "Icon is required"),
        items: z.array(
          z.object({
            name: z.string().min(1, "Service name is required"),
            price: z.number().min(1, "Price must be greater than 0"),
          })
        ),
      })
    )
    .min(1, "You must select at least one service"),
});

type ServicesFormData = z.infer<typeof selectServicesSchema>;

export default function AvailabilityForm() {
  const form = useForm<ServicesFormData>({
    resolver: zodResolver(selectServicesSchema),
    defaultValues: {
      services: [],
    },
  });

  const services = [
    { category: 'E-file Manicure', icon: 'Manicure', items: [{ name: 'Mani-uncoated', price: 35 }, { name: 'Reg polish', price: 40 }, { name: 'Shellac', price: 45 }, { name: 'Advanced colors', price: 50 }, { name: 'Shellac Builder', price: 55 }, { name: 'Gel polish (Overlay)', price: 60 }] },
    { category: 'E-file Pedicure', icon: 'Pedicure',items: [{ name: 'Pedi-uncoated', price: 50 }, { name: 'Reg polish', price: 55 }, { name: 'Shellac Luxe', price: 75 }, { name: 'Advanced colors', price: 80 }, { name: 'Pedi with color tips', price: 100 }, { name: 'Reg toe tips', price: 25 }] },
    { category: 'Extension', icon: 'Extension', items: [{ name: 'New Set', price: 75 }, { name: 'Nail Refill', price: 65 }, { name: 'Polygel', price: 95 }] },
    { category: 'Nail Removal', icon: 'Removal', items: [{ name: 'Reg Polish', price: 5 }, { name: 'Shellac', price: 15 }, { name: 'Acrylic/Gel', price: 25 }] },
    { category: 'Nail Design', icon: 'Design',items: [{ name: 'French Nail', price: 15 }, { name: 'Nail Design', price: 5 }] },
    { category: 'Pro Treatment', icon: 'Pro', items: [{ name: 'Nail / Hand Treatment with Clear Coating', price: 65 }] },
    { category: 'Others', icon: 'Other', items: [{ name: 'Extension', price: 5 }, { name: 'Repair', price: 5 }, { name: 'Cut Down', price: 10 }, { name: 'Reg Polish Change', price: 15 }, { name: 'Shellac Change', price: 30 }] },
  ];
  const addService = (serviceCategory: string, serviceIcon: string, service: { name: string, price: number }) => {
    const selectedService = {
      category: serviceCategory,
      icon: serviceIcon,
      items: [service]  // Wrap service in an array since 'items' is an array in your schema
    };
    const currentServices = form.getValues("services");
    form.setValue("services", [...currentServices, selectedService]);  // Append selected service to the array
  };

  const removeService = (index: number) => {
    const currentServices = form.getValues("services");
    form.setValue(
      "services",
      currentServices.filter((_, i) => i !== index)
    );
  };

  const { updatedNewDealDetails, newDealData } = useAddDealContext();
  const router = useRouter();

  useEffect(() => {
    const subscription = form.watch((value) => {
      // Convert selected services to a JSON string
      const selectedServices = value.services ? JSON.stringify(value.services) : '[]';
      localStorage.setItem("selectedServices", selectedServices);
  
      // Calculate subtotal
      const newSubtotal = value.services?.reduce(
        (total, service) =>
          total +
          (Array.isArray(service.items) ? service.items.reduce((sum, item) => sum + (item.price || 0), 0) : 0),
        0
      ) || 0;
  
      // Calculate taxes (e.g., 5%)
      const newTaxes = newSubtotal * 0.05;
  
      // Calculate total cost
      const newTotalCost = newSubtotal + newTaxes;
  
      // Update the context with the calculated values
      updatedNewDealDetails({
        ...newDealData,
        services: selectedServices,
        subtotal: newSubtotal,
        taxes: newTaxes,
        subtotal:newSubtotal,
        cost: newTotalCost,
      });
    });
  
    return () => subscription.unsubscribe();
  }, [form, updatedNewDealDetails, newDealData]);


  
  const onSubmit = (data: ServicesFormData) => {
    try {
      router.push("/booking/step-two");
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4">
    <h1 className="text-2xl lg:text-4xl text-start mb-12">Our Services</h1>
    <div className="w-full max-w-3xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col md:flex-row md:gap-x-10">
            <Accordion type="single" collapsible className="w-full">
              {services.map((serviceCategory, index) => (
                <AccordionItem key={index} value={`${index}`}>
                  <AccordionTrigger className="text-md lg:text-xl">
                    {serviceCategory.category}
                  </AccordionTrigger>
                  <AccordionContent className="bg-slate-200 p-4 rounded-lg">
                    <ul className="space-y-2 text-black text-sm lg:text-md">
                      {serviceCategory.items.map((item) => (
                        <li key={item.name} className="flex justify-between items-center">
                          <span className="flex-1">{item.name}</span>
                          <span className="min-w-[60px] text-right">${item.price.toFixed(2)}</span>
                          <button
                            type="button"
                            className="text-sm text-yellow-800 ml-4 hover:scale-110"
                            onClick={() => addService(serviceCategory.category, serviceCategory.icon, item)}
                          >
                            <IoIosAddCircleOutline />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
  
            <div className="bg-slate-100 w-full border-2 mt-10 border-slate-200 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Selected Services</h2>
              <ul className="space-y-2 text-md">
                {form.watch("services").map((service, serviceIndex) =>
                  service.items && service.items.length > 0 ? (
                    service.items.map((item, itemIndex) => (
                      <li key={`${serviceIndex}-${itemIndex}`} className="flex justify-between items-center gap-y-2">
                        <span className="flex-1">{item.name}</span>
                        <span className="min-w-[60px] text-right">${item.price.toFixed(2)}</span>
                        <button
                          type="button"
                          className="text-sm text-red-500 ml-4 hover:scale-110"
                          onClick={() => removeService(serviceIndex)}
                        >
                          <CiCircleRemove />
                        </button>
                      </li>
                    ))
                  ) : null
                )}
              </ul>
  
              {/* Subtotal and Tax Calculation */}
              {form.watch("services").length > 0 && (
                <>
                  <div className="mt-6">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Subtotal:</span>
                      <span>
                        $
                        {form.watch("services").reduce(
                          (subtotal, service) =>
                            subtotal +
                            (Array.isArray(service.items)
                              ? service.items.reduce((sum, item) => sum + (item.price || 0), 0)
                              : 0),
                          0
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Tax (5%):</span>
                      <span>
                        $
                        {(
                          form.watch("services").reduce(
                            (subtotal, service) =>
                              subtotal +
                              (Array.isArray(service.items)
                                ? service.items.reduce((sum, item) => sum + (item.price || 0), 0)
                                : 0),
                            0
                          ) * 0.05
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2 border-t pt-2">
                      <span className="font-bold text-lg">Total:</span>
                      <span className="font-bold text-lg">
                        $
                        {(
                          form.watch("services").reduce(
                            (subtotal, service) =>
                              subtotal +
                              (Array.isArray(service.items)
                                ? service.items.reduce((sum, item) => sum + (item.price || 0), 0)
                                : 0),
                            0
                          ) * 1.05
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <Button type="submit" className="mt-8 w-full" variant="default">
                    Continue
                  </Button>
                </>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  </div>
  
  );
}
