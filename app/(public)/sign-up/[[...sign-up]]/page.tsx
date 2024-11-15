//import SignUp renders a Signup component  
import { SignUp } from '@clerk/nextjs'
 
export default function Page() {
  return (
    <div className='flex justify-center items-center h-screen'>
        <SignUp 
          fallbackRedirectUrl="/admin/dashboard" 
    />    
    </div>

  )
 //fallbackRedirectUrl is signUp attribute that directs client to admin dashboard after successful user creation 
}