import './App.css'
import Camps from "./pages/Camps";
import Home from "./pages/Home";
import { Route, Routes } from 'react-router-dom';
import Private from './pages/Private';
import Development from './pages/Development';
import Merch from './pages/Merch';
import Cart from './pages/Cart';

function App() {
  return (
    <>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/camps" element={<Camps />} />
          <Route path="/private" element={<Private />} />
          <Route path="/development" element={<Development />} />
          <Route path="/merch" element={<Merch />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </>
  )
}

export default App
