import React, { useState } from 'react';

interface TaskProps {
  title: string;
  isCompleted: boolean;
  onDelete: () => void;
  onUpdate: (newTitle: string, newIsCompleted: boolean) => void;
}

const Task: React.FC<TaskProps> = ({ title, isCompleted, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newIsCompleted, setNewIsCompleted] = useState(isCompleted);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleUpdateClick = () => {
    onUpdate(newTitle, newIsCompleted);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewTitle(title);
    setNewIsCompleted(isCompleted);
  };

  return (
    <div className="flex items-center space-x-2 mb-2">
      <input
        type="checkbox"
        className="form-checkbox text-blue-500 h-6 w-6"
        checked={newIsCompleted} 
        onChange={() => setNewIsCompleted(!newIsCompleted)}
      />
      {isEditing ? (
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 rounded-lg"
          value={newTitle}
          onChange={handleTitleChange}
        />
      ) : (
        <span className={newIsCompleted ? 'line-through' : ''}>{title}</span>
      )}
      {isEditing ? (
        <>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            onClick={handleUpdateClick}
          >
            Save
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            onClick={onDelete}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default Task;