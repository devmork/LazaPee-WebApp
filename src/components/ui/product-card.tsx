import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Edit, Trash2, Eye } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  status?: "active" | "draft" | "out-of-stock";
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
}

export function ProductCard({
  id,
  name,
  description,
  price,
  stock,
  imageUrl,
  status = "active",
  onEdit,
  onDelete,
  onView,
}: ProductCardProps) {
  const isOutOfStock = stock === 0;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      {/* Product Image */}
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={imageUrl || "https://via.placeholder.com/400x300?text=No+Image"}
            alt={name}
            className="w-full h-56 object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge
              variant={
                status === "active"
                  ? "default"
                  : status === "draft"
                  ? "secondary"
                  : "destructive"
              }
            >
              {status === "active" ? "Active" : status === "draft" ? "Draft" : "Out of Stock"}
            </Badge>
          </div>
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg px-4 py-2">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <CardTitle className="line-clamp-2 text-lg">{name}</CardTitle>
        {description && (
          <CardDescription className="mt-2 line-clamp-3">
            {description}
          </CardDescription>
        )}

        <Separator className="my-4" />

        <div className="space-y-2">
          <p className="text-2xl font-bold">${price.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">
            {stock > 0 ? `${stock} in stock` : "No stock available"}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-4">
        <Button
          size="sm"
          variant="outline"
          className="flex-1"
          onClick={() => onView?.(id)}
        >
          <Eye className="w-4 h-4 mr-2" />
          View
        </Button>

        <Button
          size="sm"
          variant="default"
          className="flex-1"
          onClick={() => onEdit?.(id)}
          disabled={isOutOfStock}
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>

        <Button
          size="sm"
          variant="destructive"
          onClick={() => onDelete?.(id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}