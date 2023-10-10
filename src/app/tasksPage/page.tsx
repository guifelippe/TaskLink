'use client'
import React, { useState } from 'react';
import Task from '../components/Task';
import { FaPlus } from 'react-icons/fa';

interface TaskData {
    id: number;
    title: string;
    isCompleted: boolean;
}

export default function TaskListPage(){
    const [tasks, setTasks] = useState<TaskData[]>([
        { id: 1, title: 'Fazer compras', isCompleted: false },
        { id: 2, title: 'Estudar React', isCompleted: false },
        { id: 3, title: 'Lavar o carro', isCompleted: true },
    ]);
    
    const handleDeleteTask = (taskId: number) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };
    
    const handleUpdateTask = (taskId: number) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
        ));
    };
    
    const handleAddTask = () => {
        const newTaskId = Math.max(...tasks.map((task) => task.id), 0) + 1;
        const newTask = {
          id: newTaskId,
          title: 'New Task',
          isCompleted: false,
        };
        setTasks([...tasks, newTask]);
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="text-center">
            <h1 className="text-3xl font-semibold mb-4">Task List</h1>
            <div className="mb-4">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={handleAddTask}
              >
                <FaPlus className="inline-block mr-2" />
                New Task
              </button>
            </div>
            {tasks.map((task) => (
              <Task
                key={task.id}
                title={task.title}
                isCompleted={task.isCompleted}
                onDelete={() => handleDeleteTask(task.id)}
                onUpdate={() => handleUpdateTask(task.id)}
              />
            ))}
          </div>
        </div>
    );
};
