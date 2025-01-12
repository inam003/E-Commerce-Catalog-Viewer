import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";

export function ProductCard({ product, onAddToCart }) {
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
        <p className="text-xl font-bold text-primary">${product.price}</p>
        {checkUser && (
          <Button className="w-full mt-4" onClick={() => onAddToCart(product)}>
            Add to Cart
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
