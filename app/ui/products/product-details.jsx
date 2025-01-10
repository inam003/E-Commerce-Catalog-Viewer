import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Plus, Minus } from "lucide-react";

export function ProductDetails({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <SheetHeader>
        <SheetTitle>{product.name}</SheetTitle>
        <SheetDescription>{product.category}</SheetDescription>
      </SheetHeader>
      <div className="py-4">
        <div className="relative h-64 mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-2xl font-bold text-primary mb-4">${product.price}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Quantity:</span>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="mx-4 text-lg font-semibold">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <SheetFooter>
        <Button className="w-full" onClick={onClose}>
          Add to Cart - ${(product.price * quantity).toFixed(2)}
        </Button>
      </SheetFooter>
    </>
  );
}
