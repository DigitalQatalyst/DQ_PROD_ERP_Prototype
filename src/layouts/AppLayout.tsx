import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import TopBar from '../components/TopBar'
import Sidebar from '../components/Sidebar'

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const sidebarWidth = collapsed ? 64 : 240

  return (
    <div className="h-full">
      <TopBar />
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <main
        className="mt-[60px] min-h-[calc(100vh-60px)] bg-white transition-[margin-left] duration-200 ease-out"
        style={{ marginLeft: sidebarWidth }}
      >
        <div
          className="px-6 py-8"
          style={{ minHeight: 'calc(100vh - 60px)' }}
        >
          <Outlet />
        </div>
      </main>
    </div>
  )
}
