import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Results.scss";
import { TripContext } from "../../context/TripContext";

// Icons
import AccomodationIcon from "../../assets/resultsIcon/accomodation.svg";
import TravelIcon from "../../assets/resultsIcon/travel.svg";
import RupeeIcon from "../../assets/resultsIcon/rupee.svg";

// 🔹 Skeleton component
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
  const [loading, setLoading] = useState(true);

  // simulate API delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // fallback demo data if tripPlan is empty
  const customResult = tripPlan || [
    {
        "title": "Day 1: Arrival and Dehradun Exploration",
        "summary": "Arrive in Dehradun, check into your accommodation, and begin exploring the city center. Visit the iconic Clock Tower, browse the local markets at Paltan Bazaar, and enjoy a delicious North Indian dinner. Consider a relaxing evening stroll along Rajpur Road.",
        "transportation": "Pre-booked taxi from airport/railway station, local auto-rickshaws, walking.",
        "accommodationSuggestion": "Mid-range hotel near Rajpur Road (approx. ₹3000 per night)",
        "dailyCostEstimate": "Activities: ₹1000, Food: ₹1500, Transport: ₹800, Accommodation: ₹3000. Total: ₹6300"
    },
    {
        "title": "Day 2: Tapkeshwar Temple and Robber's Cave Adventure",
        "summary": "Start your day with a visit to the sacred Tapkeshwar Temple, known for its unique Shiva Lingam. Afterwards, head to Robber's Cave (Gucchupani) for a refreshing natural cave exploration. In the evening, enjoy a cooking class focused on Garhwali cuisine, offering a hands-on culinary experience. Note: Entry fee for Robber's Cave is minimal.",
        "transportation": "Local bus or auto-rickshaw to Tapkeshwar Temple and Robber's Cave, pre-booked taxi for cooking class (if outside city center).",
        "accommodationSuggestion": "Mid-range hotel near Rajpur Road (approx. ₹3000 per night)",
        "dailyCostEstimate": "Activities: ₹1200 (including cooking class), Food: ₹1300, Transport: ₹1000, Accommodation: ₹3000. Total: ₹6500"
    },
    {
        "title": "Day 3: Sahastradhara and Forest Research Institute",
        "summary": "Embark on a day trip to Sahastradhara, a beautiful waterfall and sulphur springs. Enjoy the scenic beauty and take a dip in the therapeutic waters. Later, visit the Forest Research Institute (FRI), an architectural marvel and a center of forestry research. Conclude the day with a relaxing dinner at a restaurant with a view.",
        "transportation": "Pre-booked taxi or shared taxi to Sahastradhara, local auto-rickshaw within FRI campus.",
        "accommodationSuggestion": "Mid-range hotel near Rajpur Road (approx. ₹3000 per night)",
        "dailyCostEstimate": "Activities: ₹1500 (including Sahastradhara entry and FRI entry), Food: ₹1400, Transport: ₹1200, Accommodation: ₹3000. Total: ₹7100"
    },
    {
        "title": "Day 4: Mindrolling Monastery and Departure",
        "summary": "Visit the Mindrolling Monastery, one of the largest Buddhist centers in India, known for its stunning architecture and peaceful ambiance. Explore the monastery grounds, admire the intricate artwork, and meditate in the serene environment. After lunch, head to the airport/railway station for your departure.",
        "transportation": "Pre-booked taxi to Mindrolling Monastery and airport/railway station.",
        "accommodationSuggestion": "N/A - Departure Day",
        "dailyCostEstimate": "Activities: ₹800, Food: ₹1000, Transport: ₹1500. Total: ₹3300. Accommodation (last 3 nights): ₹9000. Total trip cost for 2 people (including ₹10,000 buffer for shopping/misc. expenses): approx. ₹89400.  This allows for customization within the set budget."
    }
];

  if (loading) {
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

  if (!customResult || customResult.length === 0) {
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
        {customResult.map((day, index) => (
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
