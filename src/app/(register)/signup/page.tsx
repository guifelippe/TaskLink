'use client';
import { postUser } from "@/app/api/api";
import { User } from "@/app/api/api";
import { useRouter } from "next/navigation";
import React, { useRef, useState} from 'react'

export default function SignUp(){

  const router = useRouter()
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    password: '',
  })

  const [consfirmPassword, setConfirmPassword] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>)
  {
    e.preventDefault()
    if(user.password !== consfirmPassword){
      alert('Password and Confirm Password do not match')
      return
    }
    
    try{
      postUser(user).then((response) => {
        alert('User successfully registered')
        router.push('/signin')
      }).catch((error) => {
        alert(`Error when registering the user ${error}`)
      })
    }
    catch(error)
    {
      alert('Error when registering the user')
    }
  }

  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) 
  {
    const { name, value } = event.target;

    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } 
    else 
    {
      setUser(prevUser => ({ ...prevUser, [name]: value }));
    }
  }

    return(
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <form
        className="bg-white shadow-md rounded-lg p-8 w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChangeInput}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChangeInput}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChangeInput}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={consfirmPassword}
            onChange={handleChangeInput}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <div className="mt-4 text-center">
            <p>Already have an account? <a href="/signin" className="text-blue-500 hover:text-purple-400">Sign In</a></p>
        </div>
      </form>
    </div>
    )
}