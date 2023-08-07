import React from "react";
import "./calendar.css";
import Calendar from "react-calendar";
import { useState } from "react";

let ValuePiece = Date | null;

let Value = ValuePiece | [ValuePiece, ValuePiece];

function CalendarData() {
  const [value, onChange] = useState < Value > new Date();

  return (
    <div className="Sample">
      <header>
        <h1>react-calendar sample page</h1>
      </header>
      <div className="Sample__container">
        <main className="Sample__container__content">
          <Calendar onChange={onChange} showWeekNumbers value={value} />
        </main>
      </div>
    </div>
  );
}

export default CalendarData;
