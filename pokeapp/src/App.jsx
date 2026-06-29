import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PokemonDetail from './pages/PokemonDetail'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
