import { useState } from "react";
import { X, Trash2, ExternalLink, Edit3, Save } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface BookmarkWithNote {
  repository: Repository;
  note: string;
  tags: string[];
  dateAdded: string;
}

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: BookmarkWithNote[];
  onRemoveBookmark: (repoId: number) => void;
  onUpdateNote: (repoId: number, note: string, tags: string[]) => void;
}

export const BookmarksModal = ({ 
  isOpen, 
  onClose, 
  bookmarks, 
  onRemoveBookmark, 
  onUpdateNote 
}: BookmarksModalProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editNote, setEditNote] = useState("");
  const [editTags, setEditTags] = useState("");

  const handleEditStart = (bookmark: BookmarkWithNote) => {
    setEditingId(bookmark.repository.id);
    setEditNote(bookmark.note);
    setEditTags(bookmark.tags.join(", "));
  };

  const handleEditSave = (repoId: number) => {
    const tags = editTags.split(",").map(tag => tag.trim()).filter(tag => tag);
    onUpdateNote(repoId, editNote, tags);
    setEditingId(null);
    setEditNote("");
    setEditTags("");
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditNote("");
    setEditTags("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl">Bookmarked Repositories ({bookmarks.length})</DialogTitle>
        </DialogHeader>
        
        <div className="overflow-y-auto space-y-4 pr-2">
          {bookmarks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">No bookmarked repositories yet</div>
              <p className="text-sm text-muted-foreground">
                Start exploring and bookmark repositories to keep track of your favorites
              </p>
            </div>
          ) : (
            bookmarks.map((bookmark) => (
              <Card key={bookmark.repository.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <img
                        src={bookmark.repository.owner.avatar_url}
                        alt={bookmark.repository.owner.login}
                        className="w-10 h-10 rounded-full ring-2 ring-border"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-foreground truncate">
                          {bookmark.repository.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {bookmark.repository.owner.login}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Bookmarked {new Date(bookmark.dateAdded).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditStart(bookmark)}
                        disabled={editingId === bookmark.repository.id}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                      >
                        <a href={bookmark.repository.html_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveBookmark(bookmark.repository.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {bookmark.repository.description || "No description available"}
                  </p>

                  <div className="flex items-center gap-4 text-sm">
                    {bookmark.repository.language && (
                      <Badge variant="secondary">{bookmark.repository.language}</Badge>
                    )}
                    <span className="text-muted-foreground">
                      ⭐ {bookmark.repository.stargazers_count.toLocaleString()}
                    </span>
                  </div>

                  {editingId === bookmark.repository.id ? (
                    <div className="space-y-3 border-t pt-3">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Notes</label>
                        <Textarea
                          value={editNote}
                          onChange={(e) => setEditNote(e.target.value)}
                          placeholder="Add your notes about this repository..."
                          className="min-h-[80px]"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Tags (comma separated)</label>
                        <Input
                          value={editTags}
                          onChange={(e) => setEditTags(e.target.value)}
                          placeholder="react, ui-library, frontend..."
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleEditSave(bookmark.repository.id)}
                          className="gap-2"
                        >
                          <Save className="h-3 w-3" />
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleEditCancel}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    bookmark.note || bookmark.tags.length > 0 ? (
                      <div className="border-t pt-3 space-y-2">
                        {bookmark.note && (
                          <div>
                            <p className="text-sm font-medium mb-1">Notes:</p>
                            <p className="text-sm text-muted-foreground">{bookmark.note}</p>
                          </div>
                        )}
                        {bookmark.tags.length > 0 && (
                          <div>
                            <p className="text-sm font-medium mb-2">Tags:</p>
                            <div className="flex flex-wrap gap-1">
                              {bookmark.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : null
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};