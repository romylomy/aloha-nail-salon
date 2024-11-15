import { clsx, type ClassValue } from "clsx";  // Import clsx function and type for conditional class name management
import { twMerge } from "tailwind-merge";  // Import twMerge to merge TailwindCSS class names, resolving conflicts

// Function to combine and merge class names, ensuring TailwindCSS class conflicts are resolved
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));  // Combine input class names using clsx, then merge with twMerge
}

// Example function to format a date with time and timezone information
export const formatDateTime = (date: string, timezone: string) => {
  // Define the options for date formatting
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',  // Display full year
    month: 'long',  // Display the full name of the month (e.g., 'October')
    day: 'numeric',  // Display the day of the month
    hour: '2-digit',  // Display the hour in 2-digit format (e.g., 01, 12)
    minute: '2-digit',  // Display the minute in 2-digit format (e.g., 05, 45)
    timeZone: timezone,  // Specify the timezone to use for the date formatting
  };
  // Return the formatted date string based on the 'en-US' locale and given options
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
};

// Function to format a date to the "yyyy-mm-dd" format for a given timezone
export const yearMonthFormat = (date: string, timezone: string) => {
  // Define the options for formatting the date to 'yyyy-mm-dd'
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',  // Display the full year
    month: '2-digit',  // Display the month in 2-digit format (e.g., 01, 12)
    day: '2-digit',  // Display the day of the month in 2-digit format (e.g., 01, 30)
    timeZone: timezone,  // Specify the timezone to use for the date formatting
  };
  // Format the date using 'en-CA' locale (Canada) for the desired 'yyyy-mm-dd' format
  const formattedDate = new Intl.DateTimeFormat('en-CA', options).format(new Date(date));
  return formattedDate;  // Return the formatted date as 'yyyy-mm-dd'
};
