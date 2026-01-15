import AllPairingsTable from '../components/AllPairingsTable'

export function AllPairings() {
  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-4xl my-5 font-semibold"> All Kakī Pairings</h1>
      <div className="w-4/5 my-2 overflow-scroll h-2/3">
        <AllPairingsTable />
      </div>
    </div>
  )
}
