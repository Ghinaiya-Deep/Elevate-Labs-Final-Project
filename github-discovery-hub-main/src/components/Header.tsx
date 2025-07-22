import { Search, Github, Bookmark, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterToggle: () => void;
  onBookmarksToggle: () => void;
  bookmarksCount: number;
}

export const Header = ({ 
  searchQuery, 
  onSearchChange, 
  onFilterToggle, 
  onBookmarksToggle, 
  bookmarksCount 
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Github className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">
                GitHub Project Explorer
              </h1>
            </div>
          </div>

          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search repositories by name, description, or language..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 h-11 bg-muted/50 border-border/50 focus:bg-background transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={onFilterToggle}
              className="gap-2 hover:bg-accent"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            
            <Button
              variant="outline"
              onClick={onBookmarksToggle}
              className="gap-2 hover:bg-accent relative"
            >
              <Bookmark className="h-4 w-4" />
              Bookmarks
              {bookmarksCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {bookmarksCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};