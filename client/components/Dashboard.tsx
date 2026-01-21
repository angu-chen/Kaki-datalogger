import { useKakiDash } from '../hooks/useKaki'

import KakiTable from './KakiTable'
import { Map } from './Map'

export default function DashBoard() {
  const kakiQuery = useKakiDash()

  if (kakiQuery.isError) return <h1> an error occurred while loading</h1>

  if (kakiQuery.isLoading) return <h1> loading</h1>
  if (!kakiQuery.data) {
    return <p> No data</p>
  }

  return (
    <div className="">
      <Map dashSightings={kakiQuery.data} />
      <h1 className="text-4xl my-5 font-semibold">Latest Sightings</h1>
      <KakiTable kaki={kakiQuery.data} />
    </div>
  )
}
