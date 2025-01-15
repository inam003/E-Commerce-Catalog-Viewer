import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

export function FavoriteProductsCard({ product }) {
  return (
    <Card className="overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg">
      <CardContent className="p-4">
        <div className="relative h-64 mb-4 overflow-hidden">
          <Image
            src={product.image_url}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-2">{product.category}</p>
        <p className="text-xl font-bold mb-4">${product.price.toFixed(2)}</p>
        <div className="flex items-center justify-between gap-2">
          <Button variant="destructive" className="w-full text-white">
            Remove from favorite
          </Button>
          <Button className="w-full">
            <ShoppingCart className="text-white size-5" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
