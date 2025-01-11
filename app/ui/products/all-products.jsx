"use client";

import React, { useState, useEffect } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import NotFound from "./not-found";
import { SearchBar } from "./search-bar";
import { Filters } from "./filters";
import { ProductCard } from "./product-card";
import { ProductDetails } from "./product-details";
import { products } from "@/lib/products";

const categories = [
  "All",
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports",
];

const AllProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const minPrice = Math.min(...products.map((p) => p.price));
  const maxPrice = Math.max(...products.map((p) => p.price));

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  );

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const handleCloseSheet = () => {
    setSelectedProduct(null);
    setQuantity(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          <Filters
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            minPrice={minPrice}
            maxPrice={maxPrice}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </aside>

        <div className="w-full md:w-3/4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <NotFound />
          )}
        </div>
      </div>

      <Sheet open={!!selectedProduct} onOpenChange={handleCloseSheet}>
        <SheetContent>
          {selectedProduct && (
            <ProductDetails
              product={selectedProduct}
              onClose={handleCloseSheet}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AllProducts;
