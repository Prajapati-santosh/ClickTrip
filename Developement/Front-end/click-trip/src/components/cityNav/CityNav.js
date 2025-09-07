import React, { useState } from 'react';
import './citynav.scss';
import { menuOpen } from './anim';
import { motion } from 'framer-motion';
import Curve from './curve';
import { GrClose } from "react-icons/gr";
import { HiLocationMarker } from "react-icons/hi";
import { IoChevronBack } from "react-icons/io5";
import cities from '../../assets/Cities';
import { useCity } from '../../context/LocationContext';

function CityNav({ handleOpen, handleSelectCity, selectedCityId }) {
  const [showAllCities, setShowAllCities] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { selectCity } = useCity();

  const handleClick = (city) => {
    selectCity(city);
    handleSelectCity(city);
    handleOpen();
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCity = cities.find((city) => city.id === selectedCityId);
  const topCities = cities.slice(0, 10);
  const isCityInTop = topCities.some((city) => city.id === selectedCityId);
  const visibleCities = isCityInTop ? topCities : [selectedCity, ...topCities.slice(0, 10)];

  return (
    <>
      <div className="citynav-container" onClick={handleOpen} />
      <motion.div className="cities" variants={menuOpen} initial="initial" animate="enter" exit="exit">
        <div className="cities-options">
          <GrClose className='close-icon' onClick={handleOpen} />

          {!showAllCities ? (
            <>
              <div className="top-cities-grid">
                {visibleCities.map((city) => (
                  <div
                    key={city.id}
                    className={`city-option ${selectedCityId === city.id ? 'selected' : ''}`}
                    onClick={() => handleClick(city)}
                  >
                    {city.iconUrl ? (
                      <img src={city.iconUrl} alt={city.name} className="city-icon" />
                    ) : (
                      <div className="city-placeholder-icon">
                        <HiLocationMarker size={22} />
                      </div>
                    )}
                    {city.name}
                  </div>
                ))}
              </div>
              <div className="show-more" onClick={() => setShowAllCities(true)}>
                More Cities
              </div>
            </>
          ) : (
            <>
              <div className="show-less" onClick={() => setShowAllCities(false)}>
                  <IoChevronBack size={20}/> Back
              </div>
              <div className="nav-search-bar">
                <input
                  type="text"
                  placeholder="Search cities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="all-cities-list">
                {filteredCities.map((city) => (
                  <div
                    key={city.id}
                    className={`city-option-list ${selectedCityId === city.id ? 'selected' : ''}`}
                    onClick={() => handleClick(city)}
                  >
                    {city.name}
                  </div>
                ))}
              </div>

            </>
          )}
        </div>
        <Curve />
      </motion.div>
    </>
  );
}

export default CityNav;
