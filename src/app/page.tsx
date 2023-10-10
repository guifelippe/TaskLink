import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <img
          src="/logo.jpg"
          alt="Logo"
          className="w-32 h-32 mx-auto mb-4"
        />
        <h1 className="text-3xl font-semibold mb-2">Welcome to TaskLink - The Task Generator</h1>
        <p className="text-gray-600 mb-4">The best place to manage your tasks.</p>
        <div className="space-x-4">
          <button className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full">
            Sign In
          </button>
          <button className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}
