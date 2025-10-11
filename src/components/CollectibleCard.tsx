import { useEffect, useState } from "react";
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
  viewed?: boolean;
  createdAt?: string;
  date?: string;
}

interface CollectibleCardProps {
  item: CollectibleItem;
  onToggleSave: (id: string) => void;
}

export const CollectibleCard = ({ item, onToggleSave }: CollectibleCardProps) => {
  const [isLiked, setIsLiked] = useState(item.saved || false);
  const [hasViewed, setHasViewed] = useState(!!item.viewed);

  // Sync local viewed state when item prop changes (e.g., after refresh)
  useEffect(() => {
    setHasViewed(!!item.viewed);
  }, [item.viewed, item.id]);

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
    onToggleSave(item.id);
  };

  return (
    <Card className={`group overflow-hidden border-0 bg-gradient-to-br ${hasViewed ? 'from-amber-50 to-orange-50 dark:from-secondary/40 dark:to-secondary/20 ring-1 ring-amber-200/60 dark:ring-secondary/40' : 'from-card to-secondary/20'} hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1`}>
      <div className="relative">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              if (target.src.indexOf('/placeholder.svg') === -1) {
                target.src = '/placeholder.svg';
              }
            }}
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
            className={`${hasViewed ? 'border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground' : 'border-premium/20 text-premium hover:bg-premium hover:text-premium-foreground'}`}
            onClick={async () => {
              try {
                // Fire-and-forget: mark as viewed in backend
                setHasViewed(true);
                fetch(`http://44.249.247.63:8000/items/${item.id}?viewed=true`, { method: 'PUT' }).catch(() => {});
              } catch (e) {}
              window.open(item.url, '_blank');
            }}
          >
            {hasViewed ? 'View Again' : 'View'}
          </Button>
        </div>
      </div>
    </Card>
  );
};