import React, { useState } from 'react';
import authService from './api-authorization/AuthorizeService';

export function Search() {
    const [title, setTitle] = useState();
    const [meetings, setMeetings] = useState([]);

    const handleTitleChange = (evt) => {
        setTitle(evt.target.value);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const fetchData = async() => {
            const token = await authService.getAccessToken();
            const response = await fetch(`/meetings/${title}`, {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            console.log(data);
            setMeetings(data);
        };
        fetchData();
    };

    let meetingsEls = meetings.map(m => (<li key={m.id}>{m.title}</li>));

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="title" placeholder="Search for a meeting title" 
                    onChange={handleTitleChange} value={title} />
            </form>
            <ul>
                {meetingsEls}
            </ul>
        </div>
    );
}