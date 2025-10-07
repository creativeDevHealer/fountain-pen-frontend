import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface DashboardNavProps {
  activeTab: "all" | "saved";
  onTabChange: (tab: "all" | "saved") => void;
  totalItems: number;
  savedItems: number;
  onRefresh: () => void;
}

export const DashboardNav = ({ activeTab, onTabChange, totalItems, savedItems, onRefresh }: DashboardNavProps) => {
  return (
    <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Rare Pen Collector</h1>
            <p className="text-muted-foreground mt-1">Discover exceptional writing instruments from around the world</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={onRefresh}
              className="h-9 w-9 rounded-lg border border-border hover:bg-secondary hover:border-border/80 transition-all hover-scale"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Refresh listings</span>
            </Button>
            <ThemeToggle />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeTab === "all" ? "default" : "ghost"}
            onClick={() => onTabChange("all")}
            className={`${
              activeTab === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            } transition-all`}
          >
            All Listings
            <span className="ml-2 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
              {totalItems}
            </span>
          </Button>
          <Button
            variant={activeTab === "saved" ? "default" : "ghost"}
            onClick={() => onTabChange("saved")}
            className={`${
              activeTab === "saved"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            } transition-all`}
          >
            Saved
            <span className="ml-2 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
              {savedItems}
            </span>
          </Button>
          
          <div className="ml-4 flex gap-2 opacity-60">
            <Button variant="ghost" disabled className="text-muted-foreground cursor-not-allowed">
              AI Alerts
              <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">
                Soon
              </span>
            </Button>
            <Button variant="ghost" disabled className="text-muted-foreground cursor-not-allowed">
              Analytics
              <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">
                Soon
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};