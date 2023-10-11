'use client'
import React, { useRef, useState } from 'react';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { Auth } from '@/app/api/api';

export default function Login(){
    const router = useRouter()
    const [signin, setAuth] = useState<Auth>({
      email: '',
      password: ''
    });

    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
      const { name, value } = event.target;
      setAuth((prevAuth) => ({ ...prevAuth, [name]: value }));;
  }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault()
      const {email, password} = signin
      console.log('Resposta da API:', password + email);
      try{
        axios.post('http://localhost:3000/login', {email, password}).then((response) => {
          if (response.status === 200) {
            router.push('/tasksPage');
          }
          else
          {
            alert('Incorrect email or password');
          }
        }) .catch((error) => {
          if (error.response && error.response.status === 401) {
            alert('Authentication failed (401 Unauthorized)');
          } else {
            console.error('Error:', error);
            alert('Error when logging in');
          }
        });
      }
      catch(error)
      {
        alert('Error when logging in')
      }
    }

    return(
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <form
        className="bg-white rounded-lg p-10 w-96 shadow-lg"
        onSubmit={handleSubmit}
      >
         <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name='email'
            type="email"
            placeholder="Email"
            value={signin.email}
            onChange={handleChangeInput}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name='password'
            type="password"
            placeholder="Senha"
            value={signin.password}
            onChange={handleChangeInput}
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
        <div className="mt-4 text-center">
            <p>Don't have an account? <a href="/signup" className="text-blue-500 hover:text-purple-400">Sign Up</a></p>
        </div>
      </form>
    </div>
    )
}