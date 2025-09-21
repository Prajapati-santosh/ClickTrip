import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Results.scss";
import { TripContext } from "../../context/TripContext";
import AccomodationIcon from "../../assets/resultsIcon/accomodation.svg";
import TravelIcon from "../../assets/resultsIcon/travel.svg";
import RupeeIcon from "../../assets/resultsIcon/rupee.svg";
import { LoadingContext } from "../../context/LoadingContext";

// Skeleton component
const SkeletonCard = () => (
  <div className="results__card skeleton">
    <div className="skeleton__title"></div>
    <div className="skeleton__text"></div>
    <div className="skeleton__text short"></div>
    <div className="skeleton__icon-line"></div>
    <div className="skeleton__icon-line"></div>
    <div className="skeleton__icon-line wide"></div>
  </div>
);

const Results = () => {
  const { tripPlan } = useContext(TripContext);
  const { isLoading } = useContext(LoadingContext);
  const [savedTrip, setSavedTrip] = useState([]);

  // 🔹 Load saved trip from localStorage on first mount
  useEffect(() => {
    const storedTrip = localStorage.getItem("tripPlan");
    if (storedTrip) {
      setSavedTrip(JSON.parse(storedTrip));
    }
  }, []);

  // 🔹 Save tripPlan to localStorage whenever it changes
  useEffect(() => {
    if (tripPlan && tripPlan.length > 0) {
      localStorage.setItem("tripPlan", JSON.stringify(tripPlan));
      setSavedTrip(tripPlan);
    }
  }, [tripPlan]);

  
 const fallbackData = [
  {
    title: "Day 1: Arrival and City Exploration",
    summary:
      "Arrive at your destination and check into your hotel. Spend the afternoon exploring the local markets and famous landmarks in the city center. In the evening, enjoy a traditional dinner at a local restaurant and take a leisurely walk around the main square.",
    transportation:
      "Pre-booked taxi from airport/railway station, walking, and local auto-rickshaws.",
    accommodationSuggestion:
      "Comfortable 3-star hotel near the city center (approx. ₹2800–₹3200 per night).",
    dailyCostEstimate:
      "Activities: ₹1000, Food: ₹1400, Transport: ₹700, Accommodation: ₹3000. Total: ₹6100",
  },
  {
    title: "Day 2: Cultural Tour and Local Experience",
    summary:
      "Begin your day with a visit to a popular temple or heritage site. Continue with a guided cultural tour to learn about local history and traditions. In the afternoon, enjoy a hands-on experience such as a cooking class or handicraft workshop. End the day with a rooftop dinner overlooking the city.",
    transportation:
      "Shared taxi or local bus for sightseeing, pre-booked cab for evening activity.",
    accommodationSuggestion:
      "Comfortable 3-star hotel near the city center (approx. ₹3000 per night).",
    dailyCostEstimate:
      "Activities: ₹1500, Food: ₹1300, Transport: ₹900, Accommodation: ₹3000. Total: ₹6700",
  },
  {
    title: "Day 3: Nature and Adventure",
    summary:
      "Head out for a short excursion to a scenic natural spot such as a waterfall, caves, or nearby hills. Spend time enjoying outdoor activities like light trekking, photography, or simply relaxing in nature. Return to the city in the evening and enjoy a casual dinner at a local eatery.",
    transportation:
      "Pre-booked taxi or shared transport to the excursion spot, walking locally.",
    accommodationSuggestion:
      "Comfortable 3-star hotel near the city center (approx. ₹3000 per night).",
    dailyCostEstimate:
      "Activities: ₹1600, Food: ₹1400, Transport: ₹1200, Accommodation: ₹3000. Total: ₹7200",
  },
  {
    title: "Day 4: Relaxation and Departure",
    summary:
      "Spend your final morning visiting a peaceful location such as a monastery, garden, or museum. Enjoy a light lunch before heading to the airport or railway station for your departure.",
    transportation: "Pre-booked taxi to sightseeing spot and onward departure.",
    accommodationSuggestion: "N/A - Departure Day",
    dailyCostEstimate:
      "Activities: ₹800, Food: ₹1000, Transport: ₹1200. Total: ₹3000. Accommodation (previous 3 nights): ₹9000. Approximate total trip cost for 2 people: ₹45,000–₹50,000 including meals, transport, and activities.",
  },
];


  const finalResult = savedTrip.length > 0 ? savedTrip : fallbackData;

  if (isLoading) {
    return (
      <div className="results">
        <h1 className="results__title">Your Trip Itinerary</h1>
        <div className="results__list">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!finalResult || finalResult.length === 0) {
    return (
      <div className="results__empty">
        No trip data found. Plan your trip first!
      </div>
    );
  }

  return (
    <div className="results">
      <h1 className="results__title">Your Trip Itinerary</h1>

      <div className="results__list">
        {finalResult.map((day, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="results__card"
          >
            <h2 className="results__day">{day.title}</h2>
            <p className="results__summary">{day.summary}</p>

            <div className="results__details">
              {day.transportation && day.transportation !== "N/A" && (
                <div className="results__item">
                  <strong>
                    <img src={TravelIcon} alt="transportation-icon" />{" "}
                    Transportation:
                  </strong>
                  <span>{day.transportation}</span>
                </div>
              )}

              {day.accommodationSuggestion &&
                day.accommodationSuggestion !== "N/A" && (
                  <div className="results__item">
                    <strong>
                      <img
                        src={AccomodationIcon}
                        alt="accommodation-icon"
                      />{" "}
                      Accommodation:
                    </strong>
                    <span>{day.accommodationSuggestion}</span>
                  </div>
                )}

              {day.dailyCostEstimate &&
                day.dailyCostEstimate !== "N/A" && (
                  <div className="results__item results__item--wide">
                    <strong>
                      <img src={RupeeIcon} alt="rupee-icon" /> Daily Cost
                      Estimate:
                    </strong>
                    <span>{day.dailyCostEstimate}</span>
                  </div>
                )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Results;
