import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { createProduct } from "@/services/productService";

// We will send this data to the backend
interface NewProduct {
  name: string;
  brand: string;
  price: number;
  description?: string;
  imageUrl?: string; // optional
  weight?: number;
  width?: number;
  height?: number;
  length?: number;
}

export default function AddProduct() {
  const navigate = useNavigate(); // helps go back to dashboard

  // These are the form fields (like variables that change when user types)
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [length, setLength] = useState("");

  const [imagePreview, setImagePreview] = useState<string | null>(null); // shows image preview
  const [isLoading, setIsLoading] = useState(false); // shows "Adding..." when submitting
  const [errorMessage, setErrorMessage] = useState(""); // shows error if something goes wrong

  // When user picks an image
  const handleImagePick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string); // show preview
      };
      reader.readAsDataURL(file); // convert image to text so we can show it
    }
  };

  // When user clicks "Add Product"
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // stop page from refreshing

    // Check if required fields are filled
    if (name === "" || brand === "" || price === "") {
      setErrorMessage("Please fill Name, Brand, and Price.");
      return;
    }

    setIsLoading(true); // show loading
    setErrorMessage(""); // clear old errors

    // Create the product data to send
    const newProduct: NewProduct = {
      name: name,
      brand: brand,
      price: Number(price), // convert string to number
      description: description || undefined,
      imageUrl: imagePreview || undefined,
      weight: weight ? Number(weight) : undefined,
      width: width ? Number(width) : undefined,
      height: height ? Number(height) : undefined,
      length: length ? Number(length) : undefined,
    };

    try {
      await createProduct(newProduct); // send to backend
      alert("Product added successfully! 🎉");
      navigate("/seller/dashboard"); // go back to dashboard
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      console.log(error);
    } finally {
      setIsLoading(false); // stop loading
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Add New Product</CardTitle>
          <p className="text-gray-600">Fill the form to add a product to your store.</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleFormSubmit} className="space-y-8">
            {/* Name and Brand */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label>Name *</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)}/>
              </div>
              <div>
                <Label>Brand *</Label>
                <Input value={brand} onChange={(e) => setBrand(e.target.value)} />
              </div>
            </div>

            {/* Price */}
            <div className="w-64">
              <Label>Price *</Label>
              <Input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="29.99"
              />
            </div>

            {/* Description */}
            <div>
              <Label>Description (optional)</Label>
              <Textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell customers why this product is great..."
              />
            </div>

            {/* Dimensions */}
            <div>
              <Label>Dimensions (optional - in cm/kg)</Label>
              <div className="grid grid-cols-4 gap-4 mt-3">
                <Input placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />
                <Input placeholder="Width" value={width} onChange={(e) => setWidth(e.target.value)} />
                <Input placeholder="Height" value={height} onChange={(e) => setHeight(e.target.value)} />
                <Input placeholder="Length" value={length} onChange={(e) => setLength(e.target.value)} />
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-red-100 text-red-700 p-4 rounded-lg flex items-center gap-2">
                <p>⚠️ {errorMessage}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => navigate("/seller/dashboard")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Adding Product..." : "Add Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}