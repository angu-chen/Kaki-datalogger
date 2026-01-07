import { Outlet } from 'react-router'
import Nav from '../components/Nav'

export default function Layout() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  )
}
