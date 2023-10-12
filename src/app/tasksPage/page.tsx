'use client'
import React, { useState, useEffect } from 'react';
import Task from '../components/Task';
import { FaPlus } from 'react-icons/fa';
import { TaskData, updateTask } from '../api/api';
import { TaskUpdate, TaskPost } from '../api/api';
import { postTask, getTasks, deleteTask } from '../api/api';
import Cookies from 'js-cookie';

export default function TaskListPage(){
    const [tasks, setTasks] = useState<TaskData[]>([])
    
    const userId = Cookies.get('userId') as string;

    useEffect(() => {
      const fetchTask = async () => {
        try{
          const tasks = await getTasks(userId)
          setTasks(tasks)
        }
        catch(error)
        {
          alert('Error when searching for tasks')
        }
      };

      fetchTask();
    }, [userId])
    
    const handleUpdateTask =async (taskId: string, newTitle: string, newIsCompleted: boolean) => {
      try {
        const updatedTasks = [...tasks];
    
        const taskToUpdate = updatedTasks.find((task) => task.id === taskId);
    
        if (taskToUpdate) {
          taskToUpdate.title = newTitle;
          taskToUpdate.isCompleted = newIsCompleted;
    
          await updateTask(taskId, { title: newTitle, isCompleted: newIsCompleted });
    
          setTasks(updatedTasks);
        }
      } catch (error) {
        alert('Error when updating the task');
      }
    };

    const handleAddTask = async () => {
      const newDataTask = {
        title: 'New Task',
        isCompleted: false,
        userId: userId
      }

      try{
        const response = await postTask(newDataTask);
        const newTask = response;

        setTasks([...tasks, newTask]);
      }
      catch(error)
      {
        alert('Error adding task')
      }
    };

    const handleDeleteTask = async (taskId: string) => {
      try{
        await deleteTask(taskId)

        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      }
      catch(error){
        alert('Error when deleting task')
      }
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
            {tasks.length === 0 ? ( // Verifica se não há tarefas
          <p>No tasks to display. Please add a new task.</p>
          ) : (
            tasks.map((task) => (
              <Task
                key={task.id}
                title={task.title}
                isCompleted={task.isCompleted}
                onDelete={() => handleDeleteTask(task.id)}
                onUpdate={(newTitle, newIsCompleted) => handleUpdateTask(task.id, newTitle, newIsCompleted)}
              />
            ))
        )}
          </div>
        </div>
    );
};
