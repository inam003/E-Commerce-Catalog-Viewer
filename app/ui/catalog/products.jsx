import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function CatalogProductsCard({ product, onCheckOut }) {
  return (
    <Card className="overflow-hidden cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
      <CardContent className="p-4">
        <div className="relative h-64 mb-4">
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
        <Button
          className="w-full text-white bg-green-600 hover:bg-green-700"
          onClick={() => onCheckOut(product)}
        >
          Checkout
        </Button>
      </CardContent>
    </Card>
  );
}
