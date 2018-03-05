import React from 'react';
import Calendar from './../presentational/Calendar.jsx';
import DAYS_OF_THE_WEEK from './../constants/days';
import MONTHS_OF_THE_YEAR from './../constants/months';

class CalendarContainer extends React.Component {
    constructor(props) {
        super(props);
        const date = new Date();
        this.state = {
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDate(),
            daysInMonth: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
        }
        this.incrementMonth = this.incrementMonth.bind(this);
        this.decrementMonth = this.decrementMonth.bind(this);
        this.getDaysInMonth = this.getDaysInMonth.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.month !== this.state.month) { 
            this.setState((state) => ({daysInMonth: this.getDaysInMonth(state.year, state.month + 1)}));
        }
    }

    incrementMonth() {
        this.setState((state) => ({
            month: (state.month + 1) % 12,
            year: (state.month === 11) ? state.year + 1 : state.year
        }));
    }

    decrementMonth() {
        this.setState((state) => ({
            month: (state.month > 0) ? (state.month - 1) % 12 : 11,
            year: (state.month === 0) ? state.year - 1 : state.year
        }));
    }

    getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

    render() {
        const {daysInMonth, month, year} = this.state;

        return (
            <div>
                <Calendar lastDayOfPreviousMonth={DAYS_OF_THE_WEEK[new Date(`${MONTHS_OF_THE_YEAR[month - 1]} ${this.getDaysInMonth(year, month)}, ${year}`).getDay()]} 
                          lastDayOfCurrentMonth={DAYS_OF_THE_WEEK[new Date(`${MONTHS_OF_THE_YEAR[month]} ${daysInMonth}, ${year}`).getDay()]}
                          daysInMonth={daysInMonth}
                          month={MONTHS_OF_THE_YEAR[month]}
                          year={year}
                          nextMonth={this.incrementMonth}
                          previousMonth={this.decrementMonth}/>
            </div>
        );
    }
}

export default CalendarContainer;