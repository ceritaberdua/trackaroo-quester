
import TaskCard from "@/components/TaskCard";
import TaskColumn from "@/components/TaskColumn";

const mockTasks = [
  {
    id: 1,
    title: "Optimize experience for mobile web",
    description: "Improve the mobile web experience by optimizing performance and UI elements",
    status: "in-progress" as const,
    assignee: {
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    dueDate: "2024-03-20",
    priority: "high" as const,
    tags: ["mobile", "optimization", "UX"],
    column: "Software Development",
  },
  {
    id: 2,
    title: "Design spec kick-off",
    description: "Initial meeting to discuss design specifications for the new feature",
    status: "todo" as const,
    assignee: {
      name: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
    dueDate: "2024-03-25",
    priority: "medium" as const,
    tags: ["design", "planning"],
    column: "Design",
  },
  {
    id: 3,
    title: "Licensing and billing form",
    description: "Create form for handling licensing and billing information",
    status: "done" as const,
    assignee: {
      name: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    },
    dueDate: "2024-03-15",
    priority: "low" as const,
    tags: ["forms", "billing"],
    column: "IT",
  },
];

const columns = ["Software Development", "Marketing", "IT", "Design", "Operations"];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Project Tasks</h1>
      </div>
      <div className="flex gap-6 overflow-x-auto pb-6">
        {columns.map((column) => (
          <TaskColumn key={column} title={column}>
            {mockTasks
              .filter((task) => task.column === column)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  assignee={task.assignee}
                  dueDate={task.dueDate}
                  priority={task.priority}
                  tags={task.tags}
                />
              ))}
          </TaskColumn>
        ))}
      </div>
    </div>
  );
};

export default Index;
