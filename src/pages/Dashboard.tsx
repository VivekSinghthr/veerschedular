import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import LiveCalendar from "@/components/dashboard/LiveCalendar";
import TaskManager from "@/components/dashboard/TaskManager";
import NotesPanel from "@/components/dashboard/NotesPanel";
import RemindersPanel from "@/components/dashboard/RemindersPanel";
import AnalyticsCharts from "@/components/dashboard/AnalyticsCharts";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  tags: string[];
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isPinned: boolean;
}

export interface Reminder {
  id: string;
  title: string;
  description: string;
  time: Date;
  priority: 'high' | 'medium' | 'low';
  isActive: boolean;
  category: 'meeting' | 'task' | 'personal' | 'work';
}

const Dashboard = () => {
  const [activeView, setActiveView] = useState<'overview' | 'calendar' | 'tasks' | 'notes' | 'analytics'>('overview');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  const renderMainContent = () => {
    switch (activeView) {
      case 'calendar':
        return <LiveCalendar />;
      case 'tasks':
        return <TaskManager tasks={tasks} setTasks={setTasks} />;
      case 'notes':
        return <NotesPanel notes={notes} setNotes={setNotes} />;
      case 'analytics':
        return <AnalyticsCharts tasks={tasks} notes={notes} reminders={reminders} />;
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            <div className="lg:col-span-2 space-y-6">
              <LiveCalendar />
              <TaskManager tasks={tasks} setTasks={setTasks} />
            </div>
            <div className="space-y-6">
              <RemindersPanel reminders={reminders} setReminders={setReminders} />
              <NotesPanel notes={notes} setNotes={setNotes} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <DashboardHeader activeView={activeView} setActiveView={setActiveView} />
      <main className="p-6 pt-24">
        <div className="max-w-7xl mx-auto">
          {renderMainContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;