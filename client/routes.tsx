/* eslint-disable react/jsx-key */
import { createRoutesFromElements, Route } from 'react-router'
import App from './pages/Home'
import BirdDetail from './pages/BirdDetail'
import Layout from './pages/Layout'
import SightingsDetail from './pages/SightingDetail'
import PairingsDetail from './pages/PairingDetail'
import { AllPairings } from './pages/AllPairings'
import { AllSightings } from './pages/AllSightings'

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<App />} />
    <Route path="/:id" element={<BirdDetail />} />
    <Route path="/sightings/:id" element={<SightingsDetail />} />
    <Route path="/sightings/" element={<AllSightings />} />
    <Route path="/pairings/" element={<AllPairings />} />
    <Route path="/pairings/:id" element={<PairingsDetail />} />
  </Route>,
)

export default routes
