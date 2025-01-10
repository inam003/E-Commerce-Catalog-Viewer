import Image from "next/image";
import React from "react";
import Header from "./header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          width={500}
          height={800}
          alt="hero_img"
          className="w-screen h-[80vh] object-cover filter brightness-50"
        />
      </div>
      <div className="relative">
        <Header />
      </div>
      <div className="relative">
        <div className="text-center px-4 py-40">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Discover Amazing Products
          </h1>
          <Link href={"/products"}>
            <Button variant="secondary" className="px-8">
              Explore
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
