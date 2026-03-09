/* eslint-disable react/jsx-key */
import { createRoutesFromElements, Route } from 'react-router'
import App from './pages/Home'
import BirdDetail from './pages/BirdDetail'
import Layout from './pages/Layout'
import SightingsDetail from './pages/SightingDetail'
import PairingsDetail from './pages/PairingDetail'
import { AllPairings } from './pages/AllPairings'
import { AllSightings } from './pages/AllSightings'
import ReleasePage from './pages/ReleasePage'
import DbUtils from './pages/DbUtils'

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<App />} handle={{ title: 'Home' }} />
    <Route
      path="/:id"
      element={<BirdDetail />}
      handle={{ title: 'Bird Detail' }}
    />
    <Route
      path="/sightings/:id"
      element={<SightingsDetail />}
      handle={{ title: 'Sighting' }}
    />
    <Route
      path="/sightings/"
      element={<AllSightings />}
      handle={{ title: 'All Sightings' }}
    />
    <Route
      path="/pairings/"
      element={<AllPairings />}
      handle={{ title: 'All Pairings' }}
    />
    <Route
      path="/pairings/:id"
      element={<PairingsDetail />}
      handle={{ title: 'Pairing' }}
    />
    <Route
      path="/releases"
      element={<ReleasePage />}
      handle={{ title: 'Releases' }}
    />

    <Route
      path="/clean-db"
      element={<DbUtils />}
      handle={{ title: 'DB UTILS' }}
    />
  </Route>,
)

export default routes
