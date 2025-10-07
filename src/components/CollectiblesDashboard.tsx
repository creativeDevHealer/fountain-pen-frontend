import { useState, useEffect } from "react";
import { DashboardNav } from "./DashboardNav";
import { CollectibleCard } from "./CollectibleCard";
import { SearchFilters } from "./SearchFilters";
import { ComingSoonFeatures } from "./ComingSoonFeatures";
import { useToast } from "@/hooks/use-toast";
import { CollectibleItem } from "./CollectibleCard";  // Assuming you've defined a CollectibleItem interface for types


export const CollectiblesDashboard = () => {
  const [activeTab, setActiveTab] = useState<"all" | "saved">("all");
  const [items, setItems] = useState<CollectibleItem[]>([]);
  const { toast } = useToast();

  // Fetch items from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        console.log("Fetching items from the backend");
        const response = await fetch(`http://localhost:8000/items`);
        console.log("Response from backend:", response);
        
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Received data:", data);
        
        if (Array.isArray(data)) {
          setItems(data);
          if (data.length === 0) {
            console.log("No items found in database");
            toast({
              title: "No Items Found",
              description: "No collectible items are currently available in the database.",
              duration: 3000,
            });
          }
        } else {
          throw new Error('Invalid data format received from server');
        }
      } catch (error) {
        console.error("Error fetching items:", error);
        toast({
          title: "Connection Error",
          description: error instanceof Error 
            ? error.message 
            : "Unable to fetch collectible items from the server.",
          duration: 5000,
        });
      }
    };
    fetchItems();
  }, []);

  // Toggle saved status on item
  const handleToggleSave = async (id: string) => {
    try {
      const itemToUpdate = items.find((item) => item.id === id);
      if (itemToUpdate) {
        const updatedItem = { ...itemToUpdate, saved: !itemToUpdate.saved };

        const response = await fetch(`http://localhost:8000/items/${id}?saved=${updatedItem.saved}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedItem),
        });

        if (!response.ok) {
          throw new Error('Failed to update item');
        }

        // Update the local state with the updated item
        setItems(items.map((item) => 
          item.id === id ? updatedItem : item
        ));
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to save item status.",
        duration: 3000,
      });
    }
  };

  const handleRefresh = () => {
    // Simulate refresh - in real app this would fetch new data
    toast({
      title: "Refreshing listings",
      description: "Checking for new rare pen listings...",
      duration: 2000,
    });

    // Add a small animation effect
    const container = document.querySelector('.dashboard-grid');
    if (container) {
      container.classList.add('animate-fade-in');
      setTimeout(() => container.classList.remove('animate-fade-in'), 300);
    }
  };

  const filteredItems = activeTab === "all" 
    ? items 
    : items.filter(item => item.saved);

  const savedCount = items.filter(item => item.saved).length;

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        totalItems={items.length}
        savedItems={savedCount}
        onRefresh={handleRefresh}
      />
      
      <div className="container mx-auto px-6 py-8">
        <SearchFilters />
        
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              {activeTab === "saved" ? "No saved items yet" : "No items found"}
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              {activeTab === "saved" 
                ? "Save items by clicking the heart icon" 
                : "Check back soon for new listings"
              }
            </p>
          </div>
        ) : (
          <div className="dashboard-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <CollectibleCard
                key={item.id}
                item={item}
                onToggleSave={handleToggleSave}
              />
            ))}
          </div>
        )}
        
        {/* <ComingSoonFeatures /> */}
      </div>
    </div>
  );
};
