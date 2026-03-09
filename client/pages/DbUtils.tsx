import { useCleanseDb } from '../hooks/useKaki'

function DbUtils() {
  const cleanDb = useCleanseDb()

  const handleCleanDbButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    cleanDb.mutate()
    return
  }
  return (
    <div>
      <button
        className="border bg-red-500 rounded-sm px-3 py-1 hover:bg-red-800 shadow-lg cursor-pointer"
        onClick={(e) => handleCleanDbButtonClick(e)}
      >
        Clean Db
      </button>
    </div>
  )
}

export default DbUtils
