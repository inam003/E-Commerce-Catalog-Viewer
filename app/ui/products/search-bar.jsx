import { Input } from "@/components/ui/input";

export function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="mb-8">
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
