import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import LiveCalendar from "@/components/dashboard/LiveCalendar";
import TaskManager from "@/components/dashboard/TaskManager";
import NotesPanel from "@/components/dashboard/NotesPanel";
import RemindersPanel from "@/components/dashboard/RemindersPanel";
import AnalyticsCharts from "@/components/dashboard/AnalyticsCharts";

const Dashboard = () => {
  const [activeView, setActiveView] = useState<'overview' | 'calendar' | 'tasks' | 'notes' | 'analytics'>('overview');

  const renderMainContent = () => {
    switch (activeView) {
      case 'calendar':
        return <LiveCalendar />;
      case 'tasks':
        return <TaskManager />;
      case 'notes':
        return <NotesPanel />;
      case 'analytics':
        return <AnalyticsCharts />;
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            <div className="lg:col-span-2 space-y-6">
              <LiveCalendar />
              <TaskManager />
            </div>
            <div className="space-y-6">
              <RemindersPanel />
              <NotesPanel />
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