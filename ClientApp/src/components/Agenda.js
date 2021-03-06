import React, { useState, useEffect } from 'react';
import authService from './api-authorization/AuthorizeService';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import { Link, useHistory } from "react-router-dom";

export function Agenda() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await authService.getAccessToken();
                const response = await fetch('meetings', {
                    headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                setMeetings(data);
                setIsLoading(false);
            } catch (error) {
                setIsError(true);
            }
        };
        fetchData();
    }, []);

    const handleDateClick = (info) => {
        const isoDate = info.date.toISOString();
        history.push(`/new-meeting/${isoDate}`);
    };

    let content;
    if (isError)
        content = <p>Error fetching data</p>;
    else if (isLoading)
        content = <p>Loading...</p>;
    else
        content = <FullCalendar
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
            dateClick={handleDateClick}
            initialView="dayGridMonth"
            initialEvents={meetings}
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
        />;

    return (
        <div>
            <h1>Agenda</h1>

            <Link to="/new-meeting" className="btn btn-primary">New Meeting</Link>
            <Link to="/search" className="btn btn-primary">Search</Link>

            {content}
        </div>
    );
}