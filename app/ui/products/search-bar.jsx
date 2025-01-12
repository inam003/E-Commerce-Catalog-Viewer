import { Input } from "@/components/ui/input";

export function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="mb-8 fixed top-20 text-center right-0 left-0 bg-white z-40 p-4">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      <Input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md mx-auto"
      />
    </div>
  );
}
