
import { useState } from "react";
import TaskCard from "@/components/TaskCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { toast } from "sonner";

interface Task {
  id: number;
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

const KanbanBoard = () => {
  const [columns, setColumns] = useState<{
    [key: string]: {
      title: string;
      items: Task[];
    };
  }>({
    todo: {
      title: "To Do",
      items: [],
    },
    "in-progress": {
      title: "In Progress",
      items: [],
    },
    done: {
      title: "Done",
      items: [],
    },
    blocked: {
      title: "Blocked",
      items: [],
    },
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId === destination.droppableId) {
      const column = columns[source.droppableId];
      const items = Array.from(column.items);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items,
        },
      });
    } else {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = Array.from(sourceColumn.items);
      const destItems = Array.from(destColumn.items);
      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, {
        ...movedItem,
        status: destination.droppableId as Task["status"],
      });

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });

      toast.success(`Task moved to ${destColumn.title}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Kanban Board</h1>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-6">
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId} className="min-w-[300px] w-full">
              <h2 className="text-xl font-semibold mb-4">{column.title}</h2>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-4"
                  >
                    {column.items.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              title={task.title}
                              description={task.description}
                              status={task.status}
                              assignee={task.assignee}
                              dueDate={task.dueDate}
                              priority={task.priority}
                              tags={task.tags}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
