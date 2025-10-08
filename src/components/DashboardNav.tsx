import { Button } from "@/components/ui/button";
import { RefreshCw, CalendarDays, Clock, Heart } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface DashboardNavProps {
  activeTab: "today" | "last3days" | "saved";
  onTabChange: (tab: "today" | "last3days" | "saved") => void;
  totalItems: number;
  last3DaysItems: number;
  savedItems: number;
  onRefresh: () => void;
}

export const DashboardNav = ({ activeTab, onTabChange, totalItems, last3DaysItems, savedItems, onRefresh }: DashboardNavProps) => {
  return (
    <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between mb-3 sm:mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Rare Pen Collector</h1>
            <p className="hidden sm:block text-muted-foreground mt-1">Discover exceptional writing instruments from around the world</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
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

        {/* Segmented control - horizontally scrollable on mobile */}
        <div className="-mx-4 sm:mx-0 overflow-x-auto pb-1">
          <div className="flex gap-2 px-4 sm:px-0 min-w-max">
            <Button
              variant={activeTab === "today" ? "default" : "ghost"}
              onClick={() => onTabChange("today")}
              className={`${
                activeTab === "today"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              } transition-all h-9 sm:h-10 px-3 rounded-full`}
            >
              <CalendarDays className="h-4 w-4 mr-2" />
              Today
              <span className="ml-2 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] sm:text-xs font-medium">
                {totalItems}
              </span>
            </Button>
            <Button
              variant={activeTab === "last3days" ? "default" : "ghost"}
              onClick={() => onTabChange("last3days")}
              className={`${
                activeTab === "last3days"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              } transition-all h-9 sm:h-10 px-3 rounded-full`}
            >
              <Clock className="h-4 w-4 mr-2" />
              Last 3 Days
              <span className="ml-2 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] sm:text-xs font-medium">
                {last3DaysItems}
              </span>
            </Button>
            <Button
              variant={activeTab === "saved" ? "default" : "ghost"}
              onClick={() => onTabChange("saved")}
              className={`${
                activeTab === "saved"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              } transition-all h-9 sm:h-10 px-3 rounded-full`}
            >
              <Heart className="h-4 w-4 mr-2" />
              Saved
              <span className="ml-2 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] sm:text-xs font-medium">
                {savedItems}
              </span>
            </Button>

            <div className="hidden sm:flex ml-4 gap-2 opacity-60">
              <Button variant="ghost" disabled className="text-muted-foreground cursor-not-allowed rounded-full">
                AI Alerts
                <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">
                  Soon
                </span>
              </Button>
              <Button variant="ghost" disabled className="text-muted-foreground cursor-not-allowed rounded-full">
                Analytics
                <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">
                  Soon
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};