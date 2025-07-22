import { Star, GitFork, Clock, ExternalLink, Bookmark, BookmarkCheck } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface RepositoryCardProps {
  repository: Repository;
  isBookmarked: boolean;
  onToggleBookmark: (repo: Repository) => void;
  onViewDetails: (repo: Repository) => void;
}

const getLanguageColor = (language: string) => {
  const colors: Record<string, string> = {
    JavaScript: "bg-github-orange",
    TypeScript: "bg-github-blue", 
    Python: "bg-github-green",
    Java: "bg-github-red",
    Go: "bg-github-blue",
    Rust: "bg-github-orange",
    C: "bg-github-purple",
    "C++": "bg-github-purple",
    HTML: "bg-github-orange",
    CSS: "bg-github-purple",
    PHP: "bg-github-purple",
    Ruby: "bg-github-red",
  };
  return colors[language] || "bg-muted";
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

export const RepositoryCard = ({ 
  repository, 
  isBookmarked, 
  onToggleBookmark, 
  onViewDetails 
}: RepositoryCardProps) => {
  return (
    <Card className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
              className="w-8 h-8 rounded-full ring-2 ring-border"
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-foreground truncate hover:text-primary transition-colors cursor-pointer"
                  onClick={() => onViewDetails(repository)}>
                {repository.name}
              </h3>
              <p className="text-sm text-muted-foreground">{repository.owner.login}</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleBookmark(repository)}
            className="shrink-0 hover:bg-accent"
          >
            {isBookmarked ? (
              <BookmarkCheck className="h-4 w-4 text-primary" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {repository.description || "No description available"}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {repository.language && (
            <div className="flex items-center gap-1">
              <div className={`w-3 h-3 rounded-full ${getLanguageColor(repository.language)}`} />
              <span>{repository.language}</span>
            </div>
          )}
          
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            <span>{repository.stargazers_count.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <GitFork className="h-3 w-3" />
            <span>{repository.forks_count.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{formatDate(repository.updated_at)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(repository)}
            className="flex-1 gap-2 hover:bg-accent"
          >
            View Details
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            asChild
            className="gap-2 hover:bg-accent"
          >
            <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3" />
              GitHub
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};