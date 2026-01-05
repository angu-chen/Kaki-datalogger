interface Props {
  color: string
}

export default function BandBox({ color }: Props) {
  const colorList = color.split('')
  console.log(colorList)
  return (
    <div className="flex">
      {colorList.map((c, i) => (
        <div className=" flex flex-col" key={c + i}>
          <div className={`bg-${c} w-4 h-4 border-1`}></div>
          <div className="text-center"> {c} </div>
        </div>
      ))}
    </div>
  )
}
