'use client'; // Indicates this file is to be executed on the client side.

import {
  createContext, // Creates a Context object for state sharing across the component tree.
  useCallback,   // Memoizes a function to prevent unnecessary re-creation.
  useContext,    // Accesses the nearest Context provider value in the component tree.
  useEffect,     // Executes side effects (e.g., fetching data or subscribing to events).
  useMemo,       // Optimizes performance by memoizing computed values.
  useState,      // Manages local component state.
} from 'react';

import {
  NewDealInitialValuesType, // Type definition for the default deal structure.
  NewDealType,              // Type definition for updating deal details.
  newDealInitialValuesSchema, // Schema for validating the deal data structure.
} from '@/lib/validation';

// Default structure for a new deal when no data exists in local storage.
const defaultDeal: NewDealInitialValuesType = {
  services: '',
  time: '',
  date: '',
  customerName: '',
  email: '',
  phone: '',
  name: '',
  staff: '',
  taxes:'',
  subtotal:'', 
  cost:'',
};

// Key used to store and retrieve data in local storage.
const LOCAL_STORAGE_KEY = 'multi-page-form-demo-newDealData';

// Type definition for the context value.
type AddDealContextType = {
  newDealData: NewDealInitialValuesType; // Current deal data state.
  updateNewDealDetails: (dealDetails: Partial<NewDealType>) => void; // Function to update the deal details.
  dataLoaded: boolean; // Indicates if the data has been successfully loaded from storage.
  resetLocalStorage: () => void; // Function to reset local storage and deal state.
};

// Create a React context for the Add Deal feature, initialized to null.
export const AddDealContext = createContext<AddDealContextType | null>(null);

// Context Provider component to share state across the component tree.
export const AddDealContextProvider = ({
  children, // Any nested components that need access to the context.
}: {
  children: React.ReactNode;
}) => {
  // Local state to manage the current deal data.
  const [newDealData, setNewDealData] =
    useState<NewDealInitialValuesType>(defaultDeal);

  // State to track whether data has been successfully loaded from local storage.
  const [dataLoaded, setDataLoaded] = useState(false);

  // Load data from local storage when the component mounts.
  useEffect(() => {
    readFromLocalStorage();
    setDataLoaded(true);
  }, []);

  // Save data to local storage whenever `newDealData` changes after the initial load.
  useEffect(() => {
    if (dataLoaded) {
      saveDataToLocalStorage(newDealData);
    }
  }, [newDealData, dataLoaded]);

  // Function to update the deal details with partial updates.
  const updateNewDealDetails = useCallback(
    (dealDetails: Partial<NewDealType>) => {
      setNewDealData((prev) => ({
        ...prev, // Merge existing deal data with new updates.
        ...dealDetails,
        date: dealDetails.date instanceof Date
          ? dealDetails.date.toISOString() // Ensure `date` is always a string.
          : dealDetails.date,
        services: Array.isArray(dealDetails.services)
          ? dealDetails.services.join(', ') // Convert array to string, if necessary.
          : dealDetails.services, // Otherwise, keep as-is.
      }));
    },
    [] // Dependencies are empty because no external variables are referenced.
  );

  // Save the current deal data to local storage as a JSON string.
  const saveDataToLocalStorage = (
    currentDealData: NewDealInitialValuesType
  ) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentDealData));
  };

  // Read deal data from local storage and validate it using the schema.
  const readFromLocalStorage = () => {
    const loadedDataString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!loadedDataString) return setNewDealData(defaultDeal); // Use default if no data exists.

    const parsedData = JSON.parse(loadedDataString);
    const validated = newDealInitialValuesSchema.safeParse(parsedData);

    if (validated.success) {
      setNewDealData(validated.data); // Update state if validation succeeds.
    } else {
      setNewDealData(defaultDeal); // Fallback to default deal on validation failure.
    }
  };

  // Clear local storage and reset the deal data to defaults.
  const resetLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setNewDealData(defaultDeal);
  };

  // Memoize the context value to prevent unnecessary re-renders.
  const contextValue = useMemo(
    () => ({
      newDealData,
      dataLoaded,
      updateNewDealDetails,
      resetLocalStorage,
    }),
    [newDealData, dataLoaded, updateNewDealDetails]
  );

  // Provide the context value to all children components.
  return (
    <AddDealContext.Provider value={contextValue}>
      {children}
    </AddDealContext.Provider>
  );
};

// Hook to access the AddDealContext within a child component.
export function useAddDealContext() {
  const context = useContext(AddDealContext); // Retrieves the context value.
  if (context === null) {
    throw new Error(
      'useAddDealContext must be used within a AddDealContextProvider'
    );
  }
  return context; // Returns the context value.
}
