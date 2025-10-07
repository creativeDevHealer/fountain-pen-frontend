import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface CollectibleItem {
  id: string;
  name: string;
  price: string;
  image: string;
  url: string;
  saved?: boolean;
}

interface CollectibleCardProps {
  item: CollectibleItem;
  onToggleSave: (id: string) => void;
}

export const CollectibleCard = ({ item, onToggleSave }: CollectibleCardProps) => {
  const [isLiked, setIsLiked] = useState(item.saved || false);

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
    onToggleSave(item.id);
  };

  return (
    <Card className="group overflow-hidden border-0 bg-gradient-to-br from-card to-secondary/20 hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 h-10 w-10 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card shadow-md border-0"
          onClick={handleToggleLike}
        >
          <Heart 
            className={`h-5 w-5 transition-colors ${
              isLiked 
                ? "fill-premium stroke-premium" 
                : "stroke-muted-foreground hover:stroke-premium"
            }`} 
          />
        </Button>
      </div>
      
      <div className="p-6">
        <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 leading-tight">
          {item.name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold bg-gradient-to-r from-premium to-accent bg-clip-text text-transparent">
            {item.price}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="border-premium/20 text-premium hover:bg-premium hover:text-premium-foreground"
            onClick={() => window.open(item.url, '_blank')}
          >
            View
          </Button>
        </div>
      </div>
    </Card>
  );
};