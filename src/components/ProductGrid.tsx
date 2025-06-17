
import { Heart } from "lucide-react";
import { ProductCard, Product } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  favorites: number[];
  onToggleFavorite: (productId: number) => void;
  onAddToCart: (productId: number) => void;
  showEmptyState?: boolean;
}

export const ProductGrid = ({ 
  products, 
  favorites, 
  onToggleFavorite, 
  onAddToCart, 
  showEmptyState = false 
}: ProductGridProps) => {
  if (showEmptyState && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Heart className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">No favorites yet</h3>
        <p className="text-gray-600 text-lg max-w-md">
          Click the heart icon on products to save them to your favorites list
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favorites.includes(product.id)}
          onToggleFavorite={onToggleFavorite}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};
