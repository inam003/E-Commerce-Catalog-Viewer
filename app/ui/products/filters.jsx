import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

export function Filters({
  categories,
  selectedCategory,
  setSelectedCategory,
  minPrice,
  maxPrice,
  priceRange,
  setPriceRange,
}) {
  return (
    <Card className="sticky top-4">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-2 mb-2">
            <Checkbox
              id={category}
              checked={selectedCategory === category}
              onCheckedChange={() => setSelectedCategory(category)}
            />
            <label
              htmlFor={category}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {category}
            </label>
          </div>
        ))}

        <h2 className="text-lg font-semibold mt-6 mb-4">Price Range</h2>
        <Slider
          min={minPrice}
          max={maxPrice}
          step={1}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </CardContent>
    </Card>
  );
}
