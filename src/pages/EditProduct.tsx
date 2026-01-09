import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

import { getProductById, updateProduct } from "@/services/productService";
import type { UpdateProduct } from "@/types/product.types";

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetch = async () => {
      if (!id) return;
      try {
        const p = await getProductById(Number(id));
        setName(p.name);
        setBrand(p.brand);
        setPrice(p.price);
        setDescription(p.description || "");
      } catch (err) {
        console.error(err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    setError(null);
    const payload: UpdateProduct = {
      productId: Number(id),
      name,
      price: Number(price),
      description,
    };
    try {
      await updateProduct(Number(id), payload);
      navigate("/seller/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || err?.message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading product...</div>;

  return (
    <div className="container max-w-4xl mx-auto py-12 px-6">
      <Card className="shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Edit Product</CardTitle>
          <CardDescription>Edit and save your product details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="brand">Brand</Label>
                <Input id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
              </div>
            </div>

            <div>
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))} />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" rows={5} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            {error && (
              <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-lg">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            )}

            <div className="flex justify-end gap-4 pt-6">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
              <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
