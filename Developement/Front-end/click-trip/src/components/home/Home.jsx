import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Home.scss";
import MagneticButton from "../magneticButton/MagneticButton";

// Helper to format numbers in Indian format with currency
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

  const isReady = destination && members && budget && startDate && endDate;

  const handleSubmit = () => {
    if (!isReady) return;
    alert(
      `Planning trip to ${destination}, with ${members} members, in a budget of ${budget}, from ${startDate.toDateString()} to ${endDate.toDateString()}`
    );
  };

  const handleBudgetChange = (e) => {
    const rawValue = e.target.value;
    // Allow only digits, commas and ₹ for formatting later
    const numericValue = rawValue.replace(/[^0-9]/g, "");
    setBudget(numericValue);
  };

  return (
    <div className="home">
      <main className="home__content">
        <div className="trip-line">
          <p className="trip-line__text">
            We are going to
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
            members in a budget of
            <br/>
            <div className="date-selector">
              <input
                type="text"
                placeholder="₹2000"
                className="inline-input inline-input--currency"
                value={budget ? formatIndianCurrency(budget) : ""}
                onChange={handleBudgetChange}
              />
              from
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
          </p>
          <div className="button-holder">
            <MagneticButton
              className={`cta ${isReady ? "cta--ready" : "cta--disabled"}`}
              onClick={handleSubmit}
              disabled={!isReady}
            >
              Plan My Trip
            </MagneticButton>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
