import { ReactNode, useState } from 'react'
import Modal from '../Modal'

import { FormsProps } from '../../../models/forms'

interface Props {
  children: ReactNode
  Form: React.ComponentType<FormsProps>
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
