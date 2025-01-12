"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import supabase from "@/lib/supabaseClient";
import { ShoppingCart } from "lucide-react";

const Header = () => {
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
  return (
    <div className="flex items-center justify-between p-3 sm:p-4 md:px-10 md:py-6">
      <Link href={"/"}>
        <h2 className="text-2xl font-bold text-white">BrowseCart</h2>
      </Link>
      {checkUser ? (
        <div className="flex items-center gap-3">
          <Link href={"/products"}>
            <Button variant="outline">Products</Button>
          </Link>
          <Link href={"/catalog"}>
            <Button variant="outline" size="icon">
              <ShoppingCart className="size-5" />
            </Button>
          </Link>
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
