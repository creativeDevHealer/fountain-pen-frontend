import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Globe, Bot, Settings, AlertTriangle } from "lucide-react";

export const SearchFilters = () => {
  return (
    <div className="mb-6 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search for specific pen models, brands, or keywords..."
          className="pl-10 h-12 text-base"
        />
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          Price Range
          <Badge variant="secondary" className="ml-1">Coming Soon</Badge>
        </Button>
        
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          Regions
          <Badge variant="secondary" className="ml-1">Coming Soon</Badge>
        </Button>
        
        <Button variant="outline" size="sm" className="gap-2">
          <Bot className="h-4 w-4" />
          AI Training
          <Badge variant="secondary" className="ml-1">Coming Soon</Badge>
        </Button>
        
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          Sources
          <Badge variant="secondary" className="ml-1">Coming Soon</Badge>
        </Button>
      </div>

      {/* Status Indicators */}
      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Live Monitoring: Active
        </div>
        <div className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-full">
          <AlertTriangle className="h-3 w-3" />
          47 Sources (23 Active)
        </div>
        <div className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-full">
          <Bot className="h-3 w-3" />
          AI Filter: Learning Mode
        </div>
      </div>
    </div>
  );
};