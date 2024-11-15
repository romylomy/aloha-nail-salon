import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
      {/* Logo */}
      <Link href="/">
        <Image src="/AlohaNailSalonLogo.svg" alt="logo" width={500} height={500} />
      </Link>

      {/* Navigation Links */}
      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="regular-16 text-black-100 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            {link.label}
          </Link>
        ))}
      </ul>

      {/* Signed-in and Signed-out Buttons */}
      <div className="lg:flexCenter hidden">
        {/* Content for signed-in users */}
  

        {/* Content for signed-out users */}
        <SignedOut>
          <SignInButton>
          </SignInButton>
        </SignedOut>
      </div>

      {/* Mobile Menu Icon */}
      <Image
        src="/menu.svg"
        alt="menu"
        width={32}
        height={32}
        className="inline-block cursor-pointer lg:hidden"
      />
    </nav>
  );
};

export default Navbar;
