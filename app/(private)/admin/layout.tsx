"use client";

import { Terminal, LogOut } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { getUserDataFromMongoDB } from "@/server-actions/users";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner"; // Assuming you have a Spinner component
import {IUsersStore, usersGlobalStore} from "@/store/users-store"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [error, setError] = useState<string | null>(null); // Error state
    const [loading, setLoading] = useState(true); // Loading state
    const {setCurrentUserData, currentUserData} : IUsersStore = usersGlobalStore() as any; 
    
  const { signOut } = useAuth();

  // Handle SignOut function
  const handleSignOut = async () => {
    try {
        await signOut({
            redirectUrl: "/sign-in", // Redirect path after sign-out
          });
        
          toast.success('Successfully signed out');

    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  // Fetch user data from MongoDB
  const getUserData = async () => {
    try {
      const response: any = await getUserDataFromMongoDB();
      if (response.success) {
        setCurrentUserData(response.data);
       

        // Check if account is approved
        if (response.data.isApproved === false) {
          setError("Your account is not approved yet. Please contact admin.");
        }
      } else {
        setError("An error occurred while fetching data.");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // Show loading spinner when loading is true
  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner />
      </div>
    );
  }

  // If there is an error, render the error message
  if (error) {
    return (
      <div className="p-10">
        <Alert className="bg-red-200 border-2 border-gray-400">
          <Terminal className="h-4 w-4" />
          <AlertTitle className="text-2xl">Account admin approval required</AlertTitle>
          <AlertDescription>
            {error} {/* Display the error */}
          </AlertDescription>
          <Button
            variant="outline"
            className="mt-10 flex items-center justify-center gap-3 hover:bg-black-200"
            onClick={() => signOut({ redirectUrl: '/' })}
          >
            <LogOut size={16} /> {/* Corrected icon syntax */}
            <span>Sign Out</span>
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-40 shrink-0 justify-between items-center bg-yellow-200 gap-2 px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Link className="text-black text-4xl font-bold" href="/">
              Aloha Nail Salon
            </Link>
          </div>

          {/* Display user name in the header (if user data is available) */}
          <div className="flex-cols items-center gap-x-2 ml-auto mr-10">
            <h1 className="text-black text-sm">{currentUserData?.name}</h1>
          </div>
        </header>

        {/* Main content */}
        <main className="flex flex-1 flex-col gap-4 px-10 py-10">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
