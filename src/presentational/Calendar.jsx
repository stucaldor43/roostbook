import React from 'react';
import DAYS_OF_THE_WEEK from './../constants/days';
import './../../stylesheets/components/Calendar/styles.css';

const Calendar = ({lastDayOfPreviousMonth, lastDayOfCurrentMonth, daysInMonth, month, clickHandler, year, nextMonth, previousMonth}) => {
    let dateDataCells = [];
    const numberOfDaysFromPreviousMonthToShow = ((DAYS_OF_THE_WEEK.indexOf(lastDayOfPreviousMonth) === 6)) ? 0 : (DAYS_OF_THE_WEEK.indexOf(lastDayOfPreviousMonth) % 6) + 1;
    dateDataCells = dateDataCells.concat(new Array(numberOfDaysFromPreviousMonthToShow).fill(<td></td>));
    for (let i = 1; i <= daysInMonth; i++) {
        dateDataCells = dateDataCells.concat([<td className="calendar-date" onClick={() => clickHandler(`${month} ${i}, ${year}`)}>{i}</td>]);
    }
    let tableRowsContainingDates = [];
    for (let i = 0; i < 36;) {
        tableRowsContainingDates = tableRowsContainingDates.concat([<tr>{dateDataCells.slice(i, i + 7)}</tr>])
        i += 7;
    }
    
    return (
        <div className="calendar">
            <div className="calendar-controlsContainer">
                <i onClick={previousMonth} className="calendar-previousMonthControl calendar-control">&#8592;</i>
                    {`${month} ${year}`}
                <i onClick={nextMonth} className="calendar-nextMonthControl calendar-control">&#8594;</i>
            </div>
            <table className="calendar-table">
                <tr>
                    { DAYS_OF_THE_WEEK.map((day) => <th className="calendar-day">{day.substring(0, 2)}</th>)}
                </tr>
                {tableRowsContainingDates}
            </table>
        </div>
    );
}

Calendar.defaultProps = {
    lastDayOfPreviousMonth: "Monday",
    lastDayOfCurrentMonth: "Thursday",
    daysInMonth: 31,
    month: "March",
    year: 2018,
    clickHandler: (date) => alert(date),
    nextMonth: () => {},
    previousMonth: () => {}
};

export default Calendar;