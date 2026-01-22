import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import { KakiDash } from '../../models/kaki'
import { nztmToLatLng } from './maps/nztm'

const linzAPIKey = import.meta.env.VITE_LINZ_API as string

interface MapProps {
  dashSightings: KakiDash[]
  sel: number
}

export function Map({ dashSightings, sel }: MapProps) {
  if (!dashSightings.length) {
    return <div className="h-96 w-full">No sightings available</div>
  }

  const wellington = [1570636.6812821033, 5180040.614730678] //NZTM
  const latestSighting = dashSightings[0]
  return (
    <div>
      <MapContainer
        className="h-96 w-full"
        center={nztmToLatLng(latestSighting.x, latestSighting.y)}
        // center={nztmToLatLng(wellington[0], wellington[1])}
        zoom={9}
        scrollWheelZoom={true}
      >
        <TileLayer
          // Note that the API key might need changing once it is no longer valid. This is currently a standard key
          attribution='&copy; <a href="https://www.linz.govt.nz/">Images sourced from LINZ</a>'
          url={`https://basemaps.linz.govt.nz/v1/tiles/topo-raster/WebMercatorQuad/{z}/{x}/{y}.webp?api=${linzAPIKey}`}
        />

        {dashSightings.map((sighting) => {
          if (sighting.x === null || sighting.y === null) {
            return null
          }

          const isSelected = sighting.id === sel
          const isLatest = sighting.id === latestSighting.id

          const color = isSelected ? 'green' : isLatest ? 'red' : 'blue'
          const radius = isSelected ? 12 : isLatest ? 10 : 8

          return (
            <CircleMarker
              pathOptions={{ color }}
              key={sighting.id}
              radius={radius}
              center={nztmToLatLng(sighting.x, sighting.y)}
            >
              <Popup>
                {`${sighting.band}, Kakī was seen here by ${sighting.observer} on ${sighting.date}`}
              </Popup>
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
