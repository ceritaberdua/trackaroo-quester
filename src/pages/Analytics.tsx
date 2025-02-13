
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Task {
  status: "todo" | "in-progress" | "done" | "blocked";
  priority: "low" | "medium" | "high";
  column: string;
}

const AnalyticsPage = () => {
  // Mock data - replace with real data in production
  const tasks: Task[] = [
    { status: "todo", priority: "high", column: "Software Development" },
    { status: "in-progress", priority: "medium", column: "Marketing" },
    { status: "done", priority: "low", column: "IT" },
    // Add more mock data as needed
  ];

  const getStatusData = () => {
    const statusCount = {
      todo: 0,
      "in-progress": 0,
      done: 0,
      blocked: 0,
    };
    tasks.forEach((task) => {
      statusCount[task.status]++;
    });
    return Object.entries(statusCount).map(([status, count]) => ({
      name: status,
      value: count,
    }));
  };

  const getPriorityData = () => {
    const priorityCount = {
      low: 0,
      medium: 0,
      high: 0,
    };
    tasks.forEach((task) => {
      priorityCount[task.priority]++;
    });
    return Object.entries(priorityCount).map(([priority, count]) => ({
      name: priority,
      value: count,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Project Analytics</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Tasks by Status</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getStatusData()}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Tasks by Priority</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getPriorityData()}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
