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
import { Badge } from "@/components/ui/badge";
import { userSession } from "@/lib/utils";

const Header = () => {
  const router = useRouter();
  const [checkUser, setCheckUser] = useState(null);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [catalogProducts, setCatalogProducts] = useState([]);

  useEffect(() => {
    const checkUserSession = async () => {
      const user = await userSession();
      setCheckUser(user);
    };

    checkUserSession();
  }, []);

  useEffect(() => {
    if (checkUser) {
      totalFavoriteProducts();
      totalCatalogProducts();
    }
  }, [favoriteProducts, catalogProducts]);

  const totalFavoriteProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("favorites")
        .select()
        .eq("user_id", checkUser.id);

      if (error) {
        console.error("Error fetching favorite products:", error);
      } else {
        setFavoriteProducts(data.length);
      }
    } catch (error) {
      console.error("Error fetching favorite products:", error);
    }
  };

  const totalCatalogProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select()
        .eq("user_id", checkUser.id);

      if (error) {
        console.error("Error fetching catalog products:", error);
      } else {
        setCatalogProducts(data.length);
      }
    } catch (error) {
      console.error("Error fetching favorite products:", error);
    }
  };

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
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="size-5" />
              <Badge className="absolute -top-2 -right-2 inline-flex items-center justify-center size-5 text-xs font-bold text-white bg-red-500 hover:bg-red-600 rounded-full">
                {catalogProducts || 0}
              </Badge>
            </Button>
          </Link>
          <Link href={"/favorites"}>
            <Button variant="outline" size="icon" className="relative">
              <Heart className="size-5" />
              <Badge className="absolute -top-2 -right-2 inline-flex items-center justify-center size-5 text-xs font-bold text-white bg-red-500 hover:bg-red-600 rounded-full">
                {favoriteProducts || 0}
              </Badge>
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
