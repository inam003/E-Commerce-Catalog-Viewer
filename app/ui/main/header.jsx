"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import supabase from "@/lib/supabaseClient";
import { Heart, LogOut, ShoppingCart, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Header = () => {
  const router = useRouter();
  const [checkUser, setCheckUser] = useState(null);

  useEffect(() => {
    const checkUserSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCheckUser(user);
    };

    checkUserSession();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Sign out error", error.message);

    toast.success("Logged out successfully");
    router.push("/login");
  };
  return (
    <div className="flex items-center justify-between p-3 sm:p-4 md:px-10 md:py-6">
      <Link href={"/"}>
        <h2 className="text-2xl font-bold">BrowseCart</h2>
      </Link>
      {checkUser ? (
        <div className="flex items-center gap-5">
          <Link href={"/catalog"}>
            <Button variant="outline" size="icon">
              <ShoppingCart className="size-5" />
            </Button>
          </Link>
          <Link href={"/favorites"}>
            <Button variant="outline" size="icon">
              <Heart className="size-5" />
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="/avatar.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{checkUser.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-lg cursor-pointer">
                <Link className="flex items-center" href={"/profile"}>
                  <User className="mr-2 size-4" />
                  My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleSignOut}
                className="rounded-lg cursor-pointer"
              >
                <LogOut className="mr-2 size-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Link href={"/login"}>
          <Button variant="secondary">Login</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
