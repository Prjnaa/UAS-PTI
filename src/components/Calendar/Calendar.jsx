import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './calendar.css';
import { Modal, Button, Form } from 'react-bootstrap';

const Calendar = () => {
  const [events, setEvents] = useState(() => {
    // Cek apakah ada data event yang disimpan di localStorage
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
        // Mengatur notifikasi untuk acara yang akan dimulai dalam waktu kurang dari 5 menit
        if (timeDiff > 0 && timeDiff <= 300000) {
          // Ganti kode di bawah ini dengan logika notifikasi yang sesuai
          console.log(`Notifikasi: Acara ${event.title} akan segera dimulai!`);
        }
      });
    };

    checkEventNotifications();
  }, [events]);

  useEffect(() => {
    // Simpan data event ke localStorage setiap kali terjadi perubahan pada events
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

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
    const newEventStartTime = event.target.elements.startTime.value;
    const newEventEndTime = event.target.elements.endTime.value;
  
    // Ubah string jam mulai dan jam selesai menjadi objek Date
    const startTime = new Date(`2023-01-01T${newEventStartTime}:00`);
    const endTime = new Date(`2023-01-01T${newEventEndTime}:00`);
  
    // Periksa apakah jam selesai lebih besar dari jam mulai
    if (newEventTitle && newEventLocation && newEventStartTime && newEventEndTime && endTime > startTime) {
      const newEvent = {
        title: newEventTitle,
        start: `${selectedDate}T${newEventStartTime}:00`,
        end: `${selectedDate}T${newEventEndTime}:00`,
        location: newEventLocation,
      };
  
      setEvents(prevEvents => [...prevEvents, newEvent]);
      setShowModal(false);
    } else {
      alert('Jam selesai harus lebih besar dari jam mulai');
    }
  };
  
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'white' }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'today prev,next',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        height="100vh"
        events={events}
        eventDidMount={info => {
          return new bootstrap.Popover(info.el, {
            title: info.event.title,
            placement: 'auto',
            trigger: 'hover',
            customClass: 'popoverStyle',
            content: `Lokasi: ${info.event.extendedProps.location}<br>Jam mulai: ${info.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}<br>Jam selesai: ${info.event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(/:00 /, ' ')}`,
            html: true,
          });
        }}
        dateClick={handleDateClick}
      />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah acara</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitModal}>
            <Form.Group controlId="title">
              <Form.Label>Nama acara</Form.Label>
              <Form.Control type="text" placeholder="Masukkan nama acara" />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Lokasi acara</Form.Label>
              <Form.Control type="text" placeholder="Masukkan lokasi acara" />
            </Form.Group>
            <Form.Group controlId="startTime">
              <Form.Label>Jam mulai acara</Form.Label>
              <Form.Control type="text" placeholder="HH:mm" />
            </Form.Group>
            <Form.Group controlId="endTime">
              <Form.Label>Jam selesai acara</Form.Label>
              <Form.Control type="text" placeholder="HH:mm" />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ zIndex: 1, color: 'black', marginTop: '10px', borderColor: 'black'}} className='hover-button'>
              Simpan
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Calendar;
