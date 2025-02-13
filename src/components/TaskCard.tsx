
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar, Flag } from "lucide-react";

interface TaskCardProps {
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done" | "blocked";
  assignee: {
    name: string;
    avatar: string;
  };
  dueDate: string;
  priority: "low" | "medium" | "high";
  tags: string[];
}

const TaskCard = ({
  title,
  description,
  status,
  assignee,
  dueDate,
  priority,
  tags,
}: TaskCardProps) => {
  return (
    <Card className="p-4 transition-all duration-200 hover:shadow-lg cursor-pointer group">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <Badge
              variant="secondary"
              className={cn(
                "mb-2",
                status === "in-progress" && "bg-task-in-progress text-white",
                status === "done" && "bg-task-done text-white",
                status === "blocked" && "bg-task-blocked text-white",
                status === "todo" && "bg-task-todo text-white"
              )}
            >
              {status.replace("-", " ").toUpperCase()}
            </Badge>
            <h3 className="font-medium leading-none tracking-tight">{title}</h3>
          </div>
          <Avatar className="h-8 w-8">
            <img src={assignee.avatar} alt={assignee.name} />
          </Avatar>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{dueDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Flag
              className={cn(
                "h-4 w-4",
                priority === "high" && "text-red-500",
                priority === "medium" && "text-yellow-500",
                priority === "low" && "text-green-500"
              )}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
