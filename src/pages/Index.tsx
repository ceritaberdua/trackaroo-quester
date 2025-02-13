
import { useState } from "react";
import TaskCard from "@/components/TaskCard";
import TaskColumn from "@/components/TaskColumn";
import AddProjectDialog from "@/components/AddProjectDialog";
import SprintDialog from "@/components/SprintDialog";
import { toast } from "sonner";

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

const initialColumns = ["Software Development", "Marketing", "IT", "Design", "Operations"];

const Index = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [currentSprint, setCurrentSprint] = useState<{
    name: string;
    startDate: string;
    endDate: string;
  } | null>(null);

  const handleAddProject = (projectName: string) => {
    setColumns((prev) => [...prev, projectName]);
    toast.success(`Project "${projectName}" created successfully`);
  };

  const handleAddSprint = (name: string, startDate: string, endDate: string) => {
    setCurrentSprint({ name, startDate, endDate });
    toast.success(`Sprint "${name}" created successfully`);
  };

  const handleTaskClick = (taskId: number) => {
    toast.info("Task details coming soon!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Project Tasks</h1>
          <div className="flex gap-4">
            <AddProjectDialog onAddProject={handleAddProject} />
            <SprintDialog onAddSprint={handleAddSprint} />
          </div>
        </div>
        {currentSprint && (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="font-medium">
              Current Sprint: {currentSprint.name}
              <span className="text-sm text-muted-foreground ml-4">
                {currentSprint.startDate} - {currentSprint.endDate}
              </span>
            </p>
          </div>
        )}
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
                  onClick={() => handleTaskClick(task.id)}
                />
              ))}
          </TaskColumn>
        ))}
      </div>
    </div>
  );
};

export default Index;
