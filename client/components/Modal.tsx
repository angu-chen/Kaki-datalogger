import { Close } from '@mui/icons-material'
// interface Props{
//   onClose :
// }

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null

  return (
    <div className="inset-0 fixed z-50 ">
      <div className="bg-gray-500 opacity-50 absolute inset-0 "></div>
      <div className="relative z-10 flex items-center justify-center h-full ">
        <div className="flex flex-col bg-gray-100 max-h-[90vh] rounded-2xl">
          <div className="flex justify-end w-full bg-gray-200 shadow p-3 rounded-t-2xl">
            <Close
              className="border bg-gray-300 hover:bg-gray-500 shadow cursor-pointer"
              onClick={() => onClose()}
            />
          </div>
          <div className="mx-5 pr-5 flex-1 my-2 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
