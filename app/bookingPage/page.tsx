import Image from "next/image";
import { Button } from "@/components/ui/button"
import AppointmentForm from "@/components/forms/AppointmentForm";
import { Link } from "lucide-react";

export default function bookingPage() {
  return (
    <div className=" flex h-screen mx-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* TODO: OTP Verification | Passkey*/}
      <section className="remove-scrollbar container my-auto ">
        <div className="sub-container max-w-[496px]"> 
          <Image
            src="/public/img1"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
        </div>
        <AppointmentForm/>
        <div className="text-14-regular mt-20 flex justify-between"> 
          <p className="justify-items-end text-dark-600 xl:text-left"> 
            © 2024 Aloha Nails Salon 
          </p>
          <Link href="/?admin=True" className="text-green-500" >
            Admin 
          </Link>
        </div>
        
        <Image
          src="/public/img2" 
          height="1000"
          width="1000"
          alt="patient"
          className="side-mg max-w[50%]"
          />

      </section>
    </div>
  );
}