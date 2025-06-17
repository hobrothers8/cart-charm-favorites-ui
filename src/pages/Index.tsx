import { useState } from "react";
import { Heart, ShoppingCart, Star, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 89.99,
    originalPrice: 129.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    rating: 4.5,
    reviews: 234,
    category: "Electronics",
    description: "Premium sound quality with noise cancellation"
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
    rating: 4.2,
    reviews: 89,
    category: "Fashion",
    description: "Soft, sustainable, and comfortable everyday wear"
  },
  {
    id: 3,
    name: "Smart Water Bottle",
    price: 45.00,
    originalPrice: 55.00,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop",
    rating: 4.7,
    reviews: 156,
    category: "Lifestyle",
    description: "Track your hydration with smart technology"
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
    rating: 4.8,
    reviews: 342,
    category: "Furniture",
    description: "Ultimate comfort for long working hours"
  },
  {
    id: 5,
    name: "Portable Phone Charger",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop",
    rating: 4.3,
    reviews: 178,
    category: "Electronics",
    description: "Never run out of battery on the go"
  },
  {
    id: 6,
    name: "Yoga Mat Premium",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop",
    rating: 4.6,
    reviews: 267,
    category: "Fitness",
    description: "Non-slip surface for perfect yoga practice"
  }
];

const Index = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (productId: number) => {
    setCart(prev => [...prev, productId]);
  };

  const favoriteProducts = mockProducts.filter(product => favorites.includes(product.id));

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

  const ProductCard = ({ product }: { product: Product }) => {
    const isFavorite = favorites.includes(product.id);
    
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
            onClick={() => toggleFavorite(product.id)}
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
              onClick={() => addToCart(product.id)}
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">ShopCart</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button className="relative">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-6 h-6 p-0 flex items-center justify-center text-xs">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h2>
              <p className="text-gray-600">Discover our curated selection of amazing products</p>
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="all" className="flex items-center gap-2">
              All Products
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {mockProducts.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className={`w-4 h-4 ${favorites.length > 0 ? "fill-red-500 text-red-500" : ""}`} />
              Favorites
              <Badge variant="secondary" className="bg-red-100 text-red-700">
                {favorites.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="mt-0">
            {favoriteProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Heart className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No favorites yet</h3>
                <p className="text-gray-600 text-lg max-w-md">
                  Click the heart icon on products to save them to your favorites list
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
