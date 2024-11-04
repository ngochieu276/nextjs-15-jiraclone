"use client";

interface AuthLayoutProps {
  children: React.ReactNode;
}

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";

  return (
    <main className=" bg-neutral-100 min-h-screen">
      <div className=" mx-auto max-w-screen-2xl p-4">
        <nav className=" flex justify-between items-center">
          <Image src={"/logo.svg"} alt="logo" height={56} width={152} />
          <div className=" flex items-center gap-2">
            <Button asChild variant={"secondary"}>
              <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
                {isSignIn ? "Sign Up" : "Login"}
              </Link>
            </Button>
          </div>
        </nav>
        <div className=" flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
