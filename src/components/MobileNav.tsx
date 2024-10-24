import { ModeToggle } from './ModeToggle'
import Profile from './Profile'
import Sidebar from './Sidebar'

export default function MobileNav() {
  return (
    <div className="flex items-center gap-5">
      <ModeToggle />
      <Profile />
      <Sidebar />
    </div>
  )
}
