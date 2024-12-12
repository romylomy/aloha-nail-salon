"use client"
import { cn } from "@/lib/utils"
import { BookOpen, MenuIcon } from 'lucide-react'
import Link from "next/link"
import React, {useState} from "react"
import { Dialog, DialogClose } from "./ui/dialog"
import { Button } from "./ui/button"
import { NavigationMenu, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu"
// import ModeToggle from "../mode-toggle"
import { SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"


export default function NavBar() {
    
    const[isDrop, setDrop] = useState(false);

    const toggleDrop = () => setDrop(true);
    const hideDrop = () => setDrop(false);
    return (
        <div className="flex items-center min-w-full w-full fixed justify-center p-2 z-[50] mt-[2rem]">
            <div className="flex justify-end md:w-[1550px] w-full border dark:border-zinc-900 dark:bg-black relative backdrop-filter backdrop-blur-lg  border-black border-opacity-20 rounded-xl p-2 ">
                <Dialog>
                    <SheetTrigger className="min-[825px]:hidden p-2 transition">
                        <MenuIcon />
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle>fabrika.</SheetTitle>
                            <SheetDescription>
                                Scale and launch products with expert developers, on-demand, at a flat monthly fee
                            </SheetDescription>
                        </SheetHeader>
                        <div className="flex flex-col space-y-3 mt-[1rem] z-[99]">
                            <DialogClose asChild>
                                <Link href="/">
                                    <Button variant="outline" className="w-full">Home</Button>
                                </Link>
                            </DialogClose>
                            <DialogClose asChild>
                                <Link href="/software">
                                    <Button variant="outline" className="w-full">Software</Button>
                                </Link>
                            </DialogClose>
                            <DialogClose asChild>
                                <Link href="/automation">
                                    <Button variant="outline" className="w-full">Automation</Button>
                                </Link>
                            </DialogClose>
                            <DialogClose asChild>
                                <Link href="/blog">
                                    <Button variant="outline" className="w-full">Blog</Button>
                                </Link>
                            </DialogClose>
                            <DialogClose asChild>
                                <Link href="/projects">
                                    <Button variant="outline" className="w-full">Projects</Button>
                                </Link>
                            </DialogClose>
                        </div>
                    </SheetContent>
                </Dialog>
               
                <div className="flex items-center gap-10 max-[825px]:hidden">
                    <Link href="/">
                        <Button variant="ghost">About</Button>
                    </Link>
                    <Link href="/booking">
                        <Button variant="ghost">Book </Button>
                    </Link>
                    <div className="relative" onMouseEnter={toggleDrop}>
                        <Link href="/service">
                            <Button variant="ghost">Services</Button>
                        </Link>
                        {isDrop && (
                            <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-black dark:border-zinc-800" onMouseLeave={hideDrop}>
                                <Link href="/service">
                                    <Button variant="ghost" className="block text-left">
                                        Manicure
                                    </Button>
                                    </Link>
                                    <Link href="/service/pedicure">
                                    <Button variant="ghost" className="block text-left">
                                        Pedicure
                                    </Button>
                                    </Link>
                                    <Link href="/service/facial">
                                    <Button variant="ghost" className="block text-left">
                                        Facial
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                        
                    
                    
                    <Link href="/pricePage">
                        <Button variant="ghost">Prices</Button>
                    </Link>
                </div>
            </div>
        </div>

    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"