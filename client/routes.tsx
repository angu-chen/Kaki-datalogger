/* eslint-disable react/jsx-key */
import { createRoutesFromElements, Route } from 'react-router'
import App from './pages/App'
import BirdDetail from './pages/BirdDetail'
import Layout from './pages/Layout'

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<App />} />
    <Route path="/:id" element={<BirdDetail />} />
  </Route>,
)

export default routes
