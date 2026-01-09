import { useState, useEffect, useRef } from 'react';
import { getAllProducts } from '../services/productService';
import type { Product } from '../types/product.types';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const hasFetched = useRef(false);
 useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    console.log('Fetching products...');

    getAllProducts()
      .then((data) => {
        console.log('Success! Products received:', data);
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch products:', error);
        console.error('Error details:', error.response?.data || error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl font-bold">No products available yet.</p>
      </div>
    );
  }

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold text-center mb-12">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.productId}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow overflow-hidden"
          >
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No image</span>
              </div>
            )}

            <div className="p-6">
              <h3 className="font-bold text-xl mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.brand}</p>
              <p className="text-3xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
