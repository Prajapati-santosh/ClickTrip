import './HomePage.scss';
import Footer from '../components/Footer/Footer.jsx'
import Home from './home/Home.jsx';
import {AnimatePresence} from 'framer-motion'
import CityNav from './cityNav/CityNav.js';
import { useEffect, useRef, useState } from 'react';
import cities from '../assets/Cities.js';
import { IoCaretDownSharp, IoCaretUpSharp } from 'react-icons/io5';

export default function HomePage(){
      const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(cities[7]);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setIsOpen(false);
  };
    return <div className="homepage">
        <div className="nav-bar">
            <h1 className="logo">ClickTrip</h1>
            <ul>
                <li>Login</li>
                <li>Signup</li>
                <li>Trips</li>
                <div className="custom-city-select" ref={dropdownRef}>
        <form>
          <label htmlFor="cities" className="dropdown">
            <input
              type="text"
              id="cities"
              value={selectedCity.name}
              onChange={() => {}}
              onFocus={() => setIsOpen(true)}
              placeholder="SELECT YOUR CITY"
              readOnly
            />
            {isOpen ? <IoCaretUpSharp /> : <IoCaretDownSharp />}
          </label>

          <AnimatePresence mode="wait">
            {isOpen && (
              <CityNav handleOpen={handleOpen} handleSelectCity={handleSelectCity} selectedCityId={selectedCity.id} />
            )}
          </AnimatePresence>
        </form>
      </div>
            </ul>
        </div>
        <div className="main-content">
            <Home/>
        </div>
        <Footer/>
       
    </div>
}