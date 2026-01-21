import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const linzAPIKey = import.meta.env.VITE_LINZ_API as string

export function Map() {
  return (
    <MapContainer
      className="h-96 w-full"
      center={[-43.601145, 171.325854]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        // Note that the API key might need changing once it is no longer valid. This is currently a standard key
        attribution='&copy; <a href="https://www.linz.govt.nz/">Images sourced from LINZ</a>'
        url={`https://basemaps.linz.govt.nz/v1/tiles/topo-raster/WebMercatorQuad/{z}/{x}/{y}.webp?api=${linzAPIKey}`}
      />
      <Marker position={[-43.601145, 171.325854]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}
