import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit3, Trash2, Tag, Calendar } from "lucide-react";
import { Note } from '@/pages/Dashboard';

interface NotesPanelProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const NotesPanel = ({ notes, setNotes }: NotesPanelProps) => {

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: [] as string[]
  });

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.updatedAt.getTime() - a.updatedAt.getTime();
  });

  const handleCreateNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        title: newNote.title,
        content: newNote.content,
        tags: newNote.tags,
        createdAt: new Date(),
        updatedAt: new Date(),
        isPinned: false
      };

      setNotes(prev => [note, ...prev]);
      setNewNote({ title: '', content: '', tags: [] });
      setIsCreating(false);
    }
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const togglePin = (id: string) => {
    setNotes(prev => prev.map(note =>
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    ));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="p-6 bg-card-elevated animate-scale-in h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Smart Notes</h2>
        <Button
          size="sm"
          onClick={() => setIsCreating(true)}
          className="hover-scale"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Note
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Create Note Form */}
      {isCreating && (
        <div className="mb-6 p-4 border border-border rounded-lg bg-background animate-scale-in">
          <Input
            placeholder="Note title..."
            value={newNote.title}
            onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
            className="mb-3"
          />
          <Textarea
            placeholder="Write your note..."
            value={newNote.content}
            onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
            className="mb-3 min-h-[100px]"
          />
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCreating(false)}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={handleCreateNote}>
              Save Note
            </Button>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="space-y-4 max-h-[600px] overflow-y-auto">
        {sortedNotes.map((note) => (
          <div
            key={note.id}
            className={`p-4 border border-border rounded-lg bg-background hover:shadow-md transition-all duration-300 group ${
              note.isPinned ? 'ring-2 ring-primary/20' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3
                className="font-medium text-foreground group-hover:text-primary transition-colors cursor-pointer"
                onClick={() => togglePin(note.id)}
              >
                {note.isPinned && <span className="text-primary mr-1">📌</span>}
                {note.title}
              </h3>
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setEditingId(note.id)}
                >
                  <Edit3 className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive"
                  onClick={() => handleDeleteNote(note.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
              {note.content}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {note.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    <Tag className="w-2 h-2 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="w-3 h-3 mr-1" />
                {formatDate(note.updatedAt)}
              </div>
            </div>
          </div>
        ))}

        {sortedNotes.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Edit3 className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium mb-2">No notes found</p>
            <p className="text-sm">Create your first note to get started</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default NotesPanel;