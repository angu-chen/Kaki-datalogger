import { useKakiDash, useKakis } from '../hooks/useKaki'

import KakiTable from './KakiTable'

export default function DashBoard() {
  const kakiQuery = useKakiDash()

  if (kakiQuery.isError) return <h1> an error occurred while loading</h1>

  if (kakiQuery.isLoading) return <h1> loading</h1>

  return (
    <div className="">
      <h1>Latest Sightings</h1>
      <KakiTable kaki={kakiQuery.data} />
    </div>
  )
}

{
  /* <div className="border grid grid-cols-4">
        <h1>Band</h1>
        <h1>Status</h1>
        <h1>hatch year</h1>
      </div>
      {kakiQuery.data?.map((kaki) => (
        <div className="grid grid-cols-4" key={kaki.id}>
          <h4>{kaki.band}</h4>
          <h4>{kaki.status}</h4>
          <h4>{kaki.hatchYr}</h4>
        </div>
      ))} */
}
