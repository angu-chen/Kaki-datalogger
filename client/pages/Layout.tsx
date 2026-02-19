import { Outlet, useMatches } from 'react-router'
import Nav from '../components/Nav'

export default function Layout() {
  const matches = useMatches()

  const currentMatch = matches.find((m) => m.handle?.title)
  const pageTitle = currentMatch?.handle?.title || 'Default Title'

  return (
    <div className="flex relative flex-col px-2 gap-1 md:gap-8 md:px-16 lg:px-16 xl:px-16 py-2">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <div className=" w-16 md:w-20 h-16 md:h-20 lg:w-23 lg:h-23 xl:w-26 xl:h-26 rounded-[50%] md: flex justify-center overflow-hidden">
            <img
              className="max-w-full max-h-full object-cover"
              alt="kaki-logo"
              src="client/assets/kakiLogo.png"
            />
          </div>
          <p className="xl:text-2xl lg:text-[20px] md:text-[16px] text-[12px] font-medium text-center">
            Kakī Data
          </p>
        </div>
        <Nav />
      </div>
      <div className="lg:absolute md:-mt-8 lg:left-1/2 lg:mt-8 lg:-translate-x-1/2">
        <h1 className="text-4xl  font-semibold text-center">{pageTitle}</h1>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
