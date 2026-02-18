import { Outlet } from 'react-router'
import Nav from '../components/Nav'

export default function Layout() {
  return (
    <div className="flex flex-col my-2">
      <div className="flex justify-between items-center">
        <div className=" w-20 h-20 rounded-[50%] mx-4 flex justify-center overflow-hidden">
          <img
            className="max-w-full max-h-full object-cover"
            alt="kaki-logo"
            src="client/assets/kakiLogo.png"
          />
        </div>
        <Nav />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
