import proj4 from 'proj4'

export const NZTM = 'EPSG:2193'
export const WGS84 = 'EPSG:4326'

// defining NZTM //
proj4.defs(
  NZTM,
  '+proj=tmerc +lat_0=0 +lon_0=173 +k=0.9996 ' +
    '+x_0=1600000 +y_0=10000000 +ellps=GRS80 ' +
    '+towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
)

export function nztmToLatLng(x: number, y: number): [number, number] {
  const [lng, lat] = proj4(NZTM, WGS84, [x, y])
  return [lat, lng]
}

export function latLngToNZTM(lat: number, lng: number): [number, number] {
  const [x, y] = proj4(WGS84, NZTM, [lng, lat])
  return [x, y]
}
