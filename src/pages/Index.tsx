
import { useState } from "react";
import { Heart, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import { mockProducts } from "@/data/mockProducts";

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemCount={cart.length} />

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
            <ProductGrid
              products={mockProducts}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onAddToCart={addToCart}
            />
          </TabsContent>

          <TabsContent value="favorites" className="mt-0">
            <ProductGrid
              products={favoriteProducts}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onAddToCart={addToCart}
              showEmptyState={true}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
