/* eslint-disable react/prop-types */
import { useState } from "react";
import DeleteIcon from "../icons/DeleteIcon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function TaskCard({ task, deleteTask, updateTask }) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  function toggleEditMode() {
    setEditMode(!editMode);
    setMouseIsOver(false);
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex justify-between items-center bg-mainBackground p-2.5 h-24 min-h-24 rounded-xl text-left border-2 border-rose-500 hover:ring-inset hover:ring-rose-500 cursor-grab opacity-40"
      ></div>
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="flex justify-between items-center bg-mainBackground p-2.5 h-24 min-h-24 rounded-xl text-left hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab"
      >
        <textarea
          className="h-full w-full resize-none border-none rounded bg-transparent text-white focus:outline-none"
          value={task.content}
          autoFocus
          placeholder="Task content here..."
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) toggleEditMode();
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative flex items-center bg-mainBackground p-2.5 h-24 min-h-24 rounded-xl text-left hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab task"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={toggleEditMode}
    >
      <p className="my-auto h-5/6 w-10/12 overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.content}
      </p>
      {mouseIsOver && (
        <button
          className="stroke-white/30 absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-300 hover:stroke-rose-500"
          onClick={() => deleteTask(task.id)}
        >
          <DeleteIcon />
        </button>
      )}
    </div>
  );
}

export default TaskCard;
