import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const linzAPIKey = import.meta.env.VITE_LINZ_API as string

export function Map() {
  const mockSightings = [
    {
      id: 1,
      bird_id: 1,
      date: '2019-03-01',
      area: 'Northern Region',
      location: 'Tawharanui',
      lat: -44.27,
      lon: 170.051,
      observer: 'Joe',
      notes: 'Feeding actively',
    },
    {
      id: 2,
      bird_id: 1,
      date: '2019-04-10',
      area: 'Northern Region',
      location: 'Tawharanui',
      lat: -44.263,
      lon: 170.064,
      observer: 'Kat',
      notes: 'Seen with partner',
    },
    {
      id: 3,
      bird_id: 2,
      date: '2022-03-05',
      area: 'Northern Region',
      location: 'Warkworth',
      lat: -44.256,
      lon: 170.077,
      observer: 'Joe',
      notes: 'Flew over main road',
    },
    {
      id: 4,
      bird_id: 5,
      date: '2023-05-20',
      area: 'Southern Region',
      location: 'Nelson Lakes',
      lat: -44.249,
      lon: 170.09,
      observer: 'Angu',
      notes: 'Foraging near lake',
    },
    {
      id: 5,
      bird_id: 7,
      date: '2023-06-01',
      area: 'Southern Region',
      location: 'Nelson Lakes',
      lat: -44.242,
      lon: 170.018,
      observer: 'Angu',
      notes: 'Healthy and active',
    },
    {
      id: 6,
      bird_id: 6,
      date: '2023-07-15',
      area: 'Southern Region',
      location: 'Kahurangi',
      lat: -44.295,
      lon: 170.031,
      observer: 'Kat',
      notes: 'Solo flight',
    },
  ]

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

      {mockSightings.map((sighting) => (
        <Marker key={sighting.id} position={[sighting.lat, sighting.lon]}>
          <Popup>
            {`${sighting.bird_id} Kakī was seen here by ${sighting.observer} on ${sighting.date}`}
          </Popup>
        </Marker>
      ))}
      {/* <Marker position={[-43.601145, 171.325854]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
    </MapContainer>
  )
}
