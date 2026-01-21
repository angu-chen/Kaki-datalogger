import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import { KakiDash } from '../../models/kaki'

const linzAPIKey = import.meta.env.VITE_LINZ_API as string

interface MapProps {
  dashSightings: KakiDash[]
}

export function Map({ dashSightings }: MapProps) {
  console.log(dashSightings)
  const latestSighting = dashSightings[0]
  return (
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
          return
        }
        if (sighting === latestSighting) {
          return (
            <CircleMarker
              color="red"
              key={sighting.id}
              radius={10}
              center={[sighting.lat, sighting.lon]}
            >
              <Popup>
                {`${sighting.band},  Latest Kakī was seen here by ${sighting.observer} on ${sighting.date}`}
              </Popup>
            </CircleMarker>
          )
        }
        return (
          <CircleMarker
            key={sighting.id}
            radius={8}
            center={[sighting.lat, sighting.lon]}
          >
            <Popup>
              {`${sighting.band}, Kakī was seen here by ${sighting.observer} on ${sighting.date}`}
            </Popup>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
