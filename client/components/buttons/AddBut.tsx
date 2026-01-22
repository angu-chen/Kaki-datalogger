import { ReactNode, useState } from 'react'
import Modal from '../Modal'
import AddBoxIcon from '@mui/icons-material/AddBox'
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
        className={
          children
            ? `border bg-green-600 font-semibold rounded-sm px-3 py-1 hover:bg-green-800 shadow-lg cursor-pointer`
            : ''
        }
      >
        {children ? (
          children
        ) : (
          <AddBoxIcon className="text-green-600 hover:text-green-800 hover:boreder cursor-pointer" />
        )}
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Form onClose={() => setIsOpen(false)} />
      </Modal>
    </div>
  )
}
