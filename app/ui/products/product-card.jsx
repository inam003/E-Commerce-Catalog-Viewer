import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

export function ProductCard({ product, onAddToCart }) {
  const [checkUser, setCheckUser] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

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
    const fetchFavoriteStatus = async () => {
      if (checkUser) {
        const { data, error } = await supabase
          .from("favorites")
          .select()
          .eq("user_id", checkUser.id)
          .eq("product_id", product.id)
          .single();

        if (data && !error) {
          setIsFavorite(true);
        }
      }
    };

    fetchFavoriteStatus();
  }, [checkUser, product.id]);

  const toggleFavorite = async (e) => {
    e.stopPropagation();

    if (isFavorite) {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", checkUser.id)
        .eq("product_id", product.id);

      if (error) {
        console.error("Error removing from favorites:", error);
      }

      toast.success("Product removed from Favorites!");
    } else {
      const { error } = await supabase
        .from("favorites")
        .insert({ user_id: checkUser.id, product_id: product.id });

      if (error) {
        console.error("Error adding to favorites:", error);
      }

      toast.success("Product added to Favorites!");
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <Card className="overflow-hidden cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
      <CardContent className="p-4">
        <div className="relative h-48 mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-md"
          />
        </div>
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">{product.category}</p>
        <div className="flex items-center justify-between pr-2">
          <p className="text-xl font-bold text-primary">${product.price}</p>
          {checkUser && (
            <button
              onClick={toggleFavorite}
              className={`p-2 rounded-full transition-all duration-300 ease-in-out ${
                isFavorite
                  ? "bg-rose-500 text-white"
                  : "bg-slate-200 text-rose-500 hover:bg-rose-500 hover:text-white"
              }`}
            >
              <Heart className={`size-5 ${isFavorite ? "fill-current" : ""}`} />
            </button>
          )}
        </div>
        {checkUser && (
          <Button className="w-full mt-4" onClick={() => onAddToCart(product)}>
            Add to Cart
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
