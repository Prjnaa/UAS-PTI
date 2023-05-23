import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './calendar.css';

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

  const handleDateClick = arg => {
    const newEventTitle = prompt('Masukkan Nama Acara:');
    const newEventLocation = prompt('Masukkan Lokasi Acara:');
    let newEventStartTime = prompt('Masukkan Jam Mulai Acara (HH:mm):');
    let newEventEndTime = prompt('Masukkan Jam Selesai Acara (HH:mm):');

    // Cek jika panjang string jam kurang dari 2 (tidak termasuk separator ':')
    if (newEventStartTime.length < 2) {
      newEventStartTime = `0${newEventStartTime}`; // Tambahkan '0' di depan jam
    }
    if (newEventEndTime.length < 2) {
      newEventEndTime = `0${newEventEndTime}`; // Tambahkan '0' di depan jam
    }

    if (newEventTitle && newEventLocation && newEventStartTime && newEventEndTime) {
      const newEvent = {
        title: newEventTitle,
        start: `${arg.dateStr}T${newEventStartTime}:00`,
        end: `${arg.dateStr}T${newEventEndTime}:00`,
        location: newEventLocation,
      };

      setEvents(prevEvents => [...prevEvents, newEvent]);
    }
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'today prev,next',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        height="90vh"
        events={events}
        eventDidMount={info => {
          return new bootstrap.Popover(info.el, {
            title: info.event.title,
            placement: 'auto',
            trigger: 'hover',
            customClass: 'popoverStyle',
            content: `Lokasi: ${info.event.extendedProps.location}<br>Jam Mulai: ${info.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}<br>Jam Selesai: ${info.event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(/:00 /, ' ')}`,
            html: true,
          });
        }}
        dateClick={handleDateClick}
      />
    </div>
  );
};

export default Calendar;
