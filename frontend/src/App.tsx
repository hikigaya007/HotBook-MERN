import { BrowserRouter , Routes , Route } from 'react-router-dom'
import './App.css'
import Layout from './layouts/Layout'
import Register from './pages/Register'

function App() {
  

  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout>Home</Layout>}/>
      <Route path='/register' element={<Layout><Register/></Layout>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
