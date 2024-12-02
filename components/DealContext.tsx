'use client'; // Indicates this file is to be executed on the client side.

import {
  createContext, 
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { NewDealInitialValuesType, NewDealType, newDealInitialValuesSchema } from "@/lib/validation";
import React from 'react';

const LOCAL_STORAGE_KEY = 'booking-form-newDealData';

const defaultDeal: NewDealInitialValuesType = {
  services: [],
  time: '',
  date: '', // This will be an empty string by default
  staff: '',
  customerName: '',
  phone: '',
  email: '',
  cost:''
};

type AddDealContextType = {
  newDealData: NewDealType;
  updatedNewDealDetails: (dealDetails: Partial<NewDealType>) => void;
  dataLoaded: boolean;
  resetLocalStorage: () => void;
  resetData: () => void;
};

export const AddDealContext = createContext<AddDealContextType | null>(null);

export const AddDealContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {

  const [newDealData, setNewDealData] = useState<NewDealInitialValuesType>(defaultDeal);
  const [dataLoaded, setDataLoaded] = useState(false);

  const updatedNewDealDetails = (dealDetails: Partial<NewDealType>) => {
    console.log("Updated Deal Details:", dealDetails); // Debug log
  
    setNewDealData((prev) => {
      const updatedData = {
        ...prev,
        ...dealDetails,
        // Only update the date if it's explicitly provided in dealDetails
        date:
          dealDetails.date !== undefined
            ? dealDetails.date instanceof Date
              ? dealDetails.date.toISOString()
              : dealDetails.date
            : prev.date, // Keep the existing date if none is provided
      };
  
      console.log("Updated Data:", updatedData); // Debug log
      return updatedData;
    });
  };
  

  const resetData = () => {
    setNewDealData(defaultDeal);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultDeal));
  };

  // Function to write the current form data (newDealData) to localStorage
  const writeToLocalStorage = useCallback(() =>  {
    console.log("Writing to localStorage:", newDealData); // Debug: log the data being written to localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newDealData));
    console.log("LocalStorage After Write:", localStorage.getItem(LOCAL_STORAGE_KEY)); // Debug: log localStorage value after writing
  }, [newDealData]);

  // Function to read and validate data from localStorage when the component mounts
  const readFromLocalStorage = () => {
    console.log('Reading from localStorage');
    const dataString = localStorage.getItem(LOCAL_STORAGE_KEY);
    
    if (!dataString) {
      console.log("No data found in localStorage, using default deal");
      return setNewDealData(defaultDeal);
    }

    const validated = newDealInitialValuesSchema.safeParse(JSON.parse(dataString));

    if (validated.success) {
      const data = validated.data;
      
      // Ensure the date is parsed correctly as a Date object
      if (data.date) {
        data.date = new Date(data.date); // Convert ISO string to Date object
      }

      console.log("Valid data from localStorage:", data); // Debug: log valid data loaded from localStorage
      setNewDealData(data);
    } else {
      console.log("Invalid data from localStorage, using default deal");
      setNewDealData(defaultDeal);
    }
  };

  useEffect(() => {
    readFromLocalStorage();
    setDataLoaded(true); // Mark that the data has been loaded
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      writeToLocalStorage();  // Write to localStorage when data is loaded
    }
  }, [newDealData, dataLoaded, writeToLocalStorage]);

  return (
    <AddDealContext.Provider value={{ newDealData, updatedNewDealDetails, dataLoaded, resetData }}>
      {children}
    </AddDealContext.Provider>
  );
};

export function useAddDealContext() {
  const context = useContext(AddDealContext);
  if (!context) {
    throw new Error('useAddDealContext must be used within an AddDealContext');
  }
  return context;
}
