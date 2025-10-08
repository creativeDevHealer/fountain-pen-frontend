import { useState, useEffect, useRef } from "react";
import { DashboardNav } from "./DashboardNav";
import { CollectibleCard } from "./CollectibleCard";
import { SearchFilters } from "./SearchFilters";
import { ComingSoonFeatures } from "./ComingSoonFeatures";
import { useToast } from "@/hooks/use-toast";
import { CollectibleItem } from "./CollectibleCard";  // Assuming you've defined a CollectibleItem interface for types


export const CollectiblesDashboard = () => {
  const [activeTab, setActiveTab] = useState<"today" | "last3days" | "saved">("today");
  const [items, setItems] = useState<CollectibleItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { toast } = useToast();
  const [todayCount, setTodayCount] = useState(0);
  const [last3DaysCount, setLast3DaysCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const scrollPositionsRef = useRef<{ today: number; last3days: number; saved: number }>({ today: 0, last3days: 0, saved: 0 });

  const refreshStats = async () => {
    try {
      const res = await fetch('http://localhost:8000/items/stats');
      if (!res.ok) return;
      const data = await res.json();
      setTodayCount(data.today || 0);
      setLast3DaysCount(data.last3days || 0);
      setSavedCount(data.saved || 0);
    } catch (_e) {}
  };

  useEffect(() => { refreshStats(); }, [activeTab, debouncedQuery]);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 350);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // Helper function to check if an item is from today
  const isToday = (dateString: string) => {
    try {
      const itemDate = new Date(dateString);
      
      // Check if the date is valid
      if (isNaN(itemDate.getTime())) {
        console.warn('Invalid date string:', dateString);
        return false;
      }
      
      const today = new Date();
      
      // Compare year, month, and day (ignoring time)
      return itemDate.getFullYear() === today.getFullYear() &&
             itemDate.getMonth() === today.getMonth() &&
             itemDate.getDate() === today.getDate();
    } catch (error) {
      console.warn('Error parsing date:', dateString, error);
      return false;
    }
  };

  // Helper function to get the creation date from an item
  const getItemCreationDate = (item: CollectibleItem) => {
    // Prioritize createdAt field, then date, fallback to current date for debugging
    const dateField = (item as any).createdAt || (item as any).date;
    if (dateField) {
      return dateField;
    }
    // For debugging: if no date field, log it and use current date
    console.warn('Item missing createdAt/date field:', item);
    return new Date().toISOString();
  };

  // Fetch items from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        console.log("Fetching items from the backend");
        let endpoint = 'http://localhost:8000/items';
        if (activeTab === 'today') endpoint = 'http://localhost:8000/items/today';
        else if (activeTab === 'last3days') endpoint = 'http://localhost:8000/items/last3days';
        else if (activeTab === 'saved') endpoint = 'http://localhost:8000/items/saved';
        const url = new URL(endpoint);
        if (debouncedQuery) url.searchParams.set('q', debouncedQuery);
        const response = await fetch(url.toString());
        console.log("Response from backend:", response);
        
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Received data:", data);
        
        if (Array.isArray(data)) {
          setItems(data);
          // Restore scroll position for the active tab after items render
          requestAnimationFrame(() => {
            const y = scrollPositionsRef.current[activeTab] || 0;
            window.scrollTo({ top: y, behavior: 'auto' });
          });
          
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
  }, [activeTab, debouncedQuery]);

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
        if (activeTab === 'saved' && !updatedItem.saved) {
          setItems(prev => prev.filter(i => i.id !== id));
        }
        await refreshStats();
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
    refreshStats();
  };

  // Remember scroll when switching tabs and use our handler for tab changes
  const handleTabChange = (tab: "today" | "last3days" | "saved") => {
    // Save current scroll for the active tab
    try { scrollPositionsRef.current[activeTab] = window.scrollY || 0; } catch (e) {}
    setActiveTab(tab);
  };

  // Helper function to check if an item is from the last 3 days
  const isLast3Days = (dateString: string) => {
    try {
      const itemDate = new Date(dateString);
      
      // Check if the date is valid
      if (isNaN(itemDate.getTime())) {
        console.warn('Invalid date string for last3days:', dateString);
        return false;
      }
      
      const today = new Date();
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(today.getDate() - 3);
      
      // Set time to start of day for accurate comparison
      threeDaysAgo.setHours(0, 0, 0, 0);
      today.setHours(23, 59, 59, 999); // End of today
      
      // Item should be between 3 days ago (inclusive) and today (inclusive)
      return itemDate >= threeDaysAgo && itemDate <= today;
    } catch (error) {
      console.warn('Error parsing date for last3days:', dateString, error);
      return false;
    }
  };

  const filteredItems = (() => {
    switch (activeTab) {
      case "today":
        return items.filter(item => {
          const creationDate = getItemCreationDate(item);
          const isTodayItem = isToday(creationDate);
          if (isTodayItem) {
            console.log('Today item found:', item.name || item.id, 'createdAt:', creationDate);
          }
          return isTodayItem;
        });
      case "last3days":
        return items.filter(item => {
          const creationDate = getItemCreationDate(item);
          const isLast3DaysItem = isLast3Days(creationDate);
          if (isLast3DaysItem) {
            console.log('Last 3 days item found:', item.name || item.id, 'createdAt:', creationDate);
          }
          return isLast3DaysItem;
        });
      case "saved":
        return items.filter(item => item.saved);
      default:
        return items;
    }
  })();

  // Counts now provided by backend stats

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        totalItems={todayCount}
        last3DaysItems={last3DaysCount}
        savedItems={savedCount}
        onRefresh={handleRefresh}
      />
      
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <SearchFilters
          query={searchQuery}
          onQueryChange={setSearchQuery}
          onClear={() => setSearchQuery("")}
        />
        
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <p className="text-muted-foreground text-lg">
              {activeTab === "saved" ? "No saved items yet" : 
               activeTab === "today" ? "No new items today" :
               activeTab === "last3days" ? "No items from the last 3 days" : "No items found"}
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              {activeTab === "saved" 
                ? "Save items by clicking the heart icon" 
                : activeTab === "today"
                ? "Check back tomorrow for new listings"
                : activeTab === "last3days"
                ? "Expand your search to see more items"
                : "Check back soon for new listings"
              }
            </p>
          </div>
        ) : (
          <div className="dashboard-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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
