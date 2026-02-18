import { href } from 'react-router'
import { link } from 'superagent'

export default function Nav() {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Pairings', href: '/pairings' },
    { name: 'Sightings', href: '/sightings' },
    { name: 'Releases', href: '/releases' },
  ]
  return (
    <nav className="mx-6  font-semibold text-md" role="navigation">
      <ul className="flex gap-5">
        {navLinks.map((link) => (
          <li key={link.name}>
            <a href={link.href} className="group flex flex-col items-center">
              {link.name}
              <div className="bg-green-700 transition-transform duration-300 scale-x-0  group-hover:scale-x-100 h-1 w-full" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
