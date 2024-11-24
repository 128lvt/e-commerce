import Profile from '@/app/(user)/(auth)/profile'
import { ModeToggle } from './mode-toggle'
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
