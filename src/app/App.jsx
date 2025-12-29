import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainTemplate } from '../components/templates'

const HomePage = lazy(() => import('../components/pages/HomePage/HomePage'))

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainTemplate />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
