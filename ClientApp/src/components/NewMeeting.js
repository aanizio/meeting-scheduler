import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

export function NewMeeting() {
    const [selectedDate, handleDateChange] = useState(new Date());

    const handleSubmit = (evt) => {

        evt.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>New Meeting</h1>
            <input placeholder="Enter meeting title" />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker value={selectedDate} onChange={handleDateChange} />
                <TimePicker value={selectedDate} onChange={handleDateChange} />
            </MuiPickersUtilsProvider>
            <button className="btn btn-primary" type="submit">Create Meeting</button>
        </form>
    );
}