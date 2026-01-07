// interface Props{
//   onClose :
// }

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null

  return (
    <div className="inset-0 fixed z-50">
      <div className="bg-gray-500 opacity-50 absolute inset-0 "></div>
      <div className="relative z-10 min-h-full flex items-center justify-center">
        <div className="bg-gray-100 rounded-2xl p-6">
          <button onClick={() => onClose()}>x</button>
          <h1> I am a modal</h1>
          {children}
        </div>
      </div>
    </div>
  )
}
