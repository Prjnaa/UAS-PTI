import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './calendar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userState } from "../currentUser";
import { db } from "../firebase";
import {
  getDocs,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  FieldValue,
} from "firebase/firestore";

const Calendar = () => {
  const currentUser = userState.currentUser;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userRef = doc(db, "users", currentUser);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setEvents(userData.eventLists);
        }
      } catch (error) {
        console.log('Error fetching events: ', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event) => {
    console.log('Event clicked:', event);
  };

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} className='bg-cust-1'>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'today prev,next',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        height="100%"
        events={events}
        slotDuration="00:30:00"
        eventDidMount={info => {
          const popoverContent = `
            <strong>${info.event.title}</strong>
            Location: ${info.event.extendedProps.location}<br/>
            Time: ${info.event.extendedProps.time}
          `;
          return new bootstrap.Popover(info.el, {
            title: info.event.extendedProps.eventName,
            placement: 'auto',
            trigger: 'hover',
            customClass: 'popoverStyle',
            content: popoverContent,
            html: true,
          });
        }}
        eventClick={handleEventClick}
      />

      <ToastContainer />
    </div>
  );
};

export default Calendar;
