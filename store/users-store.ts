// Import the `create` function from the Zustand library.
// Zustand is a state management library for React that allows creating a global state.
import {IUser} from "@/interfaces"
import { create } from 'zustand'

// Define a global store for user data using Zustand's `create` function.
// `set` is a function provided by Zustand to update the state.
export const usersGlobalStore = create((set) => ({
  // Initialize `currentUserData` with `null` to represent no user data initially.
  currentUserData: null,

  // Define a function to update the `currentUserData` state.
  // This function takes `data` (of type `IUser`) and updates the state.
  setCurrentUserData: (data: IUser) => set ({ currentUserData: data })

}))

// Define a TypeScript interface to describe the shape of the store's state.
// The store contains `currentUserData` and the function `setCurrentUserData`.
export interface IUsersStore {
  // `currentUserData` can be an object of type `IUser` or `null` if there is no user data.
  currentUserData: IUser | null,

  // `setCurrentUserData` is a function that takes an `IUser` object and returns `void` (no return value).
  setCurrentUserData: (data: IUser) => void
}
