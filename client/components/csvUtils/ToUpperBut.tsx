import { ReactNode, useState } from 'react'
import TextFieldsIcon from '@mui/icons-material/TextFields'
interface Props {
  setData: React.Dispatch<React.SetStateAction<string[][]>>
  data: string[][]
  col: number

  children?: ReactNode
  classname?: string
}
export default function ToUpperBut({
  setData,
  data,
  col,
  children,
  classname,
}: Props) {
  const [u, setU] = useState<boolean>(false)
  const handleClick = () => {
    if (!data) return
    const editedData = data.map((row) => {
      console.log('row is:', row)
      const newRow = row.map((column, index) => {
        if (index === col) {
          console.log('column is:', column)
          return u ? column.toUpperCase() : column.toLowerCase()
        } else return column
      })
      return newRow
    })

    setU(!u)
    setData(editedData)
  }

  return (
    <div className={classname ? classname : ''}>
      <button disabled={data ? false : true} onClick={handleClick}>
        {children ? children : <TextFieldsIcon />}
      </button>
    </div>
  )
}
