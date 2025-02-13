
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";

interface Task {
  id: number;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done" | "blocked";
  dueDate: string;
  priority: "low" | "medium" | "high";
  tags: string[];
  column: string;
}

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [tasks] = useState<Task[]>([
    {
      id: 1,
      title: "Optimize experience for mobile web",
      description: "Improve the mobile web experience",
      status: "in-progress",
      dueDate: "2024-03-20",
      priority: "high",
      tags: ["mobile"],
      column: "Software Development"
    }
  ]);

  const getDayTasks = (day: Date) => {
    return tasks.filter(task => task.dueDate === format(day, 'yyyy-MM-dd'));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Task Calendar</h1>
      </div>
      <div className="flex gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
        <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            Tasks for {date ? format(date, 'MMMM d, yyyy') : 'Selected Date'}
          </h2>
          <div className="space-y-4">
            {date && getDayTasks(date).map(task => (
              <div
                key={task.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{task.title}</h3>
                  <span className={`px-2 py-1 rounded text-sm ${
                    task.priority === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : task.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {task.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    task.status === 'in-progress'
                      ? 'bg-blue-100 text-blue-800'
                      : task.status === 'done'
                      ? 'bg-green-100 text-green-800'
                      : task.status === 'blocked'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
            {date && getDayTasks(date).length === 0 && (
              <p className="text-gray-500">No tasks scheduled for this date</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
