import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Todo from './L1/ToDo'
import Tracker from './L2/Expense_Tracker'
import Movie from './L3/Movie_Library'
import TaskManager from './L4/TaskManager'
import SneakerShop from './L5_Poginatsia/pages/SnakerShop/SneakerShop'
import Home from './L6_API/HomePage'
import Favorite from './L6_API/FavoritesPage'
import Movi from './L6_API/MovieDetails'


function App() {


  return (
    <>
      <Todo />
      <hr />
      <Tracker />
      <hr />
      <Movie />
      <hr />
      <TaskManager />
      <hr />
      <SneakerShop />
      <hr />
      <div>

        <Router>
          <nav style={{ padding: '20px', background: '#222', color: '#fff' }}>
            <Link to="/" style={{ color: '#fff', marginRight: '15px' }}>Home</Link>
            <Link to="/favorites" style={{ color: '#fff' }}>❤️</Link>
            
          </nav>

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/favorites' element={<Favorite />} />
            <Route path='/movie/:id' element={<Movi />} />
          </Routes>
        </Router>

      </div>


    </>
  )
}

export default App
