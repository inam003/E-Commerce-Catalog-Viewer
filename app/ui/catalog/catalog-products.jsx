"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Header from "../main/header";
import supabase from "@/lib/supabaseClient";
import { CatalogProductsCard } from "./products";

const categories = [
  "All",
  "Accessories",
  "Clothing",
  "Kitchen",
  "Bags",
  "Electronics",
];

export default function CatalogProducts() {
  const [checkUser, setCheckUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const checkUserSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCheckUser(user);
    };

    checkUserSession();
  }, []);

  useEffect(() => {
    if (checkUser) {
      fetchCatalogProducts();
    }
  }, [checkUser]);

  const fetchCatalogProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select(
          `
          id,
          name,
          category,
          price,
          image_url,
          quantity`
        )
        .eq("user_id", checkUser.id);

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckOut = () => {};
  return (
    <div>
      <Header />
      <div className="px-10 py-6">
        <h1 className="text-3xl font-semibold mb-6">Products Catalog</h1>
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {products.map((product) => (
            <CatalogProductsCard
              key={product.id}
              product={product}
              onCheckOut={handleCheckOut}
            />
          ))}
        </div>
        <div className="text-center">
          <Link href="/products">
            <Button variant="outline">Explore More Products</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
