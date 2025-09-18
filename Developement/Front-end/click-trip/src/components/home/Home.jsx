import React, { useEffect, useState } from "react";
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
              onChange={(e) => setDestination(e.target.value)}
            />
            <br/>
            with
            <input
              type="number"
              placeholder="2"
              className="inline-input inline-input--number"
              value={members}
              onChange={(e) => setMembers(e.target.value)}
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
    </div>
  );
}

export default Home;
