import CsvUploadBut from '../components/csvComponents/CsvUploadBut'
import { useGetAllReleaseSites } from '../hooks/useKaki'

export default function ReleasePage() {
  const { data: allReleaseSites, isError, isLoading } = useGetAllReleaseSites()
  if (isError) return <h1> An error occurred loading release sites</h1>
  if (isLoading) return <h1> Gathering releases</h1>
  console.log(allReleaseSites)

  return (
    <div className="flex flex-col items-center h-screen">
      {/* <h1 className="text-4xl my-5 font-semibold">Release page</h1> */}
      <div>
        <CsvUploadBut />
      </div>
      <div className="flex w-4/5 gap-2 flex-wrap">
        {allReleaseSites?.map((site) => {
          return (
            <button
              className="border"
              key={site.id}
            >{`${site.location} ${site.year}`}</button>
          )
        })}
      </div>
    </div>
  )
}
