import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-3 sm:p-4 md:px-10 md:py-6">
      <Link href={"/"}>
        <h2 className="text-2xl font-bold text-white">BrowseCart</h2>
      </Link>
      <Link href={"/login"}>
        <Button variant="secondary">Login</Button>
      </Link>
    </div>
  );
};

export default Header;
