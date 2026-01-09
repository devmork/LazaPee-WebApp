import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function EmptyProductStateCard() {
  const navigate = useNavigate();

  return (
    <Card className="border-dashed border-2 hover:border-primary/50 transition-all">
      <CardHeader className="text-center">
        <div className="mx-auto rounded-full bg-muted p-8 w-fit mb-4">
          <Package className="h-16 w-16 text-muted-foreground" />
        </div>
        <CardTitle className="text-2xl">No products yet</CardTitle>
        <CardDescription className="text-base mt-3 max-w-md mx-auto">
          Your store is ready! Start adding products to reach customers and grow your business.
        </CardDescription>
      </CardHeader>

      <CardContent className="text-center">
        <Badge variant="outline" className="text-sm">
          Get started in minutes
        </Badge>
      </CardContent>

      <CardFooter className="flex justify-center">
        <Button size="lg" onClick={() => navigate("/seller/products/new")}>
          <Plus className="mr-2 h-5 w-5" />
          Add Your First Product
        </Button>
      </CardFooter>
    </Card>
  );
}