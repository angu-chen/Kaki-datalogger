import { Outlet, useMatches } from 'react-router'
import Nav from '../components/Nav'

export default function Layout() {
  const matches = useMatches()

  const currentMatch = matches.find((m) => m.handle?.title)
  const pageTitle = currentMatch?.handle?.title || 'Default Title'

  return (
    <div className="flex relative flex-col my-2">
      <div className="flex justify-between items-center">
        <div className=" w-18 h-18 rounded-[50%] mx-4 flex justify-center overflow-hidden">
          <img
            className="max-w-full max-h-full object-cover"
            alt="kaki-logo"
            src="client/assets/kakiLogo.png"
          />
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 ">
          <h1 className="text-4xl font-semibold text-center">{pageTitle}</h1>
        </div>
        <Nav />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
