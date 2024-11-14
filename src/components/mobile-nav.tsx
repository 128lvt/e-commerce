import { ModeToggle } from './mode-toggle'
import Profile from '../app/(auth)/profile'
import Sidebar from './sidebar'

export default function MobileNav() {
  return (
    <div className="flex items-center gap-5">
      <ModeToggle />
      <Profile />
      <Sidebar />
    </div>
  )
}
