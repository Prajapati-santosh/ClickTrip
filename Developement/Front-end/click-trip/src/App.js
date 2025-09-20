import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage  from './components/HomePage.jsx';
import { TripProvider } from './context/TripContext.js';
import Home from './components/home/Home.jsx';
import Footer from './components/Footer/Footer.jsx';
import Results from './components/results/ResultPage.jsx';


function App() {
  return (
  
    <div className="App">
          <HomePage/>

         
          <Router>
          <TripProvider>
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/results' element={<Results/>}/>
                

                <Route path='/Login' element={<Login/>}/>
              </Routes>

          </TripProvider>
          </Router> 

          <Footer/>
          
          
    </div>
  );
}

export default App;
