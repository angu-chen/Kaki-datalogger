import { ReactNode, useState } from 'react'
import Modal from '../Modal'
import { Pairing } from '../../../models/kaki'

interface Props {
  children: ReactNode
  Form: React.ComponentType<FormsProps>
}

export interface FormsProps {
  onClose: () => void
  edit?: boolean
  editData?: Pairing
}

export default function AddBut({ children, Form }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(true)
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className="border bg-green-200 rounded-sm px-3 hover:bg-green-500 shadow-lg cursor-pointer"
      >
        {children}
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Form onClose={() => setIsOpen(false)} />
      </Modal>
    </div>
  )
}
