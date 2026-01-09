import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { createProduct } from "@/services/productService";

// Flexible payload interface
interface ProductPayload {
  [key: string]: any;
}

export default function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    weight: "",
    width: "",
    height: "",
    length: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!form.name.trim()) {
      setError("Product name is required");
      return;
    }
    if (!form.brand.trim()) {
      setError("Brand is required");
      return;
    }

    const priceNum = Number(form.price.trim().replace(',', '.'));
    if (!form.price.trim() || isNaN(priceNum) || priceNum <= 0) {
      setError("Please enter a valid positive price");
      return;
    }

    setIsSubmitting(true);

    const payload: ProductPayload = {
      name: form.name.trim(),
      productName: form.name.trim(),
      title: form.name.trim(),
      brand: form.brand.trim(),
      price: priceNum,
      description: form.description.trim() || undefined,
      categoryId: "1",

      // Dimensions
      weight: form.weight ? Number(form.weight) : undefined,
      width: form.width ? Number(form.width) : undefined,
      height: form.height ? Number(form.height) : undefined,
      length: form.length ? Number(form.length) : undefined,
      dimensions: {
        width: form.width ? Number(form.width) : undefined,
        height: form.height ? Number(form.height) : undefined,
        length: form.length ? Number(form.length) : undefined,
      },
    };

    // Remove undefined values (many backends dislike them)
    Object.keys(payload).forEach(
      (key) => payload[key] === undefined && delete payload[key]
    );

    try {
      await createProduct(payload);
      alert("Product added successfully! ✓");
      navigate("/seller/dashboard");
    } catch (err: any) {
      console.error("Create product failed:", err);

      let errorMsg = "Failed to add product";

      if (err.response?.data) {
        const data = err.response.data;

        if (data.errors && typeof data.errors === "object") {
          const messages = Object.entries(data.errors)
            .map(([field, msg]) => {
              const text = Array.isArray(msg) ? msg.join(", ") : String(msg);
              return `${field}: ${text}`;
            })
            .join("\n • ");
          errorMsg = messages || data.title || errorMsg;
        } else if (data.message) {
          errorMsg = data.message;
        } else if (data.title || data.detail) {
          errorMsg = [data.title, data.detail].filter(Boolean).join(" - ");
        } else {
          errorMsg = JSON.stringify(data, null, 2).slice(0, 400) + "...";
        }
      } else if (err.message) {
        errorMsg = err.message;
      }

      setError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Add New Product</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Brand */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label>Product Name *</Label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Brand *</Label>
                <Input
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Price */}
            <div className="max-w-xs">
              <Label>Price *</Label>
              <Input
                name="price"
                type="text"
                value={form.price}
                onChange={handleChange}
                placeholder="132.50"
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label>Description</Label>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
              />
            </div>

            {/* Dimensions */}
            <div>
              <Label>Shipping Dimensions (optional - cm/kg)</Label>
              <div className="grid grid-cols-4 gap-4 mt-2">
                <Input
                  name="weight"
                  placeholder="Weight kg"
                  value={form.weight}
                  onChange={handleChange}
                  type="number"
                  step="0.01"
                />
                <Input
                  name="width"
                  placeholder="Width cm"
                  value={form.width}
                  onChange={handleChange}
                  type="number"
                />
                <Input
                  name="height"
                  placeholder="Height cm"
                  value={form.height}
                  onChange={handleChange}
                  type="number"
                />
                <Input
                  name="length"
                  placeholder="Length cm"
                  value={form.length}
                  onChange={handleChange}
                  type="number"
                />
              </div>
            </div>

            {/* Error display */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md whitespace-pre-wrap font-mono text-sm">
                <strong>Error:</strong>
                <div className="mt-1">{error}</div>
              </div>
            )}

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/seller/dashboard")}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}