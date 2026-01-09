// src/pages/SellerDashboard.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { Store, Package, Plus, Edit2 } from "lucide-react";

import { getSellerProfile } from "@/services/sellerService";
import { getSellerProducts } from "@/services/productService";
import { DeleteSellerModal } from "@/components/ui/delete-seller-modal"; // Fixed path

import { toast } from "sonner";

import type { Seller } from "@/types/selling.types";
import type { Product } from "@/types/product.types";

export default function SellerDashboard() {
  const navigate = useNavigate();

  const [seller, setSeller] = useState<Seller | null>(null);
  const [products, setProducts] = useState<Product[]>([]); // ← Fixed: was missing!
  const [loading, setLoading] = useState(true);

  const handleSellerDeleted = () => {
    toast.success("Seller account deleted successfully.", {
      description: "Your main account is still active. You can create a new store anytime!",
    });
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getSellerProfile(); // Gets full Seller object including SellerId
        setSeller(profile);

        // Now fetch products using the SellerId from profile
        const productList = await getSellerProducts(profile.sellerId); // ← Key fix!
        setProducts(productList);
      } catch (err) {
        console.error("Failed to load dashboard:", err);
        toast.error("Could not load your store data. Please try logging out and back in.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container max-w-6xl mx-auto py-12 px-6 space-y-12">
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Separator />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-96 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="container max-w-6xl mx-auto py-12 text-center">
        <p className="text-xl text-muted-foreground">
          Unable to load your store information.
        </p>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-12 px-6 space-y-12">
      {/* Store Profile Card */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-br from-purple-50 to-pink-50 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="rounded-full bg-white p-4 shadow-md">
                <Store className="h-10 w-10 text-purple-600" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <CardTitle className="text-3xl font-bold">
                    {seller.storeName}
                  </CardTitle>
                  <Badge>Active</Badge>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => navigate("/seller/profile/edit")}
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-8">
          <CardDescription className="text-lg leading-relaxed">
            {seller.storeDescription || (
              <span className="italic text-muted-foreground">
                No description yet. Add one to tell customers what makes your shop special!
              </span>
            )}
          </CardDescription>

          {/* Delete Seller Account */}
          <div className="mt-10 pt-8 border-t">
            <p className="text-sm text-muted-foreground mb-4">
              Want to stop selling? You can delete your seller account below.
            </p>
            <DeleteSellerModal onDeleted={handleSellerDeleted} />
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Products Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Your Products ({products.length})
            </h2>
            <p className="text-muted-foreground mt-2">
              Add and manage the products you sell.
            </p>
          </div>

          <Button
            size="lg"
            onClick={() => navigate("/seller/products/new")}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Product
          </Button>
        </div>

        {products.length === 0 ? (
          /* Empty State */
          <div className="grid place-items-center py-20">
            <Card className="max-w-md w-full border-dashed border-2">
              <CardHeader className="text-center">
                <div className="mx-auto rounded-full bg-gray-100 p-10 w-fit mb-6">
                  <Package className="h-20 w-20 text-gray-400" />
                </div>
                <CardTitle className="text-2xl">No products yet</CardTitle>
                <CardDescription className="mt-4 text-base leading-relaxed">
                  Your store is ready! Start adding products to reach customers and grow your business.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  size="lg"
                  onClick={() => navigate("/seller/products/new")}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Your First Product
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)} // Optional: view detail
              >
                <CardHeader className="p-0">
                  <div className="aspect-square relative bg-gray-100">
                    <img
                      src={product.imageUrl || "https://via.placeholder.com/300"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <CardTitle className="text-xl line-clamp-2">
                    {product.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {product.brand}
                  </p>
                  <p className="text-2xl font-bold mt-4">
                    ₱{product.price.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}