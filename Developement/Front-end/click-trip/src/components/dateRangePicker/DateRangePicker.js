import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateRangePicker({ onChange }) {
  const [range, setRange] = useState([null, null]);
  const [startDate, endDate] = range;

  const handleChange = (update) => {
    setRange(update);
    if (onChange) {
      onChange(update);
    }
  };

  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={handleChange}
      isClearable={true}
      placeholderText="Select travel dates"
      className="date-input"
      withPortal
    />
  );
}

export default DateRangePicker;
