import { useState, useMemo } from "react";
import { TrendingUp, Code2, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { RepositoryCard } from "@/components/RepositoryCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { RepositoryAnalytics } from "@/components/RepositoryAnalytics";
import { BookmarksModal } from "@/components/BookmarksModal";
import { useGitHub, useTrendingRepositories, useBookmarks } from "@/hooks/useGitHub";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [filters, setFilters] = useState({
    language: "",
    minStars: 0,
    sortBy: "stars",
    dateRange: "",
  });

  const searchParams = useMemo(() => ({
    query: searchQuery,
    ...filters,
  }), [searchQuery, filters]);

  const { data: repositories = [], isLoading, error } = useGitHub(searchParams);
  const { data: trendingRepos = [], isLoading: trendingLoading } = useTrendingRepositories();
  const { bookmarks, addBookmark, removeBookmark, updateBookmark, isBookmarked } = useBookmarks();

  const handleToggleBookmark = (repo: any) => {
    if (isBookmarked(repo.id)) {
      removeBookmark(repo.id);
      toast({
        title: "Bookmark removed",
        description: `${repo.name} has been removed from your bookmarks`,
      });
    } else {
      addBookmark(repo);
      toast({
        title: "Repository bookmarked",
        description: `${repo.name} has been added to your bookmarks`,
      });
    }
  };

  const handleViewDetails = (repo: any) => {
    window.open(repo.html_url, '_blank');
  };

  const displayRepos = searchQuery || Object.values(filters).some(v => v) ? repositories : trendingRepos;
  const loading = searchQuery || Object.values(filters).some(v => v) ? isLoading : trendingLoading;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onFilterToggle={() => setShowFilters(!showFilters)}
        onBookmarksToggle={() => setShowBookmarks(true)}
        bookmarksCount={bookmarks.length}
      />

      {/* Hero Section */}
      {!searchQuery && !Object.values(filters).some(v => v) && (
        <div className="relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="relative container mx-auto px-4 py-16">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-foreground mb-6">
                Discover Amazing{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  GitHub Projects
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Explore trending repositories, analyze project statistics, and bookmark your favorites.
                Your ultimate GitHub discovery hub with powerful filtering and analytics.
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" className="gap-2 shadow-glow">
                  <TrendingUp className="h-5 w-5" />
                  Explore Trending
                </Button>
                <Button variant="outline" size="lg" className="gap-2">
                  <Code2 className="h-5 w-5" />
                  Browse by Language
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <div className="hidden lg:block w-64 shrink-0">
            <FilterSidebar
              isOpen={true}
              onClose={() => {}}
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>

          {/* Mobile Filter Sidebar */}
          <FilterSidebar
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            filters={filters}
            onFiltersChange={setFilters}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <Tabs defaultValue="repositories" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="repositories" className="gap-2">
                  <Code2 className="h-4 w-4" />
                  Repositories ({displayRepos.length})
                </TabsTrigger>
                <TabsTrigger value="analytics" className="gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="repositories" className="space-y-6">
                {/* Repository Grid */}
                {loading ? (
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Card key={i} className="animate-pulse">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-muted rounded-full" />
                            <div className="space-y-2 flex-1">
                              <div className="h-4 bg-muted rounded w-3/4" />
                              <div className="h-3 bg-muted rounded w-1/2" />
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="h-3 bg-muted rounded w-full" />
                            <div className="h-3 bg-muted rounded w-2/3" />
                            <div className="flex gap-2">
                              <div className="h-6 bg-muted rounded w-16" />
                              <div className="h-6 bg-muted rounded w-16" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : error ? (
                  <Card className="text-center p-8">
                    <CardContent>
                      <p className="text-destructive mb-4">Error loading repositories</p>
                      <p className="text-sm text-muted-foreground">
                        Please check your internet connection and try again.
                      </p>
                    </CardContent>
                  </Card>
                ) : displayRepos.length === 0 ? (
                  <Card className="text-center p-8">
                    <CardContent>
                      <p className="text-muted-foreground mb-4">No repositories found</p>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your search criteria or filters.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {displayRepos.map((repo) => (
                      <RepositoryCard
                        key={repo.id}
                        repository={repo}
                        isBookmarked={isBookmarked(repo.id)}
                        onToggleBookmark={handleToggleBookmark}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="analytics">
                <RepositoryAnalytics repositories={displayRepos} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Bookmarks Modal */}
      <BookmarksModal
        isOpen={showBookmarks}
        onClose={() => setShowBookmarks(false)}
        bookmarks={bookmarks}
        onRemoveBookmark={removeBookmark}
        onUpdateNote={updateBookmark}
      />
    </div>
  );
};

export default Index;
