import DashBoard from '../components/Dashboard.tsx'
function App() {
  return (
    <div className="flex flex-col w-fit items-center">
      <div className="flex flex-col bg-white rounded-3xl p-2 items-center h-screen shadow-2xl">
        <DashBoard />
      </div>
    </div>
  )
}
export default App
