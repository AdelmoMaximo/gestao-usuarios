"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Sidebar } from "./components/Sidebar"
import { Home } from "./pages/Home"
import { Users } from "./pages/Users"
import { CreateUser } from "./pages/CreateUser"
import { EditUser } from "./pages/EditUser"
import { useState } from "react"

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar isCollapsed={isSidebarCollapsed} onCollapsedChange={setIsSidebarCollapsed} />
        <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? "ml-20" : "ml-64"}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/usuarios" element={<Users />} />
            <Route path="/usuarios/cadastro" element={<CreateUser />} />
            <Route path="/usuarios/editar/:id" element={<EditUser />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

