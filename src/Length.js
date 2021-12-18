import React from "react";

const Length = ({ title, time, changeTime, formatTime }) => {
  return (
    <div>
      <h2 id={title === "Break" ? "break-label" : "session-label"}>
        {title} length
      </h2>
      <div className="time-sets">
        <button
          id={title === "Break" ? "break-decrement" : "session-decrement"}
          onClick={() => changeTime(-1, title)}
        >
          <i class="fas fa-minus"></i>
        </button>
        <label id={title === "Break" ? "break-length" : "session-length"}>
          {time}
        </label>
        <button
          id={title === "Break" ? "break-increment" : "session-increment"}
          onClick={() => changeTime(1, title)}
        >
          <i class="fas fa-plus"></i>
        </button>
      </div>
    </div>
  );
};

export default Length;
