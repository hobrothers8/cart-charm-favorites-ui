
import { useState } from "react";
import { Heart, ShoppingCart, Star, Filter } from "lucide-react";
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
  const [showFavorites, setShowFavorites] = useState(false);
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
              <Button
                variant="ghost"
                onClick={() => setShowFavorites(!showFavorites)}
                className="relative"
              >
                <Heart className={`w-5 h-5 mr-2 ${favorites.length > 0 ? "fill-red-500 text-red-500" : ""}`} />
                Favorites
                {favorites.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 p-0 flex items-center justify-center text-xs">
                    {favorites.length}
                  </Badge>
                )}
              </Button>
              
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

      <div className="flex max-w-7xl mx-auto">
        {/* Main Content */}
        <main className={`flex-1 p-6 transition-all duration-300 ${showFavorites ? "mr-80" : ""}`}>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
            <p className="text-gray-600">Discover our curated selection of amazing products</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>

        {/* Favorites Sidebar */}
        <div className={`fixed right-0 top-16 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-10 ${
          showFavorites ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">My Favorites</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFavorites(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {favorites.length} item{favorites.length !== 1 ? 's' : ''} saved
            </p>
          </div>

          <div className="overflow-y-auto h-full pb-20">
            {favoriteProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <Heart className="w-12 h-12 text-gray-300 mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h4>
                <p className="text-gray-600 text-sm">
                  Click the heart icon on products to save them here
                </p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {favoriteProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover"
                      />
                      <div className="flex-1 p-3">
                        <h4 className="font-medium text-sm line-clamp-2 mb-1">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-1 mb-2">
                          {renderStars(product.rating)}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-900">
                            ${product.price}
                          </span>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleFavorite(product.id)}
                              className="text-red-500 hover:text-red-600 p-1"
                            >
                              <Heart className="w-4 h-4 fill-current" />
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => addToCart(product.id)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-2"
                            >
                              <ShoppingCart className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {showFavorites && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-5"
          onClick={() => setShowFavorites(false)}
        />
      )}
    </div>
  );
};

export default Index;
