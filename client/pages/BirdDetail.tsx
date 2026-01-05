import { useParams } from 'react-router'

function BirdDetail() {
  const params = useParams()

  return (
    <div>
      <h1>{`bird id is: ${params.id}`}</h1>
    </div>
  )
}

export default BirdDetail
