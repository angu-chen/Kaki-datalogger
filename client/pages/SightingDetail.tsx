import { useParams } from 'react-router'

export default function SightingsDetail() {
  const params = useParams()

  return <h1>Sightings! number {params.id}</h1>
}
