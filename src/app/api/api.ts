import axios, { Axios, AxiosResponse } from 'axios';
import { resolve } from 'path';

const api = axios.create({
    baseURL: "http://localhots:3000"
});

export interface User
{
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface Task
{
    id: string;
    title: string;
    isCompleted: boolean;
    userId: string;
}

export interface TaskUpdate
{
    title: string;
    isCompleted: boolean;
}

export interface Auth
{
    email: string;
    password: string;
}

export async function postUser(user: User): Promise<User[]>{
    try{
        const response: AxiosResponse<User[]> = await api.post('/create-user', user)
        return response.data
    }
    catch(error)
    {
        throw new Error('Error when registering user');
    }
}

export async function postTask(task: Task): Promise<Task[]> {
    try{
        const response: AxiosResponse<Task[]> = await api.post('/create-task', task)
        return response.data
    }
    catch(error)
    {
        throw new Error('Error creating task')
    }
}

export async function getTasks(userId: string): Promise<Task[]> {
    try{
        const response: AxiosResponse<Task[]> = await axios.get(`/get-task/${userId}`)
        return response.data
    }
    catch(error)
    {
        throw new Error('Error searching for tasks')
    }
}

export async function deleteTask(id: string): Promise<Task> {
    try{
        const response: AxiosResponse<Task> = await axios.delete(`/delete-task/${id}`)
        return response.data
    }    
    catch(error)
    {
        throw new Error('Error deleting task')
    }
}

export async function updateTask(id: string, task: TaskUpdate): Promise<Task> {
    try{
        const response: AxiosResponse<Task> = await axios.put(`/update-task/${id}`, task)
        return response.data
    }
    catch(error)
    {
        throw new Error('Error updating task')
    }
}