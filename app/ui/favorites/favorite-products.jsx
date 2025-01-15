"use client";

import React, { useEffect, useState } from "react";
import { FavoriteProductsCard } from "./products";
import supabase from "@/lib/supabaseClient";
import Header from "../main/header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { userSession } from "@/lib/utils";

const FavoriteProducts = () => {
  const [checkUser, setCheckUser] = useState(null);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    const checkUserSession = async () => {
      const user = await userSession();
      setCheckUser(user);
    };

    checkUserSession();
  }, []);

  useEffect(() => {
    if (checkUser) {
      fetchFavoriteProducts();
    }
  }, [checkUser]);

  const fetchFavoriteProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("favorites")
        .select(
          `
          id,
          name,
          category,
          price,
          image_url
          `
        )
        .eq("user_id", checkUser.id);

      if (error) {
        console.error("Error fetching favorite products:", error);
      } else {
        setFavoriteProducts(data);
      }
    } catch (error) {
      console.error("Error fetching favorite products:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="px-10 py-6">
        <h1 className="text-3xl font-semibold mb-6">Favorite Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {favoriteProducts.map((product) => (
            <FavoriteProductsCard key={product.id} product={product} />
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
};

export default FavoriteProducts;
