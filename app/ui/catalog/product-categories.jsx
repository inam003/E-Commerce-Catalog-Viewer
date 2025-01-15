import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/lib/products";

export default function ProductCategories() {
  return (
    <section className="py-12 px-4 md:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            href={`/category/${category.id}`}
            key={category.id}
            className="group"
          >
            <Card className="overflow-hidden transition-transform duration-300 ease-in-out group-hover:scale-105">
              <CardContent className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-200 ease-in-out group-hover:bg-opacity-30" />
                  <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white">
                    {category.name}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
