import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft, ChevronRight, Plus, Clock } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns";

interface Event {
  id: string;
  title: string;
  time: string;
  date: Date;
  color: string;
}

const LiveCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Team Meeting',
      time: '10:00 AM',
      date: new Date(),
      color: 'bg-blue-500'
    },
    {
      id: '2',
      title: 'Project Review',
      time: '2:30 PM',
      date: new Date(),
      color: 'bg-green-500'
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <Card className="p-6 bg-card-elevated animate-scale-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Calendar</h2>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="font-mono">{formatTime(currentTime)}</span>
          </div>
        </div>
        <Button className="hover-scale">
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">
              {format(currentMonth, 'MMMM yyyy')}
            </h3>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            className="w-full"
          />
        </div>

        {/* Today's Events */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {isToday(selectedDate) ? "Today's Events" : `Events for ${format(selectedDate, 'MMM dd')}`}
          </h3>
          <div className="space-y-3">
            {getEventsForDate(selectedDate).map((event) => (
              <div
                key={event.id}
                className={`p-3 rounded-lg ${event.color}/10 border-l-4 ${event.color} animate-slide-in-right group hover:shadow-md transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{event.time}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                </div>
              </div>
            ))}
            
            {getEventsForDate(selectedDate).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No events scheduled</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LiveCalendar;