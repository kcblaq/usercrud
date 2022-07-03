import { useState } from 'react'
import './App.css'
import Nav from './components/users/nav'
import Detail from './components/users/detail'



function App() {

  return (
    <div className="bg-[#F3F5FA] p-4">
      <Nav/>
      <Detail/>
    </div>
  )
}

export default App
