import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet'

import { nztmToLatLng } from './nztm'
import { useEffect, useState } from 'react'

const linzAPIKey = import.meta.env.VITE_LINZ_API as string

interface MapProps {
  data: { id: number; x: number; y: number; msg: string }[]
  sel?: number | null
  setSel?: React.Dispatch<React.SetStateAction<number>>
  showMap?: boolean
}

export function Map({ data, sel = null, setSel, showMap = true }: MapProps) {
  if (!data.length) {
    return <div className="h-96 w-full">No map data available</div>
  }

  function ResizeFix({ showMap }: { showMap: boolean }) {
    const map = useMap()

    useEffect(() => {
      if (showMap) {
        map.invalidateSize()
      }
    }, [showMap, map])

    return null
  }

  function ReFocus({
    sel,
    data,
  }: {
    sel: number | null
    data: MapProps['data']
  }) {
    const map = useMap()

    useEffect(() => {
      const point = data.find((p) => p.id === sel)
      if (!point) return
      map.flyTo(nztmToLatLng(point.x, point.y))
      map.getZoom
    }, [sel, data, map])

    return null
  }
  const firstData = data[0]

  return (
    <div>
      <MapContainer
        className="h-72 w-full"
        center={nztmToLatLng(firstData.x, firstData.y)}
        zoom={9}
        scrollWheelZoom={true}
      >
        <ResizeFix showMap={showMap} />
        <ReFocus sel={sel} data={data} />

        <TileLayer
          attribution='&copy; <a href="https://www.linz.govt.nz/">Images sourced from LINZ</a>'
          url={`https://basemaps.linz.govt.nz/v1/tiles/topo-raster/WebMercatorQuad/{z}/{x}/{y}.webp?api=${linzAPIKey}`}
        />

        {data.map((point) => {
          if (point.x === null || point.y === null) {
            return null
          }

          const isSelected = point.id === sel
          const isLatest = point.id === firstData.id

          const color = isSelected ? 'green' : isLatest ? 'red' : 'blue'
          const radius = isSelected ? 12 : isLatest ? 10 : 8

          return (
            <CircleMarker
              eventHandlers={{
                click: () => {
                  setSel(point.id)
                },
              }}
              pathOptions={{ color }}
              key={point.id}
              radius={radius}
              center={nztmToLatLng(point.x, point.y)}
            >
              <Popup>{point.msg}</Popup>
            </CircleMarker>
          )
        })}
      </MapContainer>
      <div className="font-semibold flex gap-5">
        <p>Legend :</p>
        <p className="text-red-500">Latest</p>
        <p className="text-green-500">Selected</p>
        <p className="text-blue-500">other</p>
      </div>
    </div>
  )
}
