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

const AnalyticsCharts = () => {
  // Sample data for charts
  const weeklyProductivity = [
    { day: 'Mon', tasks: 8, hours: 7.5 },
    { day: 'Tue', tasks: 12, hours: 8.2 },
    { day: 'Wed', tasks: 6, hours: 6.8 },
    { day: 'Thu', tasks: 15, hours: 9.1 },
    { day: 'Fri', tasks: 11, hours: 8.5 },
    { day: 'Sat', tasks: 4, hours: 3.2 },
    { day: 'Sun', tasks: 2, hours: 1.5 }
  ];

  const taskDistribution = [
    { name: 'Completed', value: 68, color: '#10b981' },
    { name: 'In Progress', value: 22, color: '#3b82f6' },
    { name: 'Pending', value: 10, color: '#f59e0b' }
  ];

  const monthlyTrends = [
    { month: 'Jan', tasks: 45, meetings: 12, notes: 28 },
    { month: 'Feb', tasks: 52, meetings: 15, notes: 34 },
    { month: 'Mar', tasks: 48, meetings: 18, notes: 31 },
    { month: 'Apr', tasks: 61, meetings: 14, notes: 42 },
    { month: 'May', tasks: 58, meetings: 16, notes: 38 },
    { month: 'Jun', tasks: 67, meetings: 19, notes: 45 }
  ];

  const stats = [
    {
      title: 'Tasks Completed',
      value: '127',
      change: '+12%',
      isPositive: true,
      icon: CheckSquare,
      color: 'text-green-500'
    },
    {
      title: 'Total Hours',
      value: '156.5',
      change: '+8%',
      isPositive: true,
      icon: Clock,
      color: 'text-blue-500'
    },
    {
      title: 'Productivity Score',
      value: '94%',
      change: '+5%',
      isPositive: true,
      icon: Target,
      color: 'text-purple-500'
    },
    {
      title: 'Goals Achieved',
      value: '18/20',
      change: '-2',
      isPositive: false,
      icon: Calendar,
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Analytics Dashboard</h2>
        <Badge variant="outline" className="bg-primary/10 text-primary">
          Last 30 days
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
        <Card className="p-6 bg-card-elevated animate-slide-in-right">
          <h3 className="text-lg font-semibold text-foreground mb-6">Weekly Productivity</h3>
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
        </Card>

        {/* Task Distribution */}
        <Card className="p-6 bg-card-elevated animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
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
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card className="p-6 bg-card-elevated animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h3 className="text-lg font-semibold text-foreground mb-6">Monthly Trends</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis 
              dataKey="month" 
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
            <Area
              type="monotone"
              dataKey="tasks"
              stackId="1"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
              name="Tasks"
            />
            <Area
              type="monotone"
              dataKey="meetings"
              stackId="1"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.3}
              name="Meetings"
            />
            <Area
              type="monotone"
              dataKey="notes"
              stackId="1"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.3}
              name="Notes"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Performance Insights */}
      <Card className="p-6 bg-card-elevated animate-scale-in" style={{ animationDelay: '0.3s' }}>
        <h3 className="text-lg font-semibold text-foreground mb-4">Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="font-medium text-green-700">Peak Performance</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Thursday shows your highest productivity with 15 tasks completed
            </p>
          </div>
          
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="font-medium text-blue-700">Best Time</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Most productive hours: 9 AM - 11 AM and 2 PM - 4 PM
            </p>
          </div>
          
          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-purple-500" />
              <span className="font-medium text-purple-700">Goal Progress</span>
            </div>
            <p className="text-sm text-muted-foreground">
              90% of weekly goals achieved. Keep up the great work!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsCharts;