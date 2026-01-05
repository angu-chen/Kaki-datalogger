import { useKakis } from '../hooks/useKaki'
import BandBox from './BandBox'

export default function DashBoard() {
  const kakiQuery = useKakis()

  if (kakiQuery.isError) return <h1> an error occurred while loading</h1>

  if (kakiQuery.isLoading) return <h1> loading</h1>

  return (
    <div className="">
      <div className="border grid grid-cols-4">
        <h1>Band Left</h1>
        <h1>Band Right</h1>
        <h1>Status</h1>
        <h1>hatch year</h1>
      </div>
      {kakiQuery.data?.map((kaki) => (
        <div className="grid grid-cols-4" key={kaki.id}>
          <BandBox color={kaki.bandL} />
          <BandBox color={kaki.bandR} />
          <h4>{kaki.status}</h4>
          <h4>{kaki.hatchYr}</h4>
        </div>
      ))}
    </div>
  )
}
