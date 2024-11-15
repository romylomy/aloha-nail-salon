// code reference https://github.com/adrianhajdin/healthcare and https://www.youtube.com/watch?v=lEflo_sc82g&t=7919s 

// Importing the `Image` component from Next.js to render optimized images (such as the loading spinner).
import Image from "next/image";

// Importing the `Button` component from a custom UI library or framework.
// This `Button` component will be the base for the submit button.
import { Button } from "./ui/button";

// Defining the props that the `SubmitButton` component will accept.
interface ButtonProps {
  // determines whether the button is in a loading state.
  isLoading: boolean;
  
  //string that allows custom styling for the button.
  className?: string;

  // ` elements or text inside the button, typically a label like "Submit".
  children: React.ReactNode;
}

// `SubmitButton` is a functional component that accepts `isLoading`, `className`, and `children` props.
const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (

    <Button
      type="submit"
      
      // The button is disabled when `isLoading` is true, preventing multiple submissions.
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
    >
      {/* 
        If `isLoading` is true, display the loading spinner and the "Loading..." text.
        Otherwise, display the `children` .
      */}
      {isLoading ? (
        <div className="flex items-center gap-4">
          {/* Displaying a loading spinner using the `Image` component from Next.js. */}
          <Image
            src="/assets/icons/loader.svg" // Path to the spinner image.
            alt="loader"                    // Alt text for accessibility.
            width={24}                      // Width of the image (24px).
            height={24}                     // Height of the image (24px).
            
            // Adding a CSS animation class to make the spinner rotate.
            className="animate-spin"
          />
          Loading...
        </div>
      ) : (
        // If not loading, render the `children` passed to the button (e.g., the button label).
        children
      )}
    </Button>
  );
};

// Exporting the `SubmitButton` component to be used in other parts of the application.
export default SubmitButton;
