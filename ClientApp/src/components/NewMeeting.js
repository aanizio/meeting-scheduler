import React, { useState } from 'react';
import authService from './api-authorization/AuthorizeService';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

export function NewMeeting() {
    const [title, setTitle] = useState();
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const postData = async() => {
            const token = await authService.getAccessToken();
            const _date = format(date, 'yyyy-MM-dd');
            const _startTime = format(startTime, 'HH:mm:ss');
            const _endTime = format(endTime, 'HH:mm:ss');
            const data = {
                title,
                start: `${_date}T${_startTime}`,
                end: `${_date}T${_endTime}`,
            };
            const response = await fetch("/meetings", {
                headers: !token ? {} : { 
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            });
        };
        postData();
    };

    const handleTitleChange = (evt) => {
        setTitle(evt.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>New Meeting</h1>
            <input name="title" placeholder="Enter meeting title" 
                onChange={handleTitleChange} value={title} />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker value={date} onChange={setDate} />
                <TimePicker value={startTime} onChange={setStartTime} />
                <TimePicker value={endTime} onChange={setEndTime} />
            </MuiPickersUtilsProvider>
            <button className="btn btn-primary" type="submit">Create Meeting</button>
        </form>
    );
}