import { Outlet } from 'react-router-dom'
import TopBar from '../components/TopBar'
import Sidebar from '../components/Sidebar'

export default function AppLayout() {
  return (
    <div className="h-full">
      <TopBar />
      <Sidebar />
      <main
        className="ml-[240px] mt-[60px] min-h-[calc(100vh-60px)] bg-white"
      >
        <div
          className="max-w-[1120px] px-10 py-8"
          style={{ minHeight: 'calc(100vh - 60px)' }}
        >
          <Outlet />
        </div>
      </main>
    </div>
  )
}
