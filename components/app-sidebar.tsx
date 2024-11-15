
// code references https://ui.shadcn.com/blocks#blocks 

// Import icons from the lucide-react library for use in the sidebar menu.
import { List, LayoutDashboard, GraduationCap, CalendarClock, Contact, Banknote, LogOut } from "lucide-react";

// Import components for building the sidebar UI.
import {
  Sidebar,               // Main Sidebar wrapper.
  SidebarContent,        // Wrapper for the sidebar's main content.
  SidebarGroup,          // Grouping element for related sidebar sections.
  SidebarGroupContent,   // Content wrapper for a group of sidebar items.
  SidebarGroupLabel,     // Label for each group of sidebar items.
  SidebarMenu,           // Container for the sidebar menu items.
  SidebarMenuButton,     // Button component for each menu item.
  SidebarMenuItem        // Individual menu item wrapper.
} from "@/components/ui/sidebar";

// Import Separator component for dividing sections in the sidebar.
import { Separator } from "@/components/ui/separator";

// Import Button component to display the sign-out button.
import { Button } from "@/components/ui/button"; // Ensure you're importing the Button component

// Import authentication hook from Clerk for handling user sign-out.
import { useAuth } from "@clerk/nextjs";

// Import toast from 'react-hot-toast' for displaying success or error messages.
import { toast } from 'react-hot-toast';

// Set a consistent size for icons used in the sidebar.
const iconSize = 40;

// Array of menu items for the sidebar with corresponding icons and URLs.
const items = [
  {
    title: "Dashboard", // Displayed title.
    url: "/admin/dashboard", // URL to navigate to when clicked.
    icon: <LayoutDashboard size={iconSize} />, // Icon displayed next to the title.
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: <GraduationCap size={iconSize} />, // Users section icon.
  },
  {
    title: "Appointments",
    url: "/admin/appointments",
    icon: <CalendarClock size={iconSize} />, // Appointments section icon.
  },
  {
    title: "Staff",
    url: "/admin/staff",
    icon: <Contact size={iconSize} />, // Staff section icon.
  },
  {
    title: "Customers",
    url: "/admin/customers",
    icon: <Contact size={iconSize} />, // Staff section icon.
  },
  {
    title: "Reports",
    url: "/admin/reports",
    icon: <Banknote size={iconSize} />, // Reports section icon.
  },
];

// Sidebar component for the admin dashboard.
export function AppSidebar() {
  // Destructure signOut function from the useAuth hook.
  const { signOut } = useAuth();

  // Function to handle the sign-out process.
  const handleSignOut = async () => {
    try {
      // Attempt to sign the user out and redirect them to the sign-in page.
      await signOut({ redirectUrl: '/sign-in' });
      toast.success('Successfully signed out'); // Display success message on successful sign-out.
    } catch (error) {
      console.error("Error signing out:", error); // Log errors in case of a failure.
    }
  };

  return (
    <Sidebar> {/* Main Sidebar container */}
      <SidebarContent> {/* Sidebar content container */}
        <SidebarGroup> {/* Grouping sidebar items under a common label */}
          <div className="my-10">
            <SidebarGroupLabel className="text-lg">Admin Menu</SidebarGroupLabel> {/* Label for this sidebar section */}
            <Separator /> {/* Divider between the label and the menu items */}
          </div>
          <SidebarGroupContent>
            <SidebarMenu className="gap-y-10"> {/* Sidebar menu containing all the items */}
              {items.map((item) => (
                <SidebarMenuItem key={item.title}> {/* Each menu item */}
                  <SidebarMenuButton asChild className="hover:bg-yellow-200 hover:border-2 border-yellow-300">
                    <a href={item.url} className="flex items-center gap-3"> {/* Link to navigate to the URL */}
                      {item.icon} {/* Display the icon associated with this menu item */}
                      <span className="text-lg">{item.title}</span> {/* Display the title of the menu item */}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            {/* Sign Out Button */}
            <Button
              variant="outline" // Outline style for the button.
              className="mt-10 w-full flex items-center justify-center gap-3 hover:bg-yellow-200" // Button styling.
              onClick={handleSignOut} // Trigger sign-out function when clicked.
            >
              <LogOut size={iconSize} /> {/* Sign out icon */}
              <span>Sign Out</span> {/* Text for the sign-out button */}
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
