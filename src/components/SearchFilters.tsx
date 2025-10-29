import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Globe, Bot, Settings, AlertTriangle, X } from "lucide-react";

interface SearchFiltersProps {
  query: string;
  onQueryChange: (value: string) => void;
  onClear: () => void;
  site?: string;
  onSiteChange?: (value: string) => void;
  sourcesTotal?: number;
  sourcesActive?: number;
}

export const SearchFilters = ({ query, onQueryChange, onClear, site = '', onSiteChange, sourcesTotal = 20, sourcesActive = 20 }: SearchFiltersProps) => {
  return (
    <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search for specific pen models, brands, or keywords..."
          className="pl-10 pr-10 h-11 sm:h-12 text-sm sm:text-base rounded-xl"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={onClear}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="-mx-6 sm:mx-0 overflow-x-auto" style={{ paddingTop: '10px' }}>
        <div className="flex items-center gap-2 px-6 sm:px-0 min-w-max">
          {/* Site filter */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-muted-foreground">Site</label>
            <div className="relative">
              <Select value={site ? site : 'all'} onValueChange={(v) => onSiteChange?.(v === 'all' ? '' : v)}>
                <SelectTrigger className="h-9 rounded-full w-48 pr-10">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="ebay">eBay</SelectItem>
                <SelectItem value="lotArt">Lot Art</SelectItem>
                <SelectItem value="carousell">Carousell</SelectItem>
                <SelectItem value="invaluable">Invaluable</SelectItem>
                <SelectItem value="salesroom">The Saleroom</SelectItem>
                <SelectItem value="dylanStephen">Dylan Stephen</SelectItem>
                <SelectItem value="penLoverBoutique">Pen Lover Boutique</SelectItem>
                <SelectItem value="vintageAndModernPens">Vintage & Modern Pens</SelectItem>
                <SelectItem value="catawiki">Catawiki</SelectItem>
                <SelectItem value="milanuncios">Milanuncios</SelectItem>
                <SelectItem value="subito">Subito</SelectItem>
                <SelectItem value="kleinanzeigen">Kleinanzeigen</SelectItem>
                <SelectItem value="izods">IZODS</SelectItem>
                <SelectItem value="penexchange">PenExcange.de</SelectItem>
                <SelectItem value="craiglist">Craiglist</SelectItem>
                <SelectItem value="cruzaltpens">CruzaltPens</SelectItem>
                <SelectItem value="chatterleyluxuries">ChatterleyLuxuries</SelectItem>
                <SelectItem value="vinted">Vinted</SelectItem>
                <SelectItem value="cultpens" className="relative">
                  <span className="inline-flex items-center gap-2">
                    Cult Pens
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                  </span>
                </SelectItem>
                <SelectItem value="appelboom" className="relative">
                  <span className="inline-flex items-center gap-2">
                    Appelboom
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                  </span>
                </SelectItem>
                <SelectItem value="penworld" className="relative">
                  <span className="inline-flex items-center gap-2">
                    PenWorld
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                  </span>
                </SelectItem>
                <SelectItem value="1stlibs" className="relative">
                  <span className="inline-flex items-center gap-2">
                    1stLibs
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                  </span>
                </SelectItem>
                </SelectContent>
              </Select>
               <Badge variant="destructive" className="absolute top-0 right-2 -translate-y-1/2 text-[10px] pointer-events-none z-10">New</Badge>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2 rounded-full">
          <Filter className="h-4 w-4" />
          Price Range
          <Badge variant="secondary" className="ml-1">Coming Soon</Badge>
          </Button>
          
          <Button variant="outline" size="sm" className="gap-2 rounded-full">
          <Globe className="h-4 w-4" />
          Regions
          <Badge variant="secondary" className="ml-1">Coming Soon</Badge>
          </Button>
          
          <Button variant="outline" size="sm" className="gap-2 rounded-full">
          <Bot className="h-4 w-4" />
          AI Training
          <Badge variant="secondary" className="ml-1">Coming Soon</Badge>
          </Button>
          
          <Button variant="outline" size="sm" className="gap-2 rounded-full">
          <Settings className="h-4 w-4" />
          Sources
          <Badge variant="secondary" className="ml-1">Coming Soon</Badge>
          </Button>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-muted-foreground">
        <div className="flex items-center gap-2 bg-muted/50 px-2.5 py-1 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Live Monitoring: Active
        </div>
        <div className="flex items-center gap-2 bg-muted/50 px-2.5 py-1 rounded-full">
          <AlertTriangle className="h-3 w-3" />
          {sourcesTotal} Sources ({sourcesActive} Active)
        </div>
        <div className="flex items-center gap-2 bg-muted/50 px-2.5 py-1 rounded-full">
          <Bot className="h-3 w-3" />
          AI Filter: Learning Mode
        </div>
      </div>
    </div>
  );
};