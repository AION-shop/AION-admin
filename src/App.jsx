import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <div className='flex min-h-screen bg-red-400'>
        <div className='min-w-44 bg-green-400'>
          <Sidebar />
        </div>

        <div className='flex-1 bg-violet-400'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App
