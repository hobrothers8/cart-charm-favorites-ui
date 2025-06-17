
import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: number) => void;
  onAddToCart: (productId: number) => void;
}

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${
        i < Math.floor(rating) 
          ? "fill-yellow-400 text-yellow-400" 
          : "text-gray-300"
      }`}
    />
  ));
};

export const ProductCard = ({ product, isFavorite, onToggleFavorite, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 rounded-full transition-all duration-200 ${
            isFavorite 
              ? "bg-red-500 text-white hover:bg-red-600" 
              : "bg-white/80 hover:bg-white text-gray-600"
          }`}
          onClick={() => onToggleFavorite(product.id)}
        >
          <Heart 
            className={`w-5 h-5 transition-all duration-200 ${
              isFavorite ? "fill-current scale-110" : ""
            }`} 
          />
        </Button>
        {product.originalPrice && (
          <Badge className="absolute top-3 left-3 bg-red-500 text-white">
            Sale
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center gap-1 mb-3">
          {renderStars(product.rating)}
          <span className="text-sm text-gray-500 ml-2">
            ({product.reviews})
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          <Button
            onClick={() => onAddToCart(product.id)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export type { Product };
