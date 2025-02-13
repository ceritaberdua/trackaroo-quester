
import { Card } from "@/components/ui/card";

interface TaskColumnProps {
  title: string;
  children: React.ReactNode;
}

const TaskColumn = ({ title, children }: TaskColumnProps) => {
  return (
    <div className="min-w-[300px] w-full">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default TaskColumn;
