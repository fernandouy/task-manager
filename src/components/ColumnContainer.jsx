/* eslint-disable react/prop-types */
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import DeleteIcon from "../icons/DeleteIcon";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import TaskCard from "./TaskCard";

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  updateTask,
  deleteTask,
  tasks,
}) {
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-columnBackgroundColor w-80 h-[30rem] max-h-[30rem] rounded-md flex flex-col opacity-60 border-2 border-rose-500/60"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-columnBackgroundColor w-80 h-[30rem] max-h-[30rem] rounded-md flex flex-col"
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className="bg-mainBackground text-md h-16 cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-4 flex items-center justify-between"
      >
        <div className="flex gap-2">
          <div className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full">
            0
          </div>
          {!editMode ? (
            <div>{column.title}</div>
          ) : (
            <input
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
              type="text"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              className="bg-mainBackground border-2 rounded outline-none px-1 focus:border-rose-500 "
            />
          )}
        </div>
        <button
          className="stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor rounded px-1 py-2"
          onClick={() => deleteColumn(column.id)}
        >
          <DeleteIcon />
        </button>
      </div>

      {/* Column Task Container */}
      <div className="flex flex-col gap-y-4 p-2 overflow-x-hidden overflow-y-auto flex-grow">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      {/* Column footer */}
      <button
        className="flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackground hover:text-rose-500 active:bg-black"
        onClick={() => createTask(column.id)}
      >
        <PlusIcon />
        Add task
      </button>
    </div>
  );
}

export default ColumnContainer;
