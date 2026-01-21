import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import { KakiDash } from '../../models/kaki'

const linzAPIKey = import.meta.env.VITE_LINZ_API as string

interface MapProps {
  dashSightings: KakiDash[]
  sel: number
}

export function Map({ dashSightings, sel }: MapProps) {
  console.log(dashSightings)
  if (!dashSightings.length) {
    return <div className="h-96 w-full">No sightings available</div>
  }
  const latestSighting = dashSightings[0]
  return (
    <div>
      <MapContainer
        className="h-96 w-full"
        center={[latestSighting.lat, latestSighting.lon]}
        zoom={9}
        scrollWheelZoom={true}
      >
        <TileLayer
          // Note that the API key might need changing once it is no longer valid. This is currently a standard key
          attribution='&copy; <a href="https://www.linz.govt.nz/">Images sourced from LINZ</a>'
          url={`https://basemaps.linz.govt.nz/v1/tiles/topo-raster/WebMercatorQuad/{z}/{x}/{y}.webp?api=${linzAPIKey}`}
        />

        {dashSightings.map((sighting) => {
          if (sighting.lat === null || sighting.lon === null) {
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
              center={[sighting.lat, sighting.lon]}
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
