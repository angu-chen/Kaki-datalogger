import { useKakis } from '../hooks/useKaki'

export default function DashBoard() {
  const kakiQuery = useKakis()

  if (kakiQuery.isError) return <h1> an error occurred while loading</h1>

  if (kakiQuery.isLoading) return <h1> loading</h1>

  return (
    <div>
      {kakiQuery.data?.map((kaki) => (
        <div key={kaki.id}>
          <h1>{kaki.bandL}</h1>{' '}
        </div>
      ))}
    </div>
  )
}
