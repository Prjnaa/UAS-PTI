import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './calendar.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Calendar = () => {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      return JSON.parse(savedEvents);
    } else {
      return [
        {
          title: 'The Title',
          start: '2023-01-05T08:00:00',
          end: '2023-01-05T09:00:00',
        },
      ];
    }
  });

  useEffect(() => {
    const checkEventNotifications = () => {
      const now = new Date();
      const upcomingEvents = events.filter(event => {
        const eventDateTime = new Date(event.start);
        return eventDateTime > now;
      });

      upcomingEvents.forEach(event => {
        const eventDateTime = new Date(event.start);
        const timeDiff = eventDateTime - now;
        if (timeDiff > 0 && timeDiff <= 600000) {
          const alarmSound = new Audio('path_to_alarm_sound_file.mp3');
          alarmSound.play();
          toast.info(`Event ${event.title} is about to start!`, {
            position: 'top-right',
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
    };

    checkEventNotifications();
  }, [events]);

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isSaveButtonHovered, setIsSaveButtonHovered] = useState(false);

  const handleDateClick = arg => {
    setSelectedDate(arg.dateStr);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitModal = event => {
    event.preventDefault();

    const newEventTitle = event.target.elements.title.value;
    const newEventLocation = event.target.elements.location.value;

    if (newEventTitle && newEventLocation && startTime && endTime) {
      const newEvent = {
        title: newEventTitle,
        start: selectedDate + 'T' + startTime + ':00',
        end: selectedDate + 'T' + endTime + ':00',
        location: newEventLocation,
      };

      setEvents(prevEvents => [...prevEvents, newEvent]);
      setShowModal(false);

      toast.success('The event was successfully saved', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
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
        eventDidMount={info => {
          return new bootstrap.Popover(info.el, {
            title: info.event.title,
            placement: 'auto',
            trigger: 'hover',
            customClass: 'popoverStyle',
            content: `Location: ${info.event.extendedProps.location}<br>Start Time: ${new Date(info.event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}<br>End Time: ${new Date(info.event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(':00 ', ' ')}`,
            html: true,
          });
        }}
        dateClick={handleDateClick}
      />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitModal}>
            <Form.Group controlId="title">
              <Form.Label>Event Name</Form.Label>
              <Form.Control type="text" placeholder="Enter event name" />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Event Location</Form.Label>
              <Form.Control type="text" placeholder="Enter event location" />
            </Form.Group>
            <Form.Group controlId="startTime">
              <Form.Label>Event start</Form.Label>
              <Form.Control type="time" value={startTime} onChange={e => setStartTime(e.target.value)} max="24:00" />
            </Form.Group>
            <Form.Group controlId="endTime">
              <Form.Label>Event End</Form.Label>
              <Form.Control type="time" value={endTime} onChange={e => setEndTime(e.target.value)} max="24:00" />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className={`hover-button ${isSaveButtonHovered ? 'save-button-hover' : ''}`}
              onMouseEnter={() => setIsSaveButtonHovered(true)}
              onMouseLeave={() => setIsSaveButtonHovered(false)}
              style={{ backgroundColor: '#DDFFBC', zIndex: 1, color: '#52734D', marginTop: '10px', border: 'none', transition: 'background-color 0.3s' }}
            >
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Calendar;
