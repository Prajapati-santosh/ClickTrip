import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Home.scss";
import MagneticButton from "../magneticButton/MagneticButton";
import { motion, AnimatePresence } from "framer-motion";

import Image1 from '../../assets/images/img1.jpg';
import Image2 from '../../assets/images/img2.jpg';
import Image3 from '../../assets/images/img3.jpg';
import Image4 from '../../assets/images/img4.jpg';
import Image5 from '../../assets/images/img5.jpg';
import Image6 from '../../assets/images/img6.jpg';
import cities from "../../assets/Cities";


const images = [Image1, Image2, Image3, Image4, Image5, Image6];


const formatIndianCurrency = (amount) => {
  if (!amount) return "";
  const number = parseInt(amount.replace(/[^0-9]/g, ""), 10);
  if (isNaN(number)) return "";
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(number);
};

function Home() {
  const [destination, setDestination] = useState("");
  const [members, setMembers] = useState("");
  const [budget, setBudget] = useState("");
  const [dates, setDates] = useState([null, null]);
  const [startDate, endDate] = dates;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
   const searchBoxRef = useRef(null);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = cities.filter(city =>
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (city.state && city.state.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSuggestions(filtered);
    }
  }, [searchQuery]);


  const handleSelectCity = (cityName) => {
    setDestination(cityName);
    setSearchQuery(cityName);
    setShowSearch(false);
    setSuggestions([]);
  };

   useEffect(() => {
    function handleClickOutside(event) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    }

    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);



  const isReady = destination && members && budget && startDate && endDate;

  const handleSubmit = () => {
    if (!isReady) return;
    alert(
      `Planning trip to ${destination}, with ${members} members, in a budget of ${budget}, from ${startDate.toDateString()} to ${endDate.toDateString()}`
    );
  };

  useEffect(() => {
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}, []);


  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, 5500); 

  return () => clearInterval(interval); 
}, []);


  const handleBudgetChange = (e) => {
    const rawValue = e.target.value;
    
    const numericValue = rawValue.replace(/[^0-9]/g, "");
    setBudget(numericValue);
  };

  return (
    <div className="home">
      <main className="home__content">
        <div className="trip-line">
        <div className="text-holder">

          <p className="trip-line__text">
            I want to <span className="handuk">Explore</span> 
          <input
              type="text"
              placeholder="Mathura"
              className="inline-input inline-input--text"
              value={destination}
              readOnly   // prevent typing here
              onClick={() => setShowSearch(true)} // open overlay
              style={{ width: "3.5rem", minWidth: "250px" }}
            />
            <br/>
            with
            <input
              type="number"
              placeholder="2"
              className="inline-input inline-input--number"
              value={members}
              onChange={(e) => setMembers(e.target.value)}
              style={{width: "1.2rem"}}
            />
            <span className="handuk">members</span> in a budget of
            <br/>
            <div className="date-selector">
              <input
                type="text"
                placeholder="₹2000"
                className="inline-input inline-input--currency"
                value={budget ? formatIndianCurrency(budget) : ""}
                onChange={handleBudgetChange}
                style={{width: "1.8rem"}}
              />
              <span className="handuk">from</span>
              <div className="outer-date-selector">
                <DatePicker
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => setDates(update)}
                  isClearable
                  placeholderText="Select dates"
                  className="inline-input inline-input--date-range"
                  withPortal
                />
              </div>
              ?
            </div>
          <div className="button-holder">
            <button
              className={`cta ${isReady ? "cta--ready" : "cta--disabled"}`}
              onClick={handleSubmit}
              disabled={!isReady}
            >
              Plan My Trip
            </button>
          </div>
          </p>
        </div>
       <div className="side-img">
        <div className="side-img-overlay"></div>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.2 }}
              transition={{ duration: 1 }}
            />
          </AnimatePresence>

          {/* <div className="image-tabs">
            {images.map((_, index) => (
              <button
                key={index}
                className={`tab ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div> */}
        </div>

        </div>
      </main>
      <AnimatePresence>
          {showSearch && (
            <motion.div
              className="search-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                ref={searchBoxRef} 
                className="search-box-floating"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="text"
                  autoFocus
                  placeholder="Search city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="floating-input"
                />

                {suggestions.length > 0 && (
                <ul className="floating-suggestions">
                    {suggestions.map((city) => {
                      const regex = new RegExp(`(${searchQuery})`, "gi");
                      const highlightedCity = city.name.replace(regex, "<mark>$1</mark>");
                      const highlightedState = city.state
                        ? city.state.replace(regex, "<mark>$1</mark>")
                        : null;

                      return (
                        <li key={city.id} onClick={() => handleSelectCity(city.name)}>
                          {city.iconUrl && (
                            <img src={city.iconUrl} alt={city.name} className="city-icon" />
                          )}
                          <span dangerouslySetInnerHTML={{ __html: highlightedCity }} />
                          {highlightedState && (
                            <small dangerouslySetInnerHTML={{ __html: highlightedState }} />
                          )}
                        </li>
                      );
                    })}
                  </ul>

                )}

                <button className="close-btn" onClick={() => setShowSearch(false)}>
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

    </div>
  );
}

export default Home;
