import { useParams } from 'react-router'

export default function PairingsDetail() {
  const params = useParams()

  return <h1>Pairings! number {params.id}</h1>
}
