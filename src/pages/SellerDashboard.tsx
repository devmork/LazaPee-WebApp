// src/pages/SellerDashboard.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { Store, Package, Plus, Edit2 } from "lucide-react";
// import { ProductCard } from "@/components/ProductCard"; // Uncomment when you have products

import { getSellerProfile } from "@/services/sellerService";
import type { Seller } from "@/types/selling.types";

export default function SellerDashboard() {
  const navigate = useNavigate();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getSellerProfile();
        setSeller(profile);
      } catch (err) {
        console.error("Failed to load seller profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

// Loading State
  if (loading) {
    return (
      <div className="container max-w-6xl mx-auto py-12 px-6 space-y-12">
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Separator />
        <Skeleton className="h-12 w-64" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <Skeleton className="h-96 rounded-2xl" />
        </div>
      </div>
    );
  }

  // If no profile (shouldn't happen if protected), show fallback
  if (!seller) {
    return (
      <div className="container max-w-6xl mx-auto py-12 text-center">
        <p className="text-xl text-muted-foreground">
          Unable to load your store information. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-12 px-6 space-y-12">
      {/* Store Profile Section */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="rounded-full bg-white dark:bg-gray-800 p-4 shadow-md">
                <Store className="h-10 w-10 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <CardTitle className="text-3xl font-bold">
                    {seller.storeName}
                  </CardTitle>
                  <Badge variant="default" className="text-sm">
                    Active
                  </Badge>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/seller/profile/edit")}
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-8">
          <CardDescription className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {seller.storeDescription || (
              <span className="italic">
                No description yet. Add one to tell customers what makes your shop special!
              </span>
            )}
          </CardDescription>
        </CardContent>
      </Card>

      <Separator />

      {/* Products Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Your Products</h2>
            <p className="text-muted-foreground mt-2">
              Add and manage the products you want to sell.
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

        {/* Empty State */}
        <div className="grid place-items-center">
          <Card className="max-w-md w-full border-dashed border-2 hover:border-purple-400 transition-all">
            <CardHeader className="text-center pb-10">
              <div className="mx-auto rounded-full bg-gray-100 dark:bg-gray-800 p-10 w-fit mb-6">
                <Package className="h-20 w-20 text-gray-400" />
              </div>
              <CardTitle className="text-2xl">No products yet</CardTitle>
              <CardDescription className="mt-4 text-base leading-relaxed">
                Your store is ready! Start adding products to reach customers and grow your business.
              </CardDescription>
              <Badge variant="secondary" className="mt-4">
                Get started in minutes
              </Badge>
            </CardHeader>

            <CardFooter className="flex justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/seller/products/new")}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Product
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}