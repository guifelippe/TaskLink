import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  return (
    <>
    <Head>
      <title>TaskLink</title>
      <meta name="description" content="Task Generator" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel='icon' href='favicon.ico'/>
    </Head>
    <main>
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
          <Link href="/signin" className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full text-lg">
            Sign In
          </Link>
          <Link href="/signup" className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full text-lg">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
    </main>
    </>
    
  )
}
