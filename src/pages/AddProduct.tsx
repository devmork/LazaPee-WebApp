import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { createProduct } from '@/services/productService';

// Import your real type
import type { CreateProduct } from '@/types/product.types';

export default function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    brand: '',
    price: '',
    categoryId: '1', // default - change to a real category ID from your backend
    description: '',
    weight: '',
    width: '',
    height: '',
    length: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Required fields validation
    if (!form.name.trim()) return setError('Product name is required');
    if (!form.brand.trim()) return setError('Brand is required');

    const price = Number(form.price.trim().replace(',', '.'));
    if (isNaN(price) || price <= 0) return setError('Enter a valid positive price');

    const categoryId = Number(form.categoryId);
    if (isNaN(categoryId)) return setError('Category ID must be a number');

    setIsSubmitting(true);

    // Build payload using EXACT CreateProduct type
    const payload: CreateProduct = {
      name: form.name.trim(),
      brand: form.brand.trim(),
      price,
      categoryId, // number, as per your interface
      description: form.description.trim() || undefined,
      weight: form.weight ? Number(form.weight) : undefined,
      width: form.width ? Number(form.width) : undefined,
      height: form.height ? Number(form.height) : undefined,
      length: form.length ? Number(form.length) : undefined,
    };

    try {
      await createProduct(payload);
      alert('Product added successfully!');
      navigate('/seller/dashboard');
    } catch (err: any) {
      console.error('Add product error:', err);

      let msg = 'Failed to add product';

     if (err?.response?.data?.errors) {
            msg = "Validation error - please check all required fields.";
        } else if (err?.response?.data?.message) {
        msg = err.response.data.message;
        } else if (err.message) {
        msg = err.message;
        }

      setError(msg);
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brand *</Label>
                <Input
                  id="brand"
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  name="price"
                  type="text"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="29.99"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoryId">Category ID *</Label>
                <Input
                  id="categoryId"
                  name="categoryId"
                  type="number"
                  value={form.categoryId}
                  onChange={handleChange}
                  placeholder="1"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Dimensions (optional - cm/kg)</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Input
                  name="weight"
                  placeholder="Weight (kg)"
                  value={form.weight}
                  onChange={handleChange}
                  type="number"
                  step="0.01"
                />
                <Input
                  name="width"
                  placeholder="Width (cm)"
                  value={form.width}
                  onChange={handleChange}
                  type="number"
                />
                <Input
                  name="height"
                  placeholder="Height (cm)"
                  value={form.height}
                  onChange={handleChange}
                  type="number"
                />
                <Input
                  name="length"
                  placeholder="Length (cm)"
                  value={form.length}
                  onChange={handleChange}
                  type="number"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/seller/dashboard')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Add Product'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}