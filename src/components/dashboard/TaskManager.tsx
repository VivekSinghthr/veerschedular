import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, CheckCircle, Clock, AlertCircle } from "lucide-react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/pages/Dashboard';

interface TaskManagerProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

interface SortableTaskProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
}

const SortableTask = ({ task, onStatusChange }: SortableTaskProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'pending': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default: return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-background border border-border rounded-lg p-4 hover:shadow-md transition-all duration-300 cursor-grab active:cursor-grabbing group"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
          {task.title}
        </h4>
        <div className="flex items-center space-x-2">
          {getStatusIcon(task.status)}
          <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {task.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">{task.dueDate}</span>
      </div>
    </div>
  );
};

const TaskManager = ({ tasks, setTasks }: TaskManagerProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [isCreating, setIsCreating] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    dueDate: '',
    tags: ''
  });


  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const activeTask = tasks.find(task => task.id === active.id);
      const overTask = tasks.find(task => task.id === over.id);
      
      if (activeTask && overTask) {
        // Handle reordering logic here
        console.log('Reordering tasks');
      }
    }
    
    setActiveId(null);
  };

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusStats = () => {
    return {
      pending: tasks.filter(t => t.status === 'pending').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      completed: tasks.filter(t => t.status === 'completed').length,
    };
  };

  const stats = getStatusStats();

  const handleCreateTask = () => {
    if (newTask.title.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title.trim(),
        description: newTask.description.trim(),
        priority: newTask.priority,
        status: 'pending',
        dueDate: newTask.dueDate || 'No date',
        tags: newTask.tags.split(',').map(t => t.trim()).filter(t => t)
      };

      setTasks(prev => [...prev, task]);
      setNewTask({ title: '', description: '', priority: 'medium', dueDate: '', tags: '' });
      setIsCreating(false);
    }
  };

  return (
    <Card className="p-6 bg-card-elevated animate-scale-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Task Manager</h2>
          <div className="flex items-center space-x-4 mt-2">
            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700">
              {stats.pending} Pending
            </Badge>
            <Badge variant="outline" className="bg-blue-500/10 text-blue-700">
              {stats.inProgress} In Progress
            </Badge>
            <Badge variant="outline" className="bg-green-500/10 text-green-700">
              {stats.completed} Completed
            </Badge>
          </div>
        </div>
        <Button className="hover-scale" onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Create Task Form */}
      {isCreating && (
        <div className="mb-6 p-4 border border-border rounded-lg bg-background animate-scale-in">
          <Input
            placeholder="Task title..."
            value={newTask.title}
            onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
            className="mb-3"
          />
          <Input
            placeholder="Description..."
            value={newTask.description}
            onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
            className="mb-3"
          />
          <div className="grid grid-cols-2 gap-3 mb-3">
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as any }))}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <Input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
            />
          </div>
          <Input
            placeholder="Tags (comma separated)..."
            value={newTask.tags}
            onChange={(e) => setNewTask(prev => ({ ...prev, tags: e.target.value }))}
            className="mb-3"
          />
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsCreating(false);
                setNewTask({ title: '', description: '', priority: 'medium', dueDate: '', tags: '' });
              }}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={handleCreateTask}>
              Create Task
            </Button>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex space-x-2">
          {(['all', 'pending', 'in-progress', 'completed'] as const).map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus(status)}
              className="capitalize"
            >
              <Filter className="w-4 h-4 mr-1" />
              {status === 'in-progress' ? 'In Progress' : status}
            </Button>
          ))}
        </div>
      </div>

      {/* Task List with Drag & Drop */}
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={filteredTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <SortableTask
                key={task.id}
                task={task}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </SortableContext>
        
        <DragOverlay>
          {activeId ? (
            <div className="bg-background border border-border rounded-lg p-4 shadow-lg">
              <div className="font-medium">
                {tasks.find(t => t.id === activeId)?.title}
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <CheckCircle className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium mb-2">No tasks found</p>
          <p>Create a new task or adjust your filters</p>
        </div>
      )}
    </Card>
  );
};

export default TaskManager;