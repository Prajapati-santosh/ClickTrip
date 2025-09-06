import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage  from './components/HomePage.jsx';

function App() {
  return (
  
    <div className="App">
          <Router>
            <Routes>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/Login' element={<Login/>}/>
            </Routes>
          </Router>
    </div>
  );
}

export default App;
