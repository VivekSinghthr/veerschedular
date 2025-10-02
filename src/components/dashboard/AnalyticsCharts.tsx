import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Calendar, CheckSquare, Clock, Target } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { Task, Note, Reminder } from '@/pages/Dashboard';

interface AnalyticsChartsProps {
  tasks: Task[];
  notes: Note[];
  reminders: Reminder[];
}

const AnalyticsCharts = ({ tasks, notes, reminders }: AnalyticsChartsProps) => {
  // Calculate weekly productivity from tasks
  const getWeeklyProductivity = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const weekData = days.map((day, index) => {
      const dayTasks = tasks.filter(task => {
        // This is simplified - in real app, you'd track task completion dates
        return task.status === 'completed';
      });
      return {
        day,
        tasks: index === today.getDay() ? dayTasks.length : Math.floor(dayTasks.length / 7),
        hours: 0
      };
    });
    return weekData;
  };

  // Calculate task distribution
  const getTaskDistribution = () => {
    const total = tasks.length || 1;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const pending = tasks.filter(t => t.status === 'pending').length;

    return [
      { name: 'Completed', value: Math.round((completed / total) * 100), color: '#10b981' },
      { name: 'In Progress', value: Math.round((inProgress / total) * 100), color: '#3b82f6' },
      { name: 'Pending', value: Math.round((pending / total) * 100), color: '#f59e0b' }
    ];
  };

  // Calculate stats
  const getStats = () => {
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const totalTasks = tasks.length;
    const productivityScore = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return [
      {
        title: 'Tasks Completed',
        value: completedTasks.toString(),
        change: '+0%',
        isPositive: true,
        icon: CheckSquare,
        color: 'text-green-500'
      },
      {
        title: 'Total Tasks',
        value: totalTasks.toString(),
        change: '+0%',
        isPositive: true,
        icon: Clock,
        color: 'text-blue-500'
      },
      {
        title: 'Productivity Score',
        value: `${productivityScore}%`,
        change: '+0%',
        isPositive: true,
        icon: Target,
        color: 'text-purple-500'
      },
      {
        title: 'Active Notes',
        value: notes.length.toString(),
        change: '+0',
        isPositive: true,
        icon: Calendar,
        color: 'text-orange-500'
      }
    ];
  };

  const weeklyProductivity = getWeeklyProductivity();
  const taskDistribution = getTaskDistribution();
  const stats = getStats();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Analytics Dashboard</h2>
        <Badge variant="outline" className="bg-primary/10 text-primary">
          Real-time Data
        </Badge>
      </div>

      {tasks.length === 0 && notes.length === 0 && reminders.length === 0 ? (
        <Card className="p-12 text-center bg-card-elevated">
          <Target className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-30" />
          <h3 className="text-xl font-semibold mb-2 text-foreground">No Data Yet</h3>
          <p className="text-muted-foreground">
            Start adding tasks, notes, and reminders to see your analytics and productivity insights.
          </p>
        </Card>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{stats.map((stat, index) => (
          <Card
            key={stat.title}
            className="p-6 bg-card-elevated hover:shadow-lg transition-all duration-300 animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-background ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                stat.isPositive ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Productivity Chart */}
          <Card className="p-6 bg-card-elevated animate-slide-in-right">{tasks.length > 0 ? (
              <>
                <h3 className="text-lg font-semibold text-foreground mb-6">Task Completion</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyProductivity}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="day" 
                fontSize={12}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                fontSize={12}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="tasks" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
                name="Tasks Completed"
              />
                  </BarChart>
                </ResponsiveContainer>
              </>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                <p>Add tasks to see productivity charts</p>
              </div>
            )}
          </Card>

          {/* Task Distribution */}
          <Card className="p-6 bg-card-elevated animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
            {tasks.length > 0 ? (
              <>
                <h3 className="text-lg font-semibold text-foreground mb-6">Task Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={taskDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {taskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center space-x-6 mt-4">
                  {taskDistribution.map((item) => (
                    <div key={item.name} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-muted-foreground">
                        {item.name} ({item.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                <p>Add tasks to see distribution</p>
              </div>
            )}
          </Card>
        </div>

        {/* Performance Insights */}
        <Card className="p-6 bg-card-elevated animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-lg font-semibold text-foreground mb-4">Performance Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="font-medium text-green-700">Total Activity</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {tasks.length} tasks, {notes.length} notes, {reminders.length} reminders created
              </p>
            </div>
            
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-blue-700">Completion Rate</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {tasks.length > 0 
                  ? `${Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100)}% of tasks completed`
                  : 'No tasks yet'
                }
              </p>
            </div>
            
            <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-5 h-5 text-purple-500" />
                <span className="font-medium text-purple-700">Active Items</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {tasks.filter(t => t.status !== 'completed').length} pending tasks to focus on
              </p>
            </div>
          </div>
        </Card>
      </>
      )}
    </div>
  );
};

export default AnalyticsCharts;