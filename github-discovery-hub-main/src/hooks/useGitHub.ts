import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

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
  size: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface SearchParams {
  query: string;
  language: string;
  minStars: number;
  sortBy: string;
  dateRange: string;
}

const buildSearchQuery = (params: SearchParams) => {
  let query = params.query || "stars:>1000"; // Default to repos with 1000+ stars
  
  if (params.language) {
    query += ` language:${params.language}`;
  }
  
  if (params.minStars > 0) {
    query += ` stars:>=${params.minStars}`;
  }
  
  if (params.dateRange) {
    const date = new Date();
    switch (params.dateRange) {
      case "day":
        date.setDate(date.getDate() - 1);
        break;
      case "week":
        date.setDate(date.getDate() - 7);
        break;
      case "month":
        date.setMonth(date.getMonth() - 1);
        break;
      case "year":
        date.setFullYear(date.getFullYear() - 1);
        break;
    }
    query += ` pushed:>=${date.toISOString().split('T')[0]}`;
  }
  
  return query;
};

const getSortParam = (sortBy: string) => {
  switch (sortBy) {
    case "forks":
      return "forks";
    case "updated":
      return "updated";
    case "created":
      return "created";
    default:
      return "stars";
  }
};

export const useGitHub = (searchParams: SearchParams) => {
  const searchQuery = buildSearchQuery(searchParams);
  const sort = getSortParam(searchParams.sortBy);
  
  return useQuery({
    queryKey: ["repositories", searchQuery, sort],
    queryFn: async (): Promise<Repository[]> => {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(searchQuery)}&sort=${sort}&order=desc&per_page=50`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.items || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useTrendingRepositories = () => {
  const date = new Date();
  date.setDate(date.getDate() - 7); // Last week
  const weekAgo = date.toISOString().split('T')[0];
  
  return useQuery({
    queryKey: ["trending-repositories"],
    queryFn: async (): Promise<Repository[]> => {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=created:>${weekAgo}&sort=stars&order=desc&per_page=30`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.items || [];
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
};

// Local storage hooks for bookmarks
export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("github-bookmarks");
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (error) {
        console.error("Error parsing bookmarks:", error);
        setBookmarks([]);
      }
    }
  }, []);

  const saveBookmarks = (newBookmarks: any[]) => {
    setBookmarks(newBookmarks);
    localStorage.setItem("github-bookmarks", JSON.stringify(newBookmarks));
  };

  const addBookmark = (repository: Repository) => {
    const bookmark = {
      repository,
      note: "",
      tags: [],
      dateAdded: new Date().toISOString(),
    };
    const newBookmarks = [...bookmarks, bookmark];
    saveBookmarks(newBookmarks);
  };

  const removeBookmark = (repoId: number) => {
    const newBookmarks = bookmarks.filter(b => b.repository.id !== repoId);
    saveBookmarks(newBookmarks);
  };

  const updateBookmark = (repoId: number, note: string, tags: string[]) => {
    const newBookmarks = bookmarks.map(bookmark =>
      bookmark.repository.id === repoId
        ? { ...bookmark, note, tags }
        : bookmark
    );
    saveBookmarks(newBookmarks);
  };

  const isBookmarked = (repoId: number) => {
    return bookmarks.some(b => b.repository.id === repoId);
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    updateBookmark,
    isBookmarked,
  };
};