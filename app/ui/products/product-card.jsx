import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function ProductCard({ product, onAddToCart }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="relative h-48 mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">{product.category}</p>
        <p className="text-xl font-bold text-primary">${product.price}</p>
        <Button className="w-full mt-4" onClick={() => onAddToCart(product)}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
