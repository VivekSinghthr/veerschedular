import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Bell, Clock, AlertTriangle, CheckCircle, X } from "lucide-react";

interface Reminder {
  id: string;
  title: string;
  description: string;
  time: Date;
  priority: 'high' | 'medium' | 'low';
  isActive: boolean;
  category: 'meeting' | 'task' | 'personal' | 'work';
}

const RemindersPanel = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Team Standup',
      description: 'Daily standup meeting with development team',
      time: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
      priority: 'high',
      isActive: true,
      category: 'meeting'
    },
    {
      id: '2',
      title: 'Submit Report',
      description: 'Monthly progress report due today',
      time: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      priority: 'medium',
      isActive: true,
      category: 'work'
    },
    {
      id: '3',
      title: 'Code Review',
      description: 'Review pull requests from team members',
      time: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
      priority: 'low',
      isActive: true,
      category: 'task'
    }
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCreating, setIsCreating] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    time: '',
    priority: 'medium' as const,
    category: 'task' as const
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeUntil = (targetTime: Date) => {
    const diff = targetTime.getTime() - currentTime.getTime();
    
    if (diff <= 0) {
      return { text: 'Overdue', isOverdue: true };
    }

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return { text: `${days}d ${hours % 24}h`, isOverdue: false };
    } else if (hours > 0) {
      return { text: `${hours}h ${minutes % 60}m`, isOverdue: false };
    } else {
      return { text: `${minutes}m`, isOverdue: false };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'meeting': return <Bell className="w-4 h-4" />;
      case 'task': return <CheckCircle className="w-4 h-4" />;
      case 'work': return <Clock className="w-4 h-4" />;
      case 'personal': return <AlertTriangle className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const handleCreateReminder = () => {
    if (newReminder.title.trim() && newReminder.time) {
      const reminder: Reminder = {
        id: Date.now().toString(),
        title: newReminder.title,
        description: newReminder.description,
        time: new Date(newReminder.time),
        priority: newReminder.priority,
        isActive: true,
        category: newReminder.category
      };

      setReminders(prev => [...prev, reminder].sort((a, b) => a.time.getTime() - b.time.getTime()));
      setNewReminder({
        title: '',
        description: '',
        time: '',
        priority: 'medium',
        category: 'task'
      });
      setIsCreating(false);
    }
  };

  const handleCompleteReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  const activeReminders = reminders.filter(r => r.isActive).slice(0, 5);
  const overdueCount = reminders.filter(r => getTimeUntil(r.time).isOverdue).length;

  return (
    <Card className="p-6 bg-card-elevated animate-scale-in h-fit">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Reminders</h2>
          {overdueCount > 0 && (
            <Badge variant="destructive" className="mt-1">
              {overdueCount} overdue
            </Badge>
          )}
        </div>
        <Button
          size="sm"
          onClick={() => setIsCreating(true)}
          className="hover-scale"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>

      {/* Create Reminder Form */}
      {isCreating && (
        <div className="mb-6 p-4 border border-border rounded-lg bg-background animate-scale-in">
          <Input
            placeholder="Reminder title..."
            value={newReminder.title}
            onChange={(e) => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
            className="mb-3"
          />
          <Input
            placeholder="Description (optional)"
            value={newReminder.description}
            onChange={(e) => setNewReminder(prev => ({ ...prev, description: e.target.value }))}
            className="mb-3"
          />
          <Input
            type="datetime-local"
            value={newReminder.time}
            onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
            className="mb-3"
          />
          <div className="flex gap-2 mb-3">
            <select
              value={newReminder.priority}
              onChange={(e) => setNewReminder(prev => ({ ...prev, priority: e.target.value as any }))}
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <select
              value={newReminder.category}
              onChange={(e) => setNewReminder(prev => ({ ...prev, category: e.target.value as any }))}
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="task">Task</option>
              <option value="meeting">Meeting</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCreating(false)}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={handleCreateReminder}>
              Save
            </Button>
          </div>
        </div>
      )}

      {/* Reminders List */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {activeReminders.map((reminder) => {
          const timeInfo = getTimeUntil(reminder.time);
          return (
            <div
              key={reminder.id}
              className={`p-3 border border-border rounded-lg bg-background hover:shadow-md transition-all duration-300 group ${
                timeInfo.isOverdue ? 'border-destructive/50 bg-destructive/5' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(reminder.category)}
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {reminder.title}
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${getPriorityColor(reminder.priority)}`}></div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleCompleteReminder(reminder.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {reminder.description && (
                <p className="text-xs text-muted-foreground mb-2">
                  {reminder.description}
                </p>
              )}

              <div className="flex items-center justify-between">
                <Badge
                  variant={timeInfo.isOverdue ? "destructive" : "outline"}
                  className="text-xs"
                >
                  <Clock className="w-2 h-2 mr-1" />
                  {timeInfo.text}
                </Badge>
                <span className="text-xs text-muted-foreground capitalize">
                  {reminder.category}
                </span>
              </div>
            </div>
          );
        })}

        {activeReminders.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium mb-2">No active reminders</p>
            <p className="text-sm">Add a reminder to stay on track</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default RemindersPanel;