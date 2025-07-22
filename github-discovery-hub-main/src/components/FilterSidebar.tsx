import { X, Star, GitFork, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    language: string;
    minStars: number;
    sortBy: string;
    dateRange: string;
  };
  onFiltersChange: (filters: any) => void;
}

const popularLanguages = [
  "JavaScript", "TypeScript", "Python", "Java", "Go", "Rust", 
  "C++", "C#", "PHP", "Ruby", "Swift", "Kotlin", "HTML", "CSS"
];

const sortOptions = [
  { value: "stars", label: "Stars" },
  { value: "forks", label: "Forks" },
  { value: "updated", label: "Recently Updated" },
  { value: "created", label: "Recently Created" }
];

const dateRanges = [
  { value: "day", label: "Past 24 hours" },
  { value: "week", label: "Past week" },
  { value: "month", label: "Past month" },
  { value: "year", label: "Past year" }
];

export const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange 
}: FilterSidebarProps) => {
  if (!isOpen) return null;

  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      language: "",
      minStars: 0,
      sortBy: "stars",
      dateRange: ""
    });
  };

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto lg:z-auto">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm lg:hidden" onClick={onClose} />
      
      <Card className="absolute right-0 top-0 h-full w-80 lg:relative lg:w-full bg-background border-l lg:border-l-0 lg:border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold">Filters</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Language Filter */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-github-blue" />
              <label className="text-sm font-medium">Language</label>
            </div>
            <Select value={filters.language || "all"} onValueChange={(value) => updateFilter("language", value === "all" ? "" : value)}>
              <SelectTrigger>
                <SelectValue placeholder="Any language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any language</SelectItem>
                {popularLanguages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Stars Filter */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-github-orange" />
              <label className="text-sm font-medium">Minimum Stars</label>
            </div>
            <div className="space-y-2">
              <Slider
                value={[filters.minStars]}
                onValueChange={(value) => updateFilter("minStars", value[0])}
                max={10000}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span className="font-medium">{filters.minStars.toLocaleString()}</span>
                <span>10K+</span>
              </div>
            </div>
          </div>

          {/* Sort By */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <GitFork className="h-4 w-4 text-github-green" />
              <label className="text-sm font-medium">Sort By</label>
            </div>
            <Select value={filters.sortBy} onValueChange={(value) => updateFilter("sortBy", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-github-purple" />
              <label className="text-sm font-medium">Updated</label>
            </div>
            <Select value={filters.dateRange || "all"} onValueChange={(value) => updateFilter("dateRange", value === "all" ? "" : value)}>
              <SelectTrigger>
                <SelectValue placeholder="Any time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any time</SelectItem>
                {dateRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          {(filters.language || filters.minStars > 0 || filters.dateRange) && (
            <div className="space-y-3">
              <label className="text-sm font-medium">Active Filters</label>
              <div className="flex flex-wrap gap-2">
                {filters.language && (
                  <Badge variant="secondary" className="gap-1">
                    {filters.language}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 w-4 h-4 hover:bg-transparent"
                      onClick={() => updateFilter("language", "")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                {filters.minStars > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    {filters.minStars.toLocaleString()}+ stars
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 w-4 h-4 hover:bg-transparent"
                      onClick={() => updateFilter("minStars", 0)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                {filters.dateRange && (
                  <Badge variant="secondary" className="gap-1">
                    {dateRanges.find(r => r.value === filters.dateRange)?.label}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 w-4 h-4 hover:bg-transparent"
                      onClick={() => updateFilter("dateRange", "")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};