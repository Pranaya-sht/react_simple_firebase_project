import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Main/Home'
import { Login } from './pages/Login'
import { Navbar } from './components/Navbar'
import { Createpost } from './pages/Createpost/Createpost'

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Createpost" element={<Createpost />} />

        </Routes>
      </Router>
    </div>
  )
}

export default App
