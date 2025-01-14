import Hero from "./ui/main/hero";
import ProductCategories from "./ui/catalog/product-categories";

export default function Home() {
  return (
    <main className="flex flex-col gap-12">
      <Hero />
      <ProductCategories />
    </main>
  );
}
