import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage  from './components/HomePage.jsx';
import authContext from './components/Context/authContext.jsx';

function App() {
  return (
  
    <div className="App">
        <authContext.Provider value={authContext}>
          <Router>
            <Routes>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/Login' element={<Login/>}/>
            </Routes>
          </Router>
        </authContext.Provider>
    </div>
  );
}

export default App;
