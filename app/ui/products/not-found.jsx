import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import React from "react";

const NotFound = () => {
  return (
    <div className="my-40 px-auto">
      <Card className="w-[60rem]">
        <CardContent className="p-6 text-center">
          <AlertCircle className="mx-auto size-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-gray-600">
            We couldn't find any products matching your search or filter
            criteria. Please try adjusting your search or filters.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
