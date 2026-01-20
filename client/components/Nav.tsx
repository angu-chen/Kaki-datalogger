export default function Nav() {
  return (
    <nav className="mx-5 font-semibold text-md" role="navigation">
      <ul className="flex gap-5">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/pairings">Pairings</a>
        </li>
        <li>
          <a href="/sightings">Sightings</a>
        </li>
      </ul>
    </nav>
  )
}
