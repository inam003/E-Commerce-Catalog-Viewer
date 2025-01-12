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
import supabase from "@/lib/supabaseClient";
import { formatDate } from "@/lib/utils";
import toast from "react-hot-toast";

export function ProductDetails({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [sheetOpen, setSheetOpen] = useState();

  const addToCartProduct = async (e) => {
    e.preventDefault();
    const response = await fetch(product.image);
    const blob = await response.blob();
    const imageFile = new File([blob], `${product.id}.jpg`, {
      type: blob.type,
    });

    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("product_images")
        .upload(`private/product/${product.id}`, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.log(uploadError);
        throw uploadError;
      }

      const { data, error } = await supabase.storage
        .from("product_images")
        .createSignedUrl(`private/product/${product.id}`, 60);

      if (error) {
        throw error;
      }

      const { data: productData, error: dbError } = await supabase
        .from("products")
        .insert({
          created_at: formatDate(new Date()),
          name: product.name,
          category: product.category,
          price: product.price,
          image_url: data.signedUrl,
          quantity: quantity,
        });
      if (dbError) {
        throw dbError;
      }

      toast.success("Add to cart successfully");
      setSheetOpen(onClose);
    } catch (error) {
      console.log(error.message);
    }
  };

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
            className="rounded-md"
          />
        </div>
        <p className="text-2xl font-bold text-primary mb-4">${product.price}</p>
        <div className="flex items-center justify-between mt-52">
          <span className="text-sm font-medium">Quantity:</span>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="size-4" />
            </Button>
            <span className="mx-4 text-lg font-semibold">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="size-4" />
            </Button>
          </div>
        </div>
      </div>
      <SheetFooter>
        <Button onClick={addToCartProduct} className="w-full">
          Add to Cart - ${(product.price * quantity).toFixed(2)}
        </Button>
      </SheetFooter>
    </>
  );
}
