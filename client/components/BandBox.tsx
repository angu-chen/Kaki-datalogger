interface Props {
  color: string
}

export default function BandBox({ color }: Props) {
  const colorList = color.split('')
  console.log(colorList)
  return (
    <div className="flex">
      {colorList.map((c, i) => (
        <div key={c + i}>
          <div className={`bg-${c} border px-1 text-center`}>{c}</div>
        </div>
      ))}
    </div>
  )
}
